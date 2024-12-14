const JIKAN_API_BASE = 'https://api.jikan.moe/v4';

export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  synopsis: string;
  score: number;
  genres: Array<{ name: string }>;
}

export interface Manga {
  mal_id: number;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  type: string;
  chapters: number | null;
  volumes: number | null;
  status: string;
  publishing: boolean;
  published: {
    from: string | null;
    to: string | null;
    prop: {
      from: { day: number | null; month: number | null; year: number | null };
      to: { day: number | null; month: number | null; year: number | null };
    };
  };
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string | null;
  background: string | null;
  authors: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  serializations: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  genres: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
}

export async function getTopAnime(page = 1) {
  const response = await fetch(`${JIKAN_API_BASE}/top/anime?page=${page}`);
  const data = await response.json();
  return data.data as Anime[];
}

export async function getTopManga(page = 1) {
  const response = await fetch(`${JIKAN_API_BASE}/top/manga?page=${page}`);
  const data = await response.json();
  return data.data as Manga[];
}

export async function searchAnime(query: string) {
  const response = await fetch(`${JIKAN_API_BASE}/anime?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.data as Anime[];
}

export async function searchManga(query: string): Promise<Manga[]> {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}&limit=5`
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching manga:', error);
    return [];
  }
}

export async function getAnimeById(id: number) {
  const response = await fetch(`${JIKAN_API_BASE}/anime/${id}`);
  const data = await response.json();
  return data.data as Anime;
}

export async function getManga(id: string): Promise<Manga | null> {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    return null;
  }
}

export async function getMangaById(id: number) {
  const response = await fetch(`${JIKAN_API_BASE}/manga/${id}`);
  const data = await response.json();
  return data.data as Manga;
}
