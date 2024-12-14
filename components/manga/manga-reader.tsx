'use client';

import { useCallback, useEffect, useState, memo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Manga } from '@/lib/api';
import { account } from '@/lib/appwrite';
import { addBookmark, removeBookmark, getBookmark } from '@/lib/bookmarks';
import { Loader2 } from 'lucide-react';

interface MangaReaderProps {
  manga: Manga;
}

const MangaImage = memo(function MangaImage({ 
  src, 
  alt 
}: { 
  src: string; 
  alt: string;
}) {
  return (
    <div className="relative aspect-[3/4] w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        priority={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
});

const NavigationButton = memo(function NavigationButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="min-w-[120px]"
    >
      {children}
    </Button>
  );
});

export function MangaReader({ manga }: MangaReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Fetch user data
  useEffect(() => {
    account.get().then(setUser).catch(console.error);
  }, []);

  // Check bookmark status
  useEffect(() => {
    if (user && manga.mal_id) {
      getBookmark(manga.mal_id.toString())
        .then((bookmark) => setIsBookmarked(!!bookmark))
        .catch(console.error);
    }
  }, [user, manga.mal_id]);

  // Navigation handlers
  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(manga.chapters || 1, prev + 1));
  }, [manga.chapters]);

  // Bookmark handler
  const handleBookmark = useCallback(async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setIsLoading(true);
    try {
      if (isBookmarked) {
        await removeBookmark(manga.mal_id.toString());
        setIsBookmarked(false);
      } else {
        await addBookmark({
          mangaId: manga.mal_id.toString(),
          title: manga.title,
          imageUrl: manga.images.jpg.image_url,
          currentPage,
        });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, router, isBookmarked, manga, currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (e.key === 'ArrowRight') {
        handleNextPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlePrevPage, handleNextPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold truncate">{manga.title}</h1>
        <Button
          onClick={handleBookmark}
          variant={isBookmarked ? 'destructive' : 'default'}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'
          )}
        </Button>
      </div>

      <div className="max-w-3xl mx-auto mb-8">
        <MangaImage
          src={manga.images.jpg.large_image_url}
          alt={`${manga.title} - Page ${currentPage + 1}`}
        />
      </div>

      <div className="flex justify-center items-center gap-4">
        <NavigationButton
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          Previous Page
        </NavigationButton>
        
        <span className="text-sm font-medium">
          Page {currentPage + 1} of {manga.chapters || 1}
        </span>
        
        <NavigationButton
          onClick={handleNextPage}
          disabled={currentPage === (manga.chapters || 1) - 1}
        >
          Next Page
        </NavigationButton>
      </div>
    </div>
  );
}
