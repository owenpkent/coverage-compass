# Coverage Compass *(working title)*

A free, open source tool to help disabled Coloradans keep their Medicaid when Colorado's new work-reporting rules take effect in 2027. Built with [CCDC](https://ccdconline.org/) (Colorado Cross-Disability Coalition) as the design partner.

**Status:** early scoping. Nothing is live yet. First version targeted August 2026, before the state begins mailing notification letters.

**This README is a partner brief.** It exists to invite three organizations into the build: CCDC (lived expertise, member trust, advocate review), [Code for America](https://codeforamerica.org/) (safety-net civic tech, multi-state reusability), and [Anthropic](https://www.anthropic.com/) (responsible AI patterns for the parts of the tool that need them). Code for America and Anthropic already have a public-benefits collaboration. CCDC is the on-the-ground partner who closes the loop.

## What's happening in Colorado

Starting January 2027, Coloradans on Medicaid will have to either work 80 hours a month or prove they qualify for an exemption. Common exemptions include SSDI, HCBS waivers, LTSS, the Medicaid Buy-In program, and "medically frail" status.

Most CCDC members already qualify. The danger is not the rule itself. The danger is the paperwork. When Arkansas tried something similar in 2018, thousands of people lost coverage not because they failed the rule, but because they could not prove their exemption in time. The state did not get the right paperwork by the right date. That is what this tool is built to prevent.

The schedule that drives every other date in this project:

| Date | Event |
|---|---|
| June 2026 | Final CMS guidance expected |
| August 2026 | HCPF begins mailing notification letters |
| January 2027 | First impact wave: new applications and renewals must comply |

## What the tool does

A privacy-local document organizer for three Medicaid life events. The same personal archive (Social Security award letters, HCBS waiver paperwork, tax returns, diagnosis letters, work hours if applicable) serves all three.

1. **Reporting.** Ongoing proof you still qualify. For the small minority who must work, that means 80-hour-per-month attestation. For the majority on an exemption, it means periodic re-attestation that the exemption still applies.
2. **Reapplication.** Renewals (typically every 12 months) and new applications. The heaviest practical lift for CCDC's constituency, and where procedural disenrollment usually happens.
3. **Appeals.** If a denial, termination, or care reduction arrives, the tool runs a short structured interview and drafts an appeal. The draft routes to a CCDC advocate for review before it is filed. It does not replace a CCDC advocate or an attorney.

The entry point is a notice-triage step: drop a letter from HCPF or PEAK, get a plain-language summary, the deadline, and a pointer to which of the three flows applies.

Full v0.1 product spec: [`docs/spec-v0.1.md`](docs/spec-v0.1.md). UI mockups: [`docs/ui-brainstorm.md`](docs/ui-brainstorm.md) (ten static HTML mockups, openable in a browser).

## Why three partners

The problem does not fit cleanly inside any one of these organizations. It needs all three.

### CCDC: lived expertise, member trust, advocate-in-the-loop

CCDC owns the Colorado rules. Exemption categories, deadlines, letter patterns, and plain-language explanations live in flat YAML files that an advocate can read and propose edits on without writing code. CCDC also owns the appeals review step: every appeal draft routes through a CCDC advocate before the state sees it. That keeps the tool firmly inside the unauthorized-practice-of-law boundary and keeps disabled Coloradans hearing from a person they already trust.

What CCDC brings: institutional home, advocate review, 10 to 20 anonymized sample letters from the archive (under data terms CCDC sets) to train and verify the v0.1 classifier, and the ability to put this in members' hands.

Current status: pitch drafted ([`docs/pitch-ccdc.md`](docs/pitch-ccdc.md), [`docs/pitch-ccdc-email.md`](docs/pitch-ccdc-email.md)). The author is a CCDC member.

### Code for America: safety-net civic tech, methodology, reusability

CfA's Safety Net Innovation Lab and the GetCalFresh lineage have spent a decade learning what works when civic tech meets public benefits administration. CfA also already maintains [`work-requirements-self-advocacy-tool`](https://github.com/codeforamerica/work-requirements-self-advocacy-tool) (North Carolina, SNAP). The pattern overlap with this project is high; the lane is different (Medicaid, disability-rooted, privacy-local, advocate-in-the-loop). The cleanest outcome is shared infrastructure across states rather than parallel rebuilds.

What CfA brings: a decade of safety-net product methodology, brigade volunteers (Code for Denver / Code for Colorado if active), pointers to counterpart coalitions in other states, and a likely path to lifting the engine into other H.R. 1 states as their deadlines arrive.

Current status: pitch drafted ([`docs/pitch-cfa.md`](docs/pitch-cfa.md)). Not yet sent.

### Anthropic: responsible AI for the parts that need it

Most of v0.1 is rule-based, not AI. Letter classification, deadline extraction, and exemption matching run from the YAML rule library, deterministically, in the user's browser. That choice is deliberate: privacy by architecture beats privacy by policy when the threat model includes the state itself.

The later phases have parts where careful LLM use is the right answer:

- **Plain-language library** (v0.1 and ongoing). Producing 6th-grade-reading-level explanations of new letter types as HCPF introduces them. Author writes, Claude proposes, a CCDC advocate signs off. The artifact ships statically; the model is not in the user's runtime.
- **Appeal drafter** (v0.3, Q1 2027). Proposing a first draft from a structured interview, which a CCDC advocate edits before it reaches the state. The model never touches member data without advocate oversight.
- **Evaluation and red-teaming.** The classifier and the draft generator both need adversarial testing for the ways they fail on real disability casework. This is the exact methodology the existing CfA + Anthropic public-benefits collaboration already practices.

What Anthropic brings: model access for the advocate-side workflows above, the human-in-the-loop pattern the existing CfA partnership is built on, and amplification when the engine is ready to be lifted into other states.

Current status: pitch drafted ([`docs/pitch-anthropic.md`](docs/pitch-anthropic.md)). Direct outreach, in parallel with CfA.

## Non-negotiable constraints

These do not change regardless of who joins.

- **Privacy by architecture.** Everything runs in the user's browser. No server, no accounts, no telemetry. Documents never leave the device. Threat model: [`docs/privacy.md`](docs/privacy.md).
- **Accessibility is the floor, not a feature.** WCAG 2.2 AA, screen-reader-first, keyboard-only flows. English and Spanish from day one. Standard and testing approach: [`docs/accessibility.md`](docs/accessibility.md).
- **6th-grade plain language.** Enforced in CI before user-facing copy lands.
- **Advocate-in-the-loop for appeals.** The tool drafts; CCDC files. No direct-to-state path.
- **Open source.** License decision pending ([`LICENSE-DECISION.md`](LICENSE-DECISION.md)). Anyone can audit exactly what the tool does, including the partners listed above.

## What's already done

- Full scoping documentation: architecture, privacy threat model, accessibility standard, roadmap anchored to the Colorado timeline, glossary, Colorado rules reference.
- Prior-art survey across roughly 50 sources ([`research/prior-art.md`](research/prior-art.md)).
- Two partner pitches drafted (CCDC, CfA).
- Web-app shell scaffolded (Vite + React + TypeScript + React Aria Components, no analytics, no third-party scripts).
- Rule library seeded for Colorado: six letter types and eight exemption categories. All entries marked "verify with CCDC" until reviewed.
- Ten static HTML mockups exploring UI archetypes ([`docs/ui-brainstorm.md`](docs/ui-brainstorm.md)).

Full snapshot: [`PROJECT-STATUS.md`](PROJECT-STATUS.md).

## The ask

**For CCDC.** One hour with whoever leads appeals or advocacy work, plus ideally one front-line advocate. Agenda is the four questions in [`docs/pitch-ccdc.md`](docs/pitch-ccdc.md).

**For Code for America.** Thirty minutes to check pattern overlap with the existing `work-requirements-self-advocacy-tool`, surface any in-flight work on Medicaid administrative burden or H.R. 1 prep, and connect with counterpart coalitions in other states. Agenda: [`docs/pitch-cfa.md`](docs/pitch-cfa.md).

**For Anthropic.** Thirty to forty-five minutes on model access and methodology for the advocate-side LLM workflows (plain-language library, appeal drafter, evaluation), and how this coordinates with the existing CfA collaboration. Agenda: [`docs/pitch-anthropic.md`](docs/pitch-anthropic.md).

No funding ask from any of the three. The build is volunteer time.

## How to engage

- File an issue or open a discussion on this repository.
- Reach the author on [LinkedIn](https://www.linkedin.com/in/owenpkent).

## Who is building it

Owen Kent, a CCDC member and software engineer. Volunteer work. No funding ask, no revenue model.

## What's in this repository

```
.
|-- README.md                  this file (partner brief)
|-- PROJECT-STATUS.md          single-page snapshot of where the project stands
|-- CHANGELOG.md               what has changed and when
|-- CONTRIBUTING.md            how to get involved
|-- CODE_OF_CONDUCT.md         community standards
|-- SECURITY.md                how to report a security concern
|-- LICENSE                    legal terms (placeholder, see LICENSE-DECISION.md)
|-- LICENSE-DECISION.md        notes on choosing a license
|-- NOTICE                     third-party attributions
|-- docs/                      plain-language and technical documentation
|   |-- brainstorm.md          why this project exists
|   |-- spec-v0.1.md           what the first version does
|   |-- roadmap.md             dates and milestones, tied to the CO rollout
|   |-- architecture.md        how the tool is built
|   |-- privacy.md             what we do and don't collect, and why
|   |-- accessibility.md       accessibility standard and testing approach
|   |-- ui-brainstorm.md       ten HTML mockups exploring UI archetypes, with trade-offs
|   |-- mockups/               openable static HTML mockups (drop into a browser)
|   |-- glossary.md            plain definitions of SSDI, HCBS, CDASS, LTSS, PEAK, etc.
|   |-- colorado-rules.md      Colorado exemption categories, deadlines, and sources
|   |-- outreach.md            CCDC and Code for America contact plan
|   |-- pitch-ccdc.md          one-page pitch for CCDC leadership and advocacy staff
|   |-- pitch-ccdc-email.md    paste-able email versions of the CCDC pitch
|   |-- pitch-cfa.md           one-page pitch for Code for America
|   `-- pitch-anthropic.md     one-page pitch for Anthropic
|-- web/                       the web app itself
|-- rules/                     per-state rule libraries (plain text, reviewable)
|   `-- co/                    Colorado
|-- research/                  anonymized samples and prior-art notes (not published)
|-- scripts/                   helper scripts for maintainers
`-- .github/                   issue and pull request templates
```

## For developers

Architecture, privacy threat model, accessibility standard, roadmap, and contribution notes live in [`docs/`](docs/). Start with [`docs/architecture.md`](docs/architecture.md) and [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

To be decided. See [`LICENSE-DECISION.md`](LICENSE-DECISION.md).
