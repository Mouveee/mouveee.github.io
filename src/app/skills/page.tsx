'use client';

import React, { useState, useEffect } from 'react';
import NavigationMenu from '@/app/components/NavigationMenu';

const skills = [
  { category: "Frontend", items: ["JavaScript (TypeScript)", "HTML, CSS (Sass, Tailwind)", "React, Next.js, Vue"] },
  { category: "Backend", items: ["Node.js (Express)", "PHP (Drupal 7 & Drupal 10)"] },
  { category: "Databases & Servers", items: ["MySQL, MongoDB", "Nginx, Apache", "Linux Shell"] },
  { category: "Tools & Platforms", items: ["Git, Docker", "Jira, Confluence", "Azure", "Firebase Messaging"] },
  { category: "Qualifications", items: ["Computer Science Expert (IHK Saar)", "MS-Exam 70-480 Programming with JS, HTML and CSS"] },
];

interface Dot {
  top: string;
  left: string;
  size: string;
  opacity: number;
  delay: string;
  speed: number;
  spinSpeed: number;
  spinDirection: number; // +1 for clockwise, -1 for counterclockwise
}

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<number>(-1);
  const [dots, setDots] = useState<Dot[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const generatedDots = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 100 + 100}px`,
      opacity: Math.random() * 0.5 + 0.3,
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
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="max-w-3xl w-full bg-black p-8 rounded-lg shadow-lg border border-gray-800 z-10 opacity-90">
        <h1 className="text-5xl font-semibold mb-8 text-center text-white uppercase">Technology Stack</h1>
        <div className="divide-y divide-gray-900">
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

      {/* Pulsating, Spinning, Scrolling Dots */}
      {dots.map((dot, index) => (
        <div
          key={index}
          className="fixed inset-0 bg-pink-400 opacity-30 rounded-full z-0"
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
        ></div>
      ))}

      <NavigationMenu />

      {/* Styles for Animations */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes rotateY {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
