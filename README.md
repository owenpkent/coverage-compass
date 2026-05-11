# Coverage Compass *(working title)*

A privacy-local web app that helps disabled Coloradans (and their advocates at [CCDC](https://ccdconline.org/)) navigate Colorado Medicaid's new work-reporting requirements and the appeals process.

**Status:** scoping. No code in production. See `docs/brainstorm.md` for origin and `docs/roadmap.md` for what's next.

## Why this exists

Colorado's Medicaid work-reporting requirements (H.R. 1) start affecting renewals and new applications in **January 2027**. Most CCDC members will qualify for an exemption (SSDI, HCBS, LTSS, buy-in, medically frail). The danger is not the substantive requirement. The danger is **procedural disenrollment**: losing coverage because they failed to *prove* the exemption in time. That's the Arkansas 2018 pattern. This tool exists to make the proof easy.

## What it does

One tool, two flows.

- **Before things go wrong:** assemble an exemption packet from documents the user already has (SSA award letter, waiver enrollment, tax returns, diagnosis letters) and submit it at application or renewal.
- **After things go wrong:** draft an appeal letter (for review by a CCDC advocate, not direct-to-state filing) when a denial, termination, or care reduction arrives.

Both flows share the same document intake, the same Colorado rule library, and the same plain-language explanations.

## How it's built

- **Client-side web app** (PWA, installable to desktop later via Tauri if needed).
- **No server, no telemetry, no analytics.** All processing happens in the browser. Documents never leave the device.
- **Open source.** Auditable by anyone, especially by CCDC's advocates and constituents.
- **Accessibility is the bar, not a feature.** WCAG 2.2 AA at minimum, screen-reader-first, plain language (6th grade target), keyboard-only flows, cognitive accessibility patterns.

See `docs/architecture.md` for the technical detail and `docs/privacy.md` for the threat model.

## Repository layout

```
.
|-- README.md                  this file
|-- docs/                      product, technical, and policy documentation
|   |-- brainstorm.md          origin and reasoning
|   |-- spec-v0.1.md           MVP product spec (notice triage)
|   |-- roadmap.md             dated milestone sequence anchored to CO rollout
|   |-- architecture.md        technical architecture
|   |-- privacy.md             threat model and data handling
|   |-- accessibility.md       a11y standard and testing approach
|   |-- glossary.md            SSDI, HCBS, CDASS, LTSS, PEAK, etc.
|   |-- colorado-rules.md      CO exemption categories, deadlines, citations
|   `-- outreach.md            CCDC and CfA contact plan
|-- web/                       the application (Vite + React + TypeScript)
|-- rules/                     state-rule libraries (YAML-defined)
|   `-- co/                    Colorado
|-- research/                  anonymized samples, prior-art notes (gitignored content)
`-- Implementing-Medicaid-Work-Requirements-A-Guide-for-States.pdf
```

## Getting started

```bash
cd web
npm install
npm run dev
```

See `web/README.md` for app-specific dev notes.

## Contributing

Built by and for the disability community. See `docs/outreach.md` for the CCDC scoping plan. This repository is currently exploratory. If you're a CCDC member, CCDC staff, a Code for America volunteer, or a disabled Coloradan with relevant experience, please reach out.

## License

To be decided. See `LICENSE-DECISION.md`. The default candidates are Apache 2.0 (permissive, patent protection) or AGPLv3 (network copyleft, ensures hosted forks share back).
