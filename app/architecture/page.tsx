import type { Metadata } from "next";
import Link from "next/link";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: ACCOUNT.architecture.meta.title };

const LAYER_ICONS = [
  // Outcomes — trophy
  <svg key="outcomes" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M10 13c-3.3 0-6-2.7-6-6V3h12v4c0 3.3-2.7 6-6 6zM7 17h6M10 13v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 5H2M16 5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // Work Surfaces — monitor
  <svg key="surfaces" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <rect x="2" y="3" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // Agent Layer — cpu/chip
  <svg key="agents" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <rect x="6" y="6" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 9H3M6 11H3M14 9h3M14 11h3M9 6V3M11 6V3M9 14v3M11 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // Intelligence — brain/sparkle
  <svg key="intelligence" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M10 3l1.5 3.5 3.5 1-3.5 1.5L10 12.5 8.5 9 5 8l3.5-1.5L10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M4 15l.75 1.75L6.5 17l-1.75.75L4 19.5l-.75-1.75L1.5 17l1.75-.75L4 15z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>,
  // Data Foundation — database
  <svg key="data" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <ellipse cx="10" cy="5" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 5v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 10v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>,
  // Systems of Record — server stack
  <svg key="systems" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <rect x="2" y="3" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="2" y="12" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="5.5" cy="5.5" r="1" fill="currentColor"/>
    <circle cx="5.5" cy="14.5" r="1" fill="currentColor"/>
  </svg>,
];

export default function ArchitecturePage() {
  const { architecture } = ACCOUNT;
  const totalLayers = architecture.layers.length;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[50vh] flex flex-col justify-end">
        <div className="absolute inset-0 bg-[#0A0A0A]" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <circle cx="720" cy="200" r="400" fill="var(--brand-primary)" opacity="0.04"/>
        </svg>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="hero-eyebrow mb-6">
            <span className="eyebrow-pill">Architecture</span>
          </div>
          <h1 className="hero-headline font-display text-5xl sm:text-6xl font-black tracking-tight leading-[0.92] mb-6 text-white">
            {architecture.headline}
          </h1>
          <p className="hero-sub text-xl text-white/80 leading-relaxed max-w-2xl">{architecture.opening}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      </section>

      {/* Layered stack */}
      <section className="bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="space-y-3">
            {architecture.layers.map((layer, i) => {
              const isTop = i === 0;
              const isBottom = i === totalLayers - 1;
              const depth = totalLayers - i;
              const opacity = 0.15 + (i / (totalLayers - 1)) * 0.85;

              return (
                <FadeIn key={layer.name} delay={i * 80}>
                  <div
                    className="relative rounded-2xl border overflow-hidden"
                    style={{
                      borderColor: `color-mix(in srgb, var(--brand-primary) ${Math.round(opacity * 35)}%, transparent)`,
                      background: isTop
                        ? "var(--brand-primary)"
                        : isBottom
                        ? `color-mix(in srgb, var(--brand-primary) 6%, #111)`
                        : `color-mix(in srgb, var(--brand-primary) ${Math.round((1 - i / totalLayers) * 18 + 4)}%, #111)`,
                    }}
                  >
                    {/* Layer number badge */}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                      <span className="text-[0.55rem] font-bold tracking-[0.25em] uppercase text-white/20">
                        Layer {depth}
                      </span>
                    </div>

                    <div className="flex items-center gap-5 px-6 py-5">
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `color-mix(in srgb, var(--brand-primary) ${isTop ? "25" : "15"}%, transparent)` }}
                      >
                        <span style={{ color: "var(--brand-primary)" }}>
                          {LAYER_ICONS[i] ?? LAYER_ICONS[0]}
                        </span>
                      </div>

                      {/* Name + tagline */}
                      <div className="w-52 shrink-0">
                        <p className={`font-display text-lg font-black leading-tight ${isTop ? "text-white" : "text-white"}`}>
                          {layer.name}
                        </p>
                        <p className={`text-xs mt-0.5 ${isTop ? "text-white/70" : "text-white/35"}`}>
                          {layer.tagline}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="w-px self-stretch bg-white/10 shrink-0 hidden sm:block" />

                      {/* Products */}
                      <div className="hidden sm:flex flex-wrap gap-2">
                        {layer.products.map((p) => (
                          <span
                            key={p}
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{
                              background: isTop
                                ? "rgba(255,255,255,0.2)"
                                : `color-mix(in srgb, var(--brand-primary) 12%, transparent)`,
                              color: isTop ? "white" : "var(--brand-primary)",
                              border: isTop ? "1px solid rgba(255,255,255,0.25)" : "1px solid color-mix(in srgb, var(--brand-primary) 20%, transparent)",
                            }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mobile products row */}
                    <div className="sm:hidden px-6 pb-4 flex flex-wrap gap-2">
                      {layer.products.map((p) => (
                        <span
                          key={p}
                          className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: isTop ? "rgba(255,255,255,0.2)" : `color-mix(in srgb, var(--brand-primary) 12%, transparent)`,
                            color: isTop ? "white" : "var(--brand-primary)",
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Note */}
          {architecture.note && (
            <FadeIn>
              <div className="mt-10 border border-white/8 rounded-2xl p-6 bg-white/[0.03]">
                <p className="text-sm text-white/55 leading-relaxed italic">{architecture.note}</p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Cross-link to strategy */}
      <section className="bg-[#0A0A0A] border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm text-white/40 mb-1">Next</p>
            <p className="text-lg font-display font-black text-white">Transformation Strategy</p>
          </div>
          <Link
            href="/strategy"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{ color: "var(--brand-text-on-primary)" }}
          >
            See the Framework
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
