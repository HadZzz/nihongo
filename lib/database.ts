import { databases, DATABASE_ID, MANGA_COLLECTION_ID, BOOKMARKS_COLLECTION_ID } from './appwrite';
import { ID, Query } from 'appwrite';

// Bookmark functions
export async function addBookmark(userId: string, mangaId: string, page: number) {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            BOOKMARKS_COLLECTION_ID,
            ID.unique(),
            {
                user_id: userId,
                manga_id: mangaId,
                page: page,
                created_at: new Date().toISOString(),
            }
        );
        return response;
    } catch (error) {
        console.error('Error adding bookmark:', error);
        throw error;
    }
}

export async function getBookmarks(userId: string) {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            BOOKMARKS_COLLECTION_ID,
            [Query.equal('user_id', userId)]
        );
        return response.documents;
    } catch (error) {
        console.error('Error getting bookmarks:', error);
        throw error;
    }
}

export async function updateBookmark(bookmarkId: string, page: number) {
    try {
        const response = await databases.updateDocument(
            DATABASE_ID,
            BOOKMARKS_COLLECTION_ID,
            bookmarkId,
            {
                page: page,
                updated_at: new Date().toISOString(),
            }
        );
        return response;
    } catch (error) {
        console.error('Error updating bookmark:', error);
        throw error;
    }
}

export async function deleteBookmark(bookmarkId: string) {
    try {
        await databases.deleteDocument(
            DATABASE_ID,
            BOOKMARKS_COLLECTION_ID,
            bookmarkId
        );
    } catch (error) {
        console.error('Error deleting bookmark:', error);
        throw error;
    }
}
