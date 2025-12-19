'use client';

import React, { useEffect, useMemo, useRef } from 'react';

interface Dot {
  top: string;
  left: string;
  size: string;
  opacity: number;
  delay: string;
  speed: number;
  spinSpeed: number;
  spinDirection: 'normal' | 'reverse';
}

function createDot(): Dot {
  return {
    top: `${Math.random() * 100}vh`,
    left: `${Math.random() * 100}vw`,
    size: `${Math.random() * 100 + 100}px`,
    opacity: Math.random() * 0.08 + 0.2,
    delay: `${Math.random() * 2}s`,
    speed: Math.random() * 0.12,
    spinSpeed: Math.random() * 5 + 8,
    spinDirection: Math.random() > 0.5 ? 'normal' : 'reverse',
  };
}

export default function Dots({ numberOfDots }: { numberOfDots: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const dots = useMemo(
    () => Array.from({ length: numberOfDots }, createDot),
    [numberOfDots]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      containerRef.current.style.setProperty(
        '--scrollY',
        `${window.scrollY}px`
      );
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden -z-50"
      style={{ '--scrollY': '0px' } as React.CSSProperties}
    >
      {dots.map((dot, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-pink-400"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
            filter: 'blur(1px)',
            animation: `spin ${dot.spinSpeed}s linear infinite`,
            animationDirection: dot.spinDirection,
            animationDelay: dot.delay,
            transform: `translateY(calc(var(--scrollY) * ${dot.speed}))`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes spin {
          from {
            rotate: 0deg;
          }
          to {
            rotate: 360deg;
          }
        }
      `}</style>
    </div>
  );
}
