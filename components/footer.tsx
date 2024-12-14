import { Github, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground transition-colors hover:text-foreground">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link 
                href="https://twitter.com" 
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="https://github.com" 
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Follow us on Github"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for updates and exclusive content.
            </p>
            <div className="flex max-w-sm space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-[240px]"
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Japan Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}