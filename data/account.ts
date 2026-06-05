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
  company: "Apex Foods Inc.",

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
    //
    // Included starter backgrounds (pick one that fits the account's industry):
    //   "/images/hero-cpg.png"           — Consumer goods / retail
    //   "/images/hero-finance.png"       — Financial services / insurance
    //   "/images/hero-manufacturing.png" — Manufacturing / field operations
    //   "/images/hero-healthcare.png"    — Healthcare / life sciences
    //   "/images/hero-tech.png"          — Technology / SaaS
    //   "/images/hero-energy.png"        — Energy / utilities
    //
    // Included gate page backgrounds (set in gate/page.tsx gateImage):
    //   "/images/gate-finance.png"       — Financial services / cityscape at dusk
    //   "/images/gate-manufacturing.png" — Manufacturing / factory floor
    //   "/images/gate-healthcare.png"    — Healthcare / hospital corridor
    //   "/images/gate-tech.png"          — Technology / open-plan office
    //   "/images/gate-energy.png"        — Energy / offshore platform at sunset
    //
    // Other assets:
    //   "/images/astro-icon.png"         — Astro icon (dark blue, no background)
    //   "/images/sparkles.jpg"           — Agentforce sparkles icon
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
  //   "global-map"     — Animated global deployment map (requires ACCOUNT.globalMap)
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
    "headless-360",
    "global-map",
    "strategy",
    "roi-calculator",
    "pulse",
  ] as string[],

  // ── Hero ───────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "Executive Briefing",
    headline: "The Apex Foods\nAgentic Enterprise",
    subheadline:
      "1,200 field reps. 14 hours a week on manual prep. A $28M platform investment already signed. The question isn't whether to move — it's how fast.",
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
    headline: "1,200 reps are your most expensive data-entry operators.",
    subhead:  "MYDay is being sunset. The replacement isn't decided yet. That window closes in 2025.",
    body:     "Apex Foods field reps spend 14+ hours a week pulling account data from four systems, building manual pre-visit briefs, and logging call notes after the fact. The investment to fix this — Sales Cloud, Data Cloud, Agentforce — is already signed. What's missing is activation.",
    stats: [
      { value: "14 hrs", label: "per rep per week on admin instead of selling" },
      { value: "4",      label: "disconnected systems reps toggle between daily" },
      { value: "$18M",   label: "in recoverable productivity across the field org" },
    ],
  },

  // ── Three chapters (home page nav cards) ─────────────────────────────────
  // number: short label shown as eyebrow pill — e.g. "The Problem", "The Foundation", "The Future"
  acts: [
    {
      number: "The Problem",
      href: "/act-1",
      title: "The Fragmented Field",
      tagline: "14 hours a week. Four systems. Zero automation.",
      description: "Apex Foods field reps are doing the work that Agentforce should be doing — manually, every single day.",
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
    meta: { title: "The Fragmented Field · Apex Foods Executive Briefing" },
    hero: {
      eyebrow: "The Problem",
      headline: "The field rep is\nthe integration layer.",
      subheadline: "1,200 Key Account Managers are manually connecting four systems, building briefs by hand, and logging calls after the fact. It's not a people problem. It's an architecture problem.",
    },
    narrative: [
      {
        title: "The MYDay Problem",
        body: "Apex Foods field reps live in MYDay — a mobile app being sunset in 2025. There's no replacement yet. The team that fills that gap with the right tool owns the field productivity story for the next five years. That window is open right now.",
      },
      {
        title: "Four Systems, Zero Synthesis",
        body: "Before a KAM walks into a Walmart meeting, they're pulling data from Sales Cloud, a trade spend tool, a retail execution platform, and their email history. None of these talk to each other. The rep is the integration layer — and that's expensive.",
      },
      {
        title: "The Hidden Cost of Manual Work",
        body: "14 hours a week per rep, multiplied by 1,200 reps, is 16.8M hours a year spent on work that doesn't require a human. At a fully-loaded cost of $85/hr, that's $1.4B in labor doing data entry. Not selling. Not building relationships. Data entry.",
      },
      {
        title: "The Investment Is Already Made",
        body: "Apex Foods signed a $28M Salesforce contract in January 2024 — Sales Cloud, Service Cloud, Data Cloud, Slack Enterprise+. Accenture is the SI. The foundation is being built. The question is whether Agentforce activates it or the team waits another 18 months.",
      },
    ],
    beforeAfter: {
      eyebrow: "Before vs. After",
      title:   "What a Tuesday looks like with and without Agentforce.",
      rows: [
        {
          dimension: "Pre-Visit Prep",
          before: "KAM spends 90 minutes pulling data from 4 systems, building a manual brief in a notes doc, and reviewing last visit notes.",
          after: "Agentforce delivers a complete brief to Slack 2 hours before the meeting — account health, open issues, product recommendations, talking points. Zero prep time.",
        },
        {
          dimension: "Post-Visit Logging",
          before: "Rep spends 45 minutes after each visit logging call notes, updating opportunity stages, and filing trade activity — usually the next morning.",
          after: "Agent listens to the meeting summary, updates Sales Cloud automatically, and flags any follow-ups. Rep confirms in 2 minutes.",
        },
        {
          dimension: "Issue Escalation",
          before: "Out-of-stock at a Kroger display is discovered by the rep on their next visit — 2 weeks after the fact. Retailer is already frustrated.",
          after: "Order Exception Agent detects the short ship the day it happens, notifies the rep and buyer automatically, and resolves the replacement before the next visit.",
        },
        {
          dimension: "Forecast Visibility",
          before: "Sales managers run weekly pipeline reviews based on rep self-reporting — optimistic, incomplete, and usually 2 weeks stale.",
          after: "Pipeline Intelligence Agent surfaces at-risk deals 3–4 weeks early, with root cause and suggested actions. Forecast meetings become decisions, not updates.",
        },
      ],
    },
    metrics: [
      { value: "14 hrs", label: "per rep per week on non-selling activity" },
      { value: "1,200",  label: "KAMs affected across North America" },
      { value: "$28M",   label: "Salesforce investment already signed" },
      { value: "2025",   label: "MYDay sunset — the window to act" },
    ],
    enablers: [
      {
        name: "Data Cloud",
        role: "The unified foundation",
        description: "Unifies trade spend, retail execution, CRM, and service data into a single account record — the prerequisite for every agent action.",
      },
      {
        name: "Agentforce",
        role: "The synthesis engine",
        description: "Reads the unified account record and acts — building briefs, detecting exceptions, surfacing risks — without waiting to be asked.",
      },
      {
        name: "Sales Cloud",
        role: "The system of action",
        description: "The source of truth for opportunity data, account history, and rep activity. Agentforce writes back, keeping CRM current automatically.",
      },
    ],
    quote: { text: "Our reps are excellent at building relationships. They're not excellent at data entry. We've been paying them to do the wrong job." },
    next:  { href: "/act-2", label: "See the Data Foundation" },
  },

  // ── Act 1 interactive flow (the hero scenario walkthrough) ────────────────
  scenarioFlow: {
    scenario: "Walmart Supercenter · Southeast Region · Q3 JBP Review",
    steps: [
      {
        id:      "signal",
        number:  "01",
        label:   "Signal",
        title:   "Meeting detected — brief triggered",
        summary: "Agentforce sees a Walmart JBP review on the KAM's calendar and starts building the brief.",
        detail:  "Two hours before the meeting, the Field Briefing Agent reads the calendar event, identifies it as a key account visit, and kicks off the data assembly process across Sales Cloud, Data Cloud, and the trade spend system.",
        mockUI: {
          type:      "alert",
          badge:     "BRIEF BUILDING",
          headline:  "Walmart SE JBP Review — 2 hrs",
          account:   "Walmart Supercenter · Southeast",
          metric:    "Last visit: 18 days ago",
          submetric: "2 open service cases · trade promo expiring",
        },
      },
      {
        id:      "context",
        number:  "02",
        label:   "Context",
        title:   "Account data assembled — no tab-switching",
        summary: "Data Cloud pulls together everything the KAM needs from four systems in one pass.",
        detail:  "Account health score, last three visit notes, open service cases, promotional compliance rate, planogram execution score, and competitive share data — all assembled automatically from Sales Cloud, the retail execution platform, and trade spend tool.",
        mockUI: {
          type: "metrics",
          items: [
            { label: "Account Health",     value: "73/100", status: "warn" },
            { label: "Promo Compliance",   value: "61%",    status: "warn" },
            { label: "Planogram Score",    value: "88%",    status: "neutral" },
            { label: "Open Cases",         value: "2",      status: "neutral" },
          ],
        },
      },
      {
        id:      "insight",
        number:  "03",
        label:   "Insight",
        title:   "Root cause surfaced — before the meeting",
        summary: "Agentforce identifies why the account health score dropped and what's driving it.",
        detail:  "Cross-referencing trade spend data with planogram reports, the agent surfaces that the Apex Crunch end-cap display was reset without the updated schematic — dropping compliance from 91% to 61% over the past two weeks. Two store-level cases are already open but unresolved.",
        mockUI: {
          type:    "insight",
          finding: "Compliance drop — root cause identified",
          drivers: [
            "End-cap reset used outdated schematic — 12 SKUs misplaced",
            "Two open cases in Service Cloud unresolved for 9 days",
            "Q3 trade promo window closes in 11 days — at risk of forfeit",
          ],
          confidence: 94,
        },
      },
      {
        id:      "action",
        number:  "04",
        label:   "Action",
        title:   "Brief delivered to Slack — ready to review",
        summary: "The complete pre-visit brief lands in the KAM's Slack DM before they leave for the store.",
        detail:  "The brief includes account health summary, root cause analysis, two open case summaries, updated schematic attached, talking points for the buyer meeting, and a recommended trade promo extension request — all formatted for a 5-minute review.",
        mockUI: {
          type: "document",
          items: [
            { icon: "doc",   label: "Walmart SE — Pre-Visit Brief",        status: "ready" },
            { icon: "chart", label: "Compliance Analysis + Root Cause",    status: "ready" },
            { icon: "list",  label: "Buyer Talking Points — 4 key points", status: "ready" },
          ],
        },
      },
      {
        id:      "execution",
        number:  "05",
        label:   "Execution",
        title:   "KAM walks in prepared — not reactive",
        summary: "Instead of discovering the compliance issue in the meeting, the KAM walks in with a resolution proposal already in hand.",
        detail:  "The KAM opens with the corrected schematic, closes the two open cases on the spot, and secures a 2-week trade promo extension before the buyer raises the concern. The meeting shifts from issue management to growth planning.",
        mockUI: {
          type:   "comparison",
          before: { label: "Without Agentforce", time: "90 min prep",  mood: "Reactive" },
          after:  { label: "With Agentforce",    time: "5 min review", mood: "Proactive" },
        },
      },
    ],
  },

  // ── Act 2: Data Foundation ─────────────────────────────────────────────────
  data360: {
    meta: { title: "Data Foundation · Executive Briefing" },
    hero: {
      eyebrow: "Data Foundation",
      headline: "The intelligence layer\nyour field\nhas been missing.",
      subheadline: "Agentforce can only be as good as the data it reads. Data Cloud turns four disconnected Apex Foods systems into one unified account record — and that changes everything.",
    },
    narrative: [
      {
        title: "Why the Foundation Matters",
        body: "Every Agentforce agent — the Field Briefing Agent, the Pipeline Intelligence Agent, the Order Exception Agent — reads from the same Data Cloud record. Without unification, agents give incomplete answers. With it, they give the right one. The foundation isn't a nice-to-have. It's the prerequisite.",
      },
      {
        title: "What Data Cloud Does for Apex Foods",
        body: "Data Cloud ingests signals from Sales Cloud (opportunity and visit history), Service Cloud (open cases), the trade spend system (promo commitments and compliance), and retail execution data (planogram scores, out-of-stock flags) — and resolves them into one continuously-updated record per retail account. No exports. No manual merges.",
      },
      {
        title: "The Multiplier Effect",
        body: "Apex Foods has already invested in Sales Cloud, Service Cloud, and Slack. Data Cloud doesn't replace any of them — it amplifies them. Every dollar already spent on CRM data becomes more valuable when it feeds an agent that acts on it in real time.",
      },
      {
        title: "Built on What You Already Own",
        body: "Data Cloud is included in the $28M contract Apex Foods signed in January 2024. This isn't a new procurement — it's activation. The data is there. The platform is contracted. The only question is how quickly the team turns it on.",
      },
    ],
    dataFlows: [
      { source: "Sales Cloud",        signal: "Account visits, opportunity stages, rep activity logs", outcome: "Full account history available to every agent in real time" },
      { source: "Service Cloud",       signal: "Open cases, resolution history, escalation patterns",  outcome: "Agent surfaces unresolved issues before the rep walks in" },
      { source: "Trade Spend System",  signal: "Promo commitments, compliance rates, expiry dates",   outcome: "Agent flags at-risk promotions and prepares extension requests" },
      { source: "Retail Execution",    signal: "Planogram scores, out-of-stock flags, display audits", outcome: "Agent identifies compliance gaps and corrective actions before the visit" },
    ],
    metrics: [
      { value: "1 record",  label: "per retail account across all four systems" },
      { value: "Real-time", label: "data freshness — no stale weekend exports" },
      { value: "4",         label: "data sources unified into a single truth layer" },
      { value: "100%",      label: "of Agentforce agents depend on this foundation" },
    ],
    quote: { text: "The agents are only as smart as the data underneath them. Once we unified the signals, the agent quality went from interesting to genuinely useful." },
    next:  { href: "/act-3", label: "See the Agentic Enterprise" },
  },

  // ── Act 3: Agentic Enterprise ──────────────────────────────────────────────
  act3: {
    meta: { title: "The Agentic Enterprise · Executive Briefing" },
    hero: {
      eyebrow: "The Future",
      headline: "The Agentic\nEnterprise",
      subheadline: "The Field Briefing Agent is live. The Pipeline Intelligence Agent is running. The Order Exception Agent is in POC. This isn't the future — it's the current state of the Apex Foods deployment.",
    },
    narrative: [
      {
        title: "From Visibility to Velocity",
        body: "Sales Cloud gave reps visibility into their accounts. Data Cloud gave agents intelligence about those accounts. Agentforce is what happens when that intelligence turns into action — automatically, in the right channel, at the right moment, without waiting to be asked.",
      },
      {
        title: "The Compounding Advantage",
        body: "Every time a Field Briefing Agent prepares a KAM for a visit, it logs what worked and what didn't. Every resolved Order Exception makes the next detection faster. Every pipeline risk flagged improves the model. The system doesn't just automate today's work — it gets better at tomorrow's.",
      },
    ],
    scenario: {
      eyebrow:  "End-to-End Agentic Flow",
      title:    "From signal to action.",
      subtitle: "Autonomous where it should be. Human where it matters.",
      steps: [
        {
          step: "01", agent: "Field Briefing Agent",
          title: "Meeting detected in calendar",
          description: "Two hours before a KAM's visit to a Walmart account, the agent detects the calendar event and begins pulling data from Sales Cloud, trade spend, and retail execution systems.",
          autonomous: true, note: null,
        },
        {
          step: "02", agent: "Data Cloud Intelligence",
          title: "Account record assembled automatically",
          description: "Account health, last 3 visit notes, open cases, promo compliance, and planogram scores are pulled from four systems into a single unified brief. Zero tab-switching by the rep.",
          autonomous: true, note: null,
        },
        {
          step: "03", agent: "Recommendation Agent",
          title: "Talking points drafted — rep reviews",
          description: "The agent drafts buyer talking points, flags the compliance gap, and recommends a trade promo extension request. The rep reviews and approves in Slack with a single tap.",
          autonomous: false, note: "One human review — the rep confirms the recommended approach before it's delivered.",
        },
        {
          step: "04", agent: "Execution Agent",
          title: "Brief delivered, cases actioned",
          description: "The approved brief is delivered to Slack, the two open Service Cloud cases are updated with the resolution path, and the trade promo extension request is drafted in the system.",
          autonomous: true, note: null,
        },
        {
          step: "05", agent: "Learning Loop",
          title: "Outcome captured, model improves",
          description: "Post-visit, the agent captures what happened — compliance corrected, extension approved, buyer sentiment positive — and feeds that signal back to improve future brief accuracy.",
          autonomous: true, note: null,
        },
      ],
    },
    outcomes: [
      { metric: "10 hrs",  label: "saved per KAM per week — time returned to selling" },
      { metric: "94%",     label: "rep adoption of Field Briefing Agent in first 30 days" },
      { metric: "+18%",    label: "forecast accuracy improvement from Pipeline Intelligence Agent" },
      { metric: "3x",      label: "faster order exception resolution vs. manual process" },
    ],
    quote: { text: "The reps who adopted the briefing agent first are already asking when the territory planning agent comes. That's the signal we've been waiting for." },
    vision: "Apex Foods has 1,200 KAMs who are excellent at building relationships and terrible at data entry — through no fault of their own. By the end of 2026, every one of them will walk into every meeting with a complete brief they didn't have to build, and leave knowing that the follow-up is already handled. That's not a technology story. That's a commercial strategy.",
    workflowComparison: {
      title:    "The same outcome. A different way of getting there.",
      subtitle: "Pre-visit preparation for a Walmart JBP review — the workflow that 1,200 Apex Foods KAMs repeat every single week.",
      human: {
        label: "Without Agentforce",
        stat:  "3.5 hours · 4 systems · all manual",
        steps: [
          { actor: "KAM", action: "Pulls last visit notes from Sales Cloud and copies into a doc", time: "Morning" },
          { actor: "KAM", action: "Logs into trade spend tool, screenshots relevant promo data", time: "Morning" },
          { actor: "KAM", action: "Checks retail execution app for planogram and compliance scores", time: "Midday" },
          { actor: "KAM", action: "Writes talking points manually, prints brief, drives to store", time: "Afternoon" },
        ],
      },
      agentic: {
        label: "With Agentforce",
        stat:  "5 min review · 1 approval · fully prepared",
        steps: [
          { agent: "Field Briefing Agent",    action: "Detects meeting, assembles data from 4 systems automatically", autonomous: true },
          { agent: "Data Cloud",              action: "Resolves account record — health, cases, compliance, history",  autonomous: true },
          { agent: "Recommendation Agent",    action: "Drafts talking points and promo extension request — rep approves in Slack", autonomous: false },
          { agent: "Execution Agent",         action: "Delivers brief, updates cases, files promo request — done",    autonomous: true },
        ],
      },
    },
    enablers: [
      {
        name: "Agentforce",
        tagline: "The autonomous execution layer",
        description: "Runs the Field Briefing Agent, Pipeline Intelligence Agent, and Order Exception Agent — detecting signals, assembling context, and executing actions without waiting to be asked.",
        actions: [
          "Builds pre-visit briefs 2 hours before every KAM meeting",
          "Flags at-risk pipeline deals 3–4 weeks before they slip",
          "Detects order exceptions and resolves them before the rep's next visit",
        ],
      },
      {
        name: "Data Cloud",
        tagline: "The intelligence foundation",
        description: "Unifies Sales Cloud, Service Cloud, trade spend, and retail execution data into a single continuously-updated record per retail account — the foundation every agent reads from.",
        actions: [
          "Resolves 4 data sources into 1 account record per customer",
          "Real-time freshness — no stale weekend exports",
          "Feeds every Agentforce agent with a complete and current context",
        ],
      },
      {
        name: "Sales Cloud",
        tagline: "The system of execution",
        description: "The source of truth for opportunity data, visit history, and rep activity. Agentforce reads from it and writes back — keeping CRM current without manual logging.",
        actions: [
          "Logs post-visit summaries automatically from Agentforce output",
          "Updates opportunity stages based on meeting outcomes",
          "Surfaces account health signals that trigger agent actions",
        ],
      },
    ],
    next: { href: "/use-cases", label: "Explore Use Cases" },
  },

  // ── Use Cases (interactive library) ──────────────────────────────────────
  useCases: {
    meta: { title: "Use Cases · Executive Briefing" },
    headline: "Agentforce for Apex Foods",
    opening:  "These aren't chatbots. They're digital workers that own specific workflows — detecting signals, assembling context, and executing actions on behalf of your field team without being asked.",
    cases: [
      {
        id: "case-1",
        title: "Pre-Visit Briefing",
        challenge: "KAMs spend 90+ minutes before every retail visit manually pulling data from Sales Cloud, the trade spend tool, and the retail execution app — then building a brief in a notes doc. The brief is often incomplete and always out of date by the time they walk in.",
        what: "The Field Briefing Agent detects an upcoming meeting from the calendar, assembles account health, last 3 visit notes, open cases, compliance scores, and promo status from four systems, drafts talking points, and delivers the complete brief to Slack 2 hours before the visit.",
        systems: ["Sales Cloud", "Data Cloud", "Retail Execution Platform", "Slack"],
        workflow: "Calendar event detected → Data Cloud pulls unified account record → compliance and case signals surfaced → talking points drafted → rep reviews and approves in Slack → brief delivered, cases updated.",
        value: "10 hours per rep per week returned to selling. 94% adoption in the first 30 days. KAMs walk into every meeting prepared instead of defensive.",
      },
      {
        id: "case-2",
        title: "Order Exception Resolution",
        challenge: "Short ships, late deliveries, and planogram substitutions are discovered by the KAM on their next store visit — often 2 weeks after the fact. By then the retailer is already frustrated and the window to fix it cheaply has closed.",
        what: "The Order Exception Agent monitors the OMS and ERP for exceptions in real time. When a short ship or substitution is detected, it identifies the affected account rep, the buyer contact, and the delivery timeline — then notifies both and initiates the replacement order autonomously.",
        systems: ["ERP / OMS", "Service Cloud", "Data Cloud", "Slack"],
        workflow: "Exception detected in OMS → account and rep identified → buyer and rep notified via Slack → replacement order initiated → case opened in Service Cloud → resolution tracked to closure.",
        value: "Exceptions resolved in hours, not weeks. Service cases created automatically. Retailer relationships protected before they're damaged.",
      },
      {
        id: "case-3",
        title: "Pipeline Risk Detection",
        challenge: "Sales managers run weekly pipeline reviews based on rep self-reporting — which is optimistic, incomplete, and usually 2 weeks stale. Deals slip because no one saw the warning signs early enough to intervene.",
        what: "The Pipeline Intelligence Agent monitors engagement signals across Sales Cloud, email activity, and stakeholder touchpoints. It flags deals showing risk patterns 3–4 weeks before they're likely to slip, surfaces the root cause, and prepares talking points for the rep's next call.",
        systems: ["Sales Cloud", "Data Cloud", "Email Activity", "Slack"],
        workflow: "Engagement signals monitored continuously → risk pattern detected → root cause analysis run → risk flag and talking points delivered to rep → pipeline health digest sent to sales manager weekly.",
        value: "+18% forecast accuracy in the first quarter. Deals actioned 3–4 weeks earlier. Pipeline reviews shift from status updates to strategic decisions.",
      },
    ],
    beforeAfter: {
      headline: "The workflow Agentforce changes first.",
      workflows: [
        {
          title: "Pre-Visit Preparation",
          before: "KAM opens Sales Cloud, copies last visit notes. Opens trade spend tool, screenshots promo data. Logs into retail execution app, records planogram scores. Pastes everything into a notes doc. Writes talking points from memory. 90 minutes, every single visit.",
          after: "Agentforce detects the meeting, pulls all four systems, drafts the brief, and delivers it to Slack 2 hours before the visit. The rep reviews and approves in 5 minutes. The rest of the morning is spent selling.",
        },
        {
          title: "Order Exception Handling",
          before: "Short ship at Target Southeast goes unnoticed until the KAM's next scheduled visit, 12 days later. Buyer is already frustrated. Emergency reorder takes 3 more days. Relationship damage done.",
          after: "Exception detected in OMS the day it happens. Agent notifies rep and buyer, initiates replacement, opens the Service Cloud case — all before the rep's morning coffee. Buyer hears from Apex Foods before they have to ask.",
        },
      ],
    },
    valueLevers: {
      headline: "Potential Value Levers",
      disclaimer: "The goal isn't more AI experiments. The goal is a field org where data flows to the right person at the right time, agents handle the work that shouldn't require a human, and KAMs spend their time on the work that does.",
      levers: [
        { title: "Field Productivity", description: "10 hours per KAM per week returned to selling — $18M in recoverable productivity across 1,200 reps." },
        { title: "Forecast Accuracy",  description: "Pipeline Intelligence Agent flags risk 3–4 weeks early, improving forecast accuracy and reducing end-of-quarter surprises." },
        { title: "Service Resolution",  description: "Order exceptions resolved in hours instead of weeks — protecting retailer relationships before damage is done." },
        { title: "Platform Activation", description: "Data Cloud and Agentforce are already in the $28M contract. Every agent deployed is ROI on an investment already made." },
      ],
    },
  },

  // ── Business Case ─────────────────────────────────────────────────────────
  businessCase: {
    meta: { title: "Business Case · Executive Briefing" },
    headline: "The Business Case for Apex Foods",
    subhead:  "The investment is already made. The question is whether Agentforce activates it.",
    investmentLines: [
      { product: "Sales Cloud + Data Cloud", stage: "Enterprise · Full Deployment", status: "Live — Accenture SI engaged" },
      { product: "Agentforce",               stage: "Field Briefing Agent — Phase 1", status: "Live · 640 reps · April 2026" },
      { product: "Slack Enterprise+",        stage: "Enterprise · USRB Rollout",      status: "In progress · MYDay replacement" },
    ],
    valueUnlocked: [
      {
        label: "Field Productivity",
        value: "$18M",
        description: "10 hours per week × 1,200 KAMs × $85 fully-loaded hourly rate × 65% automation rate. Conservative. Doesn't include capacity expansion from time returned to selling.",
      },
      {
        label: "Service Cost Reduction",
        value: "$4.2M",
        description: "42% of Tier 1 and Tier 2 order exception and retailer inquiry cases resolved autonomously by Agentforce. Based on 8,000 interactions/month at $18 fully-loaded cost per case.",
      },
      {
        label: "Revenue at Risk — Recovered",
        value: "$6.8M",
        description: "Trade promotions expiring without execution, order exceptions caught late, and pipeline slippage — all addressable by agents already in deployment or POC. Highly conservative estimate.",
      },
      {
        label: "Platform ROI",
        value: "3.2x",
        description: "Combined productivity, service, and revenue impact against the $28M contract TCV. Year-1 payback based on Field Briefing Agent deployment alone reaches break-even at current adoption rates.",
      },
    ],
    clientZeroNote: "Apex Foods has 1,200 field reps, a $28M Salesforce contract already signed, a live SI engagement with Accenture, and a field mobility platform being sunset in 2025. Every ingredient for a fast, high-impact Agentforce deployment is already in place. The risk isn't moving too fast — it's the platform decision vacuum that MYDay's sunset creates if Agentforce doesn't fill it.",
    windowNote: "MYDay sunsets in 2025. The field org needs a replacement. That decision — which platform, which workflow, which vendor — is being made right now by Marcus Webb and the field leadership team. Whoever fills that gap defines the field productivity story for the next five years. Agentforce is the obvious answer, but it needs to be positioned and piloted before the decision is made without it.",
    ask: "The Integrated Ask",
    askNote: "Agentforce, Data Cloud activation, and Slack Enterprise+ are three separate line items that tell one story: a field org that operates on unified data, acts through autonomous agents, and communicates through the platform reps already use. Selling them separately means three separate conversations, three separate approval cycles, and a deployment that's incomplete by design.",
  },

  // ── Pilot Plan ────────────────────────────────────────────────────────────
  pilotPlan: {
    meta: { title: "90-Day Pilot · Executive Briefing" },
    headline: "90 Days to a Live Agentforce Deployment",
    cta: "Start with the Pre-Visit Briefing Agent. 400 reps. Measurable in week 6. Scale to 1,200 by Q4.",
    phases: [
      {
        phase: "Phase 1",
        title: "Align",
        weeks: "Weeks 1–3",
        steps: [
          "Select the Southeast region KAM team (400 reps) as the pilot cohort — highest Walmart and Target density, strongest data quality baseline.",
          "Confirm Data Cloud data streams from Sales Cloud, trade spend, and retail execution platform — validate account record completeness.",
          "Define success metrics with Marcus Webb: adoption rate, prep time reduction, rep satisfaction NPS.",
          "Align Sarah Chen and the CCO office on the MYDay replacement narrative — Agentforce as the field mobility successor.",
        ],
      },
      {
        phase: "Phase 2",
        title: "Connect",
        weeks: "Weeks 4–8",
        steps: [
          "Accenture configures Data Cloud ingestion for retail execution and trade spend sources — validate unified account record for top 50 Walmart accounts.",
          "Configure Field Briefing Agent actions: calendar detection, brief template, Slack delivery, case update triggers.",
          "Set agent guardrails: approval flow for talking points, escalation rules for high-value accounts, rep override capability.",
          "Run Einstein Trust Layer validation — confirm PII handling and data residency compliance for retail partner data.",
        ],
      },
      {
        phase: "Phase 3",
        title: "Launch",
        weeks: "Weeks 9–12",
        steps: [
          "Go live with 400 Southeast KAMs — briefing agent active for all calendar-detected retail visits.",
          "Measure weekly: brief delivery rate, rep review time, post-visit CRM logging accuracy, self-reported prep time.",
          "Week 10 review with Marcus Webb and Jennifer Park — adoption curve, qualitative rep feedback, expansion go/no-go.",
          "Document outcomes, build expansion business case, present full USRB rollout (1,200 reps) plan to Sarah Chen.",
        ],
      },
    ],
  },

  // ── Specialized Agents (filterable avatar gallery) ────────────────────────
  agents: {
    meta: { title: "Specialized Agents · Executive Briefing" },
    headline: "The agents built for Apex Foods.",
    opening: "These aren't generic AI tools. They're purpose-built for the specific workflows Apex Foods field reps, service teams, and commercial leaders run every day.",
    categories: [
      { id: "sales",        label: "Field Sales",  count: 2 },
      { id: "service",      label: "Service",      count: 1 },
      { id: "operations",   label: "Operations",   count: 1 },
    ] as { id: AgentCategory; label: string; count: number }[],
    roster: [
      {
        id: "field-briefing",
        name: "Field Briefing Agent",
        category: "sales" as AgentCategory,
        tagline: "I make sure every KAM walks into every Walmart and Target meeting with everything they need — automatically.",
        description: "Detects calendar-based retail visits, pulls account health, visit history, open cases, promo compliance, and planogram scores from four systems, drafts talking points, and delivers the complete brief to Slack 2 hours before the visit. Zero prep time required.",
      },
      {
        id: "pipeline-intelligence",
        name: "Pipeline Intelligence Agent",
        category: "sales" as AgentCategory,
        tagline: "I surface every deal at risk before the forecast is already wrong — and hand the KAM the talking points before they even ask.",
        description: "Monitors engagement signals across Sales Cloud, email activity, and stakeholder touchpoints. Flags deals showing risk patterns 3–4 weeks before they slip, surfaces root cause, and delivers talking points to the rep in Slack with a recommended next action.",
      },
      {
        id: "order-exception",
        name: "Order Exception Agent",
        category: "service" as AgentCategory,
        tagline: "I catch short ships, late deliveries, and substitutions the day they happen — before the retailer notices.",
        description: "Monitors the OMS and ERP in real time for order exceptions. When one is detected, it identifies the affected KAM and buyer, notifies both automatically via Slack, initiates the replacement order, and opens a Service Cloud case — all before the next scheduled visit.",
      },
      {
        id: "territory-planning",
        name: "Territory Planning Agent",
        category: "operations" as AgentCategory,
        tagline: "I optimize every KAM's coverage — making sure the highest-value accounts get the right visit frequency without anyone having to build a spreadsheet.",
        description: "Analyzes account revenue, visit cadence, and rep capacity across the USRB territory. Recommends visit frequency adjustments, flags coverage gaps, and surfaces accounts that are being under-served relative to their revenue potential.",
      },
    ] as SpecializedAgent[],
  },

  // ── Architecture (layered stack diagram) ──────────────────────────────────
  architecture: {
    meta: { title: "Architecture · Executive Briefing" },
    headline: "One platform. Five layers. Every Apex Foods workflow covered.",
    opening: "This isn't a technology diagram — it's the operating model that connects Apex Foods' existing investments to autonomous field execution.",
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
    note: "Zero copy, zero rip-and-replace. Every layer builds on Salesforce investments Apex Foods has already made — nothing here requires a new system.",
  },

  // ── Strategy matrix (transformation framework) ────────────────────────────
  strategy: {
    meta: { title: "Strategy · Executive Briefing" },
    headline: "From fragmented to agentic. The Apex Foods transformation framework.",
    opening: "Four capabilities. Each with a clear before and after. Each powered by the Salesforce platform Apex Foods already owns.",
    matrixLabel: "The Agentic Enterprise Framework",
    rows: [
      {
        dimension: "Know Every Account",
        from: "Account data lives in four systems — Sales Cloud, trade spend, retail execution, and service. No rep has a complete picture going into a meeting.",
        to: "Data Cloud unifies all four sources into one continuously-updated account record. Every agent — and every rep — works from the same truth.",
        poweredBy: ["Data Cloud", "Sales Cloud", "Einstein AI"],
      },
      {
        dimension: "Prepare Without Effort",
        from: "KAMs spend 90+ minutes before every retail visit manually pulling data, building briefs, and writing talking points. The prep is incomplete and always out of date.",
        to: "Field Briefing Agent assembles the complete brief automatically and delivers it to Slack 2 hours before the visit. Prep time: 5 minutes to review and approve.",
        poweredBy: ["Agentforce", "Data Cloud", "Slack"],
      },
      {
        dimension: "Act Before Asked",
        from: "Order exceptions, compliance gaps, and at-risk deals are discovered by humans — too late, too manually, too often after the damage is done.",
        to: "Agents detect exceptions and risks in real time, notify the right people, initiate resolution, and close the loop — without waiting for anyone to notice.",
        poweredBy: ["Agentforce", "Sales Cloud", "Data Cloud"],
      },
      {
        dimension: "Sell More, Log Less",
        from: "Reps spend 14 hours a week on CRM hygiene, post-visit logging, and administrative tasks that could be automated — time directly stolen from selling.",
        to: "Agents log visit summaries, update opportunity stages, and manage follow-up automatically. Reps spend their time on the 20% of their job that actually requires a human.",
        poweredBy: ["Agentforce", "Sales Cloud", "Slack"],
      },
    ] as StrategyRow[],
    closing: "This framework doesn't require a new platform — it requires activating the one Apex Foods already has.",
  },

  // ── Proof (results by function) ────────────────────────────────────────────
  proof: {
    meta: { title: "Results · Executive Briefing" },
    headline: "Salesforce is already delivering results at Apex Foods.",
    opening: "Three functions. Measurable outcomes. All from the platform already deployed.",
    functions: [
      {
        id: "sales",
        name: "Field Sales",
        stats: [
          { value: "640", label: "KAMs using the Field Briefing Agent daily" },
          { value: "94%", label: "rep adoption rate in the first 30 days" },
        ],
        agentCapabilities: [
          "Field Briefing Agent delivers complete pre-visit brief to Slack 2 hours before every retail meeting",
          "Pipeline Intelligence Agent flags at-risk deals 3–4 weeks before they slip, with root cause and talking points",
          "Post-visit logging automated — reps confirm in 2 minutes instead of spending 45 logging manually",
        ],
        results: [
          { metric: "10 hrs", label: "per rep per week returned to selling" },
          { metric: "+18%",   label: "forecast accuracy improvement" },
          { metric: "5 min",  label: "pre-visit prep time (was 90 minutes)" },
        ],
        quote: {
          text: "The reps who adopted first are already asking when the next agent launches. That's the adoption signal we've been waiting for.",
          attribution: "Marcus Webb, VP Field Sales, Apex Foods",
        },
      },
      {
        id: "service",
        name: "Customer Service",
        stats: [
          { value: "47%",  label: "of order exception cases resolved autonomously" },
          { value: "3.1 min", label: "average resolution time (was 18 minutes)" },
        ],
        agentCapabilities: [
          "Order Exception Agent detects short ships and substitutions the day they occur — not on the next visit",
          "Service Cloud cases opened automatically with full context — no manual triage required",
          "Retailer and rep notified simultaneously, replacement initiated before buyer awareness",
        ],
        results: [
          { metric: "47%",  label: "cases resolved without human escalation" },
          { metric: "83%",  label: "increase in first-contact resolution rate" },
          { metric: "+21%", label: "retailer CSAT improvement in pilot accounts" },
        ],
      },
      {
        id: "enterprise",
        name: "Commercial Operations",
        stats: [
          { value: "1,200",  label: "KAMs on the Agentforce roadmap by Q4 2026" },
          { value: "3",      label: "agents in production or active POC" },
        ],
        agentCapabilities: [
          "Data Cloud unifies trade spend, retail execution, CRM, and service data into one account record",
          "Agent actions write back to Sales Cloud automatically — CRM hygiene without manual effort",
          "Slack Enterprise+ becomes the delivery layer for every agent output across the field org",
        ],
        results: [
          { metric: "$18M",  label: "recoverable productivity across 1,200 KAMs" },
          { metric: "3.2x",  label: "ROI on the $28M Salesforce contract in year one" },
          { metric: "Q4 '26", label: "target date for full USRB Agentforce deployment" },
        ],
      },
    ] as ProofFunction[],
  },

  // ── Demo library ──────────────────────────────────────────────────────────
  demos: [
    {
      id: "field-briefing-agent-demo",
      title: "Field Briefing Agent — Live Demo",
      description: "Watch the Field Briefing Agent prepare a KAM for a Walmart JBP review — from calendar detection to Slack delivery, in under 2 minutes.",
      category: "agentforce" as DemoCategory,
      embedUrl: "https://play.vidyard.com/PLACEHOLDER",
      featured: true,
    },
    {
      id: "data-cloud-apex-overview",
      title: "Data Cloud — Apex Foods Account View",
      description: "See what a unified retail account record looks like in Data Cloud — trade spend, CRM, service, and retail execution data resolved into a single view.",
      category: "data" as DemoCategory,
      embedUrl: "https://play.vidyard.com/PLACEHOLDER",
    },
    {
      id: "pipeline-intelligence-demo",
      title: "Pipeline Intelligence Agent — Risk Detection",
      description: "A walkthrough of how the Pipeline Intelligence Agent surfaces at-risk deals 3–4 weeks early, with root cause and recommended rep actions.",
      category: "sales" as DemoCategory,
      embedUrl: "https://play.vidyard.com/PLACEHOLDER",
    },
  ] as DemoVideo[],

  // ── Account team ──────────────────────────────────────────────────────────
  team: [
    {
      name:        "Jennifer Park",
      role:        "Account Executive",
      group:       "sales" as TeamGroup,
      description: "Jennifer owns the Apex Foods commercial relationship and has been managing the account since the $28M contract close in January 2024.",
      email:       "jennifer.park@salesforce.com",
      image:       "/images/agent-avatar-4.png",
    },
    {
      name:        "Michael Reyes",
      role:        "Principal Account SE",
      group:       "engineering" as TeamGroup,
      description: "Michael leads the Agentforce technical strategy for Apex Foods — field briefing agent architecture, Data Cloud data model, and Slack integration.",
      email:       "michael.reyes@salesforce.com",
      image:       "/images/agent-avatar-5.png",
    },
    {
      name:        "Amanda Walsh",
      role:        "Customer Success Manager",
      group:       "success" as TeamGroup,
      description: "Amanda manages the Apex Foods platform health, adoption metrics, and the Accenture SI relationship day to day.",
      email:       "amanda.walsh@salesforce.com",
      image:       "/images/agent-avatar-6.png",
    },
  ] as TeamMember[],

  // ── Agent Tracker ─────────────────────────────────────────────────────────
  // Live deployment dashboard — what's running, piloting, and planned.
  // status: "live" | "pilot" | "planned"
  // metrics: shown as "Outcomes" for live/pilot, "Target Metrics" for planned
  //
  // Included agent avatars (use as avatar: "/images/agent-avatar-N.png"):
  //   agent-avatar-1.png through agent-avatar-10.png — AI-generated agent personas
  //
  // Included Astro assets (use in page heroes or as avatars):
  //   /images/ASTRO_NoOutfit_WalkRight_SFS20_sRGB.png — Astro walking right
  //   /images/astro-laptop.png     — Astro with laptop
  //   /images/astro-pointing.png   — Astro pointing
  //   /images/astro-celebrating.png — Astro celebrating
  //   /images/astro-thinking.png   — Astro thinking
  //   /images/astro-data.png       — Astro with data visualization
  //   /images/astro-agent.png      — Astro as agent
  //   /images/astro-mobile.png     — Astro on mobile
  //   /images/astro-field.png      — Astro in field setting
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
      headline: "9 agents.\n3 live.\n6 in motion.",
      subheadline: "A live view of every Agentforce agent — what's running, what's in pilot, and what's coming next.",
    },
    successMetrics: [
      { value: "3",       label: "agents in production",    sublabel: "Fully autonomous, monitored daily" },
      { value: "6",       label: "pilots + planned",        sublabel: "Active POCs and scoped roadmap items" },
      { value: "4,200+",  label: "employees on Agentforce", sublabel: "Across sales, service, and ops" },
      { value: "Jan 2026", label: "first agent go-live",    sublabel: "Case Resolution Agent, North America" },
    ],
    agents: [
      {
        id: "case-resolution",
        status: "live" as const,
        avatar: "/images/agent-avatar-1.png",
        name: "Case Resolution Agent",
        tagline: "I resolve Tier 1 and Tier 2 cases in minutes — and know exactly when to escalate to a human.",
        entity: "Customer Service",
        function: "Consumer Service Triage & Case Management",
        description: "Handles inbound service cases across chat, email, and web. Reads case history, product data, and entitlements from Data Cloud to draft resolutions autonomously. Escalates to a human when sentiment signals or complexity thresholds are crossed.",
        goLive: "January 2026",
        metrics: [
          { value: "47%", label: "of cases resolved autonomously" },
          { value: "3.1 min", label: "avg. resolution time (was 18 min)" },
        ],
        highlights: [
          "Live across North America and Europe service teams",
          "Integrated with Service Cloud, Data Cloud, and the knowledge base",
          "Handles 8,000+ interactions per month without human intervention",
        ],
      },
      {
        id: "pipeline-intelligence",
        status: "live" as const,
        avatar: "/images/agent-avatar-2.png",
        name: "Pipeline Intelligence Agent",
        tagline: "I surface every deal at risk before your forecast is already wrong.",
        entity: "Enterprise Sales",
        function: "Pipeline Risk Detection & Deal Coaching",
        description: "Monitors pipeline signals across Sales Cloud, email activity, and stakeholder engagement scores. Flags at-risk deals 3–4 weeks before they slip, surfaces reasons, and prepares talking points for the rep's next call.",
        goLive: "March 2026",
        metrics: [
          { value: "+18%", label: "forecast accuracy improvement" },
          { value: "380", label: "deals actioned in first 90 days" },
        ],
        highlights: [
          "Active across 120 enterprise AEs in North America",
          "Connects Sales Cloud activity data with Data Cloud engagement signals",
          "Weekly digest delivered to sales leadership every Monday at 7am",
        ],
      },
      {
        id: "field-briefing",
        status: "live" as const,
        avatar: "/images/agent-avatar-3.png",
        name: "Field Briefing Agent",
        tagline: "I make sure every rep walks into every meeting with everything they need — automatically.",
        entity: "Commercial Field Sales",
        function: "Pre-Visit Preparation & Account Briefing",
        description: "Generates a pre-visit brief 2 hours before each field meeting: account health, last 3 interactions, open issues, product recommendations, and talking points. Delivered via Slack. Zero manual prep required.",
        goLive: "April 2026",
        metrics: [
          { value: "2.4 hrs", label: "prep time eliminated per rep/week" },
          { value: "94%", label: "rep adoption rate in first 30 days" },
        ],
        highlights: [
          "Used by 640 field reps across 4 regions",
          "Integrates with calendar, CRM, and Data Cloud account history",
          "Expanded from pilot to full deployment in 6 weeks",
        ],
      },
      {
        id: "order-triage",
        status: "pilot" as const,
        avatar: "/images/agent-avatar-4.png",
        name: "Order Exception Agent",
        tagline: "I catch order issues before they become customer complaints.",
        entity: "Supply Chain Operations",
        function: "Order Exception Detection & Routing",
        description: "Monitors the order management system for exceptions — short ships, late deliveries, substitutions — and autonomously notifies the right field rep and customer before the issue surfaces as a complaint. Currently in active POC with the North America operations team.",
        goLive: "Active POC · Q2 2026",
        metrics: [
          { value: "68%", label: "target: exceptions caught before escalation" },
          { value: "1,200", label: "orders monitored per day in POC" },
        ],
        highlights: [
          "POC running with North America supply chain and 3 key accounts",
          "Integrates with ERP, OMS, and Service Cloud",
        ],
      },
      {
        id: "loyalty-personalization",
        status: "pilot" as const,
        avatar: "/images/agent-avatar-5.png",
        name: "Loyalty Personalization Agent",
        tagline: "I turn every loyalty interaction into a retention moment.",
        entity: "Consumer Marketing",
        function: "Loyalty Member Engagement & Churn Prevention",
        description: "Identifies loyalty members showing churn signals — declining engagement, unused points, missed redemption windows — and triggers personalized outreach via the preferred channel. Uses Data Cloud behavioral profiles to tailor message, timing, and offer.",
        goLive: "Active POC · Q3 2026",
        metrics: [
          { value: "+12%", label: "target: redemption rate lift" },
          { value: "250K", label: "members in POC cohort" },
        ],
        highlights: [
          "Running with Marketing Cloud and Data Cloud in a controlled cohort",
          "A/B tested against current batch campaign approach",
        ],
      },
      {
        id: "partner-onboarding",
        status: "pilot" as const,
        avatar: "/images/agent-avatar-6.png",
        name: "Partner Onboarding Agent",
        tagline: "I get new partners productive in days, not weeks.",
        entity: "Channel & Partner Sales",
        function: "Partner Activation & Onboarding Acceleration",
        description: "Guides newly signed partners through onboarding steps autonomously: sends welcome materials, tracks completion, answers common setup questions via Slack, and escalates to the partner success manager only when a human decision is needed.",
        goLive: "POC Scoped · Q3 2026",
        metrics: [
          { value: "60%", label: "target: reduction in time-to-first-sale" },
          { value: "14 days", label: "target: onboarding completion (was 45)" },
        ],
        highlights: [
          "Scoped with Partner Success and Channel Sales leadership",
          "Will integrate with Experience Cloud partner portal and Slack",
        ],
      },
      {
        id: "contract-renewal",
        status: "planned" as const,
        avatar: "/images/agent-avatar-7.png",
        name: "Contract Renewal Agent",
        tagline: "I make sure no renewal ever catches us off guard.",
        entity: "Enterprise Sales",
        function: "Renewal Risk Detection & Stakeholder Preparation",
        description: "Monitors upcoming contract renewals 90 days out. Surfaces health signals, flags risk, prepares renewal briefings, and coordinates internal stakeholders — legal, finance, success — without manual project management.",
        goLive: "90-day POC Scoped · Q4 2026",
        metrics: [
          { value: "90 days", label: "renewal visibility window" },
          { value: "$0", label: "target: surprise churn from renewals" },
        ],
        highlights: [
          "Approved for Q4 2026 POC by VP of Enterprise Sales",
          "Will connect contract data, health scores, and stakeholder engagement",
        ],
      },
      {
        id: "invoice-exception",
        status: "planned" as const,
        avatar: "/images/agent-avatar-8.png",
        name: "Invoice Resolution Agent",
        tagline: "I clear invoice disputes before they become relationship issues.",
        entity: "Finance Operations",
        function: "Invoice Dispute Detection & Autonomous Resolution",
        description: "Identifies disputed invoices, cross-references purchase orders and delivery confirmations, and resolves straightforward discrepancies autonomously. Escalates complex cases with full context already assembled.",
        goLive: "Roadmap · Q1 2027",
        metrics: [
          { value: "55%", label: "target: disputes resolved without human" },
          { value: "4 days", label: "target: resolution time (was 18 days)" },
        ],
        highlights: [
          "Approved for roadmap planning by CFO and Finance Ops lead",
          "Will integrate with ERP, billing system, and Service Cloud",
        ],
      },
      {
        id: "workforce-scheduling",
        status: "planned" as const,
        avatar: "/images/agent-avatar-9.png",
        name: "Field Scheduling Agent",
        tagline: "I put the right person at the right place at the right time — before anyone has to ask.",
        entity: "Field Operations",
        function: "Field Rep Scheduling & Territory Optimization",
        description: "Optimizes field rep schedules in real time based on account priority, travel time, open issues, and rep capacity. Proactively surfaces scheduling conflicts and recommendations before the weekly planning session.",
        goLive: "Roadmap · Q2 2027",
        metrics: [
          { value: "+22%", label: "target: account coverage per rep" },
          { value: "3 hrs", label: "target: weekly planning time saved" },
        ],
        highlights: [
          "Scoped with Field Operations and Sales Ops leadership",
          "Depends on Data Cloud territory and account data — in progress",
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
    intro: "Apex Foods can't force field reps, retailers, or buyers to come to Salesforce. With Headless 360, Salesforce goes to them — in Slack, on mobile, via voice, wherever the work actually happens.",
    heroImage: undefined as string | undefined,

    problemHeadline: "1,200 reps. 80,000 retail locations. One question: where does the agent show up?",
    problemBody: "The Field Briefing Agent is live in Slack. The Order Exception Agent fires to mobile. The next generation of Apex Foods agents will need to surface in drive-through voice assistants, retailer portals, and field service apps. Headless 360 makes that possible without rebuilding the agent for every surface.",
    stats: [
      { stat: "1,200",  label: "field reps who need agents wherever they work" },
      { stat: "4",      label: "surfaces already in scope — Slack, mobile, voice, portal" },
      { stat: "60+",    label: "MCP tools available to Apex Foods engineering teams today" },
    ],

    pillars: [
      {
        number: "01",
        eyebrow: "Build with any coding agent or IDE",
        headline: "Move fast without rebuilding.",
        body: "Apex Foods has a commercial technology team that builds internal tools. They shouldn't need to learn Salesforce's proprietary tooling to build agents on top of the platform. With 60+ MCP tools available now, they can work in Cursor, Claude Code, or VS Code and still get first-class access to Salesforce metadata and agent capabilities.",
        detail: "The Territory Planning Agent — currently on the roadmap for Q2 2027 — could be scoped and built in weeks by Apex Foods' internal team using the existing Data Cloud territory data and Sales Cloud account records.",
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
        headline: "Native experiences on Apex Foods surfaces.",
        body: "Apex Foods' internal field tools are built in React. Their retailer portal runs Angular. With Multi-Framework support, the commercial technology team can embed Salesforce-powered agent experiences — real CRM data, governed by real sharing rules — directly into existing surfaces without brittle API bridges.",
        detail: "A field manager dashboard built in React, hosted on Apex Foods infrastructure, surfacing real-time territory coverage, agent activity, and account health from Data Cloud. Governance travels with the data.",
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
        headline: "Meet Apex Foods reps and buyers where they work.",
        body: "KAMs use Slack. Buyers respond to email and voice. Field supervisors monitor on mobile. The Field Briefing Agent runs in Slack today. With Agent Script for Voice, Agentforce Mobile SDK, and 1-click Slack deploy all GA now, the same agent logic deploys to every surface without rebuilding.",
        detail: "A drive-through buyer at Kroger receives an exception notification via voice assistant. A field supervisor gets a territory coverage alert on mobile. The same Field Briefing Agent, the same Data Cloud record, the same governance — different surface, zero rebuild.",
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

    playsEyebrow: "The Apex Foods Plays",
    playsHeadline: "Three agents. Three surfaces. One platform.",
    playsSubhead: "These aren't future-state demos — they map directly to Apex Foods' current agent deployment and the surfaces where field execution actually happens.",
    plays: [
      {
        category: "Field Productivity",
        label: "Field Briefing Agent",
        description: "Delivers a complete pre-visit brief to the KAM's Slack channel 2 hours before every retail meeting. The same agent logic will deploy to mobile for reps in the field without Wi-Fi.",
        surface: "Slack · Mobile · Agent SDK",
      },
      {
        category: "Supply Chain",
        label: "Order Exception Agent",
        description: "Detects short ships and substitutions in real time, notifies rep and buyer simultaneously, initiates replacement — all before the next scheduled visit.",
        surface: "Slack · Mobile · Service Cloud",
      },
      {
        category: "Commercial Operations",
        label: "Territory Coverage Agent",
        description: "Monitors KAM visit cadence against account revenue potential and flags coverage gaps to the field supervisor — surfaced in a React dashboard built on Salesforce data.",
        surface: "React Dashboard · Mobile · Slack",
      },
    ] as Headless360Play[],

    trustHeadline: "Retail partner data requires non-negotiable governance.",
    trustBody: "Apex Foods handles trade spend commitments, planogram compliance data, and retailer contact information for Walmart, Target, Kroger, and Costco. Every Headless 360 interaction routes through the Einstein Trust Layer — zero data retention in the LLM layer, PII masking before any AI call, and a full audit trail for every agent action, regardless of which surface it fires on.",
    trustClosing: "Whether the agent fires in Slack, on mobile, or through a voice assistant, the compliance posture doesn't change — the surface is irrelevant.",

    closingQuote: "The five years of Salesforce data Apex Foods has built is now a first-class input for every agent they'll ever build. That's not a feature. That's a durable competitive advantage.",
    closingBody: [
      "The question for Apex Foods isn't 'should we explore headless AI?' — the Field Briefing Agent is already live in Slack. The question is: who controls the governance plane as the agent footprint expands, and how fast can the commercial technology team ship new agents on top of the existing data foundation?",
      "Headless 360 gives Apex Foods a single platform — their existing CRM data, trade spend history, and retail execution signals — that now powers any agent, on any surface, built by any team using any tool.",
    ],
  },

  // ── ROI Calculator (optional) ─────────────────────────────────────────────
  // Add "roi-calculator" to pages[] above to enable the page.
  // Define up to 4 scenarios — each has its own sliders, formula, and assumptions.
  // The calculator shows a scenario picker at the top and switches the whole model.
  roi: {
    pageHeadline: "What does Agentforce\nactually unlock?",
    pageSubhead: "Choose a scenario, adjust the inputs, and see the estimated annual value.",
    disclaimer: "Estimates based on Agentforce benchmarks and industry data. For illustrative purposes only. Actual results vary by deployment scope, adoption, and organizational complexity.",
    scenarios: [
      {
        id: "cost-savings",
        label: "Cost Savings",
        description: "Reduce manual overhead and operational costs",
        totalLabel: "Estimated Annual Savings",
        totalSublabel: "Labor and operational cost reduction — based on your inputs.",
        primarySlider: {
          label: "Field Reps or KAMs",
          sublabel: "Active reps across all territories",
          min: 10, max: 1000, step: 10, default: 150,
          format: (v: number) => v.toLocaleString(),
        } as ROISlider,
        secondarySlider: {
          label: "Manual Hours per Rep per Month",
          sublabel: "Admin, reporting, and prep time that could be automated",
          min: 2, max: 40, step: 1, default: 12,
          format: (v: number) => `${v} hrs`,
        } as ROISlider,
        tertiarySlider: {
          label: "Fully-Loaded Hourly Cost",
          sublabel: "Burdened cost per rep including benefits and overhead",
          min: 40, max: 200, step: 5, default: 85,
          format: (v: number) => `$${v}`,
        } as ROISlider,
        calculate: (reps: number, hrs: number, rate: number) => {
          const hoursRecovered = reps * hrs * 12 * 0.65;
          const laborSavings   = hoursRecovered * rate;
          const overhead       = reps * 800;
          const total          = laborSavings + overhead;
          const fmt = (n: number) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1_000)}K`;
          return {
            total,
            breakdown: [
              { label: "Labor Recovered",   value: fmt(laborSavings), sub: `${Math.round(hoursRecovered).toLocaleString()} hours/yr freed` },
              { label: "Overhead Reduction", value: fmt(overhead),     sub: "Reporting, coordination, admin" },
              { label: "Time Saved / Rep",   value: `${Math.round(hrs * 0.65)} hrs/mo`, sub: "Per rep, per month" },
              { label: "Automation Rate",    value: "65%",              sub: "Of manual tasks automated" },
            ],
          };
        },
        assumptions: [
          {
            title: "Labor Recovery",
            items: [
              "Agentforce automates ~65% of manual admin, prep, and reporting tasks",
              "Fully-burdened rate includes salary, benefits, and overhead",
              "12 working months per year",
            ],
          },
          {
            title: "Overhead",
            items: [
              "$800/rep/yr in coordination and tooling overhead reduced",
              "Does not include one-time implementation savings",
            ],
          },
        ],
      },
      {
        id: "revenue-growth",
        label: "Revenue Growth",
        description: "Expand capacity and improve close rates with AI",
        totalLabel: "Estimated Annual Revenue Uplift",
        totalSublabel: "Based on capacity expansion and improved conversion — illustrative.",
        primarySlider: {
          label: "Sales Reps",
          sublabel: "Quota-carrying reps on the platform",
          min: 10, max: 500, step: 5, default: 80,
          format: (v: number) => v.toLocaleString(),
        } as ROISlider,
        secondarySlider: {
          label: "Average Deal Size",
          sublabel: "Average contract value across your book",
          min: 10000, max: 500000, step: 5000, default: 75000,
          format: (v: number) => v >= 1000 ? `$${Math.round(v / 1000)}K` : `$${v}`,
        } as ROISlider,
        tertiarySlider: {
          label: "Current Win Rate",
          sublabel: "Percentage of qualified opportunities closed",
          min: 5, max: 60, step: 1, default: 22,
          format: (v: number) => `${v}%`,
        } as ROISlider,
        calculate: (reps: number, dealSize: number, winRate: number) => {
          const dealsPerRepPerYear    = 18;
          const capacityLift          = 0.22;   // 22% more accounts per rep
          const winRateLift           = 0.04;   // +4pp win rate
          const additionalDeals       = Math.round(reps * dealsPerRepPerYear * capacityLift);
          const improvedDeals         = Math.round(reps * dealsPerRepPerYear * (winRateLift / (winRate / 100)));
          const revenueFromCapacity   = additionalDeals  * dealSize;
          const revenueFromConversion = improvedDeals    * dealSize;
          const total = revenueFromCapacity + revenueFromConversion;
          const fmt = (n: number) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1_000)}K`;
          return {
            total,
            breakdown: [
              { label: "Capacity Expansion",    value: fmt(revenueFromCapacity),   sub: `+${additionalDeals} additional deals/yr` },
              { label: "Conversion Improvement", value: fmt(revenueFromConversion), sub: `+4pp win rate with AI-assisted selling` },
              { label: "More Accounts / Rep",    value: "+22%",                     sub: "With time freed from admin work" },
              { label: "New Win Rate",           value: `${Math.min(winRate + 4, 95)}%`, sub: `Up from ${winRate}%` },
            ],
          };
        },
        assumptions: [
          {
            title: "Capacity",
            items: [
              "18 deals per rep per year (baseline)",
              "Agentforce frees ~22% more capacity per rep via automated prep, follow-up, and CRM hygiene",
            ],
          },
          {
            title: "Conversion",
            items: [
              "+4 percentage point win rate improvement from AI-assisted deal coaching and signal detection",
              "Based on Agentforce Sales Agent benchmarks — actual results vary",
            ],
          },
        ],
      },
      {
        id: "service-efficiency",
        label: "Service Efficiency",
        description: "Deflect cases and reduce cost-to-serve",
        totalLabel: "Estimated Annual Service Savings",
        totalSublabel: "Case deflection and handle time reduction — based on your inputs.",
        primarySlider: {
          label: "Monthly Service Interactions",
          sublabel: "Cases, inquiries, and support contacts per month",
          min: 500, max: 50000, step: 500, default: 8000,
          format: (v: number) => v.toLocaleString(),
        } as ROISlider,
        secondarySlider: {
          label: "Fully-Loaded Cost per Interaction",
          sublabel: "Agent time, tooling, and overhead per case",
          min: 5, max: 60, step: 1, default: 18,
          format: (v: number) => `$${v}`,
        } as ROISlider,
        tertiarySlider: {
          label: "Average Handle Time (minutes)",
          sublabel: "Current average per case end-to-end",
          min: 3, max: 45, step: 1, default: 12,
          format: (v: number) => `${v} min`,
        } as ROISlider,
        calculate: (monthly: number, costPerCase: number, handleTime: number) => {
          const deflectionRate   = 0.42;
          const handleReduction  = 0.30;
          const annualVolume     = monthly * 12;
          const deflectedCases   = Math.round(annualVolume * deflectionRate);
          const deflectionSaving = deflectedCases * costPerCase;
          const remainingCases   = annualVolume - deflectedCases;
          const handleSaving     = remainingCases * (handleTime * handleReduction / 60) * (costPerCase / (handleTime / 60));
          const total = deflectionSaving + handleSaving;
          const fmt = (n: number) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1_000)}K`;
          return {
            total,
            breakdown: [
              { label: "Cases Deflected",      value: fmt(deflectionSaving),  sub: `${deflectedCases.toLocaleString()} cases resolved autonomously/yr` },
              { label: "Handle Time Savings",  value: fmt(handleSaving),      sub: `30% faster on remaining ${remainingCases.toLocaleString()} cases` },
              { label: "Deflection Rate",      value: "42%",                  sub: "Tier 1 & 2 resolved without agent" },
              { label: "CSAT Impact",          value: "+18%",                 sub: "Faster resolution, 24/7 availability" },
            ],
          };
        },
        assumptions: [
          {
            title: "Deflection",
            items: [
              "42% of Tier 1 and Tier 2 interactions resolved autonomously by Agentforce",
              "Based on service agent benchmarks — rate varies by case complexity and channel",
            ],
          },
          {
            title: "Handle Time",
            items: [
              "30% reduction in average handle time for agent-assisted cases",
              "Driven by real-time case summaries, suggested responses, and auto-logging",
            ],
          },
        ],
      },
    ],
  },

  // ── Innovation / Experiments (optional) ──────────────────────────────────
  // Add "innovation" to pages[] above to enable the page.
  // Showcase internal innovation built on the Salesforce platform.
  innovation: {
    headline: "What&rsquo;s Being Built",
    subhead: "Apex Foods isn't just adopting the Salesforce platform — its commercial technology team is already building on top of it.",
    closing: "When Apex Foods' internal teams build tools on the Data Cloud foundation, it confirms the central argument: the investment is already made. What remains is activation. These experiments show what happens when teams with direct access to the data and the business start building.",
    stats: [
      { value: "2",      label: "active internal experiments" },
      { value: "Data Cloud", label: "foundation platform" },
    ],
    experiments: [
      {
        id: "account-profitability-calculator",
        status: "active" as const,
        title: "Account Profitability Calculator",
        function: "Commercial Intelligence · Data Cloud",
        tagline: "What does this Walmart account actually make us?",
        description: "A profitability calculator being built directly into the Sales Cloud account view. KAMs can surface margin signals for any retail account — without leaving Salesforce. Turns a question that used to require a finance team call into something a rep can answer in the parking lot before a buyer meeting.",
        why: "KAMs walk into pricing and trade promotion conversations knowing revenue but not margin. They give away trade spend they don't need to. This calculator closes that gap — putting the right number in the room at the right time.",
        signals: [
          "Account-level revenue vs. gross margin visibility in a single Sales Cloud view",
          "Surfaces profitability context before pricing and trade promotion conversations",
          "Built on Data Cloud — no separate login, no finance team dependency",
          "Designed for mobile-first field rep workflows",
        ],
        stage: "Internal experiment — active development by commercial technology team",
        origin: "Built by the Apex Foods Commercial Technology & Digital team",
      },
      {
        id: "trade-promo-optimizer",
        status: "scoping" as const,
        title: "Trade Promotion ROI Optimizer",
        function: "Trade Strategy · Data Cloud + Agentforce",
        tagline: "Which promotions are actually working — and which are just expensive?",
        description: "A Data Cloud-powered analysis tool that evaluates trade promotion performance across all retail accounts in real time. Shows compliance rate, incremental lift, and ROI per promotion — enabling the trade strategy team to optimize spend before the next planning cycle.",
        why: "Apex Foods spends ~15% of revenue on trade promotions with inconsistent visibility into which ones drive incremental volume versus which ones are simply discounting base business. This tool makes that distinction automatic.",
        signals: [
          "Real-time promo compliance tracking from retail execution platform",
          "Incremental lift calculation vs. baseline velocity",
          "ROI ranking across all active promotions by account and brand",
          "Feeds recommendations into next-cycle planning within Data Cloud",
        ],
        stage: "Scoping — design phase with Trade Strategy and Finance",
        origin: "Initiated by Sarah Chen's office in partnership with the commercial technology team",
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
  // Each OU maps country ISO alpha-3 codes to a region. The timeline
  // animates through deployment stages. Set to null to disable.
  globalMap: {
    defaultZoom: { coordinates: [15, 20] as [number, number], zoom: 1 },

    // Operating Units — define your regions, countries, and state narrative
    ous: [
      {
        id: "north-america",
        label: "North America",
        status: "live" as const,
        agentforce: true,
        countries: ["USA", "CAN", "MEX"],
        before: "1,200 KAMs running on MYDay with no CRM integration. Trade spend in a separate tool. Retail execution data siloed by region.",
        current: "Sales Cloud, Data Cloud, and Slack Enterprise+ live. Field Briefing Agent deployed to 640 reps. Accenture SI engagement active.",
        future: "Full USRB field deployment — 1,200 KAMs on Agentforce. Every agent interaction feeding the unified Data Cloud record.",
        futureHighlights: [
          "1,200 KAMs with pre-visit briefing automated",
          "Order Exception Agent covering all North American retail accounts",
        ],
        zoom: { coordinates: [-95, 42] as [number, number], zoom: 3.5 },
      },
      {
        id: "europe",
        label: "Europe",
        status: "live" as const,
        agentforce: false,
        countries: ["GBR", "DEU", "FRA", "ESP", "ITA", "NLD", "BEL", "SWE", "NOR", "DNK", "FIN", "AUT", "CHE", "PRT", "GRC", "POL", "ROU", "HUN", "CZE", "SVK", "BGR", "HRV", "SVN", "EST", "LVA", "LTU"],
        before: "Market-by-market field tools with no CRM integration. UK, Germany, and France operating independently.",
        current: "European platform deployment in progress. UK live on Sales Cloud. GDPR-compliant Data Cloud architecture validated.",
        future: "Pan-European Field Briefing Agent deployment, leveraging the North America blueprint.",
        futureHighlights: [
          "GDPR-compliant Data Cloud with zero-copy architecture",
          "North America agent blueprint replicated to EU markets",
        ],
        zoom: { coordinates: [15, 52] as [number, number], zoom: 4.5 },
      },
      {
        id: "apac",
        label: "Asia Pacific",
        status: "in-progress" as const,
        agentforce: false,
        countries: ["JPN", "AUS", "KOR", "SGP", "MYS", "THA", "IDN", "VNM", "PHL", "NZL", "IND"],
        before: "Each APAC market running independent field tools. No unified account view across the region.",
        current: "Australia platform deployment underway. Japan scoped for H2 2026.",
        future: "APAC Field Briefing Agent using the North America blueprint, adapted for local retail execution platforms.",
        futureHighlights: [
          "Australia as the APAC anchor market and blueprint proof point",
          "Japan retail execution data integration scoped with local SI",
        ],
        zoom: { coordinates: [120, 20] as [number, number], zoom: 3 },
      },
      {
        id: "latam",
        label: "Latin America",
        status: "in-progress" as const,
        agentforce: false,
        countries: ["BRA", "ARG", "COL", "CHL", "PER", "VEN", "ECU", "BOL", "PRY", "URY", "GTM", "HND", "SLV", "NIC", "CRI", "PAN", "DOM", "CUB", "JAM"],
        before: "Disconnected regional teams. Brazil and Mexico field ops running entirely on manual processes.",
        current: "Brazil platform scoping underway. Mexico identified as second anchor market.",
        future: "LATAM Field Briefing Agent with Portuguese and Spanish language support.",
        futureHighlights: [
          "Portuguese-language agent for Brazil field team",
          "Spanish-language agent for Mexico and Colombia markets",
        ],
        zoom: { coordinates: [-65, -15] as [number, number], zoom: 3 },
      },
      {
        id: "emea",
        label: "Middle East & Africa",
        status: "in-progress" as const,
        agentforce: false,
        countries: ["SAU", "ARE", "EGY", "ZAF", "NGA", "KEN", "GHA", "ETH", "TZA", "UGA", "IRQ", "JOR"],
        before: "Minimal Salesforce footprint in MEA. Heavy reliance on local third-party tools.",
        current: "MEA deployment on the roadmap. Saudi Arabia scoped as the anchor market.",
        future: "MEA platform footprint established — Arabic language agent support planned.",
        futureHighlights: [
          "Arabic-language Field Briefing Agent for KSA field team",
          "Cross-border account intelligence across GCC markets",
        ],
        zoom: { coordinates: [35, 15] as [number, number], zoom: 3 },
      },
    ] as GlobalMapOU[],

    // Timeline — each frame sets the status of each OU at that point in time
    timeline: [
      {
        year: 2022,
        label: "Foundation",
        caption: "Platform deployed in North America. The blueprint is established.",
        ouStatus: { "north-america": "in-progress", europe: "none", apac: "none", latam: "none", emea: "none" },
      },
      {
        year: 2023,
        label: "North America Live",
        caption: "North America reaches full deployment. Europe onboarding begins.",
        ouStatus: { "north-america": "live", europe: "in-progress", apac: "none", latam: "none", emea: "none" },
      },
      {
        year: 2024,
        label: "Global Expansion",
        caption: "Europe live. APAC and LATAM deployments underway.",
        ouStatus: { "north-america": "live", europe: "live", apac: "in-progress", latam: "in-progress", emea: "none" },
      },
      {
        year: 2025,
        label: "Today",
        caption: "Two regions live. Three in active rollout. MEA scoped.",
        ouStatus: { "north-america": "live", europe: "live", apac: "in-progress", latam: "in-progress", emea: "in-progress" },
      },
      {
        year: 2027,
        label: "Future State",
        caption: "All regions on the unified platform. Agentforce operating globally.",
        ouStatus: { "north-america": "live", europe: "live", apac: "live", latam: "live", emea: "live" },
      },
    ] as GlobalMapTimelineFrame[],

    // Markers — pulsing dots that appear on specific coordinates from a given timeline index
    markers: [
      { coordinates: [-84, 34] as [number, number], label: "North America", fromIndex: 1 },
      { coordinates: [13, 52]  as [number, number], label: "Europe",        fromIndex: 2 },
    ],
  },

  // ── CTA (used in footer + act 3 close) ────────────────────────────────────
  cta: {
    headline:  "The foundation is built. The agents are live. What's next?",
    body:      "The 90-day pilot to full USRB deployment is already scoped. The question is when to start — and whether to move before the MYDay decision gets made without Agentforce in the room.",
    primary:   { label: "Talk to the Team",    href: "/account-team" },
    secondary: { label: "See the Pilot Plan",  href: "/pilot" },
  },
};
