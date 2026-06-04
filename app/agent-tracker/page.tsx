import type { Metadata } from "next";
import Link from "next/link";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import AgentTrackerClient from "@/components/AgentTrackerClient";

export const metadata: Metadata = { title: ACCOUNT.agentTracker.meta.title };

export default function AgentTrackerPage() {
  const { hero, agents, successMetrics, platformMilestones } = ACCOUNT.agentTracker;

  const live    = agents.filter(a => a.status === "live").length;
  const pilot   = agents.filter(a => a.status === "pilot").length;
  const planned = agents.filter(a => a.status === "planned").length;

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-bg)" }}>
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, color-mix(in srgb, var(--brand-primary) 10%, var(--brand-bg)) 0%, var(--brand-bg) 60%)" }} />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 500" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <circle cx="200" cy="400" r="350" fill="var(--brand-primary)" opacity="0.05"/>
          <circle cx="1300" cy="100" r="250" fill="var(--brand-primary)" opacity="0.03"/>
        </svg>

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-16">
          <div className="mb-6"><span className="eyebrow-pill">{hero.eyebrow}</span></div>
          <h1 className="font-display font-black tracking-tight leading-[0.92] mb-6 text-5xl sm:text-6xl lg:text-7xl" style={{ color: "var(--brand-text-heading)", whiteSpace: "pre-line" }}>
            {hero.headline}
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl mb-10" style={{ color: "var(--brand-text-muted)" }}>
            {hero.subheadline}
          </p>

          {/* Status legend */}
          <div className="flex flex-wrap gap-5">
            {live > 0 && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold" style={{ color: "var(--brand-text-muted)" }}>{live} Live</span>
              </div>
            )}
            {pilot > 0 && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-sm font-semibold" style={{ color: "var(--brand-text-muted)" }}>{pilot} In Pilot</span>
              </div>
            )}
            {planned > 0 && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-sm font-semibold" style={{ color: "var(--brand-text-muted)" }}>{planned} Planned</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Success metrics */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {successMetrics.map((m, i) => (
              <div key={i} className="rounded-2xl px-5 py-5" style={{ background: "var(--brand-card-bg)", border: "1px solid var(--brand-card-border)" }}>
                <p className="font-display text-3xl font-black leading-none mb-1" style={{ color: "var(--brand-text-heading)" }}>{m.value}</p>
                <p className="text-xs font-semibold leading-snug mb-0.5" style={{ color: "var(--brand-text-muted)" }}>{m.label}</p>
                {m.sublabel && <p className="text-[0.6rem] leading-snug" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>{m.sublabel}</p>}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Agent grid */}
      <AgentTrackerClient agents={agents} milestones={platformMilestones} />

      {/* CTA */}
      <section className="border-t" style={{ background: "var(--brand-primary)", borderColor: "color-mix(in srgb, var(--brand-primary) 60%, transparent)" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <FadeIn>
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-[0.92] mb-6 max-w-3xl mx-auto" style={{ color: "var(--brand-text-on-primary)" }}>
              {ACCOUNT.cta.headline}
            </h2>
            <p className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: "var(--brand-text-on-primary-muted)" }}>
              {ACCOUNT.cta.body}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={ACCOUNT.cta.primary.href}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5"
                style={{ background: "var(--brand-bg)", color: "var(--brand-primary)" }}
              >
                {ACCOUNT.cta.primary.label}
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href={ACCOUNT.cta.secondary.href}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: "color-mix(in srgb, var(--brand-text-on-primary) 40%, transparent)", color: "var(--brand-text-on-primary)" }}
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
