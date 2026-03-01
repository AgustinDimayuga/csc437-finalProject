import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
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
