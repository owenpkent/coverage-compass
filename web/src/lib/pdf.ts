/* PDF text extraction.
 *
 * Wraps pdf.js. Loads lazily so the main bundle stays small.
 *
 * Stub for the scaffold. Real implementation lives here in v0.1.
 */

export interface ExtractedText {
  text: string;
  pageCount: number;
}

export async function extractTextFromPdf(_file: File): Promise<ExtractedText> {
  return { text: "", pageCount: 0 };
}
