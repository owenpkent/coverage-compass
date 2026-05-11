# State rule libraries

State-specific rules live here in YAML, separate from the web app.

## Why YAML

- A CCDC advocate (or attorney, or anyone non-technical) can read and propose edits via PR.
- Diff-friendly. A rule change shows up as a clear PR.
- No build dependency. The web app loads these at build time.

## Why separate from `web/`

- Forces a clear boundary between rules and presentation.
- Eventually, other state coalitions can adapt by adding their own `rules/<state>/` directory.
- Keeps the legal-review surface area small. Reviewers can audit `rules/co/` without reading React code.

## Files

```
co/
|-- letter-types.yaml    classification patterns + plain-language strings per letter type
|-- exemptions.yaml      exemption categories, required evidence, citations
`-- deadlines.yaml       appeal windows, renewal windows, redetermination windows
```

## Editing

Every change to a YAML file should:
- Cite a source (HCPF FAQ, CMS guidance, statute, regulation, CCDC attorney note).
- Be reviewed by a CCDC advocate or attorney before merge.
- Bump the rule library version in `version.yaml` (TBD).

## Schema

See `docs/colorado-rules.md` for the human-readable reference. The YAML schemas track that document.
