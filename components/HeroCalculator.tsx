"use client";

import { useState } from "react";

const HOURS_PER_WEEK    = 14;    // manual hours per rep per week
const AUTOMATION_RATE   = 0.65;  // % automatable
const HOURLY_RATE       = 85;    // fully-loaded $/hr
const WEEKS_PER_YEAR    = 48;

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${Math.round(n / 1_000)}K`;
  return `$${n.toLocaleString()}`;
}

function fmtHours(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${Math.round(n / 1_000)}K`;
  return n.toLocaleString();
}

export default function HeroCalculator() {
  const [reps, setReps] = useState(200);

  const hoursPerYear  = Math.round(reps * HOURS_PER_WEEK * AUTOMATION_RATE * WEEKS_PER_YEAR);
  const valuePerYear  = Math.round(hoursPerYear * HOURLY_RATE);
  const pct           = ((reps - 50) / (2000 - 50)) * 100;

  return (
    <div className="mt-10 max-w-xl">
      {/* Slider label */}
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-sm font-semibold" style={{ color: "var(--brand-text-muted)", opacity: 0.6 }}>
          How many field reps do you have?
        </p>
        <span className="font-display text-2xl font-black tabular-nums" style={{ color: "var(--brand-primary)" }}>
          {reps.toLocaleString()}
        </span>
      </div>

      {/* Slider */}
      <div className="relative h-1.5 rounded-full mb-5" style={{ background: "var(--brand-surface-border)" }}>
        <div
          className="absolute left-0 top-0 h-1.5 rounded-full"
          style={{ width: `${pct}%`, background: "var(--brand-primary)" }}
        />
        <input
          type="range"
          min={50}
          max={2000}
          step={50}
          value={reps}
          onChange={e => setReps(Number(e.target.value))}
          className="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer"
          aria-label="Number of field reps"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-md shadow-black/30 pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)`, borderWidth: 2, borderStyle: "solid", borderColor: "var(--brand-primary)" }}
        />
      </div>

      {/* Output */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl px-4 py-4" style={{ background: "var(--brand-surface)", border: "1px solid var(--brand-surface-border)" }}>
          <p className="text-[0.58rem] font-bold tracking-[0.14em] uppercase mb-1" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>
            Hours recovered / yr
          </p>
          <p className="font-display text-2xl font-black tabular-nums" style={{ color: "var(--brand-text-heading)" }}>
            {fmtHours(hoursPerYear)}
          </p>
        </div>
        <div className="rounded-xl px-4 py-4" style={{ background: "color-mix(in srgb, var(--brand-primary) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--brand-primary) 20%, transparent)" }}>
          <p className="text-[0.58rem] font-bold tracking-[0.14em] uppercase mb-1" style={{ color: "var(--brand-primary)", opacity: 0.65 }}>
            Recoverable value / yr
          </p>
          <p className="font-display text-2xl font-black tabular-nums" style={{ color: "var(--brand-primary)" }}>
            {fmt(valuePerYear)}
          </p>
        </div>
      </div>

      <p className="text-[0.58rem] mt-3" style={{ color: "var(--brand-text-muted)", opacity: 0.3 }}>
        Based on 14 hrs/week manual work · 65% automation rate · $85 fully-loaded hourly cost
      </p>
    </div>
  );
}
