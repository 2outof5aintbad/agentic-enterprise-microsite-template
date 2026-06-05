"use client";

import { useEffect, useRef, useState } from "react";
import { ACCOUNT } from "@/data/account";

interface TickerStat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    startRef.current = null;
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, active]);

  return current;
}

function Stat({ stat, active, delay }: { stat: TickerStat; active: boolean; delay: number }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);

  const count = useCountUp(stat.value, 1800, started);

  const display = stat.decimals
    ? count.toLocaleString(undefined, { minimumFractionDigits: stat.decimals, maximumFractionDigits: stat.decimals })
    : count.toLocaleString();

  return (
    <div className="flex flex-col items-center text-center px-6 py-4 first:pl-0 last:pr-0">
      <p className="font-display text-3xl sm:text-4xl font-black tabular-nums leading-none mb-1.5" style={{ color: "var(--brand-primary)" }}>
        {stat.prefix ?? ""}{display}{stat.suffix ?? ""}
      </p>
      <p className="text-xs font-medium leading-snug max-w-[120px]" style={{ color: "var(--brand-text-muted)", opacity: 0.55 }}>
        {stat.label}
      </p>
    </div>
  );
}

// Derive ticker stats from agentTracker data
function buildStats(): TickerStat[] {
  const agents  = ACCOUNT.agentTracker.agents;
  const live    = agents.filter(a => a.status === "live");

  // Pull numeric metrics from live agents to seed the counters
  // Each live agent contributes its first metric as a ticker value
  const stats: TickerStat[] = [];

  // Always show agent counts
  stats.push({
    label: "agents in production",
    value: live.length,
  });

  // Derive hours saved from successMetrics or hardcode from roi config
  const rois = ACCOUNT.roi.scenarios[0];
  const defaultReps = rois.primarySlider.default;
  const defaultHrs  = rois.secondarySlider.default;
  const hoursSaved  = Math.round(defaultReps * defaultHrs * 4 * 0.65 * 12); // annualized
  stats.push({
    label: "hours returned to selling this year",
    value: hoursSaved,
    suffix: "",
  });

  // Cases resolved — pull from Case Resolution Agent if it exists
  const caseAgent = agents.find(a => a.id === "case-resolution");
  if (caseAgent?.metrics?.[1]) {
    const raw = caseAgent.metrics[1].value.replace(/[^0-9.]/g, "");
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      stats.push({
        label: caseAgent.metrics[1].label,
        value: Math.round(num * 30), // approx monthly
        suffix: "",
      });
    }
  }

  // Reps using platform
  stats.push({
    label: "reps using Agentforce daily",
    value: 640,
  });

  return stats.slice(0, 4);
}

export default function DeploymentTicker() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const stats = buildStats();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="border-t border-b" style={{ borderColor: "var(--brand-surface-border)", background: "var(--brand-section-alt)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-stretch justify-center divide-x divide-[var(--brand-surface-border)]">
          {stats.map((stat, i) => (
            <div key={stat.label} style={i > 0 ? { borderLeft: "1px solid var(--brand-surface-border)" } : {}}>
              <Stat stat={stat} active={active} delay={i * 200} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
