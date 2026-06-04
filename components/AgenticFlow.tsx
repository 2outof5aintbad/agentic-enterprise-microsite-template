"use client";

import { useState } from "react";

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
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (i: number) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <div className="space-y-3">
      {/* Pipeline track — desktop */}
      <div className="hidden lg:flex items-center gap-0 mb-8 rounded-2xl overflow-hidden border border-black/8">
        {steps.map((step, i) => {
          const isActive = activeIndex === i;
          const isAuto = step.autonomous;
          return (
            <button
              key={step.step}
              onClick={() => toggle(i)}
              className={`relative flex-1 flex flex-col items-center gap-2 px-4 py-5 text-center transition-all duration-300 border-r border-black/8 last:border-r-0 group ${
                isActive
                  ? isAuto ? "bg-[#0A0A0A]" : "bg-amber-50"
                  : "bg-[#F5F2EE] hover:bg-white"
              }`}
            >
              {/* Step number */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                  isActive
                    ? isAuto ? "bg-[var(--brand-primary)] shadow-lg shadow-[var(--brand-primary)]/40" : "bg-amber-500 text-white"
                    : "bg-white border border-black/10 text-[#3D3D3D] group-hover:border-[var(--brand-primary)]/30 group-hover:text-[var(--brand-primary)]"
                }`}
                style={isActive && isAuto ? { color: "var(--brand-text-on-primary)" } : {}}
              >
                {step.step}
              </div>

              {/* Agent name */}
              <p
                className={`text-[0.65rem] font-bold tracking-wider uppercase leading-tight transition-colors duration-200 ${
                  isActive ? (isAuto ? "" : "text-amber-700") : "text-black/40 group-hover:text-black/60"
                }`}
                style={isActive && isAuto ? { color: "var(--brand-text-on-primary-subtle)" } : {}}
              >
                {step.agent}
              </p>

              {/* Title */}
              <p
                className={`text-xs font-bold leading-snug transition-colors duration-200 ${
                  isActive ? (isAuto ? "" : "text-amber-900") : "text-[#0A0A0A] group-hover:text-[var(--brand-primary)]"
                }`}
                style={isActive && isAuto ? { color: "var(--brand-text-on-primary)" } : {}}
              >
                {step.title}
              </p>

              {/* Autonomous badge */}
              <span className={`text-[0.55rem] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${
                isAuto
                  ? isActive ? "bg-[var(--brand-primary)]/30 text-red-200" : "bg-emerald-100 text-emerald-700"
                  : isActive ? "bg-amber-200 text-amber-800" : "bg-amber-100 text-amber-700"
              }`}>
                {isAuto ? "Autonomous" : "Human Review"}
              </span>

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                  <div className={`w-4 h-4 rotate-45 border-r-2 border-t-2 transition-colors duration-300 ${
                    isActive ? "border-[var(--brand-primary)]/50" : "border-black/15"
                  }`} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Step cards */}
      {steps.map((step, i) => {
        const isOpen = activeIndex === i;
        const isAuto = step.autonomous;
        const isLast = i === steps.length - 1;

        return (
          <div key={step.step} className="flex gap-5">
            {/* Left: connector track */}
            <div className="flex flex-col items-center shrink-0">
              <button
                onClick={() => toggle(i)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all duration-300 ${
                  isOpen
                    ? isAuto
                      ? "bg-[var(--brand-primary)] border-[var(--brand-primary)] shadow-lg shadow-[var(--brand-primary)]/30 scale-110"
                      : "bg-amber-500 border-amber-500 text-white scale-110"
                    : "bg-white border-black/15 text-[#3D3D3D] hover:border-[var(--brand-primary)]/40 hover:text-[var(--brand-primary)]"
                }`}
                style={isOpen && isAuto ? { color: "var(--brand-text-on-primary)" } : {}}
              >
                {isOpen ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M3 6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : step.step}
              </button>
              {!isLast && (
                <div className={`w-0.5 flex-1 mt-2 min-h-[2rem] transition-all duration-300 ${
                  isOpen ? (isAuto ? "bg-[var(--brand-primary)]/30" : "bg-amber-300/50") : "bg-black/10"
                }`} />
              )}
            </div>

            {/* Right: content */}
            <div className="flex-1 pb-4">
              <button
                onClick={() => toggle(i)}
                className="w-full text-left group"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                  <span className={`text-[0.6rem] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border transition-colors duration-200 ${
                    isAuto
                      ? "text-[var(--brand-primary)] border-[var(--brand-primary)]/25 bg-[var(--brand-primary)]/6"
                      : "text-amber-700 border-amber-400/40 bg-amber-50"
                  }`}>
                    {step.agent}
                  </span>
                  <span className={`text-[0.6rem] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${
                    isAuto
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {isAuto ? "Autonomous" : "Human Review"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <h4 className={`text-base font-bold leading-snug transition-colors duration-200 ${
                    isOpen ? (isAuto ? "text-[var(--brand-primary)]" : "text-amber-700") : "text-[#0A0A0A] group-hover:text-[var(--brand-primary)]"
                  }`}>
                    {step.title}
                  </h4>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[var(--brand-primary)]" : "text-black/25"}`}
                    aria-hidden
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              {/* Expanded detail */}
              <div className={`overflow-hidden transition-all duration-400 ease-out ${isOpen ? "max-h-64 opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                <div className={`rounded-xl border p-5 space-y-3 ${
                  isAuto
                    ? "bg-[#0A0A0A] border-[var(--brand-primary)]/20"
                    : "bg-amber-50 border-amber-200"
                }`}>
                  <p className={`text-sm leading-relaxed ${isAuto ? "text-white/80" : "text-amber-900"}`}>
                    {step.description}
                  </p>
                  {step.note && (
                    <p className={`text-xs italic ${isAuto ? "text-white/40" : "text-amber-700/70"}`}>
                      {step.note}
                    </p>
                  )}
                  {/* Autonomous indicator */}
                  <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full ${
                    isAuto
                      ? "bg-[var(--brand-primary)]/15 text-red-300"
                      : "bg-amber-200 text-amber-800"
                  }`}>
                    {isAuto ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] animate-pulse" />
                        Agent executes without human input
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Pauses for human review and approval
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="flex items-center gap-5 pt-2 pl-14">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
          <span className="text-xs text-[#3D3D3D]/60 font-medium">Agent executes autonomously</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-xs text-[#3D3D3D]/60 font-medium">Human reviews and approves</span>
        </div>
      </div>
    </div>
  );
}
