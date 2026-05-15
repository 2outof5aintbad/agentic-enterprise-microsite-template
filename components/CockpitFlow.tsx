"use client";

import { useState, useEffect, useRef } from "react";

type MockUI =
  | { type: "alert"; badge: string; headline: string; account: string; metric: string; submetric: string }
  | { type: "metrics"; items: { label: string; value: string; status: "warn" | "neutral" | "good" }[] }
  | { type: "insight"; finding: string; drivers: string[]; confidence: number }
  | { type: "document"; items: { icon: "doc" | "chart" | "list" | "star"; label: string; status: "ready" | "draft" }[] }
  | { type: "comparison"; before: { label: string; time: string; mood: string }; after: { label: string; time: string; mood: string } }
  | { type: "outcomes"; items: { label: string; value: string; delta: string }[] }
  | { type: "learning"; updates: string[] };

interface Step {
  id: string;
  number: string;
  label: string;
  title: string;
  summary: string;
  detail: string;
  mockUI: MockUI;
}

export type { Step as CockpitFlowStep };

interface Props {
  scenario: string;
  steps: Step[];
}

function AlertCard({ ui }: { ui: Extract<MockUI, { type: "alert" }> }) {
  return (
    <div className="rounded-xl border-2 border-[var(--brand-primary)]/30 bg-[#FFF5F5] p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--brand-primary)] text-white text-[0.6rem] font-bold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          {ui.badge}
        </span>
      </div>
      <p className="font-display text-base font-black text-[#0A0A0A] mb-1">{ui.headline}</p>
      <p className="text-xs font-bold text-[#3D3D3D] mb-3">{ui.account}</p>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-3xl font-black text-[var(--brand-primary)]">{ui.metric}</span>
      </div>
      <p className="text-xs text-[#3D3D3D] mt-1.5">{ui.submetric}</p>
    </div>
  );
}

