"use client";

import React from "react";
import { motion } from "framer-motion";
import { SkillCategory, SkillItem } from "../types";

interface SkillCardProps {
  skill: SkillItem;
  index: number;
  category: SkillCategory;
}

const categoryGlow: Record<SkillCategory, string> = {
  frontend: "group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.18)]",
  backend: "group-hover:border-violet-400/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.18)]",
  tools: "group-hover:border-emerald-400/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.18)]",
};

const categoryProgressBar: Record<SkillCategory, string> = {
  frontend: "bg-[linear-gradient(90deg,var(--color-primary)_0%,var(--color-secondary)_100%)]",
  backend: "bg-[linear-gradient(90deg,#6366F1_0%,var(--color-primary)_100%)]",
  tools: "bg-[linear-gradient(90deg,#059669_0%,#10B981_100%)]",
};

export default function SkillCard({ skill, index, category }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.04,
      }}
      className={`group relative flex flex-col p-4 sm:p-5 glass-panel rounded-xl glow-hover shadow-md hover:scale-[1.02] cursor-default transition-[transform,box-shadow,border-color] duration-300 w-full min-w-0 ${categoryGlow[category]}`}
    >
      {/* Header: Skill Name & Level Badge */}
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="font-sans font-bold text-white group-hover:text-secondary transition-colors duration-300 text-sm sm:text-base">
          {skill.name}
        </h3>
        <span className="text-[10px] font-mono tracking-wider bg-surface-main text-secondary border border-border-line px-2.5 py-0.5 rounded-full uppercase shrink-0">
          {skill.level}
        </span>
      </div>

      {/* Subtitle Tag */}
      {skill.tag && (
        <p className="text-[11px] font-mono text-text-muted mb-4">
          {skill.tag}
        </p>
      )}

      {/* Footer Info: Experience & Proficiency */}
      <div className="flex items-center justify-between text-[11px] font-mono text-text-secondary mt-auto pt-2">
        <span>Exp: {skill.years}</span>
        <span className="text-text-primary font-semibold">{skill.proficiency}%</span>
      </div>

      {/* Hardware-accelerated GPU scaleX progress bar */}
      <div className="w-full h-1.5 bg-surface-main rounded-full overflow-hidden mt-2.5 border border-border-line/70">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: skill.proficiency / 100 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
          className={`w-full h-full ${categoryProgressBar[category]}`}
        />
      </div>
    </motion.div>
  );
}
