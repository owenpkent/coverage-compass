import type { ReactElement } from "react";
import { render, type RenderResult } from "@testing-library/react";
import axe from "axe-core";
import { LocaleProvider } from "./i18n/LocaleProvider";

/** Render a component tree inside the locale/intl providers the app uses. */
export function renderWithProviders(ui: ReactElement): RenderResult {
  return render(<LocaleProvider>{ui}</LocaleProvider>);
}

/**
 * Run axe-core against a container and return the violations. Color-contrast is
 * disabled: jsdom has no real layout engine, so it cannot evaluate contrast and
 * would only produce noise. Contrast is verified manually and in CI against a
 * real browser.
 */
export async function axeViolations(container: HTMLElement): Promise<axe.Result[]> {
  const results = await axe.run(container, {
    rules: { "color-contrast": { enabled: false } },
  });
  return results.violations;
}
