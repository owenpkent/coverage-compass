# Architecture

## Constraints, in priority order

1. **Privacy.** No user data leaves the device. Ever. No exceptions. See `privacy.md`.
2. **Accessibility.** WCAG 2.2 AA is the floor. See `accessibility.md`.
3. **Reach.** Has to run on a 2019 Chromebook, an older Android phone, and a library PC.
4. **Auditability.** Anyone (including CCDC) should be able to read the code and verify the privacy claims.
5. **Maintainability by a small volunteer team.** Boring stack > clever stack.

## Stack

- **Build:** Vite
- **Language:** TypeScript (strict)
- **UI:** React 18+
- **Accessible primitives:** [React Aria Components](https://react-spectrum.adobe.com/react-aria/) (the most accessible UI primitives library available; Adobe-maintained)
- **PDF parsing:** [pdf.js](https://mozilla.github.io/pdf.js/) (Mozilla; runs entirely client-side)
- **OCR (photos of paper letters):** [tesseract.js](https://tesseract.projectnaptha.com/) (WASM; client-side)
- **Storage:** IndexedDB via [idb](https://github.com/jakearchibald/idb) (local-only; no sync)
- **i18n:** [Format.js / react-intl](https://formatjs.io/) (English + Spanish from v0.1)
- **Testing:** Vitest + @testing-library/react + axe-core
- **Linting:** ESLint + eslint-plugin-jsx-a11y + Prettier
- **Hosting:** static site on Netlify or GitHub Pages, with Subresource Integrity on all assets

Explicit non-choices:
- No Tailwind in v0.1. Plain CSS with custom properties; revisit if it slows velocity.
- No state library. React state + context until proven inadequate.
- No client-side routing in v0.1 (single-page flow). Add react-router if v0.2 needs it.
- No analytics, no telemetry, no error reporting service. Period.

## Data flow

```
   user
     |
     v
+-----------+    +-----------+    +-----------+    +-----------+
| dropzone  | -> | pdf.js or | -> | rules     | -> | render    |
| (file or  |    | tesseract |    | engine    |    | summary   |
|  photo)   |    | (in-browser)   | (rules/co)|    |           |
+-----------+    +-----------+    +-----------+    +-----------+
                                       ^
                                       |
                                  YAML rule files
                                  bundled at build
```

All boxes run in the user's browser. There is no server. The "rules engine" is a pure TypeScript function that takes extracted text and returns a structured letter classification, deadline, and recommended actions.

## Module layout

```
web/src/
|-- main.tsx                  app entry
|-- App.tsx                   top-level layout and routing
|-- styles.css                global CSS with focus, motion, contrast rules
|-- components/
|   |-- LetterDropzone.tsx    drag-drop + file picker + camera
|   |-- LetterSummary.tsx     plain-language summary view
|   |-- DeadlineCard.tsx      large prominent deadline display
|   `-- NextActions.tsx       1-3 concrete next actions
|-- lib/
|   |-- pdf.ts                pdf.js wrapper
|   |-- ocr.ts                tesseract.js wrapper
|   |-- rules.ts              loads rules/co/*.yaml; classification logic
|   |-- deadline.ts           deadline extraction
|   `-- plainLanguage.ts      explanation strings keyed by letter type
`-- i18n/
    |-- en.json
    `-- es.json
```

## Rule library

State rules live in `rules/co/` as YAML, separate from the web app. Schema is intentionally simple so a non-developer (CCDC advocate) can read and propose edits via PR.

- `rules/co/letter-types.yaml`: classification patterns and plain-language strings per letter type.
- `rules/co/exemptions.yaml`: exemption categories, required evidence, citations.
- `rules/co/deadlines.yaml`: appeal windows, renewal windows, redetermination windows.

The web app imports these at build time. Updating rules means a PR and a redeploy. This is intentional. It keeps a CCDC attorney in the loop on rule changes.

## Build and deploy

- `npm run build` produces a static bundle in `web/dist/`.
- Reproducible builds: lockfile committed, Node version pinned via `.nvmrc`, deterministic build flags.
- Subresource Integrity hashes generated automatically for all bundled assets.
- Deploy target is a static host (Netlify or GitHub Pages). No backend, no serverless functions.
- Releases are tagged and signed.

## Performance budget

- First Contentful Paint < 1.5s on a 2019 Chromebook over a slow 4G connection.
- Time to Interactive < 3s on the same.
- Total JS bundle (gzipped) < 250 KB for v0.1.
- pdf.js and tesseract.js are loaded only when needed (lazy import).

## Open architectural questions

- Should rules be authored in YAML or in a dedicated little-language? YAML is the v0.1 answer.
- Should the rules engine be rule-based, ML-based, or both? Rule-based for v0.1. Reconsider when we have 50+ real sample letters and can see the failure modes.
- Should we expose a CLI for batch processing letters (for CCDC staff who handle volume)? Out of scope for v0.1; consider for v0.2.
