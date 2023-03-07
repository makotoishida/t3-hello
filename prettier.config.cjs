/** @type {import("prettier").Config} */
module.exports = {
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,

  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};
