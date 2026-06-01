import React from "react";
import { AbsoluteFill, Audio, staticFile, interpolate } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C } from "./theme";
import "./fonts";

import { AgencyIntro } from "./agency/01_Intro";
import { AgencyBrief } from "./agency/02_Brief";
import { AgencyConnect } from "./agency/03_Connect";
import { AgencyReview } from "./agency/04_Review";
import { AgencyApprove } from "./agency/05_Approve";
import { AgencyRefine } from "./agency/06_Refine";
import { AgencyLearn } from "./agency/07_Learn";
import { AgencyResults } from "./agency/08_Results";
import { AgencyClose } from "./agency/09_Close";

// Day-in-the-life: the team works through the day, handing work to Amara
// and getting it back. Clock + roster are the throughline.
const D = {
  intro: 90,
  brief: 160,
  connect: 150,
  review: 175,
  approve: 200,
  refine: 190,
  learn: 165,
  results: 150,
  close: 95,
};
const TRANSITION = 12;
const NUM_TRANSITIONS = 8;

export const AGENCY_DURATION = Object.values(D).reduce((a, b) => a + b, 0) - NUM_TRANSITIONS * TRANSITION;

const xfade = (
  <TransitionSeries.Transition timing={linearTiming({ durationInFrames: TRANSITION })} presentation={fade()} />
);

export const AmaraAgencyDay: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.inkDeep }}>
      <Audio
        src={staticFile("music.mp3")}
        volume={(f) =>
          interpolate(f, [0, 20, AGENCY_DURATION - 45, AGENCY_DURATION], [0, 0.9, 0.9, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={D.intro}><AgencyIntro /></TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.brief}><AgencyBrief /></TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.connect}><AgencyConnect /></TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.review}><AgencyReview /></TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.approve}><AgencyApprove /></TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.refine}><AgencyRefine /></TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.learn}><AgencyLearn /></TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.results}><AgencyResults /></TransitionSeries.Sequence>
        {xfade}
        <TransitionSeries.Sequence durationInFrames={D.close}><AgencyClose /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
