'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Manga } from '@/lib/api';

interface MangaDetailProps {
  manga: Manga;
}

export function MangaDetail({ manga }: MangaDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/manga">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Manga
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg md:max-w-md">
          <Image
            src={manga.images.jpg.image_url}
            alt={manga.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold md:text-4xl">{manga.title}</h1>
          
          <div className="mt-4 flex items-center">
            <Star className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-lg font-semibold">{manga.score}</span>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Synopsis</h2>
            <p className="mt-2 text-muted-foreground">{manga.synopsis}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Genres</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {manga.genres.map((genre) => (
                <span
                  key={genre.name}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button size="lg" asChild>
              <Link href={`/read/${manga.mal_id}`}>
                Read Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`https://myanimelist.net/manga/${manga.mal_id}`} target="_blank" rel="noopener noreferrer">
                View on MAL
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
