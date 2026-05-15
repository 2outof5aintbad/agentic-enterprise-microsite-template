"use client";

interface HumanStep {
  actor: string;
  action: string;
  time: string;
}

interface AgenticStep {
  agent: string;
  action: string;
  autonomous: boolean;
}

interface Props {
  title: string;
  subtitle: string;
  human: {
    label: string;
    stat: string;
    steps: HumanStep[];
  };
  agentic: {
    label: string;
    stat: string;
    steps: AgenticStep[];
  };
}

export default function WorkflowComparison({ title, subtitle, human, agentic }: Props) {
  return (
    <div>
      <div className="mb-8">
        <h3 className="font-display text-2xl sm:text-3xl font-black text-[#0A0A0A] leading-tight mb-2">{title}</h3>
        <p className="text-base text-[#3D3D3D] leading-relaxed">{subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Human workflow */}
        <div className="rounded-2xl border border-black/10 overflow-hidden">
          <div className="bg-[#0A0A0A] px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/40 mb-0.5">Status Quo</p>
              <p className="text-base font-bold text-white">{human.label}</p>
            </div>
            <span className="shrink-0 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full">
              {human.stat}
            </span>
          </div>
          <div className="bg-[#F5F2EE] divide-y divide-black/5">
            {human.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 px-6 py-4">
                <div className="flex flex-col items-center shrink-0 pt-1">
                  <div className="w-6 h-6 rounded-full bg-white border border-black/10 flex items-center justify-center text-[0.6rem] font-black text-[#3D3D3D]">
                    {i + 1}
                  </div>
                  {i < human.steps.length - 1 && <div className="w-px h-full mt-1.5 bg-black/10 min-h-[1.5rem]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-[0.6rem] font-bold tracking-wider uppercase text-[#3D3D3D]/50">{step.time}</span>
                    <span className="text-[0.6rem] font-bold tracking-wider uppercase text-[var(--brand-primary)]/70 bg-[var(--brand-primary)]/6 border border-[var(--brand-primary)]/15 px-2 py-0.5 rounded-full">{step.actor}</span>
                  </div>
                  <p className="text-sm text-[#0A0A0A] leading-snug">{step.action}</p>
                </div>
              </div>
            ))}
            {/* waste callout */}
            <div className="px-6 py-4 flex items-start gap-3 bg-amber-50/60">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                <path d="M8 2L14 13H2L8 2Z" stroke="#D97706" strokeWidth="1.4" strokeLinejoin="round"/>
                <path d="M8 6.5v3M8 11h.01" stroke="#D97706" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <p className="text-xs text-amber-800 font-medium leading-snug">
                Every step is manual. Every handoff is a delay. Every hour is time not spent selling.
              </p>
            </div>
          </div>
        </div>

        {/* Agentic workflow */}
        <div className="rounded-2xl border border-[var(--brand-primary)]/20 overflow-hidden">
          <div className="bg-[var(--brand-primary)] px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/60 mb-0.5">With Agentforce</p>
              <p className="text-base font-bold text-white">{agentic.label}</p>
            </div>
            <span className="shrink-0 text-xs font-bold text-white bg-white/15 border border-white/25 px-3 py-1.5 rounded-full">
              {agentic.stat}
            </span>
          </div>
          <div className="bg-white divide-y divide-black/5">
            {agentic.steps.map((step, i) => {
              const isHuman = !step.autonomous;
              return (
                <div key={i} className={`flex items-start gap-4 px-6 py-4 ${isHuman ? "bg-amber-50/50" : ""}`}>
                  <div className="flex flex-col items-center shrink-0 pt-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isHuman
                        ? "bg-amber-100 border border-amber-300"
                        : "bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/25"
                    }`}>
                      {isHuman ? (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                          <circle cx="5" cy="3.5" r="1.5" stroke="#D97706" strokeWidth="1.2"/>
                          <path d="M2 9c0-1.657 1.343-3 3-3s3 1.343 3 3" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                          <path d="M5 1.5l1.2 2.8H9L7 5.8l.8 2.7L5 7l-2.8 1.5.8-2.7L1 4.3h2.8z" stroke="var(--brand-primary)" strokeWidth="1" strokeLinejoin="round" fill="none"/>
                        </svg>
                      )}
                    </div>
                    {i < agentic.steps.length - 1 && <div className={`w-px h-full mt-1.5 min-h-[1.5rem] ${isHuman ? "bg-amber-200" : "bg-[var(--brand-primary)]/15"}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      {step.agent !== "—" && (
                        <span className={`text-[0.6rem] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                          isHuman
                            ? "text-amber-700 bg-amber-100 border-amber-300"
                            : "text-[var(--brand-primary)] bg-[var(--brand-primary)]/6 border-[var(--brand-primary)]/20"
                        }`}>{step.agent}</span>
                      )}
                      <span className={`text-[0.6rem] font-bold tracking-wider uppercase ${
                        isHuman ? "text-amber-600" : "text-emerald-600"
                      }`}>
                        {isHuman ? "Human Review" : "Autonomous"}
                      </span>
                    </div>
                    <p className="text-sm text-[#0A0A0A] leading-snug font-medium">{step.action}</p>
                  </div>
                </div>
              );
            })}
            {/* success callout */}
            <div className="px-6 py-4 flex items-start gap-3 bg-emerald-50/60">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                <circle cx="8" cy="8" r="6.5" stroke="#16A34A" strokeWidth="1.4"/>
                <path d="M5 8.5l2 2 4-4" stroke="#16A34A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-xs text-emerald-800 font-medium leading-snug">
                One approval. Complete execution. Your KAM spends the 4 days selling instead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
