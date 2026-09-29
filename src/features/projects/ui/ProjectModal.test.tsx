import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ProjectModal from "./ProjectModal";
import { Project } from "../types";
import { NOVALABSAI_CASE_STUDY } from "../constants/case-studies";

describe("ProjectModal component", () => {
  const sampleProject: Project = {
    slug: "novalabsai",
    title: "NovaLabsAI",
    category: "AI Agency & Platform",
    description: "An interactive agency platform showcasing cutting-edge AI integrations.",
    tags: ["Next.js", "React 19", "TypeScript"],
    github: "https://github.com/KaRtIk6969-meow/NovaLabsAI",
    live: "https://nova-labs-ai.vercel.app",
    icon: <span data-testid="test-icon" />,
    caseStudy: NOVALABSAI_CASE_STUDY,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("does not render when isOpen is false or project is null", () => {
    const { container: c1 } = render(
      <ProjectModal project={sampleProject} isOpen={false} onClose={vi.fn()} />
    );
    expect(c1.querySelector('[role="dialog"]')).not.toBeInTheDocument();

    const { container: c2 } = render(
      <ProjectModal project={null} isOpen={true} onClose={vi.fn()} />
    );
    expect(c2.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it("renders modal dialog with accessible attributes and header when open", () => {
    render(
      <ProjectModal project={sampleProject} isOpen={true} onClose={vi.fn()} />
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("heading", { name: "NovaLabsAI" })).toBeInTheDocument();
    expect(screen.getByText(/AI Agency & Platform · Technical Deep Dive/)).toBeInTheDocument();
  });

  it("switches tabs between Architecture, Challenge & Solution, and Metrics & Stack", async () => {
    const user = userEvent.setup();
    render(
      <ProjectModal project={sampleProject} isOpen={true} onClose={vi.fn()} />
    );

    // Initial tab: Architecture
    expect(screen.getByText("NovaLabsAI Streaming & Motion Architecture")).toBeInTheDocument();
    expect(screen.getByText("Key Architectural Highlights")).toBeInTheDocument();

    // Switch to Challenge & Solution tab
    const challengeTab = screen.getByRole("button", { name: "Challenge & Solution" });
    await user.click(challengeTab);

    expect(screen.getByText("The Bottleneck & Challenge")).toBeInTheDocument();
    expect(screen.getByText("The Architectural Solution")).toBeInTheDocument();

    // Switch to Metrics & Stack tab
    const stackTab = screen.getByRole("button", { name: "Metrics & Stack" });
    await user.click(stackTab);

    expect(screen.getByText("Telemetry & Production Benchmarks")).toBeInTheDocument();
    expect(screen.getByText("Categorized Tooling Stack")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <ProjectModal project={sampleProject} isOpen={true} onClose={onClose} />
    );

    const closeBtn = screen.getByRole("button", { name: "Close modal" });
    await user.click(closeBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = vi.fn();

    render(
      <ProjectModal project={sampleProject} isOpen={true} onClose={onClose} />
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("locks and restores body scroll", () => {
    const { unmount } = render(
      <ProjectModal project={sampleProject} isOpen={true} onClose={vi.fn()} />
    );

    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });
});
