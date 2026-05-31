import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Background } from "../components/Background";
import { BrainMark } from "../components/BrainMark";
import { SlackLogo, GmailLogo } from "../components/Logos";
import { SmallCaps, useReveal } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

type Src = "slack" | "gmail";
const MESSAGES: { src: Src; channel: string; who: string; body: string }[] = [
  { src: "slack", channel: "#amara", who: "Marcus", body: "Draft a brief for Northland's summer drop?" },
  { src: "gmail", channel: "Olive & Oak", who: "Mia · Founder", body: "Switch “clean” to “gentle” everywhere." },
  { src: "slack", channel: "DM", who: "Tom", body: "Spot-check the Sundial pixel?" },
];

const LEARNT = [
  { kind: "Voice", title: "“Gentle” replaces “clean”", detail: "5 channels updated" },
  { kind: "Pattern", title: "Founder-POV lifts 2.7×", detail: "Playbook updated" },
  { kind: "Playbook", title: "Sundial pixel +18%", detail: "Fix drafted" },
];

export const SceneBrain: React.FC = () => {
  const frame = useCurrentFrame();
  const title = useReveal(2, 12);

  return (
    <Background glowX={0.5} intensity={0.95}>
      <AbsoluteFill style={{ padding: "70px 120px", justifyContent: "center" }}>
        <div style={{ ...title, textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ fontFamily: sans, fontSize: 76, fontWeight: 500, letterSpacing: "-0.03em", color: C.cream, margin: 0 }}>
            It <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint }}>listens</span>. It <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint }}>learns</span>.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 200px 1fr", gap: 24, alignItems: "center" }}>
          {/* incoming: Slack + Gmail */}
          <div style={{ display: "flex", flexDirection: "column", gap: 17 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 6 }}>
              <SlackLogo size={26} />
              <GmailLogo size={26} />
              <SmallCaps size={19} color={C.dim}>Reading Slack + Gmail</SmallCaps>
            </div>
            {MESSAGES.map((m, i) => {
              const r = useReveal(18 + i * 22, 20);
              return (
                <div key={i} style={{ ...r, padding: "20px 24px", borderRadius: 13, border: `1px solid ${C.lineDark}`, background: "rgba(17,16,31,0.8)", marginLeft: i * 22 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    {m.src === "slack" ? <SlackLogo size={20} /> : <GmailLogo size={20} />}
                    <span style={{ fontFamily: sans, fontSize: 19, color: C.cream, fontWeight: 500 }}>{m.channel}</span>
                    <SmallCaps size={15} color={C.dim}>· {m.who}</SmallCaps>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 24, color: "rgba(240,237,230,0.92)", lineHeight: 1.35 }}>{m.body}</div>
                </div>
              );
            })}
          </div>

          {/* central brain */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, position: "relative" }}>
            <BrainMark size={132} />
            <FlowPulse frame={frame} />
          </div>

          {/* learnt */}
          <div style={{ display: "flex", flexDirection: "column", gap: 17 }}>
            <SmallCaps size={19} color={C.dim} style={{ marginBottom: 6 }}>Learnt today</SmallCaps>
            {LEARNT.map((b, i) => {
              const r = useReveal(72 + i * 22, 20);
              return (
                <div key={i} style={{ ...r, padding: "20px 24px", borderRadius: 13, border: `1px solid ${C.lineDark}`, background: "rgba(17,16,31,0.8)", marginRight: i * 22, borderLeft: `2px solid ${C.violet}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <SmallCaps size={16} color={C.violetBright}>{b.kind}</SmallCaps>
                    <SmallCaps size={15} color={C.positive}>● live</SmallCaps>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 24, fontWeight: 500, color: C.cream, lineHeight: 1.3 }}>{b.title}</div>
                  <div style={{ fontFamily: sans, fontSize: 18, color: C.creamDim, marginTop: 5 }}>{b.detail}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 44, opacity: interpolate(frame, [140, 162], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 30, color: C.creamDim }}>
            142 this week. <span style={{ color: C.violetTint }}>The agency, remembered.</span>
          </span>
        </div>
      </AbsoluteFill>
    </Background>
  );
};

const FlowPulse: React.FC<{ frame: number }> = ({ frame }) => {
  const t = (frame % 45) / 45;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: `${interpolate(t, [0, 1], [-150, 0])}px`,
          top: "42%",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: C.violetBright,
          boxShadow: `0 0 12px ${C.violet}`,
          opacity: interpolate(t, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
        }}
      />
    </div>
  );
};
