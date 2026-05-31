import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C } from "../theme";

// The signature Amara backdrop: deep ink, a violet radial bloom drifting at the
// top, fine film grain, and a vignette to seat everything in the dark.
export const Background: React.FC<{
  glowX?: number; // 0..1 horizontal position of the bloom
  intensity?: number; // multiplier on bloom strength
  children?: React.ReactNode;
}> = ({ glowX = 0.68, intensity = 1, children }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 3; // slow horizontal sway, in %
  const breathe = interpolate(Math.sin(frame / 50), [-1, 1], [0.82, 1.0]) * intensity;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      {/* violet radial bloom */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 75% 60% at ${glowX * 100 + drift}% -8%, rgba(111,91,255,${0.26 * breathe}), transparent 58%)`,
        }}
      />
      {/* secondary low bloom for depth */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 60% 50% at 22% 115%, rgba(87,70,224,${0.14 * breathe}), transparent 60%)`,
        }}
      />
      {/* film grain */}
      <AbsoluteFill style={{ opacity: 0.06, mixBlendMode: "overlay" }}>
        <svg width="100%" height="100%">
          <filter id="amara-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#amara-grain)" />
        </svg>
      </AbsoluteFill>
      {/* vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 45%, transparent 55%, rgba(6,4,14,0.85) 100%)",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
