"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  Check,
  Plug,
  Book,
  Sparkles,
  ArrowRight,
  Building2,
  Globe,
  Loader2,
} from "lucide-react";
import { channels } from "@/lib/mock-data";
import { PageHeader } from "@/components/SectionLabel";
import { cn } from "@/lib/cn";

const steps = [
  { key: "connect", label: "Connect channels", icon: Plug },
  { key: "ingest", label: "Ingest brand", icon: Book },
  { key: "review", label: "Review draft", icon: Sparkles },
];

const allChannels = (["google", "meta", "tiktok", "linkedin", "email", "seo", "landing", "programmatic"] as const);

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("Polar Bloom Florals");
  const [url, setUrl] = useState("polarbloom.co.uk");
  const [selected, setSelected] = useState<string[]>(["google", "meta", "email"]);
  const [ingesting, setIngesting] = useState(false);
  const [ingested, setIngested] = useState(false);

  const toggle = (k: string) => {
    setSelected((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
  };

  const startIngest = () => {
    setIngesting(true);
    setTimeout(() => {
      setIngesting(false);
      setIngested(true);
    }, 2200);
  };

  return (
    <div>
      <PageHeader
        number="+"
        label="ONBOARD NEW CLIENT"
        title="Add a client."
        italicTitle="Amara is running in seconds."
        subtitle="Connect channels, ingest brand and playbook, review Amara's first draft. The full setup that used to take a week of agency labour."
      />

      {/* Stepper */}
      <div className="flex items-center gap-3 mb-8">
        {steps.map((s, i) => {
          const active = i === step;
          const done = i < step;
          const Icon = s.icon;
          return (
            <div key={s.key} className="flex items-center gap-3">
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md border text-[12px] transition-colors",
                  active
                    ? "border-violet/40 bg-violet/8 text-cream"
                    : done
                      ? "border-line-dark bg-ink-raised/40 text-cream/70"
                      : "border-line-dark text-dim"
                )}
              >
                <div
                  className={cn(
                    "h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-medium",
                    active
                      ? "bg-violet text-cream"
                      : done
                        ? "bg-violet/30 text-violet-bright"
                        : "bg-ink-deep border border-line-dark text-dim"
                  )}
                >
                  {done ? <Check size={11} /> : <Icon size={11} />}
                </div>
                <span>{s.label}</span>
              </div>
              {i < steps.length - 1 && <ArrowRight size={12} className="text-dim/50" />}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="rounded-lg border border-line-dark bg-ink-raised/40 p-7">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="connect"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <h2 className="text-cream text-xl font-medium tracking-tight mb-1">
                  About the client
                </h2>
                <p className="text-dim text-[13px] mb-6">
                  Amara reads from this to ingest the brand correctly.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Field
                    icon={Building2}
                    label="Client name"
                    value={name}
                    onChange={setName}
                  />
                  <Field
                    icon={Globe}
                    label="Primary website"
                    value={url}
                    onChange={setUrl}
                  />
                </div>

                <h2 className="text-cream text-xl font-medium tracking-tight mb-1">
                  Connect channels
                </h2>
                <p className="text-dim text-[13px] mb-5">
                  Select the channels your agency runs for this client. Amara will assign a
                  subagent to each.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
                  {allChannels.map((ck) => {
                    const c = channels[ck];
                    const on = selected.includes(ck);
                    return (
                      <button
                        key={ck}
                        onClick={() => toggle(ck)}
                        className={cn(
                          "rounded-lg border p-3 text-left transition-colors",
                          on
                            ? "border-violet/40 bg-violet/8"
                            : "border-line-dark bg-ink-deep/40 hover:border-line-dark/80 hover:bg-ink-raised"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="inline-block h-2.5 w-2.5 rounded-sm"
                            style={{ backgroundColor: c.tone, boxShadow: `0 0 8px ${c.tone}66` }}
                          />
                          {on && <Check size={13} className="text-violet-bright" />}
                        </div>
                        <div className="text-cream text-[13px] font-medium">{c.name}</div>
                        <div className="text-dim text-[10.5px] mt-0.5">OAuth connected</div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-dim text-[12px]">
                    <span className="text-cream tabular-nums">{selected.length}</span> channels
                    selected ·{" "}
                    <span className="font-italic-serif text-violet-tint">
                      ~{selected.length * 2} minutes
                    </span>{" "}
                    to ingest
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    disabled={selected.length === 0}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-violet hover:bg-violet-bright disabled:opacity-50 disabled:cursor-not-allowed text-cream text-[13px] font-medium transition-colors shadow-[0_0_20px_rgba(111,91,255,0.3)]"
                  >
                    Ingest brand
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="ingest"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <h2 className="text-cream text-xl font-medium tracking-tight mb-1">
                  Ingesting {name}
                </h2>
                <p className="text-dim text-[13px] mb-6">
                  Amara is reading the brand site, past campaigns, and your agency playbook for this
                  client.
                </p>

                {!ingested ? (
                  <div className="space-y-2.5">
                    <IngestRow label="Brand voice + style guide" done={!ingesting && ingested} loading={ingesting} />
                    <IngestRow label="Past 90 days of channel data" done={!ingesting && ingested} loading={ingesting} />
                    <IngestRow label="Agency playbook · clean beauty DTC" done={!ingesting && ingested} loading={ingesting} />
                    <IngestRow label="Brand assets · 47 creative pieces" done={!ingesting && ingested} loading={ingesting} />
                    <IngestRow label="Competitor map · 8 brands" done={!ingesting && ingested} loading={ingesting} />

                    <div className="pt-5 flex items-center justify-end gap-3">
                      <button
                        onClick={() => setStep(0)}
                        className="px-3.5 py-2 rounded-md border border-line-dark text-[13px] text-cream/80 hover:bg-ink-raised"
                      >
                        Back
                      </button>
                      <button
                        onClick={startIngest}
                        disabled={ingesting}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-violet hover:bg-violet-bright disabled:opacity-60 text-cream text-[13px] font-medium transition-colors shadow-[0_0_20px_rgba(111,91,255,0.3)]"
                      >
                        {ingesting ? (
                          <>
                            <Loader2 size={13} className="animate-spin" />
                            Ingesting…
                          </>
                        ) : (
                          <>
                            <Sparkles size={13} />
                            Start ingest
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-md border border-violet/30 bg-violet/8 p-5"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <Check size={16} className="text-violet-bright" />
                      <span className="text-cream font-medium">Ingest complete</span>
                    </div>
                    <p className="text-cream/85 text-[13px] leading-relaxed">
                      Amara understands {name} in <span className="font-italic-serif text-violet-tint">2 minutes 14 seconds</span>. Playbook absorbed.
                      Brand voice modelled. {selected.length} subagents standing by.
                    </p>
                    <div className="mt-4 flex items-center justify-end">
                      <button
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-violet hover:bg-violet-bright text-cream text-[13px] font-medium transition-colors"
                      >
                        Review draft
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <h2 className="text-cream text-xl font-medium tracking-tight mb-1">
                  First-week plan · {name}
                </h2>
                <p className="text-dim text-[13px] mb-6">
                  Amara has drafted week-one campaigns across {selected.length} channels. Approve to
                  go live, modify if you want to change tone, or send back for a re-draft.
                </p>

                <div className="space-y-2.5 mb-6">
                  {selected.map((ck) => {
                    const c = channels[ck as keyof typeof channels];
                    return (
                      <div
                        key={ck}
                        className="rounded-md border border-line-dark bg-ink-deep/40 p-4 flex items-start gap-3.5"
                      >
                        <div
                          className="h-9 w-9 rounded-md flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${c.tone}22`, boxShadow: `inset 0 0 0 1px ${c.tone}50` }}
                        >
                          <span style={{ color: c.tone }} className="text-[11px] font-medium">
                            {c.short.slice(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-cream text-[14px] font-medium">{c.name}</div>
                          <div className="text-dim text-[12px] mt-0.5">
                            {ck === "google" && "12 RSAs drafted across 4 ad groups. Budget £180/day."}
                            {ck === "meta" && "Advantage+ shopping with 6 creative variants. £160/day."}
                            {ck === "tiktok" && "4 founder-POV hooks. £120/day test budget."}
                            {ck === "linkedin" && "Wholesale prospecting · 3 audiences."}
                            {ck === "email" && "Welcome series · 5 emails over 7 days."}
                            {ck === "seo" && "12 cluster briefs · floristry × occasions."}
                            {ck === "landing" && "Hero variant · 3 layouts ready for A/B."}
                            {ck === "programmatic" && "DSP set up · 2 deal IDs sourced."}
                          </div>
                        </div>
                        <span className="text-[11px] text-violet-bright">DRAFT READY</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between border-t border-line-dark pt-5">
                  <p className="text-dim text-[12.5px] max-w-md">
                    <span className="font-italic-serif text-violet-tint">From signup to first-draft plan in 4 minutes.</span> Approve to send everything to your queue for live launch.
                  </p>
                  <Link
                    href="/approvals"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-violet hover:bg-violet-bright text-cream text-[13px] font-medium transition-colors shadow-[0_0_20px_rgba(111,91,255,0.3)]"
                  >
                    Send to approval queue
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="space-y-5">
          <div className="rounded-lg border border-line-dark bg-ink-raised/40 p-5">
            <div className="label-micro mb-3">WHAT AMARA DOES IN ONBOARDING</div>
            <ol className="space-y-3.5">
              <BulletStep n={1} title="Reads the brand">Scrapes site, ingests guidelines, models tone of voice.</BulletStep>
              <BulletStep n={2} title="Reads the data">Pulls 90 days of channel performance, picks up winners.</BulletStep>
              <BulletStep n={3} title="Reads the playbook">Absorbs how your agency runs this category.</BulletStep>
              <BulletStep n={4} title="Drafts week one">Campaigns, creative, audiences — ready for sign-off.</BulletStep>
            </ol>
          </div>

          <div className="rounded-lg border border-violet/30 bg-violet/8 p-5">
            <div className="label-micro text-violet-bright mb-2">FROM THE PITCH</div>
            <p className="text-cream/90 text-[13px] leading-relaxed font-italic-serif">
              &ldquo;Onboard a client in seconds. Agency connects its channels. Amara ingests the brand&rsquo;s data and the agency&rsquo;s playbook.&rdquo;
            </p>
            <p className="text-dim text-[11px] mt-2">Step 01 · How It Works</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="label-micro mb-1.5">{label}</div>
      <div className="flex items-center gap-2 rounded-md border border-line-dark bg-ink-deep/60 px-3 py-2 focus-within:border-violet/40">
        <Icon size={14} className="text-dim" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none text-cream text-[14px]"
        />
      </div>
    </label>
  );
}

function IngestRow({ label, done, loading }: { label: string; done: boolean; loading: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-line-dark bg-ink-deep/40 px-4 py-2.5">
      <div className="h-5 w-5 rounded-full bg-ink-raised flex items-center justify-center shrink-0">
        {loading ? (
          <Loader2 size={11} className="text-violet-bright animate-spin" />
        ) : done ? (
          <Check size={11} className="text-violet-bright" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-dim" />
        )}
      </div>
      <span className="text-[13px] text-cream/85 flex-1">{label}</span>
      {loading && (
        <div className="relative h-[2px] w-16 rounded-full bg-line-darker overflow-hidden work-bar" />
      )}
    </div>
  );
}

function BulletStep({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <div className="h-5 w-5 rounded-full bg-violet/15 border border-violet/30 flex items-center justify-center shrink-0 text-[10px] text-violet-bright tabular-nums">
        {n}
      </div>
      <div>
        <div className="text-cream text-[13px] font-medium">{title}</div>
        <div className="text-dim text-[12px] mt-0.5 leading-snug">{children}</div>
      </div>
    </li>
  );
}
