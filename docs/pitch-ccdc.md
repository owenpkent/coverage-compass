# A tool to help CCDC members keep their Medicaid

**For:** CCDC leadership and advocacy staff
**From:** Owen Kent, CCDC member and software engineer ([LinkedIn](https://www.linkedin.com/in/owenpkent))

## The problem

Starting August 2026, HCPF will send letters to Medicaid members about Colorado's new work-reporting rules. In January 2027, the first impact wave hits: new applicants and members up for renewal must show 80 hours per month of qualifying activity, or document an exemption.

Most CCDC members will qualify for an exemption (SSDI, HCBS, LTSS, Buy-In, or medically frail). But Arkansas in 2018 already showed the pattern: people lose coverage not because they fail the rule, but because they fail to *prove* the exemption in time. Procedural disenrollment is the policy lever, and the window to prepare CCDC members is short.

## The proposal

A free, open-source web app for disabled Coloradans and the CCDC advocates who serve them. One tool, two flows from the same engine.

- **Before things go wrong.** Read a letter from PEAK or HCPF, explain it in plain language, show the deadline, and assemble an exemption packet from documents the member already has (SSA award letter, waiver enrollment, tax returns, diagnosis letters).
- **After things go wrong.** Take a denial or termination letter, run a short interview, produce a draft appeal that routes to a CCDC advocate for review. Never direct-to-state. CCDC's attorneys stay in the loop.

## Why this design

- **Privacy by architecture.** Everything runs in the user's browser. No server, no accounts, no telemetry. Documents never leave the device. Open source and auditable by anyone, including CCDC.
- **Accessibility is the floor, not a feature.** WCAG 2.2 AA, screen-reader-first, plain language at 6th grade, keyboard-only flows. English and Spanish from day one.
- **CCDC owns the rules.** Colorado-specific exemption categories, deadlines, and letter patterns live in plain YAML files that an advocate or attorney can read and propose edits on. The app is a UI on top of CCDC's expertise.
- **UPL-safe.** Appeals output routes through CCDC, not the state. The tool extends advocate capacity; it doesn't replace counsel.

## Status

Repository is scaffolded with full documentation (architecture, privacy threat model, accessibility standard, roadmap, glossary, Colorado rules reference, outreach plan). A working web-app shell is in place (TypeScript, React Aria Components, accessible by default, plain CSS, no analytics). The rule library is seeded with the first six Colorado letter types and eight exemption categories. All deadlines and several exemption details are explicitly marked "verify with CCDC" until reviewed.

**Prior related work:** I previously built [reclaimhealth.ai](https://github.com/owenpkent/reclaimhealth.ai), a landing page for an AI-powered appeals concept aimed at private-insurance denials. This Medicaid project is its narrower, privacy-local, free, FOSS sibling. It is scoped specifically to disabled Coloradans on Health First Colorado, runs no AI in v0.1, and answers to CCDC, not investors.

## The ask

One hour. With whoever leads CCDC appeals or advocacy work, plus ideally one front-line advocate. To answer:

1. Is procedural disenrollment under work requirements the right focus, or is there a higher-priority pain point?
2. What is your actual bottleneck (intake volume, drafting time, evidence-gathering, deadline tracking)?
3. Would CCDC use this internally to extend advocate capacity, would members use it directly, or both?
4. Who at CCDC reviews and signs off on the Colorado rule library?

## What CCDC gets

- All the code, free, branding-neutral, hostable on a CCDC URL.
- 10 to 20 anonymized sample letters from CCDC's archive (under whatever data terms you set) bring the v0.1 classifier to working accuracy.
- Volunteer time, indefinitely.

No funding ask. No revenue model. No data leaves the user's device.

---

*Happy to send the full architecture, privacy, and accessibility docs in advance of any conversation, or to walk through them in the meeting.*
