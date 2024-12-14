import { getManga } from '@/lib/api';
import { MangaReader } from '@/components/manga/manga-reader';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function MangaPage({ params }: PageProps) {
  try {
    const manga = await getManga(params.id);
    
    if (!manga) {
      notFound();
    }

    return <MangaReader manga={manga} />;
  } catch (error) {
    console.error('Error loading manga:', error);
    notFound();
  }
}
