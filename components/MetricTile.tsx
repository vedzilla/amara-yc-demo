import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;
  deltaSuffix?: string;
  context?: string;
  emphasis?: boolean;
  className?: string;
};

export function MetricTile({
  label,
  value,
  unit,
  delta,
  deltaSuffix = "%",
  context,
  emphasis,
  className,
}: Props) {
  const positive = delta !== undefined && delta >= 0;
  return (
    <div
      className={cn(
        "rounded-lg border p-5 transition-colors",
        emphasis
          ? "border-violet/30 bg-violet/8"
          : "border-line-dark bg-ink-raised/40 hover:border-line-dark/80",
        className
      )}
    >
      <div className="label-micro mb-3">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-[34px] font-medium tracking-tight text-cream tabular-nums leading-none">
          {value}
        </span>
        {unit && <span className="text-cream/60 text-base">{unit}</span>}
      </div>
      {(delta !== undefined || context) && (
        <div className="mt-3 flex items-center gap-2 text-[12px]">
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 tabular-nums font-medium",
                positive ? "text-violet-bright" : "text-cream/50"
              )}
            >
              {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {positive ? "+" : ""}
              {delta}
              {deltaSuffix}
            </span>
          )}
          {context && <span className="text-dim">{context}</span>}
        </div>
      )}
    </div>
  );
}
