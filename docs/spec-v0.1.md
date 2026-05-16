# Spec: v0.1 Notice Triage

## One-line summary

Drop a letter from PEAK or HCPF into the app. Get a plain-language summary, the deadline, what kind of letter it is, and what to do next. Nothing leaves your device.

## Primary user

A disabled Coloradan (or family member, attendant, or CCDC advocate acting on their behalf) who has just received a confusing PDF letter from Health First Colorado.

## User story

> I got a letter from Medicaid. I don't know what it means. I don't know if I have to do something. I don't know by when. I'm scared I'll lose coverage.

The user opens the app in a browser. They drag the PDF onto a drop zone, or take a photo of the letter on their phone. Within five seconds they see:

1. **What this letter is** (renewal request, denial, termination, rate change, exemption decision, redetermination, etc.).
2. **What it means in plain language** (6th grade reading level).
3. **The deadline**, large and prominent, with the date and number of days remaining.
4. **What happens if you do nothing**.
5. **What to do next**: one to three concrete actions, including "call CCDC" with the phone number when appropriate.

## Inputs

- A PDF file (drag-drop or file picker).
- A photo of a paper letter (single image, processed via in-browser OCR).
- Optional: the user can also paste raw text if they have it.

## Outputs

On screen:
- Letter type
- Plain-language summary
- Deadline (date and days remaining)
- "Do nothing" consequences
- Next actions

Downloadable (optional):
- A one-page PDF summary the user can save, print, or share with a family member.

## Non-goals for v0.1

- Filing anything with the state.
- Drafting an appeal (that's v0.3).
- Generating an exemption packet (that's v0.2).
- Storing the letter long-term (v0.1 is single-session; saved-letters feature comes later).
- Multi-state support (Colorado only).
- Account creation or sign-in (nope, ever).
- Server-side anything.

## Success criteria

- A CCDC advocate watching a non-technical disabled Coloradan use the app on a borrowed laptop can say: "yes, that's what the letter says, and that's the right next step."
- Time from drop to summary on a 2019 Chromebook with a typical 3-page PDF: under 10 seconds.
- Works fully offline after the first page load (PWA install).
- Zero network requests after initial load, verifiable in DevTools.

## Acceptance criteria

- [ ] Drop a sample renewal-request letter, get the correct type and deadline.
- [ ] Drop a sample procedural termination letter, get correct type and "call CCDC" next action.
- [ ] Drop a sample exemption-decision letter, get correct type.
- [ ] Photo upload on iOS Safari and Android Chrome works.
- [ ] All flows pass axe-core automated a11y checks.
- [ ] Manual test with NVDA, VoiceOver, and keyboard-only passes.
- [ ] All copy is at or below 6th grade Flesch-Kincaid (verified by tool).
- [ ] No network requests after initial app load (verified).
- [ ] Spanish translation present and reviewed by a native speaker.

## Out-of-scope edge cases (for v0.1)

- Encrypted PDFs (show error, suggest workaround).
- Handwritten letters (show error, suggest typing text).
- Multi-letter mail-merges (treat each page as separate; v0.2 will batch).
- Non-Colorado state Medicaid letters (show "we don't support this state yet").

## Dependencies

- Sample letters from CCDC for training the letter-type classifier (see `outreach.md`).
- The CO rule library (`rules/co/letter-types.yaml`) populated for the most common letter types.
- Plain-language explanation strings reviewed by a CCDC advocate.

## UI shape

Five static HTML archetypes for this flow live in [`mockups/`](mockups/) and are summarized in [`ui-brainstorm.md`](ui-brainstorm.md). No archetype is picked yet; the working recommendation is single-screen upload with a print-first one-pager result, pending the CCDC scoping conversation.
