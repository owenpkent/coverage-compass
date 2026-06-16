import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { App } from "./App";
import { renderWithProviders, axeViolations } from "./test-utils";

describe("App landing page", () => {
  it("renders the hero, the dropzone, and the language toggle", () => {
    renderWithProviders(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /got a letter from health first colorado/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^choose a file$/i })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: /language/i })).toBeInTheDocument();
  });

  it("has no axe-detectable accessibility violations on first load", async () => {
    const { container } = renderWithProviders(<App />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
