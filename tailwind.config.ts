import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fireworks: "fireworks 3s ease-out forwards",
      },
      keyframes: {
        fireworks: {
          "0%": {
            opacity: "1",
            transform: "scale(0) translate(-50%, -50%)",
          },
          "50%": {
            opacity: "0.6",
            transform: "scale(3) translate(-50%, -50%)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(5) translate(-50%, -50%)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
