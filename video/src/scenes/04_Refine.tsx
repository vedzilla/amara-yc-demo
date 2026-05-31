import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Background } from "../components/Background";
import { BrainMark } from "../components/BrainMark";
import { SmallCaps, useReveal } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

// Human-in-the-loop: Amara suggests → the agency modifies → Amara adapts.
export const SceneRefine: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = useReveal(2, 12);

  const amara1 = useReveal(16, 16);
  const you = useReveal(52, 16);
  const amara2 = useReveal(92, 16);

  // "Taking it into account…" thinking → resolves into the better suggestion.
  const thinking = frame >= 100 && frame < 142;
  const resolved = interpolate(frame, [142, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Background glowX={0.62}>
      <AbsoluteFill style={{ padding: "70px 120px", justifyContent: "center" }}>
        <div style={{ ...heading, textAlign: "center", marginBottom: 40 }}>
          <SmallCaps size={19} color={C.violetBright} tracking={0.3}>Step four · You stay in control</SmallCaps>
          <h2 style={{ fontFamily: sans, fontSize: 60, fontWeight: 500, letterSpacing: "-0.03em", color: C.cream, margin: "12px 0 0" }}>
            Tweak it, and Amara{" "}
            <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint }}>gets sharper.</span>
          </h2>
        </div>

        <div style={{ maxWidth: 920, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 18 }}>
          {/* 1 — Amara suggests */}
          <Bubble who="amara" style={amara1}>
            <SmallCaps size={13} color={C.violetBright}>Amara suggests · Northland</SmallCaps>
            <div style={{ fontFamily: sans, fontSize: 24, color: C.cream, fontWeight: 500, marginTop: 6 }}>
              Launch 3 “summit POV” creative variants
            </div>
            <div style={{ fontFamily: sans, fontSize: 18, color: C.creamDim, marginTop: 4 }}>£900 test budget · drone + studio mix</div>
          </Bubble>

          {/* 2 — the agency modifies */}
          <Bubble who="you" style={you}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <SmallCaps size={13} color={C.cream}>You modified this</SmallCaps>
              <span style={{ color: C.violetTint, fontSize: 14 }}>✎</span>
            </div>
            <div style={{ fontFamily: sans, fontSize: 22, color: C.cream }}>
              Founder-led only — no drone shots. Drop test to{" "}
              <span style={{ color: C.violetTint, fontWeight: 600, borderBottom: `2px solid ${C.violet}` }}>£500</span>.
            </div>
          </Bubble>

          {/* 3 — Amara takes it into account and returns sharper */}
          <Bubble who="amara" style={amara2}>
            {thinking ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12, height: 58 }}>
                <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 24, color: C.violetTint }}>Taking that into account</span>
                <Dots frame={frame} />
              </div>
            ) : resolved > 0 ? (
              <div style={{ opacity: resolved, transform: `translateY(${(1 - resolved) * 8}px)` }}>
                <SmallCaps size={13} color={C.positive}>Updated · sharper</SmallCaps>
                <div style={{ fontFamily: sans, fontSize: 24, color: C.cream, fontWeight: 500, marginTop: 6 }}>
                  3 founder-led cuts · £500 · added a TikTok-first hook
                </div>
                <div style={{ fontFamily: sans, fontSize: 18, color: C.creamDim, marginTop: 4 }}>Learns faster where you have runway. Ship it?</div>
              </div>
            ) : (
              <div style={{ height: 58 }} />
            )}
          </Bubble>
        </div>
      </AbsoluteFill>
    </Background>
  );
};

const Bubble: React.FC<{ who: "amara" | "you"; style: React.CSSProperties; children: React.ReactNode }> = ({ who, style, children }) => {
  const isAmara = who === "amara";
  return (
    <div style={{ ...style, display: "flex", gap: 18, flexDirection: isAmara ? "row" : "row-reverse" }}>
      {isAmara ? (
        <div style={{ flexShrink: 0, width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <BrainMark size={46} />
        </div>
      ) : (
        <div style={{ flexShrink: 0, width: 52, height: 52, borderRadius: "50%", border: `1px solid ${C.lineDark}`, background: C.inkRaised, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <SmallCaps size={15} color={C.creamDim}>You</SmallCaps>
        </div>
      )}
      <div
        style={{
          flex: 1,
          maxWidth: 740,
          padding: "20px 24px",
          borderRadius: 14,
          border: `1px solid ${C.lineDark}`,
          background: isAmara ? "rgba(17,16,31,0.85)" : "rgba(111,91,255,0.08)",
          borderLeft: isAmara ? `2px solid ${C.violet}` : undefined,
          borderRight: !isAmara ? `2px solid ${C.violetTint}` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const Dots: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{ display: "flex", gap: 7 }}>
    {[0, 1, 2].map((i) => {
      const o = interpolate(Math.sin((frame - i * 4) / 4), [-1, 1], [0.25, 1]);
      return <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: C.violetTint, opacity: o }} />;
    })}
  </div>
);
