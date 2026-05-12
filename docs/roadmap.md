# Roadmap

Dates are anchored to the [Colorado work-requirements rollout](colorado-rules.md). Slipping these means missing the wave of people who get their first work-requirement letter.

## v0.0 Foundation (May 2026 to July 2026)

- [x] Brainstorm and direction (2026-05-11)
- [x] Scaffold repo
- [x] CCDC outreach pitch drafted (2026-05-11; `docs/pitch-ccdc.md`, `docs/pitch-ccdc-email.md`)
- [x] Survey of prior art (2026-05-11; `research/prior-art.md`)
- [x] CfA outreach pitch drafted (2026-05-11; `docs/pitch-cfa.md`)
- [ ] Scoping conversation with CCDC appeals/advocacy staff (see `outreach.md`)
- [ ] CCDC pitch sent
- [ ] CfA pitch sent
- [ ] License decision (Apache 2.0 vs AGPLv3)
- [ ] First 10 anonymized sample letters from CCDC
- [ ] Plain-language review process established with CCDC

**Exit criteria:** CCDC has a named point of contact, scope is validated against real bottleneck, license chosen, at least 10 sample letters in hand.

## v0.1 Notice Triage (target: August 2026)

Ships before the first wave of notification letters goes out from HCPF in August 2026.

- [ ] Vite + React + TS app scaffolded (done)
- [ ] PDF intake (pdf.js) and image OCR (tesseract.js)
- [ ] Letter classifier (rule-based first; revisit LLM later)
- [ ] Plain-language explanation library (CO-specific, reviewed by CCDC)
- [ ] Deadline extraction
- [ ] Accessibility audit pass (axe-core + manual screen reader)
- [ ] Spanish translation
- [ ] PWA install + offline mode
- [ ] Hosted on a stable URL with SRI and reproducible build
- [ ] CCDC advocate user test passes

**Exit criteria:** all acceptance criteria in `spec-v0.1.md` pass.

## v0.2 Exemption Packet (target: November 2026 to January 2027)

Ships before the first impact wave on 2027-01-01.

- [ ] Document classifier for SSA award letters and waiver enrollment letters
- [ ] Tax-return reader for W-2 / 1099-NEC / Schedule C / Schedule SE (PDF, not IRS API)
- [ ] Exemption decision tree (SSDI -> HCBS -> LTSS -> Buy-In -> medically frail -> caregiver)
- [ ] Packet template generator (PDF output with cover letter and labeled exhibits)
- [ ] Renewal calendar with deadline tracking (IndexedDB, local only)
- [ ] Updated CCDC user test

**Exit criteria:** an SSDI recipient and an HCBS waiver recipient can each generate a usable exemption packet end-to-end, validated by a CCDC advocate.

## v0.3 Appeal Draft (target: Q1 2027)

For the first wave of disenrollments arriving on or after 2027-01-01.

- [ ] Denial/termination letter classifier
- [ ] Short structured interview (cause of denial, what user disagrees with)
- [ ] Appeal letter templates (one per common denial pattern)
- [ ] Output explicitly routed to a CCDC advocate, not direct-to-state
- [ ] UPL disclaimers reviewed by CCDC counsel
- [ ] CCDC advocate intake workflow

**Exit criteria:** CCDC advocates report material time savings on routine procedural-termination appeals.

## Post-MVP backlog

Not committed, not ordered.

- HCBS waiver navigator (`docs/brainstorm.md` idea #6)
- CDASS toolkit (`docs/brainstorm.md` idea #4)
- Procedural-disenrollment incident tracker for CCDC policy advocacy (`docs/brainstorm.md` idea #7)
- Multi-state expansion (start with another state coalition that wants to adopt)
- Tauri desktop wrapper for kiosk use
- Locally-run small LLM for free-form notice translation
