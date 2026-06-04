"use client";

import { useState, useEffect, useRef } from "react";

const HUMAN_STEP_MS  = 1600;
const AGENTIC_STEP_MS = 420;

interface HumanStep   { actor: string; action: string; time: string; }
interface AgenticStep { agent: string; action: string; autonomous: boolean; }

interface Props {
  title: string;
  subtitle: string;
  human:   { label: string; stat: string; steps: HumanStep[]; };
  agentic: { label: string; stat: string; steps: AgenticStep[]; };
}

type Phase = "idle" | "running" | "complete";

export default function WorkflowComparison({ title, subtitle, human, agentic }: Props) {
  const [phase,           setPhase]           = useState<Phase>("idle");
  const [humanStep,       setHumanStep]       = useState(-1);
  const [agenticStep,     setAgenticStep]     = useState(-1);
  const [agenticDone,     setAgenticDone]     = useState(false);
  const [humanProgress,   setHumanProgress]   = useState(0);
  const [agenticProgress, setAgenticProgress] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervals = useRef<ReturnType<typeof setInterval>[]>([]);

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    intervals.current.forEach(clearInterval);
    timers.current = [];
    intervals.current = [];
  };

  const reset = () => {
    clearAll();
    setPhase("idle");
    setHumanStep(-1);
    setAgenticStep(-1);
    setAgenticDone(false);
    setHumanProgress(0);
    setAgenticProgress(0);
  };

  const play = () => {
    if (phase !== "idle") { reset(); return; }
    setPhase("running");

    const humanTotal   = human.steps.length * HUMAN_STEP_MS;
    const agenticTotal = agentic.steps.length * AGENTIC_STEP_MS;

    // Progress bars
    const TICK = 32;
    const humanInc   = (TICK / humanTotal) * 100;
    const agenticInc = (TICK / agenticTotal) * 100;

    const hi = setInterval(() => setHumanProgress(p   => Math.min(p + humanInc,   100)), TICK);
    const ai = setInterval(() => setAgenticProgress(p => Math.min(p + agenticInc, 100)), TICK);
    intervals.current.push(hi, ai);

    timers.current.push(setTimeout(() => clearInterval(hi), humanTotal));
    timers.current.push(setTimeout(() => clearInterval(ai), agenticTotal));

    // Step highlights
    human.steps.forEach((_, i) =>
      timers.current.push(setTimeout(() => setHumanStep(i), i * HUMAN_STEP_MS + 80))
    );
    agentic.steps.forEach((_, i) =>
      timers.current.push(setTimeout(() => setAgenticStep(i), i * AGENTIC_STEP_MS + 80))
    );

    timers.current.push(setTimeout(() => setAgenticDone(true),  agenticTotal + 120));
    timers.current.push(setTimeout(() => setPhase("complete"),   humanTotal   + 200));
  };

  useEffect(() => () => clearAll(), []);

  const humanStats   = human.stat.split("·").map(s => s.trim()).filter(Boolean);
  const agenticStats = agentic.stat.split("·").map(s => s.trim()).filter(Boolean);

  return (
    <div>

      {/* Title */}
      <div className="mb-10">
        <h3 className="font-display text-2xl sm:text-3xl font-black leading-tight mb-2" style={{ color: "var(--brand-text-heading)" }}>
          {title}
        </h3>
        <p className="text-base leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{subtitle}</p>
      </div>

      {/* Stat comparison */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-4 mb-8">
        <div className="rounded-2xl p-5" style={{ background: "var(--brand-surface)", border: "1px solid var(--brand-surface-border)" }}>
          <p className="text-[0.58rem] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "var(--brand-text-muted)", opacity: 0.45 }}>Status Quo</p>
          <div className="space-y-1">
            {humanStats.map((s, i) => (
              <p key={i} className={`font-display font-black leading-none tabular-nums ${i === 0 ? "text-3xl" : "text-sm"}`}
                style={{ color: i === 0 ? "var(--brand-text-heading)" : "var(--brand-text-muted)" }}>
                {s}
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <span className="text-[0.6rem] font-bold tracking-widest uppercase" style={{ color: "var(--brand-text-muted)", opacity: 0.25 }}>vs</span>
        </div>

        <div className="rounded-2xl p-5" style={{ background: "color-mix(in srgb, var(--brand-primary) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--brand-primary) 20%, transparent)" }}>
          <p className="text-[0.58rem] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "var(--brand-primary)", opacity: 0.65 }}>With Agentforce</p>
          <div className="space-y-1">
            {agenticStats.map((s, i) => (
              <p key={i} className={`font-display font-black leading-none tabular-nums ${i === 0 ? "text-3xl" : "text-sm"}`}
                style={{ color: i === 0 ? "var(--brand-primary)" : "var(--brand-text-muted)" }}>
                {s}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Run button + status */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={phase === "idle" ? play : reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
          style={phase === "idle"
            ? { background: "var(--brand-primary)", color: "var(--brand-text-on-primary)", boxShadow: "0 4px 16px color-mix(in srgb, var(--brand-primary) 35%, transparent)" }
            : { background: "var(--brand-surface)", color: "var(--brand-text-muted)", border: "1px solid var(--brand-surface-border)" }
          }
        >
          {phase === "idle" ? (
            <>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden><path d="M3 2l7 4-7 4V2z"/></svg>
              Run both workflows
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M2 2h3v8H2zM7 2h3v8H7z"/>
              </svg>
              Reset
            </>
          )}
        </button>

        {phase === "running" && !agenticDone && (
          <p className="text-xs" style={{ color: "var(--brand-text-muted)", opacity: 0.45 }}>
            Running simultaneously…
          </p>
        )}
        {agenticDone && phase !== "complete" && (
          <p className="text-sm font-semibold animate-pulse" style={{ color: "var(--brand-primary)" }}>
            Agentforce: done. Manual process still running.
          </p>
        )}
      </div>

      {/* Workflows */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* ── Human ── */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--brand-surface-border)" }}>

          {/* Header */}
          <div className="px-5 pt-4 pb-3" style={{ background: "var(--brand-surface)", borderBottom: "1px solid var(--brand-surface-border)" }}>
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-sm font-bold" style={{ color: "var(--brand-text-heading)" }}>{human.label}</p>
              {phase !== "idle" && (
                <span className="text-[0.6rem] font-bold tracking-widest uppercase tabular-nums" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>
                  {humanStep >= 0 ? `Step ${humanStep + 1} of ${human.steps.length}` : "Starting…"}
                </span>
              )}
            </div>
            {/* Progress bar */}
            <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--brand-surface-border)" }}>
              <div
                className="h-full rounded-full transition-none"
                style={{
                  width: `${humanProgress}%`,
                  background: "#F59E0B",
                  transition: "width 32ms linear",
                }}
              />
            </div>
          </div>

          {/* Steps */}
          <div style={{ background: "var(--brand-card-bg)" }}>
            {human.steps.map((step, i) => {
              const isActive = phase !== "idle" && humanStep === i;
              const isDone   = phase !== "idle" && humanStep > i || phase === "complete";
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 px-5 py-4 transition-all duration-400"
                  style={{
                    borderBottom: i < human.steps.length - 1 ? "1px solid var(--brand-surface-border)" : undefined,
                    background: isActive ? "color-mix(in srgb, #F59E0B 5%, transparent)" : undefined,
                    opacity: phase === "idle" ? 0.4 : isDone ? 0.4 : 1,
                  }}
                >
                  <div
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 mt-0.5"
                    style={isActive
                      ? { background: "#F59E0B", color: "#1C1917" }
                      : isDone
                      ? { background: "var(--brand-surface)", color: "var(--brand-text-muted)" }
                      : { background: "var(--brand-surface)", color: "var(--brand-text-muted)", border: "1px solid var(--brand-surface-border)" }
                    }
                  >
                    {isDone ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                        <path d="M2 5.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.58rem] font-semibold tracking-widest uppercase mb-0.5" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>
                      {step.time} · {step.actor}
                    </p>
                    <p className="text-sm leading-snug" style={{ color: "var(--brand-text-heading)" }}>{step.action}</p>
                  </div>
                </div>
              );
            })}
            <div className="px-5 py-3.5" style={{ borderTop: "1px solid var(--brand-surface-border)" }}>
              <p className="text-xs" style={{ color: "var(--brand-text-muted)", opacity: 0.45 }}>
                Every step is manual. Every handoff is a delay.
              </p>
            </div>
          </div>
        </div>

        {/* ── Agentic ── */}
        <div
          className="rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            border: agenticDone
              ? "1px solid color-mix(in srgb, var(--brand-primary) 40%, transparent)"
              : "1px solid var(--brand-surface-border)",
          }}
        >

          {/* Header */}
          <div
            className="px-5 pt-4 pb-3 transition-all duration-500"
            style={{
              background: agenticDone ? "var(--brand-primary)" : "var(--brand-surface)",
              borderBottom: "1px solid color-mix(in srgb, var(--brand-surface-border) 50%, transparent)",
            }}
          >
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-sm font-bold transition-colors duration-500"
                style={{ color: agenticDone ? "var(--brand-text-on-primary)" : "var(--brand-text-heading)" }}>
                {agentic.label}
              </p>
              {agenticDone ? (
                <span
                  className="inline-flex items-center gap-1.5 text-[0.6rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{ background: "color-mix(in srgb, var(--brand-text-on-primary) 15%, transparent)", color: "var(--brand-text-on-primary)" }}
                >
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path d="M2 5.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Done
                </span>
              ) : phase !== "idle" ? (
                <span className="text-[0.6rem] font-bold tracking-widest uppercase tabular-nums" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>
                  {agenticStep >= 0 ? `Step ${agenticStep + 1} of ${agentic.steps.length}` : "Starting…"}
                </span>
              ) : null}
            </div>
            {/* Progress bar */}
            <div className="h-1 rounded-full overflow-hidden" style={{ background: agenticDone ? "color-mix(in srgb, var(--brand-text-on-primary) 20%, transparent)" : "var(--brand-surface-border)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${agenticProgress}%`,
                  background: agenticDone ? "var(--brand-text-on-primary)" : "var(--brand-primary)",
                  transition: "width 32ms linear",
                }}
              />
            </div>
          </div>

          {/* Steps */}
          <div style={{ background: "var(--brand-card-bg)" }}>
            {agentic.steps.map((step, i) => {
              const isHuman  = !step.autonomous;
              const isActive = phase !== "idle" && agenticStep === i && !agenticDone;
              const isDone   = phase !== "idle" && (agenticStep > i || agenticDone);
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 px-5 py-4 transition-all duration-300"
                  style={{
                    borderBottom: i < agentic.steps.length - 1 ? "1px solid var(--brand-surface-border)" : undefined,
                    background: isActive
                      ? isHuman
                        ? "color-mix(in srgb, #F59E0B 5%, transparent)"
                        : "color-mix(in srgb, var(--brand-primary) 4%, transparent)"
                      : undefined,
                    opacity: phase === "idle" ? 0.4 : isDone ? 0.45 : 1,
                  }}
                >
                  <div
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 mt-0.5"
                    style={isDone
                      ? { background: "color-mix(in srgb, var(--brand-primary) 12%, transparent)", color: "var(--brand-primary)" }
                      : isActive
                      ? isHuman
                        ? { background: "#F59E0B", color: "#1C1917" }
                        : { background: "var(--brand-primary)", color: "var(--brand-text-on-primary)" }
                      : { background: "var(--brand-surface)", color: "var(--brand-text-muted)", border: "1px solid var(--brand-surface-border)" }
                    }
                  >
                    {isDone ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                        <path d="M2 5.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.58rem] font-semibold tracking-widest uppercase mb-0.5"
                      style={{ color: isHuman ? "#D97706" : "var(--brand-primary)", opacity: 0.65 }}>
                      {step.agent} · {isHuman ? "Human Review" : "Autonomous"}
                    </p>
                    <p className="text-sm leading-snug" style={{ color: "var(--brand-text-heading)" }}>{step.action}</p>
                  </div>
                </div>
              );
            })}
            <div className="px-5 py-3.5" style={{ borderTop: "1px solid var(--brand-surface-border)" }}>
              <p className="text-xs" style={{ color: "var(--brand-text-muted)", opacity: 0.45 }}>
                One approval. Complete execution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Time saved callout */}
      {agenticDone && (
        <div
          className="mt-5 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{
            background: "color-mix(in srgb, var(--brand-primary) 6%, transparent)",
            border: "1px solid color-mix(in srgb, var(--brand-primary) 18%, transparent)",
          }}
        >
          <div>
            <p className="font-display text-base font-black mb-1" style={{ color: "var(--brand-text-heading)" }}>
              {phase === "complete"
                ? "Both workflows complete. The gap is the point."
                : "Agentforce finished. The manual process is still running."}
            </p>
            <p className="text-sm" style={{ color: "var(--brand-text-muted)" }}>
              {agenticStats[0] ?? agentic.stat} with Agentforce vs {humanStats[0] ?? human.stat} without.
            </p>
          </div>
          <div className="shrink-0 text-center sm:text-right">
            <p className="text-[0.58rem] font-bold tracking-[0.14em] uppercase mb-1" style={{ color: "var(--brand-primary)", opacity: 0.6 }}>
              Time reclaimed
            </p>
            <p className="font-display text-3xl font-black tabular-nums" style={{ color: "var(--brand-primary)" }}>
              {humanStats[0] ?? human.stat}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
