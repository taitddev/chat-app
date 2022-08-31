/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        eerieBlack: "#131324",
        vampireBlack: "#050509",
        richBlack: "#1D1D1E",
        hanPurple: "#4e0eff",
        mediumPurple: "#997AF0",
        crayola: "#3079F4",
        onyx: "#353648",
        charlestonGreen: "#242734",
        darkGunmetal: "#1E1D2A",

        // Avatar Colors
        pistachio: "#93c572",
        lightGray: "#D4D2D2",
      },
    },
  },
  plugins: [],
};
