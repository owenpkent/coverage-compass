# Spec: v0.2 Reapplication (Exemption Packet and Renewal Pre-fill)

## One-line summary

Keep your Medicaid evidence in one place, then pre-fill this year's renewal, redetermination, exemption packet, and CDASS care-hours worksheet from what you filed last year. Review, correct what changed, and generate official PDFs. Nothing leaves your device.

## Why this phase

Reapplication is the heaviest practical lift for CCDC's constituency, and where procedural disenrollment usually happens. The forms are long (a renewal packet can run dozens of pages), they recur on a roughly annual cycle, and they re-ask the same facts every time. CDASS participants also maintain a care-hours worksheet (the IHSS Care Plan) that itemizes attendant-care minutes per task and is redone on reassessment. Most of this content does not change year to year, so re-entering it by hand is the burden the tool removes.

## Primary user

A disabled Coloradan (or a family member, attendant, or CCDC advocate acting on their behalf) facing an annual renewal or redetermination, or assembling an exemption packet.

## What it does

1. **Archive once.** Capture the person's evidence and answers into a local archive: identity, household, income sources and amounts, exemption category and evidence, renewal dates, and care-plan tasks and hours. The read side reuses the v0.1 OCR pipeline plus the CDASS Enroll extraction methodology.
2. **Carry forward.** On the next cycle, pre-fill the renewal, redetermination, exemption-packet cover form, and CDASS care-hours worksheet from the prior filing and the archive.
3. **Review and correct.** Show every captured value for verification. The person (and, where the flow requires it, a CCDC advocate) edits only what changed.
4. **Generate.** Produce official, still-editable PDFs with pdf-lib, never flattened, signatures never auto-filled. See [`form-fill-engine.md`](form-fill-engine.md).

## Inputs

- The local archive (built in this phase, persisted in IndexedDB).
- Last year's filed forms and supporting documents (PDF or photo), read in-browser.
- The Colorado rule library for the relevant forms and exemption categories.

## Outputs

- Pre-filled, reviewable Colorado renewal / redetermination / exemption-packet PDFs.
- A pre-filled CDASS care-hours worksheet (IHSS Care Plan) carried forward from the prior worksheet.
- A renewal calendar with deadline reminders (local only).

## Non-goals for v0.2

- Filing anything with the state. The person or a CCDC advocate files by hand.
- Drafting an appeal (that is v0.3).
- Auto-filling signatures, or asserting attestations the data does not unambiguously support.
- Server-side anything, accounts, or telemetry.
- Multi-state support (Colorado only; the engine is built to re-point later).

## Success criteria

- Someone who filed last year can produce this year's renewal as a review-and-correct step rather than a from-scratch re-entry.
- A CDASS participant can carry their care-hours worksheet forward and adjust only what changed.
- Generated PDFs are exact, still-editable copies of the official templates (page count and field count preserved).
- Zero network requests after initial load, verifiable in DevTools.

## Acceptance criteria

- [ ] Build the archive schema, starting from the CDASS Enroll field set and adding Medicaid data.
- [ ] Pre-fill a real Colorado renewal or redetermination form from the archive; output is an exact editable copy.
- [ ] Pre-fill the CDASS care-hours worksheet (IHSS Care Plan) from a prior worksheet.
- [ ] Carry-forward: a second-year run pre-fills from the first-year archive, with only changed fields needing edits.
- [ ] All review-and-generate flows pass axe-core and manual screen-reader testing.
- [ ] All copy at or below 6th grade Flesch-Kincaid (verified by tool).
- [ ] Spanish present and reviewed by a native speaker.
- [ ] A CCDC advocate validates an end-to-end packet for an SSDI recipient and an HCBS waiver recipient.

## Caseworker extension

The same pre-fill works when a CCDC advocate or a county eligibility worker prepares the forms with a member, from the member's archive, on the member's device, with no data leaving it. This is an extension of the same engine, not a separate build. See the caseworker-mode item in the [roadmap](roadmap.md) backlog.

## Dependencies

- The form-fill engine ported from CDASS Enroll ([`form-fill-engine.md`](form-fill-engine.md)), adding pdf-lib for writing.
- Real blank Colorado templates committed to the repo (never a filled copy or real data).
- The CO rule library populated for renewal, redetermination, and exemption forms.
- CCDC review of the pre-filled outputs and of any attestation gating.

## Constraint alignment

- **Privacy.** Everything runs in the browser; the archive lives in IndexedDB on the device. No server, no change to the threat model in [`privacy.md`](privacy.md).
- **Accessibility.** The review-and-generate UI meets the WCAG 2.2 AA floor like the rest of the app ([`accessibility.md`](accessibility.md)).
- **Advocate-in-the-loop.** The engine fills; the person or a CCDC advocate reviews before anything reaches the state. Signatures are by hand.
- **Plain language.** The surrounding copy follows the 6th-grade rule.
