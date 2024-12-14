import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/components/providers/query-provider';
import { Footer } from '@/components/footer';
import './globals.css';
import { Metadata } from 'next/types';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Manga Reader',
  description: 'Read your favorite manga online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}