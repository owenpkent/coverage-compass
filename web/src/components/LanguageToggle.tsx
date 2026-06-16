import { useIntl } from "react-intl";
import { useLocale } from "../i18n/LocaleProvider";

/** Two-button English/Spanish switch. aria-pressed marks the active language. */
export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const intl = useIntl();

  return (
    <div className="lang-toggle" role="group" aria-label={intl.formatMessage({ id: "lang.label" })}>
      <button
        type="button"
        className="lang-btn"
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        {intl.formatMessage({ id: "lang.en" })}
      </button>
      <button
        type="button"
        className="lang-btn"
        aria-pressed={locale === "es"}
        onClick={() => setLocale("es")}
      >
        {intl.formatMessage({ id: "lang.es" })}
      </button>
    </div>
  );
}
