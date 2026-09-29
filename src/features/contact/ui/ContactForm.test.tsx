import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactForm from "./ContactForm";
import * as contactApi from "../api/contact";

vi.mock("../api/contact", () => ({
  sendContactMessage: vi.fn(),
}));

describe("ContactForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form elements and labels accurately", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  it("submits the form successfully and displays success confirmation panel", async () => {
    const user = userEvent.setup();
    vi.mocked(contactApi.sendContactMessage).mockResolvedValueOnce({
      success: true,
      message: "Your message has been sent successfully through the cosmic communication streams.",
    });

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/i), "Astronaut John");
    await user.type(screen.getByLabelText(/Email Address/i), "john@cosmos.dev");
    await user.type(
      screen.getByLabelText(/Message/i),
      "Requesting orbital trajectory coordinates for rendezvous."
    );

    fireEvent.submit(screen.getByRole("button", { name: /send message/i }).closest("form")!);

    expect(contactApi.sendContactMessage).toHaveBeenCalledWith({
      name: "Astronaut John",
      email: "john@cosmos.dev",
      message: "Requesting orbital trajectory coordinates for rendezvous.",
    });

    expect(
      await screen.findByText(/Transmission Received/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/sent successfully through the cosmic communication streams/i)
    ).toBeInTheDocument();
  });

  it("displays error banner alert when submission fails", async () => {
    const user = userEvent.setup();
    vi.mocked(contactApi.sendContactMessage).mockResolvedValueOnce({
      success: false,
      message: "Please provide a valid email address.",
    });

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/i), "Commander Shepard");
    await user.type(screen.getByLabelText(/Email Address/i), "shepard@cosmos.dev");
    await user.type(
      screen.getByLabelText(/Message/i),
      "Valid message exceeding required characters."
    );

    fireEvent.submit(screen.getByRole("button", { name: /send message/i }).closest("form")!);

    const errorAlert = await screen.findByRole("alert");
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert).toHaveTextContent("Please provide a valid email address.");
  });

  it("allows resetting the form after a successful submission", async () => {
    const user = userEvent.setup();
    vi.mocked(contactApi.sendContactMessage).mockResolvedValueOnce({
      success: true,
      message: "Message dispatched.",
    });

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/i), "Astronaut John");
    await user.type(screen.getByLabelText(/Email Address/i), "john@cosmos.dev");
    await user.type(screen.getByLabelText(/Message/i), "Orbital trajectory requested.");

    fireEvent.submit(screen.getByRole("button", { name: /send message/i }).closest("form")!);

    const resetBtn = await screen.findByRole("button", {
      name: /send another/i,
    });
    expect(resetBtn).toBeInTheDocument();

    await user.click(resetBtn);

    expect(screen.getByLabelText(/Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Email Address/i)).toHaveValue("");
  });
});
