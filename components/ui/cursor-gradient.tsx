'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CursorGradient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  if (!isClient) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        animate={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(229, 62, 62, 0.05), transparent 80%)`
        }}
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        animate={{
          background: `radial-gradient(400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 214, 0, 0.03), transparent 80%)`
        }}
      />
    </>
  );
}
