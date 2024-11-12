import eslintConfigPrettier from "eslint-config-prettier"
import nextPlugin from "@next/eslint-plugin-next"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

export default [
  {
    ignores: ["node_modules/**", "dist/**", ".next/**", "out/**"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@next/next": nextPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // Avertissement pour les 'any'
      "@typescript-eslint/no-explicit-any": "warn",

      // Avertissement pour les imports/variables non utilisés
      "@typescript-eslint/no-unused-vars": "warn",

      // Avertissement pour les types implicites qui pourraient être 'any'
      "@typescript-eslint/no-inferrable-types": "warn",
    },
  },
  eslintConfigPrettier,
]
