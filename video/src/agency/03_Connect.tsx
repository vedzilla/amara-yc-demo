import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { AgencyFrame } from "./AgencyFrame";
import { BrainMark } from "../components/BrainMark";
import { SmallCaps, useReveal } from "../components/ui";
import { C } from "../theme";
import { sans } from "../fonts";

const CH = [
  { name: "Google Ads", tone: "#4285F4" },
  { name: "Meta Ads", tone: "#0866FF" },
  { name: "TikTok Ads", tone: "#FF2D55" },
  { name: "LinkedIn", tone: "#0A66C2" },
  { name: "Email", tone: "#F0A150" },
  { name: "SEO", tone: "#52C896" },
];

// Centre of the content constellation (relative to the 1740x560 stage).
const CX = 870;
const CY = 280;
const RX = 560;
const RY = 210;
const NODES = CH.map((c, i) => {
  const theta = ((-90 + i * 60) * Math.PI) / 180;
  return { ...c, x: CX + RX * Math.cos(theta), y: CY + RY * Math.sin(theta), at: 18 + i * 8 };
});

export const AgencyConnect: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const heading = useReveal(2, 12);
  const brainIn = spring({ frame: frame - 10, fps, config: { damping: 200, mass: 0.9 } });
  const connected = NODES.filter((n) => frame >= n.at + 8).length;
  const footer = useReveal(74, 14);

  return (
    <AgencyFrame time="10:02 AM" active="MW" activeLabel="Marcus · plugging in the accounts" glowX={0.5} intensity={0.95}>
      <div style={{ ...heading, textAlign: "center", marginBottom: 8 }}>
        <SmallCaps size={18} color={C.violetBright} tracking={0.28}>One click, every channel</SmallCaps>
      </div>
      <div style={{ position: "relative", height: 560 }}>
        <svg width={1740} height={560} style={{ position: "absolute", inset: 0 }}>
          {NODES.map((n) => {
            const len = Math.hypot(n.x - CX, n.y - CY);
            const p = interpolate(frame, [n.at, n.at + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
            return <line key={n.name} x1={CX} y1={CY} x2={n.x} y2={n.y} stroke={n.tone} strokeWidth={1.6} strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.5 * p} />;
          })}
        </svg>

        {NODES.map((n) => {
          const p = spring({ frame: frame - n.at, fps, config: { damping: 200, mass: 0.5 } });
          const isOn = frame >= n.at + 8;
          return (
            <div key={n.name} style={{ position: "absolute", left: n.x, top: n.y, transform: `translate(-50%,-50%) scale(${interpolate(p, [0, 1], [0.7, 1])})`, opacity: p, display: "flex", alignItems: "center", gap: 10, padding: "11px 18px", borderRadius: 999, border: `1px solid ${isOn ? n.tone : C.lineDark}`, background: "rgba(17,16,31,0.92)", boxShadow: isOn ? `0 0 22px ${n.tone}44` : "none", whiteSpace: "nowrap" }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: n.tone, boxShadow: `0 0 10px ${n.tone}` }} />
              <span style={{ fontFamily: sans, fontSize: 20, color: C.cream, fontWeight: 500 }}>{n.name}</span>
              {isOn && <span style={{ color: C.positive, fontSize: 14 }}>✓</span>}
            </div>
          );
        })}

        <div style={{ position: "absolute", left: CX, top: CY, transform: `translate(-50%,-50%) scale(${interpolate(brainIn, [0, 1], [0.4, 1])})`, opacity: brainIn }}>
          <BrainMark size={140} />
        </div>
      </div>
      <div style={{ ...footer, textAlign: "center" }}>
        <span style={{ fontFamily: sans, fontSize: 34, fontWeight: 500, color: C.cream }}>
          {Math.round((connected / NODES.length) * 26)} accounts · 6 clients <span style={{ color: C.positive }}>connected</span>
        </span>
      </div>
    </AgencyFrame>
  );
};
