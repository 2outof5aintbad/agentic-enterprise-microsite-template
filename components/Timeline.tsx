"use client";

import { useState } from "react";

interface TimelineStep {
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

function TimelineItem({ item, isOpen, onToggle }: { item: TimelineStep; isOpen: boolean; onToggle: () => void }) {
  const isLast = item.index === item.total - 1;
  const hasFriction = item.friction != null;
  const label = item.step || String(item.index + 1).padStart(2, "0");

  const dotColor = item.agent && item.autonomous === false
    ? "bg-amber-400 border-amber-400"
    : item.agent
    ? "bg-[var(--brand-primary)] border-[var(--brand-primary)]"
    : hasFriction
    ? "bg-amber-400 border-amber-400"
    : isOpen
    ? "bg-[var(--brand-primary)] border-[var(--brand-primary)]"
    : "bg-white border-white/30";

  return (
    <div className="flex gap-6">
      {/* Left: dot + line */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all duration-200 shrink-0 ${dotColor} ${
            isOpen ? "text-white shadow-lg shadow-[#F40009]/30 scale-110" : "text-[#0A0A0A] hover:scale-105"
          }`}
        >
          {isOpen ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M3 6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : label}
        </button>
        {!isLast && (
          <div className={`w-0.5 flex-1 mt-2 min-h-[2rem] transition-colors duration-300 ${isOpen ? "bg-[var(--brand-primary)]/30" : "bg-black/15"}`} />
        )}
      </div>

      {/* Right: content */}
      <div className="flex-1 pb-6">
        {/* Header — always visible, clickable */}
        <button
          onClick={onToggle}
          className="w-full text-left group"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3 flex-wrap mb-1">
            {item.time && (
              <span className="text-xs font-mono font-bold text-[var(--brand-primary)]/70 tabular-nums">{item.time}</span>
            )}
            {item.agent && (
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--brand-primary)] px-2.5 py-0.5 rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/8">
                {item.agent}
              </span>
            )}
            {item.actor && !item.agent && (
              <span className="text-[10px] font-bold tracking-widest uppercase text-black/40">{item.actor}</span>
            )}
            {item.autonomous != null && (
              <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${
                item.autonomous
                  ? "text-emerald-700 border-emerald-500/30 bg-emerald-50"
                  : "text-amber-700 border-amber-500/30 bg-amber-50"
              }`}>
                {item.autonomous ? "Autonomous" : "Human Review"}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <h4 className={`text-base font-bold leading-snug transition-colors duration-200 ${isOpen ? "text-[var(--brand-primary)]" : "text-[#0A0A0A] group-hover:text-[var(--brand-primary)]"}`}>
              {item.title || item.action || item.description}
            </h4>
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[var(--brand-primary)]" : "text-black/30"}`}
              aria-hidden
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {/* Expanded content */}
        <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
          <div className="bg-white rounded-xl border border-black/8 p-5 shadow-sm space-y-3">
            {/* Show description separately if title was used for header */}
            {item.title && (item.action || item.description) && (
              <p className="text-base text-[#3D3D3D] leading-relaxed">{item.action || item.description}</p>
            )}

            {item.system && (
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A0A0A]/50 bg-black/[0.04] border border-black/8 px-3 py-1.5 rounded-full">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <rect x="1" y="1" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1"/>
                </svg>
                {item.system}
              </div>
            )}

            {item.friction != null && (
              <div className="flex items-start gap-2.5 text-sm font-medium text-amber-800 bg-amber-50 border border-amber-200 px-4 py-3 rounded-xl">
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                  <path d="M6 1L11 10H1L6 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M6 5v2.5M6 9h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                {item.friction}
              </div>
            )}

            {item.delta && (
              <div className="flex items-center gap-2.5 text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl">
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="shrink-0" aria-hidden>
                  <path d="M5 8V2M2.5 4.5L5 2l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item.delta}
              </div>
            )}

            {item.note && (
              <p className="text-sm text-black/40 italic">{item.note}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TimelineProps {
  steps: TimelineStep[];
}

export default function Timeline({ steps }: TimelineProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="bg-[#F5F2EE] rounded-2xl border border-black/8 p-6 sm:p-8">
      {steps.map((step, i) => (
        <TimelineItem
          key={i}
          item={{ ...step, index: i, total: steps.length }}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
