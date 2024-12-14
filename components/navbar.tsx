'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search } from '@/components/ui/search';
import { Menu, X } from 'lucide-react';
import { logout } from '@/lib/auth';
import { useAuth } from '@/contexts/auth-context';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, checkAuth } = useAuth();

  const handleLogout = async () => {
    await logout();
    checkAuth();
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
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-4 px-2 pb-3 pt-2">
              <Link
                href="/manga"
                className="block text-foreground/60 transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Manga
              </Link>
              <Search />
              {user ? (
                <>
                  <span className="block text-sm text-muted-foreground">
                    {user.name}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <Button variant="ghost" className="w-full">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}