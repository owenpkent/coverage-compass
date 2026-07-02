# Proposal: member-consented data access for Coverage Compass

**To:** Colorado Department of Health Care Policy and Financing (HCPF)
**From:** Coverage Compass, an open-source project built with the Colorado Cross-Disability Coalition (CCDC)
**Date:** 2026-07-02 (draft; to be carried by CCDC, which owns the HCPF relationship)
**Status: DRAFT.** Not sent. CCDC review required first; research backing every claim here is in [`research/state-data-access.md`](../research/state-data-access.md).

## One paragraph

Coverage Compass is a free, open-source web tool that helps disabled Coloradans understand Health First Colorado letters and act on them before deadlines, built with CCDC and demonstrable today at coverage-compass-6ky.pages.dev. Everything runs in the member's browser; we operate no server and never hold member data. We are asking HCPF for three things, in increasing order of ambition: (1) the notice-template information that lets the tool identify a member's letter exactly instead of guessing; (2) a working third-party registration path to the member-authorized Patient Access API that Health First Colorado already operates, so a member can choose to let the tool see their own eligibility status; and (3) consideration of PEAK Pro read-only access for CCDC advocates under the Community Based Organization user type that HCPF's own access form already defines. None of these asks involve bulk data, backend access, or the state handing anyone else's data to anyone.

## Why this serves HCPF

