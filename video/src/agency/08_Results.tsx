import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { AgencyFrame } from "./AgencyFrame";
import { SmallCaps, useReveal } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

const METRICS = [
  { target: 287, label: "Hours saved", sub: "/ week" },
  { target: 3.5, decimals: 1, suffix: "×", label: "Blended ROAS", sub: "+0.4" },
  { target: 10.3, prefix: "£", suffix: "k", decimals: 1, label: "Spend managed", sub: "/ month" },
  { target: 142, label: "Approvals", sub: "/ 7 days" },
];

export const AgencyResults: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = useReveal(2, 12);

  return (
    <AgencyFrame time="6:02 PM" activeLabel="Team logged off" glowX={0.5} intensity={1.0}>
      <div style={{ ...heading, textAlign: "center" }}>
        <SmallCaps size={18} color={C.violetBright} tracking={0.3}>End of the day</SmallCaps>
        <h2 style={{ fontFamily: sans, fontSize: 60, fontWeight: 500, letterSpacing: "-0.03em", color: C.cream, margin: "14px 0 0" }}>
          The team went home at six. <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint }}>Amara kept working.</span>
        </h2>
      </div>

      <div style={{ display: "flex", gap: 54, marginTop: 60, alignItems: "flex-start", justifyContent: "center" }}>
        {METRICS.map((m, i) => {
          const start = 18 + i * 7;
          const p = interpolate(frame, [start, start + 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          const val = (m.prefix ?? "") + (m.target * p).toFixed(m.decimals ?? 0) + (m.suffix ?? "");
          const reveal = useReveal(start, 14);
          return (
            <React.Fragment key={m.label}>
              {i > 0 && <div style={{ width: 1, height: 150, background: C.lineDark, marginTop: 6 }} />}
              <div style={{ ...reveal, textAlign: "center", minWidth: 220 }}>
                <div style={{ fontFamily: sans, fontSize: 100, fontWeight: 500, color: C.cream, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{val}</div>
                <div style={{ marginTop: 16, fontFamily: sans, fontSize: 25, color: C.cream, fontWeight: 500 }}>{m.label}</div>
                <div style={{ marginTop: 5 }}><SmallCaps size={16} color={C.violetBright}>{m.sub}</SmallCaps></div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </AgencyFrame>
  );
};
