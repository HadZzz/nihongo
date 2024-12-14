'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronRight } from 'lucide-react';
import { Manga } from '@/lib/api';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface MangaGridProps {
  initialManga: Manga[];
}

export function MangaGrid({ initialManga }: MangaGridProps) {
  const [manga, setManga] = useState<Manga[]>(initialManga);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const response = await fetch(`/api/manga?page=${nextPage}`);
      const data = await response.json();
      setManga([...manga, ...data]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more manga:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        {manga.map((mangaItem) => (
          <motion.div key={mangaItem.mal_id} variants={item}>
            <Link href={`/manga/${mangaItem.mal_id}`}>
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={mangaItem.images.jpg.image_url}
                      alt={mangaItem.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </div>
                  <CardTitle className="line-clamp-2 p-4 text-sm">
                    {mangaItem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="mt-1 flex items-center text-sm text-muted-foreground">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {mangaItem.score}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {mangaItem.synopsis}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="secondary" className="w-full">
                    Read More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      {manga.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </>
  );
}
