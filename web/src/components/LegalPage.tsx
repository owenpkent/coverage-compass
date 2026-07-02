import { useIntl } from "react-intl";
import { useLocale } from "../i18n/LocaleProvider";
import { pickLocale } from "../lib/plainLanguage";
import type { LegalDoc } from "../content/legal";

/**
 * Renders a bilingual legal document (Terms of Use / Privacy Notice). Reachable
 * before the consent gate is accepted, on purpose: people must be able to read
 * what they are agreeing to. Navigation is plain hash links handled in App.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const intl = useIntl();
  const { locale } = useLocale();

  return (
    <article className="legal">
      <p>
        <a href="#main">{intl.formatMessage({ id: "legal.back" })}</a>
      </p>
      <h1>{pickLocale(doc.title, locale)}</h1>
      <p className="legal-updated">
        {intl.formatMessage({ id: "legal.updated" }, { date: doc.updated })}
      </p>
      <p className="privacy-note">
        <strong>{intl.formatMessage({ id: "legal.draftNote" })}</strong>
      </p>
      <p>{pickLocale(doc.intro, locale)}</p>
      {doc.sections.map((s, i) => (
        <section key={i}>
          <h2>{pickLocale(s.heading, locale)}</h2>
          {s.paragraphs.map((p, j) => (
            <p key={j}>{pickLocale(p, locale)}</p>
          ))}
        </section>
      ))}
      <p>
        <a href="#main">{intl.formatMessage({ id: "legal.back" })}</a>
      </p>
    </article>
  );
}
