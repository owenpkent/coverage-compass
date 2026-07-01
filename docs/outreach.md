# Outreach plan

The first hard problem isn't code. It's making sure this tool gets shaped by the people who need it. Concretely: CCDC staff and CCDC constituents.

## Phase 1: CCDC scoping (now to end of June 2026)

**Status: CCDC is confirmed as the partner organization and the scoping conversation has happened. This phase is now the working scope-and-handoff with CCDC, not a cold pitch. The live items below (the first anonymized sample letters, a named rule-library reviewer, the UPL read, user-testing permission) are the active deliverables.**

### Goal
Validate the three-event frame (reporting, reapplication, appeals) against the actual bottleneck CCDC's advocacy team experiences. Either confirm the v0.1 spec or pivot it.

### Asks
1. **One hour of conversation** with whoever leads CCDC's appeals / advocacy work, plus ideally one front-line advocate who handles intake.
2. **10 to 20 anonymized denial letters and appeals** from recent cases, under whatever NDA or data-handling terms they want.
3. **Permission to user-test** with one or two CCDC constituents who are willing.
4. **A named point of contact** for ongoing rule-library review (someone who will look at PRs that change `rules/co/`).
5. **Their read on UPL.** Specifically: is the appeals-drafting feature comfortable to them, given that CCDC has attorneys, if the output is explicitly routed to a CCDC advocate rather than direct-to-state?

### Questions to bring to the conversation
1. What's your biggest bottleneck in handling Medicaid appeals? Intake volume? Drafting time? Evidence gathering? Deadline tracking?
2. What's the single most-requested kind of help from your constituents in the past 6 months?
3. What proportion of disenrollments you see are procedural vs substantive?
4. Are you already tracking work-requirement preparation, or is that still in planning?
5. Who else (in the disability advocacy space, in CO state government, in CfA) should I be talking to?
6. What's your bar for trusting a tool like this to be useful (not harmful) to your constituents?
7. Would a CCDC advocate use this internally if it sped up appeal drafting, or is the goal to put it in constituents' hands directly?
8. What languages beyond English and Spanish should we plan for?
9. Are there CCDC publications (newsletter, podcast, member meetings) where we should plan to introduce the tool when it's ready?
10. Who at CCDC owns the relationship with HCPF? Would they want HCPF on the loop?

### Path in (done)
Owen is a CCDC member, and the member channel is how the partnership came together. The scoping conversation with appeals and advocacy staff has happened, and the relationship is now established. (Original path, kept for the record: email the general info contact mentioning membership, then raise it at a member meeting, then the Executive Director as a last resort.)

### Working brief

