# Agentic Enterprise Microsite Template

A Next.js 14 executive briefing microsite template for Salesforce account teams. Password-gated, fully branded per account, and deployable to Vercel in minutes.

**One file drives the entire site:** `data/account.ts`

---

## Quick Start

```bash
git clone https://github.com/2outof5aintbad/agentic-enterprise-microsite-template [account-slug]-microsite
cd [account-slug]-microsite
npm install
cp .env.example .env.local   # fill in your values
npm run dev                  # preview at localhost:3000
```

Search `data/account.ts` for `TODO:` to find every field that needs content.

---

## Pages

| Route | Description | Key data fields |
|---|---|---|
| `/` | Home — hero, platform tiles, gap section, three act cards | `hero`, `gap`, `acts`, `platformInvestments` |
| `/act-1` | Act 1 detail — narrative, before/after, scenario flow, metrics | `act1`, `scenarioFlow` |
| `/act-2` | Data foundation — narrative, data flows, metrics | `data360` |
| `/act-3` | Agentic enterprise — narrative, workflow comparison, enablers | `act3` |
| `/architecture` | Layered stack diagram — from Systems of Record up to Outcomes | `architecture` |
| `/strategy` | Transformation matrix — from/to framework with Powered By column | `strategy` |
| `/agents` | Filterable agent card gallery — name, category, tagline, description | `agents` |
| `/proof` | Results by function — accordion with agent capabilities and metrics | `proof` |
| `/use-cases` | Interactive use case selector with before/after and value levers | `useCases` |
| `/business-case` | Investment lines, value unlocked, timing argument | `businessCase` |
| `/pilot` | 3-phase pilot plan | `pilotPlan` |
| `/account-team` | Team directory with group filters and photo support | `team` |
| `/demo-library` | Vidyard demo library with category filters | `demos` |
| `/gate` | Password gate — auto-applied to all routes via middleware | — |

All pages are optional except `/` and `/gate`. Pages with thin content can be left with `TODO:` placeholders and excluded from the nav — or removed entirely.

---

## Brand Configuration

Set once in `ACCOUNT.brand` in `data/account.ts`. Everything else updates automatically.

```ts
brand: {
  primary:     "#0066FF",    // Nav bar, buttons, pills, eyebrow accents
  primaryDark: "#0052CC",    // Hover/pressed state (~15% darker than primary)
  bg:          "#0A0A0A",    // Page background
  light:       "#F5F5F5",    // Light section background (before/after, contrast sections)
  fonts:       "editorial",  // Font pairing — see options below
}
```

CSS variables (`--brand-primary`, `--brand-primary-dark`, `--brand-bg`, `--brand-light`, `--font-display`, `--font-body`) are injected automatically via `layout.tsx`.

### Font Pairings

| Value | Display (headings) | Body | Best for |
|---|---|---|---|
| `"editorial"` | Playfair Display | Inter | Pharma, insurance, premium, financial services |
| `"refined"` | Cormorant Garamond | DM Sans | Life sciences, wealth management, heritage brands |
| `"modern"` | DM Sans | DM Sans | SaaS, consumer tech, retail, health tech |
| `"technical"` | Space Grotesk | Inter | Cloud platforms, engineering-led, cybersecurity |
| `"bold"` | Sora | Inter | Energy, manufacturing, field operations, utilities |

---

## Account Team

Each team member in `ACCOUNT.team`:

```ts
{
  name:        "Jane Smith",
  role:        "Account Director",
  group:       "sales",         // sales | engineering | architecture | success | specialist | analytics | data
  description: "One sentence on their role on this account.",
  email:       "jane.smith@salesforce.com",
  image:       "https://ca.slack-edge.com/[workspace-id]-[user-id]-[hash]-192",  // or local path
}
```

Slack CDN photo URLs (`ca.slack-edge.com`) are already whitelisted in `next.config.mjs` and work directly in the `image` field. Omit `image` to render initials.

---

## Specialized Agents

Each agent in `ACCOUNT.agents.roster`:

```ts
{
  id:          "lead-prospecting",
  name:        "Lead Prospecting Agent",
  category:    "sales",   // sales | service | field-service | marketing | operations | finance | hr | consulting | platform
  tagline:     "I will never let a qualified lead go dark.",
  description: "2–3 sentences on what this agent does, what data it reads, what actions it takes.",
}
```

The `/agents` page includes a sticky filter bar with category counts, auto-derived from the roster.

---

## Assets

Place in `public/images/`:

| File | Used by | Notes |
|---|---|---|
| `hero.jpg` | `/` home page | Optional — creates a photo-backed hero |
| `gate-hero.jpg` | `/gate` left panel | Optional — replaces the default Astro image |
| `[customer]-logo.png` | Gate page, hero | Optional — customer logo |
| `team-[firstname-lastname].png` | `/account-team` | Alternative to Slack CDN URLs |

---

## Environment Variables

```bash
ACCESS_TOKEN=YOUR_SITE_PASSWORD          # Required — gate password
NEXT_PUBLIC_BASE_URL=https://your-url    # Required — used for OG tags and magic links
MAGIC_LINK_SECRET=random-32-chars        # Required — signs magic link JWTs
RESEND_API_KEY=re_...                    # Optional — enables magic link email access
```

---

## Deploy to Vercel

```bash
# First deploy
npx vercel --prod --yes

# Add environment variables
npx vercel env add ACCESS_TOKEN production
npx vercel env add NEXT_PUBLIC_BASE_URL production
npx vercel env add MAGIC_LINK_SECRET production

# Redeploy with env vars live
npx vercel --prod --yes
```

After any content change:

```bash
npx vercel --prod --yes   # live in ~60 seconds
```

---

## Magic Link Access (Optional)

Allows passwordless entry via email link instead of (or alongside) the password gate:

1. Set `RESEND_API_KEY` in Vercel environment variables
2. Add allowed email domains to `app/api/send-magic-link/route.ts` and `app/api/verify-email/route.ts`

Recipients get a link in their inbox — no password needed.

---

## Rotating the Password

```bash
npx vercel env rm ACCESS_TOKEN production
npx vercel env add ACCESS_TOKEN production   # enter new password when prompted
npx vercel --prod --yes
```

---

Built by the Salesforce Account SE team · Powered by Next.js 14 + Tailwind CSS + Vercel
