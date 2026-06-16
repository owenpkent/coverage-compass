# UI brainstorm

**Date:** 2026-05-20
**Status:** fourteen static HTML mockups in `docs/mockups/`, organized around the three Medicaid events the tool covers (reporting, reapplication, appeals) plus a shared notice-triage entry point. No decisions yet. Inputs for the design review with CCDC, the project's partner organization.

## Why this exists

Before writing real components we needed to see the shape of the interaction. Static HTML is the cheapest way to put several takes of the same flow in front of a person and ask which one feels right. The mockups are throwaway. The accessibility constraints and trust posture they encode are not.

## What is in `docs/mockups/`

Fourteen mockups across four sections, one shared stylesheet, one consolidated index, one appeals-only sub-index.

```
docs/mockups/
  index.html                       three-event overview (this is the landing page)
  appeals-index.html               appeals-only sub-index with the shared scenario
  shared.css                       design tokens + appeals primitives

  # Notice triage (entry point)
  01-single-screen.html            full-viewport drop zone, result in place
  02-linear-wizard.html            one question per step, three steps stacked
  03-conversational.html           short interview with large choice buttons
  04-two-pane.html                 letter image left, plain-language right
  05-print-first.html              output rendered as an 8.5x11 printable sheet

  # Event 1: reporting
  r01-monthly-checkin.html         one question, two big buttons, year-strip pip log
  r02-work-hours-log.html          weekly bars toward 80, proof pills

  # Event 2: reapplication (renewal / new application)
  n01-packet-builder.html          documents grouped by section, "have / need" status
  n02-deadline-anchor.html         renewal date as hero, steps scheduled backward

  # Event 3: appeals
  a01-progress-tracker.html        six linear stages stacked, save and come back
  a02-dashboard.html               "your case" cards, complete in any order
  a03-advocate-conversation.html   short guided chat, draft fills in alongside
  a04-two-pane.html                denial left, draft right that grows as you answer
  a05-document-first.html          draft is the UI, click yellow blanks to answer
```

## How to view them

Open `docs/mockups/index.html` in any browser. The mockups are self-contained static HTML and need no build step.

For an honest read, also try:
- Tab through with the keyboard only.
- Switch the OS to dark mode and reload.
- Turn on "reduce motion" in the OS.
- Zoom to 200% in the browser.
- Run NVDA, VoiceOver, or TalkBack for a minute on each.

## Notice triage (entry point)

A letter shows up from HCPF or PEAK. The user does not always know if it is a renewal, a termination, or something else. Same letter, same plain-language output across all five mockups. The only thing that changes is the shape of the interaction.

| # | Archetype | Why it might fit | Main trade |
|---|---|---|---|
| T1 | Single screen drop target | Lowest cognitive load, one landmark for screen readers | Secondary inputs (camera, paste, language) are harder to surface |
| T2 | Linear wizard | Matches "one primary action per screen" literally, easy for SR | Can feel slow for repeat users like CCDC advocates |
| T3 | Conversational | Lowers fear, sets up appeals nicely | Live-region churn risky for screen readers, can feel patronizing |
| T4 | Two-pane (letter + translation) | Trust ("yes, that is what it says"), good for advocate-and-member pairs | Letter image itself is not accessible content, hard on small screens |
| T5 | Print-first one-pager | Matches paper-based mental model, large-print and sharing come for free | Less obviously app-like |

Working recommendation, not a decision: **T1 for the upload step, T5 for the result**. Upload needs to feel like one thing to do; result needs to feel like a document the user can save, print, or hand to a family member.

## Event 1: reporting

Ongoing proof you still qualify. Two very different users hide inside this one event: the majority on an exemption (most CCDC members) who need to re-attest periodically, and the small minority who must work and need to show 80 hours a month. The two mockups split along that line rather than trying to be one UI for both.

| # | Archetype | Who it serves | Main trade |
|---|---|---|---|
| R1 | Monthly check-in | Exemption majority. One question, two big buttons. Year-strip shows months done. | Lowest possible friction. Risk: users tap "nothing changed" reflexively without thinking, undermining the value of the record |
| R2 | Work hours log | The work-hours minority. Weekly bars, running total toward 80, proof pills (pay stubs, photos) | Tangible progress and confidence as the month builds. Adds repeat-use complexity; requires local persistence to be real |

