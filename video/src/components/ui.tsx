import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { C } from "../theme";
import { sans } from "../fonts";

// Spring-based reveal: rise + fade. Returns transform/opacity style.
export const useReveal = (delay = 0, distance = 24, damping = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping, mass: 0.7 } });
  return {
    opacity: s,
    transform: `translateY(${(1 - s) * distance}px)`,
  };
};

// Fade only, linear window.
export const useFade = (start: number, len = 12) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + len], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const SmallCaps: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
  tracking?: number;
  style?: React.CSSProperties;
}> = ({ children, color = C.dim, size = 15, tracking = 0.14, style }) => (
  <span
    style={{
      fontFamily: sans,
      fontSize: size,
      letterSpacing: `${tracking}em`,
      textTransform: "uppercase",
      color,
      fontWeight: 500,
      ...style,
    }}
  >
    {children}
  </span>
);

// A thin rule with a centered diamond — the app's editorial divider.
export const DiamondRule: React.FC<{ width?: number | string; label?: string }> = ({
  width = 220,
  label,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, width }}>
    <div style={{ flex: 1, height: 1, background: C.lineDark }} />
    <span style={{ color: C.violet, fontSize: 9, transform: "rotate(45deg)" }}>◇</span>
    {label ? <SmallCaps size={10} color={C.dim}>{label}</SmallCaps> : null}
    {label ? <span style={{ color: C.violet, fontSize: 9, transform: "rotate(45deg)" }}>◇</span> : null}
    <div style={{ flex: 1, height: 1, background: C.lineDark }} />
  </div>
);
