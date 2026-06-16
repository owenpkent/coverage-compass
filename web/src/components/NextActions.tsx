import { Fragment, type ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import type { ResolvedNextAction } from "../lib/rules";

const PHONE = /\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;

/** Render detail text, turning any phone number into a tappable tel: link. */
function withPhoneLinks(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(PHONE)) {
    const start = match.index ?? 0;
    if (start > lastIndex) parts.push(text.slice(lastIndex, start));
    const display = match[0];
    const tel = `+1${display.replace(/\D/g, "")}`;
    parts.push(
      <a key={start} href={`tel:${tel}`}>
        {display}
      </a>,
    );
    lastIndex = start + display.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.map((p, i) => <Fragment key={i}>{p}</Fragment>);
}

export function NextActions({ actions }: { actions: ResolvedNextAction[] }) {
  const intl = useIntl();
  if (actions.length === 0) return null;
  return (
    <ol className="next-actions" aria-label={intl.formatMessage({ id: "result.actionsHeading" })}>
      {actions.map((action, i) => (
        <li key={i} className={`action action-${action.urgency}`}>
          <span className={`action-badge badge-${action.urgency}`}>
            <FormattedMessage id={`urgency.${action.urgency}`} />
          </span>
          <span className="action-body">
            <span className="action-label">{action.label}</span>{" "}
            <span className="action-detail">{withPhoneLinks(action.detail)}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
