import { describe, it, expect } from "vitest";
import en from "./en.json";
import es from "./es.json";

describe("i18n catalogs", () => {
  it("English and Spanish define exactly the same message ids", () => {
    const enKeys = Object.keys(en).sort();
    const esKeys = Object.keys(es).sort();
    expect(esKeys).toEqual(enKeys);
  });

  it("has no empty strings", () => {
    for (const [key, value] of Object.entries({ ...en, ...es })) {
      expect(value, `empty message for ${key}`).not.toBe("");
    }
  });
});
