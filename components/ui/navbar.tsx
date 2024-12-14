'use client'
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/50 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/50">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">日本語</span>
          <span className="hidden text-sm text-gray-500 sm:inline-block">
            Nihongo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-6 md:flex">
          <Link
            href="/manga"
            className="text-sm text-gray-500 transition-colors hover:text-primary dark:text-gray-400"
          >
            漫画
            <span className="ml-1 text-xs">Manga</span>
          </Link>
          <Link
            href="/culture"
            className="text-sm text-gray-500 transition-colors hover:text-primary dark:text-gray-400"
          >
            文化
            <span className="ml-1 text-xs">Culture</span>
          </Link>
          <Link
            href="/events"
            className="text-sm text-gray-500 transition-colors hover:text-primary dark:text-gray-400"
          >
            イベント
            <span className="ml-1 text-xs">Events</span>
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          {/* Theme Toggle */}
          {isClient && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="h-9 w-9"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/manga"
                  className="text-sm text-gray-500 transition-colors hover:text-primary dark:text-gray-400"
                >
                  漫画
                  <span className="ml-1 text-xs">Manga</span>
                </Link>
                <Link
                  href="/culture"
                  className="text-sm text-gray-500 transition-colors hover:text-primary dark:text-gray-400"
                >
                  文化
                  <span className="ml-1 text-xs">Culture</span>
                </Link>
                <Link
                  href="/events"
                  className="text-sm text-gray-500 transition-colors hover:text-primary dark:text-gray-400"
                >
                  イベント
                  <span className="ml-1 text-xs">Events</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
