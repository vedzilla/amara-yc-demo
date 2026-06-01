import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { AgencyFrame } from "./AgencyFrame";
import { SmallCaps, useReveal } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

export const AgencyApprove: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const heading = useReveal(2, 12);
  const cardIn = spring({ frame: frame - 10, fps, config: { damping: 200, mass: 0.8 } });

  const curX = interpolate(frame, [70, 108], [1500, 1230], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const curY = interpolate(frame, [70, 108], [430, 560], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const curOp = interpolate(frame, [62, 72, 124, 134], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pressed = frame >= 110 && frame <= 118;
  const approved = frame >= 116;
  const stamp = spring({ frame: frame - 116, fps, config: { damping: 12, mass: 0.8, stiffness: 140 } });
  const impact = useReveal(126, 16);

  return (
    <AgencyFrame time="11:00 AM" active="MW" activeLabel="Marcus · makes the call" glowX={0.72}>
      <div style={{ display: "flex", gap: 70, alignItems: "center" }}>
        <div style={{ flex: 1.1, maxWidth: 760 }}>
          <div style={{ ...heading }}>
            <SmallCaps size={18} color={C.alert} tracking={0.2}>Decide now · the lead</SmallCaps>
            <h2 style={{ fontFamily: sans, fontSize: 66, fontWeight: 500, lineHeight: 1.0, letterSpacing: "-0.03em", color: C.cream, margin: "16px 0 0" }}>
              Meta is leaking <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint, whiteSpace: "nowrap" }}>£60/day</span>.
            </h2>
            <p style={{ fontFamily: sans, fontSize: 24, lineHeight: 1.5, color: "rgba(240,237,230,0.85)", marginTop: 22, fontWeight: 300, maxWidth: 640 }}>
              Amara drafted the fix. <span style={{ color: C.cream, fontWeight: 500 }}>Marcus reads it in ten seconds and approves.</span>
            </p>
          </div>
        </div>

        <div style={{ flex: 0.9, maxWidth: 520, opacity: cardIn, transform: `translateX(${(1 - cardIn) * 36}px)` }}>
          <div style={{ position: "relative", border: `1px solid ${C.lineDark}`, borderRadius: 16, background: "rgba(17,16,31,0.72)", padding: 34, boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
            <SmallCaps size={15} color={C.violetBright}>Budget shift · Olive &amp; Oak</SmallCaps>
            <div style={{ marginTop: 18, fontFamily: sans, fontSize: 22, color: C.creamDim }}>£60/day Meta</div>
            <div style={{ color: C.violet, fontSize: 20, margin: "4px 0" }}>↓</div>
            <div style={{ fontFamily: sans, fontSize: 30, fontWeight: 500, color: C.cream }}>£30 Meta · £90 TikTok</div>
            <div style={{ marginTop: 26, height: 60, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: sans, fontSize: 19, fontWeight: 600, color: C.cream, background: approved ? C.violetBright : C.violet, boxShadow: approved ? "0 0 40px rgba(139,120,255,0.6)" : "0 0 30px rgba(111,91,255,0.4)", transform: `scale(${pressed ? 0.96 : 1})` }}>
              {approved ? "✓  Approved by Marcus" : "✦  Approve"}
            </div>
            {approved && (
              <div style={{ position: "absolute", top: 26, right: 26, transform: `scale(${interpolate(stamp, [0, 1], [1.6, 1])}) rotate(-12deg)`, opacity: interpolate(stamp, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }), border: `2.5px solid ${C.violetBright}`, color: C.violetBright, borderRadius: 8, padding: "6px 14px", fontFamily: sans, fontWeight: 700, letterSpacing: "0.14em", fontSize: 15 }}>
                APPROVED
              </div>
            )}
          </div>
          <div style={{ ...impact, marginTop: 20, display: "flex", alignItems: "baseline", gap: 12, justifyContent: "flex-end" }}>
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 46, color: C.positive }}>+£1.2k</span>
            <SmallCaps size={16} color={C.creamDim}>revenue / month</SmallCaps>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${curX}px, ${curY}px)`, opacity: curOp, pointerEvents: "none" }}>
        {pressed && <div style={{ position: "absolute", left: -14, top: -14, width: 44, height: 44, borderRadius: "50%", border: `2px solid ${C.cream}`, opacity: 0.5 }} />}
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
          <path d="M5 3 L5 19 L9 15 L12 21 L14.5 20 L11.5 14 L17 14 Z" fill={C.cream} stroke={C.ink} strokeWidth="1" />
        </svg>
      </div>
    </AgencyFrame>
  );
};
