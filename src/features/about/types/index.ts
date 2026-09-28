import React from "react";

export interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
  icon: React.ReactNode;
}

export interface AboutBio {
  narrativeEyebrow: string;
  title: string;
  paragraphs: string[];
}
