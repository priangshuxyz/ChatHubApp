import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "bumblebee",
      "corporate",
      "synthwave",
      "retro",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "dracula",
      "cmyk",
      "business",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "sunset",
    ],
  },
};
