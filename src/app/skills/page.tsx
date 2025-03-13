'use client';

import React, { useState, useEffect } from 'react';

const skills = [
  { category: "Frontend", items: ["JavaScript (TypeScript)", "HTML, CSS (Sass, Tailwind)", "React, Next.js, Vue"] },
  { category: "Backend", items: ["Node.js (Express)", "PHP (Drupal 7 & Drupal 10)"] },
  { category: "Databases & Servers", items: ["MySQL, MongoDB", "Nginx, Apache", "Linux Shell"] },
  { category: "Tools & Platforms", items: ["Git, Docker", "Jira, Confluence", "Azure", "Firebase Messaging"] },
];

interface Dot {
  top: string
  left: string;
  size: string;
  opacity: number;
  delay: string;
  speed: number;
}


export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<number>(-1);
  const [dots, setDots] = useState<Dot[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Generate random dots with more spread-out positions and different scroll speeds
    const generatedDots = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 100 + 100}px`, // Random size between 100px and 200px
      opacity: Math.random() * 0.5 + 0.3, // Random opacity between 0.3 and 0.8
      delay: `${Math.random() * 2}s`, // Random fade-in delay
      speed: Math.random() * 0.12, // Random scroll speed between 0.5 and 2 (higher values = slower)
    }));
    setDots(generatedDots);

    // Update scroll position on scroll event
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

    // Clean up the scroll event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="max-w-3xl w-full bg-black p-8 rounded-lg shadow-lg border border-gray-800 z-10">
        <h1 className="text-5xl font-semibold mb-8 text-center text-white uppercase">Technology Stack</h1>
        <div className="divide-y divide-gray-700">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="py-6 px-4 hover:bg-gray-800 transition-all duration-300 rounded-md"
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(-1)}
            >
              <h2 className="text-2xl font-semibold mb-3 text-white flex items-center uppercase">
                {skill.category}
              </h2>
              <ul className="space-y-2 text-gray-300">
                {skill.items.map((item, i) => (
                  <li
                    key={i}
                    className={`text-lg transition-all duration-300 ${hoveredCategory === index ? 'text-white font-medium' : ''}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Pulsating, Parallax effect on dots based on scroll */}
      {dots.map((dot, index) => (
        <div
          key={index}
          className="fixed inset-0 bg-pink-400 opacity-30 rounded-full animate-pulse z-0"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
            animationDelay: dot.delay,
            transition: 'opacity 3s ease-in-out',
            transform: `translateY(${scrollPosition * dot.speed}px)`, // Apply different speed for each dot
          }}
        ></div>
      ))}

      {/* Additional background pulsating circles */}
      <div className="fixed inset-0 bg-pink-400 opacity-30 rounded-full animate-pulse z-0" style={{ width: '300px', height: '300px', top: '20%', left: '10%' }}></div>
      <div className="fixed top-1/3 left-1/4 bg-pink-400 opacity-15 rounded-full animate-pulse z-0" style={{ width: '200px', height: '200px' }}></div>
      <div className="fixed top-1/2 left-1/2 bg-pink-400 opacity-10 rounded-full animate-pulse z-0" style={{ width: '250px', height: '250px' }}></div>

      {/* Additional medium-sized pulsating circles */}
      <div className="fixed top-1/4 left-1/3 bg-pink-300 opacity-15 rounded-full animate-pulse z-0" style={{ width: '200px', height: '200px' }}></div>
      <div className="fixed top-1/2 left-1/3 bg-pink-300 opacity-10 rounded-full animate-pulse z-0" style={{ width: '150px', height: '150px' }}></div>
      <div className="fixed top-2/3 left-1/4 bg-pink-300 opacity-5 rounded-full animate-pulse z-0" style={{ width: '180px', height: '180px' }}></div>

      {/* Smooth scrolling */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        .fade-in {
          animation: fadeIn 10s forwards;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
