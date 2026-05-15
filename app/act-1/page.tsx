import Link from "next/link";
import type { Metadata } from "next";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import QuoteBlock from "@/components/QuoteBlock";
import CockpitFlow, { type CockpitFlowStep } from "@/components/CockpitFlow";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = { title: ACCOUNT.act1.meta.title };

export default function Act1Page() {
  const { hero, narrative, beforeAfter, metrics, enablers, quote, next } = ACCOUNT.act1;
  const { scenarioFlow } = ACCOUNT;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav />
      <Hero eyebrow={hero.eyebrow} headline={hero.headline} subheadline={hero.subheadline} />

      {/* ── Narrative cards ── */}
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

      {/* ── Before vs. After ── */}
      <section className="bg-white border-t border-black/6">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-12">
              <div className="mb-5">
                <span className="eyebrow-pill">{beforeAfter.eyebrow}</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#0A0A0A] tracking-tight leading-[0.95] mb-4 max-w-2xl">
                {beforeAfter.title}
              </h2>
            </div>
          </FadeIn>

          <div className="rounded-2xl border border-black/8 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-[#0A0A0A] px-6 py-4">
              <p className="text-xs font-bold tracking-widest uppercase text-white/40">Dimension</p>
              <p className="text-xs font-bold tracking-widest uppercase text-white/40">Before</p>
              <p className="text-xs font-bold tracking-widest uppercase text-[var(--brand-primary)]/80">After</p>
            </div>
            {beforeAfter.rows.map((row, i) => (
              <FadeIn key={row.dimension} delay={i * 60}>
                <div className={`grid grid-cols-3 px-6 py-5 gap-6 border-t border-black/6 ${i % 2 === 0 ? "bg-white" : "bg-[var(--brand-light)]"}`}>
                  <p className="text-sm font-bold text-[#0A0A0A]">{row.dimension}</p>
                  <p className="text-sm text-[#3D3D3D] leading-relaxed">{row.before}</p>
                  <div className="flex items-start gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                      <circle cx="8" cy="8" r="7" fill="var(--brand-primary)" fillOpacity="0.1"/>
                      <path d="M5 8.5l2 2 4-4" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-sm text-[#0A0A0A] font-medium leading-relaxed">{row.after}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scenario Flow ── */}
      <section className="bg-[var(--brand-light)] border-t border-black/6">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-12">
              <div className="mb-5">
                <span className="eyebrow-pill-outline">The Solution in Action</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#0A0A0A] tracking-tight leading-[0.95] mb-4 max-w-2xl">
                {ACCOUNT.acts[0].title}
              </h2>
              <p className="text-lg text-[#3D3D3D] max-w-2xl leading-relaxed">
                {ACCOUNT.acts[0].description}
              </p>
            </div>
          </FadeIn>
          <CockpitFlow scenario={scenarioFlow.scenario} steps={scenarioFlow.steps as CockpitFlowStep[]} />
        </div>
      </section>

      {/* ── Business Impact ── */}
      <section className="relative overflow-hidden bg-[var(--brand-primary)]">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 300" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <path d="M-100 200 Q300 100 600 150 Q900 200 1200 80 Q1360 20 1600 120" stroke="white" strokeWidth="120" strokeLinecap="round" fill="none" opacity="0.07"/>
        </svg>
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="mb-5">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border-2 border-white/40 text-white text-[0.65rem] font-bold tracking-[0.18em] uppercase">
                  Business Impact
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-[0.95]">
                The numbers that matter.
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <FadeIn key={m.label} delay={i * 80}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-8 text-center">
                  <p className="font-display text-4xl font-black text-white mb-2 tabular-nums">{m.value}</p>
                  <p className="text-sm text-white/85 leading-snug font-medium">{m.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enablers ── */}
      <section className="bg-white border-t border-black/6">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-12">
              <div className="mb-5">
                <span className="eyebrow-pill">What Makes It Possible</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#0A0A0A] tracking-tight leading-[0.95] mb-4 max-w-2xl">
                Built on what you already own.
              </h2>
              <p className="text-lg text-[#3D3D3D] max-w-xl leading-relaxed">
                This isn&apos;t a new procurement decision. It&apos;s an activation of the Salesforce portfolio already in place.
              </p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {enablers.map((e, i) => (
              <FadeIn key={e.name} delay={i * 100}>
                <div className="bg-[var(--brand-light)] rounded-2xl border border-black/6 p-8 h-full hover:border-[var(--brand-primary)]/20 hover:shadow-sm transition-all">
                  <div className="mb-2">
                    <span className="eyebrow-pill">{e.name}</span>
                  </div>
                  <h4 className="font-display text-xl font-black text-[#0A0A0A] mt-4 mb-2">{e.role}</h4>
                  <p className="text-base text-[#3D3D3D] leading-relaxed">{e.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={300}>
            <div className="mt-8 p-6 rounded-2xl border border-black/6 bg-[var(--brand-light)] flex items-center justify-between gap-6 flex-wrap">
              <p className="text-base text-[#3D3D3D] max-w-xl leading-relaxed">
                Want to understand the data foundation that makes this possible?
              </p>
              <Link
                href="/act-2"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white font-bold text-sm transition-all duration-200"
              >
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
      <section className="bg-[var(--brand-light)] border-t border-black/6">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <QuoteBlock text={quote.text} variant="accent" />
          </FadeIn>
        </div>
      </section>

      {/* ── Up Next ── */}
      <section className="bg-[#0A0A0A] border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <FadeIn>
            <div>
              <p className="text-sm font-bold tracking-[0.16em] uppercase text-white/40 mb-3">Up Next</p>
              <p className="font-display text-3xl font-black text-white leading-tight">The Agentic Enterprise</p>
              <p className="text-base text-white/70 mt-2 max-w-sm">When AI moves from informing your team to executing on their behalf.</p>
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
