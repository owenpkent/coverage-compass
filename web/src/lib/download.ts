/** Trigger a local download of generated PDF bytes. Local only: a blob URL on
 * this origin, never an upload. */
export function downloadPdfBytes(bytes: Uint8Array, fileName: string): void {
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoke on a later tick: revoking synchronously can race the browser's async
  // download dispatch and produce an empty/failed save in some browsers.
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
