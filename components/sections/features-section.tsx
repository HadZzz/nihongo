'use client';

import { Book, Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Book,
    title: 'Manga Library',
    description: 'Explore our vast collection of manga and light novels'
  },
  {
    icon: Calendar,
    title: 'Cultural Events',
    description: 'Join our Japanese cultural events and workshops'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Connect with fellow Japanese culture enthusiasts'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export function FeaturesSection() {
  return (
    <section className="mb-16">
      <h2 className="section-title gradient-text text-2xl font-bold sm:text-3xl">
        探索を始めましょう
      </h2>
      <motion.div
        className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              className="hover-card rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
              variants={itemVariants}
            >
              <Icon className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
