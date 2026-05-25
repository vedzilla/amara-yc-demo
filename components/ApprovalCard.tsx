"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  X,
  PencilLine,
  Sparkles,
  Clock,
  AlertCircle,
  ChevronRight,
  ArrowRight,
  Send,
  Mail,
  Loader2,
} from "lucide-react";
import { type Approval, clients, channels } from "@/lib/mock-data";
import { ChannelBadge } from "./ChannelBadge";
import { AmaraOrb } from "./AmaraOrb";
import { cn } from "@/lib/cn";

const priorityMeta = {
  now: { label: "Decide now", color: "text-amber-300", bg: "bg-amber-500/12 border-amber-500/30" },
  today: { label: "Today", color: "text-violet-bright", bg: "bg-violet/12 border-violet/30" },
  "this-week": { label: "This week", color: "text-cream/70", bg: "bg-ink-raised border-line-dark" },
};

const kindLabel: Record<Approval["kind"], string> = {
  "budget-shift": "Budget shift",
  "creative-launch": "Creative launch",
  pause: "Pause campaign",
  "audience-add": "Audience update",
  "landing-test": "Landing A/B test",
  "bid-strategy": "Bid strategy",
  "report-send": "Send report",
};

type Phase = "review" | "modifying" | "amara-typing" | "amara-replied";

