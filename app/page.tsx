'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FeaturedSection } from '@/components/sections/featured-section';
import { LatestArticles } from '@/components/sections/latest-articles';
import { UpcomingEvents } from '@/components/sections/upcoming-events';

export default function Home() {
  return (
    <div className="japanese-pattern min-h-screen">
      {/* Hero Section */}
      <section className="relative mb-12 overflow-hidden">
        <div className="hero-pattern">
          <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:min-h-[70vh] lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 max-w-2xl text-center"
            >
              <h1 className="mb-6 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                日本の文化を探索
                <span className="mt-2 block text-2xl sm:text-3xl md:text-4xl">
                  Explore Japanese Culture
                </span>
              </h1>
              <p className="mx-auto mb-8 max-w-xl text-base text-white/90 sm:text-lg md:text-xl">
                Discover the rich tapestry of Japan through manga, culture, and community
              </p>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/manga" className="flex items-center">
                  Start Exploring <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <FeaturedSection />
        <LatestArticles />
        <UpcomingEvents />
      </div>
    </div>
  );
}