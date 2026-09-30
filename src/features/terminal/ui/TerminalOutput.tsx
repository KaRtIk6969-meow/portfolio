"use client";

import React from "react";
import { TerminalEntry } from "../types";

interface TerminalOutputProps {
  entries: TerminalEntry[];
}

export function TerminalOutput({ entries }: TerminalOutputProps) {
  return (
    <div className="space-y-3 font-mono">
      {entries.map((entry) => (
        <div key={entry.id} className="space-y-1">
          {entry.command !== "system-init" && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-secondary font-bold select-none">
                guest@cosmos:~$
              </span>
              <span className="text-white font-medium">{entry.command}</span>
            </div>
          )}
          {entry.output && (
            <div className="pl-0 sm:pl-2 text-text-primary text-xs leading-relaxed">
              {entry.output}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
