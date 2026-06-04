"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ACCOUNT } from "@/data/account";

function formatDollars(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${Math.round(n / 1_000)}K`;
  return `$${n.toLocaleString()}`;
}

interface SliderProps {
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}

function Slider({ label, sublabel, value, min, max, step, display, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-sm font-bold" style={{ color: "var(--brand-text-heading)" }}>{label}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--brand-text-muted)" }}>{sublabel}</p>
        </div>
        <span className="shrink-0 font-display text-2xl font-black tabular-nums" style={{ color: "var(--brand-primary)" }}>{display}</span>
      </div>
      <div className="relative h-2 rounded-full" style={{ background: "var(--brand-surface-border)" }}>
        <div className="absolute left-0 top-0 h-2 rounded-full transition-all duration-150" style={{ width: `${pct}%`, background: "var(--brand-primary)" }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
          aria-label={label}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-md shadow-black/40 transition-all duration-150 pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)`, borderWidth: 2, borderStyle: "solid", borderColor: "var(--brand-primary)" }}
        />
      </div>
      <div className="flex justify-between text-[0.6rem] font-semibold tabular-nums" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function ROICalculator() {
  const { scenarios, disclaimer } = ACCOUNT.roi;
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);

  const scenario = scenarios.find(s => s.id === scenarioId) ?? scenarios[0];

  const [primary,   setPrimary]   = useState(scenario.primarySlider.default);
  const [secondary, setSecondary] = useState(scenario.secondarySlider.default);
  const [tertiary,  setTertiary]  = useState(scenario.tertiarySlider.default);

  const handleScenarioChange = (id: string) => {
    const s = scenarios.find(sc => sc.id === id);
    if (!s) return;
    setScenarioId(id);
    setPrimary(s.primarySlider.default);
    setSecondary(s.secondarySlider.default);
    setTertiary(s.tertiarySlider.default);
  };

  const results = useMemo(
    () => scenario.calculate(primary, secondary, tertiary),
    [scenario, primary, secondary, tertiary]
  );

  return (
    <div className="space-y-8">

      {/* Scenario picker */}
      <div className="flex gap-3 flex-wrap">
        {scenarios.map(s => (
          <button
            key={s.id}
            onClick={() => handleScenarioChange(s.id)}
            className="flex-1 min-w-[160px] text-left rounded-2xl p-5 border transition-all duration-200"
            style={s.id === scenarioId
              ? { background: "color-mix(in srgb, var(--brand-primary) 8%, transparent)", borderColor: "var(--brand-primary)", borderWidth: 2 }
              : { background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)", borderWidth: 1 }
            }
          >
            <p
              className="text-sm font-black mb-0.5"
              style={{ color: s.id === scenarioId ? "var(--brand-primary)" : "var(--brand-text-heading)" }}
            >
              {s.label}
            </p>
            <p className="text-xs leading-snug" style={{ color: "var(--brand-text-muted)", opacity: 0.65 }}>
              {s.description}
            </p>
          </button>
        ))}
      </div>

      {/* Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

        {/* Inputs */}
        <div className="rounded-2xl p-8 space-y-10" style={{ background: "var(--brand-card-bg)", border: "1px solid var(--brand-card-border)" }}>
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-1" style={{ color: "var(--brand-text-muted)", opacity: 0.6 }}>Your Numbers</p>
            <p className="text-sm" style={{ color: "var(--brand-text-muted)" }}>Adjust the sliders to reflect your organization.</p>
          </div>
          <Slider
            label={scenario.primarySlider.label}
            sublabel={scenario.primarySlider.sublabel}
            value={primary} min={scenario.primarySlider.min} max={scenario.primarySlider.max} step={scenario.primarySlider.step}
            display={scenario.primarySlider.format(primary)}
            onChange={setPrimary}
          />
          <Slider
            label={scenario.secondarySlider.label}
            sublabel={scenario.secondarySlider.sublabel}
            value={secondary} min={scenario.secondarySlider.min} max={scenario.secondarySlider.max} step={scenario.secondarySlider.step}
            display={scenario.secondarySlider.format(secondary)}
            onChange={setSecondary}
          />
          <Slider
            label={scenario.tertiarySlider.label}
            sublabel={scenario.tertiarySlider.sublabel}
            value={tertiary} min={scenario.tertiarySlider.min} max={scenario.tertiarySlider.max} step={scenario.tertiarySlider.step}
            display={scenario.tertiarySlider.format(tertiary)}
            onChange={setTertiary}
          />
          <p className="text-[0.6rem] leading-relaxed pt-2" style={{ color: "var(--brand-text-muted)", opacity: 0.4, borderTop: "1px solid var(--brand-surface-border)" }}>
            {disclaimer}
          </p>
        </div>

        {/* Output */}
        <div className="space-y-4">

          {/* Headline */}
          <div className="relative overflow-hidden rounded-2xl p-8" style={{ background: "var(--brand-primary)" }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
              <path d="M-50 180 Q100 80 200 130 Q300 180 450 80" stroke="white" strokeWidth="100" strokeLinecap="round" fill="none" opacity="0.08"/>
            </svg>
            <div className="relative">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: "var(--brand-text-on-primary-muted)" }}>
                {scenario.totalLabel}
              </p>
              <p className="font-display text-6xl sm:text-7xl font-black leading-none tabular-nums transition-all duration-300" style={{ color: "var(--brand-text-on-primary)" }}>
                {formatDollars(results.total)}
              </p>
              <p className="text-sm mt-3 leading-relaxed max-w-xs" style={{ color: "var(--brand-text-on-primary-muted)" }}>
                {scenario.totalSublabel}
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-3">
            {results.breakdown.map(item => (
              <div key={item.label} className="rounded-xl p-5" style={{ background: "var(--brand-card-bg)", border: "1px solid var(--brand-card-border)" }}>
                <p className="text-[0.6rem] font-bold tracking-widest uppercase mb-2" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>{item.label}</p>
                <p className="font-display text-2xl font-black tabular-nums transition-all duration-300" style={{ color: "var(--brand-text-heading)" }}>{item.value}</p>
                {item.sub && <p className="text-xs mt-1" style={{ color: "var(--brand-text-muted)" }}>{item.sub}</p>}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ background: "var(--brand-card-bg)", border: "1px solid var(--brand-card-border)" }}>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--brand-text-heading)" }}>Want a model built on your real data?</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--brand-text-muted)" }}>We can run a tailored business case with your actual numbers.</p>
            </div>
            <Link
              href="/account-team"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
              style={{ background: "var(--brand-primary)", color: "var(--brand-text-on-primary)" }}
            >
              Talk to the team
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
