'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search } from '@/components/ui/search';
import { Menu, X } from 'lucide-react';
import { getCurrentUser, logout } from '@/lib/auth';
import type { Models } from 'appwrite';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Nihongo
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/manga" className="text-foreground/60 transition-colors hover:text-foreground">
              Manga
            </Link>
            <Search />
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.name}
                </span>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link
                href="/manga"
                className="text-foreground/60 transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Manga
              </Link>
              <Search />
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    {user.name}
                  </span>
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}