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

## Phase 2: Code for America outreach (July 2026 onward)

### Goal
Connect with whoever at CfA is working on Medicaid administrative burden, learn what already exists, find out if there's interest in collaboration or knowledge-sharing.

### Where to start
- **CfA Safety Net Innovation Lab.** The national team most likely to be working on this. Check their public output, then reach out.
- **Colorado brigade** (Code for Denver / Code for Colorado, if still active). Local volunteers and possible co-builders.
- **The CfA Summit / events.** If there's one between now and the build kicking off, attend.

### Questions to bring
1. What does CfA currently have in flight on Medicaid administrative burden, work requirements, or procedural disenrollment?
2. Are there reusable components from GetCalFresh, the Safety Net Innovation Lab, or unwinding-era work that we should be building on instead of reinventing?
3. Is there a state coalition or 501(c)(3) infrastructure CfA recommends for civic-tech tools that need an institutional home?
4. Who else is building in this space? National Health Law Program (NHeLP), Justice in Aging, NDRN, state-level coalitions in other states?

## Phase 3: Prior-art survey (parallel with Phase 1)

Don't build what already exists. Spend a day on:
- Code for America blog, GitHub orgs, and Safety Net Innovation Lab output.
- NHeLP's Medicaid materials.
- Justice in Aging's appeal templates.
- NDRN.
- Other state disability coalitions' tools.
- Academic / KFF / Urban Institute writeups on Medicaid administrative burden.
- Existing OCR-based notice-translator tools (Stanford Legal Design Lab has done work in this space).

Output: a short writeup in `research/prior-art.md` listing what exists, what's reusable, and what the gap is.

## Contact log

Format: date, person/org, channel, status, notes.

| Date | Person / Org | Channel | Status | Notes |
|---|---|---|---|---|
| | | | | |
