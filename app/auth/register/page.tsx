'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createAccount } from '@/lib/auth';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createAccount(email, password, name);
      router.push('/auth/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === 400) {
        if (error.message.includes('password')) {
          setError('Password must be at least 8 characters long');
        } else if (error.message.includes('email')) {
          setError('Invalid email format');
        } else {
          setError(error.message);
        }
      } else if (error.code === 409) {
        setError('Email already exists');
      } else {
        setError('Failed to create account. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Register</h1>
      
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          Register
        </Button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
