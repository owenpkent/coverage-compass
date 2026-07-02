# Research

Working notes, prior-art surveys, and anonymized sample letters.

## What's here

- [`state-data-access.md`](state-data-access.md): **complete (2026-07-02).** What access to Colorado Medicaid data actually exists: the live member-authorized Patient Access API (SAFHIR), the PEAK Pro / MA-site partner lane, the CBMS notice-template landscape (letters print their template IDs; the 63-template inventory is a requestable record), the legal posture, and the H.R.1 verification context. Feeds [`../docs/proposal-hcpf-data-access.md`](../docs/proposal-hcpf-data-access.md).
- [`prior-art.md`](prior-art.md): **complete (2026-05-11; MyFriendBen / PolicyEngine addendum added 2026-07-01).** Survey of existing tools and policy material across Code for America, NHeLP, Justice in Aging, NDRN and state P&As, AAPD, The Arc, KFF, Urban Institute, CBPP, Georgetown CCF, SHVS, Stanford Legal Design Lab, adjacent appeal-generator tools, and (section 2.10) MyFriendBen and PolicyEngine. Read this before scoping or build work.

## Planned

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
