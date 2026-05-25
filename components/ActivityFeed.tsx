import { Sparkles, AlertCircle, CheckCircle2, Circle } from "lucide-react";
import { activityFeed, type ActivityEntry } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const outcomeIcon = (o: ActivityEntry["outcome"]) => {
  if (o === "win") return <Sparkles size={13} className="text-violet-bright" />;
  if (o === "watch") return <AlertCircle size={13} className="text-amber-400" />;
  return <Circle size={6} fill="currentColor" className="text-dim/60" />;
};

export function ActivityFeed({ limit = 8 }: { limit?: number }) {
  const items = activityFeed.slice(0, limit);
  return (
    <ol className="divide-y divide-line-dark">
      {items.map((item) => (
        <li key={item.id} className="py-3 flex items-start gap-3 group">
          <div className="mt-0.5 flex items-center justify-center w-4 h-4">
            {outcomeIcon(item.outcome)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-[12px] text-violet-bright font-medium tracking-tight">
                {item.subagent}
              </span>
              {item.client && (
                <>
                  <span className="text-dim text-[11px]">·</span>
                  <span className="text-[12px] text-cream/70">{item.client}</span>
                </>
              )}
            </div>
            <p className="text-[13px] text-cream/85 mt-0.5 leading-snug">{item.action}</p>
          </div>
          <span className="text-[11px] text-dim tabular-nums shrink-0">{item.timestamp}</span>
        </li>
      ))}
    </ol>
  );
}

export function OutcomeBadge({ outcome }: { outcome: ActivityEntry["outcome"] }) {
  if (outcome === "win") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase text-violet-bright">
        <CheckCircle2 size={10} /> Win
      </span>
    );
  }
  if (outcome === "watch") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase text-amber-400">
        <AlertCircle size={10} /> Watch
      </span>
    );
  }
  return null;
}
