import "fake-indexeddb/auto";
import { describe, it, expect, beforeEach } from "vitest";
import { saveArchive, loadArchive, clearArchive, type ArchiveData } from "./archive";
import { blankProfile, blankEmployer } from "./profile/schema";

function sample(): ArchiveData {
  const profile = blankProfile();
  profile.first = "Alex";
  profile.ssn = "000000000";
  const employer = blankEmployer();
  employer.memberFirst = "Morgan";
  return { profile, employer, savedAt: "2026-07-01T12:00:00.000Z" };
}

beforeEach(async () => {
  await clearArchive();
});

describe("archive", () => {
  it("returns null when nothing was ever saved", async () => {
    expect(await loadArchive()).toBeNull();
  });

  it("round-trips a save and load", async () => {
    const data = sample();
    await saveArchive(data);
    const loaded = await loadArchive();
    expect(loaded?.profile.first).toBe("Alex");
    expect(loaded?.employer.memberFirst).toBe("Morgan");
    expect(loaded?.savedAt).toBe(data.savedAt);
  });

  it("overwrites rather than accumulating records (one record, one deletion)", async () => {
    await saveArchive(sample());
    const second = sample();
    second.profile.first = "Sam";
    await saveArchive(second);
    const loaded = await loadArchive();
    expect(loaded?.profile.first).toBe("Sam");
  });

  it("clearArchive removes the record completely", async () => {
    await saveArchive(sample());
    await clearArchive();
    expect(await loadArchive()).toBeNull();
  });
});
