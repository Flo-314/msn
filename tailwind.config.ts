import type {Config} from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/common/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "window-header-gradient":
          "linear-gradient(#0058EE 0%, #3593FF 5%, #288EFF 7%, #127DFF 9%, #036FFC 11%, #0262EE 15%, #0057E5 20%, #0054E3 25%, #0055EB 50%, #005BF5 65%, #026AFE 75%, #0062EF 85%, #0052D6 90%, #0040AB 93%, #003092 100%)",
        "normal-gradient": "linear-gradient(to bottom, #CBDFFF 0%, #E2EDFF 18%, #EFF5FF 100%)",
        "threed-gradient": "linear-gradient(to bottom, #EFF5FF 0%, #E2EDFF 87%, #CBDFFF 100%)",
        "dark-gradient": "linear-gradient(to bottom, #CCDFFF 0%, #92B1E6 100%)",
        "backforth-gradient":
          "linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(208, 221, 240, 1) 50%, rgba(255, 255, 255, 1) 100%)",
      },
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
        blueText: "#00008C",
        gray: "#DFE8F6",
        "gray-light": "#F3EFFF",
        winBlue: "#0831d9",
        "negative-dark": "#DD5226",
        negative: "#FF6B2B",
        positive: "#00CC52",
        "positive-dark": "#239E7E",
        input: "#a0a0a0",
        blueToast: {
          100: "#A6B4CF",
          200: "#728EB8",
          300: "#4E6BA0",
        },
      },
      height: {
        xpButton: "21px",
      },
      width: {
        xpButton: "21px",
      },
      borderWidth: {
        "0.5": "0.5px",
        "1": "1px",
      },
      fontSize: {
        xxs: ".625rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
