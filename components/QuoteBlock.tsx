interface QuoteBlockProps {
  text: string;
  attribution?: string;
  variant?: "default" | "accent";
}

export default function QuoteBlock({ text, attribution, variant = "default" }: QuoteBlockProps) {
  const isAccent = variant === "accent";

  return (
    <blockquote className={`relative overflow-hidden rounded-2xl px-10 py-10 ${
      isAccent
        ? "bg-[var(--brand-primary)]"
        : "bg-white border border-black/10 border-l-4 border-l-[#F40009] shadow-md"
    }`}>

      {isAccent && (
        <>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 160" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <path d="M-50 120 Q150 60 300 90 Q450 120 600 50 Q700 10 900 70" stroke="white" strokeWidth="70" strokeLinecap="round" fill="none" opacity="0.07"/>
          </svg>
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
        </>
      )}

      <span aria-hidden className={`absolute top-4 left-7 font-display text-7xl leading-none select-none ${
        isAccent ? "text-white/15" : "text-[var(--brand-primary)]/20"
      }`}>
        &ldquo;
      </span>

      <p className={`relative font-display text-2xl font-black leading-snug pl-4 ${
        isAccent ? "text-white" : "text-[#0A0A0A]"
      }`}>
        {text}
      </p>

      {attribution && (
        <p className={`mt-5 text-sm font-semibold pl-4 ${
          isAccent ? "text-white/75" : "text-[#444]"
        }`}>
          — {attribution}
        </p>
      )}
    </blockquote>
  );
}
