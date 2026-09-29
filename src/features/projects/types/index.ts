import React from "react";

export interface ProjectStatus {
  label: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectTheme {
  bannerGradient: string;
  ringBorder: string;
  iconBorderHover: string;
  badgeClass: string;
  glowShadow: string;
  accentText: string;
  tagClass: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  role: string;
  details: string;
  badge: string;
}

export interface DiagramConnection {
  from: string;
  to: string;
  label: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  description: string;
}

export interface CaseStudyStack {
  category: string;
  technologies: string[];
}

export interface ProjectCaseStudy {
  overview: string;
  challenge: string;
  solution: string;
  architectureHighlights: string[];
  diagram: {
    title: string;
    description: string;
    nodes: DiagramNode[];
    connections: DiagramConnection[];
  };
  keyMetrics: CaseStudyMetric[];
  stackBreakdown: CaseStudyStack[];
  engineeringLearnings: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
  icon: React.ReactNode;
  metric?: ProjectMetric;
  status?: ProjectStatus;
  theme?: ProjectTheme;
  caseStudy?: ProjectCaseStudy;
}
