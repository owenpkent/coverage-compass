# UI brainstorm

**Date:** 2026-05-16
**Status:** ten static HTML mockups in `docs/mockups/`. No decisions yet. Inputs for the CCDC scoping conversation.

## Why this exists

Before writing real components we needed to see the shape of the interaction. Static HTML is the cheapest way to put five takes of the same flow in front of a person and ask which one feels right. The mockups are throwaway. The accessibility constraints and trust posture they encode are not.

## What is in `docs/mockups/`

Two brainstorms, ten mockups, one shared stylesheet.

```
docs/mockups/
  index.html                      links the v0.1 notice-triage mockups
  appeals-index.html              links the v0.3 appeal-workflow mockups
  shared.css                      design tokens + appeals primitives

  # v0.1 notice triage
  01-single-screen.html           full-viewport drop zone, result in place
  02-linear-wizard.html           one question per step, three steps stacked
  03-conversational.html          short interview with large choice buttons
  04-two-pane.html                letter image left, plain-language right
  05-print-first.html             output rendered as an 8.5x11 printable sheet

  # v0.3 appeal workflow
  a01-progress-tracker.html       six linear stages stacked, save and come back
  a02-dashboard.html              "your case" cards, complete in any order
  a03-advocate-conversation.html  short guided chat, draft fills in alongside
  a04-two-pane.html               denial left, draft right that grows as you answer
  a05-document-first.html         draft is the UI, click yellow blanks to answer
```

## How to view them

Open `docs/mockups/index.html` (or `docs/mockups/appeals-index.html`) in any browser. The mockups are self-contained static HTML and need no build step.

For an honest read, also try:
- Tab through with the keyboard only.
- Switch the OS to dark mode and reload.
- Turn on "reduce motion" in the OS.
- Zoom to 200% in the browser.
- Run NVDA, VoiceOver, or TalkBack for a minute on each.

## Notice triage (v0.1)

Same letter, same plain-language output across all five mockups. The only thing that changes is the shape of the interaction.

| # | Archetype | Why it might fit | Main trade |
|---|---|---|---|
| 1 | Single screen drop target | Lowest cognitive load, one landmark for screen readers | Secondary inputs (camera, paste, language) are harder to surface |
| 2 | Linear wizard | Matches "one primary action per screen" literally, easy for SR | Can feel slow for repeat users like CCDC advocates |
| 3 | Conversational | Lowers fear, sets up v0.3 nicely | Live-region churn risky for screen readers, can feel patronizing |
| 4 | Two-pane (letter + translation) | Trust ("yes, that is what it says"), good for advocate-and-member pairs | Letter image itself is not accessible content, hard on small screens |
| 5 | Print-first one-pager | Matches paper-based mental model, large-print and sharing come for free | Less obviously app-like |

Working recommendation, not a decision: **#1 for the upload step, #5 for the result**. Upload needs to feel like one thing to do; result needs to feel like a document the user can save, print, or hand to a family member.

## Appeal workflow (v0.3)

Appeals are structurally different from triage. Triage is one sitting; appeals can take days. Triage explains; appeals build an artifact. The output is always a draft for a CCDC advocate, never a direct filing with the state. Two clocks run at once.

All five appeal mockups share:
1. **A persistent two-clock banner.** The continuation-of-benefits clock (typically 10 days) comes first because missing it means losing care during the appeal. The appeal-deadline clock (typically 60 days) comes second. Missing the first is the cliff; the second is the wall.
2. **A scenario.** Jane M. (HCBS waiver, SSDI) got a procedural termination dated 2026-05-15. Coverage ends 2026-06-30. Today is 2026-05-16.
3. **The advocate handoff.** Every mockup ends with the draft going to a CCDC advocate. None of them files anything with the state.

| # | Archetype | Why it might fit | Main trade |
|---|---|---|---|
| A1 | Progress tracker, linear stages | Legible, screen-reader-easy, builds on the v0.1 wizard | A six-step bar can feel like a tax form on the day someone got terminated |
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
- Trust posture in the footer: "nothing leaves your device", "no account, no tracking", "free forever".
- In appeals only: trust posture also names the advocate handoff explicitly ("goes to a CCDC advocate, never to the state").

## What was not decided

- Which triage archetype wins. The recommendation above is a hypothesis, not a pick. The CCDC scoping conversation is the right place to validate it.
- Which appeal archetype wins. Same.
- Whether the v0.1 triage flow and the v0.3 appeal flow share a single entry point or live at separate URLs.
- Whether the language toggle is in the header (current mockups) or as a first-run modal.
- Visual identity. Color, typography, and the CC mark are placeholders. None of this has been reviewed by a designer.

## What this brainstorm replaces and what it does not

- Replaces: any need to start coding React components without having seen the interaction shape on paper.
- Does not replace: a real conversation with CCDC members and advocates about which shape they would actually use. The mockups exist to make that conversation concrete, not to skip it.
