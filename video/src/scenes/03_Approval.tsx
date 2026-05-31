import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { Background } from "../components/Background";
import { SmallCaps, useReveal } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

const EVIDENCE = [
  { label: "Meta ROAS · 14d", value: "1.8×", warn: true },
  { label: "TikTok ROAS · 14d", value: "3.2×", warn: false },
  { label: "Meta frequency", value: "4.7", warn: true },
  { label: "TikTok frequency", value: "1.4", warn: false },
];

export const SceneApproval: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrow = useReveal(2, 12);
  const reasoning = useReveal(42, 14);
  const cardIn = spring({ frame: frame - 12, fps, config: { damping: 200, mass: 0.8 } });

  // cursor → click → approve
  const cursorX = interpolate(frame, [92, 132], [1740, 1452], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const cursorY = interpolate(frame, [92, 132], [560, 690], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const cursorOpacity = interpolate(frame, [84, 94, 150, 160], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const pressed = frame >= 134 && frame <= 142;
  const approved = frame >= 140;
  const stamp = spring({ frame: frame - 140, fps, config: { damping: 12, mass: 0.8, stiffness: 140 } });
  const impact = useReveal(152, 16);
  const confFill = interpolate(frame, [26, 72], [0, 0.91], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Background glowX={0.78}>
      <AbsoluteFill style={{ padding: "96px 120px", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 80 }}>
          {/* LEFT — the story */}
          <div style={{ flex: 1.15, maxWidth: 880 }}>
            <div style={{ ...eyebrow, display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ background: "rgba(255,99,133,0.16)", color: C.alert, fontSize: 16, padding: "6px 13px", borderRadius: 5, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: sans }}>
                Decide now
              </span>
              <SmallCaps size={16}>Bid management subagent</SmallCaps>
            </div>

            <h2 style={{ fontFamily: sans, fontSize: 88, fontWeight: 500, lineHeight: 0.98, letterSpacing: "-0.03em", color: C.cream, margin: "26px 0 0" }}>
              {revealWords("Meta is leaking ", frame, 12)}
              <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint, whiteSpace: "nowrap" }}>{revealWords("£60/day", frame, 22)}</span>
              {revealWords(". TikTok is ", frame, 28)}
              <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint, whiteSpace: "nowrap" }}>{revealWords("starving", frame, 36)}</span>
              {revealWords(".", frame, 44)}
            </h2>

            <p style={{ ...reasoning, fontFamily: sans, fontSize: 26, lineHeight: 1.5, color: "rgba(240,237,230,0.85)", maxWidth: 700, marginTop: 28, fontWeight: 300 }}>
              Lookalike fatigue on Meta. TikTok still has runway.{" "}
              <span style={{ color: C.cream, fontWeight: 500 }}>Shift £30/day across.</span>
            </p>

            <div style={{ ...reasoning, display: "flex", alignItems: "center", gap: 16, marginTop: 36 }}>
              <SmallCaps size={16}>Confidence</SmallCaps>
              <div style={{ width: 240, height: 6, borderRadius: 4, background: C.lineDark, overflow: "hidden" }}>
                <div style={{ width: `${(confFill / 0.91) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${C.violetDeep}, ${C.violetBright})`, borderRadius: 4 }} />
              </div>
              <span style={{ fontFamily: sans, fontSize: 22, color: C.cream, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>{Math.round(confFill * 100)}%</span>
            </div>
          </div>

          {/* RIGHT — the card */}
          <div style={{ flex: 0.85, maxWidth: 560, opacity: cardIn, transform: `translateX(${(1 - cardIn) * 40}px)` }}>
            <div style={{ position: "relative", border: `1px solid ${C.lineDark}`, borderRadius: 16, background: "rgba(17,16,31,0.72)", padding: 36, boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
              <SmallCaps color={C.violetBright} size={15}>Budget shift · Olive &amp; Oak Beauty</SmallCaps>

              <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
                <BeforeAfter label="Before" value="£60/day Meta" frame={frame} delay={34} dim />
                <div style={{ display: "flex", justifyContent: "center", color: C.violet, fontSize: 20 }}>↓</div>
                <BeforeAfter label="After" value="£30 Meta · £90 TikTok" frame={frame} delay={44} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 26 }}>
                {EVIDENCE.map((e, i) => {
                  const r = interpolate(frame, [52 + i * 6, 52 + i * 6 + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div key={e.label} style={{ opacity: r, transform: `translateY(${(1 - r) * 10}px)`, padding: "12px 14px", border: `1px solid ${C.lineDarker}`, borderRadius: 10, background: C.inkDeep }}>
                      <SmallCaps size={13} color={C.dim}>{e.label}</SmallCaps>
                      <div style={{ fontFamily: sans, fontSize: 29, fontWeight: 500, color: e.warn ? C.alert : C.violetBright, marginTop: 5, fontVariantNumeric: "tabular-nums" }}>{e.value}</div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  marginTop: 28,
                  height: 60,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  fontFamily: sans,
                  fontSize: 19,
                  fontWeight: 600,
                  color: C.cream,
                  background: approved ? C.violetBright : C.violet,
                  boxShadow: approved ? "0 0 40px rgba(139,120,255,0.6)" : "0 0 30px rgba(111,91,255,0.4)",
                  transform: `scale(${pressed ? 0.96 : 1})`,
                }}
              >
                {approved ? "✓  Approved" : "✦  Approve"}
              </div>

              {approved && (
                <div
                  style={{
                    position: "absolute",
                    top: 28,
                    right: 28,
                    transform: `scale(${interpolate(stamp, [0, 1], [1.6, 1])}) rotate(-12deg)`,
                    opacity: interpolate(stamp, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
                    border: `2.5px solid ${C.violetBright}`,
                    color: C.violetBright,
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontFamily: sans,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    fontSize: 16,
                  }}
                >
                  APPROVED
                </div>
              )}
            </div>

            <div style={{ ...impact, marginTop: 22, display: "flex", alignItems: "baseline", gap: 12, justifyContent: "flex-end" }}>
              <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 48, color: C.positive }}>+£1.2k</span>
              <SmallCaps size={17} color={C.creamDim}>revenue / month</SmallCaps>
            </div>
          </div>
        </div>

        <Cursor x={cursorX} y={cursorY} opacity={cursorOpacity} pressed={pressed} />
      </AbsoluteFill>
    </Background>
  );
};

const BeforeAfter: React.FC<{ label: string; value: string; frame: number; delay: number; dim?: boolean }> = ({ label, value, frame, delay, dim }) => {
  const o = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ opacity: o }}>
      <SmallCaps size={14} color={dim ? C.dim : C.violetBright}>{label}</SmallCaps>
      <div style={{ fontFamily: sans, fontSize: 31, fontWeight: 500, color: dim ? C.creamDim : C.cream, marginTop: 3 }}>{value}</div>
    </div>
  );
};

const Cursor: React.FC<{ x: number; y: number; opacity: number; pressed: boolean }> = ({ x, y, opacity, pressed }) => (
  <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${x}px, ${y}px)`, opacity, pointerEvents: "none" }}>
    {pressed && <div style={{ position: "absolute", left: -14, top: -14, width: 44, height: 44, borderRadius: "50%", border: `2px solid ${C.cream}`, opacity: 0.5 }} />}
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
      <path d="M5 3 L5 19 L9 15 L12 21 L14.5 20 L11.5 14 L17 14 Z" fill={C.cream} stroke={C.ink} strokeWidth="1" />
    </svg>
  </div>
);

function revealWords(text: string, frame: number, startDelay: number) {
  return text.split("").map((ch, i) => {
    const o = interpolate(frame, [startDelay + i * 1.4, startDelay + i * 1.4 + 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <span key={i} style={{ display: "inline-block", opacity: o, transform: `translateY(${(1 - o) * 14}px)`, whiteSpace: "pre" }}>
        {ch}
      </span>
    );
  });
}
