"use client";

import Link from "next/link";
import Image from "next/image";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Section from "@/components/Section";

const TRUST_ITEMS = [
  { name: "Zero Data Retention", desc: "No PII stored in the LLM layer" },
  { name: "PII Masking",         desc: "Automatic before any AI call" },
  { name: "Toxicity Detection",  desc: "Input and output screening" },
  { name: "Full Audit Trail",    desc: "Every agent action logged" },
  { name: "FLS Enforced",        desc: "Field-level security at the API layer" },
  { name: "Sharing Rules",       desc: "Salesforce permissions travel with data" },
];

export default function Headless360Page() {
  const cfg = ACCOUNT.headless360;

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-bg)" }}>
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--brand-surface-border)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 10%, transparent) 0%, transparent 60%)" }} />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: text */}
            <div>
              <FadeIn>
                <div className="mb-6"><span className="eyebrow-pill">Platform Architecture</span></div>
                <h1 className="font-display text-5xl sm:text-6xl font-black tracking-tight leading-[0.88] mb-6" style={{ color: "var(--brand-text-heading)" }}>
                  Headless 360.
                </h1>
                <p className="text-xl font-semibold mb-4 leading-snug" style={{ color: "var(--brand-primary)" }}>
                  {cfg.tagline}
                </p>
                <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--brand-text-muted)" }}>
                  {cfg.intro}
                </p>
              </FadeIn>

              <FadeIn delay={100}>
                <div className="flex flex-wrap items-center gap-3">
                  {["Any coding agent or IDE", "Any UI framework", "Any surface"].map((item, i) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="inline-flex items-center px-4 py-2 rounded-full border font-bold text-sm" style={{ borderColor: "var(--brand-primary)", color: "var(--brand-primary)", background: "color-mix(in srgb, var(--brand-primary) 8%, transparent)" }}>
                        {item}
                      </span>
                      {i < 2 && <span className="text-lg font-light" style={{ color: "var(--brand-text-muted)" }}>+</span>}
                    </div>
                  ))}
                  <span className="text-lg font-light mx-1" style={{ color: "var(--brand-text-muted)" }}>=</span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full font-bold text-sm" style={{ background: "var(--brand-primary)", color: "var(--brand-text-on-primary)" }}>
                    One platform. Any agent.
                  </span>
                </div>
              </FadeIn>
            </div>

            {/* Right: looping video */}
            <FadeIn delay={80} className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid var(--brand-surface-border)", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}>
                <video
                  src="/images/headlessloop.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block"
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 10%, transparent) 0%, transparent 50%)" }} />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Why it matters for this account */}
      <section style={{ background: "var(--brand-surface)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="mb-12 max-w-xl">
              <div className="mb-5"><span className="eyebrow-pill-outline">The Problem It Solves</span></div>
              <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-[0.95] mb-4" style={{ color: "var(--brand-text-heading)" }}>
                {cfg.problemHeadline}
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{cfg.problemBody}</p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-3" style={{ gap: "var(--brand-density-gap)" }}>
            {cfg.stats.map((item, i) => (
              <FadeIn key={item.label} delay={i * 80}>
                <div className="rounded-[var(--brand-radius)] border h-full flex flex-col" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", padding: "var(--brand-density-pad)" }}>
                  <p className="font-display text-5xl font-black mb-3 tabular-nums" style={{ color: "var(--brand-primary)" }}>{item.stat}</p>
                  <p className="text-base leading-snug" style={{ color: "var(--brand-text-muted)" }}>{item.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="border-t" style={{ background: "var(--brand-bg)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <div className="mb-16 max-w-xl">
              <div className="mb-5"><span className="eyebrow-pill">Three Pillars</span></div>
              <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-[0.95] mb-4" style={{ color: "var(--brand-text-heading)" }}>
                One platform. Three dimensions of openness.
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>
                Headless 360 isn&apos;t a product — it&apos;s a design principle. Salesforce works the way {ACCOUNT.company}&apos;s engineers, operators, and customers already work.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-6">
            {cfg.pillars.map((pillar, i) => (
              <FadeIn key={pillar.number} delay={i * 80}>
                <div className="rounded-[var(--brand-radius)] border overflow-hidden" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)" }}>
                  <div className="grid lg:grid-cols-[1fr_320px]">
                    <div style={{ padding: "var(--brand-density-pad)" }}>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="font-display text-3xl font-black tabular-nums" style={{ color: "var(--brand-primary)", opacity: 0.4 }}>{pillar.number}</span>
                        <div>
                          <div className="text-[0.65rem] font-bold tracking-widest uppercase mb-0.5" style={{ color: "var(--brand-text-muted)" }}>{pillar.eyebrow}</div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.6rem] font-bold tracking-wide border" style={{ borderColor: "var(--brand-primary)", color: "var(--brand-primary)", background: "color-mix(in srgb, var(--brand-primary) 8%, transparent)" }}>
                            {pillar.tag}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-display text-2xl font-black mb-3 leading-tight" style={{ color: "var(--brand-text-heading)" }}>{pillar.headline}</h3>
                      <p className="text-base leading-relaxed mb-4" style={{ color: "var(--brand-text-muted)" }}>{pillar.body}</p>
                      <p className="text-sm leading-relaxed italic" style={{ color: "var(--brand-text-muted)", opacity: 0.75 }}>{pillar.detail}</p>
                    </div>
                    <div className="border-t lg:border-t-0 lg:border-l p-6 flex flex-col justify-center" style={{ borderColor: "var(--brand-surface-border)", background: "color-mix(in srgb, var(--brand-primary) 4%, transparent)" }}>
                      <p className="text-[0.65rem] font-bold tracking-widest uppercase mb-4" style={{ color: "var(--brand-text-muted)" }}>Capabilities</p>
                      <ul className="space-y-3">
                        {pillar.capabilities.map((cap, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                              <circle cx="7" cy="7" r="6" fill="var(--brand-primary)" fillOpacity="0.15"/>
                              <path d="M4.5 7.5l1.5 1.5 3.5-3.5" stroke="var(--brand-primary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-xs font-medium leading-snug" style={{ color: "var(--brand-text-muted)" }}>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {cfg.architectureImage && (
            <FadeIn delay={200}>
              <div className="mt-10 rounded-[var(--brand-radius)] border overflow-hidden" style={{ borderColor: "var(--brand-card-border)" }}>
                <div className="px-6 pt-6 pb-3 border-b" style={{ borderColor: "var(--brand-surface-border)" }}>
                  <p className="text-[0.65rem] font-bold tracking-widest uppercase" style={{ color: "var(--brand-text-muted)" }}>Platform Reference Architecture</p>
                </div>
                <Image src={cfg.architectureImage} alt="Headless 360 platform reference architecture" width={1200} height={675} className="w-full h-auto" />
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Account-specific plays */}
      {cfg.plays && cfg.plays.length > 0 && (
        <section className="relative overflow-hidden" style={{ background: "var(--brand-primary)" }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <path d="M-100 280 Q300 140 600 200 Q900 260 1200 100 Q1360 30 1600 160" stroke="white" strokeWidth="130" strokeLinecap="round" fill="none" opacity="0.06"/>
          </svg>
          <div className="relative max-w-6xl mx-auto px-6 py-24">
            <FadeIn>
              <div className="mb-12">
                <div className="mb-5">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border-2 border-white/40 text-white text-[0.65rem] font-bold tracking-[0.18em] uppercase">
                    {cfg.playsEyebrow ?? "The Plays"}
                  </span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-[0.95] mb-4 max-w-2xl">
                  {cfg.playsHeadline}
                </h2>
                {cfg.playsSubhead && (
                  <p className="text-lg text-white/80 leading-relaxed max-w-2xl">{cfg.playsSubhead}</p>
                )}
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-3 gap-5">
              {cfg.plays.map((play, i) => (
                <FadeIn key={play.label} delay={i * 80}>
                  <div className="h-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col">
                    <div className="text-[0.6rem] font-bold tracking-widest uppercase text-white/50 mb-2">{play.category}</div>
                    <h3 className="font-display text-xl font-black text-white mb-3 leading-tight">{play.label}</h3>
                    <p className="text-sm text-white/80 leading-relaxed flex-1 mb-5">{play.description}</p>
                    <div className="flex items-center gap-2">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <rect x="1" y="1" width="4" height="4" rx="1" fill="white" fillOpacity="0.6"/>
                        <rect x="7" y="1" width="4" height="4" rx="1" fill="white" fillOpacity="0.6"/>
                        <rect x="1" y="7" width="4" height="4" rx="1" fill="white" fillOpacity="0.6"/>
                        <rect x="7" y="7" width="4" height="4" rx="1" fill="white" fillOpacity="0.4"/>
                      </svg>
                      <span className="text-[0.65rem] text-white/50 font-medium">{play.surface}</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust & Governance */}
      <Section alt>
        <FadeIn>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-5"><span className="eyebrow-pill">Trust &amp; Governance</span></div>
              <h2 className="font-display text-4xl font-black tracking-tight leading-[0.95] mb-5" style={{ color: "var(--brand-text-heading)" }}>
                {cfg.trustHeadline}
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--brand-text-muted)" }}>{cfg.trustBody}</p>
              {cfg.trustClosing && (
                <p className="text-base leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{cfg.trustClosing}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {TRUST_ITEMS.map((item, i) => (
                <FadeIn key={item.name} delay={i * 60}>
                  <div className="rounded-[var(--brand-radius)] border p-4" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)" }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <circle cx="7" cy="7" r="6" fill="var(--brand-primary)" fillOpacity="0.15"/>
                        <path d="M4.5 7.5l1.5 1.5 3.5-3.5" stroke="var(--brand-primary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-sm font-bold" style={{ color: "var(--brand-text-heading)" }}>{item.name}</p>
                    </div>
                    <p className="text-xs leading-snug" style={{ color: "var(--brand-text-muted)" }}>{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Strategic close */}
      <Section>
        <FadeIn>
          <div className="max-w-3xl">
            <div className="mb-5"><span className="eyebrow-pill-outline">The Strategic Takeaway</span></div>
            <blockquote className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-[0.95] mb-8" style={{ color: "var(--brand-text-heading)" }}>
              {cfg.closingQuote}
            </blockquote>
            {cfg.closingBody && cfg.closingBody.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed mb-4" style={{ color: "var(--brand-text-muted)" }}>{para}</p>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* CTA */}
      <section className="border-t" style={{ background: "var(--brand-surface)", borderColor: "var(--brand-surface-border)" }}>
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <FadeIn>
            <div>
              <p className="text-sm font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "var(--brand-text-muted)" }}>Ready to go deeper?</p>
              <p className="font-display text-3xl font-black leading-tight mb-2" style={{ color: "var(--brand-text-heading)" }}>Meet your Salesforce team.</p>
              <p className="text-base max-w-sm" style={{ color: "var(--brand-text-muted)" }}>The people behind this platform — sales, engineering, architecture, and customer success — ready to move forward with you.</p>
            </div>
          </FadeIn>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Link href="/account-team" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5" style={{ background: "var(--brand-primary)", color: "var(--brand-text-on-primary)" }}>
              Meet the Team
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
