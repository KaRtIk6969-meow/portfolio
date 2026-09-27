import React from "react";
import { Orbit, MessageSquare, Activity, ShoppingBag } from "lucide-react";
import { Project } from "../types";

export const PROJECTS_LIST: Project[] = [
  {
    title: "Cosmos Engine",
    description: "A WebGL based solar system rendering engine with orbital physics models and custom shader effects.",
    tags: ["Next.js", "TypeScript", "Three.js", "WebGL"],
    github: "#",
    live: "#",
    icon: <Orbit className="w-5 h-5 text-violet-400" />,
    status: {
      label: "Open Source",
    },
    theme: {
      bannerGradient: "bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.2)_0%,rgba(30,27,75,0.45)_50%,#030712_100%)]",
      ringBorder: "border-violet-500/20 group-hover:border-violet-400/50",
      iconBorderHover: "group-hover:border-violet-400 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]",
      badgeClass: "bg-violet-500/10 text-violet-400 border-violet-500/25",
    },
  },
  {
    title: "Nebula Chat",
    description: "A real time encrypted messaging system built with WebSockets, serverless api endpoints, and instant search.",
    tags: ["React", "Node.js", "WebSockets", "Tailwind CSS"],
    github: "#",
    live: "#",
    icon: <MessageSquare className="w-5 h-5 text-cyan-400" />,
    status: {
      label: "Live Demo",
    },
    theme: {
      bannerGradient: "bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.2)_0%,rgba(8,51,68,0.45)_50%,#030712_100%)]",
      ringBorder: "border-cyan-500/20 group-hover:border-cyan-400/50",
      iconBorderHover: "group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]",
      badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
    },
  },
  {
    title: "Pulsar Monitor",
    description: "An interactive telemetry dashboard showing server resource logs and latency spikes on virtual graphs.",
    tags: ["Next.js", "Chart.js", "REST APIs", "Tailwind CSS"],
    github: "#",
    live: "#",
    icon: <Activity className="w-5 h-5 text-emerald-400" />,
    status: {
      label: "Telemetry",
    },
    theme: {
      bannerGradient: "bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.2)_0%,rgba(6,78,59,0.45)_50%,#030712_100%)]",
      ringBorder: "border-emerald-500/20 group-hover:border-emerald-400/50",
      iconBorderHover: "group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]",
      badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    },
  },
  {
    title: "Quasar Store",
    description: "A high speed headless ecommerce platform with responsive layouts and static site generation updates.",
    tags: ["React", "Vite", "Stripe API", "CSS Grid"],
    github: "#",
    live: "#",
    icon: <ShoppingBag className="w-5 h-5 text-amber-400" />,
    status: {
      label: "Open Source",
    },
    theme: {
      bannerGradient: "bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.2)_0%,rgba(69,26,3,0.45)_50%,#030712_100%)]",
      ringBorder: "border-amber-500/20 group-hover:border-amber-400/50",
      iconBorderHover: "group-hover:border-amber-400 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]",
      badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    },
  },
];
