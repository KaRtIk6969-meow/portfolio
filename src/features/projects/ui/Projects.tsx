"use client";

import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  icon: React.ReactNode;
}

const projectsList: Project[] = [
  {
    title: "Cosmos Engine",
    description: "A WebGL based solar system rendering engine with orbital physics models and custom shader effects.",
    tags: ["Next.js", "TypeScript", "Three.js", "WebGL"],
    github: "#",
    live: "#",
    icon: <Sparkles className="w-5 h-5 text-secondary" />,
  },
  {
    title: "Nebula Chat",
    description: "A real time encrypted messaging system built with WebSockets, serverless api endpoints, and instant search.",
    tags: ["React", "Node.js", "WebSockets", "Tailwind CSS"],
    github: "#",
    live: "#",
    icon: <Sparkles className="w-5 h-5 text-secondary" />,
  },
  {
    title: "Pulsar Monitor",
    description: "An interactive telemetry dashboard showing server resource logs and latency spikes on virtual graphs.",
    tags: ["Next.js", "Chart.js", "REST APIs", "Tailwind CSS"],
    github: "#",
    live: "#",
    icon: <Sparkles className="w-5 h-5 text-secondary" />,
  },
  {
    title: "Quasar Store",
    description: "A high speed headless ecommerce platform with responsive layouts and static site generation updates.",
    tags: ["React", "Vite", "Stripe API", "CSS Grid"],
    github: "#",
    live: "#",
    icon: <Sparkles className="w-5 h-5 text-secondary" />,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 max-w-7xl mx-auto w-full min-w-0 select-none">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-secondary font-mono tracking-widest text-xs uppercase mb-2"
        >
          Selected Creations
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white"
        >
          PROJECTS
        </motion.h2>
      </div>

      {/* Grid container with responsive column breaks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsList.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.1,
            }}
            className="group relative flex flex-col glass-panel rounded-2xl overflow-hidden glow-hover w-full min-w-0"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Background geometric grid layout header banner */}
            <div className="h-44 bg-[radial-gradient(ellipse_at_top,#1e1b4b_0%,#030712_100%)] relative flex items-center justify-center border-b border-border-line overflow-hidden">
              {/* Star sparkles background patterns */}
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              {/* Planetary ring background decoration */}
              <div className="absolute w-64 h-64 border border-secondary/15 rounded-full rotate-12 scale-y-50 group-hover:scale-y-75 group-hover:border-secondary/40 transition-all duration-700 ease-out" />
              
              <div className="w-12 h-12 rounded-full bg-surface-main border border-border-line flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-secondary transition-all duration-500 z-10">
                {project.icon}
              </div>
            </div>

            {/* Project info body content */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-sans font-bold text-white mb-2 flex items-center gap-2">
                {project.title}
              </h3>
              
              <p className="text-sm font-sans text-text-secondary leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Badges list */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-[10px] font-mono tracking-wider px-2.5 py-1 bg-surface-elevated text-secondary border border-border-line rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Code link CTAs */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <a
                  href={project.github}
                  className="flex items-center gap-1.5 text-text-secondary hover:text-white transition-colors cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  Code
                </a>
                <a
                  href={project.live}
                  className="flex items-center gap-1.5 text-text-secondary hover:text-white transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Preview
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
