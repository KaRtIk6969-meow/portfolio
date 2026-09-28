"use client";

import { motion } from "framer-motion";
import { PROJECTS_LIST } from "../constants/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="section-containment py-16 sm:py-24 px-4 max-w-7xl mx-auto w-full min-w-0">
      <div className="text-center mb-10 sm:mb-16">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {PROJECTS_LIST.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
