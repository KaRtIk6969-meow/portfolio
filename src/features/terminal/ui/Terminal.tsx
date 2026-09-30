"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Trash2 } from "lucide-react";
import { TerminalProps } from "../types";
import { useTerminal } from "../hooks/useTerminal";
import { TerminalOutput } from "./TerminalOutput";
import { TerminalPrompt } from "./TerminalPrompt";

export default function Terminal({ isOpen = false, onClose }: TerminalProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    entries,
    input,
    setInput,
    handleCommandSubmit,
    handleKeyDown,
    clearEntries,
  } = useTerminal();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Scroll to bottom when new entries arrive
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [entries, isOpen]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Interactive Developer Terminal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          {/* Cosmic backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-surface-main/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleContainerClick}
            className={`relative z-10 w-full glass-panel rounded-xl overflow-hidden border border-border-line/80 shadow-2xl flex flex-col transition-[max-width,height] duration-300 ${
              isMaximized
                ? "max-w-6xl h-[92vh]"
                : "max-w-3xl h-[560px] max-h-[85vh]"
            }`}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-surface-elevated/90 border-b border-border-line/70 select-none shrink-0">
              {/* macOS-style action beads */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close terminal window"
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"
                />
                <button
                  type="button"
                  onClick={clearEntries}
                  aria-label="Clear terminal buffer"
                  title="Clear buffer"
                  className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setIsMaximized((prev) => !prev)}
                  aria-label={isMaximized ? "Restore window size" : "Maximize window"}
                  title={isMaximized ? "Restore size" : "Maximize"}
                  className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer"
                />
              </div>

              {/* Title label */}
              <div className="flex items-center gap-1.5 text-xs font-mono text-text-secondary">
                <TerminalIcon className="w-3.5 h-3.5 text-secondary" aria-hidden="true" />
                <span className="text-white font-medium">cosmos-terminal</span>
                <span className="hidden sm:inline text-text-muted">— guest@cosmos:~</span>
              </div>

              {/* Control buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clearEntries}
                  aria-label="Clear output buffer"
                  title="Clear output"
                  className="p-1 rounded text-text-muted hover:text-white hover:bg-surface-hover text-xs transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMaximized((prev) => !prev)}
                  aria-label={isMaximized ? "Restore window" : "Maximize window"}
                  className="hidden sm:inline-flex p-1 rounded text-text-muted hover:text-white hover:bg-surface-hover text-xs transition-colors cursor-pointer"
                >
                  {isMaximized ? (
                    <Minimize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close terminal dialog"
                  className="p-1 rounded text-text-muted hover:text-white hover:bg-surface-hover text-xs transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Scrollable buffer area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs scrollbar-thin">
              <TerminalOutput entries={entries} />
              <div ref={bottomRef} />
            </div>

            {/* Sticky Prompt input bar */}
            <div className="p-3 bg-surface-elevated/70 border-t border-border-line/60 shrink-0">
              <TerminalPrompt
                ref={inputRef}
                input={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onSubmit={() => handleCommandSubmit()}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
