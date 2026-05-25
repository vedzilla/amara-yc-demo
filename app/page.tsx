import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Sparkles,
  Clock,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import {
  agencyStats,
  clients,
  approvals,
  roasTrend,
  hoursSavedTrend,
} from "@/lib/mock-data";
import { MetricTile } from "@/components/MetricTile";
import { Sparkline } from "@/components/Sparkline";
import { ClientCard } from "@/components/ClientCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { PageHeader } from "@/components/SectionLabel";
import { ChannelDot } from "@/components/ChannelBadge";

export default function MissionControl() {
  const topPriority = approvals
    .filter((a) => a.priority === "now")
    .slice(0, 2);
  return (
    <div>
      <PageHeader
        number="00"
        label="MISSION CONTROL · MAY 2026"
        title="Good morning, Vedaant."
        italicTitle="Pulse Digital,"
        trailingTitle="this week."
        subtitle={`Across ${agencyStats.clients} clients and ${agencyStats.channels} channels, Amara managed £${(agencyStats.monthlySpend / 1000).toFixed(1)}k of ad spend this month, saved your team ${agencyStats.hoursSaved} hours, and held blended ROAS at ${agencyStats.blendedRoas}× — up ${agencyStats.blendedRoasDelta} from last week.`}
        actions={
          <Link
            href="/approvals"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-violet hover:bg-violet-bright text-cream text-[13px] font-medium transition-colors shadow-[0_0_24px_rgba(111,91,255,0.35)]"
          >
            <Sparkles size={14} />
            Review {agencyStats.approvalsWaiting} approvals
          </Link>
        }
      />

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <MetricTile
          label="Blended ROAS"
          value={agencyStats.blendedRoas}
          unit="×"
          delta={11}
          context="vs last week"
        />
        <MetricTile
          label="Spend managed"
          value={`£${(agencyStats.monthlySpend / 1000).toFixed(1)}k`}
          delta={8}
          context="this month"
        />
        <MetricTile
          label="Hours saved"
          value={agencyStats.hoursSaved}
          delta={14}
          context="this week"
        />
        <MetricTile
          label="Approvals waiting"
          value={agencyStats.approvalsWaiting}
          context={`${agencyStats.approvalsApproved7d} approved last 7d`}
          emphasis
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-10">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-cream text-[18px] font-medium tracking-tight">
                <span className="text-dim mr-2">·</span>
                Decide first
              </h2>
              <Link
                href="/approvals"
                className="inline-flex items-center gap-1 text-[12px] text-dim hover:text-cream transition-colors"
              >
                Open queue <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topPriority.map((ap) => {
                const client = clients.find((c) => c.slug === ap.client)!;
                return (
                  <Link
                    key={ap.id}
                    href="/approvals"
                    className="group rounded-lg border border-line-dark bg-ink-raised/40 hover:border-violet/40 transition-colors p-4 block"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] tracking-wider uppercase bg-amber-500/15 text-amber-300">
                        Now
                      </span>
                      <span className="text-[11px] text-violet-bright font-medium tracking-tight">
                        {ap.subagent}
                      </span>
                      <span className="text-dim text-[11px]">·</span>
                      <span className="text-[11px] text-dim">{client.name}</span>
                    </div>
                    <div className="text-[14px] text-cream font-medium leading-snug">
                      {ap.title}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[11px] text-cream/65">{ap.impact}</span>
                      <ArrowUpRight
                        size={14}
                        className="text-dim group-hover:text-violet-bright transition-colors"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-cream text-[18px] font-medium tracking-tight">
                <span className="text-dim mr-2">·</span>
                Clients
              </h2>
              <Link
                href="/clients"
                className="inline-flex items-center gap-1 text-[12px] text-dim hover:text-cream transition-colors"
              >
                All clients <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {clients.slice(0, 6).map((c) => (
                <ClientCard key={c.slug} client={c} />
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-line-dark bg-ink-raised/40 p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="label-micro">Blended ROAS · 8 weeks</div>
              <TrendingUp size={14} className="text-violet-bright" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-medium text-cream tabular-nums">
                {agencyStats.blendedRoas}
              </span>
              <span className="text-cream/60 text-sm">×</span>
              <span className="text-violet-bright text-[12px] tabular-nums">
                +{agencyStats.blendedRoasDelta}
              </span>
            </div>
            <div className="mt-3">
              <Sparkline data={roasTrend} width={300} height={70} />
            </div>
          </div>

          <div className="rounded-lg border border-line-dark bg-ink-raised/40 p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="label-micro">Hours saved · 8 weeks</div>
              <Clock size={14} className="text-violet-bright" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-medium text-cream tabular-nums">
                {agencyStats.hoursSaved}
              </span>
              <span className="text-cream/60 text-sm">hrs this wk</span>
            </div>
            <div className="mt-3">
              <Sparkline data={hoursSavedTrend} width={300} height={70} />
            </div>
          </div>

          <div className="rounded-lg border border-line-dark bg-ink-raised/40 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="label-micro">Live activity</div>
              <div className="flex items-center gap-1.5">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-violet animate-ping-soft" />
                  <span className="relative rounded-full bg-violet h-1.5 w-1.5" />
                </span>
                <span className="text-[11px] text-dim">Live</span>
              </div>
            </div>
            <ActivityFeed limit={6} />
            <Link
              href="/agents"
              className="mt-3 inline-flex items-center gap-1 text-[12px] text-dim hover:text-cream transition-colors"
            >
              <Bot size={12} />
              See all subagents <ChevronRight size={12} />
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