- **The clock is shared.** Work-requirement letters begin in August 2026 and enforcement starts January 1, 2027 under CMS-2454-IFC. HCPF's own CBMS MVP relies on member self-attestation with document scanning for everyone the ex parte data misses: gig workers, the self-employed, caregivers, volunteers. Members who understand their letters respond; members who do not become procedural churn that counties and the Department absorb.
- **The correspondence problem is documented.** The State Auditor's 2023 performance audit (2261P) found problems in 90% of reviewed letters and no comprehensive template inventory at the audit's start, with 400,000+ eligibility letters a month. Arkansas 2018 showed where confusion leads: 18,000 people lost coverage in seven months, most learning only at the pharmacy counter. A tool that turns a letter into "here is what this is, here is the deadline, here is what to send" is churn prevention at zero cost to the state.
- **Consent-based member tooling is the federal direction.** CMS itself is piloting Emmy ("Eligibility Made Easy"), an open-source consent-based verification prototype. This proposal asks Colorado for nothing more exotic than what CMS is already building and what Utah and Connecticut already do (both publicly register consumer apps against their Medicaid Patient Access APIs; Health First Colorado's own member page lists three).

## Who we are, and the privacy posture

Coverage Compass is Apache 2.0 open source, auditable line by line, with CCDC as the partner organization and advocate-in-the-loop. The architecture is the unusual part, and it is the reason this proposal is easy to say yes to: the tool has **no server and no accounts**. Letters are read on the member's own device; a strict Content-Security-Policy prevents the app from transmitting anything anywhere; nothing persists unless the member explicitly saves to their own device; and an automated test suite fails if any code path ever adds storage or network transmission. We are not asking HCPF to trust us with data. We are asking HCPF to let members use their existing rights with a tool that structurally cannot hoard what it reads.

## The asks

### Tier 1: identify the letter exactly (information only, no system access)

CBMS letters already print a template identifier on every page footer (for example `Med_MAGI_Redetermination_Notice12_EN`, visible in HCPF's published sample renewal packet) alongside a Correspondence ID. Our tool reads letters on-device and can read that identifier today. What we lack is the lookup table.

1. **Share the CBMS letter-template inventory**: the roughly 63 active Medicaid letter templates documented in OSA report 2261P, with template IDs and a one-line description of what each letter means and what it asks the member to do. This is a spreadsheet, not a system.
2. **Share specimen (sample/blank) copies** of the highest-volume member notices, as HCPF already publishes for the MAGI renewal packet, and of the H.R.1 notice set as it finalizes (the Worksheet J work-requirements form and the expansion-population notices reviewed in the February and April 2026 stakeholder meetings).
3. **Tell us when template IDs change.** A heads-up when templates are added or renumbered keeps the public explanation library accurate. The advocate-editable rule library that consumes this is public on GitHub, and HCPF is welcome to review or correct it at any time.
4. **A seat for CCDC in the Member Correspondence Improvements quarterly stakeholder process**, which SB 17-121 already directs HCPF to convene with advocacy input.

Tier 1 requires no policy change, no vendor work, and no member data. It makes every explanation the tool gives exact instead of inferred. If a friendly ask is not possible, we would pursue the inventory through CORA, but we would far rather receive it as partners.

### Tier 2: member-authorized status checks (existing rails)

Health First Colorado already operates the federally required Patient Access API (CMS-9115-F), hosted on Onyx's SAFHIR platform, with b.well, OneRecord, and Flexpa connected today and the Coverage resource live, which means a member can already authorize an app to see their own enrollment status. We ask HCPF to:

5. **Confirm the third-party registration path** for a nonprofit, open-source, member-directed app (the SAFHIR portal plus production tenant request), and **publish a developer page**. Today HCPF publishes none, and CMS's public endpoint directory still points to a retired Colorado endpoint that no longer resolves; both are small fixes that help every app, not just ours.
6. **Confirm whether public SMART clients are supported** (secretless browser apps using PKCE and CORS, exactly as the SMART App Launch specification sanctions). Our tool has no server by design; the SAFHIR documentation currently describes only confidential clients. If public clients are not supported, we would like to discuss what the minimal compliant path is.
7. **Tell us whether work-requirement compliance and exemption status will surface** through the Coverage resource (or the CMS-0057-F expansions due January 1, 2027). A member who can see "the state's records show you as exempt" before mailing anything is a member who does not flood county offices with unnecessary paperwork.
8. **Let us help fix the login funnel.** Industry measurement puts the Colorado connection's authorization completion around 11%. CCDC can arrange accessibility testing with disabled members at no cost to the state; a login most members cannot finish serves no one's compliance numbers.

Under the federal rule, registration may be denied only for a demonstrated security threat to the state's systems; we will gladly complete any security and privacy attestations requested, and our entire codebase is public for inspection.

### Tier 3: the advocate lane (CCDC's decision, listed for completeness)

9. HCPF's third-party access form already defines a **Community Based Organization PEAK Pro user type with a read-only option**. If CCDC chooses to pursue it, PEAK Pro read-only access for named CCDC advocates, scoped to members who designate CCDC in writing (consistent with the Authorized Representative framework in 10 CCR 2505-10 8.057), would let an advocate answer "what does my case actually say" during intake instead of waiting on hold. The Medical Assistance site certification ladder is the longer-run version. This tier belongs to CCDC institutionally and is separable from everything above.

## What we are not asking for

No bulk data. No backend or privileged system access for the app. No data use agreement that puts member data in our custody, because there is no custody: the tool cannot receive data server-side. No new rulemaking. Tier 1 alone is a complete, useful pilot.

## Risks, named honestly

- **After a member shares data with any app, HIPAA no longer applies to it** (HHS OCR guidance; Denver Health Medical Plan says this verbatim to its members). Our mitigation is architectural: the data never leaves the member's device, and our published Terms and Privacy Notice say plainly what we can and cannot guarantee.
- **OAuth consent phishing is a real attack class.** The mitigations are the ones HCPF already controls: registered apps, verified publisher identity, minimal scopes, and a state-published list of known apps, which is also what ask 5 provides.
- **Vendor churn is real** (Colorado has already migrated interoperability platforms once). We build against the standard (SMART on FHIR), not the vendor.

## Suggested next step

Thirty minutes with the HCPF owner of the Patient Access API contract and whoever owns member correspondence, arranged through CCDC. We will bring the working demo, the open rule library, and the specific technical questions above. If only one thing comes out of the meeting, let it be Tier 1, item 1: the template inventory that makes every letter explainable exactly.

## Contact

Routed through CCDC (the partner organization; 303-839-1775). Project: github.com/owenpkent/coverage-compass. Demo: coverage-compass-6ky.pages.dev.
