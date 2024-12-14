'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const articles = [
  {
    title: "Tokyo's Street Fashion",
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989",
    excerpt: "Explore the latest trends in Harajuku and Shibuya",
    category: "Fashion"
  },
  {
    title: "Traditional Tea Ceremony",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    excerpt: "The art and philosophy behind Japanese tea ceremonies",
    category: "Culture"
  },
  {
    title: "Modern Architecture",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    excerpt: "Contemporary Japanese architectural marvels",
    category: "Architecture"
  }
];

export function LatestArticles() {
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
        Latest Articles
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {articles.map((article, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <Card className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div
                className="aspect-video transform bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${article.image})` }}
              />
              <div className="relative p-4 sm:p-6">
                <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {article.category}
                </div>
                <h3 className="mb-2 text-xl font-bold">{article.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground sm:text-base">
                  {article.excerpt}
                </p>
                <Button variant="link" className="group p-0" asChild>
                  <Link href={`/articles/${article.title.toLowerCase().replace(/ /g, '-')}`}>
                    Read More{' '}
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}