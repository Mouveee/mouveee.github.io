'use client';

import React, { useState, useEffect } from 'react';
import NavigationMenu from '@/app/components/NavigationMenu';
import Dots from '@/app/components/Dots';

const skills = [
  { category: "Frontend", items: ["JavaScript (TypeScript)", "HTML, CSS (Sass, Tailwind)", "React, Next.js, Vue, Angular (sehr rudimentär)"] },
  { category: "Backend", items: ["Node.js (Express)", "PHP (Drupal 7 & Drupal 10)"] },
  { category: "Databases & Servers", items: ["MySQL, MongoDB", "Nginx, Apache", "Linux Shell"] },
  { category: "Tools & Platforms", items: ["Gitlab, Github", "Jira, Confluence", "Azure", "Firebase Messaging, APNS"] },
  { category: "Qualifications", items: ["Fachinformatiker Anwendungsentwicklung (IHK Saar)", "MS-Exam 70-480 Programming with JS, HTML and CSS"] },
];


export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<number>(-1);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-r from-black via-[#4c09325c] to-black animate-bgMove">
      <div className="max-w-3xl w-full bg-black p-8 rounded-lg shadow-lg border border-gray-800 opacity-90">
        <h1 className="text-5xl font-semibold mb-8 text-center uppercase">Technology Stack</h1>
        <div className="divide-y divide-gray-900">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="py-6 px-4 hover:bg-gray-800 transition-all duration-300 rounded-md"
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(-1)}
            >
              <h2 className="text-2xl font-semibold mb-3 flex items-center uppercase">
                {skill.category}
              </h2>
              <ul className="space-y-2 text-gray-300">
                {skill.items.map((item, i) => (
                  <li
                    key={i}
                    className={`text-lg transition-all duration-300 ${hoveredCategory === index ? ' font-medium' : ''}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Dots numberOfDots={20} />
      <NavigationMenu />
    </div>
  );
}
