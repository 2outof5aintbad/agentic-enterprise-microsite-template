import Link from "next/link";
import type { Metadata } from "next";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import QuoteBlock from "@/components/QuoteBlock";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = { title: ACCOUNT.data360.meta.title };

export default function Data360Page() {
  const { hero, narrative, dataFlows, metrics, quote, next } = ACCOUNT.data360;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav />
      <Hero eyebrow={hero.eyebrow} headline={hero.headline} subheadline={hero.subheadline} />

      {/* Narrative */}
      <section className="bg-[var(--brand-light)]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid sm:grid-cols-2 gap-6">
            {narrative.map((block, i) => (
              <FadeIn key={block.title} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-black/8 p-8 h-full shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-display text-xl font-black text-[#0A0A0A] mb-3 leading-tight">{block.title}</h3>
                  <p className="text-base text-[#3D3D3D] leading-relaxed">{block.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Data Flows — what feeds what */}
      <section className="bg-white border-t border-black/6">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-12">
              <div className="mb-5">
                <span className="eyebrow-pill">Data Flows</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#0A0A0A] tracking-tight leading-[0.95] mb-4 max-w-2xl">
                Every source. One truth.
              </h2>
              <p className="text-lg text-[#3D3D3D] max-w-xl leading-relaxed">
                Data 360 connects every commercial signal into a unified customer record — the foundation everything else reads from.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {dataFlows.map((flow, i) => (
              <FadeIn key={flow.source} delay={i * 60}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 bg-[var(--brand-light)] rounded-2xl border border-black/6 p-6 hover:border-[var(--brand-primary)]/15 hover:shadow-sm transition-all">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--brand-primary)]/70 mb-1">Source</p>
                    <p className="text-base font-bold text-[#0A0A0A]">{flow.source}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-black/35 mb-1">Signal</p>
                    <p className="text-sm text-[#3D3D3D] leading-relaxed">{flow.signal}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-black/35 mb-1">Commercial Outcome</p>
                    <div className="flex items-start gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                        <circle cx="8" cy="8" r="7" fill="var(--brand-primary)" fillOpacity="0.1"/>
                        <path d="M5 8.5l2 2 4-4" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-sm font-medium text-[#0A0A0A] leading-relaxed">{flow.outcome}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics — red */}
      <section className="relative overflow-hidden bg-[var(--brand-primary)]">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 300" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <path d="M-100 200 Q300 100 600 150 Q900 200 1200 80 Q1360 20 1600 120" stroke="white" strokeWidth="120" strokeLinecap="round" fill="none" opacity="0.07"/>
        </svg>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="mb-5">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border-2 border-white/40 text-white text-[0.65rem] font-bold tracking-[0.18em] uppercase">
                  What Data 360 Delivers
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-[0.95]">
                The foundation in numbers.
              </h2>
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

      {/* Quote */}
      <section className="bg-[var(--brand-light)] border-t border-black/6">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <QuoteBlock text={quote.text} variant="accent" />
          </FadeIn>
        </div>
      </section>

      {/* CTA to Cockpit */}
      <section className="bg-[#0A0A0A] border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <FadeIn>
            <div>
              <p className="text-sm font-bold tracking-[0.16em] uppercase text-white/40 mb-3">Now See What It Powers</p>
              <p className="font-display text-3xl font-black text-white leading-tight">{ACCOUNT.acts[0].title}</p>
              <p className="text-base text-white/70 mt-2 max-w-sm">The data foundation makes every feature reliable. See what becomes possible.</p>
            </div>
          </FadeIn>
          <Link href={next.href} className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-white font-bold text-base transition-all duration-200 hover:shadow-xl hover:shadow-[#F40009]/30 hover:-translate-y-0.5">
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
