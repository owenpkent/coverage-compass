/* Form fill (the write side).
 *
 * Wraps pdf-lib. Loads lazily so pdf-lib only enters the bundle when a form is
 * actually generated, matching the lazy-load pattern of pdf.js (`pdf.ts`) and
 * tesseract.js (`ocr.ts`). This is the groundwork for adopting the proven CDASS
 * Enroll fill engine (see `docs/form-fill-engine.md`); the per-form field
 * mappings come in a later step.
 *
 * Two engine disciplines are load-bearing and start here:
 *   - Never flatten. The output must stay an exact, still-editable copy of the
 *     official template so a person can correct any field before printing.
 *   - Never fabricate signatures. Signature fields are left for the human.
 */

export interface FillFormOptions {
  /**
   * Reserved for per-form mapping: field values to set, and attestation gating.
   * Empty for now; the first real mapping module will define its shape.
   */
  fields?: Record<string, string | boolean>;
}

/**
 * Load an official PDF template and return it re-saved as an exact, editable
 * copy. pdf-lib is imported dynamically so it lands in its own lazy chunk and
 * never bloats the main bundle.
 *
 * For now this only proves the lazy import and that a load and save round-trip
 * keeps the document intact (no flatten). Field filling is added per form.
 */
export async function fillForm(
  templateBytes: ArrayBuffer | Uint8Array,
  _options: FillFormOptions = {},
): Promise<Uint8Array> {
  const { PDFDocument } = await import("pdf-lib");
  const pdf = await PDFDocument.load(templateBytes);
  // Intentionally no flatten and no field changes yet: keep it an exact copy.
  return pdf.save();
}
