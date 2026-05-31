import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Brain } from "lucide-react";
import { C } from "../theme";

// The Amara mark: a glowing violet brain (the product *is* the company brain).
// Drop-in replacement for the old Orb — same (size, pulse) API.
export const BrainMark: React.FC<{ size?: number; pulse?: number }> = ({ size = 120, pulse = 1 }) => {
  const frame = useCurrentFrame();
  const breathe = interpolate(Math.sin(frame / 22), [-1, 1], [0.9, 1.1]) * pulse;
  const haloOpacity = interpolate(Math.sin(frame / 22), [-1, 1], [0.42, 0.78]);

  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* outer breathing halo */}
      <div
        style={{
          position: "absolute",
          inset: -size * 0.85,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(111,91,255,${0.34 * haloOpacity}) 0%, transparent 60%)`,
          transform: `scale(${breathe})`,
        }}
      />
      {/* luminous violet core behind the brain */}
      <div
        style={{
          position: "absolute",
          inset: size * 0.1,
          borderRadius: "50%",
          background: `radial-gradient(circle at 42% 36%, rgba(168,155,255,0.55), rgba(111,91,255,0.4) 45%, transparent 72%)`,
          filter: `blur(${size * 0.04}px)`,
        }}
      />
      {/* the brain itself */}
      <Brain
        size={size * 0.92}
        color={C.violetTint}
        strokeWidth={1.4}
        style={{ position: "relative", filter: `drop-shadow(0 0 ${size * 0.16}px rgba(139,120,255,0.85))` }}
      />
    </div>
  );
};
