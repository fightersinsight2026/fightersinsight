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
        // Fight culture palette — dark, premium, sharp
        ink: {
          950: "#070708",
          900: "#0c0d10",
          850: "#111317",
          800: "#171a20",
          700: "#1f232b",
          600: "#2a2f39",
          500: "#3a4150",
          400: "#5b6270",
          300: "#8b93a3",
          200: "#c3c8d2",
          100: "#e6e8ee",
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
        cardglow: "0 0 0 1px rgba(255,255,255,0.04), 0 8px 30px rgba(0,0,0,0.4)",
        bloodglow: "0 0 0 1px rgba(225,29,42,0.5), 0 0 30px rgba(225,29,42,0.25)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(7,7,8,0) 0%, rgba(7,7,8,0.6) 60%, rgba(7,7,8,1) 100%)",
        "hero-radial":
          "radial-gradient(ellipse at top, rgba(225,29,42,0.18) 0%, rgba(7,7,8,0) 60%)",
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
