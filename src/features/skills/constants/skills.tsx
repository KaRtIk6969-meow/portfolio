import React from "react";
import { Code2, Database, Terminal } from "lucide-react";
import { CategoryTab, SkillCategory, SkillItem } from "../types";

export const CATEGORY_TABS: CategoryTab[] = [
  { id: "frontend", label: "Frontend", icon: <Code2 className="w-4 h-4" /> },
  { id: "backend", label: "Backend", icon: <Database className="w-4 h-4" /> },
  { id: "tools", label: "Tools", icon: <Terminal className="w-4 h-4" /> },
];

export const SKILLS_DATA: Record<SkillCategory, SkillItem[]> = {
  frontend: [
    { name: "React 19", level: "Expert", years: "5 Years", proficiency: 95, tag: "Components & Hooks" },
    { name: "Next.js 16", level: "Expert", years: "4 Years", proficiency: 94, tag: "App Router & SSR" },
    { name: "TypeScript", level: "Expert", years: "4 Years", proficiency: 92, tag: "Type Systems & Generics" },
    { name: "Tailwind CSS", level: "Expert", years: "5 Years", proficiency: 96, tag: "v4 @theme & Design Tokens" },
    { name: "Framer Motion", level: "Advanced", years: "3 Years", proficiency: 88, tag: "Spring Physics & Gestures" },
    { name: "HTML5 / CSS3", level: "Expert", years: "6 Years", proficiency: 98, tag: "Semantics & Glassmorphism" },
    { name: "JavaScript", level: "Expert", years: "6 Years", proficiency: 95, tag: "ESNext & Event Loop" },
  ],
  backend: [
    { name: "Node.js", level: "Expert", years: "4 Years", proficiency: 90, tag: "Runtime & Async I/O" },
    { name: "Express", level: "Advanced", years: "4 Years", proficiency: 86, tag: "REST Middleware" },
    { name: "PostgreSQL", level: "Advanced", years: "3 Years", proficiency: 84, tag: "Relational Queries & Indexing" },
    { name: "MongoDB", level: "Advanced", years: "3 Years", proficiency: 82, tag: "Document Models & Aggregates" },
    { name: "Redis", level: "Intermediate", years: "2 Years", proficiency: 76, tag: "In-Memory Caching & PubSub" },
    { name: "GraphQL", level: "Advanced", years: "2 Years", proficiency: 80, tag: "Schemas & Resolvers" },
    { name: "REST APIs", level: "Expert", years: "5 Years", proficiency: 94, tag: "API Contracts & Security" },
  ],
  tools: [
    { name: "Git / GitHub", level: "Expert", years: "6 Years", proficiency: 95, tag: "Branching & CI Actions" },
    { name: "Docker", level: "Advanced", years: "2 Years", proficiency: 82, tag: "Containers & Compose" },
    { name: "Vercel", level: "Expert", years: "3 Years", proficiency: 92, tag: "Edge Deployment & Preview" },
    { name: "AWS", level: "Intermediate", years: "2 Years", proficiency: 74, tag: "S3, CloudFront & Lambda" },
    { name: "Linux", level: "Advanced", years: "4 Years", proficiency: 85, tag: "Shell Scripting & Sysadmin" },
    { name: "VS Code", level: "Expert", years: "6 Years", proficiency: 96, tag: "Workflow & Extensions" },
  ],
};
