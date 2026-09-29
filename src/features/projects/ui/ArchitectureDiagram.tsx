"use client";

import React, { useState } from "react";
import { ArrowRight, Cpu, Layers } from "lucide-react";
import { DiagramNode, DiagramConnection } from "../types";

interface ArchitectureDiagramProps {
  title: string;
  description: string;
  nodes: DiagramNode[];
  connections: DiagramConnection[];
  accentColor?: string;
}

export default function ArchitectureDiagram({
  title,
  description,
  nodes,
  connections,
  accentColor = "text-secondary",
}: ArchitectureDiagramProps) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border border-border-line bg-surface-main/90 p-4 sm:p-6 w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-border-line/60">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className={`w-4 h-4 ${accentColor}`} aria-hidden="true" />
            <h4 className="font-sans font-bold text-white text-base sm:text-lg tracking-tight">
              {title}
            </h4>
          </div>
          <p className="text-xs font-mono text-text-secondary mt-1">
            {description}
          </p>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted bg-surface-elevated px-2.5 py-1 rounded-full border border-border-line self-start sm:self-auto">
          Interactive Architecture Flow
        </span>
      </div>

      {/* Nodes Flow: Grid layout with responsive wrapping */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 relative"
        role="region"
        aria-label="Architecture nodes diagram"
      >
        {nodes.map((node, index) => {
          const isSelected = activeNodeId === node.id;
          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNodeId(node.id)}
              onMouseLeave={() => setActiveNodeId(null)}
              tabIndex={0}
              onFocus={() => setActiveNodeId(node.id)}
              onBlur={() => setActiveNodeId(null)}
              className={`relative flex flex-col justify-between p-4 rounded-xl border transition-all duration-300 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                isSelected
                  ? "bg-surface-elevated border-secondary shadow-[0_0_25px_rgba(6,182,212,0.2)] -translate-y-1"
                  : "bg-surface-elevated/70 border-border-line/80 hover:border-secondary/50 hover:bg-surface-elevated"
              }`}
            >
              {/* Step indicator and role badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono text-text-muted">
                  0{index + 1}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-main text-secondary border border-border-line">
                  {node.badge}
                </span>
              </div>

              {/* Node Title & Role */}
              <div className="mb-3">
                <h5 className="font-sans font-bold text-sm text-white mb-1">
                  {node.label}
                </h5>
                <p className={`text-[11px] font-mono font-medium ${accentColor}`}>
                  {node.role}
                </p>
              </div>

              {/* Node Description Details */}
              <p className="text-xs font-sans text-text-secondary leading-relaxed pt-2 border-t border-border-line/50">
                {node.details}
              </p>
            </div>
          );
        })}
      </div>

      {/* Connecting Data Pipelines Telemetry */}
      <div className="mt-6 pt-5 border-t border-border-line/60">
        <h5 className="text-[11px] font-mono uppercase tracking-widest text-text-secondary mb-3 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-secondary" aria-hidden="true" />
          <span>Data Transmission Pipelines</span>
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
          {connections.map((conn, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-elevated/50 border border-border-line/60 text-xs font-mono text-text-secondary"
            >
              <span className="text-white font-semibold capitalize shrink-0">
                {conn.from}
              </span>
              <ArrowRight className="w-3 h-3 text-secondary shrink-0" aria-hidden="true" />
              <span className="text-white font-semibold capitalize shrink-0">
                {conn.to}:
              </span>
              <span className="text-[11px] text-text-muted truncate">
                {conn.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
