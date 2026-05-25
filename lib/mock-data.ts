export type ChannelKey =
  | "google"
  | "meta"
  | "tiktok"
  | "linkedin"
  | "programmatic"
  | "email"
  | "seo"
  | "landing";

export type Channel = {
  key: ChannelKey;
  name: string;
  short: string;
  tone: string;
};

export const channels: Record<ChannelKey, Channel> = {
  google: { key: "google", name: "Google Ads", short: "GOO", tone: "#4285F4" },
  meta: { key: "meta", name: "Meta Ads", short: "MET", tone: "#0866FF" },
  tiktok: { key: "tiktok", name: "TikTok Ads", short: "TIK", tone: "#FF2D55" },
  linkedin: { key: "linkedin", name: "LinkedIn", short: "LIN", tone: "#0A66C2" },
  programmatic: { key: "programmatic", name: "Programmatic", short: "PROG", tone: "#8B78FF" },
  email: { key: "email", name: "Email", short: "EML", tone: "#F0A150" },
  seo: { key: "seo", name: "SEO", short: "SEO", tone: "#52C896" },
  landing: { key: "landing", name: "Landing", short: "LND", tone: "#C896F0" },
};

export type ClientStatus = "healthy" | "attention" | "onboarding";

export type Client = {
  slug: string;
  name: string;
  category: string;
  budget: number;
  roas: number;
  roasDelta: number;
  channels: ChannelKey[];
  status: ClientStatus;
  monthlySpend: number;
  hoursSaved: number;
  playbook: string;
  retainer: number;
};

export const clients: Client[] = [
  {
    slug: "olive-oak",
    name: "Olive & Oak Beauty",
    category: "Clean beauty · DTC",
    budget: 2200,
    roas: 4.1,
    roasDelta: 0.7,
    channels: ["google", "meta", "tiktok", "email", "seo"],
    status: "healthy",
    monthlySpend: 1840,
    hoursSaved: 64,
    playbook: "Founder-led storytelling. UGC over polish. Push TikTok hooks before scaling to Meta.",
    retainer: 850,
  },
  {
    slug: "northland-outdoor",
    name: "Northland Outdoor",
    category: "Outdoor gear · DTC",
    budget: 3100,
    roas: 3.6,
    roasDelta: -0.2,
    channels: ["google", "meta", "programmatic", "email"],
    status: "attention",
    monthlySpend: 2640,
    hoursSaved: 51,
    playbook: "Performance video on cold. Geo-targeted to mountain markets. Retarget cart abandoners 48h.",
    retainer: 1100,
  },
  {
    slug: "lume-skincare",
    name: "Lume Skincare",
    category: "Skincare · DTC",
    budget: 1600,
    roas: 2.9,
    roasDelta: 0.4,
    channels: ["google", "meta", "tiktok", "landing"],
    status: "healthy",
    monthlySpend: 1280,
    hoursSaved: 47,
    playbook: "Before/after creative. Subscription-first hooks. Heavy on Google brand defense.",
    retainer: 680,
  },
  {
    slug: "fjord-apparel",
    name: "Fjord Apparel",
    category: "Apparel · DTC",
    budget: 2400,
    roas: 3.3,
    roasDelta: 0.1,
    channels: ["meta", "tiktok", "linkedin", "email"],
    status: "healthy",
    monthlySpend: 1960,
    hoursSaved: 42,
    playbook: "DTC across Meta and TikTok. Seasonal drops on email-first list. LinkedIn for brand awareness only.",
    retainer: 920,
  },
  {
    slug: "hatchet-coffee",
    name: "Hatchet Coffee Co",
    category: "Specialty coffee · DTC",
    budget: 1200,
    roas: 3.8,
    roasDelta: 0.9,
    channels: ["meta", "tiktok", "email", "seo"],
    status: "healthy",
    monthlySpend: 1010,
    hoursSaved: 38,
    playbook: "Origin stories on TikTok. Subscription nudges via email. Long-tail SEO on brewing.",
    retainer: 540,
  },
  {
    slug: "sundial-wellness",
    name: "Sundial Wellness",
    category: "Supplements · DTC",
    budget: 1850,
    roas: 2.4,
    roasDelta: -0.3,
    channels: ["google", "meta", "email", "seo", "landing"],
    status: "attention",
    monthlySpend: 1570,
    hoursSaved: 45,
    playbook: "Compliance-first claims. Authority content. Funnel into 30-day trial.",
    retainer: 760,
  },
];

