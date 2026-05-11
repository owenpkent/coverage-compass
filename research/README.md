# Research

Working notes, prior-art surveys, and anonymized sample letters.

## What goes here

- `prior-art.md`: survey of existing tools (CfA Safety Net Innovation Lab, NHeLP, Justice in Aging, NDRN, Stanford Legal Design Lab).
- `policy-notes.md`: notes from reading HCPF, CMS, and AAPD source material.
- `ccdc-conversations.md`: notes from CCDC scoping calls (anonymize specifics; keep takeaways).
- `samples/`: anonymized sample letters from CCDC. **Gitignored.** Bring fixtures used in tests into `web/src/__fixtures__/` after thorough anonymization review.

## What never goes here

- Any document that hasn't been anonymized.
- Anything with a real case number, name, address, phone number, or other PII.
- Anything CCDC has not authorized us to retain.

## Anonymization checklist

Before committing anything: redact (or remove entirely)

- Names (member, household, attendant, case worker)
- Case numbers, member IDs, SSN, Medicare ID
- Addresses (street, city zoom-in, ZIP)
- Phone numbers
- Specific dates of birth (year is usually fine; full DOB no)
- Provider names if uniquely identifying
- Specific dollar amounts that could re-identify (round, or remove)
- Diagnosis codes if unusual enough to identify

When in doubt, ask CCDC.
