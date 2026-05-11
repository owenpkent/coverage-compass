# Brainstorm: CCDC + Code for America tools for Medicaid access in Colorado

Date: 2026-05-11
Author: Owen Kent (CCDC member)

## Context

### The organizations
- **Colorado Cross-Disability Coalition (CCDC)**: Colorado's disability rights advocacy organization, run by and for people with disabilities. Direct services include individual advocacy, Medicaid appeals assistance, civil rights legal support, the Probate Power program, and the Unstoppable Together Corner to Corner Tour. Active policy work on Medicaid (Health First Colorado), CDASS (including the Difficulty of Care live-in caregiver tax change), BHASO contracts, and voter engagement.
- **Code for America**: civic tech nonprofit known for GetCalFresh, ClearMyRecord, GetCTC, and the Safety Net Innovation Lab. Track record of reducing administrative burden in safety-net programs.

### The policy moment (2026 to 2027)
Colorado is rolling out Medicaid work-reporting requirements under H.R. 1.
- **June 2026**: final CMS guidance expected.
- **August 2026**: notification letters begin going out to members who must comply.
- **January 2027**: first impact wave. New applicants from this date forward, and existing members whose renewal date falls in or after January 2027, must either report 80 hours/month of qualifying activity or document an exemption.

### Who is exempt
Per HCPF and AAPD's reading of the rule:
- People receiving SSDI
- People enrolled in HCBS waivers
- People in LTSS programs
- People in the Health First Colorado Buy-In Program for Working Adults With Disabilities
- People classified as "medically frail" (blind or disabled, substance use disorder, disabling mental disorder, physical/intellectual/developmental disability significantly impairing ADLs, or serious or complex medical condition)
- Caregivers (TBD, depending on state implementation)

### The real risk for CCDC's constituency
Most CCDC members will qualify for an exemption. The danger is **procedural disenrollment**: losing coverage because they failed to *prove* the exemption in time, not because they failed to meet a substantive requirement. This is the Arkansas 2018 pattern. The administrative burden is the policy lever.

## Problem framing

The bottleneck for disabled Coloradans is not "did you work 80 hours" but "can you assemble and submit the right packet of evidence proving you do not have to". And when something goes wrong anyway: "can you draft an appeal in time".

## Brainstormed ideas

Ordered roughly by impact and fit during initial brainstorm.

1. **Exemption documentation helper** (original idea, reframed). Local-first app that walks a user through which exemption applies, generates a tailored evidence packet from documents they already have (SSA award letter, waiver enrollment proof, prior tax returns showing self-employment or caregiver income, diagnosis letters), and for the minority who actually need to report work, pulls W-2 / 1099-NEC / Schedule C / Schedule SE data into the state's required format. Tracks attestation deadlines.
2. **Medicaid notice translator**. Drop a PDF from PEAK or HCPF into the app, get plain-language summary, action items, deadline, and "what happens if I ignore this" framing. Could run a small local LLM. Generalizes far beyond work requirements.
3. **Renewal prep companion**. Tracks renewal dates per household member, pre-stages documents, flags procedural-disenrollment risk factors (returned mail, address mismatch, missing income docs). Especially valuable for HCBS waiver recipients where a missed renewal can collapse a care plan that took years to build.
4. **CDASS / self-direction toolkit**. Local timesheet plus Difficulty-of-Care tax-exclusion helper for consumer-directed attendants. CCDC already publishes on this. Overlaps with #1 because attendant hours count for work reporting.
5. **Appeals drafting helper**. Takes the denial letter plus a short interview, produces a draft appeal for review by a CCDC advocate. Highest leverage on CCDC's existing flagship service. Needs CCDC attorney buy-in.
6. **HCBS waiver navigator**. Decision tree across CO's waivers (EBD, SLS, CES, CIH, CMHS, BI, DD, CHCBS) by age, diagnosis, and support needs. Currently scattered across HCPF PDFs.
7. **Procedural-disenrollment incident tracker**. Lightweight intake form for CCDC members to report when something goes wrong, feeding aggregate data into CCDC's policy advocacy. Local-first, opt-in anonymized share.

## Direction picked

**Focus: #1 Exemption documentation helper + #5 Appeals drafting helper.**

These two ideas share enough plumbing that they should be a single tool, not two:
- Same documents in (SSA award letter, waiver enrollment, denial notice, tax returns, ID)
- Same state-rule library in the middle (CO exemption categories, CO appeal procedures and deadlines, CO renewal calendar)
- Different prompts on the front
- Different templated PDF on the back

### Product framing: "Before / After"
- **Before things go wrong**: exemption packet for proactive use at application or renewal.
- **After things go wrong**: appeal draft when a denial, termination, or care reduction arrives.

Same user, same documents, different outputs.

## Form factor decision

**Recommendation: client-side web app (PWA), installable to desktop later.**

Why:
- Same "data never leaves your machine" property as native desktop (all processing client-side, no server storage).
- Distribution is a URL, not an installer.
- Screen-reader and keyboard accessibility testing is dramatically easier with web standards.
- Works on Chromebooks and library computers, which matters for reach into CCDC's constituency.
- Can be wrapped in Tauri later for a fully-offline kiosk version if a CCDC advocate prefers that.

Tradeoff to name openly: a hosted web app can in principle ship malicious JS in a future release, whereas a downloaded desktop binary is frozen at install time. Mitigations: open source, Subresource Integrity, reproducible builds, signed releases, and being upfront about the threat model. See `privacy.md`.

## Where to look next

- `spec-v0.1.md` for the MVP scope.
- `roadmap.md` for the dated sequence anchored to the CO rollout.
- `outreach.md` for the CCDC scoping plan.
