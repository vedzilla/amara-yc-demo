import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { SmallCaps, useReveal } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

type Tone = "good" | "alert" | "violet" | "dim";
const toneColor: Record<Tone, string> = { good: C.positive, alert: C.alert, violet: C.violetBright, dim: C.dim };

const ROWS: { name: string; dot: string; spend: string; roas: string; verdict: string; tone: Tone }[] = [
  { name: "Google Ads", dot: "#4285F4", spend: "£2,980", roas: "3.8×", verdict: "Healthy", tone: "good" },
  { name: "Meta Ads", dot: "#0866FF", spend: "£2,780", roas: "1.8×", verdict: "Leaking £60/day", tone: "alert" },
  { name: "TikTok Ads", dot: "#FF2D55", spend: "£1,850", roas: "3.2×", verdict: "Has runway", tone: "violet" },
  { name: "Email", dot: "#F0A150", spend: "£930", roas: "6.1×", verdict: "Top ROAS", tone: "good" },
  { name: "LinkedIn", dot: "#0A66C2", spend: "£820", roas: "2.6×", verdict: "Watch", tone: "alert" },
  { name: "SEO", dot: "#52C896", spend: "£510", roas: "5.4×", verdict: "Scaling", tone: "violet" },
  { name: "Programmatic", dot: "#8B78FF", spend: "£310", roas: "2.9×", verdict: "Steady", tone: "dim" },
  { name: "Landing", dot: "#C896F0", spend: "£120", roas: "4.8×", verdict: "Healthy", tone: "good" },
];

const INSIGHTS = [
  { tone: "alert" as Tone, title: "Meta leaking £60/day. TikTok starving.", sub: "Shift £30/day → TikTok · 91% sure" },
  { tone: "violet" as Tone, title: "Founder-POV creative lifts 2.7×", sub: "Across 4 of 6 clients" },
  { tone: "good" as Tone, title: "Sundial pixel double-firing +18%", sub: "Fix drafted" },
];

export const SceneScan: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = useReveal(4, 14);

  const scanStart = 16;
  const scanEnd = 86;
  const scan = interpolate(frame, [scanStart, scanEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const campaigns = Math.round(interpolate(frame, [scanStart, scanEnd], [0, 1284], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const complete = frame >= scanEnd;

  return (
    <Background glowX={0.5} intensity={0.9}>
      <AbsoluteFill style={{ padding: "70px 110px" }}>
        {/* heading */}
        <div style={{ ...heading, display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 48 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <SmallCaps size={19} color={C.violetBright} tracking={0.3}>Step two · Amara learns the account</SmallCaps>
            <h2 style={{ fontFamily: sans, fontSize: 60, fontWeight: 500, letterSpacing: "-0.03em", color: C.cream, margin: "14px 0 0", maxWidth: 980 }}>
              It reads everything. It learns your{" "}
              <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint }}>clients &amp; methodology.</span>
            </h2>
          </div>
          <div style={{ textAlign: "right", width: 340, flexShrink: 0 }}>
            <div style={{ fontFamily: sans, fontSize: 38, fontWeight: 500, color: complete ? C.positive : C.cream, fontVariantNumeric: "tabular-nums" }}>
              {complete ? "✓ Account understood" : campaigns.toLocaleString()}
            </div>
            <SmallCaps size={17} color={C.dim}>{complete ? "7 insights surfaced" : "data points read"}</SmallCaps>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 56, marginTop: 48, flex: 1 }}>
          {/* LEFT — channel review table with scan beam */}
          <div>
            {/* header */}
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr 0.6fr 1fr", padding: "0 16px 12px", borderBottom: `1px solid ${C.lineDark}` }}>
              <SmallCaps size={14} color={C.dim}>Channel</SmallCaps>
              <SmallCaps size={14} color={C.dim}>Spend / mo</SmallCaps>
              <SmallCaps size={14} color={C.dim}>ROAS</SmallCaps>
              <SmallCaps size={14} color={C.dim}>Signal</SmallCaps>
            </div>
            <div style={{ position: "relative" }}>
            {ROWS.map((r, i) => {
              const lit = scan * ROWS.length >= i + 0.4;
              const verdictP = interpolate(scan * ROWS.length, [i + 0.3, i + 0.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div
                  key={r.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 0.8fr 0.6fr 1fr",
                    alignItems: "center",
                    padding: "16px 16px",
                    borderBottom: `1px solid ${C.lineDarker}`,
                    background: lit ? "rgba(111,91,255,0.05)" : "transparent",
                    transition: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: r.dot, boxShadow: lit ? `0 0 8px ${r.dot}` : "none", opacity: lit ? 1 : 0.4 }} />
                    <span style={{ fontFamily: sans, fontSize: 21, color: lit ? C.cream : C.dim }}>{r.name}</span>
                  </div>
                  <span style={{ fontFamily: sans, fontSize: 20, color: lit ? "rgba(240,237,230,0.85)" : C.dim, fontVariantNumeric: "tabular-nums" }}>{r.spend}</span>
                  <span style={{ fontFamily: sans, fontSize: 20, color: lit ? "rgba(240,237,230,0.85)" : C.dim, fontVariantNumeric: "tabular-nums" }}>{r.roas}</span>
                  <span style={{ opacity: verdictP, transform: `translateX(${(1 - verdictP) * 10}px)` }}>
                    <SmallCaps size={16} color={toneColor[r.tone]}>{r.verdict}</SmallCaps>
                  </span>
                </div>
              );
            })}

            {/* scan beam — tracks the lit-row boundary */}
            {!complete && (
              <div
                style={{
                  position: "absolute",
                  left: -4,
                  right: -4,
                  top: `${scan * 100}%`,
                  height: 3,
                  background: `linear-gradient(90deg, transparent, ${C.violetBright}, transparent)`,
                  boxShadow: `0 0 24px 4px ${C.violet}`,
                }}
              />
            )}
            </div>
          </div>

          {/* RIGHT — surfaced insights */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
            <SmallCaps size={17} color={C.dim} style={{ marginBottom: 2 }}>What it found</SmallCaps>
            {INSIGHTS.map((ins, i) => {
              const r = useReveal(92 + i * 13, 20, 160);
              const color = toneColor[ins.tone];
              return (
                <div
                  key={i}
                  style={{
                    ...r,
                    padding: "20px 22px",
                    borderRadius: 14,
                    border: `1px solid ${C.lineDark}`,
                    borderLeft: `3px solid ${color}`,
                    background: "rgba(17,16,31,0.85)",
                    boxShadow: i === 0 ? `0 0 30px ${color}22` : "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
                    <SmallCaps size={15} color={color}>{i === 0 ? "Decide now" : "Insight"}</SmallCaps>
                    <SmallCaps size={14} color={C.dim}>{String(i + 1).padStart(2, "0")} / 07</SmallCaps>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: i === 0 ? 29 : 25, fontWeight: 500, color: C.cream, lineHeight: 1.25 }}>{ins.title}</div>
                  <div style={{ fontFamily: sans, fontSize: 18, color: C.creamDim, marginTop: 7 }}>{ins.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </Background>
  );
};
