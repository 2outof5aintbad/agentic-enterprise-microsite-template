import Link from "next/link";
import type { Metadata } from "next";
import { ACCOUNT } from "@/data/account";
import { THEMES } from "@/lib/themes";
import Nav from "@/components/Nav";
import SectionHeader from "@/components/SectionHeader";
import Hero from "@/components/Hero";
import QuoteBlock from "@/components/QuoteBlock";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = { title: ACCOUNT.data360.meta.title };

export default function Data360Page() {
  const { hero, narrative, dataFlows, metrics, quote, next } = ACCOUNT.data360;
  const gapStyle = THEMES[ACCOUNT.brand.theme ?? "dark"].gapStyle;

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-bg)" }}>
      <Nav />
      <Hero eyebrow={hero.eyebrow} headline={hero.headline} subheadline={hero.subheadline} />

      {/* Narrative */}
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

      {/* Data Flows */}
      <section className="border-t" style={{ background: "var(--brand-bg)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <SectionHeader eyebrow="Data Flows" headline="Every source. One truth." subtext="Data 360 connects every commercial signal into a unified customer record — the foundation everything else reads from." maxWidthClass="max-w-xl" />
          </FadeIn>
          <div className="space-y-3">
            {dataFlows.map((flow, i) => (
              <FadeIn key={flow.source} delay={i * 60}>
                <div className="grid grid-cols-1 sm:grid-cols-3 rounded-[var(--brand-radius)] border transition-all hover:border-[var(--brand-primary)]/20 hover:shadow-sm" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", gap: "var(--brand-density-gap)", padding: "var(--brand-density-pad)" }}>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "var(--brand-primary)", opacity: 0.7 }}>Source</p>
                    <p className="text-base font-bold" style={{ color: "var(--brand-text-heading)" }}>{flow.source}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "var(--brand-text-muted)" }}>Signal</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{flow.signal}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "var(--brand-text-muted)" }}>Commercial Outcome</p>
                    <div className="flex items-start gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                        <circle cx="8" cy="8" r="7" fill="var(--brand-primary)" fillOpacity="0.1"/>
                        <path d="M5 8.5l2 2 4-4" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--brand-text-heading)" }}>{flow.outcome}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      {gapStyle === "bleed" ? (
        <section className="relative overflow-hidden" style={{ background: "var(--brand-primary)" }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 300" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <path d="M-100 200 Q300 100 600 150 Q900 200 1200 80 Q1360 20 1600 120" stroke="white" strokeWidth="120" strokeLinecap="round" fill="none" opacity="0.07"/>
          </svg>
          <div className="relative max-w-6xl mx-auto px-6 py-24">
            <FadeIn>
              <div className="mb-12 text-center">
                <div className="mb-5"><span className="inline-flex items-center px-3.5 py-1.5 rounded-full border-2 border-white/40 text-white text-[0.65rem] font-bold tracking-[0.18em] uppercase">What Data 360 Delivers</span></div>
                <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-[0.95]">The foundation in numbers.</h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {metrics.map((m, i) => (
                <FadeIn key={m.label} delay={i * 80}>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-8 text-center">
                    <p className="font-display text-3xl font-black text-white mb-2 tabular-nums">{m.value}</p>
                    <p className="text-sm text-white/85 leading-snug font-medium">{m.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-t" style={{ background: "var(--brand-section-alt)", borderColor: "var(--brand-surface-border)" }}>
          <div className="max-w-6xl mx-auto px-6 py-24">
            <FadeIn>
              <div className="mb-12 text-center">
                <div className="mb-5"><span className="eyebrow-pill-outline">What Data 360 Delivers</span></div>
                <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-[0.95]" style={{ color: "var(--brand-text-heading)" }}>The foundation in numbers.</h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {metrics.map((m, i) => (
                <FadeIn key={m.label} delay={i * 80}>
                  <div className="rounded-[var(--brand-radius)] px-6 py-8 text-center border" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", boxShadow: "var(--brand-card-shadow)" }}>
                    <p className="font-display text-3xl font-black mb-2 tabular-nums" style={{ color: "var(--brand-primary)" }}>{m.value}</p>
                    <p className="text-sm leading-snug font-medium" style={{ color: "var(--brand-text-muted)" }}>{m.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote */}
      <section className="border-t" style={{ background: "var(--brand-bg)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn><QuoteBlock text={quote.text} variant="accent" /></FadeIn>
        </div>
      </section>

      {/* Up Next */}
      <section className="border-t" style={{ background: "var(--brand-section-alt)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <FadeIn>
            <div>
              <p className="text-sm font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "var(--brand-text-muted)" }}>Now See What It Powers</p>
              <p className="font-display text-3xl font-black leading-tight" style={{ color: "var(--brand-text-heading)" }}>{ACCOUNT.acts[0].title}</p>
              <p className="text-base mt-2 max-w-sm" style={{ color: "var(--brand-text-muted)" }}>The data foundation makes every feature reliable. See what becomes possible.</p>
            </div>
          </FadeIn>
          <Link href={next.href} className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] font-bold text-base transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5" style={{ color: "var(--brand-text-on-primary)" }}>
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
