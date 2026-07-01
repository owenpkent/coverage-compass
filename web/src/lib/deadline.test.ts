import { describe, it, expect } from "vitest";
import { extractDeadline, normalize } from "./deadline";

const NOW = new Date(2026, 5, 15); // 2026-06-15, local time

describe("normalize", () => {
  it("lowercases and strips Spanish diacritics", () => {
    expect(normalize("Renovación")).toBe("renovacion");
    expect(normalize("MÉDICAMENTE Frágil")).toBe("medicamente fragil");
  });
});

describe("extractDeadline", () => {
  it("reads an English long-form deadline next to a keyword", () => {
    const r = extractDeadline("Please respond by June 30, 2026 to keep coverage.", { now: NOW });
    expect(r.foundInLetter).toBe(true);
    expect(r.deadlineISO).toBe("2026-06-30");
    expect(r.daysUntilDeadline).toBe(15);
  });

  it("reads a numeric deadline with 'no later than'", () => {
    const r = extractDeadline("Return your renewal no later than 06/30/2026.", { now: NOW });
    expect(r.deadlineISO).toBe("2026-06-30");
    expect(r.daysUntilDeadline).toBe(15);
  });

  it("expands a two-digit year", () => {
    const r = extractDeadline("Due by 7/1/26.", { now: NOW });
    expect(r.deadlineISO).toBe("2026-07-01");
  });

  it("reads a Spanish deadline (accents and 'a más tardar')", () => {
    const r = extractDeadline("Responda a más tardar el 30 de junio de 2026.", { now: NOW });
    expect(r.foundInLetter).toBe(true);
    expect(r.deadlineISO).toBe("2026-06-30");
  });

  it("reports negative days for a deadline already past", () => {
    const r = extractDeadline("You were required to respond by 05/01/2026.", { now: NOW });
    expect(r.deadlineISO).toBe("2026-05-01");
    expect(r.daysUntilDeadline).toBeLessThan(0);
  });

  it("ignores dates that are not next to a deadline keyword", () => {
    const r = extractDeadline("Date of this notice: 01/02/2026. Case number 12345.", { now: NOW });
    expect(r.foundInLetter).toBe(false);
    expect(r.deadlineISO).toBeNull();
  });

  it("returns no deadline when there is no date at all", () => {
    const r = extractDeadline("We received your application. Thank you.", { now: NOW });
    expect(r.foundInLetter).toBe(false);
    expect(r.daysUntilDeadline).toBeNull();
  });

  it("rejects an impossible date", () => {
    const r = extractDeadline("Respond by 13/40/2026.", { now: NOW });
    expect(r.foundInLetter).toBe(false);
  });

  it("ignores an enrollment/effective date and uses the real action deadline", () => {
    const r = extractDeadline(
      "Your enrollment is effective 01/01/2026. Please respond by 06/30/2026.",
      { now: NOW },
    );
    expect(r.deadlineISO).toBe("2026-06-30");
  });

  it("does not treat a bare effective date as a deadline", () => {
    const r = extractDeadline("Your coverage is effective 01/01/2026.", { now: NOW });
    expect(r.foundInLetter).toBe(false);
  });

  it("reads a deadline after a bare 'by' when the date follows immediately", () => {
    const r = extractDeadline("Please return the completed packet by June 30, 2026.", {
      now: NOW,
    });
    expect(r.foundInLetter).toBe(true);
    expect(r.deadlineISO).toBe("2026-06-30");
  });

  it("does not treat 'reviewed by <name> on <date>' as a deadline", () => {
    const r = extractDeadline("Reviewed by John Smith on 06/01/2026.", { now: NOW });
    expect(r.foundInLetter).toBe(false);
  });

  it("reads a Spanish deadline after 'para el'", () => {
    const r = extractDeadline("Devuelva el formulario firmado para el 30 de junio de 2026.", {
      now: NOW,
    });
    expect(r.foundInLetter).toBe(true);
    expect(r.deadlineISO).toBe("2026-06-30");
  });

  it("reads a Spanish deadline after 'hasta el'", () => {
    const r = extractDeadline("Tiene hasta el 15 de agosto de 2026 para responder.", {
      now: NOW,
    });
    expect(r.foundInLetter).toBe(true);
    expect(r.deadlineISO).toBe("2026-08-15");
  });
});