export type ApprovalKind = "budget-shift" | "creative-launch" | "pause" | "audience-add" | "landing-test" | "bid-strategy" | "report-send";

export type Approval = {
  id: string;
  client: Client["slug"];
  channel: ChannelKey;
  subagent: string;
  kind: ApprovalKind;
  title: string;
  reasoning: string;
  evidence: { label: string; value: string }[];
  before?: { label: string; value: string | number };
  after?: { label: string; value: string | number };
  impact: string;
  confidence: number;
  priority: "now" | "today" | "this-week";
  draftedAt: string;
};

export const approvals: Approval[] = [
  {
    id: "ap-001",
    client: "olive-oak",
    channel: "meta",
    subagent: "Bid management",
    kind: "budget-shift",
    title: "Shift £420 from Meta Advantage+ to TikTok Spark Ads",
    reasoning:
      "TikTok Spark has held 3.2× ROAS for 14 days while Meta Advantage+ has drifted to 1.8× — under your floor of 2.4×. Lookalike fatigue on Meta is real, last creative refresh was 41 days ago. TikTok still has runway: frequency 1.4, CPM trending flat.",
    evidence: [
      { label: "Meta ROAS 14d", value: "1.8×" },
      { label: "TikTok ROAS 14d", value: "3.2×" },
      { label: "Meta frequency", value: "4.7" },
      { label: "TikTok frequency", value: "1.4" },
    ],
    before: { label: "Meta daily", value: "£60" },
    after: { label: "Meta daily → TikTok", value: "£30 → £90" },
    impact: "+£1.2k projected revenue / month at held ROAS",
    confidence: 91,
    priority: "now",
    draftedAt: "8 min ago",
  },
  {
    id: "ap-002",
    client: "northland-outdoor",
    channel: "meta",
    subagent: "Creative analysis",
    kind: "creative-launch",
    title: "Launch 3 new creative variants — \"summit POV\" hook",
    reasoning:
      "Pattern detection across 47 winning ads in your account: founder-POV / first-person trail clips outperform polished b-roll by 2.7×. Drafted three variants from your existing footage library + brand guide. Voiceover scripts attached.",
    evidence: [
      { label: "Pattern lift", value: "+2.7×" },
      { label: "Variants ready", value: "3" },
      { label: "Est. cost to test", value: "£900" },
      { label: "Confidence", value: "High" },
    ],
    impact: "Replaces 2 fatigued creatives. Expected to lift account CTR by ~14%.",
    confidence: 84,
    priority: "today",
    draftedAt: "22 min ago",
  },
  {
    id: "ap-003",
    client: "lume-skincare",
    channel: "google",
    subagent: "Audits",
    kind: "pause",
    title: "Pause underperforming \"retinol routine\" campaign",
    reasoning:
      "Campaign has spent £184 over 11 days at 0.8× ROAS — well below the 2.0× floor in your playbook. Match types too broad, search terms drifting to informational queries (\"how to use retinol\"). Recommend pause, redirect £17/day into the SCA campaign currently capacity-constrained at 3.4× ROAS.",
    evidence: [
      { label: "Spend to date", value: "£184" },
      { label: "ROAS", value: "0.8×" },
      { label: "Bad-fit queries", value: "62%" },
      { label: "SCA campaign cap", value: "Hit daily" },
    ],
    impact: "Stops £17/day bleed. Redirects to a proven 3.4× ROAS pocket.",
    confidence: 96,
    priority: "now",
    draftedAt: "1h ago",
  },
  {
    id: "ap-004",
    client: "fjord-apparel",
    channel: "meta",
    subagent: "Audience targeting",
    kind: "audience-add",
    title: "Add 1% lookalike from last-90-day purchasers",
    reasoning:
      "Source audience has crossed 8,400 purchasers — well past Meta's 1,000-seed threshold. Existing lookalikes built on a 14-day window are saturating (overlap with cold prospecting at 31%). Refreshing the seed catches new buyer cohorts from the spring drop.",
    evidence: [
      { label: "Seed size", value: "8,412" },
      { label: "Current overlap", value: "31%" },
      { label: "Est. new reach", value: "~280k UK" },
      { label: "Build time", value: "~6h" },
    ],
    impact: "Opens fresh prospecting pool. Reduces frequency on stale lookalikes.",
    confidence: 88,
    priority: "today",
    draftedAt: "1h ago",
  },
  {
    id: "ap-005",
    client: "sundial-wellness",
    channel: "landing",
    subagent: "Landing pages",
    kind: "landing-test",
    title: "A/B test new headline: \"30 days. Or your money back.\"",
    reasoning:
      "Current LP headline (\"Science-backed wellness, daily\") tests in the 12th percentile against your category benchmark. Drafted variant leads with the trial offer, which the email subagent reports converts 2.1× on cold traffic. Variant matches your compliance playbook — no health claims.",
    evidence: [
      { label: "Current bounce", value: "68%" },
      { label: "Variant CTA", value: "Free trial" },
      { label: "Email parallel", value: "+2.1× conv" },
      { label: "Compliance", value: "Cleared" },
    ],
    impact: "Even +12% conversion lift adds ~£380 MRR.",
    confidence: 79,
    priority: "this-week",
    draftedAt: "2h ago",
  },
  {
    id: "ap-006",
    client: "hatchet-coffee",
    channel: "tiktok",
    subagent: "TikTok Ads",
    kind: "creative-launch",
    title: "Approve 6 \"origin story\" hooks for Spark Ads",
    reasoning:
      "Drafted from the producer interview footage you uploaded last week. Each hook tests a different opening — bean variety, altitude, harvest method, founder quote, roast process, taste pairing. Sticks to brand playbook (no over-polish, no music swells).",
    evidence: [
      { label: "Hooks drafted", value: "6" },
      { label: "Test budget", value: "£42 total" },
      { label: "Decision window", value: "72h post-launch" },
      { label: "Brand check", value: "Passed" },
    ],
    impact: "Expected 1–2 hooks scale. Replaces creatives ageing past 28-day window.",
    confidence: 82,
    priority: "today",
    draftedAt: "3h ago",
  },
  {
    id: "ap-007",
    client: "olive-oak",
    channel: "email",
    subagent: "Email",
    kind: "report-send",
    title: "Send weekly client report — drafted, awaiting your voice check",
    reasoning:
      "Cross-channel report ready. ROAS at 4.1× (up from 3.4×), spend pacing on track, 3 new winning creatives identified. Tone-matched to your account-manager voice template. Adds two opportunity callouts: TikTok scaling headroom + email list growth lull.",
    evidence: [
      { label: "ROAS this week", value: "4.1×" },
      { label: "Spend pacing", value: "On track" },
      { label: "Wins flagged", value: "3" },
      { label: "Opportunities", value: "2" },
    ],
    impact: "Saves ~3 hours of report assembly. Ready to send by 9am.",
    confidence: 94,
    priority: "today",
    draftedAt: "12 min ago",
  },
];

