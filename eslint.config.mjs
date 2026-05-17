import nextConfig from "eslint-config-next";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  // eslint-config-next already exports a flat config array in Next.js 16
  ...nextConfig,
  {
    rules: {
      // Server-side code must use the pino logger — not console.
      // Client-side console.error/warn are acceptable (no server logger available).
      "no-console": ["warn", { allow: ["error", "warn"] }],

      // Unescaped entities — disabled. Requiring &apos; / &quot; throughout legal
      // content pages is noise and makes source unreadable. Browsers handle raw
      // quotes and apostrophes in JSX text correctly.
      "react/no-unescaped-entities": "off",

      // React Compiler rules — warnings while the remaining non-urgent client
      // state transitions are incrementally cleaned up.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
  {
    // Relax for test files
    files: ["tests/**/*.{ts,tsx}", "**/*.test.{ts,tsx}"],
    rules: {
      "no-console": "off",
    },
  },
];

export default config;
