"use client";

import { useState } from "react";
import Image from "next/image";
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

  const customerLogo = ACCOUNT.brand.customerLogoDark ?? ACCOUNT.brand.customerLogo;

  return (
    <div className="min-h-screen flex" style={{ background: "var(--brand-bg)" }}>

      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-col w-[52%] relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 15%, var(--brand-bg)), var(--brand-bg))` }} />
        <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none" style={{ background: "linear-gradient(to top, var(--brand-bg), transparent)", zIndex: 10 }} />

        <div className="relative z-20 flex items-center gap-3 p-10">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--brand-primary)" }} />
          <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>
            The Agentic Enterprise
          </span>
        </div>

        {/* Replace with /images/gate-hero.jpg for a custom account background image */}
        <div className="relative flex-1 flex items-end justify-center overflow-hidden">
          <Image
            src="/images/ASTRO_NoOutfit_WalkRight_SFS20_sRGB.png"
            alt=""
            width={340}
            height={420}
            className="object-contain object-bottom select-none"
            aria-hidden
            priority
          />
        </div>

        <div className="relative z-20 px-10 pb-10">
          <h2 className="text-3xl font-black leading-tight tracking-tight mb-2" style={{ color: "var(--brand-text-heading)" }}>
            Built for the<br />
            <span style={{ color: "var(--brand-primary)" }}>{ACCOUNT.company}</span> team.
          </h2>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>
            A private AI transformation briefing prepared exclusively for your organization.
          </p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col relative" style={{ background: "var(--brand-bg)" }}>
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, var(--brand-surface-border), transparent)" }} />

        <div className="lg:hidden flex items-center gap-3 p-8">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--brand-primary)" }} />
          <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>
            The Agentic Enterprise
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center px-10 lg:px-16">
          <div className="w-full max-w-[340px]">

            {/* Logo lockup */}
            <div className="mb-8">
              {customerLogo ? (
                <div className="flex items-center gap-3">
                  <Image
                    src={customerLogo}
                    alt={ACCOUNT.company}
                    width={96}
                    height={28}
                    className="object-contain object-left max-h-7"
                    style={{ width: "auto" }}
                  />
                  <span className="text-sm font-light" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>×</span>
                  <Image
                    src="/images/Salesforce.com_logo.svg.png"
                    alt="Salesforce"
                    width={96}
                    height={22}
                    className="object-contain opacity-60"
                    style={{ width: "auto" }}
                  />
                </div>
              ) : (
                <Image
                  src="/images/Salesforce.com_logo.svg.png"
                  alt="Salesforce"
                  width={120}
                  height={28}
                  className="object-contain opacity-70"
                />
              )}
            </div>

            <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-5" style={{ color: "var(--brand-primary)" }}>
              Private Access
            </p>

            <h1 className="text-[2rem] font-black leading-[1.15] tracking-tight mb-2" style={{ color: "var(--brand-text-heading)" }}>
              Enter your<br />access password
            </h1>
            <p className="text-sm mb-10 leading-relaxed" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>
              This briefing is confidential and prepared exclusively for {ACCOUNT.company}.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Password"
                required
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none transition-all"
                style={{
                  background: "var(--brand-surface)",
                  border: "1px solid var(--brand-surface-border)",
                  color: "var(--brand-text)",
                }}
              />

              {error && (
                <p className="text-xs px-1" style={{ color: "var(--brand-primary)" }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed font-bold text-sm tracking-wide transition-all duration-150"
                style={{ background: "var(--brand-primary)", color: "white" }}
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
          <p className="text-xs leading-relaxed" style={{ color: "var(--brand-text-muted)", opacity: 0.3 }}>
            Prepared by the Salesforce Account Team<br />
            Salesforce × {ACCOUNT.company} · Confidential
          </p>
        </div>
      </div>
    </div>
  );
}
