"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Database, Terminal } from "lucide-react";

interface SkillItem {
  name: string;
  level: string;
  years: string;
}

type Categories = "frontend" | "backend" | "tools";

const skillsData: Record<Categories, SkillItem[]> = {
  frontend: [
    { name: "React", level: "Expert", years: "5 Years" },
    { name: "Next.js", level: "Expert", years: "3 Years" },
    { name: "TypeScript", level: "Expert", years: "4 Years" },
    { name: "Tailwind CSS", level: "Expert", years: "5 Years" },
    { name: "Framer Motion", level: "Advanced", years: "2 Years" },
    { name: "HTML5 / CSS3", level: "Expert", years: "6 Years" },
    { name: "JavaScript", level: "Expert", years: "6 Years" },
  ],
  backend: [
    { name: "Node.js", level: "Expert", years: "4 Years" },
    { name: "Express", level: "Advanced", years: "4 Years" },
    { name: "PostgreSQL", level: "Advanced", years: "3 Years" },
    { name: "MongoDB", level: "Advanced", years: "3 Years" },
    { name: "Redis", level: "Intermediate", years: "2 Years" },
    { name: "GraphQL", level: "Advanced", years: "2 Years" },
    { name: "REST APIs", level: "Expert", years: "5 Years" },
  ],
  tools: [
    { name: "Git / GitHub", level: "Expert", years: "6 Years" },
    { name: "Docker", level: "Advanced", years: "2 Years" },
    { name: "Vercel", level: "Expert", years: "3 Years" },
    { name: "AWS", level: "Intermediate", years: "2 Years" },
    { name: "Linux", level: "Advanced", years: "4 Years" },
    { name: "VS Code", level: "Expert", years: "6 Years" },
  ],
};

const categoryTabs = [
  { id: "frontend" as const, label: "Frontend", icon: <Code2 className="w-4 h-4" /> },
  { id: "backend" as const, label: "Backend", icon: <Database className="w-4 h-4" /> },
  { id: "tools" as const, label: "Tools", icon: <Terminal className="w-4 h-4" /> },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<Categories>("frontend");

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto w-full min-w-0">
      <div className="text-center mb-10 sm:mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-secondary font-mono tracking-widest text-xs uppercase mb-2"
        >
          My Capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white"
        >
          SKILLS MATRIX
        </motion.h2>
      </div>

      {/* Tabs controllers for active categories with responsive overflow protection */}
      <div className="flex justify-center mb-8 sm:mb-12 w-full overflow-x-auto py-1 scrollbar-none">
        <div className="inline-flex max-w-full bg-surface-elevated/90 border border-border-line rounded-full p-1 sm:p-1.5 shadow-inner">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                  isActive ? "text-white" : "text-text-secondary hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-primary rounded-full shadow-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.icon}</span>
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills list cards container grid */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full min-w-0"
          >
            {skillsData[activeCategory].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.05,
                }}
                className="group relative flex flex-col p-4 sm:p-5 glass-panel rounded-xl glow-hover shadow-md hover:scale-[1.03] cursor-default transition-transform duration-300 w-full min-w-0"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-sans font-bold text-white group-hover:text-secondary transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] font-mono tracking-widest bg-surface-main text-secondary border border-border-line px-2.5 py-0.5 rounded-full uppercase">
                    {skill.level}
                  </span>
                </div>
                
                <p className="text-[11px] font-mono text-text-secondary mt-auto">
                  Experience: {skill.years}
                </p>

                {/* Subtle indicator bar using GPU scaleX instead of width reflow */}
                <div className="w-full h-1 bg-surface-main rounded-full overflow-hidden mt-3 border border-border-line">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX:
                        skill.level === "Expert"
                          ? 1
                          : skill.level === "Advanced"
                          ? 0.8
                          : 0.6,
                    }}
                    style={{ originX: 0 }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
                    className="w-full h-full bg-[linear-gradient(90deg,var(--color-primary)_0%,var(--color-secondary)_100%)]"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
