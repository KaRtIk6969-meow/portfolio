"use client";

import React, { forwardRef } from "react";
import { CornerDownLeft } from "lucide-react";

interface TerminalPromptProps {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const TerminalPrompt = forwardRef<HTMLInputElement, TerminalPromptProps>(
  function TerminalPrompt({ input, onChange, onKeyDown, onSubmit }, ref) {
    return (
      <div className="flex items-center gap-2 pt-2 border-t border-border-line/60">
        <span className="text-secondary font-mono font-bold text-xs select-none flex items-center gap-1 shrink-0">
          <span>guest@cosmos</span>
          <span className="text-text-muted">:</span>
          <span className="text-cyan-400">~$</span>
        </span>

        <input
          ref={ref}
          type="text"
          value={input}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
          aria-label="Terminal command input"
          placeholder="type a command (e.g. help, skills, neofetch)..."
          className="flex-1 bg-transparent text-text-primary font-mono text-xs focus:outline-none placeholder:text-text-muted/60 min-w-0"
        />

        <button
          type="button"
          onClick={onSubmit}
          aria-label="Execute command"
          className="sm:hidden p-1 rounded bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs transition-colors shrink-0"
        >
          <CornerDownLeft className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    );
  }
);
