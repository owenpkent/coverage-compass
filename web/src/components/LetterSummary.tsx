import { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button } from "react-aria-components";
import type { LetterClassification } from "../lib/rules";
import { useLocale } from "../i18n/LocaleProvider";
import { DeadlineCard } from "./DeadlineCard";
import { NextActions } from "./NextActions";
import { downloadSummaryPdf } from "../lib/summaryPdf";
import { formatLongDate } from "../lib/format";

/**
 * The result view: the deadline up top, then what the letter is, what it means,
 * what happens if you do nothing, and the concrete next actions. Offers a local
 * one-page PDF download and a reset. Takes focus on mount so screen-reader users
 * are moved to the answer.
 */
export function LetterSummary({
  classification: c,
  onReset,
}: {
  classification: LetterClassification;
  onReset: () => void;
}) {
  const intl = useIntl();
  const { locale } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [downloadFailed, setDownloadFailed] = useState(false);

  useEffect(() => {
    sectionRef.current?.focus();
  }, []);

  function deadlineText(): string {
    if (c.deadlineFoundInLetter && c.deadlineISO) {
      const date = formatLongDate(c.deadlineISO, locale);
      let countdown: string;
      if (c.daysUntilDeadline === 0) {
        countdown = intl.formatMessage({ id: "deadline.today" });
      } else if (c.daysUntilDeadline != null && c.daysUntilDeadline > 0) {
        countdown = intl.formatMessage({ id: "deadline.daysLeft" }, { days: c.daysUntilDeadline });
      } else {
        countdown = intl.formatMessage(
          { id: "deadline.past" },
          { days: Math.abs(c.daysUntilDeadline ?? 0) },
        );
      }
      return `${date} (${countdown})`;
    }
    const title = intl.formatMessage({ id: "deadline.unknownTitle" });
    const note =
      c.typicalWindowDays != null
        ? intl.formatMessage({ id: "deadline.typicalWindow" }, { days: c.typicalWindowDays })
        : intl.formatMessage({ id: "deadline.noWindow" });
    return `${title}. ${note}`;
  }

  async function handleDownload() {
    setDownloadFailed(false);
    try {
      await downloadSummaryPdf(c, {
        title: intl.formatMessage({ id: "result.heading" }),
        typeHeading: intl.formatMessage({ id: "result.typeHeading" }),
        deadlineHeading: intl.formatMessage({ id: "deadline.heading" }),
        meaningHeading: intl.formatMessage({ id: "result.meaningHeading" }),
        doNothingHeading: intl.formatMessage({ id: "result.doNothingHeading" }),
        actionsHeading: intl.formatMessage({ id: "result.actionsHeading" }),
        disclaimer: intl.formatMessage({ id: "result.disclaimer" }),
        deadlineText: deadlineText(),
        // Carry the "unreviewed Spanish" caveat into the printable PDF too.
        ...(c.translationPending
          ? { translationPending: intl.formatMessage({ id: "result.translationPending" }) }
          : {}),
      });
    } catch {
      setDownloadFailed(true);
    }
  }

  return (
    <section className="result" ref={sectionRef} tabIndex={-1} aria-labelledby="result-heading">
      <h2 id="result-heading">
        <FormattedMessage id="result.heading" />
      </h2>

      <DeadlineCard classification={c} />

      {c.confidenceBand === "low" && (
        <p className="callout callout-warning" role="note">
          <FormattedMessage id="result.lowConfidence" />
        </p>
      )}
      {c.translationPending && (
        <p className="callout callout-info" role="note">
          <FormattedMessage id="result.translationPending" />
        </p>
      )}

      <div className="result-block">
        <h3>
          <FormattedMessage id="result.typeHeading" />
        </h3>
        <p className="result-type">{c.label}</p>
      </div>

      <div className="result-block">
        <h3>
          <FormattedMessage id="result.meaningHeading" />
        </h3>
        <p>{c.plainLanguageSummary}</p>
      </div>

      <div className="result-block">
        <h3>
          <FormattedMessage id="result.doNothingHeading" />
        </h3>
        <p>{c.doNothingConsequence}</p>
      </div>

      <div className="result-block">
        <h3>
          <FormattedMessage id="result.actionsHeading" />
        </h3>
        <NextActions actions={c.nextActions} />
      </div>

      <p className="disclaimer">
        <FormattedMessage id="result.disclaimer" />
      </p>

      <div className="result-buttons">
        <Button className="btn btn-primary" onPress={handleDownload}>
          {intl.formatMessage({ id: "result.download" })}
        </Button>
        <Button className="btn btn-secondary" onPress={onReset}>
          {intl.formatMessage({ id: "result.another" })}
        </Button>
      </div>

      {downloadFailed && (
        <p className="callout callout-warning" role="alert">
          <FormattedMessage id="error.generic" />
        </p>
      )}
    </section>
  );
}
