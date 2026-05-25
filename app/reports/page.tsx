import { PageHeader } from "@/components/SectionLabel";
import { MetricTile } from "@/components/MetricTile";
import { AreaChart } from "@/components/AreaChart";
import {
  agencyStats,
  channelBreakdown,
  channels,
  roasTrend,
  spendTrend,
  hoursSavedTrend,
} from "@/lib/mock-data";
import { Download, Mail } from "lucide-react";

const weekLabels = ["W -7", "W -6", "W -5", "W -4", "W -3", "W -2", "Last", "This"];

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        number="04"
        label="ROI · REPORTS · MAY 2026"
        title="287 hours saved."
        italicTitle="ROAS up 31%."
        trailingTitle="One agent."
        subtitle="Aggregate performance across every channel Amara runs for Pulse Digital. Pulled live from each channel, attribution model-corrected, voice-matched to your client-facing template."
        actions={
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-line-dark text-[12px] text-cream/85 hover:bg-ink-raised">
              <Download size={13} />
              Export PDF
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet hover:bg-violet-bright text-cream text-[12px] font-medium transition-colors shadow-[0_0_20px_rgba(111,91,255,0.3)]">
              <Mail size={13} />
              Send to clients
            </button>
          </div>
        }
      />

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <MetricTile
          label="Blended ROAS"
          value={agencyStats.blendedRoas}
          unit="×"
          delta={31}
          context="vs 8 weeks ago"
          emphasis
        />
        <MetricTile
          label="Ad spend managed"
          value={`£${(agencyStats.monthlySpend / 1000).toFixed(1)}k`}
          delta={27}
          context="rolling month"
        />
        <MetricTile
          label="Hours saved · 8 wks"
          value="1,920"
          delta={42}
          context="across all clients"
        />
        <MetricTile
          label="Retainer base"
          value={`£${(agencyStats.retainer / 1000).toFixed(2)}k`}
          delta={18}
          context="mo · 6 clients"
        />
      </section>

      <section className="rounded-lg border border-line-dark bg-ink-raised/40 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="label-micro mb-1">BLENDED ROAS · 8 WEEKS</div>
            <h3 className="text-cream text-[17px] font-medium tracking-tight">
              From 2.4× to <span className="font-italic-serif text-violet-tint">3.5×</span>. The compounding effect of 24/7 optimisation.
            </h3>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-violet" />
              <span className="text-cream">ROAS</span>
            </span>
          </div>
        </div>
        <AreaChart
          series={[{ name: "ROAS", data: roasTrend, color: "#6F5BFF" }]}
          labels={weekLabels}
          yFormatter={(v) => `${v.toFixed(1)}×`}
          height={260}
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="rounded-lg border border-line-dark bg-ink-raised/40 p-6">
          <div className="label-micro mb-1">AD SPEND MANAGED · £K MONTHLY</div>
          <h3 className="text-cream text-[16px] font-medium mb-4">
            From £8.0k → £10.3k monthly run rate.
          </h3>
          <AreaChart
            series={[{ name: "Spend", data: spendTrend, color: "#8B78FF" }]}
            labels={weekLabels}
            yFormatter={(v) => `£${v.toFixed(1)}k`}
            height={200}
          />
        </div>

        <div className="rounded-lg border border-line-dark bg-ink-raised/40 p-6">
          <div className="label-micro mb-1">HOURS SAVED · CUMULATIVE</div>
          <h3 className="text-cream text-[16px] font-medium mb-4">
            287 hours this week. <span className="text-dim">~£2.4k retainer headroom.</span>
          </h3>
          <AreaChart
            series={[{ name: "Hours", data: hoursSavedTrend, color: "#A89BFF" }]}
            labels={weekLabels}
            yFormatter={(v) => `${v.toFixed(0)}h`}
            height={200}
          />
        </div>
      </section>

      <section className="rounded-lg border border-line-dark bg-ink-raised/40 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="label-micro mb-1">CHANNEL BREAKDOWN · LAST 30 DAYS</div>
            <h3 className="text-cream text-[16px] font-medium">
              Where Amara is spending and what it&apos;s returning.
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left border-b border-line-dark">
                <th className="py-2.5 label-micro font-normal">Channel</th>
                <th className="py-2.5 label-micro font-normal text-right">Share</th>
                <th className="py-2.5 label-micro font-normal text-right">Spend</th>
                <th className="py-2.5 label-micro font-normal text-right">ROAS</th>
                <th className="py-2.5 label-micro font-normal text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-dark">
              {channelBreakdown.map((row) => {
                const c = channels[row.channel];
                return (
                  <tr key={row.channel} className="hover:bg-ink-deep/30">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-sm"
                          style={{
                            backgroundColor: c.tone,
                            boxShadow: `0 0 10px ${c.tone}66`,
                          }}
                        />
                        <span className="text-cream font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right tabular-nums">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-16 h-1 rounded-full bg-ink-deep overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${row.share * 3}%`,
                              backgroundColor: c.tone,
                            }}
                          />
                        </div>
                        <span className="text-cream/85">{row.share}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-right tabular-nums text-cream">
                      £{row.spend.toLocaleString()}
                    </td>
                    <td className="py-3 text-right tabular-nums">
                      <span
                        className={
                          row.roas >= 4
                            ? "text-violet-bright font-medium"
                            : row.roas >= 3
                              ? "text-cream"
                              : "text-cream/65"
                        }
                      >
                        {row.roas.toFixed(1)}×
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={
                          row.roas >= 4
                            ? "label-micro text-violet-bright"
                            : row.roas >= 3
                              ? "label-micro text-cream/70"
                              : "label-micro text-amber-400/80"
                        }
                      >
                        {row.roas >= 4 ? "SCALING" : row.roas >= 3 ? "HOLDING" : "WATCH"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
