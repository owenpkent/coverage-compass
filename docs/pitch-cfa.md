# A privacy-local tool for the 2027 Medicaid work-reporting wave

**For:** Code for America (Safety Net Innovation Lab, and the Colorado brigade if active)
**From:** Owen Kent, software engineer and CCDC member ([LinkedIn](https://www.linkedin.com/in/owenpkent))

## Why I'm writing

Colorado is the leading edge of the H.R. 1 work-reporting rollout. HCPF starts sending notification letters in August 2026 and the first renewal/new-application impact wave hits 2027-01-01. Roughly twenty states are expected to follow on similar timelines. Most affected people qualify for an exemption (SSDI, HCBS, LTSS, Buy-In, medically frail). The risk is procedural disenrollment from failing to *prove* the exemption in time. Arkansas 2018 already showed the pattern.

I'm building a free, open-source, privacy-local web tool with the [Colorado Cross-Disability Coalition](https://ccdconline.org/) as the first design partner. Before I commit serious volunteer time, I want to make sure I'm not duplicating CfA work and that what I build is shaped by what CfA has already learned.

## What the tool is

One app that organizes a member's Medicaid evidence (SSA award letter, waiver enrollment, tax returns, diagnosis letters) once and reuses it across three Medicaid events:

- **Reporting.** Ongoing proof of qualifying status. 80-hour-per-month attestation for the work-required minority; periodic exemption re-attestation for the majority on an exemption.
- **Reapplication.** Annual renewals and new applications. Where procedural disenrollment usually happens for this constituency.
- **Appeals.** Denial or termination letter in, structured interview, draft appeal out. Routed through a CCDC advocate for review. Never direct-to-state, never UPL-implicating.

Entry point is notice triage: drop a HCPF or PEAK letter, get a plain-language summary, the deadline, and a pointer to which flow applies.

State-specific exemption categories, deadlines, and letter patterns live in plain YAML so a non-engineer advocate can read and propose edits.

## Where it sits relative to CfA's existing work

I've read what's public from the Safety Net Innovation Lab and the GetCalFresh lineage and I'm trying to deliberately occupy a different lane, not compete with it.

- **Hosted service vs privacy-local.** GetCalFresh-style products are CfA-hosted and serve a population that benefits from a central operator. This tool is the inverse: 100% client-side, no server, no accounts, no telemetry, documents never leave the browser. The user is a disabled person whose threat model includes the agency itself and any future administration. Privacy is enforced by architecture, not policy.
- **Disability-coalition-rooted, not state-partnered.** The institutional home is a disability rights org, not a state Medicaid agency. The tool answers to CCDC's advocates, not to HCPF.
- **Exemption-proving, not enrollment-completing.** The closest analogue is unwinding-era notice translation and renewal-help work. This is narrower: it's about preserving coverage for people who *already qualify* under an exemption, against a paperwork failure mode.

The methodology (rule library as YAML, plain-language library reviewed by the partner org, no-server PWA, accessibility-first React Aria stack) is designed to be lifted into other states. If it works in Colorado in 2027 Q1, the same engine can be re-pointed at a different state's rule library with a coalition partner in that state.

## What I'm asking for

A short conversation. Thirty minutes is plenty. Specifically:

1. **What does CfA currently have in flight** on Medicaid administrative burden, H.R. 1 work-reporting prep, or procedural disenrollment? Anything I'd be duplicating?
2. **What from GetCalFresh, the Safety Net Innovation Lab, or unwinding-era work** is reusable here (rule schemas, plain-language libraries, notice classifiers, evaluation methodology)? I'd rather build on than reinvent.
3. **Pointers to other state coalitions** preparing for the same rollout. If a counterpart to CCDC in another state wants a head start on tooling, the cleanest outcome is shared infrastructure rather than parallel rebuilds.
4. **Brigade interest.** If Code for Denver or Code for Colorado is active, I'd like to know if there are local volunteers who'd want to co-build.
5. **An honest read on whether this should exist at all,** given what CfA already knows about what works in this space. I'd rather hear "GetCalFresh's approach already covers this, here's why" than spend nine months on the wrong thing.

## What CfA gets

- The code, open source, under a license chosen with CfA-style reuse in mind (Apache 2.0 or AGPLv3, decision pending).
- A worked example of a privacy-local PWA in the safety-net space, with the architecture, threat model, accessibility standard, and rule schema documented as separate files. Reusable independently of this app.
- A Colorado-specific rule library that another state coalition can fork as a starting template.
- Volunteer time. No funding ask, no revenue model, no data leaves the user's device.

## Status

Repository is scaffolded with full documentation (architecture, privacy threat model, accessibility standard, roadmap anchored to the CO timeline, Colorado rules reference, glossary, outreach plan, and a CCDC pitch already drafted). Working web-app shell is in place (Vite + React + TypeScript, React Aria Components, plain CSS, no analytics, no third-party scripts). Rule library is seeded with six Colorado letter types and eight exemption categories; details are explicitly marked "verify with CCDC" until CCDC reviews.

Prior related work: I previously built [reclaimhealth.ai](https://github.com/owenpkent/reclaimhealth.ai), a landing page exploring AI-assisted appeals for private-insurance denials. This Medicaid project is its narrower, privacy-local, free, FOSS sibling. It is scoped specifically to disabled Coloradans on Health First Colorado, runs no AI in v0.1, and answers to a disability coalition rather than to investors.

Repository: https://github.com/owenpkent/ccdc-medicaid-tool

---

*Happy to read prior CfA materials in advance, share full architecture and privacy docs, or just have a low-stakes call.*
