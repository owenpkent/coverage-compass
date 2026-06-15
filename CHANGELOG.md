# Changelog

All notable changes to this project are recorded here. The project is in pre-v0.1 scoping, so entries describe documentation and outreach work rather than shipped features. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Dates are local Mountain time.

## [Unreleased]

### Added
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
