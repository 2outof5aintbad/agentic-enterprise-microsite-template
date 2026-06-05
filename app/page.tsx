"use client";

import Link from "next/link";
import { ACCOUNT } from "@/data/account";
import { THEMES } from "@/lib/themes";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ActCard from "@/components/ActCard";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import DeploymentTicker from "@/components/DeploymentTicker";
import HeroCalculator from "@/components/HeroCalculator";

export default function HomePage() {
  const { hero, platformInvestments, gap, acts } = ACCOUNT;
  const gapStyle = THEMES[ACCOUNT.brand.theme ?? "dark"].gapStyle;

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <Nav />

      <Hero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subheadline={hero.subheadline}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
        stats={gap.stats}
        variant="home"
      />

      {/* ── Your Numbers ── */}
      <section style={{ background: "var(--brand-bg)" }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <FadeIn>
            <div className="max-w-xl">
              <p className="text-[0.6rem] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: "var(--brand-primary)", opacity: 0.7 }}>
                See Your Impact
              </p>
              <p className="font-display text-2xl sm:text-3xl font-black leading-tight mb-1" style={{ color: "var(--brand-text-heading)" }}>
                What does Agentforce unlock<br />for your field org?
              </p>
              <HeroCalculator />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Deployment Ticker ── */}
      <DeploymentTicker />

      {/* ── Platform Footprint ── */}
      <section className="border-t" style={{ background: "var(--brand-section-alt)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <SectionHeader
              eyebrow="The Platform Footprint"
              headline="The investment is made."
              subtext={`${ACCOUNT.company} has built a Salesforce platform. Two capabilities are the key to unlocking everything else.`}
              maxWidthClass="max-w-xl"
            />
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: "var(--brand-density-gap)" }}>
            {platformInvestments.map((inv, i) => (
              <FadeIn key={inv.product} delay={i * 55} className="h-full">
                <div
                  className="relative flex flex-col h-full border transition-all rounded-[var(--brand-radius)]"
                  style={inv.highlight
                    ? { background: "var(--brand-primary)", borderColor: "var(--brand-primary)", boxShadow: "0 8px 30px color-mix(in srgb, var(--brand-primary) 30%, transparent)", padding: "var(--brand-density-pad)" }
                    : { background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", boxShadow: "var(--brand-card-shadow)", padding: "var(--brand-density-pad)" }
                  }
                >
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: inv.highlight ? "rgba(255,255,255,0.7)" : "var(--brand-text-muted)" }}>
                    {inv.category}
                  </div>
                  <p className="font-display text-lg font-black mb-1 leading-tight" style={{ color: inv.highlight ? "white" : "var(--brand-text-heading)" }}>{inv.product}</p>
                  <p className="text-xs leading-snug" style={{ color: inv.highlight ? "rgba(255,255,255,0.85)" : "var(--brand-text-muted)" }}>{inv.role}</p>
                  {inv.highlight && (
                    <p className="text-xs text-white/70 mt-3 leading-snug font-medium">Key to unlocking the full portfolio</p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Gap ── */}
      {gapStyle === "bleed" ? (
        <section className="relative overflow-hidden" style={{ background: "var(--brand-primary)" }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <path d="M-100 280 Q300 140 600 200 Q900 260 1200 100 Q1360 30 1600 160" stroke="white" strokeWidth="130" strokeLinecap="round" fill="none" opacity="0.07"/>
          </svg>
          <div className="relative max-w-6xl mx-auto px-6 py-28">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn>
                <div className="mb-6">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border-2 border-white/40 text-white text-[0.65rem] font-bold tracking-[0.18em] uppercase">
                    The Core Problem
                  </span>
                </div>
                <h2 className="font-display text-5xl sm:text-7xl font-black tracking-tight leading-[0.88] mb-5" style={{ color: "var(--brand-text-on-primary)" }}>{gap.headline}</h2>
                <p className="text-xl font-medium mb-6" style={{ color: "var(--brand-text-on-primary-muted)" }}>{gap.subhead}</p>
                <p className="text-lg leading-relaxed mb-16 max-w-2xl mx-auto" style={{ color: "var(--brand-text-on-primary-muted)" }}>{gap.body}</p>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {gap.stats.map((stat, i) => (
                  <FadeIn key={stat.label} delay={i * 100}>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-8 text-center">
                      <p className="font-display text-4xl font-black mb-2 tabular-nums" style={{ color: "var(--brand-text-on-primary)" }}>{stat.value}</p>
                      <p className="text-base leading-snug font-medium" style={{ color: "var(--brand-text-on-primary-muted)" }}>{stat.label}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative overflow-hidden border-t" style={{ background: "var(--brand-bg)", borderColor: "var(--brand-surface-border)" }}>
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn>
                <div className="mb-6">
                  <span className="eyebrow-pill-outline">The Core Problem</span>
                </div>
                <h2 className="font-display text-5xl sm:text-6xl font-black tracking-tight leading-[0.92] mb-5" style={{ color: "var(--brand-text-heading)" }}>{gap.headline}</h2>
                <p className="text-xl font-medium mb-4" style={{ color: "var(--brand-primary)" }}>{gap.subhead}</p>
                <p className="text-lg leading-relaxed mb-14 max-w-2xl mx-auto" style={{ color: "var(--brand-text-muted)" }}>{gap.body}</p>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {gap.stats.map((stat, i) => (
                  <FadeIn key={stat.label} delay={i * 100}>
                    <div className="rounded-[var(--brand-radius)] px-6 py-8 text-center border" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", boxShadow: "var(--brand-card-shadow)" }}>
                      <p className="font-display text-4xl font-black mb-2 tabular-nums" style={{ color: "var(--brand-primary)" }}>{stat.value}</p>
                      <p className="text-base leading-snug font-medium" style={{ color: "var(--brand-text-muted)" }}>{stat.label}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Three Chapters ── */}
      <section id="acts" style={{ background: "var(--brand-section-alt)", borderTop: "1px solid var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <SectionHeader
              eyebrow="The Transformation Story"
              eyebrowVariant="outline"
              headline="Three chapters. One outcome."
              subtext={`A transformation story — from where ${ACCOUNT.company} is today to where it could operate tomorrow.`}
              maxWidthClass="max-w-xl"
            />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "var(--brand-density-gap)" }}>
            {acts.map((act, i) => (
              <FadeIn key={act.number} delay={i * 100} className="h-full">
                <ActCard number={act.number} href={act.href} title={act.title} tagline={act.tagline} description={act.description} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore Further ── */}
      <section className="border-t" style={{ background: "var(--brand-section-alt)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <SectionHeader
              eyebrow="Go Deeper"
              headline="Explore the full picture."
              subtext="Every dimension of the transformation — from architecture to agents to business case."
              maxWidthClass="max-w-xl"
            />
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ gap: "var(--brand-density-gap)" }}>
            {[
              { href: "/architecture",  label: "Architecture",   desc: "The layered platform stack" },
              { href: "/strategy",      label: "Strategy",       desc: "Transformation framework" },
              { href: "/agent-tracker", label: "Agent Tracker",  desc: "What's live and in motion" },
              { href: "/proof",         label: "Results",        desc: "Outcomes by function" },
              { href: "/use-cases",     label: "Use Cases",      desc: "Specific workflows transformed" },
              { href: "/business-case", label: "Business Case",  desc: "The investment and the return" },
              { href: "/pilot",         label: "Pilot Plan",     desc: "90-day path to production" },
            ].filter(item => ACCOUNT.pages.includes(item.href.replace("/", ""))).map((item, i) => (
              <FadeIn key={item.href} delay={i * 40} className="h-full">
                <Link
                  href={item.href}
                  className="group flex flex-col gap-1.5 h-full rounded-[var(--brand-radius)] border transition-all duration-200 hover:border-[var(--brand-primary)]/40"
                  style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", boxShadow: "var(--brand-card-shadow)", padding: "var(--brand-density-pad)" }}
                >
                  <p className="font-display text-base font-black group-hover:text-[var(--brand-primary)] transition-colors duration-200 leading-tight" style={{ color: "var(--brand-text-heading)" }}>
                    {item.label}
                  </p>
                  <p className="text-xs leading-snug" style={{ color: "var(--brand-text-muted)" }}>{item.desc}</p>
                  <div className="mt-2 flex items-center gap-1 text-[0.6rem] font-bold group-hover:text-[var(--brand-primary)]/60 transition-colors duration-200" style={{ color: "var(--brand-text-muted)" }}>
                    Explore
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden className="group-hover:translate-x-0.5 transition-transform duration-200">
                      <path d="M2.5 6h7M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t" style={{ background: "var(--brand-bg)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <FadeIn>
            <div>
              <h2 className="font-display text-3xl font-black leading-tight mb-3" style={{ color: "var(--brand-text-heading)" }}>{ACCOUNT.cta.headline}</h2>
              <p className="text-base max-w-lg" style={{ color: "var(--brand-text-muted)" }}>{ACCOUNT.cta.body}</p>
            </div>
          </FadeIn>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Link
              href={ACCOUNT.cta.primary.href}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              style={{ background: "var(--brand-primary)", color: "var(--brand-text-on-primary)" }}
            >
              {ACCOUNT.cta.primary.label}
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
