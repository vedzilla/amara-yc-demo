"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { approvals as seedApprovals, agencyStats } from "@/lib/mock-data";
import { ApprovalCard } from "@/components/ApprovalCard";
import { Toast } from "@/components/Toast";
import { PageHeader } from "@/components/SectionLabel";
import { SplitBar } from "@/components/SplitBar";
import { CheckCircle2, PencilLine, X, ClipboardList } from "lucide-react";

type Decision = "approved" | "modified" | "rejected";

export default function ApprovalsPage() {
  const [queue, setQueue] = useState(seedApprovals);
  const [toast, setToast] = useState<{ visible: boolean; decision: Decision; message?: string }>({
    visible: false,
    decision: "approved",
  });

  const handleDecide = (id: string, decision: Decision) => {
    const item = queue.find((q) => q.id === id);
    setQueue((q) => q.filter((x) => x.id !== id));
    setToast({
      visible: true,
      decision,
      message:
        decision === "approved"
          ? `${item?.subagent} · ${item?.title.split(" ").slice(0, 5).join(" ")}…`
          : undefined,
    });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2400);
  };

  const decided7d =
    agencyStats.approvalsApproved7d +
    agencyStats.approvalsModified7d +
    agencyStats.approvalsRejected7d;
  const approvedPct = Math.round((agencyStats.approvalsApproved7d / decided7d) * 100);
  const modifiedPct = Math.round((agencyStats.approvalsModified7d / decided7d) * 100);
  const rejectedPct = 100 - approvedPct - modifiedPct;

  return (
    <div className="relative">
      <PageHeader
        number="01"
        label="APPROVAL QUEUE"
        title="Every spend pauses here."
        italicTitle="The 70/30."
        subtitle="Amara has drafted these decisions across your clients. Approve, modify, or reject — Amara will execute the moment you decide. Material changes always come back through this queue."
        actions={
          <div className="flex items-center gap-2 text-[12px]">
            <span className="px-3 py-1.5 rounded-md border border-line-dark bg-ink-raised/50 text-cream/85 tabular-nums">
              <span className="text-violet-bright font-medium">{queue.length}</span>{" "}
              <span className="text-dim">in queue</span>
            </span>
          </div>
        }
      />

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-4">
          {queue.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-line-dark bg-ink-raised/30 p-12 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-violet/15 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 size={26} className="text-violet-bright" />
              </div>
              <h3 className="text-cream text-lg font-medium">Inbox zero.</h3>
              <p className="text-dim text-[14px] mt-1.5 max-w-sm mx-auto">
                Amara is running. Subagents will surface the next decision when there&apos;s
                something for you to weigh in on.
              </p>
              <button
                onClick={() => setQueue(seedApprovals)}
                className="mt-5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-line-dark text-[12px] text-cream/80 hover:bg-ink-raised hover:text-cream transition-colors"
              >
                <ClipboardList size={13} />
                Restore demo queue
              </button>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {queue.map((a) => (
                <ApprovalCard key={a.id} approval={a} onDecide={handleDecide} />
              ))}
            </AnimatePresence>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-[88px] lg:self-start">
          <div className="rounded-lg border border-line-dark bg-ink-raised/40 p-5">
            <div className="label-micro mb-3">The 70/30 split</div>
            <SplitBar leftLabel="Amara" rightLabel="Agency approval" leftPct={70} rightPct={30} />
            <p className="mt-3 text-[12.5px] text-cream/70 leading-relaxed">
              Amara handles 70% of the work end to end. Every spend, every material change, every
              creative goes through you. <span className="font-italic-serif text-violet-tint">Clients want a name to call.</span>
            </p>
          </div>

          <div className="rounded-lg border border-line-dark bg-ink-raised/40 p-5">
            <div className="label-micro mb-4">Your last 7 days</div>
            <div className="space-y-3">
              <Stat
                icon={CheckCircle2}
                iconClass="text-violet-bright"
                label="Approved"
                value={agencyStats.approvalsApproved7d}
                pct={approvedPct}
              />
              <Stat
                icon={PencilLine}
                iconClass="text-cream/80"
                label="Modified"
                value={agencyStats.approvalsModified7d}
                pct={modifiedPct}
              />
              <Stat
                icon={X}
                iconClass="text-dim"
                label="Rejected"
                value={agencyStats.approvalsRejected7d}
                pct={rejectedPct}
              />
            </div>
            <p className="mt-4 text-[12px] text-dim leading-relaxed">
              {approvedPct}% approve rate means Amara is learning your taste. Each modify-or-reject
              feeds the playbook.
            </p>
          </div>

          <div className="rounded-lg border border-violet/30 bg-violet/8 p-5">
            <div className="label-micro text-violet-bright mb-2">Vs. fully autonomous agents</div>
            <p className="text-[13px] text-cream/90 leading-relaxed">
              Lucy and other autonomous tools ship without a human in the loop.{" "}
              <span className="font-italic-serif text-violet-tint">
                24 of 24 agencies told us they would not hand a client over without sign-off.
              </span>{" "}
              This screen is the wedge.
            </p>
          </div>
        </aside>
      </section>

      <Toast visible={toast.visible} decision={toast.decision} message={toast.message} />
    </div>
  );
}

function Stat({
  icon: Icon,
  iconClass,
  label,
  value,
  pct,
}: {
  icon: React.ElementType;
  iconClass: string;
  label: string;
  value: number;
  pct: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={14} className={iconClass} />
      <div className="flex-1">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[13px] text-cream/85">{label}</span>
          <span className="tabular-nums text-[13px] text-cream font-medium">{value}</span>
        </div>
        <div className="h-1 rounded-full bg-ink-deep overflow-hidden">
          <div
            className="h-full bg-violet/80 rounded-full"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
