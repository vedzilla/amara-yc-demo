// Renders a composition via the Remotion Node API (bypasses the CLI).
// usage: node render.mjs [CompId] [outputPath]
import { bundle } from "@remotion/bundler";
import { selectComposition, renderMedia } from "@remotion/renderer";
import path from "node:path";

const id = process.argv[2] ?? "AmaraSizzle";
const out = process.argv[3] ?? `out/${id === "AmaraSizzle" ? "amara-sizzle" : "amara-agency-day"}.mp4`;

console.log("Bundling…");
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });

console.log(`Selecting ${id}…`);
const composition = await selectComposition({ serveUrl, id });

console.log(`Rendering ${composition.durationInFrames} frames → ${out}`);
await renderMedia({
  composition,
  serveUrl,
  codec: "h264",
  crf: 16,
  concurrency: Number(process.env.CC ?? 1),
  outputLocation: out,
  onProgress: ({ progress }) => {
    process.stdout.write(`\rrender ${Math.round(progress * 100)}%   `);
  },
});
console.log(`\nDONE ${out}`);
