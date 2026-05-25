export type Surface = "slack" | "email";

export type Person = {
  id: string;
  name: string;
  initials: string;
  role: string;
};

export const team: Record<string, Person> = {
  vedaant: { id: "vedaant", name: "Vedaant Kavasseri", initials: "VK", role: "CEO" },
  sarah: { id: "sarah", name: "Sarah Chen", initials: "SC", role: "Account Director · Olive & Oak, Lume" },
  marcus: { id: "marcus", name: "Marcus Webb", initials: "MW", role: "Account Director · Northland, Fjord" },
  priya: { id: "priya", name: "Priya Sharma", initials: "PS", role: "Senior Strategist" },
  tom: { id: "tom", name: "Tom Riley", initials: "TR", role: "Junior · Reporting" },
  jess: { id: "jess", name: "Jess Holloway", initials: "JH", role: "Creative Lead" },
};

export type Message = {
  id: string;
  surface: Surface;
  channel?: string; // slack channel or email subject
  from: Person;
  to: "amara" | string;
  body: string;
  amaraReply?: string;
  amaraAction?: string;
  timestamp: string;
  when: "today" | "this-week";
  attachments?: string[];
};

export const messages: Message[] = [
  // ----- TODAY -----
  {
    id: "m-001",
    surface: "slack",
    channel: "DM",
    from: team.sarah,
    to: "amara",
    body: "Amara, what was the winning hook on Olive & Oak last week? I'm in their call at 10.",
    amaraReply:
      "Founder-POV TikTok hook — \"Why we ditched parabens at 3am one Tuesday\" — held 4.1× ROAS over 14 days, drove 23% of revenue. Pulling the brief + 3 lookalike concepts now. Sending to your DM in 90s.",
    timestamp: "9:14am",
    when: "today",
  },
  {
    id: "m-002",
    surface: "slack",
    channel: "#amara",
    from: team.marcus,
    to: "amara",
    body: "@amara can you draft a creative brief for Northland's summer trail collection? Brand voice = aspirational but practical, no city stuff.",
    amaraReply:
      "On it. Pulling 47 winning creatives from your account + cross-referencing your summer playbook (avoiding the urban-runner archetype that flopped last June). ETA 8 minutes. Queueing for your approval.",
    amaraAction: "Drafted 6 creative concepts. Awaiting your sign-off in queue.",
    timestamp: "9:32am",
    when: "today",
  },
  {
    id: "m-003",
    surface: "email",
    channel: "Brand voice update — Olive & Oak",
    from: {
      id: "client-oo",
      name: "Mia Ferguson",
      initials: "MF",
      role: "Olive & Oak Beauty — Founder",
    },
    to: "sarah@pulsedigital.co.uk · cc: amara@pulsedigital.amara.app",
    body: "Hey Sarah — we're moving away from 'clean beauty' as our primary descriptor. Going with 'gentle' instead, feels less clinical. Can you make sure this reflects across all channels going forward?",
    amaraReply:
      "Captured. Updating the Olive & Oak brand voice across all 5 channels — Meta, TikTok, Google, email and SEO. Pausing any in-flight creative that uses \"clean\" for re-approval. I'll flag the 3 active ads that need a copy swap and add the playbook note. You'll see it in your queue.",
    amaraAction: "Brand voice updated. 3 ads paused for re-copy. 1 SEO brief re-drafted.",
    timestamp: "10:47am",
    when: "today",
  },
  {
    id: "m-004",
    surface: "slack",
    channel: "#pulse-clients",
    from: team.priya,
    to: "team",
    body: "Heads up team — Amara just flagged that Fjord's LinkedIn CPL has dropped 31% this week. They want to scale. I've forwarded to their CMO with the data Amara pulled.",
    timestamp: "11:15am",
    when: "today",
  },
  {
    id: "m-005",
    surface: "slack",
    channel: "DM",
    from: team.tom,
    to: "amara",
    body: "Amara, can you spot-check the Sundial pixel? Their dashboard numbers feel off vs Shopify.",
    amaraReply:
      "Already noticed — Audits subagent caught a duplicate fire on /thank-you (inflated by 18%). Drafting a GTM fix. Queueing for your sign-off + sending a Loom-style explainer to the client so they don't panic when the numbers correct.",
    amaraAction: "Pixel fix drafted. In queue.",
    timestamp: "11:38am",
    when: "today",
  },
  {
    id: "m-006",
    surface: "slack",
    channel: "#amara",
    from: team.vedaant,
    to: "amara",
    body: "@amara I'm pitching YC tomorrow. Can you put together the Pulse story numbers — clients, channels, hours saved, ROAS lift, retainer base — in one slide-ready table?",
    amaraReply:
      "Done. 6 clients, 23 channels, £10.3k monthly ad spend managed, 287 hours saved this week, blended ROAS up 31% in 8 weeks, £4.85k retainer base. Drafted three layouts (deck-style, one-liner, table). They're in your inbox + a Notion page. Good luck Vedaant.",
    timestamp: "12:04pm",
    when: "today",
  },
  {
    id: "m-007",
    surface: "email",
    channel: "Weekly summary — Hatchet Coffee Co",
    from: team.sarah,
    to: "amara@pulsedigital.amara.app",
    body: "Hi Amara, can you draft this week's wrap-up for Hatchet? Lead with the TikTok hook wins, soft-pedal the Meta dip (they're sensitive), end with the brewing-SEO traction.",
    amaraReply:
      "Drafted in your voice. Lead = \"Origin-story hooks are scaling — three are now in the top 10% of your account's lifetime ROAS.\" Meta paragraph softened: framed as \"a planned creative rotation\". SEO closer added with the cluster brief that went live. Ready to send — pending your eye.",
    amaraAction: "Weekly report drafted. In queue for voice check.",
    timestamp: "1:22pm",
    when: "today",
  },

  // ----- THIS WEEK (Mon-Wed) -----
  {
    id: "m-008",
    surface: "slack",
    channel: "#olive-oak-team",
    from: team.jess,
    to: "amara",
    body: "@amara the Aurora drop is going live Friday. Can you pre-load the email sequence + landing variants so we're ready?",
    amaraReply:
      "On it. Pulling the Aurora moodboard you uploaded to the channel, drafting 5-email pre-launch sequence, 2 LP variants (hero-video vs editorial-grid). Will queue 24h before launch so Sarah can sign off without rushing.",
    timestamp: "Tue 4:18pm",
    when: "this-week",
  },
  {
    id: "m-009",
    surface: "email",
    channel: "Northland — Q3 planning input",
    from: team.marcus,
    to: "amara@pulsedigital.amara.app",
    body: "Amara — for Northland's Q3 review, can you pull together: top 5 creative patterns that won, channel mix recommendations for Aug-Oct, and budget pacing forecast at current ROAS? Keep it tight, slide-ready.",
    amaraReply:
      "Drafted. Top patterns: founder-POV (4.1×), summit-stillness (3.7×), gear-detail-macro (3.2×). Channel mix: keep Google strong on brand defense, push 40% more into TikTok, hold Meta at current. Budget pacing forecast attached as PDF — projected £18k ad spend at 3.8× blended. Ready for your review.",
    timestamp: "Tue 11:02am",
    when: "this-week",
  },
  {
    id: "m-010",
    surface: "slack",
    channel: "#pulse-general",
    from: team.priya,
    to: "team",
    body: "FYI everyone: Amara just learned Hatchet's customer service tone (warm, slightly nerdy, big on origin/process talk). All future email + SMS drafts will match. Anyone testing it, flag back if it's off.",
    timestamp: "Mon 3:45pm",
    when: "this-week",
  },
  {
    id: "m-011",
    surface: "slack",
    channel: "#amara",
    from: team.tom,
    to: "amara",
    body: "@amara what's the simplest way to explain to Lume why their ROAS dipped last week?",
    amaraReply:
      "One-liner: \"Your retinol campaign was cannibalising your branded search — we caught it, paused it, and reinvested into your highest-ROAS pocket (SCA at 3.4×). Net effect this week onwards: cleaner attribution, higher blended ROAS.\" Want me to draft the full client-facing note?",
    timestamp: "Mon 10:21am",
    when: "this-week",
  },
];

