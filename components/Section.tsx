interface SectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  divide?: boolean;
  light?: boolean;
  alt?: boolean;
}

export default function Section({ eyebrow, title, subtitle, children, className = "", divide = false, light = false, alt = false }: SectionProps) {
  const bg = light ? "var(--brand-light)" : alt ? "var(--brand-section-alt)" : "var(--brand-bg)";
  const border = divide ? "border-t" : "";
  const headingColor = light ? "text-[#0A0A0A]" : "text-white";
  const bodyColor = light ? "text-[#3D3D3D]" : "text-white/80";

  return (
    <section className={border} style={{ background: bg, borderColor: "var(--brand-surface-border)" }}>
      <div className={`max-w-6xl mx-auto px-6 py-20 ${className}`}>
        {(eyebrow || title || subtitle) && (
          <div className="mb-12">
            {eyebrow && (
              <div className="mb-5">
                <span className={light ? "eyebrow-pill-outline" : "eyebrow-pill"}>{eyebrow}</span>
              </div>
            )}
            {title && (
              <h2 className={`font-display text-4xl sm:text-5xl font-black tracking-tight leading-[1.0] mb-4 max-w-2xl ${headingColor}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-lg max-w-2xl leading-relaxed ${bodyColor}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
