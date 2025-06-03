'use client';

import React, { useEffect } from "react";
import NavigationMenu from "@/app/components/NavigationMenu";
import Dots from "@/app/components/Dots";

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
    <div className="py-16 px-6 md:px-12 h-screen z-10  bg-gradient-to-r from-black via-[#4c09325c] to-black animate-bgMove">
      <div className="max-w-4xl mx-auto m-auto py-6 px-4 bg-black hover:bg-gray-800 transition-all duration-300 rounded-md z-10 shadow-lg border border-gray-800 opacity-90">
        <h1 className="text-3xl font-semibold mb-4 text-pink-500 fade-in uppercase">
          Marco Huwig – Webentwickler
        </h1>
        <p className="text-lg mb-6 fade-in">
          In den letzten vier Jahren habe ich als Full-Stack-Entwickler bei Neocosmo eine Vielzahl an Webprojekten erfolgreich realisiert. Besonders begeistert mich das Frontend – die Schnittstelle zwischen technischer Umsetzung und herausragendem Nutzererlebnis. Aus diesem Grund möchte ich mich verstärkt auf den Bereich Frontend-Entwicklung konzentrieren.
        </p>
        <p className="text-lg mb-6 fade-in">
          Ich arbeite mit modernen Technologien wie React, NextJS und Vue und lege großen Wert auf sauberen, wartbaren Code, Performance und eine durchdachte User Experience. Mein Ansatz: Probleme strukturiert analysieren, elegante Lösungen finden und Anwendungen gestalten, die nicht nur funktionieren, sondern auch intuitiv bedienbar und ansprechend sind.
        </p>
        <p className="text-lg fade-in">
        Ich suche eine neue Herausforderung, bei der ich digitale Produkte mit echtem Mehrwert gestalten und meine Leidenschaft für nutzerzentriertes Design voll einbringen kann.
        </p>
      </div>

      <Dots numberOfDots={20} />
      <NavigationMenu />
    </div>
  );
};