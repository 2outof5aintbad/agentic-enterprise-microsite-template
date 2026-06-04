import Link from "next/link";

interface ActCardProps {
  number: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
}

export default function ActCard({ number, title, tagline, description, href }: ActCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col h-full p-8 rounded-[var(--brand-radius)] border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
      style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", boxShadow: "var(--brand-card-shadow)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[var(--brand-radius)] bg-[var(--brand-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="mb-5">
        <span className="eyebrow-pill">{number}</span>
      </div>

      <h3 className="font-display text-2xl font-black mb-2 leading-tight" style={{ color: "var(--brand-text-heading)" }}>{title}</h3>
      <p className="text-base italic font-semibold mb-4 leading-snug" style={{ color: "var(--brand-primary)" }}>{tagline}</p>
      <p className="text-base leading-relaxed flex-1" style={{ color: "var(--brand-text-muted)" }}>{description}</p>

      <div className="mt-8 flex items-center gap-2 text-sm font-bold transition-colors duration-200 group-hover:text-[var(--brand-primary)]" style={{ color: "var(--brand-text-muted)" }}>
        Explore
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden className="group-hover:translate-x-1.5 transition-transform duration-200">
          <path d="M2.5 6h7M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  );
}
