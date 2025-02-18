/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#023623",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
      },
      backgroundImage: {
        "custom-bg": "url('./assets/banner/train.png')",
      },
    },
  },
  daisyui: {
    themes: ["cupcake", "dim", "dark", "cmyk"],
  },
  plugins: [daisyui],
};
