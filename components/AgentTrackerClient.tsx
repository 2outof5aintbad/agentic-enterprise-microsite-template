"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ACCOUNT } from "@/data/account";

type Agent    = typeof ACCOUNT.agentTracker.agents[number];
type Milestone = typeof ACCOUNT.agentTracker.platformMilestones[number];

const STATUS_CONFIG = {
  live:    { label: "Live",    dot: "bg-emerald-400 animate-pulse", pill: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" },
  pilot:   { label: "In Pilot", dot: "bg-amber-400",  pill: "bg-amber-500/15 text-amber-300 border-amber-500/25" },
  planned: { label: "Planned",  dot: "bg-blue-400",   pill: "bg-blue-500/15 text-blue-300 border-blue-500/25" },
};

const GRADIENTS = [
  "from-[#0066FF] to-[#0041CC]",
  "from-emerald-600 to-emerald-900",
  "from-amber-600 to-amber-900",
  "from-purple-600 to-purple-900",
  "from-rose-700 to-rose-950",
  "from-teal-600 to-teal-900",
  "from-indigo-600 to-indigo-900",
];

function gradient(id: string) {
  const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return GRADIENTS[hash % GRADIENTS.length];
}

function initials(name: string) {
  return name.split(/[\s—–-]+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function Avatar({ agent, size, className = "" }: { agent: Agent; size: number; className?: string }) {
  const [err, setErr] = useState(false);
  const src = "avatar" in agent ? agent.avatar as string | undefined : undefined;
  return (
    <div className={`bg-gradient-to-br ${gradient(agent.id)} flex items-center justify-center overflow-hidden shrink-0 ${className}`}>
      {src && !err ? (
        <Image src={src} alt={agent.name} width={size} height={size} className="w-full h-full object-cover object-top" onError={() => setErr(true)} />
      ) : (
        <span className="text-white font-black select-none" style={{ fontSize: size * 0.3 }}>{initials(agent.name)}</span>
      )}
    </div>
  );
}

// ── Live agent card — prominent, shows metrics on face ────────────────────────
function LiveCard({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ background: "var(--brand-card-bg)", border: "1px solid var(--brand-card-border)" }}
    >
      {/* Top stripe */}
      <div className="h-0.5 w-full bg-emerald-400/60" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="relative">
            <Avatar agent={agent} size={56} className="w-14 h-14 rounded-2xl" />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 bg-emerald-400 animate-pulse" style={{ borderColor: "var(--brand-card-bg)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.55rem] font-bold tracking-widest uppercase border bg-emerald-500/15 text-emerald-300 border-emerald-500/25">
                Live
              </span>
              <span className="text-[0.6rem] font-medium truncate" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>{agent.function}</span>
            </div>
            <h3 className="font-display text-lg font-black leading-tight group-hover:text-[var(--brand-primary)] transition-colors duration-200" style={{ color: "var(--brand-text-heading)" }}>
              {agent.name}
            </h3>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs italic leading-relaxed mb-5" style={{ color: "var(--brand-text-muted)" }}>
          &ldquo;{agent.tagline}&rdquo;
        </p>

        {/* Metrics — the payoff */}
        {agent.metrics && agent.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-4" style={{ borderTop: "1px solid var(--brand-surface-border)" }}>
            {agent.metrics.map((m, i) => (
              <div key={i}>
                <p className="font-display text-2xl font-black tabular-nums leading-none mb-0.5" style={{ color: "var(--brand-primary)" }}>{m.value}</p>
                <p className="text-[0.6rem] leading-snug" style={{ color: "var(--brand-text-muted)", opacity: 0.55 }}>{m.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

// ── Pilot agent card — medium, shows what it targets ─────────────────────────
function PilotCard({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left flex items-start gap-4 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: "var(--brand-card-bg)", border: "1px solid var(--brand-card-border)" }}
    >
      <div className="relative shrink-0">
        <Avatar agent={agent} size={44} className="w-11 h-11 rounded-xl" />
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 bg-amber-400" style={{ borderColor: "var(--brand-card-bg)" }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.55rem] font-bold tracking-widest uppercase border bg-amber-500/15 text-amber-300 border-amber-500/25">
            In Pilot
          </span>
          <span className="text-[0.58rem] font-medium" style={{ color: "var(--brand-text-muted)", opacity: 0.35 }}>{agent.goLive}</span>
        </div>
        <h3 className="font-display text-base font-black leading-tight mb-1.5 group-hover:text-[var(--brand-primary)] transition-colors duration-200" style={{ color: "var(--brand-text-heading)" }}>
          {agent.name}
        </h3>
        {agent.metrics && agent.metrics.length > 0 && (
          <div className="flex items-center gap-3">
            {agent.metrics.slice(0, 2).map((m, i) => (
              <div key={i} className="flex items-baseline gap-1">
                <span className="font-display text-sm font-black tabular-nums" style={{ color: "var(--brand-primary)" }}>{m.value}</span>
                <span className="text-[0.58rem]" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>{m.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-1 opacity-25 group-hover:opacity-60 transition-opacity" aria-hidden>
        <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="var(--brand-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// ── Planned agent row — compact list ─────────────────────────────────────────
function PlannedRow({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-150 hover:bg-[var(--brand-surface)]"
    >
      <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold leading-tight group-hover:text-[var(--brand-primary)] transition-colors duration-150" style={{ color: "var(--brand-text-heading)" }}>
          {agent.name}
        </p>
        <p className="text-xs" style={{ color: "var(--brand-text-muted)", opacity: 0.45 }}>{agent.function} · {agent.goLive}</p>
      </div>
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="shrink-0 opacity-20 group-hover:opacity-50 transition-opacity" aria-hidden>
        <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="var(--brand-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// ── Detail modal ──────────────────────────────────────────────────────────────
function AgentModal({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  const cfg   = STATUS_CONFIG[agent.status];
  const isLive = agent.status === "live";

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" ref={el => { if (el) el.scrollTop = 0; }}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col" style={{ background: "var(--brand-bg)", border: "1px solid var(--brand-surface-border)" }}>

          {/* Status stripe */}
          <div className={`h-0.5 w-full shrink-0 ${isLive ? "bg-emerald-400" : agent.status === "pilot" ? "bg-amber-400" : "bg-blue-400"}`} />

          {/* Header */}
          <div className="px-7 pt-7 pb-5" style={{ borderBottom: "1px solid var(--brand-surface-border)" }}>
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <Avatar agent={agent} size={60} className="w-15 h-15 rounded-2xl" style={{ width: 60, height: 60 }} />
                <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 ${cfg.dot}`} style={{ borderColor: "var(--brand-bg)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.58rem] font-bold tracking-widest uppercase border ${cfg.pill}`}>
                    {cfg.label}
                  </span>
                  <span className="text-xs font-medium" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>{agent.entity}</span>
                </div>
                <h2 className="font-display text-xl font-black leading-tight mb-0.5" style={{ color: "var(--brand-text-heading)" }}>{agent.name}</h2>
                <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>{agent.function}</p>
              </div>
              <button onClick={onClose} className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all" style={{ border: "1px solid var(--brand-surface-border)", color: "var(--brand-text-muted)" }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </button>
            </div>

            <div className="flex items-center gap-1.5 mt-4 text-xs font-medium" style={{ color: "var(--brand-text-muted)", opacity: 0.45 }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.1"/><path d="M6 3.5v3l1.5 1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
              {agent.goLive}
            </div>
            <p className="text-sm font-semibold italic mt-2 leading-snug" style={{ color: "var(--brand-primary)" }}>
              &ldquo;{agent.tagline}&rdquo;
            </p>
          </div>

          {/* Body */}
          <div className="px-7 py-6 space-y-6">
            <p className="text-sm leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{agent.description}</p>

            {agent.metrics && agent.metrics.length > 0 && (
              <div>
                <p className="text-[0.6rem] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>
                  {agent.status === "planned" ? "Target Metrics" : "Outcomes"}
                </p>
                <div className={`grid gap-3 ${agent.metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                  {agent.metrics.map((m, i) => (
                    <div key={i} className="rounded-xl p-4" style={{ background: "var(--brand-surface)", border: "1px solid var(--brand-surface-border)" }}>
                      <p className="font-display text-2xl font-black tabular-nums leading-none mb-1" style={{ color: "var(--brand-primary)" }}>{m.value}</p>
                      <p className="text-xs leading-snug" style={{ color: "var(--brand-text-muted)" }}>{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {agent.highlights && agent.highlights.length > 0 && (
              <div>
                <p className="text-[0.6rem] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>Key Details</p>
                <ul className="space-y-2.5">
                  {agent.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full shrink-0 mt-0.5 flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--brand-primary) 12%, transparent)" }}>
                        <svg width="7" height="7" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M2 5l2.5 2.5L8 2.5" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span className="text-sm leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-7 py-5 flex items-center justify-between gap-4" style={{ borderTop: "1px solid var(--brand-surface-border)", background: "var(--brand-surface)" }}>
            <p className="text-xs" style={{ color: "var(--brand-text-muted)", opacity: 0.45 }}>Questions about this agent? Talk to the account team.</p>
            <a href="/account-team" className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--brand-primary)", color: "var(--brand-text-on-primary)" }}>
              Account Team
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Platform milestone ────────────────────────────────────────────────────────
function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: "var(--brand-card-bg)", border: "1px solid color-mix(in srgb, #22c55e 20%, transparent)" }}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M3 10.5l5 5L17 4.5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.55rem] font-bold tracking-widest uppercase border bg-emerald-500/15 text-emerald-300 border-emerald-500/25">
              Live · {milestone.launched}
            </span>
            <span className="text-[0.6rem] font-medium" style={{ color: "var(--brand-text-muted)", opacity: 0.35 }}>Platform Milestone</span>
          </div>
          <h3 className="font-display text-base font-black mb-1" style={{ color: "var(--brand-text-heading)" }}>{milestone.name}</h3>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--brand-text-muted)" }}>{milestone.description}</p>
          <div className={`grid gap-3 mb-4 ${milestone.stats.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {milestone.stats.map((s, i) => (
              <div key={i} className="rounded-xl px-4 py-3" style={{ background: "var(--brand-surface)", border: "1px solid var(--brand-surface-border)" }}>
                <p className="font-display text-xl font-black leading-none mb-1" style={{ color: "var(--brand-text-heading)" }}>{s.value}</p>
                <p className="text-[0.6rem]" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <ul className="space-y-1.5">
            {milestone.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                  <path d="M2 5l2 2L8 2" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function AgentTrackerClient({ agents, milestones = [] }: { agents: Agent[]; milestones?: Milestone[] }) {
  const [selected, setSelected] = useState<Agent | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const live    = agents.filter(a => a.status === "live");
  const pilot   = agents.filter(a => a.status === "pilot");
  const planned = agents.filter(a => a.status === "planned");

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 space-y-16 pb-16">

        {/* Live agents — featured */}
        {live.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>
                Live in Production · {live.length} agent{live.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {live.map(agent => (
                <LiveCard key={agent.id} agent={agent} onClick={() => setSelected(agent)} />
              ))}
            </div>
          </div>
        )}

        {/* Platform milestones */}
        {milestones.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <p className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>
                Platform Milestones
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {milestones.map(m => <MilestoneCard key={m.id} milestone={m} />)}
            </div>
          </div>
        )}

        {/* Pilot agents */}
        {pilot.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <p className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>
                Active Pilots · {pilot.length} agent{pilot.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pilot.map(agent => (
                <PilotCard key={agent.id} agent={agent} onClick={() => setSelected(agent)} />
              ))}
            </div>
          </div>
        )}

        {/* Planned agents */}
        {planned.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <p className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>
                On the Roadmap · {planned.length} agent{planned.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--brand-surface-border)" }}>
              {planned.map((agent, i) => (
                <div key={agent.id} style={i > 0 ? { borderTop: "1px solid var(--brand-surface-border)" } : {}}>
                  <PlannedRow agent={agent} onClick={() => setSelected(agent)} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {selected && createPortal(
        <AgentModal agent={selected} onClose={() => setSelected(null)} />,
        document.body
      )}
    </>
  );
}
