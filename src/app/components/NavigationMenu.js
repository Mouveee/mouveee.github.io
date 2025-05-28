"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AlignJustify } from 'lucide-react';

const NavigationMenu = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return (
    <div className="relative">
      <div
        className="fixed h-10 w-10 flex items-center justify-center top-10 right-8 cursor-pointer z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AlignJustify className="w-20 h-20" color="#D8D1B1"/>
      </div>

      {/* Menu Container */}
      <nav
        className={`fixed top-10 right-8 p-4 bg-black  rounded-lg shadow-lg transition-transform transform duration-300 ease-in-out z-50 ${
          isHovered ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul className="flex flex-col gap-4">
          <li
            className={`text-xl uppercase font-bold transition-transform transform hover:scale-110 hover:text-pink-500 hover:shadow-lg ${
              currentPath === "/intro" ? "hidden" : ""
            }`}
          >
            <Link href="/intro">Intro</Link>
          </li>

          <li
            className={`text-xl uppercase font-bold transition-transform transform hover:scale-110 hover:text-pink-500 hover:shadow-lg ${
              currentPath === "/skills" ? "hidden" : ""
            }`}
          >
            <Link href="/skills">Skills</Link>
          </li>

          <li
            className={`text-xl uppercase font-bold transition-transform transform hover:scale-110 hover:text-pink-500 hover:shadow-lg ${
              currentPath === "/about" ? "hidden" : ""
            }`}
          >
            <Link href="/about">About</Link>
          </li>

          <li
            className={`text-xl uppercase font-bold transition-transform transform hover:scale-110 hover:text-pink-500 hover:shadow-lg ${
              currentPath === "/contact" ? "hidden" : ""
            }`}
          >
            <Link href="/contact">Kontakt</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationMenu;
