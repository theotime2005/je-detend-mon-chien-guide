import js from "@eslint/js";
import pluginVitest from "@vitest/eslint-plugin";
import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export default defineConfig([
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "comma-spacing": [
        "error",
        {
          before: false,
          after: true,
        },
      ],
      "object-curly-spacing": ["error", "always"],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "block", next: "block" },
        { blankLine: "always", prev: "function", next: "function" },
        { blankLine: "always", prev: "class", next: "function" },
      ],
      "prefer-const": ["error"],
      "space-before-blocks": ["error"],
      "space-before-function-paren": [
        "error",
        {
          anonymous: "never",
          named: "never",
          asyncArrow: "ignore",
        },
      ],
      "space-in-parens": ["error"],
      "space-infix-ops": ["error"],
      "func-call-spacing": ["error"],
      "key-spacing": ["error"],
      "no-trailing-spaces": ["error"],
      "no-multi-spaces": ["error"],
      "func-style": ["error", "declaration", { allowArrowFunctions: false }],
    },
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"],
  },
]);
