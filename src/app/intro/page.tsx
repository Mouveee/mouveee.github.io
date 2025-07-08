'use client';

import React, { useEffect } from "react";
import NavigationMenu from "@/app/components/NavigationMenu";

export default function IntroSection() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          el.classList.add("animate-fadeIn");
        } else {
          el.classList.remove("animate-fadeIn");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden p-10">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#4c09325c] to-black animate-bgMove z-0"></div>
      <h1 className="text-4xl font-bold tracking-wide uppercase z-10">
        Marco Huwig – Webentwickler
      </h1>
      <div className="max-w-4xl mt-12 mx-auto m-auto py-6 px-4 bg-black hover:bg-gray-800 transition-all duration-300 rounded-md z-10 shadow-lg border border-gray-800 opacity-90">
        <p className="text-lg mb-6 fade-in">
          Mein Name ist Marco Huwig, ich lebe in Saarbrücken und bin ausgebildeter Webentwickler.
        </p>
        <p className="text-lg mb-6 fade-in">
          In den letzten vier Jahren habe ich als Fullstack-Entwickler bei Neocosmo eine Vielzahl an Webprojekten erfolgreich
          realisiert. Dazu zählt die Entwicklung von Frontend Komponenten, das Entwickeln und Integrieren von REST APIs,
          sowie Wartung und Support für bestehende Funktionalitäten.
        </p>
        <p className="text-lg mb-6 fade-in">
          Ich arbeite mit modernen Technologien wie React, NextJS und Vue und lege großen Wert auf sauberen,
          wartbaren Code, Performance und eine durchdachte User Experience. Mein Ansatz: Probleme strukturiert analysieren,
          elegante Lösungen finden und Anwendungen gestalten, die nicht nur funktionieren, sondern auch intuitiv bedienbar
          und ansprechend sind.
        </p>
        <p className="text-lg fade-in">
          Ich suche eine neue Herausforderung, bei der ich digitale Produkte gestalten
          und meine Leidenschaft für nutzerzentriertes Design voll einbringen kann.
        </p>
      </div>

      
      <NavigationMenu />
    </div>
  );
};