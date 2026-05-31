import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { BrainMark } from "../components/BrainMark";
import { SmallCaps, useReveal } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

const CHANNELS = [
  { name: "Google Ads", tone: "#4285F4" },
  { name: "Meta Ads", tone: "#0866FF" },
  { name: "TikTok Ads", tone: "#FF2D55" },
  { name: "LinkedIn", tone: "#0A66C2" },
  { name: "Programmatic", tone: "#8B78FF" },
  { name: "Email", tone: "#F0A150" },
  { name: "SEO", tone: "#52C896" },
  { name: "Landing", tone: "#C896F0" },
];

const CX = 960;
const CY = 560;
const RX = 580;
const RY = 330;

const NODES = CHANNELS.map((ch, i) => {
  const theta = ((-90 + i * 45) * Math.PI) / 180;
  return {
    ...ch,
    x: CX + RX * Math.cos(theta),
    y: CY + RY * Math.sin(theta),
    connectAt: 34 + i * 7,
  };
});

export const SceneConnect: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const step = useReveal(2, 12);

  const clickAt = 22;
  const pressed = frame >= clickAt && frame <= clickAt + 7;
  const btnGone = interpolate(frame, [clickAt + 3, clickAt + 13], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const brainIn = spring({ frame: frame - 26, fps, config: { damping: 200, mass: 0.9 } });

  const curX = interpolate(frame, [0, clickAt], [1180, CX + 14], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const curY = interpolate(frame, [0, clickAt], [780, CY + 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const curOpacity = interpolate(frame, [0, 6, 30, 40], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const connectedNodes = NODES.filter((n) => frame >= n.connectAt + 8).length;
  const accounts = Math.round((connectedNodes / NODES.length) * 26);
  const footer = useReveal(92, 14);

  return (
    <Background glowX={0.5} intensity={0.95}>
      <AbsoluteFill style={{ padding: "70px 120px" }}>
        <div style={step}>
          <SmallCaps size={19} color={C.violetBright} tracking={0.3}>Step one · Connect</SmallCaps>
          <h2 style={{ fontFamily: sans, fontSize: 60, fontWeight: 500, letterSpacing: "-0.03em", color: C.cream, margin: "14px 0 0" }}>
            Plug Amara into{" "}
            <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint }}>every channel.</span>
          </h2>
        </div>
      </AbsoluteFill>

      {/* connection lines */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {NODES.map((n) => {
          const len = Math.hypot(n.x - CX, n.y - CY);
          const p = interpolate(frame, [n.connectAt, n.connectAt + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          return (
            <line key={n.name} x1={CX} y1={CY} x2={n.x} y2={n.y} stroke={n.tone} strokeWidth={1.6} strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.55 * p} />
          );
        })}
      </svg>

      {/* channel nodes */}
      {NODES.map((n) => {
        const p = spring({ frame: frame - n.connectAt, fps, config: { damping: 200, mass: 0.5 } });
        const connected = frame >= n.connectAt + 8;
        return (
          <div
            key={n.name}
            style={{
              position: "absolute",
              left: n.x,
              top: n.y,
              transform: `translate(-50%, -50%) scale(${interpolate(p, [0, 1], [0.7, 1])})`,
              opacity: p,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "11px 18px",
              borderRadius: 999,
              border: `1px solid ${connected ? n.tone : C.lineDark}`,
              background: "rgba(17,16,31,0.92)",
              boxShadow: connected ? `0 0 22px ${n.tone}44` : "none",
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: n.tone, boxShadow: `0 0 10px ${n.tone}` }} />
            <span style={{ fontFamily: sans, fontSize: 21, color: C.cream, fontWeight: 500 }}>{n.name}</span>
            {connected && <span style={{ color: C.positive, fontSize: 14 }}>✓</span>}
          </div>
        );
      })}

      {/* central brain */}
      <div style={{ position: "absolute", left: CX, top: CY, transform: `translate(-50%, -50%) scale(${interpolate(brainIn, [0, 1], [0.4, 1])})`, opacity: brainIn }}>
        <BrainMark size={150} />
      </div>

      {/* connect button (pre-click) */}
      {btnGone > 0.01 && (
        <div
          style={{
            position: "absolute",
            left: CX,
            top: CY,
            transform: `translate(-50%, -50%) scale(${pressed ? 0.96 : 1})`,
            opacity: btnGone,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "20px 38px",
            borderRadius: 14,
            background: C.violet,
            boxShadow: "0 0 40px rgba(111,91,255,0.5)",
            fontFamily: sans,
            fontSize: 24,
            fontWeight: 600,
            color: C.cream,
            whiteSpace: "nowrap",
          }}
        >
          ✦ Connect your channels
        </div>
      )}

      {/* counter + footer */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 70 }}>
        <div style={{ ...footer, textAlign: "center" }}>
          <div style={{ fontFamily: sans, fontSize: 42, fontWeight: 500, color: C.cream, fontVariantNumeric: "tabular-nums" }}>
            {accounts} accounts · 6 clients{" "}
            <span style={{ color: C.positive, fontSize: 30 }}>connected</span>
          </div>
          <div style={{ marginTop: 10 }}>
            <SmallCaps size={18} color={C.dim}>Live in seconds</SmallCaps>
          </div>
        </div>
      </AbsoluteFill>

      {/* cursor */}
      <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${curX}px, ${curY}px)`, opacity: curOpacity }}>
        {pressed && <div style={{ position: "absolute", left: -16, top: -16, width: 46, height: 46, borderRadius: "50%", border: `2px solid ${C.cream}`, opacity: 0.5 }} />}
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))" }}>
          <path d="M5 3 L5 19 L9 15 L12 21 L14.5 20 L11.5 14 L17 14 Z" fill={C.cream} stroke={C.ink} strokeWidth="1" />
        </svg>
      </div>
    </Background>
  );
};
