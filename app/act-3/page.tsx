import Link from "next/link";
import type { Metadata } from "next";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import QuoteBlock from "@/components/QuoteBlock";
import AgenticFlow from "@/components/AgenticFlow";
import WorkflowComparison from "@/components/WorkflowComparison";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = { title: ACCOUNT.act3.meta.title };

export default function Act3Page() {
  const { hero, narrative, scenario, outcomes, quote, vision, workflowComparison, enablers, next } = ACCOUNT.act3;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav />
      <Hero eyebrow={hero.eyebrow} headline={hero.headline} subheadline={hero.subheadline} />

      {/* ── Narrative cards — cream ── */}
      <section className="bg-[var(--brand-light)]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid sm:grid-cols-2 gap-6">
            {narrative.map((block, i) => (
              <FadeIn key={block.title} delay={i * 120}>
                <div className="bg-white rounded-2xl border border-black/8 p-8 h-full shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-display text-xl font-black text-[#0A0A0A] mb-3 leading-tight">{block.title}</h3>
                  <p className="text-base text-[#3D3D3D] leading-relaxed">{block.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow Comparison — white ── */}
      <section className="bg-white border-t border-black/6">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-12">
              <div className="mb-5">
                <span className="eyebrow-pill">Human vs. Agentic</span>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <WorkflowComparison
              title={workflowComparison.title}
              subtitle={workflowComparison.subtitle}
              human={workflowComparison.human}
              agentic={workflowComparison.agentic}
            />
          </FadeIn>
        </div>
      </section>

      {/* ── Agentic Flow — cream ── */}
      <section className="bg-[var(--brand-light)] border-t border-black/6">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-10">
              <div className="mb-5">
                <span className="eyebrow-pill-outline">{scenario.eyebrow}</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#0A0A0A] tracking-tight leading-[0.95] mb-4 max-w-2xl">
                {scenario.title}
              </h2>
              <p className="text-lg text-[#3D3D3D] max-w-2xl leading-relaxed">{scenario.subtitle}</p>
              <p className="text-sm text-black/40 mt-4">Click any step to expand details.</p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <AgenticFlow steps={scenario.steps} />
          </FadeIn>
        </div>
      </section>

      {/* ── Outcomes — red ── */}
      <section className="bg-white border-t border-black/6">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-12">
              <div className="mb-5">
                <span className="eyebrow-pill">Commercial Outcomes</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#0A0A0A] tracking-tight leading-[0.95]">
                The measurable transformation.
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {outcomes.map((o, i) => (
              <FadeIn key={o.label} delay={i * 80}>
                <div className="rounded-2xl border border-[var(--brand-primary)]/15 bg-[var(--brand-light)] px-6 py-8 text-center shadow-sm">
                  <p className="font-display text-4xl font-black text-[var(--brand-primary)] mb-2 tabular-nums">{o.metric}</p>
                  <p className="text-sm font-semibold text-[#3D3D3D] leading-snug">{o.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enablers — cream ── */}
      <section className="bg-[var(--brand-light)] border-t border-black/6">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-12">
              <div className="mb-5">
                <span className="eyebrow-pill">What Powers This</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#0A0A0A] tracking-tight leading-[0.95] mb-4 max-w-2xl">
                Three platforms. One commercial operating system.
              </h2>
              <p className="text-lg text-[#3D3D3D] max-w-xl leading-relaxed">
                The Agentic Enterprise isn&apos;t a new architecture. It&apos;s what happens when the platforms you already own are orchestrated to act together.
              </p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {enablers.map((e, i) => (
              <FadeIn key={e.name} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-black/6 p-8 h-full hover:border-[var(--brand-primary)]/20 hover:shadow-md transition-all">
                  <div className="mb-4">
                    <span className="eyebrow-pill">{e.name}</span>
                  </div>
                  <h4 className="font-display text-xl font-black text-[#0A0A0A] mt-4 mb-2">{e.tagline}</h4>
                  <p className="text-sm text-[#3D3D3D] leading-relaxed mb-5">{e.description}</p>
                  <ul className="space-y-2">
                    {e.actions.map((action, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                          <circle cx="7" cy="7" r="6" fill="#F40009" fillOpacity="0.1"/>
                          <path d="M4.5 7.5l1.5 1.5 3.5-3.5" stroke="#F40009" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-xs font-medium text-[#3D3D3D] leading-snug">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
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

      {/* ── Vision + CTA — dark ── */}
      <section className="bg-[#0A0A0A] border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-8">
              <div className="mb-5">
                <span className="eyebrow-pill">The Path Forward</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-[0.95] mb-6 max-w-2xl">
                This is reachable from where you stand.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 max-w-3xl mb-10">
              <p className="text-lg text-white/85 leading-relaxed">{vision}</p>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <p className="font-display text-2xl font-black text-white leading-tight">You&apos;ve seen the full picture.</p>
                <p className="text-base text-white/70 mt-2 max-w-lg">
                  From current-state gaps to connected data to autonomous execution — the transformation is a design decision, not a procurement one.
                </p>
              </div>
              <Link href={next.href} className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 border-white/25 hover:border-white bg-transparent hover:bg-white/8 text-white font-bold text-base transition-all duration-200 hover:-translate-y-0.5">
                {next.label}
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
