'use client';

import { useEffect } from "react";
import NavigationMenu from "@/app/components/NavigationMenu";

const IntroSection = () => {
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
    <section className="bg-black text-white py-16 px-6 md:px-12 h-screen">
      <div className="max-w-4xl mx-auto m-auto">
        <h1 className="text-3xl font-semibold mb-4 text-pink-500 fade-in">
          Marco Huwig – Webentwickler
        </h1>
        <p className="text-lg mb-6 fade-in">
          Die letzten vier Jahre habe ich als Full-Stack-Entwickler bei Neocosmo
          gearbeitet und dabei vielfältige Webprojekte umgesetzt. Besonders fasziniert
          mich das Frontend – die Schnittstelle zwischen Technik und Nutzererlebnis.
          Deshalb möchte ich meinen Fokus stärker darauf legen.
        </p>
        <p className="text-lg mb-6 fade-in">
          Ich arbeite mit React, Next.js und Vue und lege Wert auf sauberen Code,
          Performance und eine durchdachte User Experience. Mein Ansatz: Probleme
          strukturiert lösen und Anwendungen entwickeln, die nicht nur funktionieren,
          sondern sich auch gut anfühlen.
        </p>
        <p className="text-lg fade-in">
          Lass uns gemeinsam digitale Erlebnisse schaffen, die überzeugen!
        </p>
      </div>
      <NavigationMenu />
    </section>
  );
};

export default IntroSection;
