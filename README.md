# Agentic Enterprise Microsite Template

A Next.js 14 executive briefing microsite template for Salesforce account teams. All content is driven by a single data file — `data/account.ts`.

## Quick Start

```bash
git clone https://github.com/[org]/agentic-enterprise-template [account-slug]-microsite
cd [account-slug]-microsite
npm install
cp .env.example .env.local   # then fill in your values
npm run dev
```

## Populate the Site

**Edit one file:** `data/account.ts`

Everything — hero copy, brand colors, pages, team, demos — comes from this file. Search for `TODO:` to find every field that needs content.

**Key fields to fill first:**
1. `ACCOUNT.company` — customer name
2. `ACCOUNT.brand` — primary color, dark shade, background, light background
3. `ACCOUNT.hero` — headline and subheadline
4. `ACCOUNT.gap` — the burning platform (headline, stats, body)
5. `ACCOUNT.acts` — three act titles and descriptions
6. `ACCOUNT.team` — account team members

## Brand Tokens

Set these in `ACCOUNT.brand` in `data/account.ts`:

```ts
brand: {
  primary:      "#0066FF",   // Main accent — nav bar, buttons, pills
  primaryDark:  "#0052CC",   // Hover state for buttons
  bg:           "#0A0A0A",   // Page background (dark)
  light:        "#F5F5F5",   // Light section background
}
```

CSS variables (`--brand-primary`, `--brand-primary-dark`, `--brand-bg`, `--brand-light`) are injected automatically from these values via `layout.tsx`.

## Pages

| Route | Description | Data field |
|---|---|---|
| `/` | Home — hero, platform tiles, gap section, three acts | `hero`, `gap`, `acts`, `platformInvestments` |
| `/act-1` | Act 1 detail — narrative, before/after, scenario flow, metrics | `cockpit`, `scenarioFlow` |
| `/act-2` | Data foundation — narrative, data flows, metrics | `data360` |
| `/act-3` | Agentic enterprise — narrative, workflow comparison, enablers | `act3` |
| `/account-team` | Team directory with search and group filters | `team` |
| `/demo-library` | Demo video library with category filters | `demos` |
| `/gate` | Password gate (auto-applied via middleware) | — |

## Assets

Place images in `public/images/`:
- `hero.jpg` — optional home page hero background
- `gate-hero.jpg` — optional gate page left panel image
- `team-[firstname-lastname].png` — team photos (or use Slack CDN URLs directly in `data/account.ts`)

## Environment Variables

```bash
ACCESS_TOKEN=YOUR_SITE_PASSWORD         # Required — gate password
NEXT_PUBLIC_BASE_URL=https://your-url   # Required — used for magic links
MAGIC_LINK_SECRET=random-32-chars       # Required — signs magic link JWTs
RESEND_API_KEY=re_...                   # Optional — enables magic link emails
```

## Deploy to Vercel

```bash
# First deploy
npx vercel --prod --yes

# Add env vars
npx vercel env add ACCESS_TOKEN production
npx vercel env add NEXT_PUBLIC_BASE_URL production
npx vercel env add MAGIC_LINK_SECRET production

# Redeploy with env vars live
npx vercel --prod --yes
```

## Updating Content

All content lives in `data/account.ts`. Edit any field and redeploy:

```bash
npx vercel --prod --yes
```

## Magic Link Access (Optional)

If you want to allow email-based access instead of (or in addition to) password:
1. Set `RESEND_API_KEY` in Vercel env vars
2. Add allowed email domains to `app/api/send-magic-link/route.ts` and `app/api/verify-email/route.ts`

---

Built by the Salesforce Account SE team. Powered by Next.js 14 + Tailwind CSS + Vercel.
