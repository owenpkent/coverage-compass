/* Plain-language resolution.
 *
 * The substantive, user-facing explanations live in the advocate-editable rule
 * library (rules/co/letter-types.yaml -> rules.generated.ts), localized as
 * { en, es }. This module is the small seam that picks the right language and
 * reports when a Spanish string has not yet been reviewed.
 *
 * App chrome (buttons, headings) is localized separately via react-intl; rule
 * *content* is localized here, from the rule data, so an advocate owns the words.
 */
import type { Locale } from "./rules";
import { LETTER_RULES, ES_REVIEWED } from "./rules.generated";

export interface LocalizedString {
  en: string;
  es?: string;
}

/** Pick the string for `locale`, falling back to English when no translation exists. */
export function pickLocale(value: LocalizedString, locale: Locale): string {
  if (locale === "es" && value.es) return value.es;
  return value.en;
}

/**
 * Whether rule content shown in `locale` may include un-reviewed translations.
 * True only for Spanish while the YAML's `es_reviewed` flag is false. The UI
 * uses this to show an honest "translation pending review" note.
 */
export function isTranslationPending(locale: Locale): boolean {
  return locale === "es" && !ES_REVIEWED;
}

/** The plain-language explanation for a letter type, or null if unknown. */
export function getPlainLanguage(typeId: string, locale: Locale): string | null {
  const rule = LETTER_RULES.find((r) => r.id === typeId);
  return rule ? pickLocale(rule.plainLanguage, locale) : null;
}