export function ApprovalCard({
  approval,
  onDecide,
}: {
  approval: Approval;
  onDecide: (id: string, decision: "approved" | "modified" | "rejected") => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [phase, setPhase] = useState<Phase>("review");
  const [note, setNote] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const client = clients.find((c) => c.slug === approval.client)!;
  const channel = channels[approval.channel];
  const prio = priorityMeta[approval.priority];

  useEffect(() => {
    if (phase === "modifying" && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [phase]);

  const submitNote = () => {
    if (!note.trim()) return;
    setPhase("amara-typing");
    setTimeout(() => setPhase("amara-replied"), 1100);
    setTimeout(() => onDecide(approval.id, "modified"), 3600);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 24, transition: { duration: 0.25 } }}
      transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 1] }}
      className="rounded-lg border border-line-dark bg-ink-raised/40 hover:border-violet/40 transition-colors overflow-hidden"
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10.5px] font-medium tracking-wider uppercase",
                prio.bg,
                prio.color
              )}
            >
              {approval.priority === "now" ? (
                <AlertCircle size={11} />
              ) : (
                <Clock size={11} />
              )}
              {prio.label}
            </span>
            <span className="label-micro text-violet-bright">{approval.subagent}</span>
            <span className="text-dim text-[11px]">·</span>
            <span className="text-[12px] text-cream/75">{client.name}</span>
            <ChannelBadge channel={approval.channel} />
            <span className="text-dim text-[11px]">·</span>
            <span className="text-[11px] text-dim">{kindLabel[approval.kind]}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] text-dim tabular-nums">{approval.draftedAt}</span>
          </div>
        </div>

        <h3 className="mt-3.5 text-[20px] md:text-[22px] font-medium tracking-tight text-cream leading-snug">
          {approval.title}
        </h3>

        <p className="mt-2.5 text-[14px] text-cream/75 leading-relaxed max-w-3xl">
          {approval.reasoning}
        </p>

        {(approval.before || approval.after) && (
          <div className="mt-4 inline-flex items-center gap-3 rounded-md border border-line-dark bg-ink-deep/60 px-3.5 py-2.5">
            {approval.before && (
              <div>
                <div className="label-micro text-dim/80 mb-0.5">{approval.before.label}</div>
                <div className="text-cream font-medium tabular-nums">{approval.before.value}</div>
              </div>
            )}
            {approval.before && approval.after && (
              <ArrowRight size={16} className="text-violet/80 mx-1" />
            )}
            {approval.after && (
              <div>
                <div className="label-micro text-violet-bright/80 mb-0.5">
                  {approval.after.label}
                </div>
                <div className="text-cream font-medium tabular-nums">{approval.after.value}</div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-4 inline-flex items-center gap-1.5 text-[12px] text-dim hover:text-cream transition-colors"
        >
          <ChevronRight
            size={13}
            className={cn("transition-transform", expanded && "rotate-90")}
          />
          {expanded ? "Hide" : "Show"} supporting data
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {approval.evidence.map((e) => (
                  <div
                    key={e.label}
                    className="rounded-md border border-line-dark bg-ink-deep/40 px-3 py-2.5"
                  >
                    <div className="label-micro text-dim/80">{e.label}</div>
                    <div className="text-cream font-medium tabular-nums mt-1 text-[14px]">
                      {e.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-[12px]">
            <Sparkles size={12} className="text-violet-bright" />
            <span className="text-cream/85">{approval.impact}</span>
          </div>

          {phase === "review" && (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-line-dark text-[11px] text-dim mr-1">
                <span className="tabular-nums text-cream/85">{approval.confidence}%</span>
                <span>confidence</span>
              </div>
              <button
                onClick={() => onDecide(approval.id, "rejected")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-line-dark text-[13px] text-cream/70 hover:bg-ink-raised hover:text-cream hover:border-line-dark/80 transition-colors"
              >
                <X size={14} />
                Reject
              </button>
              <button
                onClick={() => setPhase("modifying")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-line-dark text-[13px] text-cream/85 hover:bg-ink-raised hover:text-cream hover:border-line-dark/80 transition-colors"
              >
                <PencilLine size={13} />
                Modify
              </button>
              <button
                onClick={() => onDecide(approval.id, "approved")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-violet hover:bg-violet-bright text-cream text-[13px] font-medium transition-colors shadow-[0_0_20px_rgba(111,91,255,0.35)]"
              >
                <Check size={14} />
                Approve
              </button>
            </div>
          )}
        </div>

        {/* Modify thread */}
        <AnimatePresence initial={false}>
          {phase !== "review" && (
            <motion.div
              key="modify-thread"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-line-dark space-y-3">
                {/* Your input */}
                <div className="flex gap-3">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-bright to-violet flex items-center justify-center text-cream text-[11px] font-medium shrink-0 mt-0.5">
                    VK
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-[12px] text-cream font-medium">You</span>
                      <span className="text-[11px] text-dim">to Amara</span>
                    </div>
                    {phase === "modifying" ? (
                      <div className="rounded-md border border-violet/30 bg-ink-deep/60 focus-within:border-violet/60">
                        <textarea
                          ref={textareaRef}
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                              e.preventDefault();
                              submitNote();
                            }
                          }}
                          placeholder="Tell Amara what to change — e.g. 'Hold the budget shift, but launch the TikTok creatives anyway. Brand needs to keep Meta at £60/day for awareness through their PR week.'"
                          className="w-full bg-transparent text-cream text-[13.5px] leading-relaxed outline-none resize-none p-3 placeholder:text-dim/70 min-h-[80px]"
                          rows={3}
                        />
                        <div className="flex items-center justify-between px-3 pb-2.5">
                          <span className="text-[11px] text-dim">
                            Amara will re-plan and send a fresh draft.{" "}
                            <kbd className="px-1 py-0.5 rounded bg-ink-raised border border-line-dark text-cream/85 text-[10px]">⌘</kbd>
                            <kbd className="ml-1 px-1 py-0.5 rounded bg-ink-raised border border-line-dark text-cream/85 text-[10px]">↵</kbd>
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setPhase("review");
                                setNote("");
                              }}
                              className="px-2.5 py-1 rounded-md text-[12px] text-dim hover:text-cream transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={submitNote}
                              disabled={!note.trim()}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-violet hover:bg-violet-bright disabled:opacity-40 disabled:cursor-not-allowed text-cream text-[12.5px] font-medium transition-colors shadow-[0_0_16px_rgba(111,91,255,0.3)]"
                            >
                              <Send size={12} />
                              Send to Amara
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-md bg-ink-deep/40 border border-line-dark px-3 py-2.5">
                        <p className="text-[13.5px] text-cream/90 leading-relaxed whitespace-pre-wrap">
                          {note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Amara reply */}
                {(phase === "amara-typing" || phase === "amara-replied") && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-3"
                  >
                    <div className="shrink-0 mt-0.5">
                      <AmaraOrb size={28} pulse={phase === "amara-typing"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-[12px] text-violet-bright font-medium">Amara</span>
                        <span className="text-[11px] text-dim">re: {approval.subagent}</span>
                      </div>
                      <div
                        className={cn(
                          "rounded-md border px-3 py-2.5 transition-colors",
                          phase === "amara-typing"
                            ? "border-line-dark bg-ink-deep/40"
                            : "border-violet/30 bg-violet/8"
                        )}
                      >
                        {phase === "amara-typing" ? (
                          <div className="flex items-center gap-2 text-[13px] text-dim">
                            <Loader2 size={12} className="text-violet-bright animate-spin" />
                            <span>Re-planning with your note…</span>
                          </div>
                        ) : (
                          <>
                            <p className="text-[13.5px] text-cream/95 leading-relaxed">
                              Got it. I&apos;ll re-plan {approval.subagent.toLowerCase()} against your note,
                              re-check against {client.name}&apos;s playbook, and{" "}
                              <span className="text-violet-bright font-medium">
                                send you an email once this is done again
                              </span>{" "}
                              with the updated draft.
                            </p>
                            <div className="mt-2 flex items-center gap-2 text-[11px] text-dim">
                              <Mail size={11} />
                              <span>vedaant@pulsedigital.co.uk</span>
                              <span>·</span>
                              <span>ETA ~6 min</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${channel.tone}, ${channel.tone}00)`,
        }}
      />
    </motion.article>
  );
}