export type BrainEntry = {
  id: string;
  kind: "voice" | "playbook" | "decision" | "client-pref" | "pattern" | "compliance";
  title: string;
  detail: string;
  source: string;
  client?: string;
  timestamp: string;
  confidence?: number;
  status?: "live" | "ingesting";
};

export const brainEntries: BrainEntry[] = [
  {
    id: "b-001",
    kind: "voice",
    title: "Olive & Oak — \"gentle\" replaces \"clean\"",
    detail:
      "Brand voice updated across 5 channels. 3 active ads paused for re-copy. 1 SEO brief re-drafted. Playbook note added.",
    source: "Email · Mia Ferguson (Founder) → Sarah",
    client: "Olive & Oak Beauty",
    timestamp: "just now",
    confidence: 99,
    status: "live",
  },
  {
    id: "b-002",
    kind: "pattern",
    title: "Founder-POV creatives lift 2.7× on TikTok",
    detail:
      "Cross-account pattern detected: founder-led, first-person hooks outperform polished b-roll by 2.7× across 4 of 6 clients. Updating creative playbook category-wide.",
    source: "Creative Analysis subagent",
    timestamp: "3 min ago",
    confidence: 91,
    status: "live",
  },
  {
    id: "b-003",
    kind: "decision",
    title: "Approved: Shift £420 Meta → TikTok (Olive & Oak)",
    detail:
      "Vedaant approved bid management's budget shift. Logged to decision trail. Will not re-surface this question for similar conditions for 14 days.",
    source: "Approval queue · Vedaant",
    client: "Olive & Oak Beauty",
    timestamp: "8 min ago",
    confidence: 100,
    status: "live",
  },
  {
    id: "b-004",
    kind: "client-pref",
    title: "Hatchet voice: warm, nerdy, origin/process-led",
    detail:
      "Tone profile built from 47 sample messages + brand guide. Now applied to all email, SMS, ad copy, and report drafts for Hatchet Coffee Co.",
    source: "Slack · Priya in #pulse-general",
    client: "Hatchet Coffee Co",
    timestamp: "1 day ago",
    confidence: 88,
    status: "live",
  },
  {
    id: "b-005",
    kind: "playbook",
    title: "Sundial — duplicate pixel fire on /thank-you (+18%)",
    detail:
      "Audits subagent caught Shopify-pixel discrepancy. GTM fix drafted. Client explainer prepared. Pre-empts the dashboard correction the client would otherwise see and panic over.",
    source: "Audits subagent · spotted by Tom",
    client: "Sundial Wellness",
    timestamp: "12 min ago",
    confidence: 97,
    status: "live",
  },
  {
    id: "b-006",
    kind: "compliance",
    title: "Sundial — no health claims, ICO-safe phrasing",
    detail:
      "Compliance guardrail tightened after legal review of supplement claims. Any draft containing \"cures\", \"treats\", \"prevents\" or 14 other terms now blocked + flagged for re-write.",
    source: "Compliance check · last quarterly audit",
    client: "Sundial Wellness",
    timestamp: "2 days ago",
    confidence: 100,
    status: "live",
  },
  {
    id: "b-007",
    kind: "client-pref",
    title: "Fjord wants to scale LinkedIn (CPL down 31%)",
    detail:
      "Client signal logged from CMO email. Forecasting subagent re-running channel mix for August. Will surface a scale-up recommendation in next week's approval queue.",
    source: "Slack · Priya in #pulse-clients",
    client: "Fjord Apparel",
    timestamp: "1h ago",
    confidence: 84,
    status: "live",
  },
  {
    id: "b-008",
    kind: "pattern",
    title: "Email subagent: 9am Tuesday outperforms 10am Wednesday",
    detail:
      "Send-time test concluded across 4 DTC clients at 96% confidence. Future email sequences default to 9am Tue unless the per-client playbook overrides.",
    source: "A/B testing subagent",
    timestamp: "4h ago",
    confidence: 96,
    status: "live",
  },
  {
    id: "b-009",
    kind: "voice",
    title: "Sarah's account-manager voice — modelled",
    detail:
      "All weekly reports for Sarah's clients (Olive & Oak, Lume) now drafted in her voice. Sentence rhythm, em-dash usage, opening structure all matched from 28 prior reports.",
    source: "Ingest · onboarding",
    timestamp: "Last week",
    confidence: 93,
    status: "live",
  },
  {
    id: "b-010",
    kind: "playbook",
    title: "New Aurora launch playbook ingested (Olive & Oak)",
    detail:
      "Jess uploaded the Aurora moodboard. Amara extracted 7 visual codes + 4 launch-narrative beats. Pre-loading email + LP variants for Friday's drop.",
    source: "Slack · Jess in #olive-oak-team",
    client: "Olive & Oak Beauty",
    timestamp: "1 day ago",
    confidence: 87,
    status: "live",
  },
];

export const commsStats = {
  todayMessages: messages.filter((m) => m.when === "today").length,
  weekMessages: messages.length,
  brainEntries7d: 142,
  brainLearningsToday: 23,
  voiceProfiles: 6,
  playbookEntries: 184,
};