Working recommendation, not a decision: **ship both, route by exemption type detected during triage or signup.** The two populations have different anxieties (forgetting to check in vs. falling short of hours) and a unified UI would compromise both.

## Event 2: reapplication

Renewals (usually once a year) and new applications. The heaviest practical lift for CCDC's constituency, and where procedural disenrollment usually happens. The two takes split the same task by what they put at the center.

| # | Archetype | Why it might fit | Main trade |
|---|---|---|---|
| N1 | Packet builder | Documents organized by section ("identity", "why you qualify", "money", "address"), "need / have" status, overall progress bar | Concrete and motivating, mirrors the physical reality of gathering paper. Big screen surface; needs IndexedDB to be real |
| N2 | Deadline-anchored plan | The renewal date is the hero. Steps are scheduled backward from it with built-in buffer and per-step reminders | Calms time anxiety, good for people who plan around dates. Less useful if the user is already past key milestones |

Working recommendation, not a decision: **N1 (packet) for the doing, N2 (deadline plan) for the entry view.** Most sessions are "what do I still need to add"; the first session is "what is this going to take and when". Same data underneath.

## Event 3: appeals

Appeals are structurally different from the other events. A denial or termination came in; the clock is on. Triage is one sitting; appeals can take days. The output is always a draft for a CCDC advocate, never a direct filing with the state. Two clocks run at once.

All five appeal mockups share:
1. **A persistent two-clock banner.** The continuation-of-benefits clock (typically 10 days) comes first because missing it means losing care during the appeal. The appeal-deadline clock (typically 60 days) comes second. Missing the first is the cliff; the second is the wall.
2. **A scenario.** Jane M. (HCBS waiver, SSDI) got a procedural termination dated 2026-05-15. Coverage ends 2026-06-30. Today is 2026-05-16.
3. **The advocate handoff.** Every mockup ends with the draft going to a CCDC advocate. None of them files anything with the state.

| # | Archetype | Why it might fit | Main trade |
|---|---|---|---|
| A1 | Progress tracker, linear stages | Legible, screen-reader-easy, builds on the triage wizard | A six-step bar can feel like a tax form on the day someone got terminated |
| A2 | "Your case" dashboard | Matches multi-sitting reality, supports a family member helping | More design surface, requires IndexedDB persistence story |
| A3 | Writing to a CCDC advocate | Honest about who is filing, lowers anxiety | Chat patterns tricky for SR, advocate response time must be set honestly |
| A4 | Letter and draft, side by side | Tangible progress, good for advocate-and-member pairs | Hostile on small screens, live-updating draft is a SR live-region minefield |
| A5 | Document-first ("fill in the letter") | Removes abstraction, user sees what they are building | Inline editing is hard to do well accessibly, tempts users to skip the advocate review |

Working recommendation, not a decision: **A2 (dashboard) for the shell + A3 (advocate framing) for the interview itself**. The dashboard lets people leave and return; the advocate framing keeps expectations honest about who actually files.

## Cross-cutting commitments encoded in the mockups

These are project constraints, not per-mockup choices. They live in `shared.css` and in `docs/accessibility.md`:

- WCAG 2.2 AA minimum, AAA contrast on body text.
- Honors `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast`.
- Tap targets 48px minimum.
- Semantic HTML first, ARIA only where semantic HTML does not suffice.
- Visible high-contrast focus on every interactive element.
- English / Spanish language toggle present from day one.
- Trust posture in the footer: "nothing leaves your device" (or "saved on your device only" for ongoing flows), "no account, no tracking", "free forever".
- In appeals only: trust posture also names the advocate handoff explicitly ("goes to a CCDC advocate, never to the state").

## What was not decided

- Which archetype wins inside each event. The recommendations above are hypotheses, not picks. The design review with CCDC is the right place to validate them.
- Whether the four sections (triage, reporting, reapplication, appeals) share a single entry point or live at separate URLs.
- Whether the language toggle is in the header (current mockups) or as a first-run modal.
- Visual identity. Color, typography, and the CC mark are placeholders. None of this has been reviewed by a designer.
- How a user moves between events when more than one is active at the same time (for example: reporting is due this month AND a renewal letter just arrived). The current mockups each show one event; the real shell has to handle overlap.

## What this brainstorm replaces and what it does not

- Replaces: any need to start coding React components without having seen the interaction shape on paper.
- Does not replace: a real conversation with CCDC members and advocates about which shape they would actually use. The mockups exist to make that conversation concrete, not to skip it.
