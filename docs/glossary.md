# Glossary

For anyone (especially new contributors and CCDC advocates reviewing PRs) coming into this project cold.

## Programs and agencies

- **CMS**: Centers for Medicare and Medicaid Services. The federal agency that administers Medicaid.
- **CCDC**: Colorado Cross-Disability Coalition. Colorado's disability rights advocacy organization, run by and for disabled people. The primary partner for this project.
- **CfA**: Code for America. National civic tech nonprofit. Possible partner.
- **HCPF**: Colorado Department of Health Care Policy and Financing. The state Medicaid agency.
- **Health First Colorado**: the consumer-facing name for Colorado Medicaid.
- **PEAK**: Program Eligibility and Application Kit. The Colorado portal where members manage Medicaid, SNAP, TANF, etc.
- **BHASO**: Behavioral Health Administrative Service Organizations. Colorado's regional behavioral health contractors.
- **SSA**: Social Security Administration. Issues SSDI and SSI award letters that count as exemption evidence.

## Benefits and statuses

- **Medicaid**: federal-state health coverage for low-income people and people with disabilities.
- **SSDI**: Social Security Disability Insurance. Federal disability benefit based on prior work history. SSDI status is an automatic exemption from the work requirement.
- **SSI**: Supplemental Security Income. Federal needs-based benefit for disabled or elderly people with very low income. SSI is not the same as SSDI, but typically confers Medicaid eligibility separately.
- **HCBS**: Home and Community-Based Services. Medicaid services delivered in a person's home or community instead of an institution. HCBS waiver enrollment is an exemption from the work requirement.
- **LTSS**: Long-Term Services and Supports. Umbrella term covering HCBS waivers, nursing facilities, and related supports.
- **Buy-In**: Colorado's Buy-In Program for Working Adults With Disabilities. Allows working disabled people to "buy in" to Medicaid while earning above standard income limits. Buy-In enrollment is an exemption from the work requirement.
- **Medically frail**: a status defined by CMS that exempts a person from the work requirement. Includes blindness or disability, substance use disorder, disabling mental disorder, physical or intellectual or developmental disability impairing ADLs, or serious or complex medical condition.
- **ADL**: Activities of Daily Living. Bathing, dressing, eating, toileting, transferring, continence. Used in determining disability and LTSS eligibility.
- **IADL**: Instrumental Activities of Daily Living. Cooking, managing medication, transportation, finances, etc.

## Colorado HCBS waivers

Colorado runs multiple HCBS waivers for different populations:
- **EBD**: Elderly, Blind, and Disabled.
- **SLS**: Supported Living Services.
- **CES**: Children's Extensive Support.
- **CIH**: Children's Habilitation Residential Program.
- **CMHS**: Community Mental Health Supports.
- **BI**: Brain Injury.
- **DD**: Developmental Disabilities.
- **CHCBS**: Children's HCBS.

## Self-directed care

- **CDASS**: Consumer-Directed Attendant Support Services. Colorado's program for self-directed personal care. Members hire and manage their own attendants. CCDC publishes guidance on this.
- **IHSS**: In-Home Support Services. Similar concept, different rules. CO has it; CA has a much larger version with the same acronym.
- **Difficulty of Care**: IRS Notice 2014-7 tax exclusion for live-in caregivers under Medicaid waiver programs. CCDC publishes guidance on a recent change.
- **EVV**: Electronic Visit Verification. Federally-mandated time tracking for in-home Medicaid services. Controversial in the disability community for surveillance reasons.

## Process terms

- **Renewal / redetermination**: the periodic check (usually annual) where a Medicaid member must re-prove eligibility.
- **Procedural disenrollment**: losing coverage because of a paperwork failure (missed deadline, wrong address, missing doc), not because of substantive ineligibility. The primary risk this project addresses.
- **Unwinding**: the post-pandemic redetermination process (2023 to 2024) where states had to recheck eligibility for every Medicaid member after the continuous-enrollment requirement ended. Lots of people lost coverage procedurally during unwinding. Many lessons.
- **Work reporting requirement**: 80 hours per month of qualifying activity (work, school, community engagement, caregiving) that some Medicaid members must report. Exemptions apply. Rolls out in Colorado starting January 2027.
- **Appeal**: a formal challenge to a Medicaid decision. CCDC's flagship direct service is helping people file these.
- **Fair hearing**: the administrative hearing that follows an appeal.

## Tech terms

- **PWA**: Progressive Web App. A web app that can be installed to the home screen / desktop and work offline.
- **SRI**: Subresource Integrity. A browser feature that lets a page declare a hash of expected script contents; the browser refuses to run scripts that don't match.
- **UPL**: Unauthorized Practice of Law. The legal-ethics rule against non-lawyers giving legal advice. Constrains the appeals-drafting feature: the tool assists CCDC advocates, it doesn't give legal advice directly.
- **WCAG**: Web Content Accessibility Guidelines. The international web accessibility standard.

## Tax-return line items used for work reporting

When we add the tax-return parser in v0.2:
- **W-2**: employee wages.
- **1099-NEC**: independent contractor income.
- **Schedule C**: self-employment profit and loss.
- **Schedule SE**: self-employment tax (income).
- **Schedule 1**: additional income and adjustments.

CDASS attendant income for live-in caregivers may appear excluded under Difficulty of Care (Notice 2014-7); handle carefully.
