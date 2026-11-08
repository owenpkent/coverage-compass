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
  // `R` must keep Vitest's name for the declarations to merge, even though it is unused here.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
  interface Matchers<R = unknown, T = unknown> extends TestingLibraryMatchers<any, T> {}
}
