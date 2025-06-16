/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xsm: "0px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      lato: ["Lato", "sans-serif"],
      inter: ["Inter", "serif"],
      Abril: ["Abril Fatface", " serif"],
      serif: ["Merriweather", "serif"],
    },

    boxShadow: {
      whiteShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
      custom: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
  },
  plugins: [flowbitePlugin],
};
