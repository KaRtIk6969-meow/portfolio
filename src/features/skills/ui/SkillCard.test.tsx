import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkillCard from "./SkillCard";
import { SkillItem } from "../types";

describe("SkillCard component", () => {
  const sampleSkill: SkillItem = {
    name: "React 19",
    level: "Expert",
    years: "5 Years",
    proficiency: 95,
    tag: "Components & Hooks",
  };

  it("renders skill title, level badge, and experience info", () => {
    render(<SkillCard skill={sampleSkill} index={0} category="frontend" />);

    expect(screen.getByRole("heading", { level: 3, name: "React 19" })).toBeInTheDocument();
    expect(screen.getByText("Expert")).toBeInTheDocument();
    expect(screen.getByText("Components & Hooks")).toBeInTheDocument();
    expect(screen.getByText("Exp: 5 Years")).toBeInTheDocument();
    expect(screen.getByText("95%")).toBeInTheDocument();
  });

  it("renders accessible progress bar with correct ARIA attributes", () => {
    render(<SkillCard skill={sampleSkill} index={1} category="frontend" />);

    const progressBar = screen.getByRole("progressbar", {
      name: "React 19 proficiency",
    });

    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "95");
    expect(progressBar).toHaveAttribute("aria-valuemin", "0");
    expect(progressBar).toHaveAttribute("aria-valuemax", "100");
  });

  it("renders correctly without an optional tag", () => {
    const skillWithoutTag: SkillItem = {
      name: "TypeScript",
      level: "Expert",
      years: "4 Years",
      proficiency: 92,
    };

    render(<SkillCard skill={skillWithoutTag} index={2} category="backend" />);

    expect(screen.getByRole("heading", { level: 3, name: "TypeScript" })).toBeInTheDocument();
    expect(screen.getByText("92%")).toBeInTheDocument();
  });
});
