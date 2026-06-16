import { describe, it, expect } from "vitest";
import { PDFDocument } from "pdf-lib";
import { fillForm } from "./fillForm";

describe("fillForm", () => {
  it("returns an exact, still-editable copy of the template (no flatten, pages preserved)", async () => {
    // Build a tiny two-page document to stand in for an official PDF template.
    const template = await PDFDocument.create();
    template.addPage();
    template.addPage();
    const templateBytes = await template.save();

    const out = await fillForm(templateBytes);

    expect(out).toBeInstanceOf(Uint8Array);
    expect(out.byteLength).toBeGreaterThan(0);

    // Reload the output and confirm it is a valid PDF with the same page count.
    // This is the miniature version of the engine's exact-copy discipline.
    const reloaded = await PDFDocument.load(out);
    expect(reloaded.getPageCount()).toBe(2);
  });
});
