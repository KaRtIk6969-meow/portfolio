"use client";

import Starfield from "@/features/hero/ui/Starfield";
import Navbar from "@/shared/components/Navbar";
import Hero from "@/features/hero/ui/Hero";
import Projects from "@/features/projects/ui/Projects";
import Skills from "@/features/skills/ui/Skills";
import About from "@/features/about/ui/About";
import Contact from "@/features/contact/ui/Contact";
import { CommandPalette, useCommandPalette } from "@/features/command-palette";
import { Terminal, useTerminal } from "@/features/terminal";
import { smoothScrollTo } from "@/shared/utils/scroll";
import { ArrowUp } from "lucide-react";

export default function Home() {
  const {
    isOpen: isPaletteOpen,
    openPalette,
    closePalette,
  } = useCommandPalette();
  const {
    isOpen: isTerminalOpen,
    openTerminal,
    closeTerminal,
  } = useTerminal();

  return (
    <div className="relative min-h-screen bg-surface-main text-text-primary overflow-x-hidden flex flex-col font-sans">
      {/* Dynamic 3D star particles background */}
      <Starfield />

      {/* Floating navigation header with Command Palette and Terminal triggers */}
      <Navbar
        onOpenCommandPalette={openPalette}
        onOpenTerminal={openTerminal}
      />

      {/* Global Futuristic Command Palette (Ctrl+K) */}
      <CommandPalette isOpen={isPaletteOpen} onClose={closePalette} />

      {/* Interactive Developer Terminal (Ctrl+`) */}
      <Terminal isOpen={isTerminalOpen} onClose={closeTerminal} />


      {/* Main page layout containers flow */}
      <main className="relative z-10 flex flex-col w-full min-w-0">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      {/* Footer copyright and navigation section */}
      <footer className="relative z-10 py-12 px-6 border-t border-border-line/50 text-xs font-mono text-text-secondary bg-surface-main/90">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Kartik Sharma. Cosmic Developer Portfolio.</p>
          
          <button
            onClick={() => smoothScrollTo("hero")}
            className="flex items-center gap-1.5 text-text-secondary hover:text-secondary transition-colors cursor-pointer group py-1 px-3 rounded-full hover:bg-surface-elevated/60"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </footer>
    </div>
  );
}
