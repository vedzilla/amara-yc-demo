import { loadFont as loadGeist } from "@remotion/google-fonts/Geist";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";

// Geist — body / UI typography (matches the app's --font-geist-sans).
const geist = loadGeist("normal", {
  weights: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

// Fraunces — editorial display, used italic for emphasis (--font-fraunces).
const frauncesRoman = loadFraunces("normal", {
  weights: ["300", "400", "500", "600"],
  subsets: ["latin"],
});
loadFraunces("italic", {
  weights: ["300", "400", "500"],
  subsets: ["latin"],
});

export const sans = geist.fontFamily;
export const serif = frauncesRoman.fontFamily;
