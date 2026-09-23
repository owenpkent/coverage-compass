import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect } from "vitest";

/*
 * Chrome hands CSS-transformed text to screen readers and braille displays as
 * written on screen: text-transform: uppercase turns "Deadline" into "DEADLINE"
 * in the accessibility tree, found in the NVDA pass of 2026-09-22. All caps is
 * also harder to read. Labels are sentence case in the strings and stay so.
 */
describe("styles.css", () => {
  it("never uppercases text with CSS", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");
    expect(css).not.toMatch(/text-transform:\s*uppercase/);
  });
});
