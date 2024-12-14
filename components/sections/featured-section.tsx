'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function FeaturedSection() {
  return (
    <motion.section
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
      initial="hidden"
      animate="show"
      className="mb-16"
    >
      <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        Featured Content
      </h2>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
          }}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-red-500 to-orange-500"
        >
          <div className="absolute inset-0 bg-[url('/patterns/japanese-wave.svg')] bg-cover opacity-10" />
          <div className="aspect-[16/9] bg-[url('https://images.unsplash.com/photo-1480796927426-f609979314bd')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 p-4 sm:p-6 md:p-8">
              <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl md:text-3xl">
                Latest Manga Releases
              </h3>
              <p className="mb-4 max-w-md text-sm text-white/90 sm:text-base">
                Explore the newest chapters from your favorite series
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/manga">Read Now</Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
          }}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-purple-500"
        >
          <div className="absolute inset-0 bg-[url('/patterns/japanese-wave.svg')] bg-cover opacity-10" />
          <div className="aspect-[16/9] bg-[url('https://images.unsplash.com/photo-1528360983277-13d401cdc186')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 p-4 sm:p-6 md:p-8">
              <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl md:text-3xl">
                Cultural Insights
              </h3>
              <p className="mb-4 max-w-md text-sm text-white/90 sm:text-base">
                Deep dive into Japanese traditions and modern life
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/culture">Learn More</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}