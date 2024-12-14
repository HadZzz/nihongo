'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative mb-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Japanese scenery"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      <div className="container relative z-10 mx-auto grid min-h-[80vh] grid-cols-1 gap-8 px-4 py-12 lg:grid-cols-2 lg:py-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            日本の文化を
            <span className="mt-2 block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              探索しよう
            </span>
          </h1>
          <p className="mb-8 text-lg text-white/90 md:text-xl">
            Immerse yourself in the fascinating world of Japanese culture, from ancient traditions
            to modern pop culture. Start your journey today!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90" asChild>
              <Link href="/manga">
                Explore Manga <ChevronRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white hover:bg-white/10" asChild>
              <Link href="/culture">Learn About Culture</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden items-center justify-center lg:flex"
        >
          <div className="relative h-[500px] w-[400px] overflow-hidden rounded-lg">
            <Image
              src="/images/hero-illustration.png"
              alt="Japanese culture illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
