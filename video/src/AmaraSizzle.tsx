import React from "react";
import { AbsoluteFill, Audio, staticFile, interpolate } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C } from "./theme";
import "./fonts";

import { SceneOpen } from "./scenes/01_Open";
import { SceneResults } from "./scenes/06_Results";
import { SceneConnect } from "./scenes/02_Connect";
import { SceneScan } from "./scenes/03_Scan";
import { SceneApproval } from "./scenes/03_Approval";
import { SceneRefine } from "./scenes/04_Refine";
import { SceneBrain } from "./scenes/05_Brain";
import { SceneClose } from "./scenes/07_Close";

// Arc: brand flash → LEAD WITH RESULTS → then show how it works
// (connect → scan → approve) → always-on agents → it learns → close.
const D = {
  open: 72,
  results: 150,
  connect: 155,
  scan: 195,
  approval: 225,
  refine: 215,
  brain: 250,
  close: 92,
};
const TRANSITION = 12;
const NUM_TRANSITIONS = 7;

export const SIZZLE_DURATION =
  Object.values(D).reduce((a, b) => a + b, 0) - NUM_TRANSITIONS * TRANSITION;

const xfade = (
  <TransitionSeries.Transition
    timing={linearTiming({ durationInFrames: TRANSITION })}
    presentation={fade()}
  />
);

export const AmaraSizzle: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.inkDeep }}>
      {/* Music bed — fades in at the top, fades out under the close. */}
      <Audio
        src={staticFile("music.mp3")}
        volume={(f) =>
          interpolate(
            f,
            [0, 20, SIZZLE_DURATION - 45, SIZZLE_DURATION],
            [0, 0.9, 0.9, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={D.open}>
          <SceneOpen />
        </TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.results}>
          <SceneResults />
        </TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.connect}>
          <SceneConnect />
        </TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.scan}>
          <SceneScan />
        </TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.approval}>
          <SceneApproval />
        </TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.refine}>
          <SceneRefine />
        </TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.brain}>
          <SceneBrain />
        </TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.close}>
          <SceneClose />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
