"use client";

import { motion } from "framer-motion";
import { ArrowDown, Send, Sparkles } from "lucide-react";
import { Button, smoothScrollTo } from "@/shared";
import { HERO_CONTENT } from "../constants/hero";

export default function Hero() {
  const {
    name,
    availabilityStatus,
    introduction,
    techStack,
    primaryCtaText,
    secondaryCtaText,
  } = HERO_CONTENT;

  const handleScrollTo = (id: string) => {
    smoothScrollTo(id, -20);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center text-center overflow-hidden z-10 px-4 pt-24 pb-12"
    >
      {/* Glow background radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Main text titles container */}
      <div className="max-w-4xl w-full min-w-0 flex flex-col items-center">
        {/* Availability status badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-elevated/80 border border-border-line/80 shadow-card mb-4 sm:mb-5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-semantic-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-semantic-success" />
          </span>
          <span className="text-secondary font-mono text-[11px] sm:text-xs tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            {availabilityStatus}
          </span>
        </motion.div>

        {/* Cinematic split character title animation with word-wrapping protection and optimized LCP */}
        <h1
          aria-label={name}
          className="text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight text-white mb-4 sm:mb-5 leading-tight select-text"
        >
          <span aria-hidden="true">
            {name.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap mx-1.5 sm:mx-2.5">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0.2, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.05 + (wordIndex * 7 + charIndex) * 0.025,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle with refined copy, comfortable line spacing, and enhanced contrast */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="text-base sm:text-lg md:text-xl font-sans text-text-primary/80 max-w-2xl mx-auto font-normal leading-relaxed sm:leading-loose mb-7 sm:mb-8 select-text"
        >
          {introduction}
        </motion.p>

        {/* Dual Call to Action buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-8 sm:mb-10"
        >
          <Button
            variant="primary"
            size="md"
            magnetic
            glow
            onClick={() => handleScrollTo("projects")}
            icon={<ArrowDown className="w-4 h-4" />}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold shadow-glow-violet"
          >
            {primaryCtaText}
          </Button>

          <Button
            variant="secondary"
            size="md"
            magnetic
            onClick={() => handleScrollTo("contact")}
            icon={<Send className="w-4 h-4" />}
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold"
          >
            {secondaryCtaText}
          </Button>
        </motion.div>

        {/* Technical competency pill strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto"
        >
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono tracking-wider px-3 py-1 bg-surface-elevated/60 border border-border-line/70 rounded-full text-text-secondary hover:text-secondary hover:border-secondary/40 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Responsive bouncing scroll cue */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="mt-8 sm:mt-10 flex flex-col items-center gap-1.5 font-mono text-[10px] text-text-secondary tracking-widest uppercase cursor-pointer hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg px-2 py-1 transition-colors"
        onClick={() => handleScrollTo("projects")}
        aria-label="Scroll to projects section"
      >
        <span>Scroll</span>
        <div className="animate-bounce-subtle">
          <ArrowDown className="w-3.5 h-3.5 text-secondary" aria-hidden="true" />
        </div>
      </motion.button>
    </section>
  );
}
