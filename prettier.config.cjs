/** @type {import("prettier").Config} */
module.exports = {
    tabWidth:2,
    useTabs: false,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};
