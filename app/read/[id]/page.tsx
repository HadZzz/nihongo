import { getMangaById, getTopManga } from '@/lib/api';
import { MangaReader } from '@/components/manga/manga-reader';

// Generate static params for top manga
export async function generateStaticParams() {
  try {
    const manga = await getTopManga(1); // Get first page of top manga
    return manga.map((item) => ({
      id: item.mal_id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return []; // Return empty array if error occurs
  }
}

export default async function ReadMangaPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const manga = await getMangaById(parseInt(params.id));
    return <MangaReader manga={manga} />;
  } catch (error) {
    console.error('Error fetching manga:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl">Failed to load manga</h1>
      </div>
    );
  }
}
