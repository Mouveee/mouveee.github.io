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
        className="fixed h-20 w-20 flex items-start justify-end top-10 right-4 cursor-pointer z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AlignJustify className="w-8 h-8" color="#D8D1B1" />
      </div>

      {/* Menu Container */}
      <nav
        className={`fixed top-0 right-0 p-8 bg-black h-screen w-64 rounded-l-lg shadow-lg transition-transform duration-300 ease-in-out z-50 border-pink-500 border-1 ${
          isHovered ? "translate-x-0" : "translate-x-full"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul className="flex flex-col gap-4 text-right">
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
