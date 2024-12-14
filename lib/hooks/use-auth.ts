import { useState, useEffect } from 'react';
import { Account, Client, ID } from 'appwrite';
import { toast } from 'sonner';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

interface User {
  $id: string;
  name: string;
  email: string;
}

const STORAGE_KEY = 'nihongo_user';
const SESSION_KEY = 'nihongo_session';
const MIN_BACKOFF = 5000; // 5 seconds
const MAX_BACKOFF = 30000; // 30 seconds
const MAX_RETRIES = 3;

class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private lastRequestTime = 0;
  private currentBackoff = MIN_BACKOFF;
  private retryCount = 0;

  async add<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await this.executeWithBackoff(request);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      if (!this.processing) {
        this.processQueue();
      }
    });
  }

  private async executeWithBackoff<T>(request: () => Promise<T>): Promise<T> {
    const now = Date.now();
    const timeElapsed = now - this.lastRequestTime;
    
    if (timeElapsed < this.currentBackoff) {
      await new Promise(resolve => setTimeout(resolve, this.currentBackoff - timeElapsed));
    }

    try {
      const result = await request();
      this.retryCount = 0;
      this.currentBackoff = MIN_BACKOFF;
      this.lastRequestTime = Date.now();
      return result;
    } catch (error: any) {
      if (error?.message?.includes('Rate limit') && this.retryCount < MAX_RETRIES) {
        this.retryCount++;
        this.currentBackoff = Math.min(this.currentBackoff * 2, MAX_BACKOFF);
        toast.error('システムが混雑しています...', {
          description: `Retrying in ${this.currentBackoff / 1000} seconds (Attempt ${this.retryCount}/${MAX_RETRIES})`,
        });
        return this.executeWithBackoff(request);
      }
      throw error;
    }
  }

  private async processQueue() {
    this.processing = true;
    
    while (this.queue.length > 0) {
      const request = this.queue.shift();
      if (request) {
        await request();
      }
    }
    
    this.processing = false;
  }
}

const requestQueue = new RequestQueue();

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  const checkUser = async () => {
    try {
      const sessionId = localStorage.getItem(SESSION_KEY);
      if (!sessionId) {
        setUser(null);
        return null;
      }

      const session = await requestQueue.add(() => account.get());
      setUser(session);
      return session;
    } catch (error) {
      console.error('Check user error:', error);
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SESSION_KEY);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const newUser = await requestQueue.add(() =>
        account.create(ID.unique(), email, password, name)
      );
      const session = await signIn(email, password);
      return session;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await requestQueue.add(() => account.createEmailSession(email, password));
      const session = await requestQueue.add(() => account.get());
      localStorage.setItem(SESSION_KEY, session.$id);
      setUser(session);
      return session;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await requestQueue.add(() => account.deleteSession('current'));
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    checkUser,
  };
}
