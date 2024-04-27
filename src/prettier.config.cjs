/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  tailwindConfig: './tailwind.config.ts',
}

