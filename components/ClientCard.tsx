import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { type Client } from "@/lib/mock-data";
import { ChannelDot } from "./ChannelBadge";
import { cn } from "@/lib/cn";

const statusMeta = {
  healthy: { dot: "bg-emerald-400", label: "Healthy" },
  attention: { dot: "bg-amber-400", label: "Attention" },
  onboarding: { dot: "bg-violet", label: "Onboarding" },
};

export function ClientCard({ client, compact }: { client: Client; compact?: boolean }) {
  const meta = statusMeta[client.status];
  const positive = client.roasDelta >= 0;
  return (
    <Link
      href={`/clients/${client.slug}`}
      className="group block rounded-lg border border-line-dark bg-ink-raised/40 hover:bg-ink-raised hover:border-violet/40 transition-colors p-5"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
            <span className="label-micro text-dim">{meta.label}</span>
          </div>
          <h3 className="text-cream text-[16px] font-medium tracking-tight truncate">
            {client.name}
          </h3>
          <p className="text-dim text-[12px] mt-0.5">{client.category}</p>
        </div>
        <ArrowUpRight
          size={16}
          className="text-dim group-hover:text-violet-bright transition-colors shrink-0"
        />
      </div>

      <div className="mt-5 flex items-center gap-1.5">
        {client.channels.map((c) => (
          <ChannelDot key={c} channel={c} size={8} />
        ))}
      </div>

      {!compact && (
        <div className="mt-5 grid grid-cols-3 gap-3 pt-4 border-t border-line-dark">
          <div>
            <div className="label-micro text-dim/80 mb-1">ROAS</div>
            <div className="flex items-baseline gap-1">
              <span className="text-cream text-[18px] font-medium tabular-nums">{client.roas}</span>
              <span className="text-dim text-[11px]">×</span>
              <span
                className={cn(
                  "ml-1 inline-flex items-center text-[11px] tabular-nums",
                  positive ? "text-violet-bright" : "text-amber-400/85"
                )}
              >
                {positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {positive ? "+" : ""}
                {client.roasDelta.toFixed(1)}
              </span>
            </div>
          </div>
          <div>
            <div className="label-micro text-dim/80 mb-1">Spend / mo</div>
            <div className="text-cream text-[18px] font-medium tabular-nums">
              £{(client.monthlySpend / 1000).toFixed(2)}k
            </div>
          </div>
          <div>
            <div className="label-micro text-dim/80 mb-1">Hrs saved</div>
            <div className="text-cream text-[18px] font-medium tabular-nums">
              {client.hoursSaved}
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
