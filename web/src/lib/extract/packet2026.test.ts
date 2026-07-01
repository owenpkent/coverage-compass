/// <reference types="node" />
// Node types referenced here only: this test reads the template from disk.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect, beforeAll } from "vitest";
import { fillPacket2026 } from "../fill/forms/packet2026";
import { importPacket2026 } from "./packet2026";
import { blankProfile, blankEmployer, type Profile, type Employer } from "../profile/schema";

/* Carry-forward round trip: fill the real template, then import the filled
 * output and assert the profile comes back. This is the mechanism that turns
 * last year's packet into this year's pre-filled form. All data is fake. */

const TEMPLATE_PATH = resolve(process.cwd(), "public/forms/CO-CDASS-Attendant-Packet-2026.pdf");

function original(): { p: Profile; e: Employer } {
  const p = blankProfile();
  p.first = "Alex";
  p.middle = "J";
  p.last = "Sample";
  p.dob = "1990-01-15";
  p.ssn = "000000000";
  p.street = "123 Example St";
  p.street2 = "Apt 4";
  p.city = "Denver";
  p.state = "CO";
  p.zip = "80200";
  p.county = "Denver";
  p.mailingSame = false;
  p.mailStreet = "PO Box style different st";
  p.mailCity = "Aurora";
  p.mailState = "CO";
  p.mailZip = "80010";
  p.email = "alex@example.invalid";
  p.cellPhone = "(000) 000-0000";
  p.contactPreference = "cell";
  p.allowText = "yes";
  p.primaryLanguage = "English";
  p.relationship = "relative";
  p.relationToEmployer = "none";
  p.directDeposit = true;
  p.accountType = "checking";
  p.bankName = "Example Bank";
  p.routing = "123456789";
  p.account = "987654321";
  p.citizenship = "citizen";
  p.dlNumber = "X0000000";
  p.dlState = "CO";
  p.dlExpiration = "2030-01-01";
  p.pplId = "A-000000";
  p.rateStandardCdass = "18";
  p.rateEmergencyCdass = "45";

  const e = blankEmployer();
  e.memberFirst = "Morgan";
  e.memberLast = "Example";
  e.memberPplId = "M-000000";
  e.employerFirst = "Morgan";
  e.employerLast = "Example";
  return { p, e };
}

let filled: Uint8Array;

beforeAll(async () => {
  const template = new Uint8Array(readFileSync(TEMPLATE_PATH));
  const { p, e } = original();
  filled = await fillPacket2026(template, p, e, { signatureDate: "2026-07-01", newService: true });
});

describe("importPacket2026 (carry-forward round trip)", () => {
  it("recovers the typed answers from a previously filled packet", async () => {
    const res = await importPacket2026(filled);
    const { profile: p, employer: e } = res;

    expect(res.count).toBeGreaterThan(20);

    // Identity, with formats normalized back (dates to ISO, SSN to digits).
    expect(p.first).toBe("Alex");
    expect(p.middle).toBe("J");
    expect(p.last).toBe("Sample");
    expect(p.dob).toBe("1990-01-15");
    expect(p.ssn).toBe("000000000");

    // Address, including the distinct mailing address.
    expect(p.street).toBe("123 Example St");
    expect(p.city).toBe("Denver");
    expect(p.zip).toBe("80200");
    expect(p.mailingSame).toBe(false);
    expect(p.mailCity).toBe("Aurora");

    // Enums recovered from checkbox groups.
    expect(p.relationship).toBe("relative");
    expect(p.relationToEmployer).toBe("none");
    expect(p.contactPreference).toBe("cell");
    expect(p.citizenship).toBe("citizen");

    // Payment: per-digit boxes rejoined.
    expect(p.directDeposit).toBe(true);
    expect(p.accountType).toBe("checking");
    expect(p.routing).toBe("123456789");
    expect(p.account).toBe("987654321");

    // Identity documents via the embedded I-9.
    expect(p.dlNumber).toBe("X0000000");
    expect(p.dlExpiration).toBe("2030-01-01");

    // Member and employer names split back apart.
    expect(e.memberFirst).toBe("Morgan");
    expect(e.memberLast).toBe("Example");
    expect(e.memberPplId).toBe("M-000000");
    expect(e.employerFirst).toBe("Morgan");
    expect(e.employerLast).toBe("Example");
  });

  it("reports a near-zero count for a PDF that is not this form", async () => {
    // A blank single-page PDF the size of a letter: no recognizable answers.
    const { PDFDocument } = await import("pdf-lib");
    const doc = await PDFDocument.create();
    doc.addPage([612, 792]);
    const res = await importPacket2026(await doc.save());
    expect(res.count).toBeLessThan(3);
  });
});
