# Project status

**Snapshot date:** 2026-06-15
**Phase:** v0.0 Foundation (re-architected around the proven engine; shell still early)
**Working title:** Coverage Compass

This is a single-page snapshot of where the project stands. For detail, follow the links into `docs/` and `research/`.

## At a glance

- **Goal:** help disabled Coloradans keep their Medicaid when Colorado's work-reporting requirements take effect in 2027, and help CCDC advocates draft appeals when something goes wrong.
- **Design partner:** [Colorado Cross-Disability Coalition](https://ccdconline.org/) (institutional home).
- **Built by:** one volunteer software engineer (CCDC member). No funding ask, no revenue model.
- **Architecture:** Coverage Compass is now re-architected around the proven **CDASS Enroll** engine: a local-first, zero-runtime-network form-autofill engine that is a working proof of concept today. The engine is the foundation, not a future borrow. See [`docs/architecture.md`](docs/architecture.md) and [`docs/form-fill-engine.md`](docs/form-fill-engine.md).
- **License:** decided. Apache 2.0 (see [`LICENSE`](LICENSE) and [`LICENSE-DECISION.md`](LICENSE-DECISION.md)).
- **Status:** the write-side engine is proven in a sibling proof of concept; the Coverage Compass shell that wraps it is still early. Scoping with CCDC is the next blocker, not the engine pattern.
- **First ship target:** v0.1 (notice triage) in August 2026, before HCPF starts sending work-requirement letters.

## What this is

A free, open-source web app that organizes a disabled Coloradan's Medicaid evidence once and reuses it across three events: reporting (ongoing proof of qualifying status), reapplication (renewals and new applications), and appeals. Everything runs entirely in the user's browser. No server, no account, no telemetry.

The system is two parts:

1. **The engine (proven in CDASS Enroll).** A local-first, zero-runtime-network form-autofill engine. One schema is the source of truth; a capture pipeline fills the profile from documents the person already holds (AAMVA barcode via zxing-wasm, passport MRZ, tesseract.js OCR, all verify-everything); a fill layer of pure functions over pdf-lib maps profile values to exact PDF field names and saves the official template's AcroForm without flattening, producing an exact, still-editable copy that downloads locally. Signatures are never fabricated, attestation checkboxes are gated on unambiguous data, and an exact-copy smoke test reloads the output and asserts page and field counts match the blank template. This is the write side, and it works today.
2. **The Coverage Compass shell (new, built around the engine).** An accessible WCAG 2.2 AA React + React Aria UI in English and Spanish; read-side notice triage using pdf.js plus tesseract.js against an advocate-editable per-state YAML rule library; advocate-in-the-loop review; and a personal archive persisted in IndexedDB.

Across the three events:

- **Reporting.** 80-hour-per-month attestation for the work-required minority; periodic exemption re-attestation for the majority.
- **Reapplication.** Annual renewals and new applications. The heaviest practical lift for CCDC's constituency, and where procedural disenrollment usually happens. This is the engine's natural home: carry-forward pre-fill turns an 80-page yearly form into a review-and-correct step.
- **Appeals.** Denial / termination / care-reduction letter in, structured interview, draft appeal out. Routes through a CCDC advocate before it reaches the state.

Entry point is notice triage: drop an HCPF or PEAK letter, get a plain-language summary, the deadline, and a pointer to which flow applies.

Full framing: [`docs/brainstorm.md`](docs/brainstorm.md). MVP scope: [`docs/spec-v0.1.md`](docs/spec-v0.1.md). The write side in detail: [`docs/form-fill-engine.md`](docs/form-fill-engine.md).

## The deadline that drives everything

The Colorado rollout schedule, from [`docs/colorado-rules.md`](docs/colorado-rules.md):

| Date | Event |
|---|---|
| June 2026 | Final CMS guidance expected |
| August 2026 | HCPF begins sending notification letters |
| January 2027 | First impact wave: new applications and renewals must comply |

The roadmap in [`docs/roadmap.md`](docs/roadmap.md) is anchored to these dates. Slipping them means missing the wave of people who get their first notification letter.

## What's done

### v0.0 Foundation checklist (from roadmap)

- [x] Brainstorm and direction (2026-05-11)
- [x] Scaffold repo
- [x] CCDC outreach pitch drafted ([`docs/pitch-ccdc.md`](docs/pitch-ccdc.md), [`docs/pitch-ccdc-email.md`](docs/pitch-ccdc-email.md))
- [x] CfA outreach pitch drafted ([`docs/pitch-cfa.md`](docs/pitch-cfa.md))
- [x] Anthropic outreach pitch drafted ([`docs/pitch-anthropic.md`](docs/pitch-anthropic.md))
- [x] Prior-art survey ([`research/prior-art.md`](research/prior-art.md))
- [x] License decision: Apache 2.0 ([`LICENSE`](LICENSE), [`LICENSE-DECISION.md`](LICENSE-DECISION.md))
- [x] Re-architecture around the proven CDASS Enroll engine ([`docs/architecture.md`](docs/architecture.md), [`docs/form-fill-engine.md`](docs/form-fill-engine.md))
- [ ] Scoping conversation with CCDC appeals/advocacy staff
- [ ] CCDC pitch sent
- [ ] CfA pitch sent
- [ ] Anthropic pitch sent
- [ ] First 10 anonymized sample letters from CCDC
- [ ] Plain-language review process established with CCDC

### The engine, proven in the sibling proof of concept

The write side is not a plan. It is a working proof of concept in **CDASS Enroll** ([github.com/owenpkent/cdass-enroll](https://github.com/owenpkent/cdass-enroll)), a local-only web app that fills the Colorado CDASS/PPL attendant enrollment packet (a 28-page PPL packet plus IRS W-4, optional standalone I-9) from documents the applicant already holds. Its approach is written up in its [white paper](https://github.com/owenpkent/cdass-enroll/blob/master/docs/whitepaper.md).

Proven today in that proof of concept, adopted as-is:

- Local-only, zero-runtime-network architecture.
- In-browser OCR (tesseract.js) with image enhancement and verification.
- Capture-once profile driven by a single schema.
- Document extraction: AAMVA barcode (zxing-wasm), passport MRZ, OCR with plausibility checks, all verify-everything.
- Filling official PDFs into exact, still-editable copies (pdf-lib, no flatten).
- Conservative attestation gating; signatures never fabricated.
- Privacy hygiene: retention auto-clear, scrub-after-generate, vendored OCR/WASM assets, Content-Security-Policy.
- Exact-copy smoke-test verification.

The integration model is decided: adopt the engine into the Coverage Compass web app as a headless TypeScript module now (porting the pure CDASS Enroll modules verbatim into `web/src/lib`). Extracting it into a shared monorepo package is an explicit future-only option, once a second consumer justifies the overhead.

### Documentation produced

- Architecture and stack, re-framed around the proven engine ([`docs/architecture.md`](docs/architecture.md))
- Form-fill engine plan: the write side, file-by-file ([`docs/form-fill-engine.md`](docs/form-fill-engine.md))
- Privacy posture and threat model ([`docs/privacy.md`](docs/privacy.md))
- Accessibility standard ([`docs/accessibility.md`](docs/accessibility.md))
- Glossary of Colorado Medicaid terms ([`docs/glossary.md`](docs/glossary.md))
- Colorado rules reference ([`docs/colorado-rules.md`](docs/colorado-rules.md))
- v0.1 product spec ([`docs/spec-v0.1.md`](docs/spec-v0.1.md))
- Outreach plan ([`docs/outreach.md`](docs/outreach.md))
- Three pitches and an email template (above)
- Prior-art survey of ~50 sources (above)
- UI brainstorm write-up and fourteen static HTML mockups grouped by the three events plus the triage entry ([`docs/ui-brainstorm.md`](docs/ui-brainstorm.md), [`docs/mockups/`](docs/mockups/))
- Hygiene files: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, issue templates, `CHANGELOG.md`

### Code

- The engine (the write side) is implemented and proven in CDASS Enroll: `src/schema.js`, `src/extract/*`, `src/fill/*`, `src/store.js`, `tests/smoke.mjs`, with vendored OCR/WASM assets and a runtime-network-blocking CSP. Coverage Compass adopts these pure modules; only the rendering and storage shells differ.
- Coverage Compass shell scaffolded (Vite + React + TypeScript + React Aria Components). The engine has not yet been ported into `web/src/lib`, and there are no user-facing features yet. The shell is early.
- Rule library directory in place (`rules/co/`). YAML files seeded with the first letter types and exemption categories. All entries flagged "verify with CCDC" until reviewed.

## What's next

### Immediate (the rest of June into July 2026)

1. **Send the CCDC pitch.** The repo has a one-pager and a paste-able email; the institutional path in (CCDC member channel first, then ED if needed) is documented in [`docs/outreach.md`](docs/outreach.md).
2. **Send the CfA pitch.** The prior-art survey makes one specific ask load-bearing: talk to the team behind [`codeforamerica/work-requirements-self-advocacy-tool`](https://github.com/codeforamerica/work-requirements-self-advocacy-tool) before duplicating screener content.
3. **Begin porting the engine into the shell.** Adopt the pure CDASS Enroll modules into `web/src/lib` as a headless TypeScript module (schema, extract, fill), per the step plan in [`docs/form-fill-engine.md`](docs/form-fill-engine.md). The fill layer ports almost verbatim; the work is mostly adding types.
4. **Convert prior-art findings into rule-library seed content.** NHeLP's Technical Guide, Justice in Aging's seven principles, AAPD's plain-language explainer, and the SHVS medical-frailty toolkit are the highest-value inputs.

### v0.1 Notice Triage (target August 2026)

Drop-a-letter, get-a-summary. The read side: pdf.js plus tesseract.js classify a letter against the advocate-editable YAML rule library and explain it in plain language. Acceptance criteria in [`docs/spec-v0.1.md`](docs/spec-v0.1.md). Ships before HCPF begins mailing.

### v0.2 Exemption Packet (target November 2026 to January 2027)

Document classifier + decision tree + packet generator. The write side here is not invented; it adopts the proven engine and maps it to the Medicaid forms (the Medicaid-specific schema growth, the Colorado form mappings, tax-document reading, and the exemption-packet assembly). Ships before the January 2027 impact wave. See [`docs/form-fill-engine.md`](docs/form-fill-engine.md).

### v0.3 Appeal Draft (target Q1 2027)

Denial-letter classifier + structured interview + draft appeal routed to a CCDC advocate. Ships in time for the first wave of disenrollments.

## Outreach status

| Org | Status | Next step |
|---|---|---|
| CCDC | Pitch drafted (one-pager + email template). Owen is a member. | Send via member channel; aim for a one-hour scoping conversation. |
| Code for America | Pitch drafted, scoped to Safety Net Innovation Lab and Colorado brigade. | Send. Open with the `work-requirements-self-advocacy-tool` overlap question. |
| Anthropic | Pitch drafted, scoped to the existing CfA public-benefits collaboration. | Send directly, in parallel with CfA. Reference the CfA partnership as context, not as a gate. |
| HCPF | No outreach planned in this phase. CCDC owns the HCPF relationship. | Defer until CCDC says otherwise. |
| Stanford Legal Design Lab | Outreach plan referenced an "OCR notice translator." Survey did not find a specific shipped project matching. | Treat as methodological prior art unless the Lab confirms otherwise. |

Contact log lives in [`docs/outreach.md`](docs/outreach.md) (currently empty).

## Prior-art posture

Full survey: [`research/prior-art.md`](research/prior-art.md). The short version:

- **Closest direct analogue:** CfA's `work-requirements-self-advocacy-tool` (active, NC-only, SNAP-only, hosted Rails). Pattern overlap is high; lane is different.
- **Substantive backbone:** NHeLP's November 2025 Technical Guide to Reduce Procedural Terminations.
- **Appeal template starting point:** Justice in Aging's February 2026 letter with seven mitigation principles.
- **Exemption-evidence reference:** SHVS medical-frailty toolkit with ICD-10 / CPT crosswalk.
- **Proven internal foundation:** the CDASS Enroll engine, a working local-first form-autofill proof of concept that Coverage Compass is architected around.
- **Clear gap:** No one has shipped a Medicaid-specific, client-side, advocate-in-the-loop tool with an advocate-readable rules library. That is this project's lane.

## Open questions and decisions pending

Numbered for a scoping conversation.

1. Is procedural disenrollment the right focus for CCDC's advocacy team, or is there a higher-priority bottleneck?
2. Would CCDC use the tool internally (advocate productivity), put it in members' hands directly, or both?
3. Is the appeals-drafting feature comfortable to CCDC given UPL concerns, with the output explicitly routed through a CCDC advocate?
4. Is there a license-compatibility question with the CfA `work-requirements-self-advocacy-tool` (listed as "Other" / NOASSERTION)? Coverage Compass is Apache 2.0.
5. Which Colorado HCBS waivers count for the exemption? (EBD, SLS, CES, CIH, CMHS, BI, DD, CHCBS need confirmation.)
6. Is the "medically frail" determination automatic from existing diagnosis data, or does it require fresh documentation?
7. Spanish from day one is committed. What other languages should v0.1 plan for?
8. Which real Colorado form does the write side map first (a Medicaid renewal/redetermination form, the exemption-packet cover form, or the CDASS care-hours worksheet, the IHSS Care Plan)?

Full set of open questions: [`research/prior-art.md`](research/prior-art.md) section 5.

## Known risks

- **Schedule risk.** The August 2026 ship target depends on a CCDC scoping conversation happening soon. Each week of delay compresses build time.
- **Shell-maturity risk.** The engine is proven, but the Coverage Compass shell is early: the engine has not yet been ported into `web/src/lib`, and there are no user-facing features yet. The August target depends on the read side and the porting work landing on schedule.
- **Sample-letter dependency.** v0.1 acceptance criteria require correctly classifying real Colorado letters. We need 10 to 20 anonymized samples from CCDC. Without them, the classifier is unverified.
- **Stack drift.** Tesseract.js, pdf.js, and pdf-lib are heavy. The architecture target is < 250 KB gzipped bundle and < 3s TTI on a 2019 Chromebook. The write-side engine is lazy-loaded so it adds nothing to the read-side first load; verify in v0.1 and v0.2.
- **Form-revision drift.** The fill layer maps exact PDF field names per form revision. Colorado can re-issue a form with renamed fields. The engine degrades a missing or renamed field to a logged warning rather than a crash, and the exact-copy smoke test guards regressions, but each new form revision needs a fresh field dump and mapping.
- **CfA collision.** If CfA quietly builds a Medicaid version of their tool before we ship, we should reconsider the lane. Phase 2 outreach is partly to surface this.
- **Reading-level enforcement.** The 6th-grade Flesch-Kincaid target is a hard project rule, not a wish. Need a working CI tool before user-facing copy lands.

## How to help

- **Disabled Coloradans** with Medicaid experience: tell us what breaks in the renewal or appeals process.
- **CCDC staff or advocates:** the scoping conversation is the unblocker.
- **Civic-tech volunteers (Code for America, brigade):** code, accessibility testing, plain-language review.
- **Spanish reviewers:** native speakers for translation review.
- **Plain-language writers:** review the 6th-grade-reading-level constraint.

Contributions are licensed under Apache 2.0 (inbound equals outbound). See [`CONTRIBUTING.md`](CONTRIBUTING.md).

Contact: [LinkedIn](https://www.linkedin.com/in/owenpkent) or open an issue / discussion on this repository.

## Document map

If you're new to the repo and reading top-down:

1. [`README.md`](README.md): what this is (non-technical).
2. This file: where the project stands.
3. [`docs/brainstorm.md`](docs/brainstorm.md): why the project exists.
4. [`docs/spec-v0.1.md`](docs/spec-v0.1.md): what the first version does.
5. [`docs/ui-brainstorm.md`](docs/ui-brainstorm.md): fourteen HTML mockups across the three events plus triage, with working recommendations.
6. [`docs/architecture.md`](docs/architecture.md): the two-part system (the engine plus the shell).
7. [`docs/form-fill-engine.md`](docs/form-fill-engine.md): the proven write side, file by file.
8. [`docs/roadmap.md`](docs/roadmap.md): when each phase ships.
9. [`docs/outreach.md`](docs/outreach.md): who we need to talk to.
10. [`research/prior-art.md`](research/prior-art.md): what already exists.
11. [`docs/privacy.md`](docs/privacy.md), [`docs/accessibility.md`](docs/accessibility.md): two of the non-negotiable constraints.
12. [`CONTRIBUTING.md`](CONTRIBUTING.md): how to get involved.
13. [`CHANGELOG.md`](CHANGELOG.md): what changed recently.