import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { AgencyFrame } from "./AgencyFrame";
import { BrainMark } from "../components/BrainMark";
import { SlackLogo, GmailLogo } from "../components/Logos";
import { SmallCaps, useReveal } from "../components/ui";
import { C } from "../theme";
import { sans, serif } from "../fonts";

const SAID = [
  { logo: "slack", chan: "#amara", who: "Marcus", body: "Brief for Northland's summer drop?" },
  { logo: "gmail", chan: "Olive & Oak", who: "Mia · Founder", body: "Switch “clean” to “gentle” everywhere." },
];
const LEARNT = [
  { kind: "Voice", title: "“Gentle” replaces “clean”", detail: "5 channels updated" },
  { kind: "Pattern", title: "Founder-POV lifts 2.7×", detail: "Playbook updated" },
];

export const AgencyLearn: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = useReveal(2, 12);

  return (
    <AgencyFrame time="3:45 PM" active="PS" activeLabel="All day · the brain listens" glowX={0.5} intensity={0.92}>
      <div style={{ ...heading, textAlign: "center", marginBottom: 30 }}>
        <h2 style={{ fontFamily: sans, fontSize: 58, fontWeight: 500, letterSpacing: "-0.03em", color: C.cream, margin: 0 }}>
          Every message becomes <span style={{ fontFamily: serif, fontStyle: "italic", color: C.violetTint }}>company memory.</span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 170px 1fr", gap: 22, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
            <SlackLogo size={24} /> <GmailLogo size={24} />
            <SmallCaps size={16} color={C.dim}>Slack + Gmail</SmallCaps>
          </div>
          {SAID.map((m, i) => {
            const r = useReveal(16 + i * 16, 18);
            return (
              <div key={i} style={{ ...r, padding: "16px 20px", borderRadius: 12, border: `1px solid ${C.lineDark}`, background: "rgba(17,16,31,0.8)", marginLeft: i * 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
                  {m.logo === "slack" ? <SlackLogo size={18} /> : <GmailLogo size={18} />}
                  <span style={{ fontFamily: sans, fontSize: 17, color: C.cream, fontWeight: 600 }}>{m.chan}</span>
                  <SmallCaps size={13} color={C.dim}>· {m.who}</SmallCaps>
                </div>
                <div style={{ fontFamily: sans, fontSize: 21, color: "rgba(240,237,230,0.92)", lineHeight: 1.35 }}>{m.body}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <BrainMark size={128} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <SmallCaps size={16} color={C.dim} style={{ marginBottom: 2 }}>Learnt today</SmallCaps>
          {LEARNT.map((b, i) => {
            const r = useReveal(48 + i * 16, 18);
            return (
              <div key={i} style={{ ...r, padding: "16px 20px", borderRadius: 12, border: `1px solid ${C.lineDark}`, borderLeft: `2px solid ${C.violet}`, background: "rgba(17,16,31,0.8)", marginRight: i * 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <SmallCaps size={14} color={C.violetBright}>{b.kind}</SmallCaps>
                  <SmallCaps size={13} color={C.positive}>● live</SmallCaps>
                </div>
                <div style={{ fontFamily: sans, fontSize: 21, fontWeight: 500, color: C.cream }}>{b.title}</div>
                <div style={{ fontFamily: sans, fontSize: 16, color: C.creamDim, marginTop: 4 }}>{b.detail}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AgencyFrame>
  );
};
