import { describe, it, expect } from "vitest";
import { pickLocale, isTranslationPending, getPlainLanguage } from "./plainLanguage";
import { ES_REVIEWED } from "./rules.generated";

describe("pickLocale", () => {
  it("returns Spanish when present and requested", () => {
    expect(pickLocale({ en: "hello", es: "hola" }, "es")).toBe("hola");
  });

  it("falls back to English when Spanish is missing or empty", () => {
    expect(pickLocale({ en: "hello" }, "es")).toBe("hello");
    expect(pickLocale({ en: "hello", es: "" }, "es")).toBe("hello");
  });

  it("returns English for the English locale even when Spanish exists", () => {
    expect(pickLocale({ en: "hello", es: "hola" }, "en")).toBe("hello");
  });
});

describe("isTranslationPending", () => {
  it("is never pending for English", () => {
    expect(isTranslationPending("en")).toBe(false);
  });

  it("tracks the rule library's es_reviewed flag for Spanish", () => {
    expect(isTranslationPending("es")).toBe(!ES_REVIEWED);
  });
});

describe("getPlainLanguage", () => {
  it("returns the explanation for a known type", () => {
    const s = getPlainLanguage("unknown", "en");
    expect(s).toBeTruthy();
    expect(typeof s).toBe("string");
  });

  it("returns null for a type id that does not exist", () => {
    expect(getPlainLanguage("not-a-real-type", "en")).toBeNull();
  });
});
