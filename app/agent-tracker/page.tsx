import type { Metadata } from "next";
import Link from "next/link";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import AgentTrackerClient from "@/components/AgentTrackerClient";

export const metadata: Metadata = { title: ACCOUNT.agentTracker.meta.title };

export default function AgentTrackerPage() {
  const { hero, agents, successMetrics } = ACCOUNT.agentTracker;

  const live    = agents.filter((a) => a.status === "live").length;
  const pilot   = agents.filter((a) => a.status === "pilot").length;
  const planned = agents.filter((a) => a.status === "planned").length;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav />

      {/* Hero + grid share gradient background */}
      <div
        className="bg-[#0A0A0A]"
        style={{
          background: `linear-gradient(to bottom, color-mix(in srgb, var(--brand-primary) 12%, #0A0A0A), color-mix(in srgb, var(--brand-primary) 4%, #0A0A0A) 40%, #0A0A0A 70%)`,
        }}
      >

        {/* Hero */}
        <section className="relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 500" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <circle cx="200" cy="400" r="350" fill="var(--brand-primary)" opacity="0.06"/>
            <circle cx="1300" cy="100" r="250" fill="var(--brand-primary)" opacity="0.04"/>
          </svg>

          <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20">
            <div className="hero-eyebrow mb-6">
              <span className="eyebrow-pill">{hero.eyebrow}</span>
            </div>
            <h1
              className="hero-headline font-display font-black tracking-tight leading-[0.92] mb-6 text-5xl sm:text-6xl lg:text-7xl text-white"
              style={{ whiteSpace: "pre-line" }}
            >
              {hero.headline}
            </h1>
            <p className="hero-sub text-xl text-white/80 leading-relaxed max-w-2xl">
              {hero.subheadline}
            </p>

            {/* Status legend */}
            <div className="hero-ctas flex flex-wrap gap-4 mt-10">
              {live > 0 && (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-semibold text-white/70">{live} Live</span>
                </div>
              )}
              {pilot > 0 && (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-sm font-semibold text-white/70">{pilot} In Pilot</span>
                </div>
              )}
              {planned > 0 && (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span className="text-sm font-semibold text-white/70">{planned} Planned</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Success metrics bar */}
        <section className="max-w-6xl mx-auto px-6 pb-4">
          <FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {successMetrics.map((m, i) => (
                <div key={i} className="bg-white/[0.05] border border-white/8 rounded-2xl px-5 py-5">
                  <p className="font-display text-3xl font-black text-white leading-none mb-1">{m.value}</p>
                  <p className="text-xs font-semibold text-white/60 leading-snug mb-0.5">{m.label}</p>
                  {m.sublabel && <p className="text-[0.65rem] text-white/30 leading-snug">{m.sublabel}</p>}
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Agent grid — client component */}
        <AgentTrackerClient agents={agents} />

      </div>

      {/* CTA */}
      <section className="bg-[var(--brand-primary)]">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <FadeIn>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-[0.92] mb-6 max-w-3xl mx-auto">
              {ACCOUNT.cta.headline}
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">{ACCOUNT.cta.body}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={ACCOUNT.cta.primary.href}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-[var(--brand-primary)] font-bold text-base transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5"
              >
                {ACCOUNT.cta.primary.label}
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href={ACCOUNT.cta.secondary.href}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 border-white/50 hover:border-white text-white font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
              >
                {ACCOUNT.cta.secondary.label}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
