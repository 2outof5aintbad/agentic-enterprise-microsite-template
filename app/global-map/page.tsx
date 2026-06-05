"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Section from "@/components/Section";
import { ACCOUNT } from "@/data/account";

const GlobalMapClient = dynamic(() => import("@/components/GlobalMapClient"), { ssr: false });

export default function GlobalMapPage() {
  const cfg = ACCOUNT.globalMap;
  if (!cfg) return null;

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-bg)" }}>
      <Nav />

      <section className="relative overflow-hidden" style={{ background: "var(--brand-bg)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 10%, transparent) 0%, transparent 60%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-16">
          <FadeIn>
            <div className="mb-6"><span className="eyebrow-pill">Global Footprint</span></div>
            <h1 className="font-display text-6xl sm:text-7xl font-black tracking-tight leading-[0.92] mb-6 max-w-3xl" style={{ color: "var(--brand-text-heading)" }}>
              Where the platform is live.
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "var(--brand-text-muted)" }}>
              An animated view of the rollout — from early markets to full global deployment with Agentforce.
            </p>
          </FadeIn>
        </div>
      </section>

      <Section>
        <FadeIn>
          <GlobalMapClient />
        </FadeIn>
      </Section>

      <Footer />
    </div>
  );
}
