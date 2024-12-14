'use client';

import { useEffect, useState, memo } from 'react';

function CursorEffectComponent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-70 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(229, 62, 62, 0.15), transparent 80%)`
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-70 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 214, 0, 0.1), transparent 80%)`
        }}
      />
    </>
  );
}

export const CursorEffect = memo(CursorEffectComponent);
