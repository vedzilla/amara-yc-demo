// Renders a single still via the Remotion Node API (CLI bypass).
import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";
import path from "node:path";

const frame = Number(process.argv[2] ?? 1140);
const out = process.argv[3] ?? "out/still.png";

const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: "AmaraSizzle" });
await renderStill({ composition, serveUrl, frame, output: out, overwrite: true });
console.log("STILL", out, "@", frame);
