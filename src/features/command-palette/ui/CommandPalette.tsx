"use client";

import React, { useCallback, useRef } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Compass } from "lucide-react";
import { COMMANDS } from "../constants/commands";
import { CommandItemData, CommandPaletteProps } from "../types";
import CommandItemRow from "./CommandItemRow";
import { smoothScrollTo } from "@/shared/utils/scroll";

export default function CommandPalette({
  isOpen = false,
  onClose,
}: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = useCallback(
    (command: CommandItemData) => {
      onClose?.();

      if (command.onSelect) {
        command.onSelect();
        return;
      }

      if (command.actionType === "navigation" && command.target) {
        // Small delay to allow modal exit animation to feel natural
        setTimeout(() => {
          smoothScrollTo(command.target!, -70);
        }, 100);
      } else if (command.actionType === "external" && command.target) {
        if (command.target.startsWith("mailto:")) {
          window.location.href = command.target;
        } else {
          window.open(command.target, "_blank", "noopener,noreferrer");
        }
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-28 px-4"
        >
          {/* Glassmorphic backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-surface-main/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl z-10 glass-panel rounded-2xl overflow-hidden border border-secondary/30 shadow-[0_0_50px_rgba(6,182,212,0.18)] flex flex-col max-h-[80vh]"
          >
            <Command
              label="Cosmic Navigation Command Palette"
              className="flex flex-col h-full w-full bg-surface-elevated/95"
            >
              {/* Header search bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-line/80 relative">
                <Search className="w-4 h-4 text-secondary shrink-0 animate-pulse" />
                <Command.Input
                  ref={inputRef}
                  autoFocus
                  placeholder="Type a destination or search cosmic creations..."
                  className="w-full bg-transparent text-sm sm:text-base text-text-primary placeholder:text-text-muted focus:outline-none font-sans"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close command palette"
                  className="p-1 rounded-md text-text-muted hover:text-white hover:bg-surface-hover/80 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable commands list */}
              <Command.List
                data-lenis-prevent
                className="overflow-y-auto max-h-[55vh] p-2.5 space-y-4 focus:outline-none scrollbar-thin scrollbar-thumb-border-line"
              >
                <Command.Empty className="py-12 text-center flex flex-col items-center justify-center text-text-muted">
                  <Compass className="w-8 h-8 text-secondary/40 mb-2 animate-spin-slow" />
                  <p className="text-sm font-medium text-text-secondary">
                    No galactic destinations found.
                  </p>
                  <p className="text-xs font-mono text-text-muted mt-1">
                    Try searching for &quot;Projects&quot;, &quot;Skills&quot;, or &quot;NovaLabsAI&quot;
                  </p>
                </Command.Empty>

                {/* Group: Navigation */}
                <Command.Group
                  heading={
                    <span className="text-[10px] font-mono tracking-widest uppercase text-secondary/80 px-2.5 py-1 font-semibold block">
                      Navigation
                    </span>
                  }
                >
                  {COMMANDS.filter((c) => c.group === "Navigation").map((cmd) => (
                    <CommandItemRow
                      key={cmd.id}
                      command={cmd}
                      onSelect={handleSelect}
                    />
                  ))}
                </Command.Group>

                {/* Group: Projects */}
                <Command.Group
                  heading={
                    <span className="text-[10px] font-mono tracking-widest uppercase text-violet-400/80 px-2.5 py-1 font-semibold block">
                      Projects & Creations
                    </span>
                  }
                >
                  {COMMANDS.filter((c) => c.group === "Projects").map((cmd) => (
                    <CommandItemRow
                      key={cmd.id}
                      command={cmd}
                      onSelect={handleSelect}
                    />
                  ))}
                </Command.Group>

                {/* Group: Social & External */}
                <Command.Group
                  heading={
                    <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400/80 px-2.5 py-1 font-semibold block">
                      External Transmissions
                    </span>
                  }
                >
                  {COMMANDS.filter((c) => c.group === "Social & External").map((cmd) => (
                    <CommandItemRow
                      key={cmd.id}
                      command={cmd}
                      onSelect={handleSelect}
                    />
                  ))}
                </Command.Group>

                {/* Group: System & Tools */}
                <Command.Group
                  heading={
                    <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400/80 px-2.5 py-1 font-semibold block">
                      System & Tools
                    </span>
                  }
                >
                  {COMMANDS.filter((c) => c.group === "System & Tools").map((cmd) => (
                    <CommandItemRow
                      key={cmd.id}
                      command={cmd}
                      onSelect={handleSelect}
                    />
                  ))}
                </Command.Group>
              </Command.List>

              {/* Palette footer telemetry cues */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-border-line/70 bg-surface-main/80 text-[11px] font-mono text-text-muted">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-elevated border border-border-line text-[10px] text-text-secondary">
                      ↑↓
                    </kbd>
                    <span>Navigate</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-elevated border border-border-line text-[10px] text-text-secondary">
                      ↵
                    </kbd>
                    <span>Select</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-elevated border border-border-line text-[10px] text-text-secondary">
                      ESC
                    </kbd>
                    <span>Close</span>
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-[10px] font-semibold tracking-wider">
                    CTRL+K
                  </span>
                </div>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
