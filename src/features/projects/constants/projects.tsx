import React from "react";
import { Orbit, MessageSquare, Activity, ShoppingBag } from "lucide-react";
import { Project } from "../types";

export const PROJECTS_LIST: Project[] = [
  {
    title: "Cosmos Engine",
    category: "WebGL / 3D Graphics",
    description: "A high-performance WebGL solar system simulation featuring orbital physics, celestial shaders, and interactive camera controllers.",
    tags: ["Next.js", "TypeScript", "Three.js", "WebGL", "GLSL"],
    github: "https://github.com/KaRtIk6969-meow/cosmos-engine",
    live: "https://cosmos-engine.demo.dev",
    icon: <Orbit className="w-5 h-5 text-violet-400" />,
    metric: {
      label: "RENDER SPEED",
      value: "60 FPS",
    },
    status: {
      label: "Open Source",
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
    title: "Nebula Chat",
    category: "Real-Time Systems",
    description: "An end-to-end encrypted messaging engine powered by WebSockets, zero-latency state sync, and instant full-text search indexing.",
    tags: ["React", "Node.js", "WebSockets", "Tailwind CSS", "Redis"],
    github: "https://github.com/KaRtIk6969-meow/nebula-chat",
    live: "https://nebula-chat.demo.dev",
    icon: <MessageSquare className="w-5 h-5 text-cyan-400" />,
    metric: {
      label: "ROUNDTRIP",
      value: "< 15ms",
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
    title: "Pulsar Monitor",
    category: "Observability & Telemetry",
    description: "An interactive telemetry platform streaming live server metrics, latency anomalies, and automated cloud health diagnostics.",
    tags: ["Next.js", "Chart.js", "REST APIs", "Tailwind CSS", "Docker"],
    github: "https://github.com/KaRtIk6969-meow/pulsar-monitor",
    live: "https://pulsar-monitor.demo.dev",
    icon: <Activity className="w-5 h-5 text-emerald-400" />,
    metric: {
      label: "SYSTEM UPTIME",
      value: "99.98%",
    },
    status: {
      label: "Telemetry",
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
    title: "Quasar Store",
    category: "Headless E-Commerce",
    description: "A lightning-fast headless commerce platform with incremental static regeneration, Stripe integration, and edge-cached search.",
    tags: ["React", "Vite", "Stripe API", "CSS Grid", "Edge Functions"],
    github: "https://github.com/KaRtIk6969-meow/quasar-store",
    live: "https://quasar-store.demo.dev",
    icon: <ShoppingBag className="w-5 h-5 text-amber-400" />,
    metric: {
      label: "LCP METRIC",
      value: "0.78s",
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

