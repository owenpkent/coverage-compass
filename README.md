# Coverage Compass *(working title)*

A free tool to help disabled Coloradans keep their Medicaid when Colorado's new work-reporting rules take effect in 2027. Built with and for the disability community, in partnership with [CCDC](https://ccdconline.org/).

**Status:** early scoping. Nothing is live yet. The first version is planned for August 2026, before the first letters go out from the state.

## Why this exists

Starting January 2027, Coloradans on Medicaid will have to either work 80 hours a month or prove they qualify for an exemption. Common exemptions include SSDI, HCBS waivers, LTSS, the Medicaid Buy-In program, and "medically frail" status.

Most CCDC members already qualify for an exemption. The danger isn't the rule itself. The danger is the paperwork. When Arkansas tried something similar in 2018, thousands of people lost coverage not because they failed the rule, but because they couldn't prove their exemption in time. The state didn't get the right paperwork by the right date. That's what this tool is built to prevent.

## What it does

One tool, two situations.

**Before things go wrong.** Read a letter from the state, explain what it means in plain language, show the deadline, and help you gather documents you already have (Social Security award letters, waiver paperwork, tax forms, diagnosis letters) into a single exemption packet ready to submit.

**After things go wrong.** If a denial, termination, or care reduction arrives, the tool helps draft an appeal letter. The draft goes to a CCDC advocate for review before it gets filed. It does not replace a CCDC advocate or an attorney.

## What you should know

- **Your information stays on your device.** Nothing you upload leaves your computer or phone. There is no account to create, no server storing your documents, no tracking.
- **It is free and will always be free.** No subscriptions, no ads, no upsells.
- **It is open source.** Anyone, including CCDC staff, can read exactly what the tool does.
- **It is built to be accessible.** Screen-reader-first. Keyboard friendly. Plain language at roughly a 6th-grade reading level. English and Spanish from day one.

## Who is building it

Owen Kent, a CCDC member and software engineer, with scoping help from CCDC's advocacy team. Volunteer work. No funding ask, no revenue model.

## Getting involved

This is being scoped now, and the people best placed to shape it are the people it's for. If you are:

- A CCDC member with experience navigating Medicaid renewals or appeals,
- A CCDC staff member or advocate,
- A disability rights professional or civic-tech volunteer (Code for America, a local brigade),
- Or someone who wants to help test for accessibility,

please reach out on [LinkedIn](https://www.linkedin.com/in/owenpkent) or open an issue or discussion on this repository.

## What's in this repository

```
.
|-- README.md                  this file
|-- PROJECT-STATUS.md          single-page snapshot of where the project stands
|-- CHANGELOG.md               what has changed and when
|-- CONTRIBUTING.md            how to get involved
|-- CODE_OF_CONDUCT.md         community standards
|-- SECURITY.md                how to report a security concern
|-- LICENSE                    legal terms (placeholder, see LICENSE-DECISION.md)
|-- LICENSE-DECISION.md        notes on choosing a license
|-- NOTICE                     third-party attributions
|-- docs/                      plain-language and technical documentation
|   |-- brainstorm.md          why this project exists
|   |-- spec-v0.1.md           what the first version does
|   |-- roadmap.md             dates and milestones, tied to the CO rollout
|   |-- architecture.md        how the tool is built
|   |-- privacy.md             what we do and don't collect, and why
|   |-- accessibility.md       accessibility standard and testing approach
|   |-- glossary.md            plain definitions of SSDI, HCBS, CDASS, LTSS, PEAK, etc.
|   |-- colorado-rules.md      Colorado exemption categories, deadlines, and sources
|   |-- outreach.md            CCDC and Code for America contact plan
|   |-- pitch-ccdc.md          one-page pitch for CCDC leadership and advocacy staff
|   |-- pitch-ccdc-email.md    paste-able email versions of the CCDC pitch
|   `-- pitch-cfa.md           one-page pitch for Code for America
|-- web/                       the web app itself
|-- rules/                     per-state rule libraries (plain text, reviewable)
|   `-- co/                    Colorado
|-- research/                  anonymized samples and prior-art notes (not published)
|-- scripts/                   helper scripts for maintainers
`-- .github/                   issue and pull request templates
```

## For developers

Architecture, privacy threat model, accessibility standard, roadmap, and contribution notes live in the [`docs/`](docs/) folder. Start with [`docs/architecture.md`](docs/architecture.md) and [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

To be decided. See [`LICENSE-DECISION.md`](LICENSE-DECISION.md).
