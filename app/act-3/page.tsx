import Link from "next/link";
import type { Metadata } from "next";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import SectionHeader from "@/components/SectionHeader";
import Hero from "@/components/Hero";
import QuoteBlock from "@/components/QuoteBlock";
import AgenticFlow from "@/components/AgenticFlow";
import WorkflowComparison from "@/components/WorkflowComparison";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = { title: ACCOUNT.act3.meta.title };

export default function Act3Page() {
  const { hero, narrative, scenario, outcomes, quote, vision, workflowComparison, enablers, next } = ACCOUNT.act3;

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-bg)" }}>
      <Nav />
      <Hero eyebrow={hero.eyebrow} headline={hero.headline} subheadline={hero.subheadline} />

      {/* Narrative cards */}
      <section style={{ background: "var(--brand-section-alt)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid sm:grid-cols-2" style={{ gap: "var(--brand-density-gap)" }}>
            {narrative.map((block, i) => (
              <FadeIn key={block.title} delay={i * 120}>
                <div className="rounded-[var(--brand-radius)] border h-full transition-shadow hover:shadow-md" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", boxShadow: "var(--brand-card-shadow)", padding: "var(--brand-density-pad)" }}>
                  <h3 className="font-display text-xl font-black mb-3 leading-tight" style={{ color: "var(--brand-text-heading)" }}>{block.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{block.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Comparison */}
      <section className="border-t" style={{ background: "var(--brand-bg)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-12">
              <div className="mb-5"><span className="eyebrow-pill">Human vs. Agentic</span></div>
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

      {/* Agentic Flow */}
      <section className="border-t" style={{ background: "var(--brand-section-alt)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <SectionHeader eyebrow={scenario.eyebrow} eyebrowVariant="outline" headline={scenario.title} subtext={scenario.subtitle} maxWidthClass="max-w-2xl" />
          </FadeIn>
          <FadeIn delay={100}><AgenticFlow steps={scenario.steps} /></FadeIn>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-t" style={{ background: "var(--brand-bg)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <SectionHeader eyebrow="Commercial Outcomes" headline="The measurable transformation." />
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: "var(--brand-density-gap)" }}>
            {outcomes.map((o, i) => (
              <FadeIn key={o.label} delay={i * 80}>
                <div className="rounded-[var(--brand-radius)] border text-center h-full" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", boxShadow: "var(--brand-card-shadow)", padding: "var(--brand-density-pad)" }}>
                  <p className="font-display text-4xl font-black mb-2 tabular-nums" style={{ color: "var(--brand-primary)" }}>{o.metric}</p>
                  <p className="text-sm font-semibold leading-snug" style={{ color: "var(--brand-text-muted)" }}>{o.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Enablers */}
      <section className="border-t" style={{ background: "var(--brand-section-alt)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <SectionHeader eyebrow="What Powers This" headline="Three platforms. One commercial operating system." subtext="The Agentic Enterprise isn't a new architecture. It's what happens when the platforms you already own are orchestrated to act together." maxWidthClass="max-w-xl" />
          </FadeIn>
          <div className="grid sm:grid-cols-3" style={{ gap: "var(--brand-density-gap)" }}>
            {enablers.map((e, i) => (
              <FadeIn key={e.name} delay={i * 100}>
                <div className="rounded-[var(--brand-radius)] border h-full transition-all hover:border-[var(--brand-primary)]/20 hover:shadow-md" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", boxShadow: "var(--brand-card-shadow)", padding: "var(--brand-density-pad)" }}>
                  <div className="mb-4"><span className="eyebrow-pill">{e.name}</span></div>
                  <h4 className="font-display text-xl font-black mt-4 mb-2" style={{ color: "var(--brand-text-heading)" }}>{e.tagline}</h4>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--brand-text-muted)" }}>{e.description}</p>
                  <ul className="space-y-2">
                    {e.actions.map((action, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                          <circle cx="7" cy="7" r="6" fill="var(--brand-primary)" fillOpacity="0.1"/>
                          <path d="M4.5 7.5l1.5 1.5 3.5-3.5" stroke="var(--brand-primary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-xs font-medium leading-snug" style={{ color: "var(--brand-text-muted)" }}>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="border-t" style={{ background: "var(--brand-bg)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn><QuoteBlock text={quote.text} variant="accent" /></FadeIn>
        </div>
      </section>

      {/* Vision + CTA */}
      <section className="border-t" style={{ background: "var(--brand-section-alt)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-8">
              <div className="mb-5"><span className="eyebrow-pill">The Path Forward</span></div>
              <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-[0.95] mb-6 max-w-2xl" style={{ color: "var(--brand-text-heading)" }}>
                This is reachable from where you stand.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="rounded-[var(--brand-radius)] border p-8 max-w-3xl mb-10" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)" }}>
              <p className="text-lg leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{vision}</p>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <p className="font-display text-2xl font-black leading-tight" style={{ color: "var(--brand-text-heading)" }}>You&apos;ve seen the full picture.</p>
                <p className="text-base mt-2 max-w-lg" style={{ color: "var(--brand-text-muted)" }}>
                  From current-state gaps to connected data to autonomous execution — the transformation is a design decision, not a procurement one.
                </p>
              </div>
              <Link href={next.href} className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white font-bold text-base transition-all duration-200 hover:-translate-y-0.5">
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
