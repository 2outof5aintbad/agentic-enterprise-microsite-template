// ─────────────────────────────────────────────────────────────────────────────
// ACCOUNT CONFIGURATION — edit this file to populate the microsite
// All site content is driven from this single source of truth.
// ─────────────────────────────────────────────────────────────────────────────

export type DemoCategory = "agentforce" | "data" | "service" | "sales" | "platform";

export interface DemoVideo {
  id: string;
  title: string;
  description: string;
  category: DemoCategory;
  embedUrl: string;
  duration?: string;
  featured?: boolean;
}

export type TeamGroup = "sales" | "engineering" | "architecture" | "success";

export interface TeamMember {
  name: string;
  role: string;
  group: TeamGroup;
  description: string;
  image?: string;
  email?: string;
}

export const ACCOUNT = {

  // ── Identity ───────────────────────────────────────────────────────────────
  company: "ACME Corporation",

  brand: {
    primary:      "#0066FF",
    primaryDark:  "#0052CC",
    bg:           "#0A0A0A",
    light:        "#F5F5F5",
  },

  // ── Hero ───────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "Executive Briefing",
    headline: "The [Account]\nAgentic Enterprise",
    subheadline:
      "TODO: One or two sentences explaining the transformation opportunity — what changes, for whom, and why it matters now.",
    ctaPrimary:   { label: "See the Story",   href: "/act-1" },
    ctaSecondary: { label: "Meet the Team",   href: "/account-team" },
  },

  // ── Platform investments tile grid ────────────────────────────────────────
  platformInvestments: [
    { product: "Sales Cloud",   category: "CRM",         highlight: false, role: "Opportunity and account management" },
    { product: "Service Cloud", category: "Service",     highlight: false, role: "Case management and resolution" },
    { product: "Slack",         category: "Collaboration", highlight: false, role: "Human interface for agentic work" },
    { product: "Data Cloud",    category: "Data",        highlight: true,  role: "Unified intelligence foundation" },
    { product: "Tableau",       category: "Analytics",   highlight: false, role: "Insight to action" },
    { product: "MuleSoft",      category: "Integration", highlight: false, role: "System connectivity" },
    { product: "Agentforce",    category: "AI Platform", highlight: true,  role: "Autonomous AI execution" },
  ],

  // ── The burning platform (Act 1 / home gap section) ───────────────────────
  gap: {
    headline: "TODO: The core problem in one line.",
    subhead:  "TODO: Why it matters now.",
    body:     "TODO: 2–3 sentences describing the fragmentation, the hidden cost, and why the status quo is no longer acceptable.",
    stats: [
      { value: "TODO", label: "TODO: specific time or cost stat" },
      { value: "TODO", label: "TODO: specific systems or complexity stat" },
      { value: "TODO", label: "TODO: specific revenue or risk stat" },
    ],
  },

  // ── Three acts (home page nav cards) ─────────────────────────────────────
  acts: [
    {
      number: "01",
      href: "/act-1",
      title: "TODO: Act 1 Title",
      tagline: "TODO: Short tagline.",
      description: "TODO: One sentence describing what this act covers and why it matters.",
    },
    {
      number: "02",
      href: "/act-2",
      title: "The Data Foundation",
      tagline: "The intelligence layer everything else depends on.",
      description: "Before AI can act, it needs a single version of the truth. Data Cloud unifies every signal into one continuously-updated record.",
    },
    {
      number: "03",
      href: "/act-3",
      title: "The Agentic Enterprise",
      tagline: "AI that doesn't just inform — it executes.",
      description: "Autonomous agents that take signals all the way to action — and escalate only what genuinely requires human judgment.",
    },
  ],

  // ── Act 1: The current-state story ───────────────────────────────────────
  act1: {
    meta: { title: "Act 1 · Executive Briefing" },
    hero: {
      eyebrow: "Act 01",
      headline: "TODO: Act 1\nHeadline",
      subheadline: "TODO: One sentence framing the current-state problem for the executive audience.",
    },
    narrative: [
      {
        title: "TODO: Narrative Block 1 Title",
        body:  "TODO: 3–4 sentences describing the first dimension of the problem. Be specific — name the workflow, the system, the cost.",
      },
      {
        title: "TODO: Narrative Block 2 Title",
        body:  "TODO: 3–4 sentences describing the second dimension. Connect fragmentation to business risk.",
      },
    ],
    scenario: {
      eyebrow: "The Cost, Made Visible",
      title:   "TODO: Scenario Title — a specific workflow, a specific role",
      subtitle: "TODO: e.g. 'One rep. Five systems. Three days. One incomplete picture.'",
      steps: [
        {
          time:    "TODO: Day / Time",
          actor:   "TODO: Role",
          action:  "TODO: What they do and why it's painful.",
          system:  "TODO: System name",
          friction: null,
        },
        {
          time:    "TODO: Day / Time",
          actor:   "TODO: Role",
          action:  "TODO: What they do next.",
          system:  "TODO: System name",
          friction: "TODO: What breaks or costs time here.",
        },
        {
          time:    "TODO: Day / Time",
          actor:   "TODO: Role",
          action:  "TODO: The moment where the gap becomes a risk.",
          system:  "TODO: System name",
          friction: "TODO: The downstream consequence.",
        },
      ],
    },
    closing: {
      quote: "TODO: A one-sentence closing observation that reframes the problem — makes the executive see it differently.",
    },
    next: {
      href:  "/act-2",
      label: "See the Data Foundation",
    },
  },

  // ── Act 1 interactive flow (the hero scenario walkthrough) ────────────────
  scenarioFlow: {
    scenario: "TODO: e.g. 'Enterprise Account · Q3 Renewal Review'",
    steps: [
      {
        id:      "signal",
        number:  "01",
        label:   "Signal",
        title:   "TODO: Signal step title",
        summary: "TODO: One sentence — what the agent detects.",
        detail:  "TODO: 2–3 sentences describing what Agentforce surfaces, when, and why it matters.",
        mockUI: {
          type:      "alert",
          badge:     "ACTION REQUIRED",
          headline:  "TODO: Alert headline",
          account:   "TODO: Account name",
          metric:    "TODO: Key metric",
          submetric: "TODO: Supporting detail",
        },
      },
      {
        id:      "context",
        number:  "02",
        label:   "Context",
        title:   "TODO: Context step title",
        summary: "TODO: One sentence — what data assembles automatically.",
        detail:  "TODO: What Data Cloud pulls together. No tab-switching.",
        mockUI: {
          type: "metrics",
          items: [
            { label: "TODO Metric 1", value: "TODO", status: "warn" },
            { label: "TODO Metric 2", value: "TODO", status: "warn" },
            { label: "TODO Metric 3", value: "TODO", status: "neutral" },
            { label: "TODO Metric 4", value: "TODO", status: "neutral" },
          ],
        },
      },
      {
        id:      "insight",
        number:  "03",
        label:   "Insight",
        title:   "TODO: Insight step title",
        summary: "TODO: One sentence — the root cause identified.",
        detail:  "TODO: What Agentforce cross-references and concludes.",
        mockUI: {
          type:    "insight",
          finding: "Root cause identified",
          drivers: [
            "TODO: Driver 1",
            "TODO: Driver 2",
            "TODO: Driver 3",
          ],
          confidence: 90,
        },
      },
      {
        id:      "action",
        number:  "04",
        label:   "Action",
        title:   "TODO: Action step title",
        summary: "TODO: What the agent prepares automatically.",
        detail:  "TODO: The specific output — brief, talking points, recommendations — ready for human review.",
        mockUI: {
          type: "document",
          items: [
            { icon: "doc",   label: "TODO: Document 1", status: "ready" },
            { icon: "chart", label: "TODO: Document 2", status: "ready" },
            { icon: "list",  label: "TODO: Talking Points", status: "ready" },
          ],
        },
      },
      {
        id:      "execution",
        number:  "05",
        label:   "Execution",
        title:   "TODO: Execution step title",
        summary: "TODO: The human walks in prepared.",
        detail:  "TODO: What the meeting looks like now — forward-looking vs. defensive.",
        mockUI: {
          type:   "comparison",
          before: { label: "Without Agentforce", time: "TODO hrs prep",  mood: "Reactive" },
          after:  { label: "With Agentforce",    time: "TODO min prep",  mood: "Proactive" },
        },
      },
    ],
  },

  // ── Act 1 content (narrative, before/after, metrics, enablers) ───────────
  cockpit: {
    meta: { title: "Act 1 · Executive Briefing" },
    hero: {
      eyebrow: "Act 01",
      headline: "TODO: Act 1\nPage Headline",
      subheadline: "TODO: Subheadline for the act 1 detail page.",
    },
    narrative: [
      { title: "TODO: Narrative 1", body: "TODO: Body 1" },
      { title: "TODO: Narrative 2", body: "TODO: Body 2" },
      { title: "TODO: Narrative 3", body: "TODO: Body 3" },
      { title: "TODO: Narrative 4", body: "TODO: Body 4" },
    ],
    beforeAfter: {
      eyebrow: "Before vs. After",
      title:   "What changes when the solution is live.",
      rows: [
        { dimension: "TODO: Dimension 1", before: "TODO: Before state", after: "TODO: After state" },
        { dimension: "TODO: Dimension 2", before: "TODO: Before state", after: "TODO: After state" },
        { dimension: "TODO: Dimension 3", before: "TODO: Before state", after: "TODO: After state" },
        { dimension: "TODO: Dimension 4", before: "TODO: Before state", after: "TODO: After state" },
      ],
    },
    metrics: [
      { value: "TODO", label: "TODO: Metric 1" },
      { value: "TODO", label: "TODO: Metric 2" },
      { value: "TODO", label: "TODO: Metric 3" },
      { value: "TODO", label: "TODO: Metric 4" },
    ],
    enablers: [
      { name: "Data Cloud",  role: "The unified foundation",   description: "TODO: How Data Cloud powers this act." },
      { name: "Agentforce",  role: "The synthesis engine",     description: "TODO: How Agentforce operates in this act." },
      { name: "Sales Cloud", role: "The system of action",     description: "TODO: How the primary CRM cloud connects." },
    ],
    quote: { text: "TODO: A closing quote or observation for act 1." },
    next:  { href: "/act-3", label: "See the Agentic Enterprise" },
  },

  // ── Act 2: Data Foundation ─────────────────────────────────────────────────
  data360: {
    meta: { title: "Data Foundation · Executive Briefing" },
    hero: {
      eyebrow: "Data Foundation",
      headline: "The intelligence layer\nyour team\nhas been missing.",
      subheadline: "TODO: One sentence — why the data foundation is the prerequisite for everything else.",
    },
    narrative: [
      { title: "Why the Foundation Matters",     body: "TODO: Why unified data is the prerequisite for AI to work — not a nice-to-have." },
      { title: "What Data Cloud Actually Does",  body: "TODO: What it unifies, how, and what that enables." },
      { title: "The Multiplier Effect",          body: "TODO: How Data Cloud amplifies the value of every other Salesforce investment." },
      { title: "Built on What You Already Own",  body: "TODO: Activation framing — this is an existing investment, not a new one." },
    ],
    dataFlows: [
      { source: "Sales Cloud",    signal: "TODO: What signal",  outcome: "TODO: What outcome" },
      { source: "Service Cloud",  signal: "TODO: What signal",  outcome: "TODO: What outcome" },
      { source: "ERP / Systems",  signal: "TODO: What signal",  outcome: "TODO: What outcome" },
      { source: "External Data",  signal: "TODO: What signal",  outcome: "TODO: What outcome" },
    ],
    metrics: [
      { value: "1 record",   label: "per account across all systems" },
      { value: "Real-time",  label: "data freshness — no stale exports" },
      { value: "TODO",       label: "data sources unified" },
      { value: "100%",       label: "of AI agents depend on this layer" },
    ],
    quote: { text: "TODO: A closing quote for the data foundation page." },
    next:  { href: "/act-1", label: "See Act 1" },
  },

  // ── Act 3: Agentic Enterprise ──────────────────────────────────────────────
  act3: {
    meta: { title: "Act 3: The Agentic Enterprise · Executive Briefing" },
    hero: {
      eyebrow: "Act 03",
      headline: "The Agentic\nEnterprise",
      subheadline: "TODO: From visibility to velocity — what autonomous execution looks like for this account.",
    },
    narrative: [
      { title: "From Visibility to Velocity",         body: "TODO: What changes when agents don't just surface intelligence but take action." },
      { title: "The Compounding Advantage",           body: "TODO: How the system gets smarter with every interaction." },
    ],
    scenario: {
      eyebrow:  "End-to-End Agentic Flow",
      title:    "From signal to action.",
      subtitle: "Autonomous where it should be. Human where it matters.",
      steps: [
        { step: "01", agent: "Signal Agent",         title: "TODO: Signal",      description: "TODO: What the agent detects.",                  autonomous: true,  note: null },
        { step: "02", agent: "Diagnosis Agent",      title: "TODO: Diagnosis",   description: "TODO: What the agent cross-references.",         autonomous: true,  note: null },
        { step: "03", agent: "Recommendation Agent", title: "TODO: Recommendation", description: "TODO: What the agent drafts for human review.", autonomous: false, note: "TODO: Human review step description" },
        { step: "04", agent: "Execution Agent",      title: "TODO: Execution",   description: "TODO: What executes after approval.",            autonomous: true,  note: null },
        { step: "05", agent: "Learning Loop",        title: "TODO: Learning",    description: "TODO: What the system captures for next time.",   autonomous: true,  note: null },
      ],
    },
    outcomes: [
      { metric: "TODO", label: "TODO: Outcome metric 1" },
      { metric: "TODO", label: "TODO: Outcome metric 2" },
      { metric: "TODO", label: "TODO: Outcome metric 3" },
      { metric: "TODO", label: "TODO: Outcome metric 4" },
    ],
    quote: { text: "TODO: Closing quote for act 3." },
    vision: "TODO: A paragraph-length vision statement — the future state, grounded in the account's reality, built on existing investments.",
    workflowComparison: {
      title:    "The same outcome. A different way of getting there.",
      subtitle: "TODO: Set up the specific workflow being compared.",
      human: {
        label: "Without Agentforce",
        stat:  "TODO: e.g. '4 days · 3 people · 12 manual steps'",
        steps: [
          { actor: "TODO Role", action: "TODO: Step 1", time: "Day 1" },
          { actor: "TODO Role", action: "TODO: Step 2", time: "Day 1" },
          { actor: "TODO Role", action: "TODO: Step 3", time: "Day 2" },
          { actor: "TODO Role", action: "TODO: Step 4", time: "Day 3" },
        ],
      },
      agentic: {
        label: "With Agentforce",
        stat:  "TODO: e.g. '25 minutes · 1 approval · fully executed'",
        steps: [
          { agent: "Signal Agent",         action: "TODO: Step 1", autonomous: true  },
          { agent: "Diagnosis Agent",      action: "TODO: Step 2", autonomous: true  },
          { agent: "Recommendation Agent", action: "TODO: Human review — one approval", autonomous: false },
          { agent: "Execution Agent",      action: "TODO: Step 4 — full execution", autonomous: true },
        ],
      },
    },
    enablers: [
      { name: "Agentforce", tagline: "The autonomous execution layer", description: "TODO",  actions: ["TODO action 1", "TODO action 2", "TODO action 3"] },
      { name: "Data Cloud",  tagline: "The intelligence foundation",    description: "TODO",  actions: ["TODO action 1", "TODO action 2", "TODO action 3"] },
      { name: "Sales Cloud", tagline: "The system of execution",        description: "TODO",  actions: ["TODO action 1", "TODO action 2", "TODO action 3"] },
    ],
    next: { href: "/", label: "Return to Overview" },
  },

  // ── Demo library ──────────────────────────────────────────────────────────
  demos: [
    {
      id: "agentforce-overview",
      title: "TODO: Demo Title",
      description: "TODO: Demo description — what you'll see and why it matters.",
      category: "agentforce" as DemoCategory,
      embedUrl: "https://play.vidyard.com/PLACEHOLDER",
      featured: true,
    },
  ] as DemoVideo[],

  // ── Account team ──────────────────────────────────────────────────────────
  team: [
    {
      name:        "TODO: Name",
      role:        "Account Director",
      group:       "sales" as TeamGroup,
      description: "TODO: One sentence describing their role on the account.",
      email:       "TODO@salesforce.com",
    },
    {
      name:        "TODO: Name",
      role:        "Principal Account SE",
      group:       "engineering" as TeamGroup,
      description: "TODO: One sentence describing their technical role.",
      email:       "TODO@salesforce.com",
    },
  ] as TeamMember[],

  // ── CTA (used in footer + act 3 close) ────────────────────────────────────
  cta: {
    headline:  "TODO: CTA headline — consultative, not salesy.",
    body:      "TODO: 1–2 sentences framing the next conversation.",
    primary:   { label: "Start the Conversation",  href: "/account-team" },
    secondary: { label: "Explore the Story",        href: "/" },
  },
};
