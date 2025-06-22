"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const pageOrder = ["/intro", "/skills", "/about", "/contact"];

export default function ScrollNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  const isNavigating = useRef(false);
  const threshold = 100; // Pixels from bottom or top to consider "end"

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (isNavigating.current) return;

      const currentIndex = pageOrder.indexOf(pathname);
      if (currentIndex === -1) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;

      const atBottom = scrollTop + windowHeight >= docHeight - threshold;
      const atTop = scrollTop <= threshold;

      if (event.deltaY > 0 && atBottom && currentIndex < pageOrder.length - 1) {
        // Scroll down at bottom
        isNavigating.current = true;
        router.push(pageOrder[currentIndex + 1]);
      } else if (event.deltaY < 0 && atTop && currentIndex > 0) {
        // Scroll up at top
        isNavigating.current = true;
        router.push(pageOrder[currentIndex - 1]);
      }

      // Reset navigation flag after delay
      setTimeout(() => {
        isNavigating.current = false;
      }, 800);
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [pathname, router]);

  return null;
}
