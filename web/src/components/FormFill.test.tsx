import { describe, it, expect } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { FormFill } from "./FormFill";
import { renderWithProviders, axeViolations } from "../test-utils";

/* Edit and review phases only: generating fetches the real template, which is
 * covered by lib/fill/packet2026.test.ts against the file on disk. */

describe("FormFill", () => {
  it("renders the schema-driven sections and excludes the unused W-4 section", () => {
    renderWithProviders(<FormFill />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Member (person receiving care)")).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    // The packet mapping does not consume W-4 fields; showing them would lie.
    expect(screen.queryByText("W-4 withholding")).not.toBeInTheDocument();
  });

  it("keeps the mailing section disabled until 'same address' is unchecked, then seeds it", () => {
    renderWithProviders(<FormFill />);
    const mailStreet = screen.getByLabelText("Address", { selector: "input" });
    expect(mailStreet).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Street"), { target: { value: "123 Example St" } });
    fireEvent.click(screen.getByLabelText("Mailing address is the same"));

    expect(mailStreet).toBeEnabled();
    // onToggle seeded the mailing address from the home address.
    expect(mailStreet).toHaveValue("123 Example St");
  });

  it("shows entered values on the check-every-answer review", () => {
    renderWithProviders(<FormFill />);
    fireEvent.change(screen.getByLabelText("First name"), { target: { value: "Alex" } });
    fireEvent.click(screen.getByRole("button", { name: /review my answers/i }));

    expect(
      screen.getByRole("heading", { level: 2, name: /check every answer/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("First name")).toBeInTheDocument();
    expect(screen.getByText("Alex")).toBeInTheDocument();
    // Defaults surface too: the review hides nothing that will reach the PDF.
    expect(screen.getByRole("button", { name: /generate the filled pdf/i })).toBeInTheDocument();
  });

  it("has no axe-detectable accessibility violations in the edit phase", async () => {
    const { container } = renderWithProviders(<FormFill />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
