import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProjectCard from "./ProjectCard";
import { Project } from "../types";

describe("ProjectCard component", () => {
  const sampleProjectWithLive: Project = {
    title: "NovaLabsAI",
    category: "AI Agency & Platform",
    description: "An interactive agency platform showcasing cutting-edge AI integrations.",
    tags: ["Next.js", "React 19", "TypeScript"],
    github: "https://github.com/KaRtIk6969-meow/NovaLabsAI",
    live: "https://nova-labs-ai.vercel.app",
    metric: {
      label: "LIGHTHOUSE",
      value: "98+",
    },
    status: {
      label: "Live Demo",
    },
    icon: <span data-testid="project-icon" />,
  };

  const sampleProjectWithoutLive: Project = {
    title: "Student Management System",
    category: "Academic Systems & OOP",
    description: "A structured academic records architecture built in Python 3.",
    tags: ["Python 3", "OOP Architecture"],
    github: "https://github.com/KaRtIk6969-meow/student-managment-system",
    metric: {
      label: "PARADIGM",
      value: "OOP Core",
    },
    status: {
      label: "Open Source",
    },
    icon: <span data-testid="project-icon" />,
  };

  it("renders project title, category, description, telemetry metric, and status", () => {
    render(<ProjectCard project={sampleProjectWithLive} index={0} />);

    expect(screen.getByRole("heading", { level: 3, name: "NovaLabsAI" })).toBeInTheDocument();
    expect(screen.getByText("AI Agency & Platform")).toBeInTheDocument();
    expect(screen.getByText(/An interactive agency platform/)).toBeInTheDocument();
    expect(screen.getByText("98+")).toBeInTheDocument();
    // Both status badge and live demo button render text "Live Demo"
    expect(screen.getAllByText("Live Demo").length).toBe(2);
  });

  it("renders tech tags accurately", () => {
    render(<ProjectCard project={sampleProjectWithLive} index={0} />);

    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("React 19")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders source link with accessible label and external security attributes", () => {
    render(<ProjectCard project={sampleProjectWithLive} index={0} />);

    const sourceLink = screen.getByRole("link", {
      name: /View NovaLabsAI source code on GitHub/,
    });

    expect(sourceLink).toBeInTheDocument();
    expect(sourceLink).toHaveAttribute("href", "https://github.com/KaRtIk6969-meow/NovaLabsAI");
    expect(sourceLink).toHaveAttribute("target", "_blank");
    expect(sourceLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Live Demo CTA when project has a live URL", () => {
    render(<ProjectCard project={sampleProjectWithLive} index={0} />);

    const liveLink = screen.getByRole("link", {
      name: /Visit NovaLabsAI live demo/,
    });

    expect(liveLink).toBeInTheDocument();
    expect(liveLink).toHaveAttribute("href", "https://nova-labs-ai.vercel.app");
  });

  it("omits Live Demo CTA cleanly when project has no live demo URL", () => {
    render(<ProjectCard project={sampleProjectWithoutLive} index={1} />);

    const liveLink = screen.queryByRole("link", {
      name: /Visit Student Management System live demo/,
    });

    expect(liveLink).not.toBeInTheDocument();

    const sourceLink = screen.getByRole("link", {
      name: /View Student Management System source code on GitHub/,
    });
    expect(sourceLink).toBeInTheDocument();
    expect(screen.getByText("Open Source")).toBeInTheDocument();
  });
});
