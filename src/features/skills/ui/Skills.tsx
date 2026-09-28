"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORY_TABS, SKILLS_DATA } from "../constants/skills";
import { SkillCategory } from "../types";
import SkillCard from "./SkillCard";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("frontend");

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 max-w-7xl mx-auto w-full min-w-0">
      {/* Section Header */}
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

      {/* Tabs controller with responsive horizontal overflow protection */}
      <div className="flex justify-center mb-8 sm:mb-12 w-full overflow-x-auto py-1 scrollbar-none">
        <div className="inline-flex max-w-full bg-surface-elevated/90 border border-border-line rounded-full p-1 sm:p-1.5 shadow-inner">
          {CATEGORY_TABS.map((tab) => {
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

      {/* Animated Skills Grid */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full min-w-0"
          >
            {SKILLS_DATA[activeCategory].map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                category={activeCategory}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
