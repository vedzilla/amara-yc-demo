import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";
import path from "node:path";

// usage: node stills.mjs <CompId> <frame> [frame...]
const compId = process.argv[2];
const frames = process.argv.slice(3).map(Number);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: compId });
for (const frame of frames) {
  const out = `out/diag-${compId}-${frame}.png`;
  await renderStill({ composition, serveUrl, frame, output: out, overwrite: true });
  console.log("STILL", out);
}
