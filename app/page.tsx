'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { CursorEffect } from '@/components/ui/cursor-effect';

// Dynamic imports untuk optimasi
const HeroSection = dynamic(
  () => import('@/components/sections/hero-section').then((mod) => mod.HeroSection),
  {
    loading: () => <div className="min-h-[80vh] animate-pulse bg-gray-100" />
  }
);

const FeaturesSection = dynamic(
  () => import('@/components/sections/features-section').then((mod) => mod.FeaturesSection),
  {
    loading: () => <div className="min-h-[40vh] animate-pulse bg-gray-100" />
  }
);

const FeaturedSection = dynamic(
  () => import('@/components/sections/featured-section').then((mod) => mod.FeaturedSection),
  {
    loading: () => <div className="min-h-[40vh] animate-pulse bg-gray-100" />
  }
);

const LatestArticles = dynamic(
  () => import('@/components/sections/latest-articles').then((mod) => mod.LatestArticles),
  {
    loading: () => <div className="min-h-[40vh] animate-pulse bg-gray-100" />
  }
);

const UpcomingEvents = dynamic(
  () => import('@/components/sections/upcoming-events').then((mod) => mod.UpcomingEvents),
  {
    loading: () => <div className="min-h-[40vh] animate-pulse bg-gray-100" />
  }
);

export default function Home() {
  return (
    <div className="japanese-pattern min-h-screen">
      <CursorEffect />
      
      <Suspense fallback={<div className="min-h-[80vh] animate-pulse bg-gray-100" />}>
        <HeroSection />
      </Suspense>

      <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="min-h-[40vh] animate-pulse bg-gray-100" />}>
          <FeaturesSection />
        </Suspense>

        <Suspense fallback={<div className="min-h-[40vh] animate-pulse bg-gray-100" />}>
          <FeaturedSection />
        </Suspense>

        <Suspense fallback={<div className="min-h-[40vh] animate-pulse bg-gray-100" />}>
          <LatestArticles />
        </Suspense>

        <Suspense fallback={<div className="min-h-[40vh] animate-pulse bg-gray-100" />}>
          <UpcomingEvents />
        </Suspense>
      </div>
    </div>
  );
}