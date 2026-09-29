import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ContactInfoCard from "./ContactInfoCard";

describe("ContactInfoCard component", () => {
  it("renders connection hub header and description", () => {
    render(<ContactInfoCard />);

    expect(screen.getByText("Connection Hub")).toBeInTheDocument();
    expect(
      screen.getByText(/Feel free to reach out if you want to collaborate/i)
    ).toBeInTheDocument();
  });

  it("renders kartiksharmaa2066@gmail.com with an active mailto link", () => {
    render(<ContactInfoCard />);

    const emailLink = screen.getByRole("link", {
      name: /kartiksharmaa2066@gmail.com/i,
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:kartiksharmaa2066@gmail.com");
  });
});
