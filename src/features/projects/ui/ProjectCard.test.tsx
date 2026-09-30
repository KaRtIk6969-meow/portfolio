import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ProjectCard from "./ProjectCard";
import { Project } from "../types";
import { NOVALABSAI_CASE_STUDY } from "../constants/case-studies";

describe("ProjectCard component", () => {
  const sampleProjectWithLive: Project = {
    slug: "novalabsai",
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
    caseStudy: NOVALABSAI_CASE_STUDY,
  };

  const sampleProjectWithoutLive: Project = {
    slug: "student-management-system",
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

  it("renders Case Study button when caseStudy is present and fires onOpenCaseStudy", async () => {
    const user = userEvent.setup();
    const onOpenCaseStudy = vi.fn();

    render(
      <ProjectCard
        project={sampleProjectWithLive}
        index={0}
        onOpenCaseStudy={onOpenCaseStudy}
      />
    );

    const caseStudyBtn = screen.getByRole("button", {
      name: /View NovaLabsAI technical case study/,
    });
    expect(caseStudyBtn).toBeInTheDocument();

    await user.click(caseStudyBtn);
    expect(onOpenCaseStudy).toHaveBeenCalledTimes(1);
    expect(onOpenCaseStudy).toHaveBeenCalledWith(
      sampleProjectWithLive,
      expect.any(HTMLButtonElement)
    );
  });

  it("omits Case Study button when project has no caseStudy defined", () => {
    render(<ProjectCard project={sampleProjectWithoutLive} index={1} />);

    const caseStudyBtn = screen.queryByRole("button", {
      name: /View Student Management System technical case study/,
    });
    expect(caseStudyBtn).not.toBeInTheDocument();
  });

  it("renders live GitHub stars, forks, and language telemetry when githubStats is present", () => {
    const projectWithGitHub: Project = {
      ...sampleProjectWithLive,
      githubStats: {
        name: "NovaLabsAI",
        fullName: "KaRtIk6969-meow/NovaLabsAI",
        stars: 48,
        forks: 6,
        openIssues: 0,
        language: "TypeScript",
        description: "AI platform",
        updatedAt: "2026-09-30T10:00:00Z",
        pushedAt: "2026-09-30T12:00:00Z",
        htmlUrl: "https://github.com/KaRtIk6969-meow/NovaLabsAI",
        isArchived: false,
      },
    };

    render(<ProjectCard project={projectWithGitHub} index={0} />);

    expect(screen.getByText("48 stars")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText(/Updated Sep 2026/)).toBeInTheDocument();
    expect(screen.getAllByText("TypeScript").length).toBe(2);
  });

  it("renders shimmering skeleton loading state when isLoading is true and no stats are present", () => {
    render(
      <ProjectCard
        project={sampleProjectWithLive}
        index={0}
        isLoading={true}
      />
    );

    expect(screen.getByTestId("github-stats-loading")).toBeInTheDocument();
    expect(screen.queryByTestId("github-stats-telemetry")).not.toBeInTheDocument();
    expect(screen.queryByTestId("github-stats-fallback")).not.toBeInTheDocument();
  });

  it("renders telemetry offline fallback indicator when isError is true and no stats are present", () => {
    render(
      <ProjectCard
        project={sampleProjectWithLive}
        index={0}
        isLoading={false}
        isError={true}
      />
    );

    expect(screen.getByTestId("github-stats-fallback")).toBeInTheDocument();
    expect(screen.getByText("Telemetry offline")).toBeInTheDocument();
    expect(screen.queryByTestId("github-stats-loading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("github-stats-telemetry")).not.toBeInTheDocument();
  });
});


