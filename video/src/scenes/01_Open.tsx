import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Background } from "../components/Background";
import { BrainMark } from "../components/BrainMark";
import { C } from "../theme";
import { sans, serif } from "../fonts";

const WORD = "Amara".split("");

export const SceneOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainIn = spring({ frame, fps, config: { damping: 200, mass: 0.9 } });
  const tagline = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const rule = interpolate(frame, [30, 50], [0, 340], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <Background glowX={0.5} intensity={1.15}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ opacity: brainIn, transform: `scale(${interpolate(brainIn, [0, 1], [0.5, 1])})`, marginBottom: 40 }}>
          <BrainMark size={150} />
        </div>

        {/* wordmark */}
        <div style={{ display: "flex" }}>
          {WORD.map((ch, i) => {
            const s = spring({ frame: frame - 12 - i * 3, fps, config: { damping: 200, mass: 0.5 } });
            return (
              <span
                key={i}
                style={{
                  fontFamily: sans,
                  fontSize: 116,
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  color: C.cream,
                  opacity: s,
                  transform: `translateY(${(1 - s) * 24}px)`,
                  display: "inline-block",
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>

        <div style={{ width: rule, height: 1, background: `linear-gradient(90deg, transparent, ${C.violet}, transparent)`, marginTop: 28 }} />

        <div
          style={{
            opacity: tagline,
            transform: `translateY(${(1 - tagline) * 12}px)`,
            marginTop: 24,
            fontFamily: serif,
            fontStyle: "italic",
            fontSize: 31,
            color: C.violetTint,
          }}
        >
          the agency operating layer
        </div>
      </AbsoluteFill>
    </Background>
  );
};
