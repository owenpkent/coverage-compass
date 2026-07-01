import { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Triage } from "./components/Triage";
import { LanguageToggle } from "./components/LanguageToggle";
import { ThemeToggle } from "./components/ThemeToggle";
import { ConsentGate } from "./components/ConsentGate";
import { LegalPage } from "./components/LegalPage";
import { FormFill } from "./components/FormFill";
import { TERMS, PRIVACY } from "./content/legal";
import { CCDC_PHONE } from "./lib/rules";

const REPO_URL = "https://github.com/owenpkent/coverage-compass";
const telHref = `tel:+1${CCDC_PHONE.replace(/\D/g, "")}`;

type View = "home" | "terms" | "privacy" | "fill";

function viewFromHash(): View {
  const h = (typeof window === "undefined" ? "" : window.location.hash).replace(/^#/, "");
  return h === "terms" || h === "privacy" || h === "fill" ? h : "home";
}

export function App() {
  const intl = useIntl();

  // Click-through release. Session-only React state on purpose: no cookie, no
  // localStorage, so the gate shows on every visit ("nothing persists by
  // default", docs/privacy.md). The header and footer stay visible so the
  // language toggle and the CCDC phone number work before acceptance.
  const [accepted, setAccepted] = useState(false);

  // Hash-based views so the Terms and Privacy pages are linkable and readable
  // BEFORE the release is accepted (people must be able to read what they are
  // agreeing to). "#main" (the skip link) and unknown hashes stay on home.
  const [view, setView] = useState<View>(viewFromHash);
  const mainRef = useRef<HTMLElement>(null);
  const skipInitialFocus = useRef(true);

  useEffect(() => {
    const onHash = () => setView(viewFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Move focus into main when the view changes or the release is accepted, so
  // keyboard and screen-reader users land on the new content (skip first render).
  useEffect(() => {
    if (skipInitialFocus.current) {
      skipInitialFocus.current = false;
      return;
    }
    mainRef.current?.focus();
  }, [view, accepted]);

  // The page title tracks the view (WCAG 2.4.2).
  useEffect(() => {
    const base = "Coverage Compass";
    document.title =
      view === "terms"
        ? `${intl.formatMessage({ id: "footer.termsLink" })} - ${base}`
        : view === "privacy"
          ? `${intl.formatMessage({ id: "footer.privacyLink" })} - ${base}`
          : view === "fill"
            ? `${intl.formatMessage({ id: "fill.title" })} - ${base}`
            : base;
  }, [view, intl]);

  return (
    <>
      <a href="#main" className="skip-link">
        <FormattedMessage id="nav.skip" />
      </a>
      <header className="site-header">
        <div className="container header-row">
          <div>
            <p className="brand">
              Coverage Compass{" "}
              <span className="demo-badge">
                <FormattedMessage id="app.demoBadge" />
              </span>
            </p>
            <p className="tagline">
              <FormattedMessage id="app.tagline" />
            </p>
          </div>
          <div className="header-controls">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main id="main" className="container" tabIndex={-1} ref={mainRef}>
        {view === "terms" ? (
          <LegalPage doc={TERMS} />
        ) : view === "privacy" ? (
          <LegalPage doc={PRIVACY} />
        ) : !accepted ? (
          // The gate covers every view that touches personal documents or data:
          // the triage home AND the form filler. Only the legal pages above are
          // readable without accepting.
          <ConsentGate onAccept={() => setAccepted(true)} />
        ) : view === "fill" ? (
          <FormFill />
        ) : (
          <>
            <section aria-labelledby="hero-title" className="hero">
              <h1 id="hero-title">
                <FormattedMessage id="hero.title" />
              </h1>
              <p>
                <FormattedMessage id="hero.body" />
              </p>
              <p className="privacy-note">
                <strong>
                  <FormattedMessage id="hero.privacy" />
                </strong>
              </p>
            </section>

            <section aria-label={intl.formatMessage({ id: "triage.region" })}>
              <Triage />
            </section>

            <section aria-labelledby="how-title" className="how">
              <h2 id="how-title">
                <FormattedMessage id="how.title" />
              </h2>
              <ol>
                <li>
                  <FormattedMessage id="how.step1" />
                </li>
                <li>
                  <FormattedMessage id="how.step2" />
                </li>
                <li>
                  <FormattedMessage id="how.step3" />
                </li>
              </ol>
            </section>

            <section aria-labelledby="fill-teaser-title" className="how">
              <h2 id="fill-teaser-title">
                <FormattedMessage id="fillTeaser.title" />
              </h2>
              <p>
                <FormattedMessage id="fillTeaser.body" />
              </p>
              <p>
                <a href="#fill">
                  <FormattedMessage id="fillTeaser.link" />
                </a>
              </p>
            </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            <FormattedMessage id="footer.builtWith" />
          </p>
          <p>
            <FormattedMessage
              id="footer.help"
              values={{ phone: <a href={telHref}>{CCDC_PHONE}</a> }}
            />
          </p>
          <p className="footer-links">
            <a href="#terms">
              <FormattedMessage id="footer.termsLink" />
            </a>{" "}
            <span aria-hidden="true">·</span>{" "}
            <a href="#privacy">
              <FormattedMessage id="footer.privacyLink" />
            </a>{" "}
            <span aria-hidden="true">·</span>{" "}
            <a href={REPO_URL}>
              <FormattedMessage id="footer.sourceLink" />
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
