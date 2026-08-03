import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
      "boundaries/dependency-nodes": ["import"],
"boundaries/elements": [
        { type: "app", pattern: "src/app" },
        { type: "modules", pattern: "src/modules" },
        { type: "infrastructure", pattern: "src/infrastructure" },
        { type: "components", pattern: "src/components" },
        { type: "config", pattern: "src/config" },
        { type: "lib", pattern: "src/lib" },
        { type: "core", pattern: "src/core" },
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            { from: [{ type: "app" }], allow: [{ type: "app" }, { type: "modules" }, { type: "components" }, { type: "config" }, { type: "lib" }, { type: "core" }] },
            { from: [{ type: "modules" }], allow: [{ type: "modules" }, { type: "infrastructure" }, { type: "components" }, { type: "config" }, { type: "lib" }, { type: "core" }] },
            { from: [{ type: "infrastructure" }], allow: [{ type: "infrastructure" }, { type: "config" }, { type: "lib" }, { type: "core" }] },
            { from: [{ type: "components" }], allow: [{ type: "components" }, { type: "lib" }, { type: "core" }] },
            { from: [{ type: "config" }], allow: [{ type: "core" }] },
            { from: [{ type: "lib" }], allow: [{ type: "lib" }, { type: "core" }] },
            { from: [{ type: "core" }], allow: [{ type: "core" }] },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;