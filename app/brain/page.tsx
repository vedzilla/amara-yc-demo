"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessagesSquare,
  Mail,
  Brain,
  Hash,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Users,
  Shield,
  TrendingUp,
  Mic,
} from "lucide-react";
import { messages, brainEntries, team, commsStats, type Message, type BrainEntry } from "@/lib/comms";
import { PageHeader } from "@/components/SectionLabel";
import { AmaraOrb } from "@/components/AmaraOrb";
import { cn } from "@/lib/cn";

const tabMeta = {
  today: { label: "Today", count: commsStats.todayMessages },
  "this-week": { label: "This week", count: commsStats.weekMessages },
};

const brainIcons: Record<BrainEntry["kind"], React.ElementType> = {
  voice: Mic,
  playbook: BookOpen,
  decision: CheckCircle2,
  "client-pref": Users,
  pattern: TrendingUp,
  compliance: Shield,
};

const brainKindLabel: Record<BrainEntry["kind"], string> = {
  voice: "Voice profile",
  playbook: "Playbook",
  decision: "Decision",
  "client-pref": "Client preference",
  pattern: "Pattern",
  compliance: "Compliance",
};

export default function BrainPage() {
  const [tab, setTab] = useState<"today" | "this-week">("today");
  const shown = messages.filter((m) =>
    tab === "today" ? m.when === "today" : true
  );

  return (
    <div>
      <PageHeader
        number="05"
        label="THE COMPANY BRAIN · LIVE"
        title="Your team talks to Amara."
        italicTitle="Amara remembers everything."
        subtitle="Slack messages, emails, calls — every nudge from your team becomes a brain update. Voice profiles, playbook entries, compliance rules. The longer Amara runs your accounts, the more it sounds like your senior account director."
        actions={
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-violet/30 bg-violet/8 text-[12px]">
              <Brain size={12} className="text-violet-bright" />
              <span className="text-cream tabular-nums font-medium">{commsStats.brainLearningsToday}</span>
              <span className="text-dim">brain updates today</span>
            </span>
          </div>
        }
      />

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <BrainStat
          icon={MessagesSquare}
          label="Slack messages → Amara"
          value={messages.filter((m) => m.surface === "slack").length}
          context={`${commsStats.todayMessages} today`}
        />
        <BrainStat
          icon={Mail}
          label="Emails → Amara"
          value={messages.filter((m) => m.surface === "email").length}
          context="this week"
        />
        <BrainStat
          icon={Brain}
          label="Brain entries · 7d"
          value={commsStats.brainEntries7d}
          context="learned + applied"
        />
        <BrainStat
          icon={Mic}
          label="Voice profiles"
          value={commsStats.voiceProfiles}
          context="team + clients"
          emphasis
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* LEFT — comms feed */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-cream text-[18px] font-medium tracking-tight">
              <span className="text-dim mr-2">·</span>
              How the team is talking to Amara
            </h2>
            <div className="flex items-center gap-1 p-0.5 rounded-md border border-line-dark bg-ink-raised/40">
              {(["today", "this-week"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "px-2.5 py-1 rounded-[5px] text-[12px] font-medium transition-colors",
                    tab === t
                      ? "bg-violet text-cream shadow-[0_0_14px_rgba(111,91,255,0.35)]"
                      : "text-dim hover:text-cream"
                  )}
                >
                  {tabMeta[t].label}{" "}
                  <span className="tabular-nums text-[11px] opacity-70 ml-0.5">
                    {tab === t ? "" : tabMeta[t].count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="space-y-3"
            >
              {shown.map((m) => (
                <MessageCard key={m.id} m={m} />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* RIGHT — live brain */}
        <aside className="space-y-5 lg:sticky lg:top-[88px] lg:self-start">
          <div className="rounded-lg border border-violet/30 bg-gradient-to-b from-violet/8 to-transparent p-5 overflow-hidden relative">
            <div
              className="absolute inset-0 opacity-50 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(111,91,255,0.25), transparent 70%)",
              }}
            />
            <div className="relative flex items-center gap-3">
              <AmaraOrb size={42} />
              <div className="flex-1">
                <div className="label-micro text-violet-bright">COMPANY BRAIN</div>
                <div className="text-cream font-medium text-[15px] mt-0.5">
                  Updating live
                </div>
              </div>
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-violet animate-ping-soft" />
                <span className="relative rounded-full bg-violet h-2 w-2" />
              </span>
            </div>
            <p className="relative text-[12.5px] text-cream/75 mt-3 leading-relaxed">
              Every message, every decision, every win goes here.{" "}
              <span className="font-italic-serif text-violet-tint">
                The longer Amara runs, the better it knows you.
              </span>
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="label-micro flex items-center gap-1.5">
                <Sparkles size={11} className="text-violet-bright" />
                MOST RECENT LEARNINGS
              </div>
              <span className="text-[11px] text-dim tabular-nums">
                {brainEntries.length} of {commsStats.brainEntries7d}
              </span>
            </div>
            <ol className="space-y-2">
              {brainEntries.map((e, i) => (
                <BrainCard key={e.id} entry={e} index={i} />
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}

function MessageCard({ m }: { m: Message }) {
  const Icon = m.surface === "slack" ? MessagesSquare : Mail;
  return (
    <motion.article
      layout
      className="rounded-lg border border-line-dark bg-ink-raised/40 hover:border-violet/30 transition-colors overflow-hidden"
    >
      {/* Channel header */}
      <header className="flex items-center justify-between px-4 py-2 bg-ink-deep/40 border-b border-line-dark">
        <div className="flex items-center gap-2 text-[11.5px]">
          <Icon size={12} className={m.surface === "slack" ? "text-[#4A154B]" : "text-cream/70"} />
          {m.surface === "slack" && (
            <>
              <span className="text-dim">Slack</span>
              <span className="text-dim/50">·</span>
              <span className="text-cream/75 inline-flex items-center gap-0.5">
                {m.channel?.startsWith("#") ? <Hash size={10} className="text-dim" /> : null}
                {m.channel?.replace("#", "")}
              </span>
            </>
          )}
          {m.surface === "email" && (
            <>
              <span className="text-dim">Email</span>
              <span className="text-dim/50">·</span>
              <span className="text-cream/75">{m.channel}</span>
            </>
          )}
        </div>
        <span className="text-[11px] text-dim tabular-nums">{m.timestamp}</span>
      </header>

      {/* Message body */}
      <div className="p-4">
        <div className="flex gap-3">
          <Avatar person={m.from} />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap mb-1">
              <span className="text-[13px] text-cream font-medium">{m.from.name}</span>
              <span className="text-[11px] text-dim">{m.from.role}</span>
              {m.to === "amara" && (
                <span className="text-[11px] text-violet-bright ml-1">→ Amara</span>
              )}
            </div>
            <p className="text-[14px] text-cream/90 leading-relaxed">{m.body}</p>
          </div>
        </div>

        {/* Amara reply */}
        {m.amaraReply && (
          <div className="flex gap-3 mt-4 pt-4 border-t border-line-dark">
            <AmaraOrb size={32} pulse={false} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[13px] text-violet-bright font-medium">Amara</span>
                <span className="text-[11px] text-dim">replied · just now</span>
              </div>
              <p className="text-[13.5px] text-cream/85 leading-relaxed">{m.amaraReply}</p>
              {m.amaraAction && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-md border border-violet/30 bg-violet/8 px-2.5 py-1 text-[11.5px]">
                  <CheckCircle2 size={11} className="text-violet-bright" />
                  <span className="text-cream/90">{m.amaraAction}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}

function BrainCard({ entry, index }: { entry: BrainEntry; index: number }) {
  const Icon = brainIcons[entry.kind];
  return (
    <motion.li
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group rounded-lg border border-line-dark bg-ink-raised/40 hover:bg-ink-raised hover:border-violet/30 transition-colors p-3.5"
    >
      <div className="flex items-start gap-3">
        <div className="h-7 w-7 rounded-md bg-violet/15 border border-violet/30 flex items-center justify-center shrink-0">
          <Icon size={12} className="text-violet-bright" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <span className="label-micro text-violet-bright/85">
              {brainKindLabel[entry.kind]}
            </span>
            <span className="text-[10.5px] text-dim tabular-nums shrink-0">
              {entry.timestamp}
            </span>
          </div>
          <div className="text-cream text-[13px] font-medium leading-snug">
            {entry.title}
          </div>
          <p className="text-[12px] text-dim mt-1 leading-snug line-clamp-2">
            {entry.detail}
          </p>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-dim/85">
            <span className="truncate">{entry.source}</span>
            {entry.confidence !== undefined && (
              <>
                <span className="text-dim/50">·</span>
                <span className="tabular-nums text-cream/65">
                  {entry.confidence}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
}

function Avatar({ person }: { person: { initials: string } }) {
  return (
    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-tint to-violet flex items-center justify-center text-cream text-[11px] font-medium shrink-0">
      {person.initials}
    </div>
  );
}

function BrainStat({
  icon: Icon,
  label,
  value,
  context,
  emphasis,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  context: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-5 transition-colors",
        emphasis
          ? "border-violet/30 bg-violet/8"
          : "border-line-dark bg-ink-raised/40 hover:border-line-dark/80"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="label-micro">{label}</div>
        <Icon size={13} className={emphasis ? "text-violet-bright" : "text-dim"} />
      </div>
      <div className="text-[30px] font-medium tracking-tight text-cream tabular-nums leading-none">
        {value}
      </div>
      <div className="text-[12px] text-dim mt-2">{context}</div>
    </div>
  );
}
