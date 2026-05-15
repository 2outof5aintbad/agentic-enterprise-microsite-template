interface FlowStepProps {
  index: number;
  total: number;
  time?: string;
  step?: string;
  actor?: string;
  agent?: string;
  title?: string;
  action?: string;
  description?: string;
  system?: string;
  friction?: string | null;
  delta?: string;
  autonomous?: boolean;
  note?: string | null;
}

export default function FlowStep({ index, total, time, step, actor, agent, title, action, description, system, friction, delta, autonomous, note }: FlowStepProps) {
  const isLast = index === total - 1;
  const hasFriction = friction != null;

  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
          agent && autonomous === false ? "border-amber-400/70 bg-amber-400/15 text-amber-300"
          : agent ? "border-[var(--brand-primary)]/60 bg-[var(--brand-primary)]/12 text-[var(--brand-primary)]"
          : hasFriction ? "border-amber-400/70 bg-amber-400/15 text-amber-300"
          : "border-white/25 bg-white/[0.06] text-white/70"
        }`}>
          {step || String(index + 1).padStart(2, "0")}
        </div>
        {!isLast && <div className="w-px flex-1 mt-2 bg-white/12 min-h-[2rem]" />}
      </div>

      <div className="pb-10 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          {time && <span className="text-xs font-mono font-bold text-white/55 tabular-nums">{time}</span>}
          {agent && (
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--brand-primary)] px-2.5 py-0.5 rounded-full border border-[var(--brand-primary)]/35 bg-[var(--brand-primary)]/8">
              {agent}
            </span>
          )}
          {actor && !agent && (
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/55">{actor}</span>
          )}
          {autonomous != null && (
            <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${
              autonomous
                ? "text-emerald-300 border-emerald-400/30 bg-emerald-400/8"
                : "text-amber-300 border-amber-400/30 bg-amber-400/8"
            }`}>
              {autonomous ? "Autonomous" : "Human Review"}
            </span>
          )}
        </div>

        {title && <h4 className="text-base font-bold text-white mb-1.5">{title}</h4>}
        <p className="text-base text-white/75 leading-relaxed">{action || description}</p>

        {system && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/55 bg-white/[0.04] border border-white/12 px-3 py-1.5 rounded-full">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <rect x="1" y="1" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1"/>
            </svg>
            {system}
          </div>
        )}

        {hasFriction && (
          <div className="mt-3 flex items-start gap-2 text-sm text-amber-300 bg-amber-400/8 border border-amber-400/20 px-4 py-3 rounded-xl">
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5" aria-hidden>
              <path d="M6 1L11 10H1L6 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
              <path d="M6 5v2.5M6 9h.01" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            {friction}
          </div>
        )}

        {delta && (
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-300 bg-emerald-400/8 border border-emerald-400/20 px-4 py-3 rounded-xl">
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="shrink-0" aria-hidden>
              <path d="M5 8V2M2.5 4.5L5 2l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {delta}
          </div>
        )}

        {note && <p className="mt-2 text-sm text-white/45 italic">{note}</p>}
      </div>
    </div>
  );
}
