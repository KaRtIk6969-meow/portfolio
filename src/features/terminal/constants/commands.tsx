import React from "react";
import { CommandDefinition, CommandResult } from "../types";
import { SITE_CONFIG } from "@/shared/constants/site";
import { CONTACT_INFO } from "@/features/contact/constants/contact";
import {
  renderAboutOutput,
  renderSkillsOutput,
  renderProjectsOutput,
  renderNeofetchOutput,
  INITIAL_GREETING_ENTRY,
  renderTabSuggestions,
} from "./command-renderers";

export { INITIAL_GREETING_ENTRY, renderTabSuggestions };

export const COMMANDS_REGISTRY: Record<string, CommandDefinition> = {
  help: {
    name: "help",
    description: "Display all available terminal commands and syntax",
    usage: "help",
    handler: () => ({
      output: (
        <div className="space-y-1.5 py-1">
          <p className="text-secondary font-semibold text-xs tracking-wider uppercase mb-1">
            Available Terminal Commands:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
            {Object.values(COMMANDS_REGISTRY).map((cmd) => (
              <div key={cmd.name} className="flex items-baseline gap-2">
                <span className="text-secondary font-bold font-mono min-w-[72px]">
                  {cmd.name}
                </span>
                <span className="text-text-secondary text-[11px]">
                  {cmd.description}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-text-muted mt-2">
            Tip: Press <kbd className="px-1 py-0.5 rounded bg-surface-elevated border border-border-line text-secondary text-[10px]">Tab</kbd> for autocomplete and <kbd className="px-1 py-0.5 rounded bg-surface-elevated border border-border-line text-secondary text-[10px]">↑/↓</kbd> for history.
          </p>
        </div>
      ),
    }),
  },

  about: {
    name: "about",
    description: "Display developer bio, role, and background",
    usage: "about",
    handler: () => ({
      output: renderAboutOutput(),
    }),
  },

  skills: {
    name: "skills",
    description: "Display technical competency stack",
    usage: "skills",
    handler: () => ({
      output: renderSkillsOutput(),
    }),
  },

  projects: {
    name: "projects",
    description: "List featured engineering projects",
    usage: "projects",
    handler: () => ({
      output: renderProjectsOutput(),
    }),
  },

  github: {
    name: "github",
    description: "Open GitHub developer profile in a new tab",
    usage: "github",
    handler: () => {
      if (typeof window !== "undefined") {
        window.open(SITE_CONFIG.github, "_blank", "noopener,noreferrer");
      }
      return {
        output: (
          <p className="text-secondary text-xs">
            Opening GitHub profile: <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" className="underline">{SITE_CONFIG.github}</a>
          </p>
        ),
        action: "open-link",
        link: SITE_CONFIG.github,
      };
    },
  },

  contact: {
    name: "contact",
    description: "Display developer transmission coordinates",
    usage: "contact",
    handler: () => ({
      output: (
        <div className="space-y-1.5 py-1 text-xs">
          <p className="text-secondary font-semibold text-[11px]">Communication Channels:</p>
          <p className="text-text-secondary text-[11px]">
            Email: <a href={`mailto:${CONTACT_INFO.email}`} className="text-white underline">{CONTACT_INFO.email}</a>
          </p>
          <p className="text-text-secondary text-[11px]">
            GitHub: <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" className="text-white underline">{SITE_CONFIG.github}</a>
          </p>
          <p className="text-text-secondary text-[11px]">
            Location: Apex / Remote Planetary Relay
          </p>
        </div>
      ),
    }),
  },

  resume: {
    name: "resume",
    description: "Open resume if URL is configured",
    usage: "resume",
    handler: () => {
      const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL;
      if (resumeUrl) {
        if (typeof window !== "undefined") {
          window.open(resumeUrl, "_blank", "noopener,noreferrer");
        }
        return {
          output: <p className="text-secondary text-xs">Opening resume document...</p>,
          action: "open-link",
          link: resumeUrl,
        };
      }
      return {
        output: (
          <p className="text-text-secondary text-xs">
            Resume URL is not configured. Please contact <a href={`mailto:${CONTACT_INFO.email}`} className="text-secondary underline">{CONTACT_INFO.email}</a> for credentials.
          </p>
        ),
      };
    },
  },

  clear: {
    name: "clear",
    description: "Clear terminal buffer output",
    usage: "clear",
    handler: () => ({
      output: null,
      action: "clear",
    }),
  },

  whoami: {
    name: "whoami",
    description: "Display simulated visitor session identity",
    usage: "whoami",
    handler: () => ({
      output: (
        <div className="text-xs space-y-0.5">
          <p className="text-secondary font-semibold">guest@deepspace-terminal</p>
          <p className="text-text-secondary text-[11px]">Role: Planetary Explorer (Read-Only)</p>
          <p className="text-text-muted text-[10px]">Session: Verified Guest Token</p>
        </div>
      ),
    }),
  },

  date: {
    name: "date",
    description: "Display current date and time telemetry",
    usage: "date",
    handler: () => {
      const now = new Date();
      return {
        output: (
          <div className="text-xs font-mono space-y-0.5">
            <p className="text-text-primary">UTC: {now.toUTCString()}</p>
            <p className="text-text-secondary text-[11px]">Local: {now.toString()}</p>
          </div>
        ),
      };
    },
  },

  echo: {
    name: "echo",
    description: "Print the supplied text arguments",
    usage: "echo <text>",
    handler: (args: string[]) => ({
      output: <p className="text-text-primary text-xs font-mono">{args.join(" ")}</p>,
    }),
  },

  neofetch: {
    name: "neofetch",
    description: "Display COSMOS portfolio system-information card",
    usage: "neofetch",
    handler: () => ({
      output: renderNeofetchOutput(),
    }),
  },
};

export function executeCommand(input: string): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { output: null };
  }

  const [cmdName, ...args] = trimmed.split(/\s+/);
  const normalizedCmd = cmdName.toLowerCase();

  const command = COMMANDS_REGISTRY[normalizedCmd];
  if (command) {
    return command.handler(args);
  }

  return {
    isError: true,
    output: (
      <p className="text-semantic-danger text-xs font-mono">
        command not found: <span className="font-bold text-white">{cmdName}</span>. Type <span className="text-secondary font-bold">help</span> to view available commands.
      </p>
    ),
  };
}
