"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { theme, status } = project;

  const bannerGradient =
    theme?.bannerGradient ||
    "bg-[radial-gradient(ellipse_at_top,#1e1b4b_0%,#030712_100%)]";
  const ringBorder =
    theme?.ringBorder ||
    "border-secondary/15 group-hover:border-secondary/40";
  const iconBorderHover =
    theme?.iconBorderHover ||
    "group-hover:border-secondary";
  const badgeClass =
    theme?.badgeClass ||
    "bg-secondary/10 text-secondary border-secondary/25";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
      className="group relative flex flex-col h-full glass-panel rounded-2xl overflow-hidden glow-hover w-full min-w-0"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Background geometric grid layout header banner */}
      <div className={`h-40 sm:h-44 ${bannerGradient} relative flex items-center justify-center border-b border-border-line overflow-hidden`}>
        {/* Star sparkles background patterns */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {/* Status Badge configured via data */}
        {status && (
          <div className="absolute top-3.5 right-3.5 z-20">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider border backdrop-blur-md ${badgeClass}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {status.label}
            </span>
          </div>
        )}

        {/* Planetary ring background decoration */}
        <div className={`absolute w-64 h-64 border rounded-full rotate-12 scale-y-50 group-hover:scale-y-75 transition-all duration-700 ease-out pointer-events-none ${ringBorder}`} />

        <div className={`w-12 h-12 rounded-full bg-surface-main/90 border border-border-line flex items-center justify-center shadow-lg group-hover:scale-110 ${iconBorderHover} transition-all duration-500 z-10 backdrop-blur-sm`}>
          {project.icon}
        </div>
      </div>

      {/* Project info body content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-sans font-bold text-white mb-2 flex items-center gap-2">
            {project.title}
          </h3>

          <p className="text-sm font-sans text-text-secondary leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        <div>
          {/* Badges list */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="text-[10px] font-mono tracking-wider px-2.5 py-1 bg-surface-elevated text-secondary border border-border-line rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Code link CTAs */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-text-secondary hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded px-1"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              Code
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-text-secondary hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded px-1"
            >
              <ExternalLink className="w-4 h-4" />
              Preview
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
