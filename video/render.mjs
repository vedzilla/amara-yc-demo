// Renders the sizzle via the Remotion Node API (bypasses the CLI).
import { bundle } from "@remotion/bundler";
import { selectComposition, renderMedia } from "@remotion/renderer";
import path from "node:path";

const entryPoint = path.resolve("src/index.ts");
console.log("Bundling…");
const serveUrl = await bundle({ entryPoint });

console.log("Selecting composition…");
const composition = await selectComposition({ serveUrl, id: "AmaraSizzle" });

console.log(`Rendering ${composition.durationInFrames} frames…`);
await renderMedia({
  composition,
  serveUrl,
  codec: "h264",
  crf: 16,
  concurrency: 2,
  outputLocation: "out/amara-sizzle.mp4",
  onProgress: ({ progress }) => {
    process.stdout.write(`\rrender ${Math.round(progress * 100)}%   `);
  },
});
console.log("\nDONE out/amara-sizzle.mp4");
