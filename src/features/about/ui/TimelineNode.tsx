"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { TimelineItem } from "../types";

interface TimelineNodeProps {
  item: TimelineItem;
  index: number;
}

export default function TimelineNode({ item, index }: TimelineNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
      className="relative pl-6 sm:pl-8 pb-8 sm:pb-12 last:pb-0"
    >
      {/* Timeline node icon circle */}
      <div className="absolute -left-4 top-1.5 w-8 h-8 rounded-full bg-surface-main border border-border-line flex items-center justify-center shadow-lg z-10">
        {item.icon}
      </div>

      {/* Content card */}
      <div className="glass-panel p-5 sm:p-6 rounded-xl hover:border-secondary/40 transition-all duration-300 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          <span className="text-[10px] font-mono tracking-widest text-secondary flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {item.year}
          </span>
          <h4 className="text-xs sm:text-sm font-sans font-bold text-white uppercase tracking-wider">
            {item.company}
          </h4>
        </div>

        <h3 className="text-base sm:text-lg font-sans font-bold text-white mb-2">
          {item.role}
        </h3>

        <p className="text-xs sm:text-sm font-sans text-text-secondary leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
