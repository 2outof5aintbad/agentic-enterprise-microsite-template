// ─────────────────────────────────────────────────────────────────────────────
// ACCOUNT CONFIGURATION — edit this file to populate the microsite
// All site content is driven from this single source of truth.
// ─────────────────────────────────────────────────────────────────────────────

// ── Optional feature types ─────────────────────────────────────────────────

export interface GlobalMapOU {
  id: string;
  label: string;
  countries: string[];   // ISO alpha-3 codes
  status: "live" | "in-progress";
  agentforce?: boolean;
  before?: string;       // State before your platform
  current: string;       // Current state today
  future?: string;       // Future state with Agentforce
  futureHighlights?: string[];
  zoom?: { coordinates: [number, number]; zoom: number };
}

export interface GlobalMapTimelineFrame {
  year: number;
  label: string;
  caption?: string;
  ouStatus: Record<string, "live" | "in-progress" | "none">;
}

export interface ROISlider {
  label: string;
  sublabel: string;
  min: number;
  max: number;
  step: number;
  default: number;
  format: (v: number) => string;
}

export interface Headless360Pillar {
  number: string;
  eyebrow: string;
  headline: string;
  body: string;
  detail: string;
  capabilities: string[];
  tag: string;
}

export interface Headless360Play {
  category: string;
  label: string;
  description: string;
  surface: string;
}

export interface InnovationExperiment {
  id: string;
  status: "active" | "scoping" | "complete";
  title: string;
  function: string;
  tagline: string;
  description: string;
  why: string;
  signals: string[];
  stage: string;
  origin: string;
}

export type DemoCategory =
  | "agentforce" | "data" | "service" | "sales" | "platform"
  | "slack" | "tableau" | "analytics" | "watsonx";

export interface DemoVideo {
  id: string;
  title: string;
  description: string;
  category: DemoCategory;
  embedUrl: string;
  duration?: string;
  featured?: boolean;
}

export type TeamGroup =
  | "sales" | "engineering" | "architecture" | "success"
  | "specialist" | "analytics" | "data";

export interface TeamMember {
  name: string;
  role: string;
  group: TeamGroup;
  description: string;
  image?: string;
  email?: string;
  slack?: string;
}

export type AgentCategory =
  | "sales" | "service" | "field-service" | "marketing"
  | "operations" | "finance" | "hr" | "consulting" | "platform";

export interface SpecializedAgent {
  id: string;
  name: string;
  category: AgentCategory;
  tagline: string;
  description: string;
  image?: string;
}

export interface ArchLayer {
  name: string;
  tagline: string;
  products: string[];
  color?: string;
}

export interface StrategyRow {
  dimension: string;
  from: string;
  to: string;
  poweredBy: string[];
}

export interface ProofFunction {
  id: string;
  name: string;
  stats: { value: string; label: string }[];
  agentCapabilities: string[];
  results: { metric: string; label: string }[];
  quote?: { text: string; attribution: string };
}

