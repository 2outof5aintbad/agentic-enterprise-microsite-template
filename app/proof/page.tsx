"use client";

import { useState } from "react";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ProofPage() {
  const { proof } = ACCOUNT;
  const [openId, setOpenId] = useState<string | null>(proof.functions[0]?.id ?? null);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[50vh] flex flex-col justify-end">
        <div className="absolute inset-0 bg-[#0A0A0A]" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <circle cx="400" cy="100" r="300" fill="var(--brand-primary)" opacity="0.04"/>
          <circle cx="1100" cy="350" r="250" fill="var(--brand-primary)" opacity="0.03"/>
        </svg>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="hero-eyebrow mb-6">
            <span className="eyebrow-pill">Results</span>
          </div>
          <h1 className="hero-headline font-display text-5xl sm:text-6xl font-black tracking-tight leading-[0.92] mb-6 text-white">
            {proof.headline}
          </h1>
          <p className="hero-sub text-xl text-white/80 leading-relaxed max-w-2xl">{proof.opening}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      </section>

      {/* Function accordions */}
      <section className="bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-4">
          {proof.functions.map((fn, i) => {
            const isOpen = openId === fn.id;
            return (
              <FadeIn key={fn.id} delay={i * 80}>
                <div className={`rounded-2xl border transition-all duration-300 ${isOpen ? "border-[var(--brand-primary)]/40" : "border-white/8 hover:border-white/15"}`}>

                  {/* Header — always visible */}
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                    onClick={() => setOpenId(isOpen ? null : fn.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xs font-black"
                        style={{
                          background: isOpen ? "var(--brand-primary)" : `color-mix(in srgb, var(--brand-primary) 12%, transparent)`,
                          color: "var(--brand-primary)",
                        }}
                      >
                        <span className={isOpen ? "text-white" : "text-[var(--brand-primary)]"}>
                          0{i + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-display text-xl font-black text-white">{fn.name}</p>
                        <div className="flex gap-4 mt-1">
                          {fn.stats.map((stat) => (
                            <span key={stat.label} className="text-xs text-white/40">
                              <span className="text-[var(--brand-primary)] font-bold">{stat.value}</span>
                              {" "}{stat.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : "group-hover:border-white/30"}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M2 4l4 4 4-4" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>

                  {/* Expanded content */}
                  {isOpen && (
                    <div className="px-6 pb-6 border-t border-white/8 pt-5">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Agent capabilities */}
                        <div className="lg:col-span-1">
                          <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/30 mb-4">What Agents Enable</p>
                          <ul className="space-y-3">
                            {fn.agentCapabilities.map((cap, j) => (
                              <li key={j} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-[var(--brand-primary)]/15 flex items-center justify-center shrink-0 mt-0.5">
                                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden>
                                    <path d="M2 5l2.5 2.5L8 2.5" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <p className="text-sm text-white/65 leading-relaxed">{cap}</p>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Delivered results */}
                        <div className="lg:col-span-1">
                          <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/30 mb-4">Delivered Results</p>
                          <div
                            className="rounded-xl p-5 space-y-4"
                            style={{ background: `color-mix(in srgb, var(--brand-primary) 8%, #111)`, border: `1px solid color-mix(in srgb, var(--brand-primary) 20%, transparent)` }}
                          >
                            {fn.results.map((r) => (
                              <div key={r.label} className="flex items-baseline gap-3">
                                <span className="font-display text-2xl font-black text-[var(--brand-primary)] shrink-0">{r.metric}</span>
                                <span className="text-xs text-white/55 leading-snug">{r.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quote */}
                        {fn.quote && (
                          <div className="lg:col-span-1">
                            <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/30 mb-4">In Their Words</p>
                            <div className="bg-white/[0.04] border border-white/8 rounded-xl p-5 h-full flex flex-col justify-between">
                              <p className="text-sm text-white/75 leading-relaxed italic mb-4">
                                &ldquo;{fn.quote.text}&rdquo;
                              </p>
                              <p className="text-[0.65rem] font-bold text-white/35 tracking-wide">{fn.quote.attribution}</p>
                            </div>
                          </div>
                        )}

                        {/* Span the quote placeholder if no quote */}
                        {!fn.quote && (
                          <div className="lg:col-span-1">
                            <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/30 mb-4">Scale</p>
                            <div className="space-y-3">
                              {fn.stats.map((stat) => (
                                <div key={stat.label} className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
                                  <p className="font-display text-2xl font-black text-white mb-1">{stat.value}</p>
                                  <p className="text-xs text-white/45 leading-snug">{stat.label}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Cross-link to business case */}
      <section className="bg-[#0A0A0A] border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm text-white/40 mb-1">Next</p>
            <p className="text-lg font-display font-black text-white">The Business Case</p>
          </div>
          <Link
            href="/business-case"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-white font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
          >
            See the Numbers
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
