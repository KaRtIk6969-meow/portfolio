"use client";

import React from "react";
import { Command } from "cmdk";
import { ExternalLink, CornerDownLeft } from "lucide-react";
import { CommandItemData } from "../types";

interface CommandItemRowProps {
  command: CommandItemData;
  onSelect: (command: CommandItemData) => void;
}

export default function CommandItemRow({
  command,
  onSelect,
}: CommandItemRowProps) {
  return (
    <Command.Item
      value={`${command.label} ${command.subtitle || ""} ${command.keywords?.join(" ") || ""}`}
      onSelect={() => onSelect(command)}
      className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-text-secondary hover:text-white cursor-pointer select-none transition-all duration-150 data-[selected=true]:bg-surface-hover data-[selected=true]:text-white data-[selected=true]:border-secondary/40 border border-transparent"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-surface-main/80 border border-border-line flex items-center justify-center shrink-0 group-hover:border-secondary/40 group-data-[selected=true]:border-secondary group-data-[selected=true]:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all">
          {command.icon}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-sans font-medium text-white truncate group-data-[selected=true]:text-white">
            {command.label}
          </span>
          {command.subtitle && (
            <span className="text-[11px] font-mono text-text-muted truncate group-data-[selected=true]:text-text-secondary">
              {command.subtitle}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-3">
        {command.shortcut && (
          <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-text-muted bg-surface-main border border-border-line rounded shadow-xs">
            {command.shortcut}
          </kbd>
        )}
        {command.actionType === "external" ? (
          <ExternalLink className="w-3.5 h-3.5 text-text-muted group-data-[selected=true]:text-secondary transition-colors" />
        ) : (
          <CornerDownLeft className="w-3.5 h-3.5 text-text-muted opacity-0 group-data-[selected=true]:opacity-100 group-data-[selected=true]:text-secondary transition-all" />
        )}
      </div>
    </Command.Item>
  );
}
