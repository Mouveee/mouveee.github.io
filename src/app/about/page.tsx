'use client';
import React, { useState } from 'react';
import NavigationMenu from '@/app/components/NavigationMenu';
import Dots from '@/app/components/Dots';

const interests = [
  { 
    category: "Literature", 
    items: [
      "Haruki Murakami",
      "The Great Gatsby", 
      "Raymond Chandler",
    ] 
  },
  { 
    category: "Filme & Serien", 
    items: [
      "Twin Peaks",
      "Studio Ghibli",
      "Eternal Sunshine of the spotless Mind"
    ] 
  },
  { 
    category: "Musik", 
    items: [
      "Radiohead",
      "Flying Lotus",
      "JPEGMafia"
    ] 
  },
  { 
    category: "Sonstiges", 
    items: [
      "Ableton Live - Ich mache gerne Sounds und Musik",
      "Die Zelda Reihe",
      "Junji Ito"
    ] 
  },
];

export default function About() {
  const [hoveredCategory, setHoveredCategory] = useState<number>(-1);
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-r from-black via-[#4c09325c] to-black animate-bgMove">
      <div className="max-w-3xl w-full bg-black p-8 rounded-lg shadow-lg border border-gray-800 opacity-90">
        <h1 className="text-5xl font-semibold mb-8 text-center uppercase">Interests & Hobbies</h1>
        <div className="divide-y divide-gray-900">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="py-6 px-4 hover:bg-gray-800 transition-all duration-300 rounded-md"
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(-1)}
            >
              <h2 className="text-2xl font-semibold mb-3 flex items-center uppercase">
                {interest.category}
              </h2>
              <ul className="space-y-2 text-gray-300">
                {interest.items.map((item, i) => (
                  <li
                    key={i}
                    className={`text-lg transition-all duration-300 ${hoveredCategory === index ? 'text-pink-400 font-medium' : ''}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-bgMove {
          background-size: 200% 200%;
          animation: bgMove 10s infinite alternate ease-in-out;
        }
      `}</style>
      <Dots numberOfDots={20} />
      <NavigationMenu />
    </div>
  );
}