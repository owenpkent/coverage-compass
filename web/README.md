# web (Coverage Compass)

The client-side web app. See `../docs/architecture.md` for context.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

`npm install` followed by `npm run dev` (or `npm run build`) is all you need: the
`predev` / `prebuild` hooks generate the typed rule module from the YAML
(`gen:rules`) and vendor the OCR runtime assets from `node_modules` into
`public/vendor` (`vendor:ocr`). The vendored assets (~27 MB) are gitignored and
reproducible from the lockfile.

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
- React Aria Components for accessible primitives (DropZone, FileTrigger, Button)
- react-intl for English/Spanish i18n
- pdf.js for PDF text extraction (client-side, lazy-loaded; worker bundled local)
- tesseract.js for image OCR (client-side, lazy-loaded; worker/WASM/language data vendored)
- pdf-lib for the optional one-page PDF summary (client-side, lazy-loaded)
- vite-plugin-pwa (Workbox) for offline support
- Vitest + Testing Library + axe-core for tests; ESLint flat config with jsx-a11y

## Layout

```
src/
|-- main.tsx                 entry; mounts providers and registers the service worker
|-- App.tsx                  top-level shell (header, hero, footer)
|-- styles.css               base CSS (no framework)
|-- i18n/
|   |-- en.json, es.json     message catalogs
|   |-- messages.ts          catalog map + locale detection
|   `-- LocaleProvider.tsx   IntlProvider + locale context (used by the rules engine too)
|-- components/
|   |-- Triage.tsx           orchestrates file/photo/paste -> extract -> classify -> result
|   |-- LetterDropzone.tsx   accessible drop-or-pick-or-photo file input
|   |-- LetterSummary.tsx    result view; download + reset
|   |-- DeadlineCard.tsx     prominent deadline with days remaining
|   |-- NextActions.tsx      1-3 next actions with urgency and tel: links
|   `-- LanguageToggle.tsx   English/Spanish switch
|-- lib/
|   |-- pdf.ts               pdf.js text extraction (encrypted/invalid PDF handling)
|   |-- ocr.ts               tesseract.js OCR over the vendored assets
|   |-- deadline.ts          bilingual deadline-date extraction
|   |-- rules.ts             deterministic classifier over the rule library
|   |-- plainLanguage.ts     locale resolution for rule content
|   |-- rules.generated.ts   GENERATED from rules/co/letter-types.yaml (do not edit)
|   |-- format.ts            date / urgency formatting helpers
|   |-- summaryPdf.ts        one-page PDF summary via pdf-lib
|   `-- fill/                write-side groundwork (pdf-lib), adopted from CDASS Enroll
`-- test-setup.ts            Vitest setup

scripts/
|-- gen-rules.mjs            compile rules/co/letter-types.yaml -> src/lib/rules.generated.ts
`-- vendor-ocr.mjs           copy tesseract worker/WASM/language data into public/vendor
```

## Editing the rules

The rule content lives in `../rules/co/letter-types.yaml` (advocate-editable).
After editing it, run `npm run gen:rules` to regenerate `src/lib/rules.generated.ts`
(this also runs automatically before dev/build/test). Do not edit the generated
file by hand.

## Non-obvious choices

- No Tailwind in v0.1. Plain CSS with custom properties is fast to ship and easier to keep accessible. Revisit if it costs us velocity.
- No state library. React state and context are sufficient for v0.1.
- No client-side routing. Single-page flow until v0.2 needs more.
- The locale is held in memory only (no cookie, no localStorage), consistent with "nothing persists by default" in `../docs/privacy.md`.
- OCR assets are vendored to our own origin and the production CSP sets `connect-src 'self'`, so the photo path makes no third-party network request. The host should also send the CSP (plus `frame-ancestors 'none'`) as a real header.
- `noUncheckedIndexedAccess` is on in tsconfig because the prevented class of bugs is exactly the kind we cannot afford in a tool handling someone's coverage status.

## See also

- `../docs/spec-v0.1.md`
- `../docs/architecture.md`
- `../docs/privacy.md`
- `../docs/accessibility.md`
