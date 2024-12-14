'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/lib/hooks';
import { searchManga } from '@/lib/api';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from '@/components/ui/command';
import { Manga } from '@/lib/api';
import Image from 'next/image';

export function Search() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<Manga[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    const handleSearch = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchManga(debouncedQuery);
        setResults(data);
      } catch (error) {
        console.error('Error searching manga:', error);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
  }, [debouncedQuery]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = React.useCallback((manga: Manga) => {
    setOpen(false);
    router.push(`/manga/${manga.mal_id}`);
  }, [router]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:w-64 sm:pr-12"
      >
        <span className="hidden lg:inline-flex">Search manga...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search manga..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {isLoading ? (
            <CommandLoading>Searching manga...</CommandLoading>
          ) : results.length === 0 ? (
            <CommandEmpty>No manga found.</CommandEmpty>
          ) : (
            <CommandGroup heading="Manga">
              {results.map((manga) => (
                <CommandItem
                  key={manga.mal_id}
                  value={manga.title}
                  onSelect={() => handleSelect(manga)}
                  className="flex items-center gap-2 p-2"
                >
                  <div className="relative h-16 w-12 flex-shrink-0">
                    <Image
                      src={manga.images.jpg.image_url}
                      alt={manga.title}
                      fill
                      className="object-cover rounded"
                      sizes="48px"
                      priority={false}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{manga.title}</span>
                    {manga.title_japanese && (
                      <span className="text-sm text-muted-foreground">
                        {manga.title_japanese}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
