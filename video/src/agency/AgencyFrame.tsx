import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { SmallCaps } from "../components/ui";
import { C } from "../theme";
import { sans } from "../fonts";
import { Roster } from "./Avatar";

// Shared chrome for the day-in-the-life: an advancing clock (top-left) and the
// team roster (top-right) with the active person highlighted. The clock + roster
// are the throughline that tie every beat into one continuous workday.
export const AgencyFrame: React.FC<{
  time: string;
  active?: string;
  activeLabel?: string;
  glowX?: number;
  intensity?: number;
  showChrome?: boolean;
  children: React.ReactNode;
}> = ({ time, active, activeLabel, glowX = 0.6, intensity, showChrome = true, children }) => {
  return (
    <Background glowX={glowX} intensity={intensity}>
      <AbsoluteFill style={{ padding: "52px 90px", display: "flex", flexDirection: "column" }}>
        {showChrome && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ fontFamily: sans, fontSize: 30, fontWeight: 500, color: C.cream, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em" }}>{time}</span>
              <SmallCaps size={14} color={C.dim}>Mon</SmallCaps>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {activeLabel ? <SmallCaps size={15} color={C.violetBright}>{activeLabel}</SmallCaps> : null}
              <Roster active={active} size={44} />
            </div>
          </div>
        )}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>{children}</div>
      </AbsoluteFill>
    </Background>
  );
};
