import Link from "next/link";
import type { Metadata } from "next";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ActCard from "@/components/ActCard";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: `${ACCOUNT.hero.headline.replace(/\n/g, " ")} · ${ACCOUNT.company} Executive Briefing`,
  description: ACCOUNT.hero.subheadline,
};

export default function HomePage() {
  const { hero, platformInvestments, gap, acts } = ACCOUNT;

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <Nav />

      <Hero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subheadline={hero.subheadline}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
        variant="home"
      />

      {/* ── Platform Footprint ── */}
      <section className="bg-white border-t border-black/6">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <div className="mb-12">
              <div className="mb-5">
                <span className="eyebrow-pill">The Platform Footprint</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-[0.95] text-[#0A0A0A] mb-4 max-w-2xl">
                The investment is made.
              </h2>
              <p className="text-lg text-[#3D3D3D] max-w-xl leading-relaxed">
                {ACCOUNT.company} has built a Salesforce platform. Two capabilities are the key to unlocking everything else.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {platformInvestments.map((inv, i) => (
              <FadeIn key={inv.product} delay={i * 55}>
                <div className={`relative rounded-2xl p-6 h-full border transition-all ${
                  inv.highlight
                    ? "border-[var(--brand-primary)] shadow-xl"
                    : "bg-[var(--brand-light)] border-black/6 hover:border-black/12 hover:shadow-sm"
                }`}
                  style={inv.highlight ? { background: "var(--brand-primary)" } : {}}
                >
                  <div className={`text-[10px] font-bold tracking-widest uppercase mb-4 ${inv.highlight ? "text-white/70" : "text-black/35"}`}>
                    {inv.category}
                  </div>
                  <p className={`font-display text-lg font-black mb-1 leading-tight ${inv.highlight ? "text-white" : "text-[#0A0A0A]"}`}>{inv.product}</p>
                  <p className={`text-xs leading-snug ${inv.highlight ? "text-white/85" : "text-[#3D3D3D]"}`}>{inv.role}</p>
                  {inv.highlight && (
                    <p className="text-xs text-white/70 mt-3 leading-snug font-medium">Key to unlocking the full portfolio</p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Gap ── */}
      <section className="relative overflow-hidden" style={{ background: "var(--brand-primary)" }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <path d="M-100 280 Q300 140 600 200 Q900 260 1200 100 Q1360 30 1600 160" stroke="white" strokeWidth="130" strokeLinecap="round" fill="none" opacity="0.07"/>
        </svg>

        <div className="relative max-w-6xl mx-auto px-6 py-28">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <div className="mb-6">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border-2 border-white/40 text-white text-[0.65rem] font-bold tracking-[0.18em] uppercase">
                  The Core Problem
                </span>
              </div>
              <h2 className="font-display text-5xl sm:text-7xl font-black text-white tracking-tight leading-[0.88] mb-5">{gap.headline}</h2>
              <p className="text-xl text-white/90 font-medium mb-6">{gap.subhead}</p>
              <p className="text-lg text-white/80 leading-relaxed mb-16 max-w-2xl mx-auto">{gap.body}</p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {gap.stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 100}>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-8 text-center">
                    <p className="font-display text-4xl font-black text-white mb-2 tabular-nums">{stat.value}</p>
                    <p className="text-base text-white/85 leading-snug font-medium">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Three Chapters ── */}
      <section className="bg-[var(--brand-light)]" id="acts">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <div className="mb-14">
              <div className="mb-5">
                <span className="eyebrow-pill-outline">The Transformation Story</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#0A0A0A] mb-4 tracking-tight leading-[0.95]">
                Three chapters. One outcome.
              </h2>
              <p className="text-lg text-[#3D3D3D] max-w-xl leading-relaxed">
                A transformation story — from where {ACCOUNT.company} is today to where it could operate tomorrow.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {acts.map((act, i) => (
              <FadeIn key={act.number} delay={i * 100}>
                <ActCard number={act.number} href={act.href} title={act.title} tagline={act.tagline} description={act.description} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore Further ── */}
      <section className="bg-[var(--brand-bg)] border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <FadeIn>
            <div className="mb-12">
              <div className="mb-5">
                <span className="eyebrow-pill">Go Deeper</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-[0.95] mb-4">
                Explore the full picture.
              </h2>
              <p className="text-lg text-white/55 max-w-xl leading-relaxed">
                Every dimension of the transformation — from architecture to agents to business case.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { href: "/architecture",  label: "Architecture",   desc: "The layered platform stack" },
              { href: "/strategy",      label: "Strategy",       desc: "Transformation framework" },
              { href: "/agents",        label: "Agents",         desc: "Purpose-built for your team" },
              { href: "/agent-tracker", label: "Agent Tracker",  desc: "What's live and in motion" },
              { href: "/proof",         label: "Results",        desc: "Outcomes by function" },
              { href: "/use-cases",     label: "Use Cases",      desc: "Specific workflows transformed" },
              { href: "/business-case", label: "Business Case",  desc: "The investment and the return" },
              { href: "/pilot",         label: "Pilot Plan",     desc: "90-day path to production" },
            ].map((item, i) => (
              <FadeIn key={item.href} delay={i * 40}>
                <Link
                  href={item.href}
                  className="group flex flex-col gap-1.5 p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-[var(--brand-primary)]/40 hover:bg-white/[0.06] transition-all duration-200"
                >
                  <p className="font-display text-base font-black text-white group-hover:text-[var(--brand-primary)] transition-colors duration-200 leading-tight">
                    {item.label}
                  </p>
                  <p className="text-xs text-white/40 leading-snug">{item.desc}</p>
                  <div className="mt-2 flex items-center gap-1 text-[0.6rem] font-bold text-white/20 group-hover:text-[var(--brand-primary)]/60 transition-colors duration-200">
                    Explore
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden className="group-hover:translate-x-0.5 transition-transform duration-200">
                      <path d="M2.5 6h7M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[var(--brand-bg)] border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <FadeIn>
            <div>
              <h2 className="font-display text-3xl font-black text-white leading-tight mb-3">{ACCOUNT.cta.headline}</h2>
              <p className="text-base text-white/70 max-w-lg">{ACCOUNT.cta.body}</p>
            </div>
          </FadeIn>
          <div className="flex gap-3 flex-wrap shrink-0">
            <Link
              href={ACCOUNT.cta.primary.href}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-bold text-base transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              style={{ background: "var(--brand-primary)" }}
            >
              {ACCOUNT.cta.primary.label}
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
