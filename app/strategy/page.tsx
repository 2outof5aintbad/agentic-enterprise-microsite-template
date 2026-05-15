import type { Metadata } from "next";
import Link from "next/link";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: ACCOUNT.strategy.meta.title };

export default function StrategyPage() {
  const { strategy } = ACCOUNT;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[50vh] flex flex-col justify-end">
        <div className="absolute inset-0 bg-[#0A0A0A]" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <circle cx="100"  cy="200" r="300" fill="var(--brand-primary)" opacity="0.04"/>
          <circle cx="1340" cy="300" r="250" fill="var(--brand-primary)" opacity="0.03"/>
        </svg>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="hero-eyebrow mb-6">
            <span className="eyebrow-pill">Transformation Strategy</span>
          </div>
          <h1 className="hero-headline font-display text-5xl sm:text-6xl font-black tracking-tight leading-[0.92] mb-6 text-white">
            {strategy.headline}
          </h1>
          <p className="hero-sub text-xl text-white/80 leading-relaxed max-w-2xl">{strategy.opening}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      </section>

      {/* Transformation matrix */}
      <section className="bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6 py-16">

          {/* Matrix label */}
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-[var(--brand-primary)] mb-3">
                {strategy.matrixLabel}
              </p>
              <div className="hidden sm:grid grid-cols-[220px_1fr_1fr_200px] gap-4 text-left px-2 mb-2">
                <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/25">Dimension</p>
                <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/25">From</p>
                <p className="text-[0.6rem] font-bold tracking-widest uppercase text-[var(--brand-primary)]/60">To</p>
                <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/25">Powered By</p>
              </div>
              <div className="hidden sm:block h-px bg-white/8" />
            </div>
          </FadeIn>

          {/* Rows */}
          <div className="space-y-4">
            {strategy.rows.map((row, i) => (
              <FadeIn key={row.dimension} delay={i * 80}>
                {/* Desktop layout */}
                <div className="hidden sm:grid grid-cols-[220px_1fr_1fr_200px] gap-4 rounded-2xl overflow-hidden border border-white/8 hover:border-[var(--brand-primary)]/30 transition-colors duration-200">
                  {/* Dimension */}
                  <div
                    className="px-6 py-6 flex flex-col justify-center"
                    style={{ background: `color-mix(in srgb, var(--brand-primary) 10%, #111)` }}
                  >
                    <p className="font-display text-xl font-black text-white leading-tight">{row.dimension}</p>
                  </div>

                  {/* From */}
                  <div className="px-6 py-6 bg-white/[0.025] flex flex-col justify-center">
                    <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/30 mb-2">Today</p>
                    <p className="text-sm text-white/55 leading-relaxed">{row.from}</p>
                  </div>

                  {/* To — highlighted */}
                  <div
                    className="px-6 py-6 flex flex-col justify-center"
                    style={{ background: `color-mix(in srgb, var(--brand-primary) 8%, #0d1422)` }}
                  >
                    <p className="text-[0.6rem] font-bold tracking-widest uppercase text-[var(--brand-primary)] mb-2">With Agentforce</p>
                    <p className="text-sm text-white/85 leading-relaxed font-medium">{row.to}</p>
                  </div>

                  {/* Powered by */}
                  <div className="px-5 py-6 bg-white/[0.015] flex flex-col justify-center gap-2">
                    {row.poweredBy.map((product) => (
                      <span
                        key={product}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-primary)]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] inline-block shrink-0" />
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="sm:hidden rounded-2xl border border-white/8 overflow-hidden">
                  <div
                    className="px-5 py-4"
                    style={{ background: `color-mix(in srgb, var(--brand-primary) 12%, #111)` }}
                  >
                    <p className="font-display text-xl font-black text-white">{row.dimension}</p>
                  </div>
                  <div className="px-5 py-4 bg-white/[0.025]">
                    <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/30 mb-1.5">Today</p>
                    <p className="text-sm text-white/55 leading-relaxed">{row.from}</p>
                  </div>
                  <div
                    className="px-5 py-4"
                    style={{ background: `color-mix(in srgb, var(--brand-primary) 8%, #0d1422)` }}
                  >
                    <p className="text-[0.6rem] font-bold tracking-widest uppercase text-[var(--brand-primary)] mb-1.5">With Agentforce</p>
                    <p className="text-sm text-white/85 leading-relaxed font-medium">{row.to}</p>
                  </div>
                  <div className="px-5 py-3 bg-white/[0.015] flex flex-wrap gap-3">
                    {row.poweredBy.map((product) => (
                      <span key={product} className="text-xs font-semibold text-[var(--brand-primary)]">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Closing note */}
          {strategy.closing && (
            <FadeIn>
              <div className="mt-12 text-center">
                <p className="text-lg text-white/50 italic max-w-2xl mx-auto leading-relaxed">{strategy.closing}</p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Cross-link to proof */}
      <section className="bg-[#0A0A0A] border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm text-white/40 mb-1">Next</p>
            <p className="text-lg font-display font-black text-white">Results at {ACCOUNT.company}</p>
          </div>
          <Link
            href="/proof"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-white font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
          >
            See the Results
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
