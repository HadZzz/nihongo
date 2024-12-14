import { getTopManga } from '@/lib/api';
import { MangaGrid } from '@/components/manga/manga-grid';

// This ensures the page is static at build time
export const dynamic = 'force-static';

export default async function MangaPage() {
  try {
    const manga = await getTopManga(1);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">Top Manga</h1>
          <p className="mt-2 text-muted-foreground">
            Discover the most popular manga series
          </p>
        </div>
        <MangaGrid initialManga={manga} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching manga:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl">Failed to load manga</h1>
      </div>
    );
  }
}
