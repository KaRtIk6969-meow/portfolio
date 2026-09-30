"use client";

import React from "react";
import { Zap, ShieldCheck, CheckCircle2, Layers } from "lucide-react";
import { ProjectCaseStudy } from "../types";
import ArchitectureDiagram from "./ArchitectureDiagram";

interface ProjectModalBodyProps {
  activeTab: "diagram" | "overview" | "stack";
  caseStudy: ProjectCaseStudy;
}

export default function ProjectModalBody({
  activeTab,
  caseStudy,
}: ProjectModalBodyProps) {
  return (
    <div
      data-lenis-prevent
      className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm font-sans"
    >
      {activeTab === "diagram" && (
        <div className="space-y-6">
          <ArchitectureDiagram
            title={caseStudy.diagram.title}
            description={caseStudy.diagram.description}
            nodes={caseStudy.diagram.nodes}
            connections={caseStudy.diagram.connections}
          />

          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              Key Architectural Highlights
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {caseStudy.architectureHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-main/60 border border-border-line/70"
                >
                  <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0 mt-0.5" />
                  <span className="text-xs text-text-secondary">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-secondary mb-2">
              Overview
            </h5>
            <p className="text-text-secondary leading-relaxed">{caseStudy.overview}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-semantic-danger/25 bg-semantic-danger/5">
              <h5 className="font-mono text-xs uppercase tracking-wider text-semantic-danger mb-2">
                The Bottleneck & Challenge
              </h5>
              <p className="text-xs text-text-secondary leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
            <div className="p-4 rounded-xl border border-semantic-success/25 bg-semantic-success/5">
              <h5 className="font-mono text-xs uppercase tracking-wider text-semantic-success mb-2">
                The Architectural Solution
              </h5>
              <p className="text-xs text-text-secondary leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-3">
              Key Engineering Learnings
            </h5>
            <ul className="space-y-2">
              {caseStudy.engineeringLearnings.map((learning, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === "stack" && (
        <div className="space-y-6">
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-secondary" />
              Telemetry & Production Benchmarks
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {caseStudy.keyMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-surface-main/80 border border-border-line text-center"
                >
                  <span className="block text-lg font-bold text-white font-mono">
                    {metric.value}
                  </span>
                  <span className="block text-[10px] font-mono uppercase text-secondary font-semibold mt-0.5">
                    {metric.label}
                  </span>
                  <span className="block text-[10px] text-text-muted mt-1 leading-snug">
                    {metric.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-secondary" />
              Categorized Tooling Stack
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseStudy.stackBreakdown.map((group, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-surface-main/60 border border-border-line"
                >
                  <h6 className="text-[11px] font-mono uppercase text-secondary font-bold mb-2">
                    {group.category}
                  </h6>
                  <div className="flex flex-wrap gap-1.5">
                    {group.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-elevated text-text-secondary border border-border-line/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
