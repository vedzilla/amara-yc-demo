import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { AgencyFrame } from "./AgencyFrame";
import { Bubble } from "./Bubble";
import { SmallCaps, useReveal } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

export const AgencyRefine: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = useReveal(2, 12);
  const b1 = useReveal(18, 18);
  const b2 = useReveal(54, 18);
  const b3 = useReveal(92, 18);
  const thinking = frame >= 100 && frame < 140;
  const resolved = interpolate(frame, [140, 158], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AgencyFrame time="1:22 PM" active="JH" activeLabel="Jess · Creative Lead" glowX={0.6}>
      <div style={{ ...heading, marginBottom: 26 }}>
        <SmallCaps size={18} color={C.violetBright} tracking={0.28}>The team stays in control</SmallCaps>
        <h2 style={{ fontFamily: sans, fontSize: 50, fontWeight: 500, letterSpacing: "-0.03em", color: C.cream, margin: "10px 0 0" }}>
          Jess tweaks it, and Amara <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint }}>gets sharper.</span>
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1180 }}>
        <Bubble from="amara" reveal={b1}>
          <div style={{ fontFamily: sans, fontSize: 25, color: C.cream, fontWeight: 500 }}>Launch 3 “summit POV” variants · £900 test</div>
        </Bubble>
        <Bubble from="JH" reveal={b2}>
          <div style={{ fontFamily: sans, fontSize: 25, color: C.cream }}>
            Founder-led only. No drone shots. Drop test to{" "}
            <span style={{ color: C.violetTint, fontWeight: 600, borderBottom: `2px solid ${C.violet}` }}>£500</span>.
          </div>
        </Bubble>
        <Bubble from="amara" reveal={b3}>
          {thinking ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12, height: 40 }}>
              <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 24, color: C.violetTint }}>Taking that into account</span>
              <Dots frame={frame} />
            </div>
          ) : resolved > 0 ? (
            <div style={{ opacity: resolved, transform: `translateY(${(1 - resolved) * 8}px)` }}>
              <SmallCaps size={14} color={C.positive}>Updated · sharper</SmallCaps>
              <div style={{ fontFamily: sans, fontSize: 25, color: C.cream, fontWeight: 500, marginTop: 5 }}>3 founder-led cuts · £500 · added a TikTok-first hook</div>
            </div>
          ) : (
            <div style={{ height: 40 }} />
          )}
        </Bubble>
      </div>
    </AgencyFrame>
  );
};

const Dots: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{ display: "flex", gap: 7 }}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: C.violetTint, opacity: interpolate(Math.sin((frame - i * 4) / 4), [-1, 1], [0.25, 1]) }} />
    ))}
  </div>
);
