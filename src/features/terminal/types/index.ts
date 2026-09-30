import React from "react";

export interface TerminalEntry {
  id: string;
  command: string;
  timestamp: number;
  output: React.ReactNode;
  isError?: boolean;
}

export interface CommandResult {
  output: React.ReactNode;
  isError?: boolean;
  action?: "clear" | "close" | "open-link";
  link?: string;
}

export interface CommandDefinition {
  name: string;
  description: string;
  usage: string;
  aliases?: string[];
  handler: (args: string[]) => CommandResult;
}

export interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}
