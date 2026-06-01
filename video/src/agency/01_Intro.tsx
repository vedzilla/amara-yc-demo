import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { AgencyFrame } from "./AgencyFrame";
import { BrainMark } from "../components/BrainMark";
import { useReveal } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

export const AgencyIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brainIn = spring({ frame, fps, config: { damping: 200, mass: 0.9 } });
  const title = useReveal(14, 18);
  const sub = useReveal(34, 16);

  return (
    <AgencyFrame time="9:02 AM" showChrome={false}>
      <div style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", textAlign: "center" }}>
        <div style={{ opacity: brainIn, transform: `scale(${interpolate(brainIn, [0, 1], [0.5, 1])})`, marginBottom: 34 }}>
          <BrainMark size={130} />
        </div>
        <h1 style={{ ...title, fontFamily: sans, fontSize: 92, fontWeight: 500, letterSpacing: "-0.03em", color: C.cream, margin: 0 }}>
          A day with <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint }}>Amara.</span>
        </h1>
        <div style={{ ...sub, marginTop: 22, fontFamily: sans, fontSize: 27, color: "rgba(240,237,230,0.8)", fontWeight: 300 }}>
          Six clients. One small team. One operating layer.
        </div>
      </div>
    </AgencyFrame>
  );
};
