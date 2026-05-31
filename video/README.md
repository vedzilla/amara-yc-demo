# Amara — product sizzle reel

A ~49s Remotion sizzle reel for **Amara, the agency operating layer**. Built in the
app's own palette (violet `#6F5BFF` on ink `#0A0814`, cream text, Geist + Fraunces Italic).

## Commands

```bash
npm run dev        # open Remotion Studio to preview / scrub / edit live
npm run render     # render to out/amara-sizzle.mp4
npm run render:hi  # higher-quality render (crf 16)
npm run still      # export a poster frame
```

## Scenes (`src/scenes/`)

1. **Open** — orb + Amara wordmark + tagline
2. **Mission Control** — "The Pulse Brief" masthead, live ticker, the three headline numbers
3. **Approval** — "Meta is leaking £60/day. TikTok is starving." → cursor approves → APPROVED + +£1.2k/mo
4. **Subagents** — twenty subagents lighting up across three columns
5. **Brain** — Slack/email flowing in, the brain learning entries out
6. **Results** — 287 hrs saved · 3.5× ROAS · £10.3k managed · 142 approvals
7. **Close** — wordmark + "Run a six-figure client book with the team you already have."

Timing lives in `src/AmaraSizzle.tsx`; colors/fonts in `src/theme.ts` + `src/fonts.ts`.

## Adding music

Captions-only by design. To add a track, drop `music.mp3` into `public/` and add to
`AmaraSizzle.tsx`:

```tsx
import { Audio, staticFile } from "remotion";
// inside the returned <AbsoluteFill>:
<Audio src={staticFile("music.mp3")} />
```