function MetricsCard({ ui }: { ui: Extract<MockUI, { type: "metrics" }> }) {
  const statusColor = (s: string) =>
    s === "warn" ? "text-amber-600 bg-amber-50 border-amber-200" :
    s === "good" ? "text-green-700 bg-green-50 border-green-200" :
    "text-[#3D3D3D] bg-[#F5F2EE] border-black/8";
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {ui.items.map((item) => (
        <div key={item.label} className={`rounded-xl border p-4 ${statusColor(item.status)}`}>
          <p className="font-display text-2xl font-black mb-1">{item.value}</p>
          <p className="text-xs font-medium leading-snug opacity-80">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

function InsightCard({ ui }: { ui: Extract<MockUI, { type: "insight" }> }) {
  return (
    <div className="rounded-xl border border-black/8 bg-white p-5 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold text-[#3D3D3D]">{ui.finding}</p>
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-1.5 w-20 rounded-full bg-[#F5F2EE] overflow-hidden">
            <div className="h-full bg-[var(--brand-primary)] rounded-full" style={{ width: `${ui.confidence}%` }} />
          </div>
          <span className="text-xs font-bold text-[var(--brand-primary)]">{ui.confidence}%</span>
        </div>
      </div>
      <ul className="space-y-2">
        {ui.drivers.map((d, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[#0A0A0A]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5" aria-hidden>
              <circle cx="7" cy="7" r="6" fill="var(--brand-primary)" fillOpacity="0.1" />
              <path d="M4.5 7.5l1.5 1.5 3.5-3.5" stroke="var(--brand-primary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="leading-snug">{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DocumentCard({ ui }: { ui: Extract<MockUI, { type: "document" }> }) {
  const icons = {
    doc:   <path d="M4 3h5l3 3v7a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zM9 3v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    chart: <path d="M3 11V8m3 3V5m3 6V7m3 4V3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />,
    list:  <><path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><circle cx="3" cy="5" r="0.7" fill="currentColor" /><circle cx="3" cy="8" r="0.7" fill="currentColor" /><circle cx="3" cy="11" r="0.7" fill="currentColor" /></>,
    star:  <path d="M7 2l1.5 3.5H12L9.5 7.5 10.5 11 7 9l-3.5 2 1-3.5L2 5.5h3.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  };
  return (
    <div className="space-y-2">
      {ui.items.map((item) => (
        <div key={item.label} className="flex items-center gap-3 p-3.5 rounded-xl border border-black/8 bg-white hover:border-[var(--brand-primary)]/20 transition-colors">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.status === "ready" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-600"}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>{icons[item.icon]}</svg>
          </div>
          <p className="text-sm font-medium text-[#0A0A0A] flex-1 leading-snug">{item.label}</p>
          <span className={`text-[0.6rem] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${item.status === "ready" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-600"}`}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function ComparisonCard({ ui }: { ui: Extract<MockUI, { type: "comparison" }> }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-black/10 bg-[#F5F2EE] p-4 text-center">
        <p className="text-[0.6rem] font-bold tracking-widest uppercase text-black/40 mb-3">{ui.before.label}</p>
        <p className="font-display text-2xl font-black text-[#0A0A0A] mb-1">{ui.before.time}</p>
        <span className="inline-block px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">{ui.before.mood}</span>
      </div>
      <div className="rounded-xl border border-[var(--brand-primary)]/20 bg-[#FFF5F5] p-4 text-center">
        <p className="text-[0.6rem] font-bold tracking-widest uppercase text-[var(--brand-primary)]/60 mb-3">{ui.after.label}</p>
        <p className="font-display text-2xl font-black text-[var(--brand-primary)] mb-1">{ui.after.time}</p>
        <span className="inline-block px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">{ui.after.mood}</span>
      </div>
    </div>
  );
}

function OutcomesCard({ ui }: { ui: Extract<MockUI, { type: "outcomes" }> }) {
  return (
    <div className="space-y-2.5">
      {ui.items.map((item) => (
        <div key={item.label} className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-black/8 bg-white">
          <p className="text-xs font-bold text-[#3D3D3D] leading-snug">{item.label}</p>
          <div className="text-right shrink-0">
            <p className="font-display text-base font-black text-[var(--brand-primary)]">{item.value}</p>
            <p className="text-[0.65rem] text-[#3D3D3D]/70 leading-none mt-0.5">{item.delta}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function LearningCard({ ui }: { ui: Extract<MockUI, { type: "learning" }> }) {
  return (
    <div className="rounded-xl border border-black/8 bg-white p-5 space-y-2.5">
      {ui.updates.map((update, i) => (
        <div key={i} className="flex items-start gap-2.5">
          <div className="w-5 h-5 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M5 1v4l2.5 2.5" stroke="var(--brand-primary)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm text-[#0A0A0A] leading-snug">{update}</p>
        </div>
      ))}
    </div>
  );
}

function MockUIRenderer({ mockUI }: { mockUI: MockUI }) {
  if (mockUI.type === "alert")      return <AlertCard ui={mockUI} />;
  if (mockUI.type === "metrics")    return <MetricsCard ui={mockUI} />;
  if (mockUI.type === "insight")    return <InsightCard ui={mockUI} />;
  if (mockUI.type === "document")   return <DocumentCard ui={mockUI} />;
  if (mockUI.type === "comparison") return <ComparisonCard ui={mockUI} />;
  if (mockUI.type === "outcomes")   return <OutcomesCard ui={mockUI} />;
  if (mockUI.type === "learning")   return <LearningCard ui={mockUI} />;
  return null;
}

export default function CockpitFlow({ scenario, steps }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set([0]));
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const focusLine = window.innerHeight * 0.38;
      let closestIndex = 0;
      let closestDist = Infinity;

      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Reveal once the card enters the lower 90% of the viewport
        if (rect.top < window.innerHeight * 0.9) {
          setVisibleSteps((prev) => { const next = new Set(prev); next.add(i); return next; });
        }
        // Active = card whose top edge is closest to the focus line
        const dist = Math.abs(rect.top - focusLine);
        if (dist < closestDist) { closestDist = dist; closestIndex = i; }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialise on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToStep = (i: number) => {
    stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Scenario label */}
      <div className="mb-10 flex items-center gap-3">
        <div className="h-px flex-1 bg-black/10" />
        <span className="text-xs font-bold tracking-widest uppercase text-[#3D3D3D]/60 px-3">
          Live Scenario: {scenario}
        </span>
        <div className="h-px flex-1 bg-black/10" />
      </div>

      <div className="flex gap-8 lg:gap-12">
        {/* ── Sticky step indicator ── */}
        <aside className="hidden lg:flex flex-col gap-0 sticky top-24 self-start w-44 shrink-0">
          {steps.map((step, i) => (
            <button
              key={step.id}
              onClick={() => scrollToStep(i)}
              className={`group flex items-center gap-3 py-3 px-3 rounded-xl text-left transition-all duration-200 ${
                activeIndex === i
                  ? "bg-[var(--brand-primary)]/8"
                  : "hover:bg-black/4"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs transition-all duration-300 ${
                activeIndex === i
                  ? "bg-[var(--brand-primary)] text-white scale-110 shadow-md shadow-[var(--brand-primary)]/30"
                  : visibleSteps.has(i)
                  ? "bg-[var(--brand-primary)]/15 text-[var(--brand-primary)]"
                  : "bg-black/8 text-black/30"
              }`}>
                {step.number}
              </div>
              <span className={`text-sm font-semibold transition-colors duration-200 leading-none ${
                activeIndex === i ? "text-[var(--brand-primary)]" : visibleSteps.has(i) ? "text-[#0A0A0A]" : "text-black/35"
              }`}>
                {step.label}
              </span>
            </button>
          ))}
        </aside>

        {/* ── Step cards ── */}
        <div className="flex-1 space-y-6">
          {steps.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => { stepRefs.current[i] = el; }}
              className={`rounded-2xl border overflow-hidden transition-all duration-500 ${
                activeIndex === i
                  ? "border-[var(--brand-primary)]/25 shadow-lg shadow-[var(--brand-primary)]/6"
                  : "border-black/8 shadow-sm"
              } ${visibleSteps.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: visibleSteps.has(i) ? "0ms" : `${i * 80}ms` }}
            >
              {/* Card header */}
              <div className={`flex items-start gap-4 p-6 pb-5 ${activeIndex === i ? "bg-white" : "bg-white"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-[var(--brand-primary)] text-white shadow-md shadow-[var(--brand-primary)]/30"
                    : "bg-[#F5F2EE] text-[#3D3D3D]"
                }`}>
                  {step.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[0.6rem] font-bold tracking-widest uppercase ${activeIndex === i ? "text-[var(--brand-primary)]" : "text-black/30"}`}>
                      {step.label}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-black text-[#0A0A0A] leading-tight">{step.title}</h3>
                  <p className="text-sm text-[#3D3D3D] mt-1.5 leading-relaxed">{step.summary}</p>
                </div>
              </div>

              {/* Expanded content */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === i ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="bg-[#F5F2EE] border-t border-black/6">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Detail text */}
                    <div className="p-6 border-b lg:border-b-0 lg:border-r border-black/6">
                      <p className="text-sm text-[#3D3D3D] leading-relaxed">{step.detail}</p>
                    </div>
                    {/* Mock UI */}
                    <div className="p-6">
                      <MockUIRenderer mockUI={step.mockUI} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile step dots */}
      <div className="flex lg:hidden items-center justify-center gap-2 mt-8">
        {steps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => scrollToStep(i)}
            aria-label={`Go to step ${step.label}`}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === i ? "w-8 h-2.5 bg-[var(--brand-primary)]" : "w-2.5 h-2.5 bg-black/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
