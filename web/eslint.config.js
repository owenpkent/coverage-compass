import js from "@eslint/js";
import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";

// Flat config (ESLint 9). The accessibility floor (jsx-a11y) and the hooks rules
// are the load-bearing gates here; TypeScript itself covers undefined-variable
// and type checks, so eslint's no-undef is left off for .ts/.tsx.
export default [
  {
    ignores: [
      "dist/**",
      "public/**",
      "coverage/**",
      "**/*.generated.ts",
      "**/*.config.*",
      "scripts/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      ...reactHooks.configs["recommended-latest"].rules,
      // TypeScript handles these; the eslint versions misfire on TS syntax.
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["**/*.test.{ts,tsx}", "src/test-*.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
];
