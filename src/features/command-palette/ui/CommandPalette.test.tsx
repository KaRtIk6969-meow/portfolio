import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CommandPalette from "./CommandPalette";
import * as scrollUtils from "@/shared/utils/scroll";

vi.mock("@/shared/utils/scroll", () => ({
  smoothScrollTo: vi.fn(),
}));

describe("CommandPalette component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render dialog when isOpen is false", () => {
    render(<CommandPalette isOpen={false} />);
    expect(screen.queryByRole("dialog", { name: "Command Palette" })).not.toBeInTheDocument();
  });

  it("renders search input, groups, and destination items when isOpen is true", () => {
    render(<CommandPalette isOpen={true} />);

    expect(screen.getByRole("dialog", { name: "Command Palette" })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Type a destination or search cosmic creations.../)
    ).toBeInTheDocument();

    // Verify key core destinations
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Skills & Stack")).toBeInTheDocument();
    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText("Experience Timeline")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();

    // Verify individual projects
    expect(screen.getByText("NovaLabsAI")).toBeInTheDocument();
    expect(screen.getByText("MindBloomm")).toBeInTheDocument();
    expect(screen.getByText("Klickonn")).toBeInTheDocument();
    expect(screen.getByText("Student Management System")).toBeInTheDocument();

    // Verify external social links
    expect(screen.getByText("GitHub Profile")).toBeInTheDocument();
    expect(screen.getByText("Send Email")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<CommandPalette isOpen={true} onClose={onClose} />);

    const closeBtn = screen.getByRole("button", { name: "Close command palette" });
    await user.click(closeBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("selects a navigation command, triggers onClose, and dispatches smoothScrollTo", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<CommandPalette isOpen={true} onClose={onClose} />);

    const projectsItem = screen.getByText("Projects");
    await user.click(projectsItem);

    expect(onClose).toHaveBeenCalled();

    await waitFor(
      () => {
        expect(scrollUtils.smoothScrollTo).toHaveBeenCalledWith("projects", -70);
      },
      { timeout: 500 }
    );
  });

  it("shows empty state when no items match search query", async () => {
    const user = userEvent.setup();
    render(<CommandPalette isOpen={true} />);

    const input = screen.getByPlaceholderText(/Type a destination or search cosmic creations.../);
    await user.type(input, "xyznonexistentgalaxyquery");

    expect(screen.getByText("No galactic destinations found.")).toBeInTheDocument();
  });
});
