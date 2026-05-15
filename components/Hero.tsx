import Link from "next/link";

interface HeroProps {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  variant?: "home" | "act";
}

export default function Hero({ eyebrow, headline, subheadline, ctaPrimary, ctaSecondary, variant = "act" }: HeroProps) {
  const isHome = variant === "home";

  return (
    <section className="relative overflow-hidden min-h-[88vh] flex flex-col justify-end">

      {isHome && (
        <>
          {/* Place account hero image at /public/images/hero.jpg */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/20 via-[var(--brand-bg)] to-[var(--brand-bg)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg)] via-[var(--brand-bg)]/60 to-transparent" />
        </>
      )}

      {!isHome && (
        <>
          <div className="absolute inset-0 bg-[#0A0A0A]" />
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <path d="M-100 380 Q200 220 500 300 Q800 380 1100 200 Q1300 100 1600 260" stroke="var(--brand-primary)" strokeWidth="200" strokeLinecap="round" fill="none" opacity="0.05"/>
            <path d="M-100 500 Q200 340 500 420 Q800 500 1100 320 Q1300 220 1600 380" stroke="var(--brand-primary)" strokeWidth="80" strokeLinecap="round" fill="none" opacity="0.03"/>
          </svg>
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-28 w-full">
        {eyebrow && (
          <div className="hero-eyebrow mb-6">
            <span className="eyebrow-pill">{eyebrow}</span>
          </div>
        )}

        <h1
          className={`hero-headline font-display font-black tracking-tight leading-[0.92] mb-6 max-w-4xl text-white ${
            isHome ? "text-7xl sm:text-[5.5rem]" : "text-6xl sm:text-7xl"
          }`}
          style={{ whiteSpace: "pre-line" }}
        >
          {headline}
        </h1>

        <p className="hero-sub text-xl text-white/90 leading-relaxed mb-10 max-w-2xl">
          {subheadline}
        </p>

        {(ctaPrimary || ctaSecondary) && (
          <div className="hero-ctas flex flex-wrap gap-4">
            {ctaPrimary && (
              <Link
                href={ctaPrimary.href}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-white font-bold text-base transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5"
              >
                {ctaPrimary.label}
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 border-white/40 hover:border-white bg-transparent hover:bg-white/10 text-white font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
              >
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
    </section>
  );
}
