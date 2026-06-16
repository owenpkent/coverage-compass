import { FormattedMessage, useIntl } from "react-intl";
import { Triage } from "./components/Triage";
import { LanguageToggle } from "./components/LanguageToggle";
import { CCDC_PHONE } from "./lib/rules";

const REPO_URL = "https://github.com/owenpkent/coverage-compass";
const PRIVACY_URL = `${REPO_URL}/blob/main/docs/privacy.md`;
const telHref = `tel:+1${CCDC_PHONE.replace(/\D/g, "")}`;

export function App() {
  const intl = useIntl();
  return (
    <>
      <a href="#main" className="skip-link">
        <FormattedMessage id="nav.skip" />
      </a>
      <header className="site-header">
        <div className="container header-row">
          <div>
            <p className="brand">Coverage Compass</p>
            <p className="tagline">
              <FormattedMessage id="app.tagline" />
            </p>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main id="main" className="container" tabIndex={-1}>
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
          <p>
            <a href={PRIVACY_URL}>
              <FormattedMessage id="footer.privacyLink" />
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
