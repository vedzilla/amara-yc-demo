import React from "react";
import { BrainMark } from "../components/BrainMark";
import { C } from "../theme";
import { Avatar } from "./Avatar";

// A chat row: either from a team member (left avatar) or from Amara (brain).
export const Bubble: React.FC<{
  from: "amara" | string; // "amara" or a member's initials
  reveal: React.CSSProperties;
  children: React.ReactNode;
  source?: React.ReactNode; // optional logo/label row above content
}> = ({ from, reveal, children, source }) => {
  const isAmara = from === "amara";
  return (
    <div style={{ ...reveal, display: "flex", gap: 18, alignItems: "flex-start" }}>
      <div style={{ flexShrink: 0, width: 54, height: 54, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isAmara ? <BrainMark size={48} /> : <Avatar initials={from} active size={54} />}
      </div>
      <div
        style={{
          flex: 1,
          padding: "20px 24px",
          borderRadius: 14,
          border: `1px solid ${C.lineDark}`,
          background: isAmara ? "rgba(17,16,31,0.85)" : "rgba(111,91,255,0.08)",
          borderLeft: isAmara ? `2px solid ${C.violet}` : `2px solid ${C.violetTint}`,
        }}
      >
        {source ? <div style={{ marginBottom: 8 }}>{source}</div> : null}
        {children}
      </div>
    </div>
  );
};
