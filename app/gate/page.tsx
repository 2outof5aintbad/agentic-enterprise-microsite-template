"use client";

import { useState } from "react";
import { ACCOUNT } from "@/data/account";

export default function GatePage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Incorrect password.");
        setLoading(false);
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] flex">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-col w-[52%] relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 15%, var(--brand-bg)), var(--brand-bg))` }} />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[var(--brand-bg)] to-transparent z-10" />

        <div className="relative z-20 flex items-center gap-3 p-10">
          <div className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
          <span className="text-white/40 text-xs font-semibold tracking-[0.15em] uppercase">The Agentic Enterprise</span>
        </div>

        {/* Account hero image — place at /public/images/gate-hero.jpg to populate */}
        <div className="relative flex-1 flex items-center justify-center opacity-20">
          <svg viewBox="0 0 200 200" className="w-64 h-64" fill="none" aria-hidden>
            <circle cx="100" cy="100" r="80" stroke="var(--brand-primary)" strokeWidth="2" strokeDasharray="8 6"/>
            <circle cx="100" cy="100" r="50" fill="var(--brand-primary)" fillOpacity="0.15"/>
            <path d="M70 100 Q100 70 130 100 Q100 130 70 100Z" fill="var(--brand-primary)" fillOpacity="0.3"/>
          </svg>
        </div>

        <div className="relative z-20 px-10 pb-10">
          <h2 className="text-3xl font-black text-white leading-tight tracking-tight mb-2">
            Built for the<br />
            <span style={{ color: "var(--brand-primary)" }}>{ACCOUNT.company}</span> team.
          </h2>
          <p className="text-sm text-white/35 leading-relaxed max-w-xs">
            A private AI transformation briefing powered by Salesforce Agentforce.
          </p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col bg-[var(--brand-bg)] relative">
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

        <div className="lg:hidden flex items-center gap-3 p-8">
          <div className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
          <span className="text-white/40 text-xs font-semibold tracking-[0.15em] uppercase">The Agentic Enterprise</span>
        </div>

        <div className="flex-1 flex items-center justify-center px-10 lg:px-16">
          <div className="w-full max-w-[340px]">

            <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[var(--brand-primary)] mb-6">
              Private Access
            </p>

            <h1 className="text-[2rem] font-black text-white leading-[1.15] tracking-tight mb-2">
              Enter your<br />access password
            </h1>
            <p className="text-sm text-white/35 mb-10 leading-relaxed">
              This briefing is confidential and invitation-only.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Password"
                required
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/20 text-sm font-medium focus:outline-none focus:border-white/20 focus:bg-white/[0.07] transition-all"
              />

              {error && (
                <p className="text-xs text-[var(--brand-primary)] px-1">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide transition-all duration-150"
                style={{ background: "var(--brand-primary)" }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" strokeOpacity="0.3"/>
                      <path d="M8 2a6 6 0 016 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Verifying
                  </>
                ) : (
                  "Access Briefing"
                )}
              </button>
            </form>

          </div>
        </div>

        <div className="px-10 lg:px-16 pb-10">
          <p className="text-xs text-white/15">
            Prepared by the Salesforce Account Team<br />
            Salesforce × {ACCOUNT.company} · Confidential
          </p>
        </div>
      </div>
    </div>
  );
}
