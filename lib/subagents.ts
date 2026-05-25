export type SubagentCategory = "channel" | "optimisation" | "strategy";
export type SubagentStatus = "idle" | "working" | "review" | "awaiting" | "complete";

export type Subagent = {
  id: string;
  name: string;
  category: SubagentCategory;
  description: string;
  currentTask?: string;
  client?: string;
  status: SubagentStatus;
};

export const subagents: Subagent[] = [
  // CHANNEL & EXECUTION (8)
  {
    id: "google-ads",
    name: "Google Ads",
    category: "channel",
    description: "Campaign build, keyword research, ad copy.",
    currentTask: "Drafting 14 RSA variants",
    client: "Lume Skincare",
    status: "working",
  },
  {
    id: "meta-ads",
    name: "Meta Ads",
    category: "channel",
    description: "Creative variants, audience setup, ad approval.",
    currentTask: "Rebuilding Advantage+ campaign",
    client: "Olive & Oak Beauty",
    status: "awaiting",
  },
  {
    id: "tiktok-ads",
    name: "TikTok Ads",
    category: "channel",
    description: "Creative hooks, audience testing.",
    currentTask: "Hook test — 6 variants live",
    client: "Hatchet Coffee Co",
    status: "working",
  },
  {
    id: "linkedin-ads",
    name: "LinkedIn Ads",
    category: "channel",
    description: "B2B targeting, sequence build.",
    currentTask: "Audience refresh",
    client: "Fjord Apparel",
    status: "idle",
  },
  {
    id: "programmatic",
    name: "Programmatic",
    category: "channel",
    description: "DSP setup, deal sourcing.",
    status: "idle",
  },
  {
    id: "email",
    name: "Email",
    category: "channel",
    description: "Sequence design, send schedule.",
    currentTask: "Black Friday flow — 7 emails",
    client: "Sundial Wellness",
    status: "review",
  },
  {
    id: "seo-content",
    name: "SEO content",
    category: "channel",
    description: "Briefs, keyword mapping, outlines.",
    currentTask: "Cluster brief: \"clean beauty UK\"",
    client: "Olive & Oak Beauty",
    status: "working",
  },
  {
    id: "landing-pages",
    name: "Landing pages",
    category: "channel",
    description: "Build, headline, layout variants.",
    status: "idle",
  },
  // OPTIMISATION (6)
  {
    id: "reporting",
    name: "Reporting",
    category: "optimisation",
    description: "Cross-channel weekly & monthly.",
    currentTask: "Monday brief — 6 clients",
    status: "working",
  },
  {
    id: "budget-pacing",
    name: "Budget pacing",
    category: "optimisation",
    description: "Spend on track, flagged early.",
    currentTask: "Pacing check across 19 channels",
    status: "working",
  },
  {
    id: "bid-management",
    name: "Bid management",
    category: "optimisation",
    description: "Automated rules, hourly.",
    currentTask: "Next sweep in 38 min",
    status: "idle",
  },
  {
    id: "audits",
    name: "Audits",
    category: "optimisation",
    description: "Creative, account, tracking health.",
    currentTask: "Pixel audit — Northland Outdoor",
    client: "Northland Outdoor",
    status: "review",
  },
  {
    id: "attribution",
    name: "Attribution",
    category: "optimisation",
    description: "Multi-touch model maintenance.",
    status: "idle",
  },
  {
    id: "ab-testing",
    name: "A/B testing",
    category: "optimisation",
    description: "Setup, statistical sign-off.",
    currentTask: "2 tests at significance",
    status: "review",
  },
  // STRATEGY & CREATIVE (6)
  {
    id: "audience-targeting",
    name: "Audience targeting",
    category: "strategy",
    description: "Segment build, lookalikes.",
    currentTask: "Lookalike 1% from purchasers",
    client: "Fjord Apparel",
    status: "awaiting",
  },
  {
    id: "creative-analysis",
    name: "Creative analysis",
    category: "strategy",
    description: "Winning patterns, hooks.",
    currentTask: "Pattern: \"founder POV\" 4.1× ROAS",
    status: "complete",
  },
  {
    id: "competitive-intel",
    name: "Competitive intel",
    category: "strategy",
    description: "Share of voice, creative tracking.",
    currentTask: "Tracking 12 competitor accounts",
    status: "working",
  },
  {
    id: "forecasting",
    name: "Forecasting",
    category: "strategy",
    description: "Scenario modelling, budget allocation.",
    status: "idle",
  },
  {
    id: "campaign-briefs",
    name: "Campaign briefs",
    category: "strategy",
    description: "Drafted from playbook + brand.",
    currentTask: "Q3 launch brief — Lume",
    client: "Lume Skincare",
    status: "working",
  },
  {
    id: "strategic-planning",
    name: "Strategic planning",
    category: "strategy",
    description: "Quarterly review, channel mix.",
    status: "idle",
  },
];

export const subagentsByCategory = {
  channel: subagents.filter((s) => s.category === "channel"),
  optimisation: subagents.filter((s) => s.category === "optimisation"),
  strategy: subagents.filter((s) => s.category === "strategy"),
};

export const categoryLabels = {
  channel: "CHANNEL · EXECUTION",
  optimisation: "OPTIMISATION",
  strategy: "STRATEGY · CREATIVE",
};

export const categoryDescriptions = {
  channel: "Run every channel end to end.",
  optimisation: "Pace, bid, test, report.",
  strategy: "Plan, target, brief, forecast.",
};
