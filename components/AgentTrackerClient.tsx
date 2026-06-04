"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ACCOUNT } from "@/data/account";

type Agent = typeof ACCOUNT.agentTracker.agents[number];

const STATUS_CONFIG = {
  live:    { label: "Live",    dot: "bg-emerald-400", pill: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", pillLight: "bg-emerald-500/10 text-emerald-700 border-emerald-500/25" },
  pilot:   { label: "Pilot",   dot: "bg-amber-400",   pill: "bg-amber-500/20 text-amber-300 border-amber-500/30",       pillLight: "bg-amber-500/10 text-amber-700 border-amber-500/25" },
  planned: { label: "Planned", dot: "bg-blue-400",    pill: "bg-blue-500/20 text-blue-300 border-blue-500/30",          pillLight: "bg-blue-500/10 text-blue-700 border-blue-500/25" },
};

const STATIC_GRADIENTS = [
  "from-[#0066FF] to-[#0041CC]",
  "from-emerald-600 to-emerald-900",
  "from-amber-600 to-amber-900",
  "from-blue-600 to-blue-900",
  "from-purple-600 to-purple-900",
  "from-rose-700 to-rose-950",
  "from-teal-600 to-teal-900",
];

function avatarGradient(id: string) {
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return STATIC_GRADIENTS[hash % STATIC_GRADIENTS.length];
}

function initials(name: string) {
  return name.split(/[\s—–-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function AgentAvatar({ agent, sizePx, className = "" }: { agent: Agent; sizePx: number; className?: string }) {
  const [errored, setErrored] = useState(false);
  const src = "avatar" in agent ? agent.avatar as string | undefined : undefined;
  const showImage = src && !errored;

  return (
    <div className={`bg-gradient-to-br ${avatarGradient(agent.id)} flex items-center justify-center overflow-hidden ${className}`}>
      {showImage ? (
        <Image
          src={src}
          alt={agent.name}
          width={sizePx}
          height={sizePx}
          className="w-full h-full object-cover object-top"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="text-white font-black select-none" style={{ fontSize: sizePx * 0.28 }}>
          {initials(agent.name)}
        </span>
      )}
    </div>
  );
}

// ── Grid card ─────────────────────────────────────────────────────────────────

function AgentGridCard({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  const cfg = STATUS_CONFIG[agent.status];
  const isLive = agent.status === "live";

  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center text-center h-full rounded-2xl bg-white/[0.04] border border-white/8 hover:border-[var(--brand-primary)]/40 hover:bg-white/[0.07] transition-all duration-300 p-6 hover:-translate-y-1"
    >
      {/* Avatar */}
      <div className="relative mb-5">
        <AgentAvatar
          agent={agent}
          sizePx={80}
          className="w-20 h-20 rounded-full ring-2 ring-white/10 group-hover:ring-[var(--brand-primary)]/30 transition-all duration-300"
        />
        <span className={`absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-2 border-[#0A0A0A] ${cfg.dot} ${isLive ? "animate-pulse" : ""}`} />
      </div>

      {/* Status pill */}
      <div className="mb-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.58rem] font-bold tracking-widest uppercase border ${cfg.pill}`}>
          {cfg.label}
        </span>
      </div>

      {/* Name */}
      <h3 className="font-display text-base font-black text-white leading-tight mb-3 group-hover:text-[var(--brand-primary)] transition-colors duration-200">
        {agent.name}
      </h3>

      {/* Tagline */}
      <p className="text-xs text-white/50 leading-relaxed italic flex-1">
        &ldquo;{agent.tagline}&rdquo;
      </p>

      {/* CTA */}
      <div className="mt-4 flex items-center gap-1 text-[0.65rem] font-bold text-white/20 group-hover:text-[var(--brand-primary)]/70 transition-colors duration-200">
        Details
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden className="group-hover:translate-x-0.5 transition-transform duration-200">
          <path d="M2.5 6h7M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </button>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function AgentModal({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  const cfg = STATUS_CONFIG[agent.status];
  const isLive = agent.status === "live";
  const hasMetrics = agent.metrics && agent.metrics.length > 0;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" ref={(el) => { if (el) el.scrollTop = 0; }}>
      <div className="fixed inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">

          {/* Accent bar */}
          <div className={`h-1 w-full shrink-0 ${isLive ? "bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500/20" : "bg-[var(--brand-primary)]"}`} />

          <div className="flex-1">
            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b border-black/6">
              <div className="flex items-start gap-5">
                <div className="relative shrink-0">
                  <AgentAvatar
                    agent={agent}
                    sizePx={64}
                    className="w-16 h-16 rounded-2xl ring-2 ring-black/8"
                  />
                  <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${cfg.dot} ${isLive ? "animate-pulse" : ""}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[0.6rem] font-bold tracking-widest uppercase border ${cfg.pillLight}`}>
                      {cfg.label}
                    </span>
                    <span className="text-xs text-black/35 font-medium">{agent.entity}</span>
                  </div>
                  <h2 className="font-display text-2xl font-black text-[#0A0A0A] leading-tight mb-1">{agent.name}</h2>
                  <p className="text-xs font-semibold tracking-wide text-black/35 uppercase">{agent.function}</p>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="shrink-0 w-9 h-9 rounded-xl border border-black/8 flex items-center justify-center text-black/35 hover:text-[#0A0A0A] hover:border-black/20 transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Go-live + tagline */}
              <div className="mt-4 flex items-center gap-1.5 text-xs text-black/40 font-medium mb-3">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.1"/>
                  <path d="M6 3.5v3l1.5 1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                </svg>
                {agent.goLive}
              </div>
              <p className="text-base font-semibold italic leading-snug" style={{ color: "var(--brand-primary)" }}>
                &ldquo;{agent.tagline}&rdquo;
              </p>
            </div>

            {/* Body */}
            <div className="px-8 py-6 space-y-6">
              <p className="text-base text-[#3D3D3D] leading-relaxed">{agent.description}</p>

              {hasMetrics && (
                <div>
                  <div className="mb-4">
                    <span className="eyebrow-pill-outline">{agent.status === "planned" ? "Target Metrics" : "Outcomes"}</span>
                  </div>
                  <div className={`grid gap-4 ${agent.metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                    {agent.metrics.map((m, i) => (
                      <div key={i} className="bg-[var(--brand-light)] rounded-2xl border border-black/6 px-5 py-5">
                        <p className="font-display text-3xl font-black text-[#0A0A0A] tabular-nums leading-none mb-1.5">{m.value}</p>
                        <p className="text-xs text-[#3D3D3D] leading-snug">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {agent.highlights && agent.highlights.length > 0 && (
                <div>
                  <div className="mb-4">
                    <span className="eyebrow-pill-outline">Key Details</span>
                  </div>
                  <ul className="space-y-3">
                    {agent.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "color-mix(in srgb, var(--brand-primary) 12%, transparent)" }}>
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden>
                            <path d="M2 5l2.5 2.5L8 2.5" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-sm text-[#3D3D3D] leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-black/6 bg-[var(--brand-light)] shrink-0 flex items-center justify-between gap-4">
            <p className="text-xs text-black/35 leading-snug max-w-xs">Questions about this agent? Reach out to the account team.</p>
            <a
              href="/account-team"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--brand-primary)" }}
            >
              Account Team
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Platform Milestone card ───────────────────────────────────────────────────

type Milestone = typeof ACCOUNT.agentTracker.platformMilestones[number];

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-6">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M3 10.5l5 5L17 4.5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.58rem] font-bold tracking-widest uppercase border bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Live — {milestone.launched}
            </span>
            <span className="text-[0.65rem] text-white/30 font-medium">Platform Milestone</span>
          </div>
          <h3 className="font-display text-base font-black text-white mb-1">{milestone.name}</h3>
          <p className="text-xs text-white/55 leading-relaxed mb-4">{milestone.description}</p>

          <div className={`grid gap-3 mb-4 ${milestone.stats.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {milestone.stats.map((s, i) => (
              <div key={i} className="bg-white/[0.04] rounded-xl border border-white/8 px-4 py-3">
                <p className="font-display text-xl font-black text-white leading-none mb-1">{s.value}</p>
                <p className="text-[0.65rem] text-white/45 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>

          <ul className="space-y-2">
            {milestone.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-white/50 leading-relaxed">
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

  return (
    <>
      <section className="bg-transparent">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-4">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/30 mb-6">Agentforce Deployments</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <AgentGridCard key={agent.id} agent={agent} onClick={() => setSelected(agent)} />
            ))}
          </div>
        </div>
      </section>

      {milestones.length > 0 && (
        <section className="bg-transparent">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/30 mb-4">Platform Milestones</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {milestones.map((m) => (
                <MilestoneCard key={m.id} milestone={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      {selected && createPortal(
        <AgentModal agent={selected} onClose={() => setSelected(null)} />,
        document.body
      )}
    </>
  );
}
