import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: ACCOUNT.pilotPlan.meta.title };

export default function PilotPage() {
  const { pilotPlan, cta } = ACCOUNT;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[50vh] flex flex-col justify-end">
        <div className="absolute inset-0 bg-[#0A0A0A]" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <circle cx="200" cy="300" r="250" fill="var(--brand-primary)" opacity="0.05"/>
        </svg>

        {/* Agent robot — floats right, fades into bg */}
        <div className="absolute right-0 bottom-0 w-72 sm:w-96 h-full pointer-events-none hidden sm:block" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0A0A0A] z-10" />
          <div className="absolute bottom-0 right-8 z-0 opacity-25">
            <Image
              src="/images/img-agent-1.webp"
              alt=""
              width={320}
              height={380}
              className="object-contain object-bottom"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="hero-eyebrow mb-6">
            <span className="eyebrow-pill">Getting Started</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-black tracking-tight leading-[0.92] mb-6 text-white">
            {pilotPlan.headline}
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl">{pilotPlan.cta}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      </section>

      {/* Pilot phases */}
      <section className="bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pilotPlan.phases.map((phase, i) => (
              <FadeIn key={phase.phase} delay={i * 100}>
                <div
                  className="rounded-2xl p-6 h-full border"
                  style={{
                    background: i === 0 ? "var(--brand-primary)" : i === 1 ? "var(--brand-primary-dark)" : "color-mix(in srgb, var(--brand-primary-dark) 70%, black)",
                    borderColor: i === 0 ? "var(--brand-primary)" : i === 1 ? "var(--brand-primary-dark)" : "color-mix(in srgb, var(--brand-primary-dark) 70%, black)",
                  }}
                >
                  <div className="text-[0.65rem] font-bold tracking-widest uppercase text-white/60 mb-1">{phase.phase} · {phase.weeks}</div>
                  <p className="font-display text-2xl font-black text-white mb-5">{phase.title}</p>
                  <ul className="space-y-3">
                    {phase.steps.map((step, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden>
                            <path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-sm text-white/85 leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-10 bg-white/[0.04] border border-white/10 rounded-2xl px-8 py-6 text-center max-w-2xl mx-auto">
              <p className="font-display text-lg font-black text-white leading-relaxed">{pilotPlan.cta}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--brand-primary)]">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <FadeIn>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-[0.92] mb-6 max-w-3xl mx-auto">
              {cta.headline}
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">{cta.body}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={cta.primary.href}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-[var(--brand-primary)] font-bold text-base transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5"
              >
                {cta.primary.label}
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href={cta.secondary.href}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 border-white/50 hover:border-white text-white font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
              >
                {cta.secondary.label}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
