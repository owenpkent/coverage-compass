/* Tolerant helpers around pdf-lib's form API, ported from CDASS Enroll
 * (src/fill/util.js): a missing or renamed field in a future template revision
 * must degrade to a skipped field with a console warning, not a crash.
 *
 * Only pdf-lib *types* are imported here; every runtime import of pdf-lib in
 * the fill layer is dynamic, so pdf-lib stays in its own lazy chunk.
 */
import type { PDFDocument, PDFField, PDFForm } from "pdf-lib";

export function setText(form: PDFForm, name: string, value: string | null | undefined): void {
  if (value == null || value === "") return;
  const v = String(value);
  try {
    form.getTextField(name).setText(v);
    return;
  } catch {
    /* maybe a dropdown (e.g. the standalone I-9 State field) */
  }
  try {
    const dd = form.getDropdown(name);
    const match = dd.getOptions().find((o) => o.toLowerCase() === v.toLowerCase());
    if (match) dd.select(match);
    else console.warn("dropdown has no option:", name, v);
  } catch (e) {
    console.warn("field not set:", name, (e as Error).message);
  }
}

export function check(form: PDFForm, name: string, on: boolean | undefined = true): void {
  if (!on) return;
  try {
    form.getCheckBox(name).check();
  } catch (e) {
    console.warn("checkbox not set:", name, (e as Error).message);
  }
}

/** Handles both real radio groups and same-name checkbox pairs. */
export function selectButton(form: PDFForm, name: string, option: string | null | undefined): void {
  if (!option) return;
  try {
    const group = form.getRadioGroup(name);
    const match = group.getOptions().find((o) => o.toLowerCase() === option.toLowerCase());
    if (match) group.select(match);
    return;
  } catch {
    /* not a radio group */
  }
  check(form, name);
}

/** Find a field by the tail of its fully qualified name (for XFA-style names). */
export function bySuffix(form: PDFForm, suffix: string): PDFField | undefined {
  return form.getFields().find((f) => f.getName().endsWith(suffix));
}

/** "2026-06-30" -> "06/30/2026"; anything unparseable passes through. */
export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[2]}/${m[3]}/${m[1]}` : iso;
}

export function fmtSsn(ssn: string | null | undefined): string {
  const d = (ssn ?? "").replace(/\D/g, "");
  return d.length === 9 ? `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}` : (ssn ?? "");
}

export interface SignaturePlacement {
  /** 0-indexed page. */
  page: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Draw a signature image (a PNG data URL) onto the given placements, in PDF
 * points; the image is scaled to the box height, capped to its width,
 * preserving aspect ratio. No-op without a data URL, and a non-PNG is skipped
 * rather than crashing. This is the ONLY signature the engine ever places, and
 * only from an image the user explicitly provided; signatures are never
 * fabricated (docs/form-fill-engine.md).
 */
export async function overlaySignature(
  doc: PDFDocument,
  dataUrl: string | null | undefined,
  placements: SignaturePlacement[],
): Promise<void> {
  if (!dataUrl) return;
  let png;
  try {
    png = await doc.embedPng(dataUrl);
  } catch {
    return;
  }
  const ratio = png.width / png.height || 1;
  for (const pl of placements) {
    const page = doc.getPage(pl.page);
    let h = pl.h;
    let w = h * ratio;
    if (w > pl.w) {
      w = pl.w;
      h = w / ratio;
    }
    page.drawImage(png, { x: pl.x, y: pl.y, width: w, height: h });
  }
}

export function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}
