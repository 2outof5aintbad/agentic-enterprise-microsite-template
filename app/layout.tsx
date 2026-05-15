import type { Metadata } from "next";
import {
  Inter,
  DM_Sans,
  Playfair_Display,
  Cormorant_Garamond,
  Space_Grotesk,
  Sora,
} from "next/font/google";
import "./globals.css";
import { ACCOUNT } from "@/data/account";
import StickyNav from "@/components/StickyNav";
import PageTransition from "@/components/PageTransition";
import AgentforceChat from "@/components/AgentforceChat";

// ── Body fonts ───────────────────────────────────────────────────────────────
const inter        = Inter({        subsets: ["latin"], variable: "--font-inter",        display: "swap" });
const dmSans       = DM_Sans({      subsets: ["latin"], variable: "--font-dm-sans",       display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const sora         = Sora({         subsets: ["latin"], variable: "--font-sora",          display: "swap" });

// ── Display fonts ─────────────────────────────────────────────────────────────
const playfair    = Playfair_Display({   subsets: ["latin"], variable: "--font-playfair",    weight: ["700", "800", "900"], display: "swap" });
const cormorant   = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant",   weight: ["600", "700"],        display: "swap" });

// ── Active pairing ────────────────────────────────────────────────────────────
// Each pairing sets --font-display (headings) and --font-body (body text).
// globals.css uses these via .font-display and body { font-family: ... }.
const FONT_PAIRINGS = {
  editorial:  { display: "--font-playfair",    body: "--font-inter" },
  refined:    { display: "--font-cormorant",   body: "--font-dm-sans" },
  modern:     { display: "--font-dm-sans",     body: "--font-dm-sans" },
  technical:  { display: "--font-space-grotesk", body: "--font-inter" },
  bold:       { display: "--font-sora",        body: "--font-inter" },
};

const activePairing = FONT_PAIRINGS[ACCOUNT.brand.fonts ?? "editorial"];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: `${ACCOUNT.hero.headline.replace(/\n/g, " ")} · ${ACCOUNT.company} Executive Briefing`,
    template: `%s · ${ACCOUNT.company} Executive Briefing`,
  },
  description: ACCOUNT.hero.subheadline,
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    siteName: `${ACCOUNT.company} Executive Briefing`,
    title: `${ACCOUNT.hero.headline.replace(/\n/g, " ")} · ${ACCOUNT.company}`,
    description: ACCOUNT.hero.subheadline,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${sora.variable} ${playfair.variable} ${cormorant.variable}`}
      style={{
        ["--brand-primary" as string]:      ACCOUNT.brand.primary,
        ["--brand-primary-dark" as string]: ACCOUNT.brand.primaryDark,
        ["--brand-bg" as string]:           ACCOUNT.brand.bg,
        ["--brand-light" as string]:        ACCOUNT.brand.light,
        ["--font-display" as string]:       `var(${activePairing.display})`,
        ["--font-body" as string]:          `var(${activePairing.body})`,
      }}
    >
      <body className="bg-[var(--brand-bg)] text-white antialiased" style={{ fontFamily: "var(--font-body), sans-serif" }}>
        <PageTransition>{children}</PageTransition>
        <StickyNav />
        <AgentforceChat />
      </body>
    </html>
  );
}
