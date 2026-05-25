import { type Subagent } from "@/lib/subagents";
import { cn } from "@/lib/cn";

const statusMeta = {
  idle: { label: "Idle", dot: "bg-dim/60" },
  working: { label: "Working", dot: "bg-violet animate-pulse-soft" },
  review: { label: "Review ready", dot: "bg-amber-400 animate-pulse-soft" },
  awaiting: { label: "Awaiting you", dot: "bg-amber-400" },
  complete: { label: "Complete", dot: "bg-emerald-400" },
};

export function SubagentTile({ s }: { s: Subagent }) {
  const meta = statusMeta[s.status];
  const isWorking = s.status === "working";

  return (
    <div
      className={cn(
        "relative rounded-lg border bg-ink-raised/40 p-4 overflow-hidden transition-colors",
        s.status === "awaiting" || s.status === "review"
          ? "border-amber-500/30"
          : isWorking
            ? "border-violet/30"
            : "border-line-dark hover:border-line-dark/80"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="min-w-0">
          <h3 className="text-cream text-[13.5px] font-medium tracking-tight truncate">
            {s.name}
          </h3>
          <p className="text-dim text-[11px] mt-0.5 leading-snug line-clamp-2">
            {s.description}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
          <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
          <span className="text-[10px] tracking-wider uppercase text-dim/90">{meta.label}</span>
        </div>
      </div>

      {s.currentTask && (
        <div className="rounded-md border border-line-dark/80 bg-ink-deep/60 p-2.5">
          <div className="label-micro text-dim/80 mb-1">Currently</div>
          <div className="text-[12.5px] text-cream/90 leading-snug">{s.currentTask}</div>
          {s.client && (
            <div className="text-[11px] text-violet-bright/85 mt-1.5">{s.client}</div>
          )}
        </div>
      )}

      {isWorking && (
        <div className="relative h-[2px] mt-3 rounded-full bg-line-darker overflow-hidden work-bar" />
      )}
    </div>
  );
}
