import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { AgencyFrame } from "./AgencyFrame";
import { BrainMark } from "../components/BrainMark";
import { Roster } from "./Avatar";
import { useReveal } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

export const AgencyClose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ENTER = 14;
  const brainIn = spring({ frame: frame - ENTER, fps, config: { damping: 200, mass: 0.9 } });
  const mark = spring({ frame: frame - ENTER - 10, fps, config: { damping: 200 } });
  const tagline = spring({ frame: frame - ENTER - 22, fps, config: { damping: 200 } });
  const roster = useReveal(ENTER + 34, 14);

  return (
    <AgencyFrame time="" showChrome={false} glowX={0.5} intensity={1.2}>
      <div style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", textAlign: "center" }}>
        <div style={{ opacity: brainIn, transform: `scale(${interpolate(brainIn, [0, 1], [0.6, 1])})`, marginBottom: 34 }}>
          <BrainMark size={124} />
        </div>
        <div style={{ opacity: mark, transform: `translateY(${(1 - mark) * 14}px)` }}>
          <span style={{ fontFamily: sans, fontSize: 96, fontWeight: 500, letterSpacing: "-0.03em", color: C.cream }}>Amara</span>
        </div>
        <div style={{ opacity: tagline, transform: `translateY(${(1 - tagline) * 12}px)`, marginTop: 16, fontFamily: serif, fontStyle: "italic", fontSize: 32, color: C.violetTint }}>
          the agency operating layer
        </div>
        <div style={{ ...roster, marginTop: 44 }}>
          <Roster size={42} />
        </div>
      </div>
    </AgencyFrame>
  );
};
