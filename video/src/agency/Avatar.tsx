import React from "react";
import { C } from "../theme";
import { sans } from "../fonts";
import { TEAM } from "./team";

export const Avatar: React.FC<{ initials: string; active?: boolean; size?: number }> = ({ initials, active, size = 46 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      border: `1px solid ${active ? C.violetBright : C.lineDark}`,
      background: active ? "rgba(111,91,255,0.18)" : C.inkRaised,
      boxShadow: active ? `0 0 18px rgba(111,91,255,0.5)` : "none",
      opacity: active ? 1 : 0.55,
    }}
  >
    <span style={{ fontFamily: sans, fontSize: size * 0.34, fontWeight: 600, color: active ? C.cream : C.creamDim, letterSpacing: "0.02em" }}>{initials}</span>
  </div>
);

// The full team row — highlights whoever is active this beat.
export const Roster: React.FC<{ active?: string; size?: number }> = ({ active, size = 46 }) => (
  <div style={{ display: "flex", gap: 9 }}>
    {TEAM.map((m) => (
      <Avatar key={m.initials} initials={m.initials} active={m.initials === active} size={size} />
    ))}
  </div>
);
