import { describe, it, expect } from "vitest";
import { getExampleLetters } from "./exampleLetters";
import { classifyLetter } from "../lib/rules";
import en from "../i18n/en.json";
import es from "../i18n/es.json";

/* These tests pin the demo to the rule library: if an example's wording or a
 * rule's patterns change so that a sample letter stops classifying as the type
 * its button promises, the demo silently lies. That must fail loudly here. */

const byId = Object.fromEntries(getExampleLetters().map((l) => [l.id, l]));

describe("example letters", () => {
  it("ships the four expected examples with catalog-backed labels", () => {
    const letters = getExampleLetters();
    expect(letters.map((l) => l.id)).toEqual(["termination", "renewal", "workreq", "denial"]);
    for (const l of letters) {
      expect((en as Record<string, string>)[l.labelKey], `${l.labelKey} in en.json`).toBeTruthy();
      expect((es as Record<string, string>)[l.labelKey], `${l.labelKey} in es.json`).toBeTruthy();
    }
  });

  it("declares itself fictional in the first line of every letter", () => {
    for (const l of getExampleLetters()) {
      const firstLine = l.text.split("\n")[0] ?? "";
      expect(firstLine, `${l.id} first line`).toMatch(/SAMPLE|MUESTRA/);
      expect(firstLine).toMatch(/NOT A REAL NOTICE|NO ES UN AVISO REAL/);
    }
  });

  it("classifies the termination example as a paperwork termination with a live deadline", () => {
    const r = classifyLetter(byId["termination"]!.text);
    expect(r.type).toBe("procedural_termination");
    expect(r.confidenceBand).toBe("high");
    expect(r.deadlineFoundInLetter).toBe(true);
    // Generated ~14 days out; a generous range keeps this stable at any date.
    expect(r.daysUntilDeadline).toBeGreaterThan(7);
    expect(r.daysUntilDeadline).toBeLessThan(21);
  });

  it("classifies the Spanish renewal example as a renewal request with a deadline", () => {
    const r = classifyLetter(byId["renewal"]!.text);
    expect(r.type).toBe("renewal_request");
    expect(r.confidenceBand).toBe("high");
    expect(r.deadlineFoundInLetter).toBe(true);
    expect(r.daysUntilDeadline).toBeGreaterThan(30);
  });

  it("classifies the work-requirement example and honestly reports no deadline", () => {
    const r = classifyLetter(byId["workreq"]!.text);
    expect(r.type).toBe("work_requirement_notification");
    // The letter is informational: the tool must not invent a deadline from
    // the floating "2027" or anything else.
    expect(r.deadlineFoundInLetter).toBe(false);
    expect(r.deadlineISO).toBeNull();
  });

  it("classifies the denial example as an exemption decision with an appeal deadline", () => {
    const r = classifyLetter(byId["denial"]!.text);
    expect(r.type).toBe("exemption_decision");
    expect(r.deadlineFoundInLetter).toBe(true);
    expect(r.daysUntilDeadline).toBeGreaterThan(45);
  });
});
