/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        eerieBlack: "#131324",
        richBlack: "#1D1D1E",
        hanPurple: "#4e0eff",
        mediumPurple: "#997AF0",
        fogra29: "#080420",
      },
    },
  },
  plugins: [],
};
