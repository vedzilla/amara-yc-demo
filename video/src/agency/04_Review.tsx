import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { AgencyFrame } from "./AgencyFrame";
import { SmallCaps, useReveal } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

const INSIGHTS = [
  { tone: C.alert, tag: "Decide now", title: "Meta leaking £60/day. TikTok starving.", sub: "Shift £30/day → TikTok · 91% sure" },
  { tone: C.violetBright, tag: "Pattern", title: "Founder-POV creative lifts 2.7×", sub: "Across 4 of 6 clients" },
  { tone: C.positive, tag: "Audit", title: "Sundial pixel double-firing +18%", sub: "Fix drafted" },
];

export const AgencyReview: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = useReveal(2, 12);
  const campaigns = Math.round(interpolate(frame, [10, 70], [0, 1284], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  return (
    <AgencyFrame time="10:30 AM" activeLabel="Team in standup · Amara working" glowX={0.55} intensity={0.9}>
      <div style={{ ...heading, marginBottom: 8 }}>
        <SmallCaps size={18} color={C.violetBright} tracking={0.28}>While the team&apos;s in standup</SmallCaps>
        <h2 style={{ fontFamily: sans, fontSize: 52, fontWeight: 500, letterSpacing: "-0.03em", color: C.cream, margin: "12px 0 0" }}>
          Amara read <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint }}>everything</span> and flagged what matters.
        </h2>
        <div style={{ marginTop: 10 }}>
          <SmallCaps size={16} color={C.dim}>{frame >= 70 ? "26 channels · 1,284 campaigns reviewed" : `${campaigns.toLocaleString()} campaigns reviewed`}</SmallCaps>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 26, maxWidth: 1160 }}>
        {INSIGHTS.map((ins, i) => {
          const r = useReveal(40 + i * 16, 20);
          return (
            <div key={i} style={{ ...r, padding: "20px 26px", borderRadius: 14, border: `1px solid ${C.lineDark}`, borderLeft: `3px solid ${ins.tone}`, background: "rgba(17,16,31,0.85)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
              <div>
                <SmallCaps size={14} color={ins.tone}>{ins.tag}</SmallCaps>
                <div style={{ fontFamily: sans, fontSize: 28, fontWeight: 500, color: C.cream, marginTop: 5 }}>{ins.title}</div>
              </div>
              <div style={{ fontFamily: sans, fontSize: 18, color: C.creamDim, textAlign: "right", flexShrink: 0, maxWidth: 320 }}>{ins.sub}</div>
            </div>
          );
        })}
      </div>
    </AgencyFrame>
  );
};
