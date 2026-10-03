"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { TerminalEntry } from "../types";
import {
  COMMANDS_REGISTRY,
  executeCommand,
  INITIAL_GREETING_ENTRY,
  renderTabSuggestions,
} from "../constants/commands";

export interface UseTerminalOptions {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export function useTerminal(options?: UseTerminalOptions) {
  const isControlled = typeof options?.isOpen === "boolean";
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isControlled ? Boolean(options?.isOpen) : internalIsOpen;

  const [entries, setEntries] = useState<TerminalEntry[]>([INITIAL_GREETING_ENTRY]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const draftRef = useRef<string>("");

  const openTerminal = useCallback(() => {
    if (isControlled && options?.onOpen) {
      options.onOpen();
    } else {
      setInternalIsOpen(true);
    }
  }, [isControlled, options]);

  const closeTerminal = useCallback(() => {
    if (isControlled && options?.onClose) {
      options.onClose();
    } else {
      setInternalIsOpen(false);
    }
  }, [isControlled, options]);

  const setIsOpen = useCallback(
    (action: boolean | ((prev: boolean) => boolean)) => {
      const nextVal = typeof action === "function" ? action(isOpen) : action;
      if (nextVal) {
        openTerminal();
      } else {
        closeTerminal();
      }
    },
    [isOpen, openTerminal, closeTerminal]
  );

  const toggleTerminal = useCallback(() => {
    if (isOpen) {
      closeTerminal();
    } else {
      openTerminal();
    }
  }, [isOpen, closeTerminal, openTerminal]);

  const clearEntries = useCallback(() => setEntries([]), []);

  // Global keyboard shortcut listener (Ctrl+` or Cmd+` to toggle, Escape to close)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!isControlled && (e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setInternalIsOpen((prev) => !prev);
        return;
      }

      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closeTerminal();
      }
    };

    const handleCustomOpen = () => {
      openTerminal();
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    if (!isControlled) {
      window.addEventListener("cosmos:open-terminal", handleCustomOpen);
    }

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
      if (!isControlled) {
        window.removeEventListener("cosmos:open-terminal", handleCustomOpen);
      }
    };
  }, [isOpen, isControlled, closeTerminal, openTerminal]);

  // Manage body scroll locking and Lenis pausing
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const win = window as unknown as {
      __lenis?: { stop: () => void; start: () => void };
    };
    win.__lenis?.stop();

    return () => {
      document.body.style.overflow = originalOverflow;
      win.__lenis?.start();
    };
  }, [isOpen]);

  const handleCommandSubmit = useCallback((commandToRun?: string) => {
    const raw = (commandToRun !== undefined ? commandToRun : input).trim();
    if (!raw) return;

    const result = executeCommand(raw);

    if (result.action === "clear") {
      setEntries([]);
    } else {
      const newEntry: TerminalEntry = {
        id: `entry-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        command: raw,
        timestamp: Date.now(),
        output: result.output,
        isError: result.isError,
      };
      setEntries((prev) => [...prev, newEntry]);
    }

    setHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);
    draftRef.current = "";
    setInput("");
  }, [input]);

  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleCommandSubmit();
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length === 0) return;

        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        if (historyIndex === -1) {
          draftRef.current = input;
        }
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex === -1) return;

        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInput(draftRef.current);
        } else {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        }
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        const trimmed = input.trim().toLowerCase();
        if (!trimmed) return;

        const availableCommands = Object.keys(COMMANDS_REGISTRY);
        const matches = availableCommands.filter((cmd) => cmd.startsWith(trimmed));

        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          const suggestionsEntry: TerminalEntry = {
            id: `tab-suggest-${Date.now()}`,
            command: input,
            timestamp: Date.now(),
            output: renderTabSuggestions(matches),
          };
          setEntries((prev) => [...prev, suggestionsEntry]);
        }
      }
    },
    [history, historyIndex, input, handleCommandSubmit]
  );

  return {
    isOpen,
    setIsOpen,
    openTerminal,
    closeTerminal,
    toggleTerminal,
    entries,
    input,
    setInput,
    handleCommandSubmit,
    handleKeyDown,
    clearEntries,
  };
}
