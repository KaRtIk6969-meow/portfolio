import React from "react";

export interface ProjectStatus {
  label: string;
}

export interface ProjectTheme {
  bannerGradient: string;
  ringBorder: string;
  iconBorderHover: string;
  badgeClass: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  icon: React.ReactNode;
  status?: ProjectStatus;
  theme?: ProjectTheme;
}
