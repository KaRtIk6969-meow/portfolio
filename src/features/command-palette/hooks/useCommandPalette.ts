"use client";

import { useState, useEffect, useCallback } from "react";

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  const openPalette = useCallback(() => setIsOpen(true), []);
  const closePalette = useCallback(() => setIsOpen(false), []);
  const togglePalette = useCallback(() => setIsOpen((prev) => !prev), []);

  // Global keyboard shortcut listener (Ctrl+K / Cmd+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Close on Escape if currently open
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Manage body scroll locking and Lenis pausing
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const win = window as unknown as {
      __lenis?: { stop: () => void; start: () => void };
    };
    win.__lenis?.stop();

    return () => {
      document.body.style.overflow = originalOverflow;
      win.__lenis?.start();
    };
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    openPalette,
    closePalette,
    togglePalette,
  };
}
