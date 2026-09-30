import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Navbar from "./Navbar";
import * as scrollUtils from "../utils/scroll";

vi.mock("../utils/scroll", () => ({
  smoothScrollTo: vi.fn(),
}));

describe("Navbar component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders brand header button and available status indicator", () => {
    render(<Navbar />);

    expect(screen.getByRole("button", { name: /Back to top/i })).toBeInTheDocument();
    expect(screen.getByText("COSMOS")).toBeInTheDocument();
    expect(screen.getByText("AVAILABLE")).toBeInTheDocument();
  });

  it("renders all core section navigation buttons", () => {
    render(<Navbar />);

    expect(screen.getAllByRole("button", { name: "PROJECTS" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("button", { name: "SKILLS" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("button", { name: "ABOUT" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("button", { name: "CONTACT" }).length).toBeGreaterThanOrEqual(1);
  });

  it("dispatches smoothScrollTo when a navigation link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const projectsButtons = screen.getAllByRole("button", { name: "PROJECTS" });
    await user.click(projectsButtons[0]);

    await waitFor(() => {
      expect(scrollUtils.smoothScrollTo).toHaveBeenCalledWith("projects", -70);
    });
  });

  it("renders mobile menu toggle button with accessible aria attributes", () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole("button", {
      name: /open menu/i,
    });

    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("renders command palette trigger button and invokes callback on click", async () => {
    const user = userEvent.setup();
    const onOpenCommandPalette = vi.fn();

    render(<Navbar onOpenCommandPalette={onOpenCommandPalette} />);

    const paletteBtn = screen.getByRole("button", {
      name: /open command palette/i,
    });
    expect(paletteBtn).toBeInTheDocument();

    await user.click(paletteBtn);
    expect(onOpenCommandPalette).toHaveBeenCalledTimes(1);
  });
});

