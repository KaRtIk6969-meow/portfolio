"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Zap, ShieldCheck, CheckCircle2, Layers } from "lucide-react";
import { Project } from "../types";
import ArchitectureDiagram from "./ArchitectureDiagram";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  triggerRef,
}: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"diagram" | "overview" | "stack">("diagram");
  const modalRef = useRef<HTMLDivElement>(null);

  // Manage body scroll lock and Lenis pause
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const win = window as unknown as { __lenis?: { stop: () => void; start: () => void } };
    win.__lenis?.stop();

    return () => {
      document.body.style.overflow = originalOverflow;
      win.__lenis?.start();
    };
  }, [isOpen]);

  // Handle ESC key and focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap initiation and focus restore on exit
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const closeBtn = modalRef.current?.querySelector<HTMLButtonElement>('button[aria-label="Close modal"]');
        closeBtn?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      triggerRef?.current?.focus();
    }
  }, [isOpen, triggerRef]);

  if (!project || !project.caseStudy) return null;
  const { caseStudy } = project;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-surface-main/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Dialog Window */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col glass-panel border border-border-line rounded-2xl shadow-floating bg-surface-elevated/95 overflow-hidden z-10 my-auto text-text-primary"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border-line/70 bg-surface-main/60 shrink-0">
              <div className="min-w-0 pr-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-secondary font-semibold block mb-1">
                  {project.category} · Technical Deep Dive
                </span>
                <h3 id="case-study-title" className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight truncate">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-border-line hover:border-secondary hover:text-secondary text-text-secondary bg-surface-elevated/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-5 sm:px-6 pt-4 border-b border-border-line/60 bg-surface-elevated/40 overflow-x-auto shrink-0">
              {[
                { id: "diagram", label: "Architecture" },
                { id: "overview", label: "Challenge & Solution" },
                { id: "stack", label: "Metrics & Stack" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`pb-3 px-3 text-xs font-mono uppercase tracking-wider transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary shrink-0 ${
                    activeTab === tab.id ? "text-secondary font-bold" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="modal-tab-indicator"
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-secondary"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Modal Body Content (Scrollable) */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm font-sans">
              {activeTab === "diagram" && (
                <div className="space-y-6">
                  <ArchitectureDiagram
                    title={caseStudy.diagram.title}
                    description={caseStudy.diagram.description}
                    nodes={caseStudy.diagram.nodes}
                    connections={caseStudy.diagram.connections}
                  />

                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-secondary" />
                      Key Architectural Highlights
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {caseStudy.architectureHighlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-main/60 border border-border-line/70">
                          <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0 mt-0.5" />
                          <span className="text-xs text-text-secondary">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-secondary mb-2">Overview</h5>
                    <p className="text-text-secondary leading-relaxed">{caseStudy.overview}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-semantic-danger/25 bg-semantic-danger/5">
                      <h5 className="font-mono text-xs uppercase tracking-wider text-semantic-danger mb-2">The Bottleneck & Challenge</h5>
                      <p className="text-xs text-text-secondary leading-relaxed">{caseStudy.challenge}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-semantic-success/25 bg-semantic-success/5">
                      <h5 className="font-mono text-xs uppercase tracking-wider text-semantic-success mb-2">The Architectural Solution</h5>
                      <p className="text-xs text-text-secondary leading-relaxed">{caseStudy.solution}</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-3">Key Engineering Learnings</h5>
                    <ul className="space-y-2">
                      {caseStudy.engineeringLearnings.map((learning, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                          <span>{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "stack" && (
                <div className="space-y-6">
                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-secondary" />
                      Telemetry & Production Benchmarks
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {caseStudy.keyMetrics.map((metric, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-surface-main/80 border border-border-line text-center">
                          <span className="block text-lg font-bold text-white font-mono">{metric.value}</span>
                          <span className="block text-[10px] font-mono uppercase text-secondary font-semibold mt-0.5">{metric.label}</span>
                          <span className="block text-[10px] text-text-muted mt-1 leading-snug">{metric.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-secondary" />
                      Categorized Tooling Stack
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {caseStudy.stackBreakdown.map((group, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-surface-main/60 border border-border-line">
                          <h6 className="text-[11px] font-mono uppercase text-secondary font-bold mb-2">{group.category}</h6>
                          <div className="flex flex-wrap gap-1.5">
                            {group.technologies.map((tech, tIdx) => (
                              <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-elevated text-text-secondary border border-border-line/70">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer CTAs */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-t border-border-line/70 bg-surface-main/60 shrink-0">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-line hover:border-secondary hover:text-white text-xs font-mono text-text-secondary transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>Source Code</span>
              </a>

              <div className="flex items-center gap-2">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-secondary/40 bg-secondary/10 hover:bg-secondary hover:text-surface-main text-secondary text-xs font-mono font-medium transition-all shadow-glow-cyan"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-full bg-surface-elevated text-text-secondary hover:text-white border border-border-line text-xs font-mono cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
