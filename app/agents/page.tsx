import { Sparkles, Activity, Workflow } from "lucide-react";
import { subagentsByCategory, categoryLabels, categoryDescriptions, subagents } from "@/lib/subagents";
import { PageHeader } from "@/components/SectionLabel";
import { SubagentTile } from "@/components/SubagentTile";
import { AmaraOrb } from "@/components/AmaraOrb";
import { ActivityFeed } from "@/components/ActivityFeed";

export default function AgentsPage() {
  const working = subagents.filter((s) => s.status === "working").length;
  const awaiting = subagents.filter((s) => s.status === "awaiting" || s.status === "review").length;
  const idle = subagents.filter((s) => s.status === "idle").length;
  const complete = subagents.filter((s) => s.status === "complete").length;

  return (
    <div>
      <PageHeader
        number="02"
        label="THE 20 SUBAGENTS · LIVE"
        title="One master."
        italicTitle="Twenty specialists."
        subtitle="Amara delegates to specialised subagents across channel, optimisation, and strategy. Each one owns a narrow job and runs it well — orchestrated by the master agent in the centre."
        actions={
          <div className="flex items-center gap-2 text-[12px]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-violet/30 bg-violet/8">
              <span className="h-1.5 w-1.5 rounded-full bg-violet animate-pulse-soft" />
              <span className="text-cream tabular-nums font-medium">{working}</span>
              <span className="text-dim">working</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-amber-500/30 bg-amber-500/8">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-soft" />
              <span className="text-cream tabular-nums font-medium">{awaiting}</span>
              <span className="text-dim">awaiting</span>
            </span>
          </div>
        }
      />

      {/* Master agent — hero orchestration band */}
      <section className="relative rounded-xl border border-line-dark bg-gradient-to-b from-ink-raised/50 to-ink-deep/30 overflow-hidden mb-10">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 50% 80% at 50% 50%, rgba(111,91,255,0.18), transparent 70%)",
          }}
        />
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 px-8 py-10">
          <div className="text-right hidden md:block">
            <div className="label-micro text-violet-bright mb-2">Inbound</div>
            <p className="text-cream text-[15px] leading-relaxed">
              Brand playbook, channel data, client goals.
            </p>
            <p className="text-dim text-[12px] mt-2">
              Amara ingests once, references every decision.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <AmaraOrb size={140} label="Amara" />
            <div className="mt-5 flex items-center gap-2 text-[11px] text-dim">
              <Workflow size={11} />
              <span>Orchestrating</span>
              <span className="text-cream tabular-nums">{subagents.length}</span>
              <span>subagents</span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="label-micro text-violet-bright mb-2">Outbound</div>
            <p className="text-cream text-[15px] leading-relaxed">
              Drafts, decisions, reports — every one ready for your sign-off.
            </p>
            <p className="text-dim text-[12px] mt-2">
              <span className="font-italic-serif text-violet-tint">The team approves. Amara does the work.</span>
            </p>
          </div>
        </div>

        <div className="relative border-t border-line-dark px-8 py-3 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-5">
            <StatPill dotClass="bg-violet animate-pulse-soft" label="Working" value={working} />
            <StatPill dotClass="bg-amber-400" label="Awaiting" value={awaiting} />
            <StatPill dotClass="bg-emerald-400" label="Complete" value={complete} />
            <StatPill dotClass="bg-dim" label="Idle" value={idle} />
          </div>
          <div className="flex items-center gap-2 text-dim">
            <Activity size={11} />
            <span>Continuous · 24/7</span>
          </div>
        </div>
      </section>

      {/* Three columns of subagents */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {(["channel", "optimisation", "strategy"] as const).map((cat) => (
          <div key={cat}>
            <div className="flex items-baseline justify-between mb-3">
              <div className="label-micro text-violet-bright">{categoryLabels[cat]}</div>
              <div className="text-[11px] text-dim">{subagentsByCategory[cat].length} agents</div>
            </div>
            <p className="text-[12.5px] text-dim mb-4 leading-relaxed">
              {categoryDescriptions[cat]}
            </p>
            <div className="space-y-2.5">
              {subagentsByCategory[cat].map((s) => (
                <SubagentTile key={s.id} s={s} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Live activity strip */}
      <section className="rounded-lg border border-line-dark bg-ink-raised/40 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="label-micro mb-1">
              <Sparkles size={11} className="inline mr-1 -mt-0.5 text-violet-bright" />
              ORCHESTRATION FEED · LAST HOUR
            </div>
            <h3 className="text-cream text-[15px] font-medium">
              What subagents have been doing while you were in meetings.
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-dim">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-violet animate-ping-soft" />
              <span className="relative rounded-full bg-violet h-1.5 w-1.5" />
            </span>
            Streaming
          </div>
        </div>
        <ActivityFeed limit={10} />
      </section>
    </div>
  );
}

function StatPill({ dotClass, label, value }: { dotClass: string; label: string; value: number }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      <span className="text-cream tabular-nums font-medium">{value}</span>
      <span className="text-dim">{label}</span>
    </span>
  );
}
