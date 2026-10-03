import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Terminal from "./Terminal";

describe("Terminal component", () => {
  it("renders terminal dialog and welcome telemetry when isOpen is true", () => {
    render(<Terminal isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByRole("dialog", { name: "Interactive Developer Terminal" })).toBeInTheDocument();
    expect(screen.getByText(/COSMOS Deep Space Terminal/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type a command/)).toBeInTheDocument();
  });

  it("does not render terminal dialog when isOpen is false", () => {
    render(<Terminal isOpen={false} onClose={vi.fn()} />);

    expect(screen.queryByRole("dialog", { name: "Interactive Developer Terminal" })).not.toBeInTheDocument();
  });

  it("executes command on Enter and displays formatted output", async () => {
    render(<Terminal isOpen={true} onClose={vi.fn()} />);

    const input = screen.getByLabelText("Terminal command input");
    fireEvent.change(input, { target: { value: "whoami" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByText(/guest@deepspace-terminal/)).toBeInTheDocument();
    expect(screen.getByText(/Role: Planetary Explorer/)).toBeInTheDocument();
  });

  it("renders neofetch system info card accurately", () => {
    render(<Terminal isOpen={true} onClose={vi.fn()} />);

    const input = screen.getByLabelText("Terminal command input");
    fireEvent.change(input, { target: { value: "neofetch" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByText("guest@cosmos-dev")).toBeInTheDocument();
    expect(screen.getByText("COSMOS Deep Space Kernel v2.0")).toBeInTheDocument();
  });

  it("displays helpful error message on unknown commands", () => {
    render(<Terminal isOpen={true} onClose={vi.fn()} />);

    const input = screen.getByLabelText("Terminal command input");
    fireEvent.change(input, { target: { value: "unknowncommand123" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByText(/command not found:/)).toBeInTheDocument();
    expect(screen.getAllByText("unknowncommand123").length).toBe(2);
  });

  it("clears terminal output when clear button is clicked", () => {
    render(<Terminal isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText(/COSMOS Deep Space Terminal/)).toBeInTheDocument();

    const clearBtn = screen.getByRole("button", { name: "Clear output buffer" });
    fireEvent.click(clearBtn);

    expect(screen.queryByText(/COSMOS Deep Space Terminal/)).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<Terminal isOpen={true} onClose={onClose} />);

    const closeBtn = screen.getByRole("button", { name: "Close terminal dialog" });
    await user.click(closeBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = vi.fn();
    render(<Terminal isOpen={true} onClose={onClose} />);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("toggles maximize mode when maximize button is clicked", () => {
    render(<Terminal isOpen={true} onClose={vi.fn()} />);

    const maxButtons = screen.getAllByRole("button", { name: /Maximize window/i });
    expect(maxButtons.length).toBeGreaterThanOrEqual(1);

    fireEvent.click(maxButtons[0]);
    expect(screen.getAllByRole("button", { name: /Restore window/i }).length).toBeGreaterThanOrEqual(1);

    const restoreButtons = screen.getAllByRole("button", { name: /Restore window/i });
    fireEvent.click(restoreButtons[0]);
    expect(screen.getAllByRole("button", { name: /Maximize window/i }).length).toBeGreaterThanOrEqual(1);
  });

  it("executes help, about, skills, projects, contact, date, and echo commands", () => {
    render(<Terminal isOpen={true} onClose={vi.fn()} />);
    const input = screen.getByLabelText("Terminal command input");

    // help
    fireEvent.change(input, { target: { value: "help" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("Available Terminal Commands:")).toBeInTheDocument();

    // about
    fireEvent.change(input, { target: { value: "about" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("Milestones:")).toBeInTheDocument();

    // skills
    fireEvent.change(input, { target: { value: "skills" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("Frontend Stack:")).toBeInTheDocument();

    // projects
    fireEvent.change(input, { target: { value: "projects" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("Selected Works:")).toBeInTheDocument();

    // contact
    fireEvent.change(input, { target: { value: "contact" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("Communication Channels:")).toBeInTheDocument();

    // date
    fireEvent.change(input, { target: { value: "date" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText(/UTC:/)).toBeInTheDocument();

    // echo
    fireEvent.change(input, { target: { value: "echo Deep Space Telemetry" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("Deep Space Telemetry")).toBeInTheDocument();
  });
});