export type ActivityEntry = {
  id: string;
  timestamp: string;
  subagent: string;
  action: string;
  client?: string;
  outcome?: "win" | "neutral" | "watch";
};

export const activityFeed: ActivityEntry[] = [
  {
    id: "act-001",
    timestamp: "just now",
    subagent: "Bid management",
    action: "Adjusted 14 keyword bids on Google Ads",
    client: "Lume Skincare",
    outcome: "neutral",
  },
  {
    id: "act-002",
    timestamp: "3 min ago",
    subagent: "Creative analysis",
    action: "Flagged \"founder POV\" as winning pattern at 4.1× ROAS",
    client: "Northland Outdoor",
    outcome: "win",
  },
  {
    id: "act-003",
    timestamp: "8 min ago",
    subagent: "Reporting",
    action: "Drafted weekly cross-channel report — awaiting voice check",
    client: "Olive & Oak Beauty",
    outcome: "neutral",
  },
  {
    id: "act-004",
    timestamp: "14 min ago",
    subagent: "Budget pacing",
    action: "Flagged Meta over-pace on Northland — 118% of plan",
    client: "Northland Outdoor",
    outcome: "watch",
  },
  {
    id: "act-005",
    timestamp: "22 min ago",
    subagent: "TikTok Ads",
    action: "Launched 6 Spark Ad hooks for testing",
    client: "Hatchet Coffee Co",
    outcome: "neutral",
  },
  {
    id: "act-006",
    timestamp: "31 min ago",
    subagent: "A/B testing",
    action: "Test concluded — variant B wins at 96% confidence",
    client: "Sundial Wellness",
    outcome: "win",
  },
  {
    id: "act-007",
    timestamp: "47 min ago",
    subagent: "Competitive intel",
    action: "New competitor creative detected — Bondi Beauty",
    client: "Olive & Oak Beauty",
    outcome: "watch",
  },
  {
    id: "act-008",
    timestamp: "1h ago",
    subagent: "Audits",
    action: "Pixel firing healthy across all 19 channels",
    outcome: "neutral",
  },
  {
    id: "act-009",
    timestamp: "1h ago",
    subagent: "Campaign briefs",
    action: "Drafted Q3 launch brief — Lume Aurora collection",
    client: "Lume Skincare",
    outcome: "neutral",
  },
  {
    id: "act-010",
    timestamp: "2h ago",
    subagent: "SEO content",
    action: "Published 4 cluster briefs — \"clean beauty UK\"",
    client: "Olive & Oak Beauty",
    outcome: "win",
  },
];

