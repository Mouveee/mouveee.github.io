"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AlignJustify } from "lucide-react";

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
        className={`overlay fixed w-[100vw] h-[100vh] bg-black pointer-events-none ${isHovered ? 'bg-opacity-80' : 'bg-opacity-0'} z-50 top-0 left-0 transition-opacity duration-1000`}
      >
      </div>

      <div
        className={`fixed h-20 w-20 flex items-start justify-end top-10 right-4 cursor-pointer z-50${currentPath == "/" ? ' animate-bounce' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AlignJustify className="w-8 h-8" color="#D8D1B1" />
      </div>

      {/* Menu Container */}
      <nav
        className={`fixed top-0 right-0 p-8 bg-black h-screen sm:w-fit w-1/2 rounded-l-lg shadow-lg transition-transform duration-300 ease-in-out z-50 border-pink-500 border-l-2 pl-16 ${
          isHovered ? "translate-x-0" : "translate-x-full"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul className="flex flex-col gap-4 text-right">
          <li
            className={`text-xl mb-2 uppercase font-bold transition-transform transform hover:scale-110 hover:text-pink-500 hover:shadow-lg ${
              currentPath === "/intro" ? "text-pink-500" : ""
            }`}
          >
            <Link href="/intro">Intro</Link>
          </li>

          <li
            className={`text-xl mb-2 uppercase font-bold transition-transform transform hover:scale-110 hover:text-pink-500 hover:shadow-lg ${
              currentPath === "/skills" ? "text-pink-500" : ""
            }`}
          >
            <Link href="/skills">Skills</Link>
          </li>

          <li
            className={`text-xl mb-2 uppercase font-bold transition-transform transform hover:scale-110 hover:text-pink-500 hover:shadow-lg ${
              currentPath === "/about" ? "text-pink-500" : ""
            }`}
          >
            <Link href="/about">About</Link>
          </li>

          <li
            className={`text-xl mb-2 uppercase font-bold transition-transform transform hover:scale-110 hover:text-pink-500 hover:shadow-lg ${
              currentPath === "/contact" ? "text-pink-500" : ""
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
