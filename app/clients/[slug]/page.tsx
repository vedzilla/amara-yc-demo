import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDownRight,
  Book,
  ChevronLeft,
  Bot,
  Sparkles,
} from "lucide-react";
import { clients, approvals, activityFeed, channels } from "@/lib/mock-data";
import { subagents } from "@/lib/subagents";
import { ChannelBadge } from "@/components/ChannelBadge";
import { PageHeader } from "@/components/SectionLabel";
import { Sparkline } from "@/components/Sparkline";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return clients.map((c) => ({ slug: c.slug }));
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = clients.find((c) => c.slug === slug);
  if (!client) notFound();

  const clientApprovals = approvals.filter((a) => a.client === slug);
  const clientActivity = activityFeed.filter((a) => a.client === client.name).slice(0, 5);
  const assignedSubagents = subagents.filter(
    (s) => s.client === client.name || (!s.client && s.status === "working")
  ).slice(0, 6);

  // Synthesize a 12-week ROAS trend ending at current value
  const trend = Array.from({ length: 12 }, (_, i) => {
    const noise = Math.sin(i * 1.2) * 0.18;
    return Math.max(0.5, client.roas - (11 - i) * (client.roasDelta / 11) + noise);
  });

  const positive = client.roasDelta >= 0;
  const statusMeta = {
    healthy: { dot: "bg-emerald-400", label: "Healthy" },
    attention: { dot: "bg-amber-400", label: "Attention" },
    onboarding: { dot: "bg-violet", label: "Onboarding" },
  }[client.status];

  return (
    <div>
      <Link
        href="/clients"
        className="inline-flex items-center gap-1 text-[12px] text-dim hover:text-cream mb-3 transition-colors"
      >
        <ChevronLeft size={13} />
        All clients
      </Link>

      <header className="border-b border-line-dark pb-8 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className={cn("h-1.5 w-1.5 rounded-full", statusMeta.dot)} />
          <span className="label-micro text-dim">{statusMeta.label} · {client.category}</span>
        </div>
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-cream leading-[1.05]">
              {client.name}
            </h1>
            <p className="text-dim mt-3 max-w-2xl text-[14px]">
              {client.channels.length} channels live · £{client.retainer.toLocaleString()}/mo
              retainer · Onboarded via Amara
            </p>
          </div>
          <div className="flex items-center gap-2">
            {client.channels.map((c) => (
              <ChannelBadge key={c} channel={c} size="md" />
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-10">
          {/* Performance */}
          <section>
            <div className="label-micro mb-4">PERFORMANCE · ROLLING 12 WEEKS</div>
            <div className="rounded-lg border border-line-dark bg-ink-raised/40 p-6">
              <div className="flex items-baseline justify-between mb-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-[42px] font-medium text-cream tabular-nums leading-none">
                    {client.roas}×
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-[13px] tabular-nums font-medium",
                      positive ? "text-violet-bright" : "text-amber-400"
                    )}
                  >
                    {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                    {positive ? "+" : ""}
                    {client.roasDelta.toFixed(1)}
                  </span>
                  <span className="text-dim text-[12px] ml-1">ROAS · vs last 12 wks</span>
                </div>
                <div className="text-right">
                  <div className="label-micro text-dim/80">Monthly spend</div>
                  <div className="text-cream text-[16px] font-medium tabular-nums">
                    £{client.monthlySpend.toLocaleString()}<span className="text-dim text-[12px]">/mo</span>
                  </div>
                </div>
              </div>
              <Sparkline data={trend} width={800} height={120} />
            </div>
          </section>

          {/* Channel breakdown */}
          <section>
            <div className="label-micro mb-4">CHANNELS · CURRENT STATE</div>
            <div className="space-y-2">
              {client.channels.map((ck) => {
                const c = channels[ck];
                const fakeRoas = (client.roas + (Math.random() - 0.3) * 1.2).toFixed(1);
                const fakeSpend = Math.floor(client.monthlySpend / client.channels.length);
                return (
                  <div
                    key={ck}
                    className="rounded-lg border border-line-dark bg-ink-raised/40 p-4 flex items-center gap-4"
                  >
                    <div
                      className="h-8 w-8 rounded-md flex items-center justify-center text-[11px] font-medium text-cream shrink-0"
                      style={{
                        backgroundColor: `${c.tone}25`,
                        boxShadow: `inset 0 0 0 1px ${c.tone}50`,
                      }}
                    >
                      <span style={{ color: c.tone }}>{c.short.slice(0, 2)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-cream text-[14px] font-medium">{c.name}</div>
                      <div className="text-[11px] text-dim mt-0.5">
                        Run by {c.name} subagent · last synced 2 min ago
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-cream text-[14px] tabular-nums font-medium">
                        {fakeRoas}×
                      </div>
                      <div className="text-[11px] text-dim">ROAS</div>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-cream text-[14px] tabular-nums font-medium">
                        £{fakeSpend.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-dim">/mo</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Pending approvals for this client */}
          {clientApprovals.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="label-micro">
                  <Sparkles size={11} className="inline mr-1 -mt-0.5 text-violet-bright" />
                  AWAITING YOUR APPROVAL
                </div>
                <Link
                  href="/approvals"
                  className="text-[12px] text-dim hover:text-cream transition-colors"
                >
                  Open queue →
                </Link>
              </div>
              <div className="space-y-2">
                {clientApprovals.map((ap) => (
                  <Link
                    key={ap.id}
                    href="/approvals"
                    className="block rounded-lg border border-violet/30 bg-violet/8 hover:bg-violet/12 p-4 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] text-violet-bright font-medium tracking-tight">
                        {ap.subagent}
                      </span>
                      <ChannelBadge channel={ap.channel} />
                    </div>
                    <div className="text-cream text-[14px] font-medium leading-snug">
                      {ap.title}
                    </div>
                    <div className="text-[12px] text-cream/65 mt-2">{ap.impact}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-line-dark bg-ink-raised/40 p-5">
            <div className="label-micro mb-3 flex items-center gap-1.5">
              <Book size={11} className="text-violet-bright" />
              CLIENT PLAYBOOK
            </div>
            <p className="text-cream/85 text-[13.5px] leading-relaxed font-italic-serif">
              {client.playbook}
            </p>
            <div className="mt-4 pt-4 border-t border-line-dark">
              <div className="label-micro mb-2">Hours saved · this month</div>
              <div className="text-2xl text-cream font-medium tabular-nums">
                {client.hoursSaved}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line-dark bg-ink-raised/40 p-5">
            <div className="label-micro mb-3 flex items-center gap-1.5">
              <Bot size={11} className="text-violet-bright" />
              SUBAGENTS ON THIS ACCOUNT
            </div>
            <div className="space-y-2">
              {assignedSubagents.map((s) => (
                <div
                  key={s.id}
                  className="flex items-start gap-2.5 py-1.5"
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full mt-1.5 shrink-0",
                      s.status === "working"
                        ? "bg-violet animate-pulse-soft"
                        : s.status === "review" || s.status === "awaiting"
                          ? "bg-amber-400"
                          : "bg-dim/60"
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-cream text-[12.5px] font-medium">{s.name}</div>
                    {s.currentTask && (
                      <div className="text-dim text-[11px] truncate">{s.currentTask}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {clientActivity.length > 0 && (
            <div className="rounded-lg border border-line-dark bg-ink-raised/40 p-5">
              <div className="label-micro mb-3">RECENT ACTIVITY</div>
              <ol className="space-y-3">
                {clientActivity.map((a) => (
                  <li key={a.id}>
                    <div className="text-[11px] text-violet-bright font-medium">
                      {a.subagent}
                      <span className="text-dim font-normal ml-2">· {a.timestamp}</span>
                    </div>
                    <div className="text-[12px] text-cream/85 mt-0.5">{a.action}</div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
