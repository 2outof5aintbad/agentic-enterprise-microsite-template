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
    <div>
      {steps.map((step, i) => {
        const isAuto = step.autonomous;
        const isLast = i === steps.length - 1;

        return (
          <div key={step.step} className="flex gap-8">

            {/* Spine + node column */}
            <div className="flex flex-col items-center shrink-0" style={{ width: 36 }}>
              <div
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold z-10"
                style={isAuto
                  ? {
                      background: "var(--brand-primary)",
                      color: "var(--brand-text-on-primary)",
                      boxShadow: "0 0 0 4px color-mix(in srgb, var(--brand-primary) 12%, transparent)",
                    }
                  : {
                      background: "var(--brand-card-bg)",
                      border: "1.5px solid #F59E0B",
                      color: "#D97706",
                    }
                }
              >
                {step.step}
              </div>
              {!isLast && (
                <div
                  className="flex-1 w-px mt-3"
                  style={{ background: "var(--brand-surface-border)", minHeight: 48 }}
                />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 ${isLast ? "pb-0" : "pb-12"}`}>

              {/* Meta */}
              <div className="flex items-baseline justify-between mb-2">
                <p
                  className="text-[0.6rem] font-semibold tracking-[0.14em] uppercase"
                  style={{ color: "var(--brand-text-muted)", opacity: 0.45 }}
                >
                  {step.agent}
                </p>
                <p
                  className="text-[0.6rem] font-semibold tracking-[0.1em] uppercase"
                  style={{ color: isAuto ? "var(--brand-primary)" : "#D97706", opacity: 0.75 }}
                >
                  {isAuto ? "Autonomous" : "Human Review"}
                </p>
              </div>

              {/* Title */}
              <h4
                className="font-display text-xl font-black leading-snug mb-2.5"
                style={{ color: "var(--brand-text-heading)" }}
              >
                {step.title}
              </h4>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--brand-text-muted)" }}
              >
                {step.description}
              </p>

              {/* Human review note */}
              {!isAuto && step.note && (
                <p
                  className="text-xs leading-relaxed mt-3 pl-3"
                  style={{
                    color: "#D97706",
                    opacity: 0.8,
                    borderLeft: "2px solid rgba(245,158,11,0.35)",
                  }}
                >
                  {step.note}
                </p>
              )}

            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div
        className="flex items-center gap-8 pt-6 mt-2"
        style={{ borderTop: "1px solid var(--brand-surface-border)", marginLeft: 44 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--brand-primary)" }} />
          <span className="text-xs" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>Autonomous</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full border" style={{ borderColor: "rgba(245,158,11,0.7)" }} />
          <span className="text-xs" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>Human Review</span>
        </div>
      </div>

    </div>
  );
}
