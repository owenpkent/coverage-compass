# Accessibility

## Why this is the first constraint, not a feature

The users are disabled. The advocacy organization is disability-led. If the app isn't accessible, it's hostile, and the project is dead before it starts. Everything below follows from that.

## Standard

**WCAG 2.2 AA** at minimum. Aim for AAA where it's not prohibitive.

## Concrete commitments

### Visual
- Color contrast: 7:1 for body text (AAA), 4.5:1 minimum elsewhere.
- Respect `prefers-reduced-motion`: no animations or transitions when set.
- Respect `prefers-color-scheme`: dark mode supported.
- Respect `prefers-contrast: more`: high-contrast variant supported.
- Text resizes cleanly up to 200% without breaking layout.
- No information conveyed by color alone.

### Keyboard
- Every interactive element reachable via Tab.
- Visible focus indicators that pass 3:1 contrast against background.
- Skip links to main content.
- No keyboard traps.
- Esc closes modals; Enter activates; Space toggles.
- Drag-and-drop file zone also accepts file picker via keyboard (Enter or Space).

### Screen reader
- Semantic HTML first. ARIA only where semantic HTML doesn't suffice.
- All form inputs have associated labels.
- Status changes announced via `aria-live`.
- Manually tested with NVDA on Windows, VoiceOver on macOS and iOS, TalkBack on Android.
- React Aria Components is the UI primitives layer because it ships these behaviors by default.

### Cognitive
- Plain language target: 6th grade Flesch-Kincaid, verified by automated tool in CI.
- One primary action per screen.
- No time pressure (timers, autoplay, auto-redirect).
- No CAPTCHA.
- Clear error messages with suggested fixes.
- Confirmation before destructive actions, with the ability to undo.

### Motor
- Click targets at least 44x44 CSS pixels.
- No precision-required gestures (no swipe-only or pinch-only).
- All drag-drop has a click/tap equivalent.
- Forms tolerate slow typing (no validation that races the user).

### Language
- English and Spanish in v0.1.
- All strings flow through i18n, no hardcoded English.
- Spanish translation reviewed by a native speaker (not by Google Translate alone).
- Reading-level check applies to both languages.

## Testing approach

### Automated
- `axe-core` runs in Vitest on every component.
- `eslint-plugin-jsx-a11y` runs on every commit.
- Lighthouse a11y score in CI, required > 95.
- Reading-level check in CI for all user-facing copy.

### Manual
- Every release tested with:
  - NVDA + Firefox on Windows
  - VoiceOver + Safari on macOS
  - VoiceOver + Safari on iOS
  - TalkBack + Chrome on Android
  - Keyboard-only on Firefox and Chrome
- Every release reviewed by a CCDC advocate (ideally a disabled tester).

## What we won't do

- Will not claim accessibility based only on automated tests passing. Automated tests catch ~30% of issues.
- Will not ship a "low-vision mode" or "screen reader mode" toggle. The base experience should work for everyone.
- Will not gate features behind sign-up walls that themselves create access barriers.
- Will not use overlays, accessibility widgets, or "accessibility AI" plugins. They make things worse.

## Open questions

- ASL video summaries for the most common letter types? Probably v0.2 or v0.3.
- Support for additional languages (Vietnamese, Somali, Amharic, Russian)? Depends on CCDC's read on community need.
- A printable / large-print mode of the summary output? Yes, plan for v0.1.
