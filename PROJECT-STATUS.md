# Project status

**Snapshot date:** 2026-05-16
**Phase:** v0.0 Foundation (scoping; no code in production)
**Working title:** Coverage Compass

This is a single-page snapshot of where the project stands. For detail, follow the links into `docs/` and `research/`.

## At a glance

- **Goal:** help disabled Coloradans keep their Medicaid when Colorado's work-reporting requirements take effect in 2027, and help CCDC advocates draft appeals when something goes wrong.
- **Design partner:** [Colorado Cross-Disability Coalition](https://ccdconline.org/) (institutional home).
- **Built by:** one volunteer software engineer (CCDC member). No funding ask, no revenue model.
- **Status:** scoping is the bottleneck, not code. Pitches are drafted, prior-art survey is done. The next blocker is a one-hour conversation with CCDC.
- **First ship target:** v0.1 (notice triage) in August 2026, before HCPF starts sending work-requirement letters.

## What this is

A free, open-source web app with two flows from one engine. Both flows run entirely in the user's browser. No server, no account, no telemetry.

- **Before things go wrong.** Read an HCPF or PEAK letter, explain it in plain language, surface the deadline, and assemble an exemption packet from documents the user already has.
- **After things go wrong.** Take a denial / termination / care-reduction letter, run a short interview, produce a draft appeal that routes through a CCDC advocate (never direct-to-state).

Full framing: [`docs/brainstorm.md`](docs/brainstorm.md). MVP scope: [`docs/spec-v0.1.md`](docs/spec-v0.1.md).

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
- [ ] Scoping conversation with CCDC appeals/advocacy staff
- [ ] CCDC pitch sent
- [ ] CfA pitch sent
- [ ] Anthropic pitch sent
- [ ] License decision (Apache 2.0 vs AGPLv3, see [`LICENSE-DECISION.md`](LICENSE-DECISION.md))
- [ ] First 10 anonymized sample letters from CCDC
- [ ] Plain-language review process established with CCDC

### Documentation produced

- Architecture and stack ([`docs/architecture.md`](docs/architecture.md))
- Privacy posture and threat model ([`docs/privacy.md`](docs/privacy.md))
- Accessibility standard ([`docs/accessibility.md`](docs/accessibility.md))
- Glossary of Colorado Medicaid terms ([`docs/glossary.md`](docs/glossary.md))
- Colorado rules reference ([`docs/colorado-rules.md`](docs/colorado-rules.md))
- v0.1 product spec ([`docs/spec-v0.1.md`](docs/spec-v0.1.md))
- Outreach plan ([`docs/outreach.md`](docs/outreach.md))
- Two pitches and an email template (above)
- Prior-art survey of ~50 sources (above)
- UI brainstorm write-up and ten static HTML mockups across both flows ([`docs/ui-brainstorm.md`](docs/ui-brainstorm.md), [`docs/mockups/`](docs/mockups/))
- Hygiene files: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, issue templates, `CHANGELOG.md`

### Code

- Web-app shell scaffolded (Vite + React + TypeScript + React Aria Components). No user-facing features yet.
- Rule library directory in place (`rules/co/`). YAML files seeded with the first letter types and exemption categories. All entries flagged "verify with CCDC" until reviewed.

## What's next

### Immediate (the rest of May into June 2026)

1. **Send the CCDC pitch.** The repo has a one-pager and a paste-able email; the institutional path in (CCDC member channel first, then ED if needed) is documented in [`docs/outreach.md`](docs/outreach.md).
2. **Send the CfA pitch.** The prior-art survey makes one specific ask load-bearing: talk to the team behind [`codeforamerica/work-requirements-self-advocacy-tool`](https://github.com/codeforamerica/work-requirements-self-advocacy-tool) before duplicating screener content.
3. **Decide the license.** Apache 2.0 vs AGPLv3 trade-offs in [`LICENSE-DECISION.md`](LICENSE-DECISION.md).
4. **Convert prior-art findings into rule-library seed content.** NHeLP's Technical Guide, Justice in Aging's seven principles, AAPD's plain-language explainer, and the SHVS medical-frailty toolkit are the highest-value inputs.

### v0.1 Notice Triage (target August 2026)

Drop-a-letter, get-a-summary. Acceptance criteria in [`docs/spec-v0.1.md`](docs/spec-v0.1.md). Ships before HCPF begins mailing.

### v0.2 Exemption Packet (target November 2026 to January 2027)

Document classifier + decision tree + packet generator. Ships before the January 2027 impact wave.

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
- **Clear gap:** No one has shipped a Medicaid-specific, client-side, advocate-in-the-loop tool with an advocate-readable rules library. That is this project's lane.

## Open questions and decisions pending

Numbered for a scoping conversation.

1. Is procedural disenrollment the right focus for CCDC's advocacy team, or is there a higher-priority bottleneck?
2. Would CCDC use the tool internally (advocate productivity), put it in members' hands directly, or both?
3. Is the appeals-drafting feature comfortable to CCDC given UPL concerns, with the output explicitly routed through a CCDC advocate?
4. Apache 2.0 or AGPLv3?
5. Is there a license-compatibility question with the CfA `work-requirements-self-advocacy-tool` (listed as "Other" / NOASSERTION)?
6. Which Colorado HCBS waivers count for the exemption? (EBD, SLS, CES, CIH, CMHS, BI, DD, CHCBS need confirmation.)
7. Is the "medically frail" determination automatic from existing diagnosis data, or does it require fresh documentation?
8. Spanish from day one is committed. What other languages should v0.1 plan for?

Full set of open questions: [`research/prior-art.md`](research/prior-art.md) section 5.

## Known risks

- **Schedule risk.** The August 2026 ship target depends on a CCDC scoping conversation happening soon. Each week of delay compresses build time.
- **Sample-letter dependency.** v0.1 acceptance criteria require correctly classifying real Colorado letters. We need 10 to 20 anonymized samples from CCDC. Without them, the classifier is unverified.
- **Stack drift.** Tesseract.js and pdf.js are heavy. The architecture target is < 250 KB gzipped bundle and < 3s TTI on a 2019 Chromebook. Lazy-loading is planned; verify in v0.1.
- **CfA collision.** If CfA quietly builds a Medicaid version of their tool before we ship, we should reconsider the lane. Phase 2 outreach is partly to surface this.
- **Reading-level enforcement.** The 6th-grade Flesch-Kincaid target is a hard project rule, not a wish. Need a working CI tool before user-facing copy lands.

## How to help

- **Disabled Coloradans** with Medicaid experience: tell us what breaks in the renewal or appeals process.
- **CCDC staff or advocates:** the scoping conversation is the unblocker.
- **Civic-tech volunteers (Code for America, brigade):** code, accessibility testing, plain-language review.
- **Spanish reviewers:** native speakers for translation review.
- **Plain-language writers:** review the 6th-grade-reading-level constraint.

Contact: [LinkedIn](https://www.linkedin.com/in/owenpkent) or open an issue / discussion on this repository.

## Document map

If you're new to the repo and reading top-down:

1. [`README.md`](README.md): what this is (non-technical).
2. This file: where the project stands.
3. [`docs/brainstorm.md`](docs/brainstorm.md): why the project exists.
4. [`docs/spec-v0.1.md`](docs/spec-v0.1.md): what the first version does.
5. [`docs/ui-brainstorm.md`](docs/ui-brainstorm.md): ten HTML mockups across two flows, with working recommendations.
6. [`docs/roadmap.md`](docs/roadmap.md): when each phase ships.
7. [`docs/outreach.md`](docs/outreach.md): who we need to talk to.
8. [`research/prior-art.md`](research/prior-art.md): what already exists.
9. [`docs/architecture.md`](docs/architecture.md), [`docs/privacy.md`](docs/privacy.md), [`docs/accessibility.md`](docs/accessibility.md): the three non-negotiable constraints.
10. [`CONTRIBUTING.md`](CONTRIBUTING.md): how to get involved.
11. [`CHANGELOG.md`](CHANGELOG.md): what changed recently.
