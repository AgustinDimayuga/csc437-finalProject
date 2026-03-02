import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          950: "rgb(var(--brand-950) / <alpha-value>)",
          900: "rgb(var(--brand-900) / <alpha-value>)",
          800: "rgb(var(--brand-800) / <alpha-value>)",
          700: "rgb(var(--brand-700) / <alpha-value>)",
          600: "rgb(var(--brand-600) / <alpha-value>)",
          500: "rgb(var(--brand-500) / <alpha-value>)",
          400: "rgb(var(--brand-400) / <alpha-value>)",
          300: "rgb(var(--brand-300) / <alpha-value>)",
          200: "rgb(var(--brand-200) / <alpha-value>)",
          100: "rgb(var(--brand-100) / <alpha-value>)",
          50: "rgb(var(--brand-50) / <alpha-value>)",
        },
        accent: {
          500: "rgb(var(--accent-500) / <alpha-value>)",
          200: "rgb(var(--accent-200) / <alpha-value>)",
        },
      },
      fontSize: {
        fluid: "clamp(1rem, 5vw, 3rem)",
        fluidH1: "clamp(1.5rem, 4vw, 10rem)",
        fluidH2: "clamp(1rem, 2vw, 1.5rem)",
      },
      maxWidth: {
        content: "80rem",
      },
      spacing: {
        belowSidebar: "6rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
