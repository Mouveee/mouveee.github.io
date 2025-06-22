"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const pageOrder = ["/intro", "/skills", "/about", "/contact"];
const threshold = 100; // Pixels from top/bottom to allow navigation

export default function ScrollNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  const isNavigating = useRef(false);
  const touchStartY = useRef(0);

  const getScrollState = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.body.scrollHeight;

    return {
      atBottom: scrollTop + windowHeight >= docHeight - threshold,
      atTop: scrollTop <= threshold,
    };
  };

  useEffect(() => {

    const navigateIfNeeded = (direction: "up" | "down") => {
      const currentIndex = pageOrder.indexOf(pathname);
      if (currentIndex === -1 || isNavigating.current) return;

      const { atTop, atBottom } = getScrollState();

      if (direction === "down" && atBottom && currentIndex < pageOrder.length - 1) {
        isNavigating.current = true;
        router.push(pageOrder[currentIndex + 1]);
      } else if (direction === "up" && atTop && currentIndex > 0) {
        isNavigating.current = true;
        router.push(pageOrder[currentIndex - 1]);
      }

      setTimeout(() => {
        isNavigating.current = false;
      }, 800); // Adjust delay as needed
    };

    // Mobile touch
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (deltaY > 50) {
        navigateIfNeeded("down");
      } else if (deltaY < -50) {
        navigateIfNeeded("up");
      }
    };

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [pathname, router]);

  return null;
}
