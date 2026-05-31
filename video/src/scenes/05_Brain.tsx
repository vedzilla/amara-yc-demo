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
      <AbsoluteFill style={{ padding: "60px 110px", justifyContent: "center" }}>
        <div style={{ ...title, textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: sans, fontSize: 82, fontWeight: 500, letterSpacing: "-0.03em", color: C.cream, margin: 0 }}>
            It <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint }}>listens</span>. It <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint }}>learns</span>.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 1fr", gap: 28, alignItems: "center" }}>
          {/* incoming: Slack + Gmail */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 6 }}>
              <SlackLogo size={34} />
              <GmailLogo size={34} />
              <SmallCaps size={25} color={C.dim}>Reading Slack + Gmail</SmallCaps>
            </div>
            {MESSAGES.map((m, i) => {
              const r = useReveal(20 + i * 28, 20);
              return (
                <div key={i} style={{ ...r, padding: "24px 28px", borderRadius: 15, border: `1px solid ${C.lineDark}`, background: "rgba(17,16,31,0.8)", marginLeft: i * 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    {m.src === "slack" ? <SlackLogo size={28} /> : <GmailLogo size={28} />}
                    <span style={{ fontFamily: sans, fontSize: 26, color: C.cream, fontWeight: 600 }}>{m.channel}</span>
                    <SmallCaps size={18} color={C.dim}>· {m.who}</SmallCaps>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 32, color: "rgba(240,237,230,0.95)", lineHeight: 1.35 }}>{m.body}</div>
                </div>
              );
            })}
          </div>

          {/* central brain */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, position: "relative" }}>
            <BrainMark size={140} />
            <FlowPulse frame={frame} />
          </div>

          {/* learnt */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <SmallCaps size={25} color={C.dim} style={{ marginBottom: 6 }}>Learnt today</SmallCaps>
            {LEARNT.map((b, i) => {
              const r = useReveal(104 + i * 28, 20);
              return (
                <div key={i} style={{ ...r, padding: "24px 28px", borderRadius: 15, border: `1px solid ${C.lineDark}`, background: "rgba(17,16,31,0.8)", marginRight: i * 20, borderLeft: `3px solid ${C.violet}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <SmallCaps size={22} color={C.violetBright}>{b.kind}</SmallCaps>
                    <SmallCaps size={18} color={C.positive}>● live</SmallCaps>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 32, fontWeight: 600, color: C.cream, lineHeight: 1.3 }}>{b.title}</div>
                  <div style={{ fontFamily: sans, fontSize: 23, color: C.creamDim, marginTop: 7 }}>{b.detail}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 44, opacity: interpolate(frame, [192, 216], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 34, color: C.creamDim }}>
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
          left: `${interpolate(t, [0, 1], [-130, 0])}px`,
          top: "42%",
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: C.violetBright,
          boxShadow: `0 0 12px ${C.violet}`,
          opacity: interpolate(t, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
        }}
      />
    </div>
  );
};
