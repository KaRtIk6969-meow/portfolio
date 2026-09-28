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

export interface Project {
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
}

