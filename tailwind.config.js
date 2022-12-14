/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cuco-blue": "#2095f2",
        "cuco-green": "#12a454",
        "cuco-pink": "#ee2279",
        "cuco-text": "#969cb2",
        "cuco-red": "#e52e4d",
        "cuco-text-strong": "#363f5f",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
