'use client';
import React from 'react';
import NavigationMenu from '@/app/components/NavigationMenu';
import Dots from '@/app/components/Dots';
import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-r from-black via-[#4c09325c] to-black animate-bgMove">
      <div className="max-w-3xl w-full bg-black p-8 rounded-lg shadow-lg border border-gray-800 opacity-90">
        <h1 className="text-5xl font-semibold text-center uppercase mb-4">Kontakt</h1>

        <div className="divide-y divide-gray-900">
          <div
            className="py-6 px-4 hover:bg-gray-800 transition-all duration-300 rounded-md text-center"
          >
            <ul className="space-y-2 text-gray-300">
              <li
                className={`text-lg transition-all duration-300`}
              >
                Marco Huwig
              </li>

              <li
                className={`text-lg transition-all duration-300`}
              >
                Gärtnerstraße 31
              </li>

              <li
                className={`text-lg transition-all duration-300`}
              >
                66117 Saarbrücken
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link href="mailto:huwig.marco@gmail.com" className="text-center text-2xl uppercase hover:underline hover:text-pink-500 transition">Kontakt aufnehmen</Link>
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