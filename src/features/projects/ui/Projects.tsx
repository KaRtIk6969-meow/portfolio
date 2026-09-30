"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { PROJECTS_LIST } from "../constants/projects";
import { Project } from "../types";
import { useGitHubStats } from "../hooks/useGitHubStats";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { stats: gitHubStats, isLoading, error } = useGitHubStats();

  const handleOpenCaseStudy = useCallback((project: Project, triggerEl: HTMLButtonElement) => {
    triggerRef.current = triggerEl;
    setSelectedProject(project);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("project", project.slug);
      window.history.pushState({ projectSlug: project.slug }, "", url.toString());
    }
  }, []);

  const handleCloseCaseStudy = useCallback(() => {
    setSelectedProject(null);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("project");
      window.history.pushState({}, "", url.pathname + (url.hash || ""));
    }
  }, []);

  // Deep-linking support on initial mount and browser back/forward buttons
  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("project");
      if (slug) {
        const found = PROJECTS_LIST.find((p) => p.slug === slug);
        if (found && found.caseStudy) {
          setSelectedProject(found);
          return;
        }
      }
      setSelectedProject(null);
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

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
        {PROJECTS_LIST.map((project, index) => {
          const repoName = project.github.split("/").pop() || "";
          const repoStats = gitHubStats[repoName.toLowerCase()] || gitHubStats[repoName];
          const projectWithStats = repoStats ? { ...project, githubStats: repoStats } : project;

          return (
            <ProjectCard
              key={project.title}
              project={projectWithStats}
              index={index}
              isLoading={isLoading}
              isError={Boolean(error || (!isLoading && !repoStats))}
              onOpenCaseStudy={handleOpenCaseStudy}
            />
          );
        })}
      </div>


      {/* Interactive Cosmic Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={handleCloseCaseStudy}
        triggerRef={triggerRef}
      />
    </section>
  );
}

