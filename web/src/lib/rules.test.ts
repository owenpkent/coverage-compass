import { describe, it, expect } from "vitest";
import { classifyLetter, CCDC_PHONE } from "./rules";
import { LETTER_RULES } from "./rules.generated";

const NOW = new Date(2026, 5, 15); // 2026-06-15

describe("classifyLetter", () => {
  it("classifies a renewal request and offers a renew action", () => {
    const text = "It is time to renew your coverage. Complete the renewal packet on PEAK.";
    const r = classifyLetter(text, { now: NOW });
    expect(r.type).toBe("renewal_request");
    expect(r.confidenceBand).toBe("high");
    expect(r.nextActions.some((a) => /renew/i.test(a.label))).toBe(true);
  });

  it("classifies a procedural termination as urgent with a call-CCDC action", () => {
    const text = "We did not receive your renewal. Your coverage will end on 07/01/2026.";
    const r = classifyLetter(text, { now: NOW });
    expect(r.type).toBe("procedural_termination");
    expect(r.nextActions[0]?.urgency).toBe("now");
    expect(r.nextActions.some((a) => a.detail.includes(CCDC_PHONE))).toBe(true);
    // The deadline date should be read from the letter.
    expect(r.deadlineISO).toBe("2026-07-01");
    expect(r.deadlineFoundInLetter).toBe(true);
  });

  it("classifies a work-requirement notice", () => {
    const text = "New work requirement: you must show 80 hours of community engagement.";
    const r = classifyLetter(text, { now: NOW });
    expect(r.type).toBe("work_requirement_notification");
  });

  it("classifies an exemption decision", () => {
    const text = "We reviewed your case. You are exempt as medically frail.";
    const r = classifyLetter(text, { now: NOW });
    expect(r.type).toBe("exemption_decision");
  });

  it("falls back to unknown, which still offers a safe next action", () => {
    const r = classifyLetter("Lorem ipsum dolor sit amet.", { now: NOW });
    expect(r.type).toBe("unknown");
    expect(r.confidenceBand).toBe("low");
    expect(r.nextActions.length).toBeGreaterThan(0);
    expect(r.nextActions.some((a) => a.detail.includes(CCDC_PHONE))).toBe(true);
  });

  it("resolves Spanish content and flags it pending review", () => {
    const text = "Es hora de renovar su cobertura.";
    const r = classifyLetter(text, { locale: "es", now: NOW });
    expect(r.type).toBe("renewal_request");
    expect(r.plainLanguageSummary).toMatch(/renovar|califica/i);
    expect(r.translationPending).toBe(true);
  });

  it("exposes the rule's typical window when no date is in the letter", () => {
    const r = classifyLetter("It is time to renew your benefits.", { now: NOW });
    expect(r.deadlineFoundInLetter).toBe(false);
    expect(r.typicalWindowDays).toBe(60);
  });

  it("breaks a score tie toward the higher-stakes type (termination over renewal)", () => {
    // One renewal phrase, one termination phrase: a 1-1 tie. The urgent type must
    // win so the "call CCDC now" action is never hidden behind a benign renewal.
    const r = classifyLetter("Your renewal packet was due. Your coverage will end.", { now: NOW });
    expect(r.type).toBe("procedural_termination");
    expect(r.nextActions[0]?.urgency).toBe("now");
  });

  it("does not inflate confidence from overlapping/substring patterns", () => {
    // "exemption" contains "exempt"; that single word must count once, not twice.
    const r = classifyLetter("We received your request for an exemption.", { now: NOW });
    expect(r.type).toBe("exemption_decision");
    expect(r.confidenceBand).toBe("medium");
  });
});

describe("rule data integrity", () => {
  it("uses one and only one CCDC phone number across all rules", () => {
    const phonePattern = /\(\d{3}\)\s?\d{3}-\d{4}/g;
    const blob = JSON.stringify(LETTER_RULES);
    const found = new Set(blob.match(phonePattern) ?? []);
    for (const num of found) {
      expect(num).toBe(CCDC_PHONE);
    }
  });

  it("every letter type has at least one next action", () => {
    for (const rule of LETTER_RULES) {
      expect(rule.nextActions.length).toBeGreaterThan(0);
    }
  });
});
