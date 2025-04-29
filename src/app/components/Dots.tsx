import React, { useEffect, useState } from 'react';

interface Dot {
  top: string;
  left: string;
  size: string;
  opacity: number;
  delay: string;
  speed: number;
  spinSpeed: number;
  spinDirection: number;
}

export default function Dots( { numberOfDots }: { numberOfDots: number }) {
  const [dots, setDots] = useState<Dot[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const generatedDots = Array.from({ length: numberOfDots }).map(() => ({
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 100 + 100}px`,
      opacity: Math.random() * 0.08 + 0.2,
      delay: `${Math.random() * 2}s`,
      speed: Math.random() * 0.12,
      spinSpeed: Math.random() * 5 + 8,
      spinDirection: Math.random() > 0.5 ? 1 : -1,
    }));
    setDots(generatedDots);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [numberOfDots]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-50">
      {dots.map((dot, index) => (
        <div
          key={index}
          className="fixed inset-0 bg-pink-400 opacity-30 rounded-full xxxxx"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
            animation: `rotateY ${dot.spinSpeed}s linear infinite`,
            animationDirection: dot.spinDirection === 1 ? 'normal' : 'reverse',
            animationDelay: dot.delay,
            transform: `translateY(${scrollPosition * dot.speed}px)`,
          }}
        >
        </div>
      ))}
      <style jsx>{`
        @keyframes rotateY {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
};