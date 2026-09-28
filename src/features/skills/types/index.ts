import React from "react";

export type SkillCategory = "frontend" | "backend" | "tools";

export interface SkillItem {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  years: string;
  proficiency: number; // 0 to 100
  tag?: string;
}

export interface CategoryTab {
  id: SkillCategory;
  label: string;
  icon: React.ReactNode;
}
