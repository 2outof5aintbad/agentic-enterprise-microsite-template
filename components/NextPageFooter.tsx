import Link from "next/link";

interface NextPageFooterProps {
  href: string;
  label: string;
  sublabel?: string;
}

export default function NextPageFooter({ href, label, sublabel }: NextPageFooterProps) {
  return (
    <section
      className="border-t"
      style={{ background: "var(--brand-bg)", borderColor: "var(--brand-surface-border)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between gap-6">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] uppercase mb-1" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>
            {sublabel ?? "Up Next"}
          </p>
          <p className="font-display text-xl font-black" style={{ color: "var(--brand-text-heading)" }}>
            {label}
          </p>
        </div>
        <Link
          href={href}
          className="shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          style={{ background: "var(--brand-primary)", color: "var(--brand-text-on-primary)" }}
        >
          {label}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
