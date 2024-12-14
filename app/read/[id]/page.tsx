import { getMangaById, getTopManga } from '@/lib/api';
import { MangaReader } from '@/components/manga/manga-reader';

// Generate static params for top manga
export async function generateStaticParams() {
  try {
    const manga = await getTopManga(1); // Get first page of top manga
    if (!Array.isArray(manga) || manga.length === 0) {
      console.error('Invalid manga data:', manga);
      return []; // Return empty array if data is invalid
    }
    return manga.map((item) => ({
      id: item.mal_id ? item.mal_id.toString() : null,
    })).filter(param => param.id !== null); // Filter out null ids
  } catch (error) {
    console.error('Error generating static params:', error);
    return []; // Return empty array if error occurs
  }
}

// Add dynamic configuration to disable static generation for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ReadMangaPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const manga = await getMangaById(parseInt(params.id));
    if (!manga) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl">Manga not found</h1>
        </div>
      );
    }
    return <MangaReader manga={manga} />;
  } catch (error) {
    console.error('Error fetching manga:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl">Failed to load manga</h1>
        <p className="mt-4 text-gray-600">Please try again later</p>
      </div>
    );
  }
}