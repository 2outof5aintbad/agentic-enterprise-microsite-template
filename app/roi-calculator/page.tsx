"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Section from "@/components/Section";
import ROICalculator from "@/components/ROICalculator";
import { ACCOUNT } from "@/data/account";

export default function ROIPage() {
  const cfg = ACCOUNT.roi;

  // Find which scenario is active to show its assumptions (ROICalculator owns the state,
  // but we can show assumptions below by reading the selected scenario externally if needed)
  // For now, show assumptions for first scenario as a baseline — they're generic enough.
  const firstScenario = cfg.scenarios[0];

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-bg)" }}>
      <Nav />

      <section className="relative overflow-hidden" style={{ background: "var(--brand-bg)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 12%, transparent) 0%, transparent 60%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-16">
          <FadeIn>
            <div className="mb-6"><span className="eyebrow-pill">ROI Calculator</span></div>
            <h1 className="font-display text-6xl sm:text-7xl font-black tracking-tight leading-[0.92] mb-6 max-w-3xl" style={{ color: "var(--brand-text-heading)" }}>
              {cfg.pageHeadline}
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "var(--brand-text-muted)" }}>{cfg.pageSubhead}</p>
          </FadeIn>
        </div>
      </section>

      <Section>
        <FadeIn delay={80}>
          <ROICalculator />
        </FadeIn>
      </Section>

      <Footer />
    </div>
  );
}
