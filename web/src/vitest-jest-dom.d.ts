// Types the jest-dom matchers (toBeInTheDocument, toHaveValue, ...) for Vitest 5.
//
// The runtime side is registered in src/test-setup.ts. This file only fixes the
// types: Vitest 5 changed its matcher interface to two type parameters
// (`Matchers<R, T>`), but @testing-library/jest-dom 7.0.x still augments the old
// one-parameter `Assertion<T>`, so its own `/vitest` types no longer apply.
// Remove this file once jest-dom ships Vitest 5 types.
import "vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  // jest-dom's second argument is the matcher's return type, so it gets `R` (void, or
  // Promise<void> under .resolves/.rejects), not the received value `T`. `T` is unused but
  // must keep Vitest's name and position for the declarations to merge.
  // vitest-jest-dom.typecheck.ts guards this.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
  interface Matchers<R = unknown, T = unknown> extends TestingLibraryMatchers<any, R> {}
}
