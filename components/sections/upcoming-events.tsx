'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const events = [
  {
    title: "Sakura Festival 2024",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951",
    date: "April 1-15, 2024",
    location: "Various locations",
    description: "Experience the beauty of cherry blossoms across Japan"
  },
  {
    title: "Anime & Manga Expo",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
    date: "May 20-22, 2024",
    location: "Tokyo Convention Center",
    description: "The biggest anime and manga convention in Japan"
  }
];

export function UpcomingEvents() {
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
    >
      <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        Upcoming Events
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
        {events.map((event, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <Card className="group overflow-hidden bg-gradient-to-br from-background to-muted/50">
              <div className="relative">
                <div
                  className="aspect-video transform bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
              </div>
              <div className="relative p-4 sm:p-6">
                <h3 className="mb-2 text-xl font-bold sm:text-2xl">{event.title}</h3>
                <p className="mb-4 text-muted-foreground">{event.description}</p>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location}
                  </div>
                </div>
                <Button className="w-full">Learn More</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}