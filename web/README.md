# web (Coverage Compass)

The client-side web app. See `../docs/architecture.md` for context.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build

```bash
npm run build
npm run preview
```

## Test

```bash
npm run test         # watch
npm run test:run     # CI / one-shot
```

## Stack

- Vite + React 18 + TypeScript (strict)
- React Aria Components for accessible primitives
- pdf.js for PDF parsing (client-side, lazy-loaded)
- tesseract.js for image OCR (client-side, lazy-loaded)
- IndexedDB (via idb) for local-only storage in later versions
- Vitest + Testing Library + axe-core for tests

## Layout

```
src/
|-- main.tsx                 entry
|-- App.tsx                  top-level shell
|-- styles.css               base CSS (no framework)
|-- components/
|   `-- LetterDropzone.tsx   drop-or-pick-or-photo file input
|-- lib/
|   |-- pdf.ts               pdf.js wrapper (stub)
|   |-- ocr.ts               tesseract.js wrapper (stub)
|   `-- rules.ts             rules engine (stub)
`-- test-setup.ts            Vitest setup
```

## Non-obvious choices

- No Tailwind in v0.1. Plain CSS with custom properties is fast to ship and easier to keep accessible. Revisit if it costs us velocity.
- No state library. React state and context are sufficient for v0.1.
- No client-side routing. Single-page flow until v0.2 needs more.
- `noUncheckedIndexedAccess` is on in tsconfig because the prevented class of bugs is exactly the kind we cannot afford in a tool handling someone's coverage status.

## See also

- `../docs/spec-v0.1.md`
- `../docs/architecture.md`
- `../docs/privacy.md`
- `../docs/accessibility.md`
