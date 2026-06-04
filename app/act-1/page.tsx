import Link from "next/link";
import type { Metadata } from "next";
import { ACCOUNT } from "@/data/account";
import { THEMES } from "@/lib/themes";
import Nav from "@/components/Nav";
import SectionHeader from "@/components/SectionHeader";
import Hero from "@/components/Hero";
import QuoteBlock from "@/components/QuoteBlock";
import CockpitFlow, { type CockpitFlowStep } from "@/components/CockpitFlow";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = { title: ACCOUNT.act1.meta.title };

export default function Act1Page() {
  const { hero, narrative, beforeAfter, metrics, enablers, quote, next } = ACCOUNT.act1;
  const { scenarioFlow } = ACCOUNT;
  const gapStyle = THEMES[ACCOUNT.brand.theme ?? "dark"].gapStyle;

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-bg)" }}>
      <Nav />
      <Hero eyebrow={hero.eyebrow} headline={hero.headline} subheadline={hero.subheadline} />

      {/* ── Narrative cards ── */}
      <section style={{ background: "var(--brand-section-alt)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid sm:grid-cols-2" style={{ gap: "var(--brand-density-gap)" }}>
            {narrative.map((block, i) => (
              <FadeIn key={block.title} delay={i * 100}>
                <div className="rounded-[var(--brand-radius)] border h-full transition-shadow hover:shadow-md" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", boxShadow: "var(--brand-card-shadow)", padding: "var(--brand-density-pad)" }}>
                  <h3 className="font-display text-xl font-black mb-3 leading-tight" style={{ color: "var(--brand-text-heading)" }}>{block.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{block.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before vs. After ── */}
      <section className="border-t" style={{ background: "var(--brand-bg)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <SectionHeader eyebrow={beforeAfter.eyebrow} headline={beforeAfter.title} />
          </FadeIn>

          <div className="rounded-[var(--brand-radius)] border overflow-hidden" style={{ borderColor: "var(--brand-surface-border)" }}>
            <div className="grid grid-cols-3 px-6 py-4" style={{ background: "var(--brand-surface)" }}>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--brand-text-muted)" }}>Dimension</p>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--brand-text-muted)" }}>Before</p>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--brand-primary)" }}>After</p>
            </div>
            {beforeAfter.rows.map((row, i) => (
              <FadeIn key={row.dimension} delay={i * 60}>
                <div className="grid grid-cols-3 px-6 py-5 gap-6 border-t" style={{ background: i % 2 === 0 ? "var(--brand-bg)" : "var(--brand-section-alt)", borderColor: "var(--brand-surface-border)" }}>
                  <p className="text-sm font-bold" style={{ color: "var(--brand-text-heading)" }}>{row.dimension}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{row.before}</p>
                  <div className="flex items-start gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                      <circle cx="8" cy="8" r="7" fill="var(--brand-primary)" fillOpacity="0.1"/>
                      <path d="M5 8.5l2 2 4-4" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--brand-text-heading)" }}>{row.after}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scenario Flow ── */}
      <section className="border-t" style={{ background: "var(--brand-section-alt)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <SectionHeader eyebrow="The Solution in Action" eyebrowVariant="outline" headline={ACCOUNT.acts[0].title} subtext={ACCOUNT.acts[0].description} maxWidthClass="max-w-2xl" />
          </FadeIn>
          <CockpitFlow scenario={scenarioFlow.scenario} steps={scenarioFlow.steps as CockpitFlowStep[]} />
        </div>
      </section>

      {/* ── Business Impact ── */}
      {gapStyle === "bleed" ? (
        <section className="relative overflow-hidden" style={{ background: "var(--brand-primary)" }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 300" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <path d="M-100 200 Q300 100 600 150 Q900 200 1200 80 Q1360 20 1600 120" stroke="white" strokeWidth="120" strokeLinecap="round" fill="none" opacity="0.07"/>
          </svg>
          <div className="relative max-w-6xl mx-auto px-6 py-24">
            <FadeIn>
              <div className="mb-12 text-center">
                <div className="mb-5">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border-2 border-white/40 text-[0.65rem] font-bold tracking-[0.18em] uppercase" style={{ color: "var(--brand-text-on-primary)" }}>Business Impact</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-[0.95]" style={{ color: "var(--brand-text-on-primary)" }}>The numbers that matter.</h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {metrics.map((m, i) => (
                <FadeIn key={m.label} delay={i * 80}>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-8 text-center h-full">
                    <p className="font-display text-4xl font-black mb-2 tabular-nums" style={{ color: "var(--brand-text-on-primary)" }}>{m.value}</p>
                    <p className="text-sm leading-snug font-medium" style={{ color: "var(--brand-text-on-primary-muted)" }}>{m.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-t" style={{ background: "var(--brand-bg)", borderColor: "var(--brand-surface-border)" }}>
          <div className="max-w-6xl mx-auto px-6 py-24">
            <FadeIn>
              <div className="mb-12 text-center">
                <div className="mb-5"><span className="eyebrow-pill-outline">Business Impact</span></div>
                <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-[0.95]" style={{ color: "var(--brand-text-heading)" }}>The numbers that matter.</h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {metrics.map((m, i) => (
                <FadeIn key={m.label} delay={i * 80}>
                  <div className="rounded-[var(--brand-radius)] px-6 py-8 text-center border h-full" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", boxShadow: "var(--brand-card-shadow)" }}>
                    <p className="font-display text-4xl font-black mb-2 tabular-nums" style={{ color: "var(--brand-primary)" }}>{m.value}</p>
                    <p className="text-sm leading-snug font-medium" style={{ color: "var(--brand-text-muted)" }}>{m.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Enablers ── */}
      <section className="border-t" style={{ background: "var(--brand-section-alt)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <SectionHeader eyebrow="What Makes It Possible" headline="Built on what you already own." subtext="This isn't a new procurement decision. It's an activation of the Salesforce portfolio already in place." maxWidthClass="max-w-xl" />
          </FadeIn>
          <div className="grid sm:grid-cols-3" style={{ gap: "var(--brand-density-gap)" }}>
            {enablers.map((e, i) => (
              <FadeIn key={e.name} delay={i * 100}>
                <div className="rounded-[var(--brand-radius)] border h-full transition-all hover:border-[var(--brand-primary)]/20 hover:shadow-sm" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", boxShadow: "var(--brand-card-shadow)", padding: "var(--brand-density-pad)" }}>
                  <div className="mb-2"><span className="eyebrow-pill">{e.name}</span></div>
                  <h4 className="font-display text-xl font-black mt-4 mb-2" style={{ color: "var(--brand-text-heading)" }}>{e.role}</h4>
                  <p className="text-base leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{e.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={300}>
            <div className="mt-8 p-6 rounded-[var(--brand-radius)] border flex items-center justify-between gap-6 flex-wrap" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)" }}>
              <p className="text-base max-w-xl leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>
                Want to understand the data foundation that makes this possible?
              </p>
              <Link href="/act-2" className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white font-bold text-sm transition-all duration-200">
                Explore Data Foundation
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="border-t" style={{ background: "var(--brand-bg)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn><QuoteBlock text={quote.text} variant="accent" /></FadeIn>
        </div>
      </section>

      {/* ── Up Next ── */}
      <section className="border-t" style={{ background: "var(--brand-section-alt)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <FadeIn>
            <div>
              <p className="text-sm font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "var(--brand-text-muted)" }}>Up Next</p>
              <p className="font-display text-3xl font-black leading-tight" style={{ color: "var(--brand-text-heading)" }}>{next.label}</p>
            </div>
          </FadeIn>
          <Link href={next.href} className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-white font-bold text-base transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
            {next.label}
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
