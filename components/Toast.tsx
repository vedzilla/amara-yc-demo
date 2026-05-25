"use client";
import { motion, AnimatePresence } from "motion/react";
import { Check, PencilLine, X } from "lucide-react";

type Decision = "approved" | "modified" | "rejected";

const meta: Record<Decision, { label: string; icon: React.ElementType; color: string }> = {
  approved: { label: "Approved · queued for launch", icon: Check, color: "text-violet-bright" },
  modified: { label: "Sent back to Amara with notes", icon: PencilLine, color: "text-cream" },
  rejected: { label: "Rejected · subagent will re-plan", icon: X, color: "text-dim" },
};

export function Toast({
  visible,
  decision,
  message,
}: {
  visible: boolean;
  decision: Decision;
  message?: string;
}) {
  const m = meta[decision];
  const Icon = m.icon;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 right-8 z-50 flex items-center gap-3 rounded-lg border border-line-dark bg-ink-raised/95 backdrop-blur-xl px-4 py-3 shadow-2xl shadow-violet/10 min-w-[280px]"
        >
          <div className="h-7 w-7 rounded-md bg-violet/15 flex items-center justify-center">
            <Icon size={14} className={m.color} />
          </div>
          <div className="flex-1">
            <div className="text-[13px] text-cream font-medium">{message ?? m.label}</div>
            <div className="label-micro text-dim mt-0.5">Amara · approval log</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
