"use client";

import { useState } from "react";
import Link from "next/link";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

export default function UseCasesPage() {
  const { useCases } = ACCOUNT;
  const [activeId, setActiveId] = useState(useCases.cases[0].id);
  const active = useCases.cases.find((uc) => uc.id === activeId)!;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[50vh] flex flex-col justify-end">
        <div className="absolute inset-0 bg-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_40%,var(--brand-primary)/0.08,transparent)] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="hero-eyebrow mb-6">
            <span className="eyebrow-pill">Use Cases</span>
          </div>
          <h1 className="hero-headline text-5xl sm:text-6xl font-display font-black tracking-tight leading-[0.92] mb-6 text-white">
            {useCases.headline}
          </h1>
          <p className="hero-sub text-xl text-white/80 leading-relaxed max-w-2xl">{useCases.opening}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      </section>

      {/* Interactive use case selector */}
      <section className="bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex gap-2 flex-wrap mb-10">
            {useCases.cases.map((uc) => (
              <button
                key={uc.id}
                onClick={() => setActiveId(uc.id)}
                className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 ${
                  activeId === uc.id
                    ? "bg-[var(--brand-primary)] shadow-md"
                    : "border border-white/15 text-white/60 hover:text-white hover:border-white/30"
                }`}
                style={activeId === uc.id ? { color: "var(--brand-text-on-primary)" } : {}}
              >
                {uc.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="text-[0.65rem] font-bold tracking-widest uppercase text-[var(--brand-primary)] mb-4">Use Case</div>
              <h2 className="text-3xl font-display font-black text-white mb-4">{active.title}</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Challenge</p>
                  <p className="text-sm text-white/70 leading-relaxed">{active.challenge}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">What the Agent Does</p>
                  <p className="text-sm text-white/70 leading-relaxed">{active.what}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Business Value</p>
                  <p className="text-sm text-white/70 leading-relaxed">{active.value}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Systems Involved</p>
                <div className="flex flex-wrap gap-2">
                  {active.systems.map((sys) => (
                    <span key={sys} className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20">
                      {sys}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6">
              <p className="text-xs font-bold tracking-widest uppercase text-[var(--brand-primary)] mb-4">Agent Workflow</p>
              <p className="text-sm text-white/65 leading-relaxed">{active.workflow}</p>
              <div className="mt-6 pt-6 border-t border-white/8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M2 7l3 3 7-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Outcome</p>
                    <p className="text-sm text-white/75 leading-relaxed">{active.value}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="bg-[var(--brand-light)]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <div className="mb-14">
              <div className="mb-5">
                <span className="eyebrow-pill-outline">{useCases.beforeAfter.headline}</span>
              </div>
            </div>
          </FadeIn>
          <div className="space-y-8">
            {useCases.beforeAfter.workflows.map((wf, i) => (
              <FadeIn key={wf.title} delay={i * 80}>
                <div className="border border-black/8 rounded-2xl overflow-hidden bg-white">
                  <div className="bg-[var(--brand-primary)] px-6 py-4">
                    <p className="text-sm font-bold text-white">{wf.title}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="p-6 border-b sm:border-b-0 sm:border-r border-black/6">
                      <p className="text-[0.65rem] font-bold tracking-widest uppercase text-black/35 mb-3">Before</p>
                      <p className="text-sm text-[#3D3D3D] leading-relaxed">{wf.before}</p>
                    </div>
                    <div className="p-6" style={{ background: "color-mix(in srgb, var(--brand-primary) 4%, transparent)" }}>
                      <p className="text-[0.65rem] font-bold tracking-widest uppercase text-[var(--brand-primary)] mb-3">After</p>
                      <p className="text-sm text-[#0A0A0A] leading-relaxed font-medium">{wf.after}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Value levers */}
      <section className="bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <div className="mb-12">
              <div className="mb-5">
                <span className="eyebrow-pill">{useCases.valueLevers.headline}</span>
              </div>
              <p className="text-lg text-white/50 max-w-2xl leading-relaxed italic">{useCases.valueLevers.disclaimer}</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.valueLevers.levers.map((lever, i) => (
              <FadeIn key={lever.title} delay={i * 60}>
                <div className="border border-white/8 rounded-xl p-5 bg-white/[0.03] h-full">
                  <p className="text-sm font-bold text-white mb-2">{lever.title}</p>
                  <p className="text-sm text-white/55 leading-relaxed">{lever.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Nav to pilot */}
      <section className="bg-[#0A0A0A] border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm text-white/40 mb-1">Next</p>
            <p className="text-lg font-display font-black text-white">90-Day Pilot Path</p>
          </div>
          <Link
            href="/pilot"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{ color: "var(--brand-text-on-primary)" }}
          >
            See the Pilot Plan
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
