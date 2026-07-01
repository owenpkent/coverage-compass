/* The personal archive: the single audited storage module.
 *
 * docs/privacy.md commits that no code writes to IndexedDB (or any storage)
 * except through one audited module. This is that module. Keep every
 * IndexedDB touch in this file.
 *
 * Rules encoded here:
 * - Saving is strictly OPT-IN. Nothing calls saveArchive automatically; only
 *   an explicit user action ("Save on this device") may. "Nothing persists by
 *   default" stays true.
 * - Local only. IndexedDB never syncs anywhere; there is no server.
 * - One record. The archive is a single object under one key, so "delete my
 *   info" is one deletion with nothing left behind.
 */
import type { Profile, Employer } from "./profile/schema";

const DB_NAME = "coverage-compass";
const STORE = "archive";
const KEY = "current";
const VERSION = 1;

export interface ArchiveData {
  profile: Profile;
  employer: Employer;
  /** ISO timestamp of the explicit save action. */
  savedAt: string;
}

function idbAvailable(): boolean {
  return typeof indexedDB !== "undefined";
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await openDb();
  try {
    return await new Promise<T>((resolve, reject) => {
      const req = fn(db.transaction(STORE, mode).objectStore(STORE));
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  } finally {
    db.close();
  }
}

/** Persist the archive. Call ONLY from an explicit user action. */
export async function saveArchive(data: ArchiveData): Promise<void> {
  if (!idbAvailable()) throw new Error("IndexedDB is not available in this browser");
  await withStore("readwrite", (s) => s.put(data, KEY));
}

/** The saved archive, or null when nothing was ever saved (or storage is unavailable). */
export async function loadArchive(): Promise<ArchiveData | null> {
  if (!idbAvailable()) return null;
  const v = await withStore<ArchiveData | undefined>(
    "readonly",
    (s) => s.get(KEY) as IDBRequest<ArchiveData | undefined>,
  );
  return v ?? null;
}

/** Delete the saved archive. One record, one deletion, nothing left behind. */
export async function clearArchive(): Promise<void> {
  if (!idbAvailable()) return;
  await withStore("readwrite", (s) => s.delete(KEY));
}
