# Form-fill engine (the write side)

Coverage Compass reads documents today: a person drops in a state letter and the
app classifies it, finds the deadline, and explains it. Two later phases need
the opposite, the write side, which is producing completed official PDFs from
the person's archive.

- **v0.2 Exemption Packet:** the "packet template generator (PDF output)" item
  on the [roadmap](roadmap.md).
- **Reapplication:** renewals and new applications are, mechanically, filling
  Colorado's Medicaid forms from the archive.

That write side is already built and proven in a sibling project, **CDASS
Enroll** (https://github.com/owenpkent/cdass-enroll), which fills the Colorado
CDASS/PPL attendant enrollment packet from documents the applicant already
holds. Its approach is written up in its
[white paper](https://github.com/owenpkent/cdass-enroll/blob/master/docs/whitepaper.md).
This document is the plan to lift that engine into Coverage Compass rather than
rebuild it.

## Pre-population: fill this year from last year

Reapplication is not only filling a blank form once. It is filling the *same*
form again every year with mostly the same facts. Colorado's renewal and
redetermination packets can run dozens of pages, and CDASS participants also
maintain a care-hours worksheet (the IHSS Care Plan) that itemizes
attendant-care minutes per task and is redone on reassessment. Most of that
content does not change year to year.

So the archive is durable, not single-session. Once a person's evidence and
answers are captured, the engine pre-fills next year's renewal and care-hours
worksheet from the prior filing, and the person (or a CCDC advocate) reviews and
corrects only what changed. An 80-page yearly form becomes a review-and-correct
step.

The same pre-fill extends to caseworkers: a CCDC advocate or county eligibility
worker can prepare the forms with a member from the member's archive, on the
member's device, with no data leaving it. This is an extension of the same
engine, not a separate build.

## What CDASS Enroll already provides

- A **schema** that is the single source of truth for every field; the input UI
  and the form mappings both derive from it. This is the same idea as the
  Coverage Compass personal archive.
- A **document extraction** layer: OCR with image enhancement, a digits-only
  pass for numbers, tolerant parsing, plausibility checks, and a user-guided
  crop, all behind a verify-everything review step.
- A **fill layer**: one flat mapping module per form (literal PDF field name to
  value), plus tolerant helpers so a missing or renamed field degrades to a
  logged warning rather than a crash.
- An **output discipline**: fill the real template's form fields with pdf-lib
  and never flatten, so the result is an exact, still-editable copy. Signatures
  are never auto-filled, and fact-asserting checkboxes are only checked when the
  data unambiguously supports them.
- A **regression test** that reloads the output and asserts the page count and
  field count match the blank template, proving it stayed an exact editable
  copy.

## The one technical addition

Coverage Compass reads PDFs with pdf.js. Filling PDFs needs a writer, so add
**pdf-lib** (pure client-side, same privacy posture). pdf.js stays for reading
incoming letters and supporting documents; pdf-lib does the form filling. The
two coexist in the browser with no server involved.

## Where each piece lands

| CDASS Enroll (vanilla JS) | Coverage Compass (TypeScript + React) |
| --- | --- |
| `src/schema.js` | `web/src/lib/profile/schema.ts` (the archive shape) |
| `src/fill/util.js` (tolerant pdf-lib helpers) | `web/src/lib/fill/util.ts` |
| `src/fill/<form>.js` (per-form mappings) | `web/src/lib/fill/forms/<form>.ts` |
| template load + fill + save (no flatten) | `web/src/lib/fill/fillForm.ts` |
| `src/extract/*` (OCR, parsing, verification) | extend `web/src/lib/ocr.ts`; add `web/src/lib/extract/*` |
| `localStorage` persistence | IndexedDB via `idb` (already the chosen store) |
| vanilla DOM review/generate UI | React + React Aria components |
| `tests/smoke.mjs` exact-copy guard | Vitest test asserting pages and fields preserved |

The fill layer ports almost verbatim, because it is pure functions over pdf-lib
with no UI coupling. Converting to TypeScript is mostly adding types. The schema
and the per-form mapping modules port directly; only the rendering and storage
shells differ.

## Step plan

1. Add `pdf-lib` to `web/package.json`. Lazy-import it, like pdf.js and
   tesseract.js, so it loads only when a form is generated.
2. Port the tolerant fill helpers to `web/src/lib/fill/util.ts`.
3. Define the archive schema in `web/src/lib/profile/schema.ts`, starting from
   the CDASS field set (identity, address, contact) and adding the Medicaid
   data: household members, income sources and amounts, exemption category and
   evidence, renewal dates.
4. Obtain the first real Colorado form (a Medicaid renewal or redetermination
   form, the exemption-packet cover form, or the CDASS care-hours worksheet,
   which is the IHSS Care Plan). Keep the blank template in the repo; never
   commit a filled copy or real data.
5. Dump its field names with pypdf and write the flat mapping in
   `web/src/lib/fill/forms/<form>.ts`. Gate any attestation checkbox on
   unambiguous data.
6. Implement `fillForm(templateBytes, profile, opts)` in
   `web/src/lib/fill/fillForm.ts`: load with pdf-lib, set fields, save without
   flattening, hand the bytes to a local download. Never auto-fill signatures.
7. Reuse the read side for capture. pdf.js and tesseract.js (already present)
   read award letters, waiver paperwork, and tax forms into the archive; port
   the CDASS parsing and verify-everything review approach.
8. Add a Vitest test that fills the real template and asserts the output keeps
   every page and every live form field (an exact, editable copy).
9. Build the review-and-generate UI as React and React Aria components, meeting
   the WCAG 2.2 AA floor: show every captured value for verification, then
   generate.
10. Persist the archive in IndexedDB and carry over the privacy hygiene
    (retention auto-clear, clear-after-generate).

## Reused vs new

- **Reused:** the schema-driven model, the fill layer and its exact-editable
  discipline, the conservative attestation rule, the OCR-plus-verification
  methodology, and the exact-copy regression test.
- **New for Coverage Compass:** the Medicaid-specific schema additions, the
  Colorado form mappings, tax-document reading (W-2, 1099-NEC, Schedule C,
  Schedule SE), and the exemption-packet cover-letter and labeled-exhibit
  assembly. (pdf-lib can also build a PDF from scratch, which is beyond the fill
  pattern.)
- **Not relevant here:** the driver's-license PDF417 barcode path. Medicaid
  packets do not need it, though the OCR methodology around it carries over.

## Constraint alignment

- **Privacy.** pdf-lib runs entirely in the browser. No server, no change to the
  threat model in [privacy.md](privacy.md).
- **Accessibility.** The engine is headless; the review and generate UI must meet
  WCAG 2.2 AA like the rest of the app.
- **Advocate-in-the-loop.** The engine fills and the person (and, where the flow
  requires it, a CCDC advocate) reviews before anything reaches the state.
  Signatures are by hand.
- **Plain language.** The engine produces no user-facing prose; the surrounding
  copy follows the 6th-grade rule.
