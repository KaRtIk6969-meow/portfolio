"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Zap } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { theme, status, metric } = project;

  const bannerGradient =
    theme?.bannerGradient ||
    "bg-[radial-gradient(ellipse_at_top,#1e1b4b_0%,#030712_100%)]";
  const ringBorder =
    theme?.ringBorder ||
    "border-secondary/20 group-hover:border-secondary/50";
  const iconBorderHover =
    theme?.iconBorderHover ||
    "group-hover:border-secondary";
  const badgeClass =
    theme?.badgeClass ||
    "bg-secondary/10 text-secondary border-secondary/25";
  const glowShadow =
    theme?.glowShadow ||
    "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] group-hover:border-secondary/40";
  const accentText =
    theme?.accentText || "text-secondary";
  const tagClass =
    theme?.tagClass || "hover:border-secondary/40 hover:text-white";

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
      className={`group relative flex flex-col h-full glass-panel rounded-2xl overflow-hidden glow-hover w-full min-w-0 transition-all duration-500 hover:-translate-y-1.5 ${glowShadow}`}
    >
      {/* Background geometric grid layout header banner */}
      <div className={`h-44 sm:h-48 ${bannerGradient} relative flex items-center justify-center border-b border-border-line overflow-hidden`}>
        {/* Star sparkles background patterns */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />

        {/* Shimmer light sweep on card hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10" />

        {/* Top-Left: Engineering Metric telemetry chip */}
        {metric && (
          <div className="absolute top-3.5 left-3.5 z-20">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider border border-border-line/90 bg-surface-main/80 text-text-secondary backdrop-blur-md shadow-sm">
              <Zap className="w-3 h-3 text-secondary animate-pulse" />
              <span className="text-text-primary font-semibold">{metric.value}</span>
            </span>
          </div>
        )}

        {/* Top-Right: Status Badge configured via data */}
        {status && (
          <div className="absolute top-3.5 right-3.5 z-20">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider border backdrop-blur-md shadow-sm ${badgeClass}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
              {status.label}
            </span>
          </div>
        )}

        {/* Outer Planetary ring decoration */}
        <div className={`absolute w-72 h-72 border rounded-full rotate-12 scale-y-50 group-hover:rotate-45 group-hover:scale-y-75 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none ${ringBorder}`} />

        {/* Inner concentric ring decoration */}
        <div className={`absolute w-48 h-48 border border-dashed rounded-full -rotate-6 scale-y-60 opacity-30 group-hover:rotate-12 transition-all duration-700 ease-out pointer-events-none ${ringBorder}`} />

        {/* Central Icon Pod */}
        <div className={`w-14 h-14 rounded-full bg-surface-main/90 border border-border-line flex items-center justify-center shadow-lg group-hover:scale-110 ${iconBorderHover} transition-all duration-500 z-10 backdrop-blur-md`}>
          {project.icon}
        </div>
      </div>

      {/* Project info body content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Eyebrow category tag */}
          <span className={`text-[10px] font-mono tracking-widest uppercase font-semibold mb-1.5 block ${accentText}`}>
            {project.category}
          </span>

          <h3 className="text-xl sm:text-2xl font-sans font-bold text-white mb-2.5 tracking-tight group-hover:text-white transition-colors">
            {project.title}
          </h3>

          <p className="text-sm font-sans text-text-secondary leading-relaxed mb-6 font-normal">
            {project.description}
          </p>
        </div>

        <div>
          {/* Badges tech list */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className={`text-[10px] font-mono tracking-wider px-2.5 py-1 bg-surface-elevated text-text-secondary border border-border-line/80 rounded-full transition-colors duration-200 ${tagClass}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-between pt-4 border-t border-border-line/60">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border-line bg-surface-elevated/70 text-text-secondary hover:text-white hover:border-text-secondary/50 hover:bg-surface-hover text-xs font-mono transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>Source</span>
            </a>

            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 hover:bg-secondary hover:text-white text-secondary text-xs font-mono font-medium transition-all duration-300 cursor-pointer hover:shadow-glow-cyan active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary`}
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

