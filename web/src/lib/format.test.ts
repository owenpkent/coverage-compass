import { describe, it, expect } from "vitest";
import { parseISODateLocal, formatLongDate, urgencyFromDays } from "./format";

describe("parseISODateLocal", () => {
  it("parses to local calendar components with no UTC day-shift", () => {
    const d = parseISODateLocal("2026-06-30");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(5);
    expect(d.getDate()).toBe(30);
  });

  it("survives the first of the month (the classic off-by-one-day case)", () => {
    const d = parseISODateLocal("2027-01-01");
    expect(d.getFullYear()).toBe(2027);
    expect(d.getMonth()).toBe(0);
    expect(d.getDate()).toBe(1);
  });
});

describe("formatLongDate", () => {
  it("formats in English", () => {
    const s = formatLongDate("2026-06-30", "en");
    expect(s).toMatch(/June/);
    expect(s).toMatch(/30/);
    expect(s).toMatch(/2026/);
  });

  it("formats in Spanish", () => {
    const s = formatLongDate("2026-06-30", "es");
    expect(s).toMatch(/junio/);
    expect(s).toMatch(/2026/);
  });
});

describe("urgencyFromDays", () => {
  it("maps unknown to the calm band, never to panic", () => {
    expect(urgencyFromDays(null)).toBe("this-month");
  });

  it("treats past-due and near deadlines as urgent", () => {
    expect(urgencyFromDays(-2)).toBe("now");
    expect(urgencyFromDays(0)).toBe("now");
    expect(urgencyFromDays(3)).toBe("now");
  });

  it("bands the middle and far distances", () => {
    expect(urgencyFromDays(4)).toBe("this-week");
    expect(urgencyFromDays(14)).toBe("this-week");
    expect(urgencyFromDays(15)).toBe("this-month");
    expect(urgencyFromDays(60)).toBe("this-month");
  });
});
