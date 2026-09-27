"use client";

import { motion } from "framer-motion";
import { ArrowDown, Send, Sparkles } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import { smoothScrollTo } from "@/shared/utils/scroll";

const techStack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Architecture",
];

export default function Hero() {
  const name = "Kartik Sharma";

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
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-elevated/80 border border-border-line/80 shadow-card mb-6 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-semantic-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-semantic-success" />
          </span>
          <span className="text-secondary font-mono text-[11px] sm:text-xs tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Available for New Projects
          </span>
        </motion.div>

        {/* Cinematic split character title animation with word-wrapping protection */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight text-white mb-6 leading-tight select-text">
          {name.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap mx-1.5 sm:mx-2.5">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.25 + (wordIndex * 7 + charIndex) * 0.04,
                  }}
                  className="inline-block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subtitle with optimized readability measure */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="text-base sm:text-xl md:text-2xl font-sans text-text-secondary max-w-2xl mx-auto font-light leading-relaxed mb-10 select-text"
        >
          I&apos;m Kartik Sharma, a developer passionate about modern web development, AI, and crafting fluid, interactive digital experiences.
        </motion.h2>

        {/* Dual Call to Action buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14"
        >
          <Button
            variant="primary"
            size="lg"
            magnetic
            glow
            onClick={() => handleScrollTo("projects")}
            icon={<ArrowDown className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Explore Projects
          </Button>

          <Button
            variant="secondary"
            size="lg"
            magnetic
            onClick={() => handleScrollTo("contact")}
            icon={<Send className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Get In Touch
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="mt-14 sm:mt-16 flex flex-col items-center gap-1.5 font-mono text-[10px] text-text-secondary tracking-widest uppercase cursor-pointer hover:text-secondary transition-colors"
        onClick={() => handleScrollTo("projects")}
        role="button"
        tabIndex={0}
        aria-label="Scroll to projects"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-secondary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
