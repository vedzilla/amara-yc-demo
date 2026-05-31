import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { SmallCaps, useReveal } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

type Metric = { target: number; prefix?: string; suffix?: string; decimals?: number; label: string; sub: string };

const METRICS: Metric[] = [
  { target: 287, label: "Hours saved", sub: "/ week", suffix: "" },
  { target: 3.5, decimals: 1, suffix: "×", label: "Blended ROAS", sub: "+0.4" },
  { target: 10.3, prefix: "£", suffix: "k", decimals: 1, label: "Spend managed", sub: "/ month" },
  { target: 142, label: "Approvals", sub: "/ 7 days" },
];

// Opens the film: lead with the payoff, then point into "here's how".
export const SceneResults: React.FC = () => {
  const frame = useCurrentFrame();
  const title = useReveal(2, 12);

  return (
    <Background glowX={0.5} intensity={1.05}>
      <AbsoluteFill style={{ padding: "96px 120px", justifyContent: "center", alignItems: "center" }}>
        <div style={{ ...title, textAlign: "center" }}>
          <SmallCaps size={19} color={C.violetBright} tracking={0.3}>Powered by Amara</SmallCaps>
          <h2 style={{ fontFamily: sans, fontSize: 74, fontWeight: 500, letterSpacing: "-0.03em", color: C.cream, margin: "16px 0 0", lineHeight: 1.04 }}>
            One operator.{" "}
            <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint }}>The whole agency.</span>
          </h2>
        </div>

        <div style={{ display: "flex", gap: 60, marginTop: 72, alignItems: "flex-start" }}>
          {METRICS.map((m, i) => {
            const start = 16 + i * 7;
            const p = interpolate(frame, [start, start + 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
            const val = m.target * p;
            const display = (m.prefix ?? "") + val.toFixed(m.decimals ?? 0) + (m.suffix ?? "");
            const reveal = useReveal(start, 14);
            return (
              <React.Fragment key={m.label}>
                {i > 0 && <div style={{ width: 1, height: 168, background: C.lineDark, marginTop: 6 }} />}
                <div style={{ ...reveal, textAlign: "center", minWidth: 240 }}>
                  <div style={{ fontFamily: sans, fontSize: 112, fontWeight: 500, color: C.cream, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                    {display}
                  </div>
                  <div style={{ marginTop: 18, fontFamily: sans, fontSize: 27, color: C.cream, fontWeight: 500 }}>{m.label}</div>
                  <div style={{ marginTop: 6 }}>
                    <SmallCaps size={17} color={C.violetBright}>{m.sub}</SmallCaps>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div style={{ marginTop: 66, textAlign: "center", opacity: interpolate(frame, [88, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 30, color: C.creamDim }}>Here&apos;s how.</span>
          <div style={{ marginTop: 8, color: C.violet, fontSize: 26 }}>↓</div>
        </div>
      </AbsoluteFill>
    </Background>
  );
};
