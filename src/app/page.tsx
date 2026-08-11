"use client";

import { motion } from "framer-motion";
import Starfield from "@/features/hero/ui/Starfield";
import Hero from "@/features/hero/ui/Hero";
import Projects from "@/features/projects/ui/Projects";
import Skills from "@/features/skills/ui/Skills";
import About from "@/features/about/ui/About";
import Contact from "@/features/contact/ui/Contact";

export default function Home() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-surface-main text-text-primary overflow-hidden flex flex-col font-sans select-none">
      {/* Dynamic 3D star particles background */}
      <Starfield />

      {/* Floating navigation header menu */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 h-16 glass-panel border-b border-border-line/40 z-50 flex items-center justify-between px-6 sm:px-12 backdrop-blur-md"
      >
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          {/* Futuristic logo icon */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center animate-pulse" />
          <span className="font-mono text-sm tracking-widest text-white font-bold">
            COSMOS
          </span>
        </div>

        <nav className="hidden sm:flex items-center gap-8 text-xs font-mono tracking-wider">
          <button
            onClick={() => handleScroll("projects")}
            className="text-text-secondary hover:text-white transition-colors cursor-pointer"
          >
            PROJECTS
          </button>
          <button
            onClick={() => handleScroll("skills")}
            className="text-text-secondary hover:text-white transition-colors cursor-pointer"
          >
            SKILLS
          </button>
          <button
            onClick={() => handleScroll("about")}
            className="text-text-secondary hover:text-white transition-colors cursor-pointer"
          >
            ABOUT
          </button>
          <button
            onClick={() => handleScroll("contact")}
            className="text-text-secondary hover:text-white transition-colors cursor-pointer"
          >
            CONTACT
          </button>
        </nav>
      </motion.header>

      {/* Main page layout containers flow */}
      <main className="relative z-10 flex flex-col w-full min-w-0">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      {/* Footer copyright section */}
      <footer className="relative z-10 py-12 px-6 border-t border-border-line/40 text-center text-xs font-mono text-text-secondary bg-surface-main/80">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Alex Mercer. Cosmic Developer Portfolio.</p>
          <p>Created with Next.js, Framer Motion, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
