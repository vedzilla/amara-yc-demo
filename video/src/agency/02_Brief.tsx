import React from "react";
import { AgencyFrame } from "./AgencyFrame";
import { Bubble } from "./Bubble";
import { SlackLogo } from "../components/Logos";
import { SmallCaps, useReveal } from "../components/ui";
import { C } from "../theme";
import { sans } from "../fonts";

export const AgencyBrief: React.FC = () => {
  const heading = useReveal(2, 12);
  const q = useReveal(20, 18);
  const a = useReveal(56, 18);

  return (
    <AgencyFrame time="9:14 AM" active="SC" activeLabel="Sarah · Account Director" glowX={0.66}>
      <div style={{ ...heading, marginBottom: 30 }}>
        <SmallCaps size={18} color={C.violetBright} tracking={0.28}>The morning starts with a question</SmallCaps>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 1140 }}>
        <Bubble
          from="SC"
          reveal={q}
          source={
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <SlackLogo size={20} />
              <span style={{ fontFamily: sans, fontSize: 17, color: C.cream, fontWeight: 600 }}>#amara</span>
              <SmallCaps size={14} color={C.dim}>· Sarah</SmallCaps>
            </div>
          }
        >
          <div style={{ fontFamily: sans, fontSize: 29, color: C.cream, lineHeight: 1.35 }}>
            Amara, what won on Olive &amp; Oak last week? I&apos;m in their call at 10.
          </div>
        </Bubble>

        <Bubble from="amara" reveal={a}>
          <div style={{ fontFamily: sans, fontSize: 27, color: "rgba(240,237,230,0.92)", lineHeight: 1.4 }}>
            The founder-POV TikTok hook held <span style={{ color: C.violetTint, fontWeight: 600 }}>4.1× ROAS</span> over 14 days.
            Pulling the brief and three new concepts now.
          </div>
        </Bubble>
      </div>
    </AgencyFrame>
  );
};
