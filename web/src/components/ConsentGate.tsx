import { FormattedMessage, useIntl } from "react-intl";
import { Button } from "react-aria-components";
import { CCDC_PHONE } from "../lib/rules";

const telHref = `tel:+1${CCDC_PHONE.replace(/\D/g, "")}`;

/**
 * Click-through release shown before the tool can be used. Acceptance is
 * session-only React state (owned by App): no cookie, no localStorage, so the
 * gate reappears on every visit, consistent with "nothing persists by default"
 * in docs/privacy.md. The language toggle in the header stays available, so a
 * Spanish speaker can read the release in Spanish before agreeing.
 *
 * WORDING IS A DRAFT, PENDING CCDC LEGAL REVIEW. Keep the plain-language
 * register when editing: short sentences, no legalese where a plain word works.
 */
export function ConsentGate({ onAccept }: { onAccept: () => void }) {
  const intl = useIntl();
  return (
    <section aria-labelledby="consent-title" className="consent">
      <h1 id="consent-title">
        <FormattedMessage id="consent.title" />
      </h1>
      <p className="privacy-note">
        <strong>
          <FormattedMessage id="consent.demoNotice" />
        </strong>
      </p>
      <p>
        <FormattedMessage id="consent.intro" />
      </p>
      <ul className="consent-points">
        <li>
          <FormattedMessage id="consent.local" />
        </li>
        <li>
          <FormattedMessage id="consent.draft" />
        </li>
        <li>
          <FormattedMessage id="consent.notAdvice" />
        </li>
        <li>
          <FormattedMessage id="consent.yourDocs" />
        </li>
        <li>
          <FormattedMessage id="consent.noWarranty" />
        </li>
      </ul>
      <p>
        <FormattedMessage
          id="consent.legalLinks"
          values={{
            terms: (
              <a href="#terms">
                <FormattedMessage id="footer.termsLink" />
              </a>
            ),
            privacy: (
              <a href="#privacy">
                <FormattedMessage id="footer.privacyLink" />
              </a>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage
          id="consent.help"
          values={{ phone: <a href={telHref}>{CCDC_PHONE}</a> }}
        />
      </p>
      <Button className="btn btn-primary consent-accept" onPress={onAccept}>
        {intl.formatMessage({ id: "consent.agree" })}
      </Button>
    </section>
  );
}