See [`pitch-ccdc.md`](pitch-ccdc.md), now a working brief for the partnership. It covers the problem (procedural disenrollment risk under work requirements), the tool (three-event framing: reporting, reapplication, appeals), the privacy posture, the live workstream (rule-content review, the first sample letters, a named reviewer), and the standing offer (free volunteer work, CCDC owns the direction). References [reclaimhealth.ai](https://github.com/owenpkent/reclaimhealth.ai) as prior work.

## Phase 2: Code for America outreach (pitch drafted 2026-05-11; sending TBD)

### Goal
Connect with whoever at CfA is working on Medicaid administrative burden, learn what already exists, find out if there's interest in collaboration or knowledge-sharing.

### Where to start
- **CfA Safety Net Innovation Lab.** The national team most likely to be working on this. Check their public output, then reach out.
- **Colorado brigade** (Code for Denver / Code for Colorado, if still active). Local volunteers and possible co-builders.
- **The CfA Summit / events.** If there's one between now and the build kicking off, attend.

### One-page pitch
Drafted: see [`pitch-cfa.md`](pitch-cfa.md).

### Questions to bring
1. Is the CfA team that built [`codeforamerica/work-requirements-self-advocacy-tool`](https://github.com/codeforamerica/work-requirements-self-advocacy-tool) (SNAP, NC, hosted) open to a conversation before we duplicate screener content for Medicaid in CO? See `research/prior-art.md` section 2.1. This is now the most important Phase 2 question.
2. Is the Medicaid-vs-SNAP split in that tool intentional and durable, or is a Medicaid version planned?
3. License clarification: the work-requirements-self-advocacy-tool repo lists license "Other" (NOASSERTION). What are the actual reuse terms?
4. Are there reusable components from GetCalFresh, the Safety Net Innovation Lab, or unwinding-era work that we should build on instead of reinventing?
5. Is there a state coalition or 501(c)(3) infrastructure CfA recommends for civic-tech tools that need an institutional home?
6. Who else is building in this space? NHeLP, Justice in Aging, NDRN, state-level coalitions in other states?

## Phase 3: Prior-art survey (completed 2026-05-11)

Output written to [`research/prior-art.md`](../research/prior-art.md). Covers Code for America, NHeLP, Justice in Aging, NDRN and state P&As, AAPD, The Arc, KFF / Urban / CBPP / Georgetown CCF, SHVS, Stanford Legal Design Lab, adjacent appeal-generator tools, and HCPF.

Headline findings:
- **Closest analogue:** CfA's `work-requirements-self-advocacy-tool` (SNAP, NC, hosted). Pattern overlap is high; talk to CfA before duplicating screener content. See Phase 2 questions above.
- **Substantive backbone for the rules library:** NHeLP's November 2025 "Technical Guide to Reduce Procedural Terminations."
- **Appeal-template starting point:** Justice in Aging's February 2026 template letter with seven mitigation principles.
- **Exemption-evidence reference:** SHVS medical-frailty toolkit with ICD-10 / CPT crosswalk.
- **Clearest gap:** No one has shipped a Medicaid-specific, client-side, advocate-in-the-loop tool with an advocate-readable rules library.
- **Correction to this plan:** the original Phase 3 list referenced "Stanford Legal Design Lab OCR-based notice translator." The survey could not find a specific shipped Stanford project matching that description. Confirm with the Lab directly or treat it as methodological prior art only.
- **Addendum (2026-07-01):** [MyFriendBen](https://www.myfriendben.org/), the Denver-born open-source benefits screener, added as `research/prior-art.md` section 2.10. Complementary lane (prospective "what could I get" screening, no notice / exemption / appeals functionality, no H.R.1 product as of 2026-07-01), but the strongest candidate upstream referral partner in Colorado: 211 Colorado integration, Denver Human Services partnership, HCPF and Colorado Digital Service relationships, ten-plus languages. Their rules engine, PolicyEngine, is separately encoding the H.R.1 Medicaid work-requirement rules with statutory citations, a candidate cross-check oracle for `rules/co/exemptions.yaml`. New open questions 11 to 14 in the survey cover whether CCDC should open a MyFriendBen conversation.

## Phase 4: Anthropic outreach (pitch drafted 2026-05-18; sending TBD)

### Goal
Open a direct conversation with Anthropic about model access and methodology for the advocate-side LLM workflows (plain-language library, appeal drafter, evaluation). The existing Code for America + Anthropic public-benefits collaboration is the natural institutional home for this work, but Phase 4 runs in parallel with Phase 2 rather than waiting on a CfA introduction, so the August 2026 ship target stays intact.

### Where to start
- Anthropic's public-facing partnerships / civic-impact contact is the primary channel.
- Mention the existing CfA collaboration as context. Offer to coordinate with whoever leads it on Anthropic's side at their discretion.

### One-page pitch
Drafted: see [`pitch-anthropic.md`](pitch-anthropic.md).

### Questions to bring
1. Does this fit inside the existing CfA collaboration, or should it be a separate Anthropic channel?
2. What's already in flight from the partnership on Medicaid work-requirements, procedural disenrollment, or H.R. 1 prep?
3. Model access terms for the advocate-side workflows: rate limits, data-handling terms, attribution requirements.
4. Evaluation and red-teaming methodology: what should we borrow from prior CfA work rather than reinvent?
5. Privacy-local architecture: any concerns with the "model never sees member data without advocate oversight" framing as the safety boundary?
6. Other state coalitions in the H.R. 1 pipeline. If Anthropic / CfA already knows which states are ready, that informs whether the engine should lift in Q2 2027 or later.
7. (Added 2026-07-01) Anthropic already funds an embedded Claude Corps fellow at MyFriendBen, the Denver benefits screener (see `research/prior-art.md` section 2.10). Does Anthropic see Coverage Compass as adjacent to that engagement, and is an introduction to MyFriendBen useful in either direction?

### Path in
Direct outreach, in parallel with Phase 2. Lead with the pitch as written. Reference the existing CfA partnership as context, not as a gate. If Phase 2 produces a warm intro on Anthropic's side first, take it.

## Contact log

Format: date, person/org, channel, status, notes.

| Date | Person / Org | Channel | Status | Notes |
|---|---|---|---|---|
| | | | | |
