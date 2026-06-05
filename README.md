# Agentic Enterprise Microsite Template

A Next.js 14 executive briefing microsite for Salesforce account teams. Password-gated, fully branded per account, deployed to Heroku in minutes.

**One file drives the entire site:** `data/account.ts`

---

## Quick Start

```bash
git clone https://github.com/2outof5aintbad/agentic-enterprise-microsite-template [account-slug]
cd [account-slug]
npm install
cp .env.example .env.local   # set ACCESS_TOKEN at minimum
npm run dev                  # http://localhost:3000
```

Search `data/account.ts` for `TODO:` to find every field that needs content. The Apex Foods example shows what a complete, filled-in account looks like.

---

## Pages

All pages are opt-in via `ACCOUNT.pages[]` in `data/account.ts`. Remove any slug to hide that page from nav and footer.

| Slug | Page | Key data |
|---|---|---|
| *(always shown)* | Home — hero, platform tiles, gap, three act cards | `hero`, `gap`, `acts`, `platformInvestments` |
| `act-1` | The Problem — narrative, before/after, scenario flow | `act1`, `scenarioFlow` |
| `act-2` | Data Foundation — narrative, data flows, metrics | `data360` |
| `act-3` | Agentic Enterprise — narrative, workflow comparison, agentic flow | `act3` |
| `use-cases` | Interactive use case selector with before/after and value levers | `useCases` |
| `architecture` | Layered stack diagram | `architecture` |
| `strategy` | Transformation matrix — from/to framework | `strategy` |
| `agent-tracker` | Live agent deployment dashboard — live, pilot, planned | `agentTracker` |
| `proof` | Results by function — accordion with metrics and quotes | `proof` |
| `business-case` | Investment lines, value unlocked, timing argument | `businessCase` |
| `pilot` | 3-phase pilot plan | `pilotPlan` |
| `demo-library` | Vidyard demo library with category filters | `demos` |
| `account-team` | Team directory with group filters and photo support | `team` |
| `pulse` | Events, announcements, and account updates | `data/pulse.ts` |
| `roi-calculator` | 3-scenario interactive ROI calculator | `roi` |
| `innovation` | Internal experiment showcase | `innovation` |
| `headless-360` | Headless 360 platform architecture + looping video | `headless360` |
| `global-map` | Animated global deployment map with OU timeline | `globalMap` |

---

## Brand Configuration

Set once in `ACCOUNT.brand`. Everything updates automatically.

```ts
brand: {
  primary:      "#0066FF",     // Buttons, pills, accents, metrics
  primaryDark:  "#0052CC",     // Hover state (~15% darker)
  theme:        "dark",        // dark | light | editorial | bold | corporate
  fonts:        "editorial",   // editorial | refined | modern | technical | bold
  heroLayout:   "centered",    // centered | split | minimal
  headerAlign:  "left",        // left | center
  density:      "default",     // compact | default | spacious
  heroImage:    undefined,     // optional — see starter images below
  customerLogo: undefined,     // optional — co-branded [customer] × Salesforce nav lockup
}
```

Text contrast on brand-primary backgrounds is computed automatically via WCAG luminance — no manual adjustment needed when changing the primary color.

### Themes

| Value | Background | Best for |
|---|---|---|
| `"dark"` | Near-black | Most accounts — high drama, works everywhere |
| `"light"` | White | Clean, modern, approachable |
| `"editorial"` | Warm off-white | Premium, life sciences, heritage brands |
| `"bold"` | Deep charcoal | Energy, manufacturing, field operations |
| `"corporate"` | Light gray | Financial services, government |

### Font Pairings

| Value | Display | Body | Best for |
|---|---|---|---|
| `"editorial"` | Playfair Display | Inter | Premium, insurance, pharma |
| `"refined"` | Cormorant Garamond | DM Sans | Life sciences, wealth management |
| `"modern"` | DM Sans | DM Sans | SaaS, consumer tech, retail |
| `"technical"` | Space Grotesk | Inter | Cloud, engineering-led, cybersecurity |
| `"bold"` | Sora | Inter | Energy, manufacturing, field ops |

---

## Starter Media

All assets in `public/images/`. Reference directly in `account.ts`.

### Hero Backgrounds (`brand.heroImage`)
```
/images/hero-cpg.png            Consumer goods / retail
/images/hero-finance.png        Financial services
/images/hero-manufacturing.png  Manufacturing / field ops
/images/hero-healthcare.png     Healthcare / life sciences
/images/hero-tech.png           Technology / SaaS
/images/hero-energy.png         Energy / utilities
```

### Gate Page Backgrounds
```
/images/gate-finance.png        Cityscape at dusk
/images/gate-manufacturing.png  Factory floor
/images/gate-healthcare.png     Hospital corridor
/images/gate-tech.png           Open-plan tech office
/images/gate-energy.png         Offshore platform at sunset
```

### Astro Assets
```
/images/ASTRO_NoOutfit_WalkRight_SFS20_sRGB.png
/images/astro-laptop.png
/images/astro-pointing.png
/images/astro-celebrating.png
/images/astro-thinking.png
/images/astro-data.png
/images/astro-agent.png
/images/astro-mobile.png
/images/astro-field.png
/images/astro-icon.png          Icon mark (dark blue, no background)
```

### Agent Avatars
`agent-avatar-1.png` through `agent-avatar-10.png` — for agent tracker cards and team members.

---

## Environment Variables

```bash
ACCESS_TOKEN=YOUR_SITE_PASSWORD          # Required — gate password
NEXT_PUBLIC_BASE_URL=https://your-url   # Required — OG tags and magic links
MAGIC_LINK_SECRET=random-32-chars       # Optional — signs magic link JWTs
RESEND_API_KEY=re_...                   # Optional — enables magic link email
```

---

## Deploy to Heroku

```bash
heroku create [account-slug]
heroku config:set ACCESS_TOKEN=yourpassword
heroku config:set NEXT_PUBLIC_BASE_URL=https://[account-slug].herokuapp.com
git push heroku main
```

The `Procfile` is already configured. Redeploy after content changes:
```bash
git add -A && git commit -m "Update [account] content" && git push heroku main
```

---

## Team Photos

The `image` field on each team member accepts:
- **Slack CDN** — `https://ca.slack-edge.com/[workspace]-[user-id]-[hash]-192` (whitelisted in `next.config.mjs`)
- **Local path** — `/images/team-jane-smith.png`
- **Omitted** — renders initials with color-coded background

---

## Magic Link Access (Optional)

Passwordless entry via email instead of the gate:

1. Set `RESEND_API_KEY` in environment variables
2. Add allowed email domains in `app/api/send-magic-link/route.ts`

---

Built by the Salesforce Account SE team · Next.js 14 · Tailwind CSS
