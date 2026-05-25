import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Mail,
  MessagesSquare,
  Brain,
} from "lucide-react";
import {
  agencyStats,
  clients,
  approvals,
  roasTrend,
  hoursSavedTrend,
  spendTrend,
} from "@/lib/mock-data";
import { messages, brainEntries } from "@/lib/comms";
import { Sparkline } from "@/components/Sparkline";
import { TriangleMark } from "@/components/TriangleMark";

// Editorial Mission Control · "The Pulse Brief"
// Channels Bloomberg Businessweek + Pentagram + The Economist.
// Italic display as structural language, Roman numerals, dropped caps,
// masthead, marginalia, "the book" treatment for clients.

export default function MissionControl() {
  const lead = approvals.find((a) => a.priority === "now")!;
  const desk = approvals.filter((a) => a.id !== lead.id).slice(0, 3);
  const tickerItems = [
    { k: "BLENDED ROAS", v: `${agencyStats.blendedRoas}×`, d: `+${agencyStats.blendedRoasDelta}` },
    { k: "AD SPEND / MO", v: `£${(agencyStats.monthlySpend / 1000).toFixed(1)}k`, d: "+8%" },
    { k: "HOURS SAVED · WK", v: `${agencyStats.hoursSaved}`, d: "+14%" },
    { k: "APPROVALS WAITING", v: `${agencyStats.approvalsWaiting}`, d: `${agencyStats.approvalsApproved7d} this wk` },
    { k: "BRAIN ENTRIES · 7D", v: "142", d: "+23 today" },
    { k: "VOICE PROFILES", v: "6", d: "+1 this wk" },
  ];

  return (
    <article className="relative pb-24 -mx-8 -mt-8">
      {/* ─── MASTHEAD ─── */}
      <header className="px-10 pt-10 pb-6 border-b border-line-dark">
        <div className="flex items-center justify-between text-[11px] small-caps text-dim mb-6 tracking-wider">
          <div className="flex items-center gap-3">
            <TriangleMark size={14} />
            <span>Pulse Digital · Manchester</span>
            <span className="text-dim/40">·</span>
            <span>Issue Nº 041</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Tue · May 26 · 2026</span>
            <span className="text-dim/40">·</span>
            <span className="text-violet-bright">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-9">
            <div className="label-micro text-violet-bright mb-3 tracking-mega">M I S S I O N &nbsp; C O N T R O L</div>
            <h1 className="text-[68px] md:text-[88px] leading-[0.92] tracking-tight text-cream font-medium">
              The{" "}
              <span className="font-italic-serif text-violet-tint">Pulse</span>{" "}
              Brief.
            </h1>
            <p className="byline mt-4 text-[13.5px]">
              Edited by Vedaant Kavasseri. Reported by twenty subagents.
            </p>
          </div>
          <div className="col-span-12 md:col-span-3 text-right">
            <div className="label-micro text-dim/80 mb-2">In this issue</div>
            <ol className="space-y-1 text-[12px] text-cream/85 list-none">
              <li><span className="roman-numeral text-violet-bright mr-2">I.</span>The lead</li>
              <li><span className="roman-numeral text-violet-bright mr-2">II.</span>On the desk today</li>
              <li><span className="roman-numeral text-violet-bright mr-2">III.</span>The book</li>
              <li><span className="roman-numeral text-violet-bright mr-2">IV.</span>What Amara heard</li>
            </ol>
          </div>
        </div>

        <div className="mt-7 masthead-rule" />
      </header>

      {/* ─── TICKER ─── */}
      <div className="border-b border-line-dark bg-ink-deep/40 overflow-hidden">
        <div className="flex whitespace-nowrap py-2.5 ticker">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-6 text-[11px]">
              <span className="small-caps tracking-wider text-dim">{t.k}</span>
              <span className="text-cream tabular-nums font-medium">{t.v}</span>
              <span className="text-violet-bright tabular-nums">{t.d}</span>
              <span className="text-dim/50 ml-3">◇</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── EDITOR'S BRIEF ─── */}
      <section className="px-10 pt-10 pb-12 grid grid-cols-12 gap-8 border-b border-line-dark">
        <div className="col-span-12 md:col-span-2 md:text-right">
          <div className="label-micro text-violet-bright">Editor&apos;s brief</div>
          <div className="byline text-[12px] mt-1">9:14 am</div>
        </div>
        <div className="col-span-12 md:col-span-7">
          <p className="drop-cap text-[18px] leading-[1.65] text-cream/95 font-light">
            <span className="font-italic-serif text-violet-tint">G</span>ood morning. Six clients are running this morning, twenty-three channels are live, and Amara has £10.3k of monthly ad spend under management. Blended returns held at <span className="font-medium text-cream">3.5×</span>, up 0.4 on the week. The desk has seven decisions waiting — three of them want answers before lunch. The book is healthy. Two clients on watch, neither bleeding. <span className="font-italic-serif text-violet-tint">Read on.</span>
          </p>
        </div>
        <aside className="col-span-12 md:col-span-3 border-l border-line-dark pl-6 hidden md:block">
          <div className="label-micro mb-3">The numbers</div>
          <dl className="space-y-2.5 text-[12.5px]">
            <Stat k="Clients" v={`${agencyStats.clients}`} />
            <Stat k="Channels live" v={`${agencyStats.channels}`} />
            <Stat k="Spend / month" v={`£${(agencyStats.monthlySpend / 1000).toFixed(1)}k`} />
            <Stat k="Retainer base" v={`£${(agencyStats.retainer / 1000).toFixed(2)}k`} />
            <Stat k="Hours saved · wk" v={`${agencyStats.hoursSaved}`} />
            <Stat k="Approvals waiting" v={`${agencyStats.approvalsWaiting}`} accent />
          </dl>
        </aside>
      </section>

      {/* ─── I · THE LEAD ─── */}
      <section className="px-10 pt-14 pb-12 border-b border-line-dark grid grid-cols-12 gap-8">
        <SectionMarker numeral="I" label="The lead" />

        <div className="col-span-12 md:col-span-7">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-amber-500/15 text-amber-300 text-[10px] tracking-wider uppercase">
              Decide now
            </span>
            <span className="byline text-[12px]">
              filed 8 min ago by <span className="text-cream">{lead.subagent}</span> Subagent
            </span>
          </div>

          <h2 className="text-[42px] md:text-[54px] leading-[0.98] tracking-tight text-cream font-medium mb-5">
            Meta is leaking{" "}
            <span className="font-italic-serif text-violet-tint">£60/day</span>.
            TikTok is{" "}
            <span className="font-italic-serif text-violet-tint">starving</span>.
          </h2>

          <p className="text-[16.5px] leading-[1.65] text-cream/85 max-w-prose mb-5">
            {lead.reasoning} The recommendation: shift £30/day from Meta Advantage+ to the TikTok Spark account, bringing TikTok&apos;s daily up to £90 and dropping Meta to £30 until next week&apos;s creative refresh lands.<sup className="footnote-ref">1</sup>
          </p>

          <blockquote className="pull-quote border-l-2 border-violet pl-5 my-7 max-w-[34ch]">
            “Lookalike fatigue on Meta is real, last creative refresh was 41 days ago. TikTok still has runway.”
          </blockquote>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6 mb-6 pt-5 border-t border-line-dark">
            {lead.evidence.map((e) => (
              <div key={e.label}>
                <div className="label-micro text-dim/80">{e.label}</div>
                <div className="text-cream font-medium tabular-nums mt-1 text-[16px]">{e.value}</div>
              </div>
            ))}
          </div>

          <Link
            href="/approvals"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-violet hover:bg-violet-bright text-cream text-[13px] font-medium transition-colors shadow-[0_0_24px_rgba(111,91,255,0.35)]"
          >
            <Sparkles size={14} />
            Open in approval queue
            <ArrowUpRight size={14} />
          </Link>

          <p className="byline text-[11px] mt-8 italic">
            <sup className="text-violet-bright not-italic">1</sup> Projection assumes TikTok ROAS holds within 0.3× of trailing 14-day median. Bid management subagent will re-evaluate hourly.
          </p>
        </div>

        <aside className="col-span-12 md:col-span-5 border-l border-line-dark md:pl-8">
          <div className="label-micro mb-4">Confidence · 91%</div>
          <div className="rounded-md border border-line-dark bg-ink-deep/60 p-5">
            <div className="label-micro text-dim/80 mb-1">Before</div>
            <div className="text-cream text-[24px] font-medium tabular-nums">£60<span className="text-dim text-[14px]">/day Meta</span></div>
            <div className="diamond-rule my-4">
              <span className="diamond-rule-diamond" />
            </div>
            <div className="label-micro text-violet-bright/80 mb-1">After</div>
            <div className="text-cream text-[24px] font-medium tabular-nums">£30<span className="text-dim text-[14px]">/day Meta</span> · £90<span className="text-dim text-[14px]">/day TikTok</span></div>
          </div>

          <div className="diamond-rule my-7">
            <span className="diamond-rule-diamond" />
            <span className="small-caps tracking-wider text-dim text-[10px]">Projected impact</span>
            <span className="diamond-rule-diamond" />
          </div>

          <p className="text-[14px] text-cream/85 leading-relaxed">
            <span className="font-italic-serif text-violet-tint">+£1.2k</span> projected revenue per month at held ROAS. Decision window closes at <span className="text-cream font-medium">11:00 am</span> — after that, bid management will re-plan against fresh hourly data.
          </p>
        </aside>
      </section>

      {/* ─── II · ON THE DESK TODAY ─── */}
      <section className="px-10 pt-14 pb-12 border-b border-line-dark grid grid-cols-12 gap-8">
        <SectionMarker numeral="II" label="On the desk today" />

        <div className="col-span-12 md:col-span-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {desk.map((ap, i) => {
              const client = clients.find((c) => c.slug === ap.client)!;
              return (
                <Link
                  key={ap.id}
                  href="/approvals"
                  className="group block border-t border-cream/20 pt-4 hover:border-violet/60 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3 text-[10.5px] small-caps tracking-wider">
                    <span className="text-violet-bright">{ap.subagent}</span>
                    <span className="text-dim">{i + 2} · of · {approvals.length}</span>
                  </div>
                  <h3 className="text-[20px] text-cream font-medium leading-[1.15] tracking-tight mb-3 group-hover:text-violet-tint transition-colors">
                    {ap.title.replace(/^(Launch|Approve|Pause|Send|Add|A\/B|Shift) /, "")}
                  </h3>
                  <p className="text-[12.5px] text-cream/70 leading-relaxed line-clamp-3 mb-3">
                    {ap.reasoning}
                  </p>
                  <div className="byline text-[11px]">
                    <span className="text-cream">{client.name}</span> · {ap.draftedAt}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── III · THE BOOK ─── */}
      <section className="px-10 pt-14 pb-14 border-b border-line-dark grid grid-cols-12 gap-8">
        <SectionMarker numeral="III" label="The book" />

        <div className="col-span-12 md:col-span-10">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-[28px] text-cream font-medium tracking-tight">
              Six clients,{" "}
              <span className="font-italic-serif text-violet-tint">in good standing.</span>
            </h2>
            <Link href="/clients" className="text-[12px] text-dim hover:text-cream transition-colors">
              Full roster →
            </Link>
          </div>

          {/* Stock-page treatment */}
          <div className="border-t border-b border-cream/20">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="text-left border-b border-line-dark">
                  <th className="py-2.5 small-caps tracking-wider font-normal text-dim text-[10.5px]">Client</th>
                  <th className="py-2.5 small-caps tracking-wider font-normal text-dim text-[10.5px]">Category</th>
                  <th className="py-2.5 small-caps tracking-wider font-normal text-dim text-[10.5px]">Channels</th>
                  <th className="py-2.5 small-caps tracking-wider font-normal text-dim text-[10.5px] text-right">ROAS</th>
                  <th className="py-2.5 small-caps tracking-wider font-normal text-dim text-[10.5px] text-right">Spend / mo</th>
                  <th className="py-2.5 small-caps tracking-wider font-normal text-dim text-[10.5px] text-right">Hrs saved</th>
                  <th className="py-2.5 small-caps tracking-wider font-normal text-dim text-[10.5px] text-right">Standing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-dark">
                {clients.map((c, i) => (
                  <tr key={c.slug} className="group hover:bg-ink-raised/30 transition-colors">
                    <td className="py-3.5">
                      <Link href={`/clients/${c.slug}`} className="group/link">
                        <span className="font-italic-serif text-[18px] text-cream group-hover/link:text-violet-tint transition-colors">{c.name}</span>
                      </Link>
                    </td>
                    <td className="py-3.5 text-dim text-[12px]">{c.category}</td>
                    <td className="py-3.5 text-cream/85 tabular-nums">{c.channels.length}</td>
                    <td className="py-3.5 text-right tabular-nums">
                      <span className={c.roas >= 3.5 ? "text-violet-bright font-medium" : "text-cream"}>
                        {c.roas.toFixed(1)}×
                      </span>
                      <span className={c.roasDelta >= 0 ? "text-violet-bright/80 ml-2 text-[11px]" : "text-amber-400/80 ml-2 text-[11px]"}>
                        {c.roasDelta >= 0 ? "+" : ""}{c.roasDelta.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-3.5 text-right tabular-nums text-cream">£{c.monthlySpend.toLocaleString()}</td>
                    <td className="py-3.5 text-right tabular-nums text-cream/80">{c.hoursSaved}</td>
                    <td className="py-3.5 text-right">
                      <span className="small-caps tracking-wider text-[10.5px]">
                        {c.status === "healthy" ? (
                          <span className="text-violet-bright/85">Holding</span>
                        ) : (
                          <span className="text-amber-400/85">Watching</span>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-cream/20">
                  <td className="py-3 font-italic-serif text-cream">Total</td>
                  <td className="py-3"></td>
                  <td className="py-3 text-cream font-medium tabular-nums">{clients.reduce((s, c) => s + c.channels.length, 0)}</td>
                  <td className="py-3 text-right tabular-nums text-cream font-medium">
                    {agencyStats.blendedRoas}×
                  </td>
                  <td className="py-3 text-right tabular-nums text-cream font-medium">£{agencyStats.monthlySpend.toLocaleString()}</td>
                  <td className="py-3 text-right tabular-nums text-cream font-medium">{agencyStats.hoursSaved}</td>
                  <td className="py-3 text-right small-caps tracking-wider text-[10.5px] text-violet-bright/85">Blended</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Three trend strips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-8">
            <TrendBlock label="Blended ROAS" value={`${agencyStats.blendedRoas}×`} delta={`+${agencyStats.blendedRoasDelta}`} data={roasTrend} />
            <TrendBlock label="Spend · run rate" value={`£${(agencyStats.monthlySpend / 1000).toFixed(1)}k`} delta="+0.3" data={spendTrend} />
            <TrendBlock label="Hours saved · cumulative" value={`${agencyStats.hoursSaved}`} delta="+14" data={hoursSavedTrend} />
          </div>
        </div>
      </section>

      {/* ─── IV · WHAT AMARA HEARD ─── */}
      <section className="px-10 pt-14 pb-12 grid grid-cols-12 gap-8">
        <SectionMarker numeral="IV" label="What Amara heard" />

        <div className="col-span-12 md:col-span-7">
          <h2 className="text-[28px] text-cream font-medium tracking-tight mb-2">
            The team kept{" "}
            <span className="font-italic-serif text-violet-tint">talking</span>{" "}
            this morning.
          </h2>
          <p className="text-cream/70 text-[13.5px] mb-6 max-w-prose">
            A digest of Slack and email messages your team has sent to Amara today. Full thread in the Brain.
          </p>

          <ol className="divide-y divide-line-dark">
            {messages.filter((m) => m.when === "today").slice(0, 4).map((m, i) => (
              <li key={m.id} className="py-4 grid grid-cols-[40px_1fr_auto] gap-4 items-start">
                <span className="font-italic-serif text-[22px] text-violet-tint/80 text-right tabular-nums leading-none pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 text-[11px]">
                    {m.surface === "slack" ? (
                      <MessagesSquare size={11} className="text-dim" />
                    ) : (
                      <Mail size={11} className="text-dim" />
                    )}
                    <span className="small-caps tracking-wider text-cream">{m.from.name}</span>
                    <span className="text-dim/60">·</span>
                    <span className="text-dim text-[10.5px]">{m.channel}</span>
                  </div>
                  <p className="text-[14px] text-cream/90 leading-snug line-clamp-2">
                    “{m.body}”
                  </p>
                </div>
                <span className="byline text-[11px] whitespace-nowrap">{m.timestamp}</span>
              </li>
            ))}
          </ol>

          <Link href="/brain" className="inline-flex items-center gap-2 mt-6 text-[13px] text-violet-bright hover:text-cream transition-colors">
            <Brain size={13} />
            Open the company brain
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <aside className="col-span-12 md:col-span-5 border-l border-line-dark md:pl-8">
          <div className="diamond-rule mb-5">
            <span className="diamond-rule-diamond" />
            <span className="small-caps tracking-wider text-dim text-[10px]">Brain · learnt today</span>
            <span className="diamond-rule-diamond" />
          </div>

          <ol className="space-y-4">
            {brainEntries.slice(0, 4).map((b) => (
              <li key={b.id} className="text-[13px]">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <span className="small-caps tracking-wider text-violet-bright/85 text-[10px]">{b.kind}</span>
                  <span className="byline text-[10.5px]">{b.timestamp}</span>
                </div>
                <div className="text-cream/95 font-medium leading-snug">{b.title}</div>
                <div className="text-dim text-[11.5px] mt-0.5">{b.source}</div>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      {/* ─── COLOPHON ─── */}
      <footer className="px-10 pt-10">
        <div className="diamond-rule mb-6">
          <span className="diamond-rule-diamond" />
        </div>
        <div className="grid grid-cols-12 gap-8 items-center text-[11px] text-dim">
          <div className="col-span-12 md:col-span-4 small-caps tracking-wider">
            Colophon
          </div>
          <p className="col-span-12 md:col-span-8 byline leading-relaxed">
            Set in Geist and Fraunces Italic. Reported, written, and shipped by Amara — the agency operating layer. Pulse Digital, Manchester. Issue Nº 041 · May 26, 2026.
          </p>
        </div>
      </footer>
    </article>
  );
}

function SectionMarker({ numeral, label }: { numeral: string; label: string }) {
  return (
    <div className="col-span-12 md:col-span-2 md:text-right">
      <div className="roman-numeral text-[72px] md:text-[88px] leading-none text-violet/35">
        {numeral}.
      </div>
      <div className="small-caps tracking-wider text-violet-bright text-[11px] mt-1">
        {label}
      </div>
    </div>
  );
}

function Stat({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 pb-1.5 border-b border-line-darker">
      <dt className="text-dim text-[11.5px] small-caps tracking-wider">{k}</dt>
      <dd className={accent ? "text-violet-bright font-medium tabular-nums" : "text-cream font-medium tabular-nums"}>{v}</dd>
    </div>
  );
}

function TrendBlock({
  label,
  value,
  delta,
  data,
}: {
  label: string;
  value: string;
  delta: string;
  data: number[];
}) {
  return (
    <div>
      <div className="small-caps tracking-wider text-dim text-[10.5px] mb-1">{label}</div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-[28px] text-cream font-medium tabular-nums leading-none">{value}</span>
        <span className="text-violet-bright text-[12px] tabular-nums">{delta}</span>
      </div>
      <Sparkline data={data} width={300} height={56} />
      <div className="byline text-[10.5px] mt-1">8-week trend</div>
    </div>
  );
}
