import type { Metadata } from "next";
import Link from "next/link";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: ACCOUNT.businessCase.meta.title };

export default function BusinessCasePage() {
  const { businessCase, gap } = ACCOUNT;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav />

      <Hero
        eyebrow="The Business Case"
        headline={businessCase.headline.replace(/^.*:\s*/, "")}
        subheadline={businessCase.subhead}
        ctaPrimary={{ label: "Meet the Account Team", href: "/account-team" }}
        ctaSecondary={{ label: "See the Pilot Plan", href: "/pilot" }}
      />

      {/* Burning Platform */}
      <section className="bg-[var(--brand-light)] border-t border-black/6">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <div className="mb-14">
              <div className="mb-5">
                <span className="eyebrow-pill-outline">The Problem</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#0A0A0A] tracking-tight leading-[0.95] mb-4 max-w-3xl">
                {gap.headline}
              </h2>
              <p className="text-lg text-[#3D3D3D] max-w-2xl leading-relaxed">{gap.body}</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {gap.stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 80}>
                <div className="bg-white border border-black/8 rounded-2xl p-6">
                  <p className="font-display text-4xl font-black text-[var(--brand-primary)] mb-2">{stat.value}</p>
                  <p className="text-sm font-bold text-[#0A0A0A] mb-1">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Lines */}
      <section className="bg-white border-t border-black/6">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <div className="mb-14">
              <div className="mb-5">
                <span className="eyebrow-pill-outline">{businessCase.ask}</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#0A0A0A] tracking-tight leading-[0.95] mb-4 max-w-2xl">
                Each investment stands alone.<br />Together, they change the operating model.
              </h2>
              <p className="text-lg text-[#3D3D3D] max-w-xl leading-relaxed">{businessCase.askNote}</p>
            </div>
          </FadeIn>

          <div className="space-y-4 mb-10">
            {businessCase.investmentLines.map((line, i) => (
              <FadeIn key={line.product} delay={i * 80}>
                <div className="flex items-center gap-6 bg-[var(--brand-light)] border border-black/8 rounded-2xl px-7 py-5">
                  <div className="shrink-0 w-2 h-10 rounded-full bg-[var(--brand-primary)]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-[#0A0A0A]">{line.product}</p>
                    <p className="text-xs text-[#3D3D3D]">{line.stage} · {line.status}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={200}>
            <div className="bg-[#0A0A0A] rounded-2xl p-8">
              <p className="text-[0.65rem] font-bold tracking-widest uppercase text-white/30 mb-3">Why consolidate</p>
              <p className="text-xl font-display font-black text-white mb-3 leading-snug">
                Separate conversations become separate procurement cycles, separate stakeholder alignments, and separate timelines.
              </p>
              <p className="text-base text-white/60 leading-relaxed">
                One integrated conversation — structured around the right moment — creates more value than the sum of its parts.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Value Unlocked */}
      <section className="bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <div className="mb-14">
              <div className="mb-5">
                <span className="eyebrow-pill">The Value at Stake</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-[0.95] mb-4 max-w-2xl">
                This is what inaction costs.
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {businessCase.valueUnlocked.map((v, i) => (
              <FadeIn key={v.label} delay={i * 80}>
                <div className="border border-white/8 rounded-2xl p-7 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-200">
                  <p className="text-xs font-bold tracking-widest uppercase text-[var(--brand-primary)]/70 mb-3">{v.label}</p>
                  <p className="font-display text-5xl font-black text-white mb-3">{v.value}</p>
                  <p className="text-sm text-white/55 leading-relaxed">{v.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Client Zero / Unique Position */}
      {businessCase.clientZeroNote && (
        <section className="relative overflow-hidden bg-[var(--brand-primary)]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <circle cx="1200" cy="200" r="300" stroke="white" strokeWidth="1" fill="none" opacity="0.06"/>
          </svg>
          <div className="relative max-w-6xl mx-auto px-6 py-20">
            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="mb-6">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border-2 border-white/40 text-white text-[0.65rem] font-bold tracking-[0.18em] uppercase">
                      Unique Position
                    </span>
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-5">
                    Why this account is different.
                  </h2>
                  <p className="text-lg text-white/80 leading-relaxed">{businessCase.clientZeroNote}</p>
                </div>
                {businessCase.windowNote && (
                  <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
                    <p className="text-[0.65rem] font-bold tracking-widest uppercase text-white/50 mb-3">The Window</p>
                    <p className="text-base text-white/90 leading-relaxed">{businessCase.windowNote}</p>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#0A0A0A] border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm text-white/40 mb-1">Next</p>
            <p className="font-display text-lg font-black text-white">90-Day Pilot Path</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pilot"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-white font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
            >
              See the Pilot Plan
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="/account-team"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-base transition-all duration-200 hover:border-white/40 hover:-translate-y-0.5"
            >
              Meet the Account Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
