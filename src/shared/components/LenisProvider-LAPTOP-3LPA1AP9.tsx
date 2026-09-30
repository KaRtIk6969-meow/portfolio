"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    let animationFrameId: number;
    let isRunning = true;
    
    function raf(time: number) {
      if (!isRunning) return;
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(raf);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (typeof window !== "undefined") {
        (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <>{children}</>;
}
