"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ACCOUNT } from "@/data/account";

type Agent    = typeof ACCOUNT.agentTracker.agents[number];
type Milestone = typeof ACCOUNT.agentTracker.platformMilestones[number];

// Status display config — intentionally minimal color use
const STATUS = {
  live:    { label: "Live",      color: "#22c55e", pulse: true  },
  pilot:   { label: "In Pilot",  color: "#f59e0b", pulse: false },
  planned: { label: "Planned",   color: "#60a5fa", pulse: false },
};

// Deterministic avatar background — single hue, no gradient noise
const AVATAR_HUES = [211, 160, 32, 262, 346, 175, 200];
function avatarHue(id: string) {
  const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_HUES[hash % AVATAR_HUES.length];
}

function initials(name: string) {
  return name.split(/[\s—–-]+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function Avatar({ agent, size, className = "" }: { agent: Agent; size: number; className?: string }) {
  const [err, setErr] = useState(false);
  const src = "avatar" in agent ? agent.avatar as string | undefined : undefined;
  const hue = avatarHue(agent.id);

  return (
    <div
      className={`flex items-center justify-center overflow-hidden shrink-0 ${className}`}
      style={{ background: `hsl(${hue} 60% 20%)` }}
    >
      {src && !err ? (
        <Image src={src} alt={agent.name} width={size} height={size} className="w-full h-full object-cover object-top" onError={() => setErr(true)} />
      ) : (
        <span className="font-black select-none" style={{ fontSize: size * 0.3, color: `hsl(${hue} 70% 75%)` }}>
          {initials(agent.name)}
        </span>
      )}
    </div>
  );
}

function StatusDot({ status }: { status: keyof typeof STATUS }) {
  const s = STATUS[status];
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full shrink-0 ${s.pulse ? "animate-pulse" : ""}`}
      style={{ background: s.color }}
    />
  );
}

// ── Single consistent agent card ─────────────────────────────────────────────
function AgentCard({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  const s = STATUS[agent.status];
  return (
    <button
      onClick={onClick}
      className="group w-full h-full text-left rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #2563eb 100%)" }}
    >
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Top: avatar + status */}
      <div className="relative flex items-start justify-between gap-3 mb-5">
        <Avatar agent={agent} size={48} className="w-12 h-12 rounded-xl" />
        <div className="flex items-center gap-1.5 pt-0.5">
          <StatusDot status={agent.status} />
          <span className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-white/70">
            {s.label}
          </span>
        </div>
      </div>

      {/* Identity */}
      <h3 className="relative font-display text-lg font-black leading-tight mb-1 text-white">
        {agent.name}
      </h3>
      <p className="relative text-xs mb-5 leading-snug text-white/55">
        {agent.function}
      </p>

      {/* Metrics */}
      {agent.metrics && agent.metrics.length > 0 ? (
        <div className="relative flex items-center gap-5 pt-4 border-t border-white/15">
          {agent.metrics.slice(0, 2).map((m, i) => (
            <div key={i}>
              <p className="font-display text-xl font-black tabular-nums leading-none mb-0.5 text-white">
                {m.value}
              </p>
              <p className="text-[0.58rem] leading-snug text-white/50">
                {m.label}
              </p>
            </div>
          ))}
          <p className="ml-auto text-[0.58rem] shrink-0 text-white/30">
            {agent.goLive}
          </p>
        </div>
      ) : (
        <p className="relative text-[0.6rem] pt-4 border-t border-white/15 text-white/30">
          {agent.goLive}
        </p>
      )}
    </button>
  );
}

// ── Detail modal ──────────────────────────────────────────────────────────────
function AgentModal({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  const s = STATUS[agent.status];

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" ref={el => { if (el) el.scrollTop = 0; }}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative z-10 w-full max-w-lg rounded-2xl overflow-hidden"
          style={{ background: "var(--brand-bg)", border: "1px solid var(--brand-surface-border)", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}
        >
          {/* Header */}
          <div className="px-7 pt-7 pb-6" style={{ borderBottom: "1px solid var(--brand-surface-border)" }}>
            <div className="flex items-start gap-4">
              <Avatar agent={agent} size={56} className="w-14 h-14 rounded-xl" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <StatusDot status={agent.status} />
                  <span className="text-[0.6rem] font-bold tracking-[0.14em] uppercase" style={{ color: s.color }}>
                    {s.label}
                  </span>
                  <span className="text-[0.6rem] font-medium" style={{ color: "var(--brand-text-muted)", opacity: 0.35 }}>
                    · {agent.entity}
                  </span>
                </div>
                <h2 className="font-display text-xl font-black leading-tight" style={{ color: "var(--brand-text-heading)" }}>
                  {agent.name}
                </h2>
                <p className="text-xs mt-1 font-medium" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>
                  {agent.function}
                </p>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 hover:bg-[var(--brand-surface)]"
                style={{ border: "1px solid var(--brand-surface-border)", color: "var(--brand-text-muted)" }}
              >
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <p className="text-xs mt-4" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>
              {agent.goLive}
            </p>
            <p className="text-sm font-semibold italic mt-1.5 leading-snug" style={{ color: "var(--brand-primary)" }}>
              &ldquo;{agent.tagline}&rdquo;
            </p>
          </div>

          {/* Body */}
          <div className="px-7 py-6 space-y-6">
            <p className="text-sm leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>
              {agent.description}
            </p>

            {agent.metrics && agent.metrics.length > 0 && (
              <div>
                <p className="text-[0.58rem] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: "var(--brand-text-muted)", opacity: 0.35 }}>
                  {agent.status === "planned" ? "Target Metrics" : "Outcomes"}
                </p>
                <div className={`grid gap-3 ${agent.metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                  {agent.metrics.map((m, i) => (
                    <div key={i} className="rounded-xl p-4" style={{ background: "var(--brand-surface)", border: "1px solid var(--brand-surface-border)" }}>
                      <p className="font-display text-2xl font-black tabular-nums mb-1" style={{ color: "var(--brand-primary)" }}>{m.value}</p>
                      <p className="text-xs leading-snug" style={{ color: "var(--brand-text-muted)" }}>{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {agent.highlights && agent.highlights.length > 0 && (
              <div>
                <p className="text-[0.58rem] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: "var(--brand-text-muted)", opacity: 0.35 }}>
                  Key Details
                </p>
                <ul className="space-y-3">
                  {agent.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                        <circle cx="7" cy="7" r="6" fill="color-mix(in srgb, var(--brand-primary) 12%, transparent)"/>
                        <path d="M4.5 7.5l1.5 1.5 3.5-3.5" stroke="var(--brand-primary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-7 py-5 flex items-center justify-between gap-4" style={{ borderTop: "1px solid var(--brand-surface-border)", background: "var(--brand-surface)" }}>
            <p className="text-xs" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>
              Questions? Talk to the account team.
            </p>
            <a
              href="/account-team"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--brand-primary)", color: "var(--brand-text-on-primary)" }}
            >
              Account Team
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Milestone ─────────────────────────────────────────────────────────────────
function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: "var(--brand-card-bg)", border: "1px solid var(--brand-card-border)" }}>
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M3 10.5l5 5L17 4.5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[0.58rem] font-bold tracking-[0.14em] uppercase" style={{ color: "#22c55e" }}>
              Live · {milestone.launched}
            </span>
          </div>
          <h3 className="font-display text-base font-black mb-1" style={{ color: "var(--brand-text-heading)" }}>{milestone.name}</h3>
          <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--brand-text-muted)", opacity: 0.6 }}>{milestone.description}</p>
          <div className={`grid gap-3 mb-4 ${milestone.stats.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {milestone.stats.map((s, i) => (
              <div key={i} className="rounded-xl px-4 py-3" style={{ background: "var(--brand-surface)", border: "1px solid var(--brand-surface-border)" }}>
                <p className="font-display text-xl font-black leading-none mb-1" style={{ color: "var(--brand-text-heading)" }}>{s.value}</p>
                <p className="text-[0.6rem]" style={{ color: "var(--brand-text-muted)", opacity: 0.45 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <ul className="space-y-2">
            {milestone.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed" style={{ color: "var(--brand-text-muted)", opacity: 0.6 }}>
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

// ── Section divider label ─────────────────────────────────────────────────────
function SectionLabel({ status, count }: { status: keyof typeof STATUS; count: number }) {
  const s = STATUS[status];
  return (
    <div className="flex items-center gap-3 mb-7">
      <span className={`w-1.5 h-1.5 rounded-full ${s.pulse ? "animate-pulse" : ""}`} style={{ background: s.color }} />
      <p className="text-xs font-bold tracking-[0.16em] uppercase" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>
        {s.label}
        <span className="ml-2 opacity-60">— {count}</span>
      </p>
      <div className="flex-1 h-px" style={{ background: "var(--brand-surface-border)" }} />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
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
      <div className="max-w-6xl mx-auto px-6 pb-20 space-y-14">

        {/* Live */}
        {live.length > 0 && (
          <div>
            <SectionLabel status="live" count={live.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {live.map(a => <AgentCard key={a.id} agent={a} onClick={() => setSelected(a)} />)}
            </div>
          </div>
        )}

        {/* Milestones */}
        {milestones.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <p className="text-xs font-bold tracking-[0.16em] uppercase" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>
                Platform Milestones
              </p>
              <div className="flex-1 h-px" style={{ background: "var(--brand-surface-border)" }} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {milestones.map(m => <MilestoneCard key={m.id} milestone={m} />)}
            </div>
          </div>
        )}

        {/* Pilot */}
        {pilot.length > 0 && (
          <div>
            <SectionLabel status="pilot" count={pilot.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pilot.map(a => <AgentCard key={a.id} agent={a} onClick={() => setSelected(a)} />)}
            </div>
          </div>
        )}

        {/* Planned */}
        {planned.length > 0 && (
          <div>
            <SectionLabel status="planned" count={planned.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {planned.map(a => <AgentCard key={a.id} agent={a} onClick={() => setSelected(a)} />)}
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
