"use client";

import { useState, useEffect } from "react";

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
        className="fixed h-10 w-10 flex items-center justify-center bottom-5 left-1/2 sm:left-auto sm:right-10 -translate-x-1/2 sm:bottom-10 sm:translate-x-0 p-4 rounded-full bg-pink-500 shadow-lg cursor-pointer animate-bounce z-50 border-2 border-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className=" text-2xl font-bold">!</div>
      </div>

      {/* Menu Container */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 bottom-5 sm:left-auto sm:bottom-10 sm:translate-x-0 sm:right-10 p-4 bg-black  rounded-lg shadow-lg transition-transform transform duration-300 ease-in-out z-50 ${
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
            <a href="/intro">Intro</a>
          </li>
          <li
            className={`text-xl uppercase font-bold transition-transform transform hover:scale-110 hover:text-pink-500 hover:shadow-lg ${
              currentPath === "/skills" ? "hidden" : ""
            }`}
          >
            <a href="/skills">Skills</a>
          </li>
          <li
            className={`text-xl uppercase font-bold transition-transform transform hover:scale-110 hover:text-pink-500 hover:shadow-lg ${
              currentPath === "/about" ? "hidden" : ""
            }`}
          >
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationMenu;
