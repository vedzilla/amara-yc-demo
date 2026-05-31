// Amara palette — mirrors tailwind.config.ts in the Next.js app.
export const C = {
  ink: "#0A0814",
  inkDeep: "#06040E",
  inkRaised: "#11101F",
  inkPanel: "#171530",

  cream: "#F0EDE6",
  creamSoft: "#F7F5EF",
  creamDim: "#C9C6BC",

  violet: "#6F5BFF",
  violetBright: "#8B78FF",
  violetDeep: "#5746E0",
  violetTint: "#A89BFF",

  lineDark: "#1F1D38",
  lineDarker: "#15142A",

  dim: "#7B7A8A",

  // Signal duotone — cohesive with the violet brand (no orange/green).
  alert: "#FF6385", // rose — urgent / problem
  positive: "#8B78FF", // violet-bright — good / done
} as const;

export const FONTS = {
  sans: "var(--font-geist), system-ui, sans-serif",
  serif: "var(--font-fraunces), Georgia, serif",
} as const;

export const FPS = 30;
