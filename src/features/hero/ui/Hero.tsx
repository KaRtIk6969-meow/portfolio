"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

// Magnetic effect wrapper for CTA buttons
function MagneticButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.button>
  );
}

export default function Hero() {
  const name = "ALEX MERCER";
  
  const handleScrollToProjects = () => {
    const target = document.getElementById("projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden z-10 px-4">
      {/* Glow background radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Main text titles container */}
      <div className="max-w-4xl w-full min-w-0 select-none">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-secondary font-mono tracking-widest text-xs sm:text-sm uppercase mb-3"
        >
          Cosmic Developer Space Portfolio
        </motion.p>

        {/* Cinematic split character title animation */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-sans font-black tracking-tight text-white mb-6 leading-none">
          {name.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4 + index * 0.05,
              }}
              className="inline-block"
              style={{ marginRight: char === " " ? "0.3em" : "0px" }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="text-lg sm:text-2xl font-sans text-text-secondary max-w-2xl mx-auto font-light leading-relaxed mb-8"
        >
          Senior Full Stack Developer building high performance, fluid, and immersive web solutions with pixel perfect layouts.
        </motion.h2>

        {/* Magnetic call to action button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
          className="flex justify-center"
        >
          <MagneticButton
            onClick={handleScrollToProjects}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-sans font-semibold text-sm tracking-wide shadow-lg cursor-pointer transition-all duration-300 hover:bg-opacity-90 hover:scale-105"
          >
            {/* Glowing borders */}
            <span className="absolute inset-0 rounded-full border border-secondary opacity-30 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
            Explore Projects
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Subtle bouncing scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 font-mono text-[10px] text-text-secondary tracking-widest uppercase cursor-pointer"
        onClick={handleScrollToProjects}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-secondary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
