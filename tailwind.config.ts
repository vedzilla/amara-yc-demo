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
        ink: {
          DEFAULT: "#0A0814",
          deep: "#06040E",
          raised: "#11101F",
          panel: "#171530",
        },
        cream: {
          DEFAULT: "#F0EDE6",
          soft: "#F7F5EF",
          dim: "#C9C6BC",
        },
        violet: {
          DEFAULT: "#6F5BFF",
          bright: "#8B78FF",
          deep: "#5746E0",
          tint: "#A89BFF",
          glow: "rgba(111, 91, 255, 0.18)",
        },
        line: {
          dark: "#1F1D38",
          darker: "#15142A",
          cream: "#D8D5CC",
        },
        dim: {
          DEFAULT: "#7B7A8A",
          cream: "#6A6A75",
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
              "0 0 60px 0 rgba(111, 91, 255, 0.4), 0 0 120px 0 rgba(111, 91, 255, 0.15)",
          },
          "50%": {
            boxShadow:
              "0 0 90px 10px rgba(111, 91, 255, 0.6), 0 0 180px 0 rgba(111, 91, 255, 0.25)",
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
          "radial-gradient(ellipse 80% 60% at 70% 0%, rgba(111, 91, 255, 0.18), transparent 60%)",
        "cream-grain":
          "radial-gradient(ellipse 80% 60% at 30% 0%, rgba(111, 91, 255, 0.08), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
