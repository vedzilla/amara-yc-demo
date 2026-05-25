import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warmed ink — pulled away from navy/violet, toward dark printer's black
        ink: {
          DEFAULT: "#0E0C09",
          deep: "#080605",
          raised: "#16130E",
          panel: "#1E1A14",
        },
        // Parchment / unbleached newsprint, not generic off-white
        cream: {
          DEFAULT: "#EFE7D2",
          soft: "#F5EEDB",
          dim: "#C8C0AB",
        },
        // "violet" is kept as the class name for compatibility, but tuned
        // to a bespoke vermilion / burnt-rust (Penguin Classics red, FT Pink-ish,
        // Pentagram annual report territory). Decidedly NOT AI-startup purple.
        violet: {
          DEFAULT: "#C95436",
          bright: "#E0683F",
          deep: "#A33E1F",
          tint: "#E89878",
          glow: "rgba(201, 84, 54, 0.22)",
        },
        line: {
          dark: "#251F17",
          darker: "#1A1610",
          cream: "#D6CFB8",
        },
        dim: {
          DEFAULT: "#857E6E",
          cream: "#6E6757",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      letterSpacing: {
        micro: "0.14em",
        wider: "0.08em",
      },
      animation: {
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
        "orb-glow": "orb-glow 4s ease-in-out infinite",
        "subtle-float": "subtle-float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.4s linear infinite",
        "ping-soft": "ping-soft 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        "orb-glow": {
          "0%, 100%": {
            boxShadow:
              "0 0 50px 0 rgba(201, 84, 54, 0.35), 0 0 110px 0 rgba(201, 84, 54, 0.12)",
          },
          "50%": {
            boxShadow:
              "0 0 80px 10px rgba(201, 84, 54, 0.5), 0 0 170px 0 rgba(201, 84, 54, 0.2)",
          },
        },
        "subtle-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "ping-soft": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      backgroundImage: {
        "violet-grain":
          "radial-gradient(ellipse 80% 60% at 70% 0%, rgba(201, 84, 54, 0.18), transparent 60%)",
        "cream-grain":
          "radial-gradient(ellipse 80% 60% at 30% 0%, rgba(201, 84, 54, 0.08), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
