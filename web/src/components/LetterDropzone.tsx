import { useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from "react";

type Status = "idle" | "reading" | "done" | "error";

export function LetterDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleFile(file: File) {
    setFileName(file.name);
    setErrorMessage(null);
    setStatus("reading");
    // v0.1: hook this up to lib/pdf.ts and lib/rules.ts.
    // For now, the scaffold just acknowledges the file.
    setTimeout(() => setStatus("done"), 250);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
    }
  }

  return (
    <div className="dropzone-wrap">
      <div
        className="dropzone"
        role="button"
        tabIndex={0}
        aria-label="Drop a PDF or photo of your letter here, or press Enter to choose a file"
        aria-describedby="dropzone-help"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onKeyDown={onKeyDown}
        onClick={() => inputRef.current?.click()}
      >
        <p className="dropzone-prompt">Drop your letter here</p>
        <p className="dropzone-or">or</p>
        <p className="dropzone-cta">Choose a file</p>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,image/*"
          capture="environment"
          className="visually-hidden"
          onChange={onInputChange}
        />
      </div>
      <p id="dropzone-help" className="dropzone-help">
        Accepts PDF, JPG, PNG, or HEIC. Your file never leaves this device.
      </p>

      <output className="dropzone-status" aria-live="polite">
        {status === "reading" && <span>Reading {fileName}...</span>}
        {status === "done" && (
          <span>
            Loaded {fileName}. Letter parsing is not wired up yet in this scaffold.
          </span>
        )}
        {status === "error" && errorMessage && <span role="alert">{errorMessage}</span>}
      </output>
    </div>
  );
}
