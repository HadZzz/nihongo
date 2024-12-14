import { Client, Account, Databases, Storage, Avatars, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

// Database and Collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
export const MANGA_COLLECTION_ID = 'manga';
export const BOOKMARKS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_BOOKMARKS_COLLECTION_ID || '';

// API Key (only use on server-side)
export const API_KEY = process.env.NEXT_PUBLIC_APPWRITE_API_KEY;

export { ID };
