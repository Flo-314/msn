import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        darkLabel: "#0b2194",
        msnGray: "#A3A3A3",
      },

      borderColor: {
        inputGray: "#EFF5FF",
        dark: "#ACC4EA",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        /* deprecated clases*/
        msnGray: "#EFF5FF",
        msnLightGray: "#DFE8F6",
        msnDarkGray: "#ACC4EA",
        "blue-dark": "#16243B",
        "gray-dark": "#455775",
        /* */

        gray: "#DFE8F6",
        "gray-light": "#F3EFFF",
        winBlue: "#0054E3",
        "negative-dark": "#DD5226",
        negative: "#FF6B2B",
        positive: "#00CC52",
        "positive-dark": "#239E7E",
      },
    },
  },
  plugins: [],
} satisfies Config;
