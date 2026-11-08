// Type-only regression check for src/vitest-jest-dom.d.ts. Nothing imports or runs this
// file; `tsc --noEmit` (npm run build, CI) fails if the matcher return types drift.
import { expect } from "vitest";

declare const element: HTMLElement;

export const syncResult: void = expect(element).toBeInTheDocument();

export const asyncResult: Promise<void> = expect(
  Promise.resolve(element),
).resolves.toBeInTheDocument();

// @ts-expect-error A matcher returns void, never the element it was given.
export const notAnElement: HTMLElement = expect(element).toBeInTheDocument();
