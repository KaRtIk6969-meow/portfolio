import React from "react";
import { Orbit, MessageSquare, Activity, ShoppingBag } from "lucide-react";
import { Project } from "../types";

export const PROJECTS_LIST: Project[] = [
  {
    title: "NovaLabsAI",
    category: "AI Agency & Platform",
    description: "An interactive agency platform showcasing cutting-edge AI integrations, fluid physics-based gestures, and responsive Next.js architectures.",
    tags: ["Next.js", "React 19", "TypeScript", "Framer Motion", "Lenis", "Tailwind CSS"],
    github: "https://github.com/KaRtIk6969-meow/NovaLabsAI",
    live: "https://nova-labs-ai.vercel.app",
    icon: <Orbit className="w-5 h-5 text-violet-400" />,
    metric: {
      label: "LIGHTHOUSE",
      value: "98+",
    },
    status: {
      label: "Live Demo",
    },
    theme: {
      bannerGradient: "bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.22)_0%,rgba(30,27,75,0.5)_50%,#030712_100%)]",
      ringBorder: "border-violet-500/25 group-hover:border-violet-400/60",
      iconBorderHover: "group-hover:border-violet-400 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]",
      badgeClass: "bg-violet-500/10 text-violet-300 border-violet-500/30",
      glowShadow: "group-hover:shadow-[0_0_35px_rgba(139,92,246,0.18)] group-hover:border-violet-500/40",
      accentText: "text-violet-400",
      tagClass: "hover:border-violet-400/40 hover:text-violet-300",
    },
  },
  {
    title: "MindBloomm",
    category: "Mental Wellness Sanctuary",
    description: "A personal sanctuary web application engineered for mental wellness, offering compassionate self-navigation tools and accessible guidance.",
    tags: ["React", "Next.js", "Firebase", "Tailwind CSS", "Web APIs"],
    github: "https://github.com/KaRtIk6969-meow/mindBloomm",
    live: "https://mind-bloom-xf.vercel.app",
    icon: <MessageSquare className="w-5 h-5 text-cyan-400" />,
    metric: {
      label: "SANCTUARY",
      value: "Live",
    },
    status: {
      label: "Live Demo",
    },
    theme: {
      bannerGradient: "bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.22)_0%,rgba(8,51,68,0.5)_50%,#030712_100%)]",
      ringBorder: "border-cyan-500/25 group-hover:border-cyan-400/60",
      iconBorderHover: "group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
      badgeClass: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      glowShadow: "group-hover:shadow-[0_0_35px_rgba(6,182,212,0.18)] group-hover:border-cyan-500/40",
      accentText: "text-cyan-400",
      tagClass: "hover:border-cyan-400/40 hover:text-cyan-300",
    },
  },
  {
    title: "Klickonn",
    category: "Full-Stack Media SaaS",
    description: "A high-performance media and publishing platform powered by Neon serverless PostgreSQL, Drizzle ORM, and automated ImageKit pipelines.",
    tags: ["Next.js", "TypeScript", "Drizzle ORM", "Neon Postgres", "ImageKit"],
    github: "https://github.com/KaRtIk6969-meow/klickonn",
    live: "https://klickonn.vercel.app",
    icon: <Activity className="w-5 h-5 text-emerald-400" />,
    metric: {
      label: "SERVERLESS DB",
      value: "< 25ms",
    },
    status: {
      label: "Full Stack",
    },
    theme: {
      bannerGradient: "bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.22)_0%,rgba(6,78,59,0.5)_50%,#030712_100%)]",
      ringBorder: "border-emerald-500/25 group-hover:border-emerald-400/60",
      iconBorderHover: "group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
      badgeClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      glowShadow: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.18)] group-hover:border-emerald-500/40",
      accentText: "text-emerald-400",
      tagClass: "hover:border-emerald-400/40 hover:text-emerald-300",
    },
  },
  {
    title: "Student Management System",
    category: "Academic Systems & OOP",
    description: "A structured academic records architecture built in Python 3 with object-oriented paradigms for managing student credentials and evaluation telemetry.",
    tags: ["Python 3", "OOP Architecture", "Data Modeling", "CLI"],
    github: "https://github.com/KaRtIk6969-meow/student-managment-system",
    icon: <ShoppingBag className="w-5 h-5 text-amber-400" />,
    metric: {
      label: "PARADIGM",
      value: "OOP Core",
    },
    status: {
      label: "Open Source",
    },
    theme: {
      bannerGradient: "bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.22)_0%,rgba(69,26,3,0.5)_50%,#030712_100%)]",
      ringBorder: "border-amber-500/25 group-hover:border-amber-400/60",
      iconBorderHover: "group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]",
      badgeClass: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      glowShadow: "group-hover:shadow-[0_0_35px_rgba(245,158,11,0.18)] group-hover:border-amber-500/40",
      accentText: "text-amber-400",
      tagClass: "hover:border-amber-400/40 hover:text-amber-300",
    },
  },
];
