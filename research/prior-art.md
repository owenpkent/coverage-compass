# Prior-art survey

## 1. Scope and method

Research was conducted on 2026-05-11. The scope was prior art relevant to a privacy-local, open-source web app that (a) reads a Medicaid notice and assembles an exemption packet, and (b) drafts an appeal of a denial / termination / care-reduction for review by a CCDC advocate. "Relevant" meant: it overlaps with at least one of those two flows, or with a load-bearing design choice (client-side processing, plain-language notice rewriting, rule libraries advocates can edit, screen-reader-first accessibility). Search was conducted via web search and web fetch across Code for America, NHeLP, Justice in Aging, NDRN and state P&As, AAPD, The Arc, KFF / Urban / CBPP / Georgetown CCF, SHVS, Stanford Legal Design Lab, plus broad searches for client-side OCR, appeal-letter generators, and state-coalition tools. Where a page was bot-blocked or paywalled, that is noted inline. Out of scope: general SNAP-eligibility calculators that do not touch work-requirement reporting; commercial health-insurance appeal tools that target private payers rather than Medicaid; pre-OBBBA waiver-era materials except where they survive as reusable assets.

## 2. What exists

### 2.1 Code for America

The most important finding in the entire survey. CfA has an active, recently-pushed public repository called [`codeforamerica/work-requirements-self-advocacy-tool`](https://github.com/codeforamerica/work-requirements-self-advocacy-tool) (created 2025-10-30, last push 2026-05-11, Rails, MIT-adjacent "Other" license). Despite the generic name, inspection of the source (`config/locales/en.yml`, `app/views/`) shows it is:

- A consumer-facing guided interview, not a state-agency back-end. Branded for "GetBenefitsHelp" and built in partnership with Code the Dream and Meals for Families.
- **SNAP-focused, not Medicaid.** All copy refers to "SNAP work rules," "your SNAP agency," and "ABAWD" framing. Currently scoped to North Carolina (an `nc` views directory and ePASS NC integration).
- A flow that screens for exemptions (age, caring for someone, disability benefits including SSI/SSDI, pregnancy, school enrollment, training program, substance-use treatment, migrant farmworker status, tribal membership, "preventing work" hardships), then generates a downloadable PDF "form" the user submits to their SNAP caseworker.
- Bilingual English / Spanish (`en.yml`, `es.yml`, plus Devise locales).
- Hosted Rails on AWS, not client-side. Stores Personally Identifiable Information including the user's case number, the last four of their SSN, and email.
- Active development: open issues include things like "WRSAT-578: Update Work Rules Apply Met", "WRSAT-515: add character limits to prevent PDF generation", "WRSAT-566 Add zip code support".

This is the closest analogue to the "Before things go wrong" flow that exists today. It is not a Medicaid tool and it is not client-side, but it has the same shape: exemption screener -> PDF -> submit-to-agency.

Broader CfA context:

- The [Safety Net Innovation Lab](https://codeforamerica.org/programs/social-safety-net/) is a multi-year, $100M Audacious-Project-funded effort, primarily state-facing. Bot-protected when fetched directly; details corroborated by [StateScoop coverage](https://statescoop.com/state-ex-parte-medicaid-updates-hr1-technology/) and govtech writeups.
- In September 2025 CfA published a Work Requirements Implementation Toolkit for state agencies covering both SNAP and Medicaid. The launch announcement (`codeforamerica.org/news/code-for-america-launches-new-tools-to-protect-access-to-safety-net-benefits/`) is bot-blocked; coverage at [GovTech "New Code for America Tools Target SNAP and Medicaid Challenges"](https://www.govtech.com/civic/new-code-for-america-tools-target-snap-and-medicaid-challenges) summarizes it.
- The "human-centered SNAP work requirements screener" article and the SNAP service-blueprint post (also bot-blocked at the source) describe screening question sets that have been user-tested with SNAP clients and CBOs. These appear to be the conceptual foundation for the `work-requirements-self-advocacy-tool` repo.
- Other relevant CfA repos: [`safety-net-blueprint`](https://github.com/codeforamerica/safety-net-blueprint) (OpenAPI specifications for safety-net applications, JavaScript), [`sebt-self-service-portal`](https://github.com/codeforamerica/sebt-self-service-portal) (Summer EBT, C#, with a Colorado connector at [`sebt-self-service-portal-co-connector`](https://github.com/codeforamerica/sebt-self-service-portal-co-connector)), and the [`gcf-microsite`](https://github.com/codeforamerica/gcf-microsite) static site. The original GetCalFresh production application is not open source as a single repo; CfA's public footprint is the microsite, the `calfresh-conversion-experiment`, and adjacent infrastructure.
- CfA's policy lead has been on record arguing that states should improve existing systems rather than layer in new AI tools (Danny Mintz quoted in [StateScoop's ex-parte piece](https://statescoop.com/state-ex-parte-medicaid-updates-hr1-technology/)). That is relevant context for any pitch.

Direct relevance to this project: the CfA `work-requirements-self-advocacy-tool` is a direct overlap with our "before" flow and a partial overlap with our exemption-packet flow. It is a different program (SNAP vs Medicaid) in a different state (NC vs CO) with a different deployment posture (hosted vs client-side), but the screener content is reusable and the PDF-to-caseworker pattern is essentially what we want. **This is the single most important finding in this document.**

### 2.2 National Health Law Program (NHeLP)

NHeLP is publishing the most operationally specific advocate-facing material on H.R. 1 / OBBBA implementation. The hub page is [Timely Tips to Safeguard Medicaid](https://healthlaw.org/timely-tips-to-safeguard-medicaid/) and the [Medicaid Defense page](https://healthlaw.org/medicaid-defense/). Both are bot-blocked when fetched directly; content was confirmed by WebFetch via Claude and by KFF / SHVS cross-references. Specific resources:

- "A Technical Guide for States to Reduce Procedural Terminations from Medicaid's Work Reporting Requirements" (Machledt, November 2025 update). PDF at [healthlaw.org/wp-content/uploads/2025/12/Machledt_NHeLP_Medicaid-Work-Requirements_MitigatingHarm_112025_Updated.pdf](https://healthlaw.org/wp-content/uploads/2025/12/Machledt_NHeLP_Medicaid-Work-Requirements_MitigatingHarm_112025_Updated.pdf). Recommends adequate notice periods, accessible appeal mechanisms, human review of automated determinations, plain-language requirement explanations, and reasonable documentation standards. Useful as a feature-priority oracle.
- [Medicaid Work Requirements Due Process Q&A Series: Notice](https://healthlaw.org/resource/medicaid-work-requirements-due-process-qa-series-notice/) (Avery and DeBriere, January 2026). First in a series specifically on notice. Treats notice quality as central to mitigating coverage loss.
- [Advocates' Timeline for State Work Requirement Implementation](https://healthlaw.org/resource/advocates-timeline-for-state-work-requirement-implementation/). A 3-month-bucket roadmap of advocacy activities with hyperlinks to relevant resources. Useful for sequencing CCDC outreach.
- [Got Your (Work) Number: The Intersection of Medicaid Eligibility Data Sources and Work Requirements](https://healthlaw.org/resource/got-your-work-number-the-intersection-of-medicaid-eligibility-data-sources-and-work-requirements/). Important read on what state systems will and won't see automatically.

Direct relevance: NHeLP is the closest thing to the legal-substance backbone for the rules library. Their notice-quality and exemption-identification recommendations should map directly to YAML rule entries.

### 2.3 Justice in Aging

The flagship resource is [Mitigating the Harms of Medicaid Work Requirements for Older Adults: Tools for State Advocates](https://justiceinaging.org/mitigating-harms-medicaid-work-requirements-template-letter/), published 2026-02-04. The downloadable `.docx` template is a letter to a state Medicaid director, not a consumer-facing appeal letter, but its seven principles (categorical exclusions; medical frailty / family caregiver; self-declaration with ex-parte verification; presumption of continued eligibility; accessible appeals with continuation of benefits; plain-language multi-format notices; staffed hotline) are content we can lift into rule-library descriptions and into our own advocacy framing.

Older Justice in Aging LTSS materials (e.g. the 2015 [Advocates' Guide for Notices in Medicaid Managed LTSS](https://justiceinaging.org/wp-content/uploads/2015/05/RE_Advocates-Guide-for-Notices-in-Medicaid-Managed-LTSS.pdf)) cover state-fair-hearing procedure and continuation-of-benefits framing that is still operative under HR 1.

Direct relevance: the template letter is structural prior art for the "what advocates ask for" voice. It is not a consumer appeal letter. The principles in it are content we can ship inside the tool.

### 2.4 National Disability Rights Network (NDRN) and state P&As

NDRN's [Resources](https://www.ndrn.org/resources/) and [P&A Resources Guide](https://www.ndrn.org/resource/pa-resources-guide/) point to Communities of Practice including one on Medicaid, but the public-facing surface is thin. The substantive consumer-oriented appeal content lives at the state P&A level. Two readable examples:

- [Disability Rights North Carolina, How to Appeal a Denial of Medicaid Services](https://disabilityrightsnc.org/resources/how-to-appeal-denial-of-medicaid/). Plain-language consumer-facing walkthrough.
- [Disability Rights Florida, Advocacy 101: Challenging an Agency's Denial or Reduction of Your Medicaid Services](https://disabilityrightsflorida.org/disability-topics/disability_topic_info/advocacy_101_challenging_an_agencys_denial_or_reduction_of_your_medicaid_se). Florida-specific procedural detail.
- The [Florida Medicaid Appeals Toolkit, 2nd Edition, January 2024](https://floridahealthjustice.org/wp-content/uploads/2023/09/FL-Medicaid-Appeal-Toolkit-01.14.24.pdf) (Florida Health Justice Project, not P&A but adjacent) is a downloadable PDF that walks an enrollee through fair-hearing procedure. Closest existing analog to our "after" flow output, but it is a static document, not a generator.

Direct relevance: P&As have plain-language appeal walkthroughs, but they are pages, not generators. None of the ones I found assemble a draft from user input. Some of their language (especially DRNC's) is liftable as in-app explanatory content.

### 2.5 KFF, Urban Institute, CBPP, Georgetown CCF, SHVS

These are evidence sources, not tools. They are load-bearing for the framing of procedural disenrollment.

- KFF's [Medicaid Work Requirements in Arkansas: Experience and Perspectives of Enrollees](https://www.kff.org/medicaid/issue-brief/medicaid-work-requirements-in-arkansas-experience-and-perspectives-of-enrollees/) is the canonical evidence base. Specific findings: notices were "confusing and long," most participants "only skimmed through" them, calls and social-media outreach failed, and information about good-cause exceptions appeared only after coverage closure. About 17,000 people lost coverage by December 2018.
- KFF's [Disability and Technical Issues Were Key Barriers to Meeting Arkansas' Medicaid Work and Reporting Requirements in 2018](https://www.kff.org/medicaid/disability-and-technical-issues-were-key-barriers-to-meeting-arkansas-medicaid-work-and-reporting-requirements-in-2018/) reinforces that disability and online-portal friction were the dominant failure modes.
- Urban Institute coverage-loss modeling: [Assessing Potential Coverage Losses among Medicaid Expansion Enrollees under a Federal Medicaid Work Requirement](https://www.urban.org/research/publication/assessing-potential-coverage-losses-among-medicaid-expansion-enrollees-under) (March 2025) and [Expanding Federal Work Requirements for Medicaid Expansion Coverage to Age 64 Would Increase Coverage Losses](https://www.urban.org/research/publication/expanding-federal-work-requirements-medicaid-expansion-coverage-age-64-would) (April 2025). Headline: 4.6 to 5.2 million projected to lose coverage in 2026 under the 19 to 55 scope; over 9 in 10 expansion adults already meet work rules or would qualify for an exemption.
- CBPP: [A Guide to Reducing Coverage Losses Through Effective Implementation of Medicaid's New Work Requirement](https://www.cbpp.org/research/health/a-guide-to-reducing-coverage-losses-through-effective-implementation-of-medicaids), [States Need More Time to Prepare for Medicaid Work Requirement](https://www.cbpp.org/research/health/states-need-more-time-to-prepare-for-medicaid-work-requirement), [Coordinating Medicaid and SNAP Work Requirements to Streamline Determinations](https://www.cbpp.org/research/health/coordinating-medicaid-and-snap-work-requirements-to-streamline-determinations).
- Georgetown CCF: [H.R.1 Resource Hub](https://ccf.georgetown.edu/topic/hr1-resource-hub/). The most useful single post for our scoping is [What Do We Know So Far About State Materials and Consumer Outreach on Medicaid Work Reporting Requirements?](https://ccf.georgetown.edu/2026/05/07/what-do-we-know-so-far-about-state-materials-consumer-outreach-on-medicaid-work-reporting-requirements/) (2026-05-07): 29 states have an HR 1 webpage, 10 states have nothing, Colorado is called out specifically as keeping enrollee-facing material separate from stakeholder material. Nebraska's notice "reads at a college reading level," Montana sent notices to all enrollees rather than the targeted group. These are concrete failure modes our tool can speak directly to.
- SHVS: [Operationalizing the Medical Frailty Exemption: A Step-by-Step Implementation Toolkit for States](https://shvs.org/resource/operationalizing-the-medical-frailty-exemption-a-step-by-step-implementation-toolkit-for-states/) (November 2025). State-facing, but the ICD-10 / CPT code lists and the bridge between MMIS data and eligibility systems are highly informative for what evidence will actually be in claims data.
- Milbank Memorial Fund, [Lessons Learned from Arkansas' Experience with a Medicaid Work Requirement](https://www.milbank.org/2025/06/lessons-learned-from-arkansas-experience-with-a-medicaid-work-requirement/) (June 2025). Quotable.
- PMC peer-reviewed: [Consequences of Work Requirements in Arkansas: Two-Year Impacts on Coverage, Employment, and Affordability of Care](https://pmc.ncbi.nlm.nih.gov/articles/PMC7497731/) and [Work Requirements and Medicaid Disenrollment in Arkansas, Kentucky, Louisiana, and Texas, 2018](https://pmc.ncbi.nlm.nih.gov/articles/PMC7349442/).

Direct relevance: these are the citation set for any external pitch (CCDC, CfA, foundations). They also tell us where the danger zones are: notice reading level, online-only reporting, late delivery of good-cause information.

### 2.6 Stanford Legal Design Lab

Searched specifically for OCR-based notice translators. Found only adjacent work: [Plain Language and Legal Design](https://justiceinnovation.law.stanford.edu/plain-language-legal-design/), the [Legal Design Lab site](https://law.stanford.edu/legal-design-lab/) (bot-blocked at direct fetch), and a February 2025 webinar on AI for language access. The Lab's published portfolio (Learned Hands, Navocado, Virginia legal aid guides, court forms) does not appear to include an OCR notice-translator project for benefits letters. If the outreach plan's reference to "OCR-based notice-translator work" was based on training data, that lead does not appear to resolve to a specific shipped Stanford project. Worth confirming directly with the Lab. There is broad related research on AI for access to justice and plain-language design that could be cited methodologically.

Direct relevance: methodological prior art on plain-language legal design exists at LDL. A shippable OCR notice-translator from them does not.

### 2.7 State disability coalitions and disability advocacy orgs

- The Arc (national) has an advocacy toolkit on H.R. 1 oriented around Congressional outreach and state-chapter mobilization, anchored at [Medicaid and People With Disabilities](https://thearc.org/policy-advocacy/medicaid/). Chapter-level pages such as [The Arc Washington's HR1 explainer](https://arcwa.org/augustmedicaidupdates/) and [The Arc Alliance, Understanding HR 1](https://thearcalliance.org/understanding-hr1/) are plain-language consumer explainers.
- AAPD's [Medicaid Defense Hub](https://www.aapd.com/medicaid/) bundles plain-language explainers (notably [Explaining New Medicaid Work Requirements in Plain Language](https://www.aapd.com/work-requirements-plain-language/), February 2026) and a per-state advocacy guide. Plain-language version exists; the materials are English-only as best I can tell, web-only, and oriented to Congressional advocacy plus consumer awareness rather than letter generation.
- [Colorado Cross-Disability Coalition](https://ccdconline.org/) and its [Medicaid services page](https://www.ccdconline.org/medicaid/) describe CCDC's advocacy and legal program but do not appear to publish a tool. CCDC's role here is as institutional home and rule-library reviewer, not as a producer of competing software.
- Arkansas Disability Coalition's older materials are historical context, not active tooling.
- No state disability coalition I could find has published a consumer-facing work-requirements exemption tool or appeal generator as of 2026-05-11. The closest things are static "how to appeal" pages from state P&As (NC and FL, cited above).

Direct relevance: the disability-advocacy field has explainers and Congressional-action tools, not workflow software. There is space for a constituent-facing operational tool.

### 2.8 Adjacent tools worth knowing

- [GetCalFresh](https://www.getcalfresh.org/). CfA's flagship SNAP enrollment service. Hosted, not client-side, not open source as a single repo, but the design pattern (short questions, plain language, low reading level, simulate the agency's form) is the reference design for the entire space.
- [mRelief](https://www.new.mrelief.com/). Hosted SNAP screener with SMS support. Not Medicaid. Not open source.
- [Benefits Data Trust / Community Prism](https://digitalgovernmenthub.org/organization/benefits-data-trust/). BDT shut down in 2024. Community Prism was open source while it existed but is not actively maintained as a community project. Mostly historical context.
- [Suffolk LIT Lab's Document Assembly Line / docassemble](https://github.com/SuffolkLITLab/docassemble-AssemblyLine). Open-source guided-interview platform for legal forms. Built on docassemble (Python / YAML / Markdown). Has been used to make MassHealth forms user-friendly. Strong candidate for the "draft appeal" flow if we wanted a hosted server, but mismatched with our client-side constraint.
- [Fight Health Insurance](https://www.fighthealthinsurance.com/) and [Counterforce Health](https://www.counterforcehealth.org/). AI-powered consumer-facing appeal-letter generators for private health-insurance denials. Same shape as our "after" flow but for a different payer. Counterforce is grant-funded (NIH / Penn) and reports a 70% appeal-success rate. Not open source as a usable codebase as far as I could find. Worth a closer look as design and tone prior art.
- [reclaimhealth.ai](https://www.reclaimhealth.ai/) is the author's own prior work and is referenced separately in the outreach pitch. Mentioning here for completeness.

Direct relevance: the appeal-generator pattern is well-established in the private-insurance lane and not in the Medicaid lane. The legal-form-assembly pattern is well-established at LIT Lab and is server-side.

### 2.9 Colorado-specific state material

[HCPF's H.R. 1 Medicaid Work Requirements FAQ](https://hcpf.colorado.gov/work-requirements-faqs) and the [Understanding the Impact of H.R.1 page](https://hcpf.colorado.gov/impact) exist (direct fetch was bot-blocked; content confirmed via search summaries and Georgetown CCF's review). Colorado has a separate, simpler enrollee-facing page on healthfirstcolorado.com. HCPF is designing an MVP IT build for January 2027, with the APD (Advance Planning Document) submitted in October 2025 to secure a 90/10 federal match. This is state-side infrastructure; it does not assemble exemption packets or draft appeals for individuals.

Direct relevance: HCPF will produce the notices our tool needs to read. The PEAK portal is the channel where users will be expected to upload proof. Both are inputs to our tool, not competitors.

## 3. What's reusable

In approximate order of value:

1. **CfA `work-requirements-self-advocacy-tool` content** ([repo](https://github.com/codeforamerica/work-requirements-self-advocacy-tool)). The question set, the exemption taxonomy (age, caregiver, disability benefits, pregnancy, school, training, substance-use treatment, migrant farmworker, tribe, unemployment, "preventing work" hardships), the English / Spanish copy in `config/locales/en.yml` and `es.yml`, and the "you may not have to follow the rules" milestone screen pattern. License is "Other" (NOASSERTION) so attribution and license terms need to be checked, but the structure is directly liftable into our YAML rule schema. The repo also has accessibility-conscious copy (character counters, screen-reader-friendly form layout, plain-language helper text) we can study.
2. **NHeLP's "Technical Guide to Reduce Procedural Terminations"** (cited above). Use as the substantive backbone for the rules library. Each recommendation maps to a rule or a notice template.
3. **Justice in Aging's seven mitigation principles** (cited above). Use as the framing for the in-app "what should happen" explanation when a user encounters a notice. The principles double as a quality bar for our own UX.
4. **AAPD's [Explaining New Medicaid Work Requirements in Plain Language](https://www.aapd.com/work-requirements-plain-language/)**. The most carefully written plain-language Medicaid-specific consumer explainer of HR 1 we found. Cite it; consider mirroring with attribution.
5. **Georgetown CCF's state-material survey** ([post](https://ccf.georgetown.edu/2026/05/07/what-do-we-know-so-far-about-state-materials-consumer-outreach-on-medicaid-work-reporting-requirements/)). Use as a benchmark: our tool's reading level and notice quality should beat Nebraska's college-level notice and Montana's mis-targeted notice.
6. **SHVS medical-frailty toolkit** ([toolkit](https://shvs.org/resource/operationalizing-the-medical-frailty-exemption-a-step-by-step-implementation-toolkit-for-states/)). The ICD-10 and CPT cross-walk and the description of what claims data states will inspect tell us which paper proofs a user should attach to an exemption packet (HCBS waiver enrollment, SSDI/SSI award letter, specific clinical documentation).
7. **Florida Medicaid Appeals Toolkit, 2nd Edition** ([PDF](https://floridahealthjustice.org/wp-content/uploads/2023/09/FL-Medicaid-Appeal-Toolkit-01.14.24.pdf)). Reusable as structural prior art for the "after" flow output. Steal its section order, not its Florida specifics.
8. **DRNC's plain-language appeal walkthrough** ([page](https://disabilityrightsnc.org/resources/how-to-appeal-denial-of-medicaid/)). Tone reference.
9. **Tesseract.js / WebAssembly OCR pattern**. Not prior art in benefits, but a well-established browser-only OCR pattern (multiple [Tesseract.js guides](https://transloadit.com/devtips/integrating-ocr-in-the-browser-with-tesseract-js/)) that fits our client-side constraint. No Medicaid-specific notice classifier appears to be public.
10. **Suffolk LIT Lab's docassemble / AssemblyLine** ([repo](https://github.com/SuffolkLITLab/docassemble-AssemblyLine)). Not a direct lift (server-side, Python), but the YAML interview pattern and the document-assembly approach are conceptually parallel to our rules library. Worth a 30-minute read by whoever designs the YAML schema.

## 4. What's the gap

Roughly what no one else is doing, in order of clarity:

1. **A Medicaid-specific (not SNAP) consumer-facing exemption-packet assembler.** CfA's work-requirements tool is the closest, and it is SNAP-only, NC-only, and hosted. No one I can find has shipped the same flow for Medicaid in any state.
2. **A client-side, no-account, no-telemetry posture.** Every consumer-facing tool I evaluated (GetCalFresh, mRelief, CfA's work-requirements tool, Fight Health Insurance, Counterforce, Upsolve) is server-hosted and collects PII. A privacy-local posture is uniquely well-aligned to a disability-rights brand, where trust is the limiting factor and where users may not want anyone (even an aligned nonprofit) holding their documents.
3. **A draft-appeal flow that explicitly routes through an advocate review, not direct-to-state.** The private-payer appeal generators (Fight Health Insurance, Counterforce) route direct to the insurer. Legal-aid tools (Upsolve, docassemble interviews) typically self-file. The "advocate in the loop" posture is UPL-aware and avoids the failure mode where a confidently-wrong AI draft worsens a member's case. I did not find another tool with this design.
4. **A rules library readable by an advocate, not just a developer.** SHVS's clinical code lists, CBPP's recommendation guides, and NHeLP's technical guide are all prose. CfA's tool encodes rules in Rails models. A plain-YAML rules library that advocates can read and propose edits to, version-controlled under the institutional home's name, would be novel.
5. **State + disability specificity together.** Generic Medicaid work-requirements explainers (AAPD, The Arc, KFF, Urban) are nationwide. State-specific operational material (HCPF, healthfirstcolorado.com) is not disability-specific and is not aimed at constituents. A Colorado-and-disability-first product is open.
6. **English plus Spanish on day one, at a 6th-grade reading level, with WCAG 2.2 AA from the start.** CfA's tool is the only other one I found with English / Spanish parity. Nothing I found commits to 6th-grade plain language as a design constraint, and Nebraska's college-reading-level notice is a useful counterexample.

What is **not** a gap, and what we should not try to duplicate:

- State-agency implementation tooling. CfA and SHVS are doing it. They have funding and state relationships we do not.
- General-purpose plain-language legal-design research. Stanford LDL, Mass Legal Services, OpenAdvocate / WriteClearly, and others cover this lane.
- Coverage-loss modeling. KFF, Urban, RWJF, and Commonwealth Fund have it covered.
- A Medicaid screener that is not exemption-packet-and-appeal-focused. Eligibility screening is a different product. The gap is narrowly the "I have a letter, what do I do, what do I send back" loop.

## 5. Open questions

Numbered for a scoping call. Targets in parentheses indicate the org most likely to have the answer.

1. Has anyone inside CCDC, or at NHeLP / Justice in Aging, already heard about CfA's `work-requirements-self-advocacy-tool`? Is there a path to a conversation with the CfA team that built it, before we duplicate the screener content? (CCDC, CfA)
2. Is the CfA team planning a Medicaid version of that screener, or is the Medicaid-vs-SNAP split intentional and durable? (CfA Safety Net Innovation Lab)
3. Are there NHeLP-blessed sample appeal letters specifically for Medicaid work-requirement procedural disenrollment under HR 1, beyond the state-Medicaid-director template Justice in Aging published? (NHeLP)
4. Does Colorado HCPF have an enrollee-facing notice library that we can use as fixtures for the OCR / classifier? Is anything available under a license that allows us to redistribute redacted samples? (CCDC ask of HCPF)
5. Has anyone on the CCDC legal team taken a position on what an appeal-drafting tool would need to do (or not do) to stay clear of UPL concerns in Colorado, given that the output is routed to a CCDC advocate? (CCDC Legal)
6. Is there a Spanish-language plain-language Medicaid HR 1 explainer that is parallel to AAPD's English plain-language explainer? AAPD's appears to be English-only. If not, the Spanish version is greenfield. (AAPD, Familias en Acción, CCDC outreach)
7. The outreach plan references "Stanford Legal Design Lab OCR-based notice translator." I could not find a specific shipped Stanford project that matches. Is there one I missed, or was that conflated with the Lab's broader plain-language and AI-for-access-to-justice work? (Stanford LDL)
8. What is the actual reading level of HCPF's current PEAK denial notices? (CCDC has examples; cross-reference Nebraska, where Georgetown CCF measured "college reading level," and Montana's mis-targeting.)
9. Are Disability Rights Colorado (the state P&A, distinct from CCDC) and the Center for Health Progress doing parallel preparation? Do they have material we should align with? (CCDC ask)
10. Is there a license-compatibility check needed before reusing CfA `work-requirements-self-advocacy-tool` content? The repo lists license "Other" (NOASSERTION). (CfA / open-source counsel)

## 6. Sources

Each link below was either fetched or returned a 200 / 403 on verification. Items marked "bot-blocked" returned 403 to a curl HEAD request; content was confirmed via WebFetch or via cross-references from other sources.

### Code for America
- [codeforamerica/work-requirements-self-advocacy-tool](https://github.com/codeforamerica/work-requirements-self-advocacy-tool) - CfA's active SNAP work-requirements screener and PDF generator. Closest direct analogue. Verified via GitHub API; created 2025-10-30, last push 2026-05-11.
- [codeforamerica/safety-net-blueprint](https://github.com/codeforamerica/safety-net-blueprint) - OpenAPI specs for safety-net applications.
- [codeforamerica/sebt-self-service-portal](https://github.com/codeforamerica/sebt-self-service-portal) - Summer EBT self-service portal.
- [codeforamerica/gcf-microsite](https://github.com/codeforamerica/gcf-microsite) - GetCalFresh stories microsite.
- [Code for America Safety Net program page](https://codeforamerica.org/programs/social-safety-net/) - bot-blocked; content via WebFetch summaries.
- [GovTech, New Code for America Tools Target SNAP and Medicaid Challenges](https://www.govtech.com/civic/new-code-for-america-tools-target-snap-and-medicaid-challenges) - secondary source on the Sept 2025 toolkit launch.
- [StateScoop, States are racing to update their ex-parte Medicaid systems](https://statescoop.com/state-ex-parte-medicaid-updates-hr1-technology/) - secondary, includes Danny Mintz quote.
- [GetCalFresh](https://www.getcalfresh.org/) - design reference.

### National Health Law Program
- [Timely Tips to Safeguard Medicaid hub](https://healthlaw.org/timely-tips-to-safeguard-medicaid/) - bot-blocked at curl; readable via browser and WebFetch.
- [Technical Guide for States to Reduce Procedural Terminations, Nov 2025 update PDF](https://healthlaw.org/wp-content/uploads/2025/12/Machledt_NHeLP_Medicaid-Work-Requirements_MitigatingHarm_112025_Updated.pdf) - PDF fetched.
- [Medicaid Work Requirements Due Process Q&A Series: Notice, Jan 2026](https://healthlaw.org/resource/medicaid-work-requirements-due-process-qa-series-notice/) - bot-blocked at curl; content via WebFetch.
- [Advocates' Timeline for State Work Requirement Implementation](https://healthlaw.org/resource/advocates-timeline-for-state-work-requirement-implementation/).
- [Got Your (Work) Number](https://healthlaw.org/resource/got-your-work-number-the-intersection-of-medicaid-eligibility-data-sources-and-work-requirements/).

### Justice in Aging
- [Mitigating the Harms of Medicaid Work Requirements for Older Adults, template letter, Feb 4 2026](https://justiceinaging.org/mitigating-harms-medicaid-work-requirements-template-letter/) - verified, .docx download.
- [Advocates' Guide for Notices in Medicaid Managed LTSS, 2015 PDF](https://justiceinaging.org/wp-content/uploads/2015/05/RE_Advocates-Guide-for-Notices-in-Medicaid-Managed-LTSS.pdf) - historical procedure.

### Disability advocacy
- [American Association of People with Disabilities, Medicaid Defense Hub](https://www.aapd.com/medicaid/) - bot-blocked at curl; content via WebFetch.
- [AAPD, Explaining New Medicaid Work Requirements in Plain Language, Feb 26 2026](https://www.aapd.com/work-requirements-plain-language/) - bot-blocked at curl.
- [AAPD, New Medicaid Work Reporting Requirements and What They Mean for Disabled People](https://www.aapd.com/medicaid-work-requirements-explainer/) - bot-blocked at curl.
- [The Arc, Medicaid and People With Disabilities](https://thearc.org/policy-advocacy/medicaid/) - bot-blocked at curl.
- [The Arc Washington, HR1 Medicaid Cuts](https://arcwa.org/augustmedicaidupdates/).
- [The Arc Alliance, Understanding HR 1](https://thearcalliance.org/understanding-hr1/).
- [NDRN Resources](https://www.ndrn.org/resources/).
- [Colorado Cross-Disability Coalition](https://ccdconline.org/) and [CCDC Medicaid services](https://www.ccdconline.org/medicaid/).
- [Disability Rights North Carolina, How to Appeal a Denial of Medicaid Services](https://disabilityrightsnc.org/resources/how-to-appeal-denial-of-medicaid/).
- [Disability Rights Florida, Advocacy 101](https://disabilityrightsflorida.org/disability-topics/disability_topic_info/advocacy_101_challenging_an_agencys_denial_or_reduction_of_your_medicaid_se).
- [Florida Health Justice Project, Florida Medicaid Appeals Toolkit, 2nd Ed Jan 2024 PDF](https://floridahealthjustice.org/wp-content/uploads/2023/09/FL-Medicaid-Appeal-Toolkit-01.14.24.pdf).

### Research and policy
- [KFF, Medicaid Work Requirements in Arkansas: Experience and Perspectives of Enrollees](https://www.kff.org/medicaid/issue-brief/medicaid-work-requirements-in-arkansas-experience-and-perspectives-of-enrollees/) - canonical Arkansas evidence.
- [KFF, Disability and Technical Issues Were Key Barriers to Meeting Arkansas Medicaid Work and Reporting Requirements in 2018](https://www.kff.org/medicaid/disability-and-technical-issues-were-key-barriers-to-meeting-arkansas-medicaid-work-and-reporting-requirements-in-2018/).
- [Urban Institute, Assessing Potential Coverage Losses, March 2025 PDF](https://www.urban.org/sites/default/files/2025-03/Assessing-Potential-Coverage-Losses-among-Medicaid-Expansion-Adults-under-a-Federal-Medicaid-Work-Requirement.pdf).
- [Urban Institute, Expanding Federal Work Requirements to Age 64, April 2025 PDF](https://www.urban.org/sites/default/files/2025-04/Expanding%20Federal%20Work%20Requirements%20for%20Medicaid%20Expansion%20Coverage%20to%20Age%2064%20Would%20Increase%20Coverage%20Losses%5B61%5D.pdf).
- [CBPP, A Guide to Reducing Coverage Losses Through Effective Implementation of Medicaid's New Work Requirement](https://www.cbpp.org/research/health/a-guide-to-reducing-coverage-losses-through-effective-implementation-of-medicaids) - bot-blocked at curl.
- [CBPP, States Need More Time to Prepare for Medicaid Work Requirement](https://www.cbpp.org/research/health/states-need-more-time-to-prepare-for-medicaid-work-requirement) - bot-blocked at curl.
- [CBPP, Coordinating Medicaid and SNAP Work Requirements](https://www.cbpp.org/research/health/coordinating-medicaid-and-snap-work-requirements-to-streamline-determinations) - bot-blocked at curl.
- [Georgetown CCF, H.R.1 Resource Hub](https://ccf.georgetown.edu/topic/hr1-resource-hub/).
- [Georgetown CCF, State Materials and Consumer Outreach survey, May 7 2026](https://ccf.georgetown.edu/2026/05/07/what-do-we-know-so-far-about-state-materials-consumer-outreach-on-medicaid-work-reporting-requirements/).
- [Georgetown CCF, The New Medicaid Work Reporting Requirements Are Here, May 11 2026](https://ccf.georgetown.edu/2026/05/11/the-new-medicaid-work-reporting-requirements-are-here-dont-let-the-nebraska-soft-start-fool-you/).
- [SHVS, Operationalizing the Medical Frailty Exemption Toolkit, Nov 2025](https://shvs.org/resource/operationalizing-the-medical-frailty-exemption-a-step-by-step-implementation-toolkit-for-states/).
- [SHVS, State Considerations When Defining Medical Frailty, Oct 2025 PDF](https://shvs.org/wp-content/uploads/2025/10/SHVS_Work-Requirements-State-Considerations-When-Defining-Medical-Frailty_10.23.2025.pdf).
- [Milbank Memorial Fund, Lessons Learned from Arkansas, June 2025](https://www.milbank.org/2025/06/lessons-learned-from-arkansas-experience-with-a-medicaid-work-requirement/).
- [PMC, Consequences of Work Requirements in Arkansas: Two-Year Impacts](https://pmc.ncbi.nlm.nih.gov/articles/PMC7497731/).
- [PMC, Work Requirements and Medicaid Disenrollment in Arkansas, Kentucky, Louisiana, and Texas 2018](https://pmc.ncbi.nlm.nih.gov/articles/PMC7349442/).

### Colorado
- [HCPF, H.R. 1 Medicaid Work Requirements FAQ](https://hcpf.colorado.gov/work-requirements-faqs) - bot-blocked at curl; content via search and Georgetown CCF.
- [HCPF, Understanding the Impact of H.R.1](https://hcpf.colorado.gov/impact) - bot-blocked at curl.
- [HCPF, Work Requirements Fact Sheet, Oct 2025 PDF](https://hcpf.colorado.gov/sites/hcpf/files/Work%20Requirements%20Fact%20Sheet%20-%2010-1-2025.pdf).
- [Health First Colorado, Medicaid Changes 2026 to 2027 FAQ](https://www.healthfirstcolorado.com/frequently-asked-questions/medicaid-changes-2026-2027/).

### Design and tooling references
- [Stanford Legal Design Lab](https://law.stanford.edu/legal-design-lab/) - bot-blocked at curl.
- [Stanford Justice Innovation, Plain Language and Legal Design](https://justiceinnovation.law.stanford.edu/plain-language-legal-design/).
- [Suffolk LIT Lab, docassemble AssemblyLine](https://github.com/SuffolkLITLab/docassemble-AssemblyLine).
- [Suffolk LIT Lab, AssemblyLine site](https://assemblyline.suffolklitlab.org/).
- [Mass Legal Services, WriteClearly](https://www.masslegalservices.org/content/writeclearlyorg).
- [Transloadit, Integrating OCR in the Browser with Tesseract.js](https://transloadit.com/devtips/integrating-ocr-in-the-browser-with-tesseract-js/).

### Adjacent appeal-generator tools
- [Fight Health Insurance](https://www.fighthealthinsurance.com/).
- [Counterforce Health](https://www.counterforcehealth.org/).
- [Upsolve](https://upsolve.org/) (bankruptcy, design reference only).
- [mRelief](https://www.new.mrelief.com/).
- [Digital Government Hub, H.R. 1 Implementation topic](https://digitalgovernmenthub.org/topics/h-r-1-implementation/).
