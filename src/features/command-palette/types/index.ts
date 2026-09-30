import React from "react";

export type CommandGroupType =
  | "Navigation"
  | "Projects"
  | "Social & External"
  | "System & Tools";

export type CommandActionType = "navigation" | "external" | "action";

export interface CommandItemData {
  id: string;
  label: string;
  subtitle?: string;
  keywords?: string[];
  icon: React.ReactNode;
  group: CommandGroupType;
  actionType: CommandActionType;
  target?: string;
  shortcut?: string;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
}
