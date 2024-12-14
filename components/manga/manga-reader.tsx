'use client';

import { useCallback, useEffect, useState, memo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Manga } from '@/lib/api';
import { addBookmark, removeBookmark, getBookmark } from '@/lib/bookmarks';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

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
  const router = useRouter();
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkBookmark = async () => {
      // Only check bookmark if user is logged in
      if (!user) {
        setIsBookmarked(false);
        return;
      }

      try {
        setIsLoading(true);
        const bookmark = await getBookmark(manga.mal_id.toString());
        setIsBookmarked(!!bookmark);
      } catch (error) {
        console.error('Error checking bookmark:', error);
        setIsBookmarked(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkBookmark();
  }, [manga.mal_id, user]);

  const handleBookmark = useCallback(async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    try {
      setIsLoading(true);
      if (isBookmarked) {
        await removeBookmark(manga.mal_id.toString());
        setIsBookmarked(false);
      } else {
        await addBookmark({
          mangaId: manga.mal_id.toString(),
          title: manga.title,
          imageUrl: manga.images.jpg.image_url,
          currentPage: 0,
        });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isBookmarked, manga, router, user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">{manga.title}</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleBookmark}
              disabled={isLoading}
              variant={isBookmarked ? "secondary" : "outline"}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                isBookmarked ? 'Bookmarked' : 'Bookmark'
              )}
            </Button>
          </div>
        )}
      </div>

      {manga.images?.jpg?.large_image_url && (
        <MangaImage
          src={manga.images.jpg.large_image_url}
          alt={manga.title}
        />
      )}
    </div>
  );
}
