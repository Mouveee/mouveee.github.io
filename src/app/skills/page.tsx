'use client';

import React, { useState } from 'react';

const skills = [
  { category: "Frontend", items: ["JavaScript (TypeScript)", "HTML, CSS (Sass, Tailwind)", "React, Next.js, Vue"] },
  { category: "Backend", items: ["Node.js (Express)", "PHP (Drupal 7 & Drupal 10)"] },
  { category: "Databases & Servers", items: ["MySQL, MongoDB", "Nginx, Apache", "Linux Shell"] },
  { category: "Tools & Platforms", items: ["Git, Docker", "Jira, Confluence", "Azure", "Firebase Messaging"] },
];

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<number>(-1);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="max-w-3xl w-full bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-800 z-10">
        <h1 className="text-5xl  font-semibold mb-8 text-center text-white uppercase">Technology Stack</h1>
        <div className="divide-y divide-gray-700">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="py-6 px-4 hover:bg-gray-800 transition-all duration-300 rounded-md"
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(-1)}
            >
              <h2 className="text-2xl  font-semibold mb-3 text-white flex items-center uppercase">
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

      {/* Pulsating, Flowing Background */}
      <div className="absolute inset-0 bg-pink-400 opacity-30 rounded-full transform rotate-45 animate-pulse z-0"></div>
      <div className="absolute top-1/3 left-1/4 w-2/3 h-2/3 bg-pink-400 opacity-40 rounded-full transform rotate-30 animate-pulse z-0"></div>
      <div className="absolute top-1/3 left-1/2 w-1/2 h-1/4 bg-pink-400 opacity-50 rounded-full transform rotate-60 animate-pulse z-0"></div>

      {/* Curved, flowing elements in background */}
      <div className="absolute top-1/6 left-1/6 w-3/4 h-1/3 bg-pink-300 opacity-60 rounded-full transform rotate-45 animate-pulse z-0"></div>
      <div className="absolute top-1/3 left-1/4 w-2/5 h-2/5 bg-pink-300 opacity-50 rounded-full transform rotate-30 animate-pulse z-0"></div>
      <div className="absolute top-1/4 left-1/3 w-1/3 h-1/3 bg-pink-300 opacity-40 rounded-full transform rotate-60 animate-pulse z-0"></div>
    </div>
  );
}
