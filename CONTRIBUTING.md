# Contributing

This project is for disabled Coloradans and the advocates at [CCDC](https://ccdconline.org/). Contributions should serve that goal first.

## Who we want to hear from

- Disabled Coloradans with experience navigating Medicaid, appeals, work-requirement notifications, HCBS waivers, or the Buy-In program. Your lived experience is the single most valuable input to this project.
- CCDC staff, especially appeals and advocacy.
- Code for America volunteers.
- Developers experienced with accessibility (real accessibility, not "we passed Lighthouse").
- Plain-language writers.
- Spanish speakers (and eventually other-language speakers) for translation review.

## How to contribute non-code

- **Sample letters.** If you have a Medicaid notice you're willing to share (anonymized: blot out name, address, case number, anything identifying) we want it. It teaches the letter classifier and the plain-language strings.
- **Plain-language review.** If you read a draft summary and it's unclear, confusing, or condescending, tell us. Open an issue.
- **Accessibility review.** If you use a screen reader, voice control, switch access, eye tracking, or any assistive tech, please try the app and tell us what breaks.
- **Translation review.** Especially Spanish. The bar is "a native speaker reviewed this," not "we ran it through a translator."
- **Policy / legal review.** If you're a CCDC attorney or advocate and you see something in `docs/colorado-rules.md` or `rules/co/` that's wrong, file an issue (or a PR).

## How to contribute code

1. Read `docs/architecture.md`, `docs/privacy.md`, and `docs/accessibility.md`. These are non-negotiable constraints.
2. Open an issue before you write code, especially for anything that changes a privacy or accessibility property.
3. Run the test suite (`npm test` in `web/`). Includes axe-core a11y checks.
4. Run the linter (`npm run lint` in `web/`). Includes `eslint-plugin-jsx-a11y`.
5. Submit a PR. Keep PRs small.

## Rules of the road

- **No new dependencies without review.** A new npm package is a new trust boundary.
- **No network calls except where explicitly justified.** This is the privacy core.
- **No analytics, telemetry, or error reporting that leaves the device.** Ever.
- **No `eval` or dynamic code execution.**
- **Accessibility regressions block PRs.** Automated a11y tests must pass.
- **Plain language: 6th grade Flesch-Kincaid.** Verified by automated tool.
- **No em dashes in any written copy.** Use periods, colons, commas, or parentheses.

## Code of conduct

See [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) (Contributor Covenant 2.1, with a project-specific addendum about the disability community as priority audience).

## Reporting security issues

See [`SECURITY.md`](SECURITY.md). Do not open a public issue for security or privacy vulnerabilities.
