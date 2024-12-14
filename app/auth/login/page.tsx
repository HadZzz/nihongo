'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/lib/auth';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/manga'); 
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 401) {
        setError('Invalid email or password');
      } else if (error.code === 429) {
        setError('Too many attempts. Please try again later.');
      } else {
        setError(error.message || 'Failed to login. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Login</h1>
      
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>

      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <Link href="/auth/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
