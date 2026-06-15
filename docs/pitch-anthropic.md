# A privacy-local Medicaid tool, and where Claude fits inside it

**For:** Anthropic (the team coordinating the Code for America public-benefits collaboration)
**From:** Owen Kent, software engineer and CCDC member ([LinkedIn](https://www.linkedin.com/in/owenpkent))

## Why I'm writing

Colorado is the leading edge of the H.R. 1 Medicaid work-reporting rollout. HCPF starts mailing notification letters in August 2026 and the first impact wave hits 2027-01-01. Roughly twenty states follow on similar timelines. Most affected people already qualify for an exemption (SSDI, HCBS, LTSS, Buy-In, medically frail). The failure mode is procedural disenrollment: people lose coverage not because they fail the rule, but because they fail to *prove* the exemption in time. Arkansas 2018 already showed the pattern.

I'm building a free, open-source, privacy-local web tool with the [Colorado Cross-Disability Coalition](https://ccdconline.org/) as the first design partner. The Code for America pitch is already drafted (see [`pitch-cfa.md`](pitch-cfa.md)). The natural place for Anthropic to fit is inside the existing CfA + Anthropic public-benefits collaboration, on the parts of this tool where careful LLM use is the right answer.

## What the tool is, briefly

One app that organizes a member's Medicaid evidence (SSA award letter, waiver enrollment, tax returns, diagnosis letters) once and reuses it across three Medicaid events:

- **Reporting.** 80-hour-per-month attestation for the work-required minority; periodic exemption re-attestation for the majority on an exemption.
- **Reapplication.** Annual renewals and new applications. The heaviest practical lift for this constituency, and where procedural disenrollment usually happens.
- **Appeals.** Denial / termination / care-reduction letter in, structured interview, draft appeal out. Routed through a CCDC advocate before it reaches the state. Never direct-to-state. Never UPL-implicating.

Entry point is notice triage: drop a letter from HCPF or PEAK, get a plain-language summary, the deadline, and a pointer to which flow applies. CCDC owns the Colorado rules in a flat YAML library that advocates can read and edit without writing code.

Full v0.1 spec: [`spec-v0.1.md`](spec-v0.1.md). Architecture: [`architecture.md`](architecture.md). Privacy threat model: [`privacy.md`](privacy.md). Accessibility standard: [`accessibility.md`](accessibility.md).

## The privacy posture is load-bearing, and it shapes where Claude fits

Everything runs in the user's browser. No server, no accounts, no telemetry, no third-party scripts. Documents never leave the device. The threat model includes the state Medicaid agency and any future administration. That is deliberately stronger than a hosted service can offer, and it is the precondition for disabled members trusting the tool at all.

That choice rules one thing out and rules another in.

**Out of scope for v0.1:** putting Claude in the member's runtime to read their letters and documents. The minute the model sees member content, the privacy-local promise breaks. v0.1 stays deterministic: rule-based letter classification, deadline extraction, and exemption matching from the YAML library.

**In scope, and where Claude is a strong fit:**

1. **Plain-language library (ongoing).** Producing 6th-grade-reading-level explanations of new HCPF letter types as the state introduces them. Workflow: author writes a first pass, Claude proposes alternatives at the target reading level, a CCDC advocate signs off. The artifact ships statically in the rule library. The model is never in the user's runtime.

2. **Appeal drafter (v0.3, Q1 2027).** Proposing a first draft from a structured interview the member completes locally, which a CCDC advocate then edits before it reaches the state. The model never touches member data without advocate oversight, and the advocate is the legal and editorial filter. This is the workflow shape your existing CfA collaboration already centers on.

3. **Evaluation and red-teaming.** The notice classifier and the draft generator both need adversarial testing for the ways they fail on real disability casework (rare letter types, multi-exemption claims, edge cases in HCBS waiver coverage). This is the methodology Anthropic and CfA already practice together.

4. **Rule-library acceleration during development.** Helping turn NHeLP's Technical Guide, Justice in Aging's mitigation principles, and the SHVS medical-frailty toolkit into structured rule entries faster than I can hand-author them. CCDC reviews every entry before it ships.

## Where it sits relative to your existing CfA work

The CfA pitch ([`pitch-cfa.md`](pitch-cfa.md)) covers this in detail. Short version: this tool deliberately occupies a different lane from GetCalFresh and the existing [`work-requirements-self-advocacy-tool`](https://github.com/codeforamerica/work-requirements-self-advocacy-tool) (SNAP, NC, hosted). It is Medicaid-specific, disability-coalition-rooted, privacy-local, and advocate-in-the-loop for appeals. The engine is designed to be lifted into other states once a coalition partner is in place, which is where the multi-state amplification value sits.

## What I'm asking for

A short conversation. Thirty to forty-five minutes is plenty. Specifically:

1. **How should this coordinate with the existing CfA collaboration?** I'd like to align with whatever Medicaid or H.R. 1 work is already in flight on your side. Reaching out directly rather than waiting on a CfA introduction so the August 2026 ship target doesn't slip; happy to fold into the partnership at whatever point makes sense.
2. **Model access for the advocate-side workflows above.** Reasonable rate limits and reasonable terms. No member-data ingestion in v0.1; the workflows that touch member data (appeal drafting in v0.3) involve a CCDC advocate at the point of LLM use, not the member directly.
3. **Methodology pointers.** Whatever you can share from prior CfA work on evaluation, red-teaming, and the human-in-the-loop pattern that I should be borrowing rather than reinventing.
4. **An honest read on whether this should exist.** If your existing partnership already has Medicaid work-requirements coverage in flight, I'd rather hear "we have this covered, here is how to plug into it" than spend nine months on the wrong thing.
5. **Amplification when the engine is ready.** If v0.1 ships in Colorado and the engine can be re-pointed at another state's rule library, the coordinator who knows which state coalitions are ready is most likely to be on your side of the partnership.

## What Anthropic gets

- A worked example of a privacy-local PWA in the safety-net space, with the architecture, threat model, accessibility standard, and rule schema documented as separate files. Reusable independently of this tool.
- A concrete deployment of the careful, human-in-the-loop LLM pattern your CfA partnership is built on, in a domain (Medicaid + disability rights) where the stakes are high and the audience is sympathetic.
- A Colorado rule library that another state coalition can fork as a template once H.R. 1 reaches their deadlines.
- Volunteer time. No funding ask, no revenue model, no data leaves the user's device.

## Status

Repository is scaffolded with full documentation (architecture, privacy threat model, accessibility standard, roadmap anchored to the CO timeline, Colorado rules reference, glossary, outreach plan). CCDC and CfA pitches are drafted. Working web-app shell is in place (Vite + React + TypeScript + React Aria Components, no analytics, no third-party scripts). Rule library is seeded with six Colorado letter types and eight exemption categories; details are explicitly marked "verify with CCDC" until CCDC reviews.

Prior related work: I previously built [reclaimhealth.ai](https://github.com/owenpkent/reclaimhealth.ai), a landing page exploring AI-assisted appeals for private-insurance denials. This Medicaid project is its narrower, privacy-local, free, FOSS sibling, scoped specifically to disabled Coloradans on Health First Colorado, deterministic in v0.1, and answers to a disability coalition rather than to investors.

Repository: https://github.com/owenpkent/coverage-compass

---

*Happy to share full architecture, privacy, and accessibility docs in advance, or to have a low-stakes call.*
