# Colorado rules reference

The authoritative source for everything the app says about Colorado Medicaid. Cite sources. Update when sources update. Treat this document as input to the rule YAML files in `rules/co/`.

**Status:** initial drafting. All facts here need verification by a CCDC advocate or attorney before they ship to users.

## Work-requirement rollout dates

| Date | Event |
|---|---|
| June 2026 | Final CMS guidance expected |
| August 2026 | HCPF begins sending notification letters to affected members |
| January 2027 | First impact wave: new applicants from this date and existing members with renewal dates in or after this date must comply |

Sources:
- HCPF Work Requirements FAQ: https://hcpf.colorado.gov/work-requirements-faqs
- HCPF Work Requirements Fact Sheet: https://hcpf.colorado.gov/sites/hcpf/files/Work_Requirements_Fact_Sheet.pdf
- Health First Colorado FAQ: https://www.healthfirstcolorado.com/frequently-asked-questions/medicaid-changes-2026-2027/

## Exemption categories

People in any one of these categories are exempt from the 80-hours/month work-reporting requirement.

| Category | Evidence the user typically has | Notes |
|---|---|---|
| SSDI recipient | SSA award letter (annual COLA letter works too) | Cleanest signal; high priority for v0.2 |
| HCBS waiver enrollee | Waiver enrollment letter from HCPF or case manager | Verify which waivers (EBD, SLS, CES, CIH, CMHS, BI, DD, CHCBS) |
| LTSS program participant | Service plan documentation | Overlaps with HCBS in practice |
| Buy-In Program for Working Adults With Disabilities | Buy-In enrollment letter | Specifically designed for working disabled people |
| Medically frail | Diagnosis letter from a licensed clinician; functional assessment | Definition: blind/disabled, SUD, disabling mental disorder, physical/IDD impairing ADLs, serious or complex medical condition |
| Caregiver | TBD by state implementation | Watch for HCPF guidance |
| Pregnancy / postpartum | Prenatal care documentation | Separately exempt category |
| Under 19 or over 64 | DOB documentation | Out of age range |

Sources:
- HCPF Work Requirements FAQ
- AAPD explainer: https://www.aapd.com/medicaid-work-requirements-explainer/
- CMS final guidance (pending June 2026)

## Appeal deadlines

To be verified with a CCDC advocate. Typical Medicaid appeal windows are 60 days from the notice date, but Colorado specifics need confirmation.

| Action | Deadline |
|---|---|
| Request a fair hearing after adverse action | TBD |
| Request continuation of benefits during appeal | TBD (usually within 10 days) |
| Submit additional evidence before hearing | TBD |

## Renewal cycle

- Most Medicaid members renew annually.
- Renewal date is anchored to the original enrollment month, not to the calendar year.
- Renewal letters typically arrive 60 to 90 days before the renewal date.

## Letter types we expect to see

To be expanded as we collect sample letters. This list seeds `rules/co/letter-types.yaml`.

- Renewal request (initial)
- Renewal request (reminder, before deadline)
- Procedural termination (failure to renew)
- Substantive denial (income or asset over limit)
- Termination (eligibility ended for stated reason)
- Rate change / cost change
- Exemption decision (granted or denied)
- Redetermination request (off-cycle)
- Work-requirement notification (new, August 2026 onward)
- Work-requirement non-compliance notice
- Fair hearing notice
- Service-plan change (HCBS)

## Things we don't know yet

- Exact format and language of the work-requirement notification letters (HCPF hasn't published samples).
- Whether HCBS exemption is automatic or requires member action.
- Whether the "medically frail" determination is automatic from existing diagnosis data or requires fresh documentation.
- Whether the Buy-In population has a separate notification flow.

These are open questions to settle with CCDC, the project's partner organization, as part of the rule-content review.
