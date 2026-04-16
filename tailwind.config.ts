import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        // Tough black & white palette
        ink: {
          950: "#000000",
          900: "#0a0a0a",
          850: "#0f0f0f",
          800: "#161616",
          700: "#1e1e1e",
          600: "#2a2a2a",
          500: "#3d3d3d",
          400: "#606060",
          300: "#909090",
          200: "#c0c0c0",
          100: "#e8e8e8",
        },
        blood: {
          500: "#e11d2a",
          600: "#c11622",
          700: "#9c0e19",
        },
        gold: {
          400: "#f5c451",
          500: "#e0aa3e",
          600: "#b3851f",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        cardglow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 30px rgba(0,0,0,0.5)",
        bloodglow: "0 0 0 1px rgba(225,29,42,0.5), 0 0 30px rgba(225,29,42,0.25)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,1) 100%)",
        "hero-radial":
          "radial-gradient(ellipse at top, rgba(225,29,42,0.15) 0%, rgba(0,0,0,0) 60%)",
      },
      keyframes: {
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(225,29,42,0.6)" },
          "70%": { boxShadow: "0 0 0 12px rgba(225,29,42,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(225,29,42,0)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
