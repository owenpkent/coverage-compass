# Document library (design, v0.2)

Status: **first entry live** (design written 2026-07-01; updated 2026-07-02). The write side is ported into `web/src/lib` per [`form-fill-engine.md`](form-fill-engine.md), and the library's first registry entry exists: `rules/co/forms/cdass-attendant-packet-2026.yaml` (status `draft`, exact-copy smoke test passing, carry-forward import working, awaiting CCDC advocate review). The "your own document" tier below remains design.

## The idea

Two tiers of fillable documents:

1. **Verified forms (the library).** Forms we know we can fill correctly, because each one has an exact, tested field map. A person picks the form, the engine pre-fills it from their local profile, they review and correct every value, and download an exact, still-editable copy of the official PDF.
2. **Your own document (best effort).** A person uploads any PDF. If it has fillable fields (an AcroForm), we list them, propose values from the profile where the mapping is unambiguous, and require the person to review every proposed value before anything is written. If it has no fillable fields, we say so plainly and point to the library or to print-and-fill guidance.

The library is the trust boundary. A form in the library carries a promise ("this fills correctly, an advocate reviewed the labels"); an uploaded document carries none, and the UI must keep that difference visible.

## Registry format

One YAML file per form under `rules/co/forms/`, advocate-editable like the rest of the rule library:

```yaml
id: cdass-care-hours-worksheet
title: { en: CDASS care-hours worksheet, es: Hoja de horas de cuidado CDASS }
source_url: https://hcpf.colorado.gov/...      # where the blank official PDF lives
revision: "2026-03"                             # the form revision this map was built against
sha256: "..."                                   # of the blank template we tested against
status: draft | verified | stale                # stale = a newer revision exists, map unverified
reviewed_by: ""                                 # CCDC advocate, once reviewed
fields:
  - pdf_field: "applicant_name_1"               # exact AcroForm field name
    profile: "person.legalName"                 # schema path in the capture profile
    transform: none | date-mmddyyyy | phone-digits | ...
attestations:
  - pdf_field: "certify_checkbox"
    gate: "profile.attestations.hoursCertified" # only checked when unambiguous; never inferred
signature_policy: never-fabricate               # constant; the engine refuses to draw signatures
```

## Invariants (inherited from the proven engine)

- Fill produces an **exact, still-editable copy**: the official template's AcroForm is preserved, never flattened.
- An **exact-copy smoke test** per library form reloads the output and asserts page and field counts match the blank template. A form without a passing smoke test cannot be `verified`.
- **Signatures are never fabricated.** Attestation checkboxes are gated on unambiguous profile data.
- A renamed or missing field on a new form revision degrades to a logged warning, not a crash, and flips the registry entry to `stale`.
- Everything runs on-device. Library templates are vendored same-origin; uploaded documents never leave the browser.

## Adding a form (the advocate loop)

1. Developer runs the field-dump script against the blank PDF (port of the CDASS Enroll approach) and drafts the YAML map.
2. Smoke test must pass locally and in CI.
3. A CCDC advocate reviews the human-readable side (title, field labels, which profile answers feed it) via a normal PR to `rules/co/forms/`.
4. Status moves to `verified` with the reviewer recorded.

## Candidate first forms

In the order they help CCDC's constituency (see PROJECT-STATUS open question 8):

1. Medicaid renewal / redetermination packet (the carry-forward pre-fill target).
2. Exemption-packet cover form (v0.2's centerpiece, once HCPF publishes it).
3. CDASS care-hours worksheet (map already proven in CDASS Enroll's sibling packet work).
4. IHSS care plan.

## Out of scope for v0.2

- Scanned/flat forms without an AcroForm (guidance only, no overlay-writing on images).
- Auto-submission anywhere. Output is always a downloaded PDF the person or their advocate files.
- Any server-side template store. The library ships with the app.
