'use client';
import React, { useState } from 'react';
import NavigationMenu from '@/app/components/NavigationMenu';

const interests = [
  {
    category: "Filme & Serien",
    id: 0,
    items: [
      { id: 0, name: "Twin Peaks" },
      { id: 1, name: "Studio Ghibli" },
      { id: 2, name: "Eternal Sunshine of the spotless Mind" }
    ]
  },
  {
    category: "Literatur",
    id: 1,
    items: [
      { id: 0, name: "Haruki Murakami" },
      { id: 1, name: "Cormac McCarthy" },
      { id: 2, name: "Raymond Chandler" }
    ]
  },
  {
    category: "Musik",
    id: 2,
    items: [
      { id: 0, name: "Radiohead" },
      { id: 1, name: "Flying Lotus" },
      { id: 2, name: "JPEGMafia" }
    ]
  },
  {
    category: "Sonstiges",
    id: 3,
    items: [
      { id: 0, name: "Ableton Live, Gitarren - Ich mache gerne Sounds und Musik" },
      { id: 1, name: "Die Zelda Reihe" },
      { id: 2, name: "Junji Ito" }
    ]
  }
];


export default function About() {
  const [hoveredCategory, setHoveredCategory] = useState<number>(-1);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 relative overflow-hidden bg-gradient-to-r from-black via-[#4c09325c] to-black animate-bgMove">
      <h1 className="text-4xl font-semibold mb-8 uppercase">Hobbies & Interessen</h1>

      <div className="max-w-3xl w-full bg-black p-8 rounded-lg shadow-lg border border-gray-800 opacity-90">
        <div className="divide-y divide-gray-900">
          {interests.map((interest, index) => (
            <div
              key={interest.id + "intID"}
              className="py-6 px-4 hover:bg-gray-800 transition-all duration-300 rounded-md"
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(-1)}
            >
              <h2 className="text-2xl font-semibold mb-3 flex items-center uppercase">
                {interest.category}
              </h2>
              <ul className="space-y-2 text-gray-300">
                {interest.items.map((item) => (
                  <li
                    key={interest.id + "-" + item.id}
                    className={`text-lg transition-all duration-300 ${hoveredCategory === index ? 'text-pink-400 font-medium' : ''}`}
                  >
                    {item.name}
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
      
      <NavigationMenu />
    </div>
  );
}