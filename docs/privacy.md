# Privacy and threat model

## Principle

User data never leaves the device. The browser tab is the trust boundary. Anyone who hosts this app must not be in a position to see user documents, period.

This is non-negotiable. The whole reason the tool can exist is that users trust it not to leak their SSA award letter, denial notice, or tax return. If that ever breaks, the tool is worse than nothing.

## What we collect

Nothing.

- No accounts, no sign-in, no identifiers.
- No analytics. Not Google Analytics, not Plausible, not Fathom, not server logs, nothing.
- No error reporting service. Not Sentry, not Bugsnag, not LogRocket.
- No A/B testing.
- No telemetry of any kind.
- No fonts loaded from a CDN (fonts are self-hosted with the bundle).
- No third-party scripts.

## What we store on the device

By default, nothing persists between sessions. The dropped PDF lives in browser memory while the tab is open and is discarded on close.

When v0.2 adds the renewal calendar, deadlines and user-entered notes are stored in IndexedDB on the user's device. This is local-only with no sync. The user can clear all stored data with one button in settings.

## Threat model

### In scope (must defend against)
- Network adversaries observing requests to/from the app: defended by making no network requests after the initial page load.
- The hosting provider (Netlify, GitHub Pages) trying to read user data: defended by never sending data to the host. The host serves static assets only.
- A future maintainer of the project shipping malicious JS in a release: partially defended by being open source, by Subresource Integrity on all assets, by reproducible builds, and by transparency about releases. Not perfectly defended (see "residual risk" below).
- Someone with brief physical access to the device after the user closes the tab: defended by not persisting anything by default.

### Out of scope (cannot defend against in v0.1)
- A user whose device is already compromised (keylogger, full-device malware).
- A user being shoulder-surfed.
- A subpoena or warrant served on the user directly.
- An adversary with persistent root on the user's machine.

### Residual risk (named openly)
A hosted web app's biggest privacy risk vs. a frozen native binary is that the host could in principle serve malicious JS in a future release. Mitigations:
- Open source on GitHub: anyone can audit the code.
- Subresource Integrity on every asset reference.
- Reproducible builds, with the build process documented in `docs/architecture.md`.
- Signed release tags.
- Optional desktop wrapper (Tauri) later, for users who prefer a frozen binary.

This is the honest tradeoff. We name it instead of hiding it.

## What we ask of contributors

- No new dependencies without a deps review (look at the package, its dependency tree, its maintenance status, its license).
- No code that makes network requests except where explicitly justified and documented.
- No code that writes to localStorage, sessionStorage, IndexedDB, or cookies without going through a single audited storage module.
- No `eval`, `Function()`, dynamic script tags, or other code-loading patterns.
- Lint rules will enforce as many of these as possible.

## What we tell users

A privacy summary visible from the landing page:
- "Your documents never leave this device. We don't have a server. We can't see what you upload."
- A link to this document for the full version.
- A link to the GitHub repo for anyone who wants to audit.
