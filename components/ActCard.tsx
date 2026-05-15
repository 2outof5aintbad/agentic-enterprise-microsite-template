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
      className="group relative flex flex-col p-8 rounded-2xl bg-white border border-black/8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
    >
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-[var(--brand-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <span aria-hidden className="absolute bottom-5 right-6 font-display text-9xl font-black text-black/[0.04] leading-none select-none group-hover:text-[var(--brand-primary)]/8 transition-colors duration-300">
        {number}
      </span>

      <div className="mb-5">
        <span className="eyebrow-pill">Act {number}</span>
      </div>

      <h3 className="font-display text-2xl font-black text-[#0A0A0A] mb-2 leading-tight">{title}</h3>
      <p className="text-base italic text-[var(--brand-primary)]/80 font-semibold mb-4 leading-snug">{tagline}</p>
      <p className="text-base text-[#3D3D3D] leading-relaxed flex-1">{description}</p>

      <div className="mt-8 flex items-center gap-2 text-sm font-bold text-black/30 group-hover:text-[var(--brand-primary)] transition-colors duration-200">
        Enter this act
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden className="group-hover:translate-x-1.5 transition-transform duration-200">
          <path d="M2.5 6h7M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  );
}
