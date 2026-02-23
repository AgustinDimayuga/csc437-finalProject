import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        fluid: "clamp(1rem, 5vw, 3rem)",
      },
    },
  },
  plugins: [],
} satisfies Config;
