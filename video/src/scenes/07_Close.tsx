import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Background } from "../components/Background";
import { BrainMark } from "../components/BrainMark";
import { SmallCaps } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

export const SceneClose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hold all reveals until after the 12-frame crossfade so the close brain
  // never double-exposes with the brain-scene brain during the transition.
  const ENTER = 14;
  const brainIn = spring({ frame: frame - ENTER, fps, config: { damping: 200, mass: 0.9 } });
  const mark = spring({ frame: frame - ENTER - 10, fps, config: { damping: 200 } });
  const tagline = spring({ frame: frame - ENTER - 24, fps, config: { damping: 200 } });

  return (
    <Background glowX={0.5} intensity={1.2}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ opacity: brainIn, transform: `scale(${interpolate(brainIn, [0, 1], [0.6, 1])})`, marginBottom: 40 }}>
          <BrainMark size={132} />
        </div>

        <div style={{ opacity: mark, transform: `translateY(${(1 - mark) * 16}px)` }}>
          <span style={{ fontFamily: sans, fontSize: 104, fontWeight: 500, letterSpacing: "-0.03em", color: C.cream }}>Amara</span>
        </div>

        <div style={{ opacity: tagline, transform: `translateY(${(1 - tagline) * 12}px)`, marginTop: 18, fontFamily: serif, fontStyle: "italic", fontSize: 34, color: C.violetTint }}>
          the agency operating layer
        </div>
      </AbsoluteFill>
    </Background>
  );
};
