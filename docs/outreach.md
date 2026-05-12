# Outreach plan

The first hard problem isn't code. It's making sure this tool gets shaped by the people who need it. Concretely: CCDC staff and CCDC constituents.

## Phase 1: CCDC scoping (now to end of June 2026)

### Goal
Validate the "Before / After" framing against the actual bottleneck CCDC's advocacy team experiences. Either confirm the v0.1 spec or pivot it.

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

### Path in
Owen is a CCDC member. The likely path is:
1. Email the general info contact at CCDC, mentioning membership and asking who handles tech / policy / advocacy partnerships.
2. If that doesn't get traction, ask at a member meeting or event.
3. Worst case: cold-email the Executive Director with a one-page pitch.

### One-page pitch

Drafted: see [`pitch-ccdc.md`](pitch-ccdc.md). Covers the problem (procedural disenrollment risk under work requirements), the tool ("Before / After" framing), the privacy posture, the ask (one-hour scoping conversation), and the offer (free volunteer work, CCDC owns the direction). References [reclaimhealth.ai](https://github.com/owenpkent/reclaimhealth.ai) as prior work to establish credibility.

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

## Contact log

Format: date, person/org, channel, status, notes.

| Date | Person / Org | Channel | Status | Notes |
|---|---|---|---|---|
| | | | | |