// Aggregate stats for Mission Control
export const agencyStats = {
  name: "Pulse Digital",
  location: "Manchester · UK",
  clients: clients.length,
  channels: clients.reduce((sum, c) => sum + c.channels.length, 0),
  monthlySpend: clients.reduce((sum, c) => sum + c.monthlySpend, 0),
  hoursSaved: clients.reduce((sum, c) => sum + c.hoursSaved, 0),
  retainer: clients.reduce((sum, c) => sum + c.retainer, 0),
  blendedRoas: 3.5,
  blendedRoasDelta: 0.4,
  approvalsWaiting: approvals.length,
  approvalsApproved7d: 142,
  approvalsModified7d: 18,
  approvalsRejected7d: 6,
};

// 8-week ROAS trend for the Reports page
export const roasTrend = [2.4, 2.5, 2.7, 2.8, 3.0, 3.2, 3.4, 3.5];
// Monthly run-rate in £k across the agency book
export const spendTrend = [8.0, 8.4, 8.8, 9.0, 9.4, 9.7, 10.1, 10.3];
export const hoursSavedTrend = [180, 198, 215, 234, 248, 263, 275, 287];

// Channel breakdown for Reports — monthly £ totals across all clients
export const channelBreakdown = [
  { channel: "google" as ChannelKey, spend: 2980, roas: 3.8, share: 29 },
  { channel: "meta" as ChannelKey, spend: 2780, roas: 3.4, share: 27 },
  { channel: "tiktok" as ChannelKey, spend: 1850, roas: 4.2, share: 18 },
  { channel: "email" as ChannelKey, spend: 930, roas: 6.1, share: 9 },
  { channel: "linkedin" as ChannelKey, spend: 820, roas: 2.6, share: 8 },
  { channel: "seo" as ChannelKey, spend: 510, roas: 5.4, share: 5 },
  { channel: "programmatic" as ChannelKey, spend: 310, roas: 2.9, share: 3 },
  { channel: "landing" as ChannelKey, spend: 120, roas: 4.8, share: 1 },
];
