import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ACCOUNT } from "@/data/account";
import StickyNav from "@/components/StickyNav";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "800", "900"],
});

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
      className={`${inter.variable} ${playfair.variable}`}
      style={{
        ["--brand-primary" as string]:      ACCOUNT.brand.primary,
        ["--brand-primary-dark" as string]: ACCOUNT.brand.primaryDark,
        ["--brand-bg" as string]:           ACCOUNT.brand.bg,
        ["--brand-light" as string]:        ACCOUNT.brand.light,
      }}
    >
      <body className="bg-[var(--brand-bg)] text-white antialiased">
        <PageTransition>{children}</PageTransition>
        <StickyNav />
      </body>
    </html>
  );
}
