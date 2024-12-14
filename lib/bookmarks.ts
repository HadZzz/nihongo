import { ID, Query } from 'appwrite';
import { databases } from './appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const BOOKMARKS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_BOOKMARKS_COLLECTION_ID!;

export interface Bookmark {
  mangaId: string;
  title: string;
  imageUrl: string;
  currentPage: number;
}

export async function addBookmark(bookmark: Bookmark) {
  return databases.createDocument(
    DATABASE_ID,
    BOOKMARKS_COLLECTION_ID,
    ID.unique(),
    {
      manga_id: bookmark.mangaId,
      title: bookmark.title,
      image_url: bookmark.imageUrl,
      current_page: bookmark.currentPage,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  );
}

export async function removeBookmark(mangaId: string) {
  const bookmarks = await databases.listDocuments(
    DATABASE_ID,
    BOOKMARKS_COLLECTION_ID,
    [Query.equal('manga_id', mangaId)]
  );

  if (bookmarks.documents.length > 0) {
    await databases.deleteDocument(
      DATABASE_ID,
      BOOKMARKS_COLLECTION_ID,
      bookmarks.documents[0].$id
    );
  }
}

export async function getBookmark(mangaId: string) {
  const bookmarks = await databases.listDocuments(
    DATABASE_ID,
    BOOKMARKS_COLLECTION_ID,
    [Query.equal('manga_id', mangaId)]
  );

  return bookmarks.documents[0];
}

export async function getUserBookmarks() {
  return databases.listDocuments(DATABASE_ID, BOOKMARKS_COLLECTION_ID, [
    Query.orderDesc('updated_at'),
  ]);
}
