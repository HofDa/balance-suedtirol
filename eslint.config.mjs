import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", ".next-dev/**", "node_modules/**", "src/generated/**", ".claude/**", ".impeccable/**", "next-env.d.ts"]
  }
];

export default eslintConfig;
