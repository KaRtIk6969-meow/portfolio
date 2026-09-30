"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { Project } from "../types";
import ProjectModalBody from "./ProjectModalBody";

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
  const [cachedProject, setCachedProject] = useState<Project | null>(project);

  if (project && project !== cachedProject) {
    setCachedProject(project);
  }

  const displayProject = project || cachedProject;

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

  if (!displayProject || !displayProject.caseStudy) return null;
  const { caseStudy } = displayProject;

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
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col glass-panel border border-border-line rounded-2xl shadow-floating bg-surface-elevated/95 overflow-hidden z-10 my-auto text-text-primary"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border-line/70 bg-surface-main/60 shrink-0">
              <div className="min-w-0 pr-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-secondary font-semibold block mb-1">
                  {displayProject.category} · Technical Deep Dive
                </span>
                <h3
                  id="case-study-title"
                  className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight truncate"
                >
                  {displayProject.title}
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
                    activeTab === tab.id
                      ? "text-secondary font-bold"
                      : "text-text-muted hover:text-text-primary"
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
            <ProjectModalBody activeTab={activeTab} caseStudy={caseStudy} />

            {/* Modal Footer CTAs */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-t border-border-line/70 bg-surface-main/60 shrink-0">
              <a
                href={displayProject.github}
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
                {displayProject.live && (
                  <a
                    href={displayProject.live}
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
