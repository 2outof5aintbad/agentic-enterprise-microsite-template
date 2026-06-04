"use client";

interface Step {
  step: string;
  agent: string;
  title: string;
  description: string;
  autonomous: boolean;
  note?: string | null;
}

interface Props {
  steps: Step[];
}

export default function AgenticFlow({ steps }: Props) {
  return (
    <div className="relative">

      {/* Spine */}
      <div className="absolute left-5 top-5 bottom-5 w-px" style={{ background: "var(--brand-surface-border)" }} />

      <div className="space-y-3">
        {steps.map((step, i) => {
          const isAuto = step.autonomous;
          const isLast = i === steps.length - 1;

          return (
            <div key={step.step} className="relative flex gap-6">

              {/* Node */}
              <div className="shrink-0 flex flex-col items-center" style={{ width: 40 }}>
                <div
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shadow-md"
                  style={isAuto
                    ? { background: "var(--brand-primary)", color: "var(--brand-text-on-primary)" }
                    : { background: "#F59E0B", color: "#1C1917" }
                  }
                >
                  {step.step}
                </div>
                {/* Connector dot between steps */}
                {!isLast && (
                  <div className="flex flex-col items-center gap-1 mt-2">
                    <div className="w-1 h-1 rounded-full" style={{ background: "var(--brand-surface-border)" }} />
                    <div className="w-1 h-1 rounded-full" style={{ background: "var(--brand-surface-border)" }} />
                    <div className="w-1 h-1 rounded-full" style={{ background: "var(--brand-surface-border)" }} />
                  </div>
                )}
              </div>

              {/* Card */}
              <div
                className="flex-1 rounded-2xl border mb-2 overflow-hidden"
                style={isAuto
                  ? { background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", borderLeftWidth: 3, borderLeftColor: "var(--brand-primary)" }
                  : { background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", borderLeftWidth: 3, borderLeftColor: "#F59E0B" }
                }
              >
                <div className="px-6 py-5">

                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-[0.6rem] font-bold tracking-widest uppercase mb-1" style={{ color: isAuto ? "var(--brand-primary)" : "#D97706" }}>
                        {step.agent}
                      </p>
                      <h4 className="font-display text-lg font-black leading-tight" style={{ color: "var(--brand-text-heading)" }}>
                        {step.title}
                      </h4>
                    </div>
                    <span
                      className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.6rem] font-bold tracking-widest uppercase"
                      style={isAuto
                        ? { background: "color-mix(in srgb, var(--brand-primary) 10%, transparent)", color: "var(--brand-primary)", border: "1px solid color-mix(in srgb, var(--brand-primary) 25%, transparent)" }
                        : { background: "rgba(245,158,11,0.10)", color: "#D97706", border: "1px solid rgba(245,158,11,0.25)" }
                      }
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: isAuto ? "var(--brand-primary)" : "#F59E0B", ...(isAuto ? { animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" } : {}) }}
                      />
                      {isAuto ? "Autonomous" : "Human Review"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>
                    {step.description}
                  </p>

                  {/* Human review note */}
                  {!isAuto && step.note && (
                    <div className="flex items-start gap-2.5 mt-4 pt-4" style={{ borderTop: "1px solid rgba(245,158,11,0.15)" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                        <circle cx="7" cy="7" r="6" fill="rgba(245,158,11,0.15)"/>
                        <path d="M7 4.5v3M7 9.5h.01" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                      <p className="text-xs leading-relaxed" style={{ color: "#D97706" }}>{step.note}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 ml-14">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: "var(--brand-primary)" }} />
          <span className="text-xs font-medium" style={{ color: "var(--brand-text-muted)" }}>Agent executes autonomously</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="text-xs font-medium" style={{ color: "var(--brand-text-muted)" }}>Human reviews and approves</span>
        </div>
      </div>

    </div>
  );
}
