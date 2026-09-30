import React from "react";
import { TerminalEntry } from "../types";
import { COSMOS_ASCII_ART, getSystemInfo } from "./system-info";
import { SITE_CONFIG } from "@/shared/constants/site";
import { ABOUT_BIO, TIMELINE_DATA } from "@/features/about/constants/about";
import { SKILLS_DATA } from "@/features/skills/constants/skills";
import { PROJECTS_LIST } from "@/features/projects/constants/projects";

export function renderAboutOutput(): React.ReactNode {
  return (
    <div className="space-y-2 py-1 text-xs">
      <div className="flex items-center gap-2">
        <span className="text-white font-bold text-sm">{SITE_CONFIG.name}</span>
        <span className="px-2 py-0.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-[10px]">
          {SITE_CONFIG.jobTitle}
        </span>
      </div>
      <p className="text-text-secondary leading-relaxed text-[11px]">
        {ABOUT_BIO.paragraphs[0]}
      </p>
      <div className="border-t border-border-line/60 pt-2 space-y-1">
        <p className="text-secondary font-semibold text-[11px]">Milestones:</p>
        {TIMELINE_DATA.map((t, idx) => (
          <div key={idx} className="flex flex-wrap items-baseline gap-2 text-[11px]">
            <span className="text-text-muted font-mono min-w-[90px]">{t.year}:</span>
            <span className="text-white font-medium">{t.role}</span>
            <span className="text-text-secondary">@ {t.company}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function renderSkillsOutput(): React.ReactNode {
  return (
    <div className="space-y-3 py-1 text-xs">
      <div>
        <p className="text-cyan-400 font-semibold mb-1 text-[11px]">Frontend Stack:</p>
        <p className="text-text-secondary text-[11px] leading-relaxed">
          {SKILLS_DATA.frontend.map((s) => s.name).join(" • ")}
        </p>
      </div>
      <div>
        <p className="text-violet-400 font-semibold mb-1 text-[11px]">Backend & Cloud:</p>
        <p className="text-text-secondary text-[11px] leading-relaxed">
          {SKILLS_DATA.backend.map((s) => s.name).join(" • ")}
        </p>
      </div>
      <div>
        <p className="text-emerald-400 font-semibold mb-1 text-[11px]">DevOps & Tools:</p>
        <p className="text-text-secondary text-[11px] leading-relaxed">
          {SKILLS_DATA.tools.map((s) => s.name).join(" • ")}
        </p>
      </div>
    </div>
  );
}

export function renderProjectsOutput(): React.ReactNode {
  return (
    <div className="space-y-2 py-1 text-xs">
      <p className="text-secondary font-semibold text-[11px]">Selected Works:</p>
      <div className="grid grid-cols-1 gap-2">
        {PROJECTS_LIST.map((proj) => (
          <div key={proj.title} className="p-2 rounded bg-surface-elevated/80 border border-border-line/70">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">{proj.title}</span>
              <span className="text-[10px] text-text-muted font-mono">{proj.category}</span>
            </div>
            <p className="text-[11px] text-text-secondary mt-1">{proj.description}</p>
            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-secondary font-mono">
              <a href={proj.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub ↗
              </a>
              {proj.live && (
                <a href={proj.live} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function renderNeofetchOutput(): React.ReactNode {
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-2 text-xs">
      <pre className="text-secondary font-mono text-[10px] leading-tight select-none">
        {COSMOS_ASCII_ART}
      </pre>
      <div className="space-y-1 text-xs">
        <p className="text-white font-bold border-b border-border-line/70 pb-1">
          guest@cosmos-dev
        </p>
        {getSystemInfo().map((item) => (
          <div key={item.label} className="flex gap-2 text-[11px]">
            <span className="text-secondary font-semibold min-w-[100px]">{item.label}:</span>
            <span className="text-text-secondary">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const INITIAL_GREETING_ENTRY: TerminalEntry = {
  id: "init-welcome",
  command: "system-init",
  timestamp: Date.now(),
  output: (
    <div className="text-xs space-y-1 text-text-secondary pb-1">
      <p className="text-secondary font-semibold">
        COSMOS Deep Space Terminal [Version 2.0.4]
      </p>
      <p className="text-[11px]">
        Type <span className="text-cyan-400 font-bold">help</span> to view available transmissions. Use <span className="text-secondary font-mono">Tab</span> for autocomplete.
      </p>
    </div>
  ),
};

export function renderTabSuggestions(matches: string[]): React.ReactNode {
  return (
    <p className="text-[11px] text-text-muted font-mono">
      Suggestions: <span className="text-secondary">{matches.join("  ")}</span>
    </p>
  );
}