export const ACCOUNT = {

  // ── Identity ───────────────────────────────────────────────────────────────
  company: "Ohana Inc.",

  brand: {
    primary:      "#0066FF",
    primaryDark:  "#0052CC",
    bg:           "#0A0A0A",
    light:        "#F5F5F5",
    // Font pairing — pick one based on brand personality:
    // "editorial"  — Playfair Display + Inter    (luxury, premium, insurance, pharma)
    // "refined"    — Cormorant Garamond + DM Sans (life sciences, financial services, heritage brands)
    // "modern"     — DM Sans + DM Sans            (SaaS, consumer tech, retail, approachable enterprise)
    // "technical"  — Space Grotesk + Inter        (engineering-led, platform companies, cloud)
    // "bold"       — Sora + Inter                 (bold enterprise, energy, manufacturing, field operations)
    fonts: "editorial" as "editorial" | "refined" | "modern" | "technical" | "bold",

    // Visual theme — controls background, text colors, surface treatment:
    // "dark"       — near-black bg, white text (default — works for most accounts)
    // "light"      — white bg, dark text (clean, modern, approachable)
    // "editorial"  — warm off-white bg, dark text, airy (premium, life sciences, heritage)
    // "bold"       — deep charcoal bg, high contrast, strong color blocks (energy, manufacturing)
    // "corporate"  — light gray bg, structured, conservative (financial services, government)
    theme: "dark" as "dark" | "light" | "editorial" | "bold" | "corporate",

    // Hero layout variant:
    // "centered"   — full-width headline centered (default)
    // "split"      — text left, stat/metric block right
    // "minimal"    — compact headline + CTA, no decorative elements
    heroLayout: "centered" as "centered" | "split" | "minimal",

    // Optional hero background image — full URL or /public path (e.g. "/images/hero.jpg")
    // If set, renders as full-bleed behind the hero with a brand-tinted dark overlay
    // If omitted, falls back to the default gradient treatment
    heroImage: undefined as string | undefined,

    // Section header alignment — eyebrow + heading + subtext blocks across all pages
    // "left"    — left-aligned (default for most themes — feels editorial and grounded)
    // "center"  — centered (works well for bold/dark themes with short punchy headings)
    headerAlign: "left" as "left" | "center",

    // Card grid density — controls gap and padding across card grids
    // "compact"   — tighter gaps and padding (good for data-heavy pages, corporate feel)
    // "default"   — balanced (works everywhere)
    // "spacious"  — more breathing room (editorial, premium, light themes)
    density: "default" as "compact" | "default" | "spacious",

    // Co-branded nav logos — shows [customerLogo] × [Salesforce] lockup in the nav header
    // customerLogo: URL or /public path to customer logo image (e.g. "/images/customer-logo.png")
    // customerLogoDark: optional alternate logo for dark-background navs (defaults to customerLogo)
    // If omitted, nav shows company name text as before
    customerLogo: undefined as string | undefined,
    customerLogoDark: undefined as string | undefined,
  },

  // ── Pages ──────────────────────────────────────────────────────────────────
  // Controls which pages appear in the nav. Remove any you don't need for this
  // engagement. You can always add them back later, or build custom pages in app/.
  //
  // Available slugs:
  //   "overview"       — Home / executive summary (always shown, cannot be hidden)
  //   "act-1"          — The Gap / current state
  //   "act-2"          — The Foundation / data platform
  //   "act-3"          — The Future / agentic enterprise
  //   "use-cases"      — Detailed use case deep-dives
  //   "architecture"   — Technical architecture diagram
  //   "strategy"       — Strategic roadmap
  //   "agent-tracker"  — Live agent deployment dashboard
  //   "proof"          — Results and proof points
  //   "business-case"  — ROI and business value
  //   "pilot"          — Pilot plan and next steps
  //   "demo-library"   — Curated demo video library
  //   "account-team"   — Your Salesforce account team
  //   "pulse"          — Events, announcements, and account updates (requires data/pulse.ts)
  //   "roi-calculator" — Interactive ROI calculator (requires ACCOUNT.roi)
  //   "innovation"     — Internal innovation showcase (requires ACCOUNT.innovation)
  //   "headless-360"   — Headless 360 platform architecture deep-dive (requires ACCOUNT.headless360)
  //
  pages: [
    "act-1",
    "act-2",
    "act-3",
    "use-cases",
    "architecture",
    "agent-tracker",
    "proof",
    "business-case",
    "pilot",
    "demo-library",
    "account-team",
  ] as string[],

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
    { product: "Sales Cloud",   category: "CRM",           highlight: false, role: "Opportunity and account management" },
    { product: "Service Cloud", category: "Service",       highlight: false, role: "Case management and resolution" },
    { product: "Slack",         category: "Collaboration", highlight: false, role: "Human interface for agentic work" },
    { product: "Data Cloud",    category: "Data",          highlight: true,  role: "Unified intelligence foundation" },
    { product: "Tableau",       category: "Analytics",     highlight: false, role: "Insight to action" },
    { product: "MuleSoft",      category: "Integration",   highlight: false, role: "System connectivity" },
    { product: "Agentforce",    category: "AI Platform",   highlight: true,  role: "Autonomous AI execution" },
  ],

  // ── The burning platform (home gap section) ───────────────────────────────
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

  // ── Three chapters (home page nav cards) ─────────────────────────────────
  // number: short label shown as eyebrow pill — e.g. "The Problem", "The Foundation", "The Future"
  acts: [
    {
      number: "The Problem",
      href: "/act-1",
      title: "TODO: Chapter 1 Title",
      tagline: "TODO: Short tagline.",
      description: "TODO: One sentence describing what this chapter covers and why it matters.",
    },
    {
      number: "The Foundation",
      href: "/act-2",
      title: "The Data Foundation",
      tagline: "The intelligence layer everything else depends on.",
      description: "Before AI can act, it needs a single version of the truth. Data Cloud unifies every signal into one continuously-updated record.",
    },
    {
      number: "The Future",
      href: "/act-3",
      title: "The Agentic Enterprise",
      tagline: "AI that doesn't just inform — it executes.",
      description: "Autonomous agents that take signals all the way to action — and escalate only what genuinely requires human judgment.",
    },
  ],

  // ── Act 1: Narrative + before/after + metrics + enablers ─────────────────
  act1: {
    meta: { title: "TODO: Act 1 Title · Executive Briefing" },
    hero: {
      eyebrow: "The Problem",
      headline: "TODO: Chapter 1\nPage Headline",
      subheadline: "TODO: Subheadline for the chapter 1 detail page.",
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
    next:  { href: "/act-2", label: "See the Data Foundation" },
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
      { source: "Sales Cloud",   signal: "TODO: What signal",  outcome: "TODO: What outcome" },
      { source: "Service Cloud", signal: "TODO: What signal",  outcome: "TODO: What outcome" },
      { source: "ERP / Systems", signal: "TODO: What signal",  outcome: "TODO: What outcome" },
      { source: "External Data", signal: "TODO: What signal",  outcome: "TODO: What outcome" },
    ],
    metrics: [
      { value: "1 record",   label: "per account across all systems" },
      { value: "Real-time",  label: "data freshness — no stale exports" },
      { value: "TODO",       label: "data sources unified" },
      { value: "100%",       label: "of AI agents depend on this layer" },
    ],
    quote: { text: "TODO: A closing quote for the data foundation page." },
    next:  { href: "/act-3", label: "See the Agentic Enterprise" },
  },

  // ── Act 3: Agentic Enterprise ──────────────────────────────────────────────
  act3: {
    meta: { title: "The Agentic Enterprise · Executive Briefing" },
    hero: {
      eyebrow: "The Future",
      headline: "The Agentic\nEnterprise",
      subheadline: "TODO: From visibility to velocity — what autonomous execution looks like for this account.",
    },
    narrative: [
      { title: "From Visibility to Velocity",  body: "TODO: What changes when agents don't just surface intelligence but take action." },
      { title: "The Compounding Advantage",    body: "TODO: How the system gets smarter with every interaction." },
    ],
    scenario: {
      eyebrow:  "End-to-End Agentic Flow",
      title:    "From signal to action.",
      subtitle: "Autonomous where it should be. Human where it matters.",
      steps: [
        { step: "01", agent: "Signal Agent",         title: "TODO: Signal",         description: "TODO: What the agent detects.",                    autonomous: true,  note: null },
        { step: "02", agent: "Diagnosis Agent",      title: "TODO: Diagnosis",      description: "TODO: What the agent cross-references.",           autonomous: true,  note: null },
        { step: "03", agent: "Recommendation Agent", title: "TODO: Recommendation", description: "TODO: What the agent drafts for human review.",    autonomous: false, note: "TODO: Human review step description" },
        { step: "04", agent: "Execution Agent",      title: "TODO: Execution",      description: "TODO: What executes after approval.",              autonomous: true,  note: null },
        { step: "05", agent: "Learning Loop",        title: "TODO: Learning",       description: "TODO: What the system captures for next time.",     autonomous: true,  note: null },
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
          { agent: "Execution Agent",      action: "TODO: Step 4 — full execution",     autonomous: true  },
        ],
      },
    },
    enablers: [
      { name: "Agentforce", tagline: "The autonomous execution layer", description: "TODO", actions: ["TODO action 1", "TODO action 2", "TODO action 3"] },
      { name: "Data Cloud",  tagline: "The intelligence foundation",   description: "TODO", actions: ["TODO action 1", "TODO action 2", "TODO action 3"] },
      { name: "Sales Cloud", tagline: "The system of execution",       description: "TODO", actions: ["TODO action 1", "TODO action 2", "TODO action 3"] },
    ],
    next: { href: "/use-cases", label: "Explore Use Cases" },
  },

  // ── Use Cases (interactive library) ──────────────────────────────────────
  useCases: {
    meta: { title: "Use Cases · Executive Briefing" },
    headline: "TODO: Use cases headline — e.g. 'Agentforce for [Company]'",
    opening:  "TODO: One or two sentences framing what Agentforce does — not a chatbot, a digital labor platform.",
    cases: [
      {
        id: "case-1",
        title: "TODO: Use Case 1 Name",
        challenge: "TODO: What's broken today — the specific workflow and who it hurts.",
        what: "TODO: What the agent does — name the actions, systems, and outputs.",
        systems: ["TODO System 1", "TODO System 2"],
        workflow: "TODO: Step-by-step — agent detects → retrieves context → recommends → executes → closes loop.",
        value: "TODO: Business outcome — time, revenue, quality, or risk.",
      },
      {
        id: "case-2",
        title: "TODO: Use Case 2 Name",
        challenge: "TODO: What's broken today.",
        what: "TODO: What the agent does.",
        systems: ["TODO System 1", "TODO System 2"],
        workflow: "TODO: Workflow description.",
        value: "TODO: Business outcome.",
      },
      {
        id: "case-3",
        title: "TODO: Use Case 3 Name",
        challenge: "TODO: What's broken today.",
        what: "TODO: What the agent does.",
        systems: ["TODO System 1", "TODO System 2"],
        workflow: "TODO: Workflow description.",
        value: "TODO: Business outcome.",
      },
    ],
    beforeAfter: {
      headline: "TODO: Before / After section headline.",
      workflows: [
        {
          title: "TODO: Workflow Name 1",
          before: "TODO: The painful manual reality — specific, recognizable.",
          after:  "TODO: The future state with Agentforce — specific, autonomous where it should be.",
        },
        {
          title: "TODO: Workflow Name 2",
          before: "TODO: The painful manual reality.",
          after:  "TODO: The future state.",
        },
      ],
    },
    valueLevers: {
      headline: "Potential Value Levers",
      disclaimer: "TODO: Framing statement — e.g. 'The goal is not more AI experiments. The goal is a trusted operating model where data, agents, and people work together.'",
      levers: [
        { title: "TODO: Lever 1", description: "TODO: One sentence on the value this lever unlocks." },
        { title: "TODO: Lever 2", description: "TODO: One sentence." },
        { title: "TODO: Lever 3", description: "TODO: One sentence." },
        { title: "TODO: Lever 4", description: "TODO: One sentence." },
      ],
    },
  },

  // ── Business Case ─────────────────────────────────────────────────────────
  businessCase: {
    meta: { title: "Business Case · Executive Briefing" },
    headline: "TODO: Business case headline — e.g. 'The Business Case for [Company]'",
    subhead:  "TODO: Subhead — e.g. 'Three upgrades. One integrated platform. A number that justifies the ask.'",
    investmentLines: [
      { product: "TODO: Product 1", stage: "TODO: Stage / Tier", status: "TODO: In Progress / POC Live / Confirmed" },
      { product: "TODO: Product 2", stage: "TODO: Stage / Tier", status: "TODO: Status" },
      { product: "TODO: Product 3", stage: "TODO: Stage / Tier", status: "TODO: Status" },
    ],
    valueUnlocked: [
      { label: "TODO: Value Label 1", value: "TODO", description: "TODO: How this was derived — ground in real data." },
      { label: "TODO: Value Label 2", value: "TODO", description: "TODO: Description." },
      { label: "TODO: Value Label 3", value: "TODO", description: "TODO: Description." },
      { label: "TODO: Value Label 4", value: "TODO", description: "TODO: Description." },
    ],
    clientZeroNote: "TODO: Why this customer is uniquely positioned — customer + partner + consulting engine + market blueprint.",
    windowNote: "TODO: Why now — the timing argument (renewal cycle, strategic event, competitive pressure).",
    ask: "The Integrated Ask",
    askNote: "TODO: What's being asked and why consolidating it creates more value than separate conversations.",
  },

  // ── Pilot Plan ────────────────────────────────────────────────────────────
  pilotPlan: {
    meta: { title: "90-Day Pilot · Executive Briefing" },
    headline: "TODO: Pilot plan headline — e.g. '90-Day Path to an Agentic Enterprise Pilot'",
    cta: "TODO: Start with one high-value workflow. Prove the model. Scale the blueprint.",
    phases: [
      {
        phase: "Phase 1",
        title: "Align",
        weeks: "Weeks 1–3",
        steps: [
          "TODO: Select one executive use case with clear success metrics.",
          "TODO: Confirm data sources and access requirements.",
          "TODO: Define user group and pilot scope.",
          "TODO: Align stakeholders on definition of success.",
        ],
      },
      {
        phase: "Phase 2",
        title: "Connect",
        weeks: "Weeks 4–8",
        steps: [
          "TODO: Establish governed data access and integration points.",
          "TODO: Map relevant systems and data flows.",
          "TODO: Configure agent actions, guardrails, and approval flows.",
          "TODO: Validate data quality and trust layer.",
        ],
      },
      {
        phase: "Phase 3",
        title: "Launch",
        weeks: "Weeks 9–12",
        steps: [
          "TODO: Pilot with target user group in Slack and Salesforce.",
          "TODO: Measure productivity, resolution time, and adoption.",
          "TODO: Refine agent actions based on real usage.",
          "TODO: Document outcomes and define expansion roadmap.",
        ],
      },
    ],
  },

  // ── Specialized Agents (filterable avatar gallery) ────────────────────────
  agents: {
    meta: { title: "Specialized Agents · Executive Briefing" },
    headline: "The agents built for [Account].",
    opening: "TODO: One or two sentences — these aren't generic AI tools. They're purpose-built for the specific workflows this team runs every day.",
    categories: [
      { id: "sales",        label: "Sales",        count: 0 },
      { id: "service",      label: "Service",      count: 0 },
      { id: "field-service",label: "Field Service", count: 0 },
      { id: "operations",   label: "Operations",   count: 0 },
    ] as { id: AgentCategory; label: string; count: number }[],
    roster: [
      {
        id: "lead-prospecting",
        name: "Lead Prospecting Agent",
        category: "sales" as AgentCategory,
        tagline: "TODO: I will never let a qualified lead go dark — every signal gets actioned, every opportunity gets a next step.",
        description: "TODO: 2–3 sentences on what this agent does: the specific workflow it owns, the data sources it reads, and the actions it takes or recommends.",
      },
      {
        id: "pipeline-management",
        name: "Pipeline Management Agent",
        category: "sales" as AgentCategory,
        tagline: "TODO: I will surface every deal at risk before it becomes a problem — and hand you the talking points before you even ask.",
        description: "TODO: What this agent monitors, how it diagnoses risk, and what it prepares for the rep.",
      },
      {
        id: "case-resolution",
        name: "Case Resolution Agent",
        category: "service" as AgentCategory,
        tagline: "TODO: I will resolve Tier 1 and Tier 2 cases in minutes — and know exactly when to escalate to a human who can actually help.",
        description: "TODO: How this agent triages incoming cases, drafts resolutions, and closes the loop without manual intervention.",
      },
      {
        id: "field-dispatch",
        name: "Field Dispatch Agent",
        category: "field-service" as AgentCategory,
        tagline: "TODO: I will match the right technician to every job based on skills, location, and load — before the dispatcher finishes their coffee.",
        description: "TODO: The scheduling logic this agent applies, what data it reads, and how it handles exceptions.",
      },
    ] as SpecializedAgent[],
  },

  // ── Architecture (layered stack diagram) ──────────────────────────────────
  architecture: {
    meta: { title: "Architecture · Executive Briefing" },
    headline: "TODO: Architecture headline — e.g. 'One platform. Five layers. Complete coverage.'",
    opening: "TODO: One sentence framing the architecture — not a tech diagram, a business operating model.",
    layers: [
      {
        name: "Outcomes",
        tagline: "What the business sees",
        products: ["Revenue Growth", "Cost Reduction", "Customer Satisfaction", "Risk Mitigation"],
        color: "var(--brand-primary)",
      },
      {
        name: "Work Surfaces",
        tagline: "Where people interact with agents",
        products: ["Slack", "Salesforce UI", "Mobile Apps", "Customer Portals"],
        color: "var(--brand-primary)",
      },
      {
        name: "Agent Layer",
        tagline: "Autonomous digital workers",
        products: ["Agentforce Platform", "Custom Agents", "Agent Actions", "Guardrails"],
        color: "var(--brand-primary)",
      },
      {
        name: "Intelligence",
        tagline: "The reasoning and knowledge core",
        products: ["Einstein AI", "LLM Orchestration", "Prompt Templates", "Model Grounding"],
        color: "var(--brand-primary)",
      },
      {
        name: "Data Foundation",
        tagline: "One unified truth",
        products: ["Data Cloud", "Data Streams", "Identity Resolution", "Zero Copy"],
        color: "var(--brand-primary)",
      },
      {
        name: "Systems of Record",
        tagline: "Existing investments — connected, not replaced",
        products: ["Sales Cloud", "Service Cloud", "ERP", "External APIs"],
        color: "var(--brand-primary)",
      },
    ] as ArchLayer[],
    note: "TODO: One sentence on why this architecture is different — zero copy, no rip-and-replace, builds on what you already own.",
  },

  // ── Strategy matrix (transformation framework) ────────────────────────────
  strategy: {
    meta: { title: "Strategy · Executive Briefing" },
    headline: "TODO: Strategy headline — e.g. 'From fragmented to agentic. A transformation framework.'",
    opening: "TODO: One or two sentences framing the matrix — four capabilities, each with a clear from/to and the Salesforce capability that powers it.",
    matrixLabel: "TODO: Matrix name — e.g. 'The Agentic Enterprise Framework'",
    rows: [
      {
        dimension: "Engage Anywhere",
        from: "TODO: Siloed channels — email, phone, portal — each with a different data set and a different team behind it.",
        to: "TODO: One unified surface where agents handle Tier 1 and 2 across every channel, with full context at every touchpoint.",
        poweredBy: ["Agentforce", "Service Cloud", "Slack"],
      },
      {
        dimension: "Request Anything",
        from: "TODO: Employees submit requests through disconnected forms, portals, and ticket systems — then wait.",
        to: "TODO: Natural language requests handled autonomously, with approvals routed to the right human instantly.",
        poweredBy: ["Agentforce", "Slack", "MuleSoft"],
      },
      {
        dimension: "Act Everywhere",
        from: "TODO: Reps, CSMs, and field teams spend 40% of their time on administrative work that delays the actual job.",
        to: "TODO: Agents execute across systems on behalf of the human — logging, scheduling, summarizing, escalating — without being asked.",
        poweredBy: ["Agentforce", "Sales Cloud", "Data Cloud"],
      },
      {
        dimension: "Know Everything",
        from: "TODO: Intelligence scattered across data warehouses, CRM notes, and spreadsheets — none of it connected.",
        to: "TODO: Every agent grounded in a single unified record — account history, product usage, risk signals — in real time.",
        poweredBy: ["Data Cloud", "Einstein AI", "Tableau"],
      },
    ] as StrategyRow[],
    closing: "TODO: One sentence — what this framework enables that point solutions never can.",
  },

  // ── Proof (results by function) ────────────────────────────────────────────
  proof: {
    meta: { title: "Results · Executive Briefing" },
    headline: "TODO: Proof headline — e.g. 'Salesforce drives results at [Account].'",
    opening: "TODO: One sentence framing the proof — what functions, what kinds of outcomes, approved sources only.",
    functions: [
      {
        id: "sales",
        name: "Sales",
        stats: [
          { value: "TODO", label: "accounts managed with full AI-assisted context" },
          { value: "TODO", label: "pipeline coverage with automated opportunity signals" },
        ],
        agentCapabilities: [
          "TODO: Agent capability 1 — one line on what the agent does in sales.",
          "TODO: Agent capability 2.",
          "TODO: Agent capability 3.",
        ],
        results: [
          { metric: "TODO%", label: "increase in rep productivity" },
          { metric: "TODO%", label: "improvement in forecast accuracy" },
          { metric: "TODO days", label: "reduction in deal cycle time" },
        ],
        quote: {
          text: "TODO: A short, punchy quote from a Salesforce reference customer in this industry or function.",
          attribution: "TODO: Name, Title, Company",
        },
      },
      {
        id: "service",
        name: "Service",
        stats: [
          { value: "TODO", label: "cases resolved without human escalation" },
          { value: "TODO", label: "channels unified under one agent layer" },
        ],
        agentCapabilities: [
          "TODO: What the service agent does — resolution, triage, or both.",
          "TODO: How it handles escalations.",
          "TODO: What it measures and learns from.",
        ],
        results: [
          { metric: "TODO%", label: "reduction in average handle time" },
          { metric: "TODO%", label: "increase in first-contact resolution" },
          { metric: "TODO%", label: "CSAT improvement" },
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise-wide",
        stats: [
          { value: "TODO", label: "employees on the unified agentic platform" },
          { value: "TODO", label: "workflows automated in the first 12 months" },
        ],
        agentCapabilities: [
          "TODO: Cross-functional capability 1.",
          "TODO: Cross-functional capability 2.",
          "TODO: What the platform unlocks at scale.",
        ],
        results: [
          { metric: "TODO%", label: "reduction in manual process cost" },
          { metric: "TODO",  label: "value unlocked in year one" },
          { metric: "TODO x", label: "ROI on the platform investment" },
        ],
      },
    ] as ProofFunction[],
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

  // ── Agent Tracker ─────────────────────────────────────────────────────────
  // Live deployment dashboard — what's running, piloting, and planned.
  // status: "live" | "pilot" | "planned"
  // metrics: shown as "Outcomes" for live/pilot, "Target Metrics" for planned
  agentTracker: {
    meta: { title: "Agent Tracker · Executive Briefing" },
    // platformMilestones: optional — non-agent Salesforce deployments (dashboards, data products, etc.)
    // Leave as empty array [] to hide the section.
    platformMilestones: [] as {
      id: string;
      name: string;
      launched: string;
      description: string;
      stats: { value: string; label: string }[];
      highlights: string[];
    }[],
    hero: {
      eyebrow: "Agentforce in Motion",
      headline: "TODO: e.g. '3 agents.\n1 live.\n2 in motion.'",
      subheadline: "TODO: A live view of every Agentforce agent — what's running, what's in pilot, and what's coming next.",
    },
    successMetrics: [
      { value: "TODO", label: "agents in production",       sublabel: "TODO: context" },
      { value: "TODO", label: "active pilots + planned",    sublabel: "TODO: context" },
      { value: "TODO", label: "employees on Agentforce",    sublabel: "TODO: context" },
      { value: "TODO", label: "first agent go-live",        sublabel: "TODO: context" },
    ],
    agents: [
      {
        id: "agent-1",
        status: "live" as const,
        name: "TODO: Agent Name",
        tagline: "TODO: First-person — what I do and why it matters.",
        entity: "TODO: Business unit or org entity",
        function: "TODO: Business function — e.g. 'Consumer Service Triage & Case Management'",
        description: "TODO: 2–3 sentences. What it does, what systems it touches, who uses it.",
        goLive: "TODO: e.g. 'April 2026'",
        metrics: [
          { value: "TODO%", label: "TODO: outcome metric" },
          { value: "TODO",  label: "TODO: scale or adoption metric" },
        ],
        highlights: [
          "TODO: Key fact, stakeholder, or scope note.",
          "TODO: Another highlight — go-live milestone, expansion, or customer quote.",
        ],
      },
      {
        id: "agent-2",
        status: "pilot" as const,
        name: "TODO: Agent Name",
        tagline: "TODO: First-person tagline.",
        entity: "TODO: Entity",
        function: "TODO: Function",
        description: "TODO: Description.",
        goLive: "TODO: e.g. 'Active POC · Q2 2026'",
        metrics: [
          { value: "TODO", label: "TODO: target metric" },
          { value: "TODO", label: "TODO: target metric" },
        ],
        highlights: [
          "TODO: Key detail.",
        ],
      },
      {
        id: "agent-3",
        status: "planned" as const,
        name: "TODO: Agent Name",
        tagline: "TODO: First-person tagline.",
        entity: "TODO: Entity",
        function: "TODO: Function",
        description: "TODO: Description.",
        goLive: "TODO: e.g. '90-day POC scoped · Q3 2026'",
        metrics: [
          { value: "TODO", label: "TODO: projected metric" },
        ],
        highlights: [
          "TODO: Key detail or stakeholder.",
        ],
      },
    ],
  },

  // ── Agentforce Embedded Chat (optional) ──────────────────────────────────
  // Leave as null to disable. Fill in values from Salesforce Setup →
  // Messaging Settings → your Embedded Service Deployment → View → Get Code.
  // Also add this site's domain to Setup → CORS and Setup → Trusted URLs.
  agentforce: null as null | {
    orgId:             string;   // 18-char Salesforce org ID
    deploymentDevName: string;   // Developer name of the Embedded Service Deployment
    orgUrl:            string;   // My Domain URL — e.g. https://yourorg.my.salesforce.com
    scrt2Url:          string;   // SCRT2 URL — e.g. https://yourorg.my.salesforce-scrt.com
    label:             string;   // Button label — e.g. "Ask Agentforce"
  },

  // ── Headless 360 (optional) ───────────────────────────────────────────────
  // Add "headless-360" to pages[] above to enable the page.
  // Covers the Salesforce platform's headless architecture — any IDE, any UI
  // framework, any surface — with account-specific context, stats, and plays.
  headless360: {
    tagline: "The surface changes. The platform doesn't.",
    intro: "TODO: One or two sentences — [Company] can't force customers or employees to come to Salesforce. With Headless 360, Salesforce goes to them — any surface, any framework, any coding environment.",
    heroImage: undefined as string | undefined,

    problemHeadline: "TODO: What's the signal/surface challenge for this account?",
    problemBody: "TODO: 2–3 sentences — what signals are being produced, why the right action doesn't happen automatically, and what Headless 360 unlocks.",
    stats: [
      { stat: "TODO", label: "TODO: Scale stat — e.g. users, signals, workflows" },
      { stat: "TODO", label: "TODO: Data stat — e.g. records, years of data" },
      { stat: "TODO", label: "TODO: Impact stat — e.g. what becomes an agent input" },
    ],

    pillars: [
      {
        number: "01",
        eyebrow: "Build with any coding agent or IDE",
        headline: "Move fast without rebuilding.",
        body: "TODO: Why this matters for [Company]'s engineering teams — what they can now build in Cursor, Claude Code, or VS Code without proprietary Salesforce tooling.",
        detail: "TODO: A specific agent or tool they could build in days, not months.",
        capabilities: [
          "60+ MCP tools — GA now",
          "30+ Agentic Skills — GA now",
          "Works in Cursor, Claude Code, VS Code",
          "Full access to Salesforce metadata and business logic",
          "Agentforce agent builder via any IDE",
        ],
        tag: "GA Now",
      },
      {
        number: "02",
        eyebrow: "Build with any UI framework",
        headline: "Native experiences on [Company] surfaces.",
        body: "TODO: What UI frameworks [Company] uses today and how Multi-Framework support lets them embed Salesforce-powered experiences without brittle API bridges.",
        detail: "TODO: A specific dashboard or surface — React, Angular, mobile — that could run on Salesforce data with governance traveling with it.",
        capabilities: [
          "Multi-Framework support — GA Q3 2026",
          "React, Angular, Vue, mobile native",
          "Real CRM data behind real sharing rules",
          "FLS and permission sets enforced at the API layer",
          "No separate data synchronization required",
        ],
        tag: "GA Q3 2026",
      },
      {
        number: "03",
        eyebrow: "Deploy on any surface",
        headline: "Meet employees and customers where they are.",
        body: "TODO: What surfaces matter for [Company] — voice, mobile, Slack, Teams — and how the same agent logic deploys to all of them with the same governance.",
        detail: "TODO: A specific scenario — a field worker's phone, a manager's Teams channel, a customer chat — where the agent works without rebuilding.",
        capabilities: [
          "Agent Script for Voice — GA now",
          "Agentforce Mobile SDK — GA now",
          "1-click Slack deploy — GA now",
          "Agentforce Experience Layer (AXL) — Beta July 2026",
          "Teams, ChatGPT plugin, and custom surface support",
        ],
        tag: "GA / Beta July 2026",
      },
    ] as Headless360Pillar[],

    architectureImage: undefined as string | undefined,

    playsEyebrow: "TODO: e.g. 'The [Company] Plays'",
    playsHeadline: "TODO: e.g. 'Three agents. Three growth levers.'",
    playsSubhead: "TODO: One sentence framing why these plays matter — tie them to declared priorities.",
    plays: [
      {
        category: "TODO: Category — e.g. 'Sales Productivity'",
        label: "TODO: Agent Name — e.g. 'Field Rep Voice Assistant'",
        description: "TODO: What this agent does, what signal triggers it, what action it takes.",
        surface: "TODO: Surfaces — e.g. 'Mobile · Slack · Voice'",
      },
      {
        category: "TODO: Category",
        label: "TODO: Agent Name",
        description: "TODO: Description.",
        surface: "TODO: Surfaces",
      },
      {
        category: "TODO: Category",
        label: "TODO: Agent Name",
        description: "TODO: Description.",
        surface: "TODO: Surfaces",
      },
    ] as Headless360Play[],

    trustHeadline: "TODO: Why governance is non-negotiable for [Company].",
    trustBody: "TODO: What PII or compliance obligations [Company] has — scale of users/data — and how the Einstein Trust Layer addresses them.",
    trustClosing: "TODO: One sentence — regardless of surface, the compliance posture is constant.",

    closingQuote: "TODO: The strategic takeaway — one punchy quote that captures why Headless 360 is a moat, not just a feature.",
    closingBody: [
      "TODO: Closing paragraph 1 — reframe the 'should we?' question as 'who controls the governance plane and how fast can you ship?'",
      "TODO: Closing paragraph 2 — what Headless 360 gives [Company] specifically.",
    ],
  },

  // ── ROI Calculator (optional) ─────────────────────────────────────────────
  // Add "roi-calculator" to pages[] above to enable the page.
  // Fully config-driven: define your sliders and a calculate() function that
  // returns a total + breakdown array. Labels and numbers are account-specific.
  roi: {
    pageHeadline: "What does Agentforce\nactually cost you?",
    pageSubhead: "Adjust the sliders to reflect your organization and see the estimated annual value.",
    totalLabel: "Estimated Annual Value",
    totalSublabel: "Based on your inputs — illustrative, not a commitment.",
    disclaimer: "Estimates based on Agentforce benchmarks and industry data. For illustrative purposes only. Actual results vary by deployment scope, adoption, and organizational complexity.",
    primarySlider: {
      label: "TODO: Primary metric — e.g. 'Field Reps' or 'Key Account Managers'",
      sublabel: "TODO: Sublabel — e.g. 'Active field reps across all territories'",
      min: 10, max: 500, step: 5, default: 100,
      format: (v: number) => v.toLocaleString(),
    } as ROISlider,
    secondarySlider: {
      label: "TODO: Secondary metric — e.g. 'Hours per Review' or 'Prep Time'",
      sublabel: "TODO: Sublabel",
      min: 1, max: 20, step: 1, default: 8,
      format: (v: number) => `${v} hrs`,
    } as ROISlider,
    tertiarySlider: {
      label: "TODO: Tertiary metric — e.g. 'Monthly Service Interactions'",
      sublabel: "TODO: Sublabel",
      min: 100, max: 10000, step: 100, default: 2000,
      format: (v: number) => v.toLocaleString(),
    } as ROISlider,
    // Return total (dollars) + up to 4 breakdown cards
    calculate: (primary: number, secondary: number, tertiary: number): {
      total: number;
      breakdown: { label: string; value: string; sub?: string }[];
    } => {
      // TODO: Replace with account-specific formula
      const timeSavings = primary * secondary * 4 * 85;
      const automation = tertiary * 12 * 0.35 * 15;
      const total = timeSavings + automation;
      const fmt = (n: number) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1000)}K`;
      return {
        total,
        breakdown: [
          { label: "Time Value", value: fmt(timeSavings), sub: `${(primary * secondary * 4).toLocaleString()} hours recovered/yr` },
          { label: "Automation Savings", value: fmt(automation), sub: `${Math.round(tertiary * 12 * 0.35).toLocaleString()} interactions/yr` },
          { label: "Prep Reduction", value: `${Math.round(((secondary - 0.33) / secondary) * 100)}%`, sub: `From ${secondary} hrs → ~20 min` },
          { label: "Additional Capacity", value: `+${(primary * 2).toLocaleString()}`, sub: "Accounts each rep can actively manage" },
        ],
      };
    },
    assumptions: [
      {
        title: "TODO: Assumption group 1 — e.g. 'Rep Productivity'",
        items: [
          "TODO: Assumption 1 — e.g. '4 reviews per rep per year'",
          "TODO: Assumption 2 — e.g. 'Agentforce reduces prep to ~20 minutes'",
        ],
      },
      {
        title: "TODO: Assumption group 2 — e.g. 'Service Automation'",
        items: [
          "TODO: Assumption 1 — e.g. '35% of interactions resolved autonomously'",
          "TODO: Assumption 2 — e.g. '$15 fully-loaded cost per manual interaction'",
        ],
      },
    ],
  },

  // ── Innovation / Experiments (optional) ──────────────────────────────────
  // Add "innovation" to pages[] above to enable the page.
  // Showcase internal innovation built on the Salesforce platform.
  innovation: {
    headline: "What&rsquo;s Being Built",
    subhead: "TODO: One or two sentences — [Company] isn't just adopting Salesforce. It's building on top of it.",
    closing: "TODO: Why internally-built tools on this foundation validate the investment thesis.",
    stats: [
      { value: "TODO", label: "active experiments" },
      { value: "TODO", label: "platform" },
    ],
    experiments: [
      {
        id: "experiment-1",
        status: "active" as const,
        title: "TODO: Experiment Title",
        function: "TODO: Business Function · Platform",
        tagline: "TODO: Question this solves — ideally one punchy sentence.",
        description: "TODO: What this tool does, what data it reads, what problem it eliminates.",
        why: "TODO: Why this matters — what gap it closes, who it helps, what changes when it's live.",
        signals: [
          "TODO: Feature or capability 1",
          "TODO: Feature or capability 2",
          "TODO: Feature or capability 3",
        ],
        stage: "TODO: e.g. 'Internal experiment — active development'",
        origin: "TODO: e.g. 'Built by the [Team] technology team'",
      },
    ] as InnovationExperiment[],
  },

  // ── Agent Simulator Teaser (optional) ─────────────────────────────────────
  // Drop AgentSimTeaser into any page when you want to link to an external
  // demo or simulator. Set to null to disable.
  // mockMessages: array of chat messages to show in the phone mock UI.
  agentSimulator: null as null | {
    eyebrow:       string;
    headline:      string;
    headlineAccent?: string;
    description:   string;
    features?:     string[];
    url:           string;
    ctaLabel:      string;
    ctaSublabel?:  string;
    mockChannel?:  string;
    mockChannelSub?: string;
    mockMessages:  {
      actor:   "user" | "agent";
      name:    string;
      text:    string;
      time:    string;
      done?:   boolean;
      active?: boolean;
    }[];
  },

  // ── Global Deployment Map (optional) ─────────────────────────────────────
  // Drop GlobalMapClient into any page to show an animated rollout map.
  // Set to null to disable. Each OU maps country ISO alpha-3 codes to a
  // region. The timeline animates through deployment stages.
  globalMap: null as null | {
    ous:           GlobalMapOU[];
    timeline:      GlobalMapTimelineFrame[];
    markers?:      { coordinates: [number, number]; label?: string; fromIndex?: number }[];
    defaultZoom?:  { coordinates: [number, number]; zoom: number };
  },

  // ── CTA (used in footer + act 3 close) ────────────────────────────────────
  cta: {
    headline:  "TODO: CTA headline — consultative, not salesy.",
    body:      "TODO: 1–2 sentences framing the next conversation.",
    primary:   { label: "Start the Conversation",  href: "/account-team" },
    secondary: { label: "Explore the Story",        href: "/" },
  },
};
