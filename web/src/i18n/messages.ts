import en from "./en.json";
import es from "./es.json";

/** Locales the app ships. Matches the rules engine's Locale type. */
export type AppLocale = "en" | "es";

export const MESSAGES: Record<AppLocale, Record<string, string>> = { en, es };

/** Best-guess starting locale from the browser; Spanish if it leads with "es". */
export function detectLocale(): AppLocale {
  if (typeof navigator === "undefined") return "en";
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}
