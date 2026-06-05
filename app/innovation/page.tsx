"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { ACCOUNT } from "@/data/account";

const STATUS_CONFIG = {
  active:   { label: "Active",    dot: "bg-emerald-400 animate-pulse", pill: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" },
  scoping:  { label: "Scoping",   dot: "bg-amber-400",                 pill: "bg-amber-500/15 text-amber-300 border-amber-500/25" },
  complete: { label: "Complete",  dot: "bg-blue-400",                  pill: "bg-blue-500/15 text-blue-300 border-blue-500/25" },
};

export default function InnovationPage() {
  const cfg = ACCOUNT.innovation;

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-bg)" }}>
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--brand-bg)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 12%, transparent) 0%, transparent 60%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20">
          <FadeIn>
            <div className="mb-6"><span className="eyebrow-pill">Internal Innovation</span></div>
            <h1 className="font-display text-6xl sm:text-7xl font-black tracking-tight leading-[0.92] mb-6 max-w-3xl" style={{ color: "var(--brand-text-heading)" }}>
              {cfg.headline}
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "var(--brand-text-muted)" }}>{cfg.subhead}</p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex flex-wrap gap-8 mt-14">
              {cfg.stats.map((s, i) => (
                <div key={i}>
                  <p className="font-display text-3xl font-black tabular-nums" style={{ color: "var(--brand-text-heading)" }}>{s.value}</p>
                  <p className="text-sm font-medium mt-0.5" style={{ color: "var(--brand-text-muted)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Experiment cards */}
      <Section alt>
        <SectionHeader eyebrow="Experiments" headline="What's Being Built" />
        <div className="space-y-8">
          {cfg.experiments.map((exp, i) => {
            const status = STATUS_CONFIG[exp.status];
            return (
              <FadeIn key={exp.id} delay={i * 80}>
                <div className="rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300" style={{ background: "var(--brand-card-bg)", border: "1px solid var(--brand-card-border)" }}>

                  {/* Card header */}
                  <div className="px-8 py-6 flex items-start justify-between gap-6" style={{ background: "var(--brand-surface)" }}>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.6rem] font-bold tracking-widest uppercase border ${status.pill}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>
                        <span className="text-xs font-medium" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>{exp.function}</span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-black leading-tight" style={{ color: "var(--brand-text-heading)" }}>{exp.title}</h2>
                    </div>
                    <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--brand-primary) 15%, transparent)", border: "1px solid color-mix(in srgb, var(--brand-primary) 25%, transparent)" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: "var(--brand-card-border)" }}>

                    {/* Left: description + why */}
                    <div className="p-8 space-y-6">
                      <div>
                        <p className="text-lg font-semibold italic mb-3" style={{ color: "var(--brand-primary)" }}>&ldquo;{exp.tagline}&rdquo;</p>
                        <p className="text-base leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{exp.description}</p>
                      </div>
                      <div className="rounded-2xl p-6" style={{ background: "var(--brand-surface)", border: "1px solid var(--brand-card-border)" }}>
                        <p className="text-[0.65rem] font-bold tracking-widest uppercase mb-3" style={{ color: "var(--brand-primary)" }}>Why It Matters</p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{exp.why}</p>
                      </div>
                    </div>

                    {/* Right: signals + meta */}
                    <div className="p-8 space-y-6">
                      <div>
                        <p className="text-[0.65rem] font-bold tracking-widest uppercase mb-4" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>What It Does</p>
                        <ul className="space-y-3">
                          {exp.signals.map((signal, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                                <circle cx="8" cy="8" r="7" fill="var(--brand-primary)" fillOpacity="0.1"/>
                                <path d="M5 8.5l2 2 4-4" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className="text-sm leading-snug" style={{ color: "var(--brand-text-muted)" }}>{signal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3 pt-4" style={{ borderTop: "1px solid var(--brand-card-border)" }}>
                        <div className="flex items-center justify-between">
                          <p className="text-[0.65rem] font-bold tracking-widest uppercase" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>Stage</p>
                          <p className="text-xs font-semibold" style={{ color: "var(--brand-text-heading)" }}>{exp.stage}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-[0.65rem] font-bold tracking-widest uppercase" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>Origin</p>
                          <p className="text-xs font-semibold" style={{ color: "var(--brand-text-heading)" }}>{exp.origin}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {cfg.closing && (
        <Section>
          <FadeIn>
            <div className="max-w-3xl">
              <div className="mb-5"><span className="eyebrow-pill">Why This Matters</span></div>
              <p className="text-lg leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{cfg.closing}</p>
            </div>
          </FadeIn>
        </Section>
      )}

      <Footer />
    </div>
  );
}
