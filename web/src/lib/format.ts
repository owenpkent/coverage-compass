/* Small formatting helpers shared by the result UI and the PDF summary. */

import type { Urgency } from "./rules";

/** Parse a YYYY-MM-DD string into a *local* Date (no UTC day-shift). */
export function parseISODateLocal(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

/** A long, locale-aware date like "Tuesday, June 30, 2026". */
export function formatLongDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parseISODateLocal(iso));
}

/** Map days-remaining to an urgency band, used to color the deadline card. */
export function urgencyFromDays(days: number | null): Urgency {
  if (days == null) return "this-month";
  if (days <= 3) return "now";
  if (days <= 14) return "this-week";
  return "this-month";
}
