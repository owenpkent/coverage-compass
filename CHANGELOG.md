# Changelog

All notable changes to this project are recorded here. The project is in pre-v0.1 scoping, so entries describe documentation and outreach work rather than shipped features. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Dates are local Mountain time.

## [Unreleased]

### Added
- **v0.1 read side (notice triage), implemented end to end in `web/`.** A dropped PDF or photo, or pasted text, is read entirely on the device and classified against the Colorado rule library, then shown as a plain-language summary with the deadline (date and days remaining), what happens if you do nothing, and one to three concrete next actions, in English or Spanish. New modules: `lib/pdf.ts` (pdf.js text extraction, worker bundled from our own origin), `lib/ocr.ts` (tesseract.js with vendored worker, WASM cores, and language data), `lib/deadline.ts` (bilingual date extraction that only trusts a date next to a deadline word), `lib/rules.ts` + `lib/plainLanguage.ts` (deterministic classifier over the YAML rules), `lib/summaryPdf.ts` (downloadable one-page summary via pdf-lib), and the `DeadlineCard`, `NextActions`, `LetterSummary`, `LanguageToggle`, and `Triage` components.
- Build-time rule codegen (`web/scripts/gen-rules.mjs`): compiles `rules/co/letter-types.yaml` into a typed `web/src/lib/rules.generated.ts`, keeping the YAML the advocate-editable source of truth while the app imports typed data.
- OCR asset vendoring (`web/scripts/vendor-ocr.mjs`): copies the tesseract worker, WASM cores, and English/Spanish language models from `node_modules` into `web/public/vendor` (gitignored, reproducible from the lockfile), so the photo path makes no third-party network request.
- Internationalization with react-intl: English and Spanish message catalogs (`web/src/i18n/`), an in-memory language toggle, and a draft Spanish layer in the rule library marked pending native-speaker and CCDC review.
- PWA: web manifest, a service worker that precaches the app shell and runtime-caches the OCR assets, and SVG app icons, so PDF and paste-text triage work offline after first load.
- Production Content-Security-Policy injected at build time (`connect-src 'self'` blocks data exfiltration; the vendored OCR/PDF assets stay same-origin), and an ESLint 9 flat config that actually runs the `jsx-a11y` accessibility rules (there was previously no eslint config, so lint never ran).
- Tests: unit tests for the deadline extractor and the classifier, an i18n catalog-parity test, a CCDC-phone-consistency guard over the rules, and component plus axe-core accessibility tests for the landing page and the result view.
- Hardening from a multi-agent review of the read side (each finding adversarially verified before fixing). Notable: forced `cacheMethod: "none"` so tesseract never persists its language model to IndexedDB (honoring "nothing persists by default"); the classifier now breaks score ties toward the higher-stakes letter type (an urgent termination is never hidden behind a benign renewal) and no longer double-counts overlapping patterns into a falsely high confidence; the deadline extractor no longer mistakes an enrollment/effective date for an action deadline; OCR progress no longer floods the screen-reader live region; focus returns to the upload view on reset/error; the printable PDF carries the "unreviewed Spanish" caveat; HEIC photos get specific iPhone guidance instead of a generic error; and the build emits a `_headers` file (full CSP plus `frame-ancestors 'none'` and clickjacking headers) for header-capable hosts.
- README status badges (license, PRs welcome, good first issues, accessibility, privacy, status) via shields.io.
- `web/src/lib/fill/fillForm.ts` and a Vitest exact-copy test: pdf-lib adopted (lazy-imported) as the write-side groundwork from the proven engine, the first step of the form-fill adoption plan (good first issue #1).
- `.github/CODEOWNERS`: default review owner (@owenpkent), with a clearly-marked placeholder for adding CCDC advocate review of `rules/**` and user-facing copy once a reviewer has a GitHub handle.
- `SUPPORT.md`: where to get help; routes Medicaid case help to CCDC (303-839-1775) and software questions to Discussions, and points security reports to SECURITY.md.
- `docs/spec-v0.2.md`: spec for v0.2 Reapplication, pre-filling renewals, redeterminations, exemption packets, and the CDASS care-hours worksheet from the local archive (carry-forward).
- `docs/formfest-2026-application.md`: paste-ready FormFest 2026 session proposal (panel, Accessibility theme).
- `docs/ui-brainstorm.md`: write-up of the two UI brainstorms (v0.1 notice triage and v0.3 appeal workflow), including the working recommendations and what was not decided.
- `docs/mockups/`: ten self-contained HTML mockups plus a shared stylesheet. Five archetypes for the v0.1 notice-triage flow (`01-single-screen`, `02-linear-wizard`, `03-conversational`, `04-two-pane`, `05-print-first`) and five for the v0.3 appeal workflow (`a01-progress-tracker`, `a02-dashboard`, `a03-advocate-conversation`, `a04-two-pane`, `a05-document-first`). `index.html` and `appeals-index.html` link them with one-line trade-offs. `shared.css` encodes WCAG 2.2 AA tokens, dark / reduced-motion / high-contrast support, a 48px tap-target floor, and an appeals-specific dual-clock urgency banner that surfaces continuation-of-benefits and appeal-deadline clocks together.
- `docs/pitch-cfa.md`: one-page pitch for Code for America (Safety Net Innovation Lab and brigade-facing).
- `research/prior-art.md`: prior-art survey covering Code for America, NHeLP, Justice in Aging, NDRN and state P&As, AAPD, The Arc, KFF, Urban Institute, CBPP, Georgetown CCF, SHVS, Stanford Legal Design Lab, and adjacent appeal-generator tools.
- `CHANGELOG.md` (this file).
- `PROJECT-STATUS.md`: snapshot of where the project stands across outreach, scoping, build, license, and prior art.
- LinkedIn contact link in `README.md`, both pitch one-pagers, the CCDC email template, and `CODE_OF_CONDUCT.md`.
- `What's in this repository` section in `README.md` with a plain-language directory listing.

### Changed
- Reframed CCDC throughout the repo from a prospect being pitched to the confirmed partner organization, with the scoping conversation now held. `README.md`, `PROJECT-STATUS.md`, and `docs/roadmap.md` state the partnership as established (the "CCDC pitch sent" and "scoping conversation" checklist items are done); `docs/outreach.md` Phase 1 is now the working scope-and-handoff; and `docs/pitch-ccdc.md` and `docs/pitch-ccdc-email.md` are rewritten from a cold pitch into a working brief and working-relationship emails. The rule-content review, the first anonymized sample letters, native-speaker Spanish review, and a named advocate reviewer for `rules/**` remain the active, in-progress deliverables with CCDC.
- `rules/co/letter-types.yaml` is now bilingual (English plus draft Spanish) and is consumed by the app through build-time codegen, rather than sitting unused. Letter-type labels, plain-language summaries, do-nothing consequences, and next actions all carry `{ en, es }`.
- Aligned the CCDC phone number in `rules/co/letter-types.yaml` to 303-839-1775, matching the app footer and the rest of the repo (the rule file still carried the older 303-839-3056). A unit test now fails if any rule uses a different number.
- `web/` stack and scripts: added pdfjs-dist, tesseract.js, react-intl, vite-plugin-pwa, and js-yaml; `lib/pdf.ts`, `lib/ocr.ts`, and `lib/rules.ts` are no longer stubs; added `gen:rules` and `vendor:ocr` npm scripts wired into predev/prebuild/pretest so the generated rules and vendored assets are always present; `lint` moved to the ESLint 9 flat config.
- Corrected the CCDC phone number to 303-839-1775 across `SUPPORT.md`, `CONTRIBUTING.md`, `.github/ISSUE_TEMPLATE/config.yml`, and the web app footer (`web/src/App.tsx`).
- Fixed the web build on a fresh clone: added the missing `@testing-library/jest-dom` dev dependency (referenced by `web/tsconfig.json` and `web/src/test-setup.ts`) and imported it in the test setup, so `npm run build` and the tests pass.
- Re-architected the docs around the proven CDASS Enroll engine: `docs/architecture.md` now centers the headless engine (schema, capture, fill) with the accessible React + React Aria shell built around it, and `docs/form-fill-engine.md`, `README.md`, `PROJECT-STATUS.md`, and `docs/roadmap.md` align to the engine-as-foundation framing and an explicit proven-vs-new split.
- `CONTRIBUTING.md`: expanded for community contributions (first-contribution quickstart, exact `web/` dev setup and commands, Node 20, fork/branch/small-PR workflow, the rule-library YAML contribution path, the shared-engine note, Apache 2.0 inbound-equals-outbound licensing with optional DCO, and links to every issue template and to SUPPORT).
- License consistency: corrected remaining "pending" / "to be decided" / "Apache 2.0 vs AGPLv3" language to Apache 2.0 (decided) in `LICENSE-DECISION.md` (rewritten to present Apache 2.0 as final), `README.md`, `PROJECT-STATUS.md`, `docs/roadmap.md`, and `docs/pitch-cfa.md`.
- `docs/roadmap.md`: corrected the mockup count (fourteen archetypes across the three events plus triage, not five) and the contradictory app-scaffold checklist item.
- `README.md`: Reapplication now describes carry-forward pre-population and the CDASS care-hours worksheet, plus a caseworker note; the directory listing adds `spec-v0.2.md` and `formfest-2026-application.md`.
- `docs/roadmap.md`: v0.2 adds carry-forward pre-fill and CDASS care-hours worksheet items; post-MVP backlog adds caseworker mode.
- `docs/form-fill-engine.md`: adds a "Pre-population: fill this year from last year" section, names the CDASS care-hours worksheet as a target form, and adds the caseworker extension.
- `README.md`: rewritten for a non-technical audience. Reframed privacy and accessibility in human terms. Tech stack and `npm` instructions moved behind a single "For developers" pointer to `docs/`.
- `docs/outreach.md`: Phase 2 (Code for America) now links the new pitch and surfaces the CfA `work-requirements-self-advocacy-tool` finding as the top question to bring to a CfA conversation. Phase 3 (prior-art survey) marked complete with headline findings. Stanford Legal Design Lab "OCR notice translator" lead flagged as not resolving to a specific shipped project.
- `docs/roadmap.md`: v0.0 Foundation checklist updated. Prior-art survey, CCDC pitch, and CfA pitch checked off; "pitch sent" items added as still-pending.
- `research/README.md`: prior-art.md moved from "planned" to "complete" with a brief description and date.
- `SECURITY.md`: vulnerability reporting now uses GitHub's [private vulnerability reporting](https://github.com/owenpkent/coverage-compass/security/advisories/new) feature.
- `CODE_OF_CONDUCT.md`: enforcement contact channel switched to a LinkedIn DM to the maintainer.
- `.github/ISSUE_TEMPLATE/sample_letter.yml`: submission instructions revised to note that a private channel is being set up; for now, reporters open the issue with metadata only and a maintainer follows up privately.
- `docs/pitch-ccdc.md`, `docs/pitch-ccdc-email.md`, `docs/pitch-cfa.md`: bylines / signatures cleaned. Email template uses a `<your-email>` placeholder.

### Removed
- Personal email address (Owenpkent@gmail.com) removed from all repository files. Verified with a project-wide grep returning zero matches.

## [0.0.0] - 2026-05-11

### Added
- Initial repository scaffold.
- Documentation set in `docs/`: brainstorm, spec-v0.1, roadmap, architecture, privacy, accessibility, glossary, colorado-rules, outreach, pitch-ccdc, pitch-ccdc-email.
- Web app shell in `web/` (Vite + React + TypeScript + React Aria Components).
- Rule library scaffolding in `rules/co/`.
- Repository hygiene: `LICENSE` (placeholder), `LICENSE-DECISION.md`, `NOTICE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `.github/ISSUE_TEMPLATE/sample_letter.yml`.
- `Implementing-Medicaid-Work-Requirements–A-Guide-for-States.pdf` (reference material).
