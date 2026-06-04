"use client";

import Link from "next/link";
import { ACCOUNT } from "@/data/account";

export default function AgentSimTeaser() {
  const cfg = ACCOUNT.agentSimulator;
  if (!cfg) return null;

  return (
    <section style={{ borderTop: "1px solid var(--brand-surface-border)", background: "var(--brand-bg)" }}>
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14" style={{ background: "var(--brand-card-bg)", border: "1px solid var(--brand-card-border)" }}>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 320" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <path d="M-50 240 Q150 120 300 180 Q450 240 650 100 Q750 40 900 140" stroke="var(--brand-primary)" strokeWidth="160" strokeLinecap="round" fill="none" opacity="0.05"/>
          </svg>

          <div className="relative flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">

            {/* Copy */}
            <div className="flex-1">
              <div className="mb-5">
                <span className="eyebrow-pill">{cfg.eyebrow}</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-[0.95] mb-5" style={{ color: "var(--brand-text-heading)" }}>
                {cfg.headline}
                {cfg.headlineAccent && (
                  <><br /><span style={{ color: "var(--brand-primary)" }}>{cfg.headlineAccent}</span></>
                )}
              </h2>
              <p className="text-lg leading-relaxed max-w-lg mb-6" style={{ color: "var(--brand-text-muted)" }}>
                {cfg.description}
              </p>
              {cfg.features && cfg.features.length > 0 && (
                <ul className="space-y-2.5 mb-8">
                  {cfg.features.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--brand-text-muted)" }}>
                      <span className="shrink-0 w-4 h-4 mt-0.5 rounded-full flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--brand-primary) 20%, transparent)" }}>
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden>
                          <path d="M2 5l2.5 2.5L8 3" stroke="var(--brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={cfg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5"
                style={{ background: "var(--brand-primary)", color: "var(--brand-text-on-primary)" }}
              >
                {cfg.ctaLabel}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h9M8.5 4L12 8l-3.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 3h2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                </svg>
              </Link>
              {cfg.ctaSublabel && (
                <p className="mt-3 text-xs" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>{cfg.ctaSublabel}</p>
              )}
            </div>

            {/* Phone mock */}
            <div className="shrink-0 w-full lg:w-[265px] relative">
              <div className="relative w-[265px] mx-auto rounded-[32px] overflow-hidden shadow-2xl shadow-black/60" style={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.12)", height: 480 }}>

                {/* Status bar */}
                <div className="px-4 pt-2 pb-1 flex items-center justify-between" style={{ background: "#12122a" }}>
                  <span className="text-[0.5rem] font-semibold text-white/50">9:41</span>
                  <div className="w-12 h-3 rounded-full absolute left-1/2 -translate-x-1/2 top-1" style={{ background: "rgba(0,0,0,0.6)" }} />
                  <div className="flex items-center gap-1">
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="white" fillOpacity="0.5" aria-hidden><rect x="0" y="3" width="2" height="7" rx="0.5"/><rect x="3" y="2" width="2" height="8" rx="0.5"/><rect x="6" y="0" width="2" height="10" rx="0.5"/></svg>
                  </div>
                </div>

                {/* Channel header */}
                <div className="border-b px-3 py-2 flex items-center gap-2" style={{ background: "#12122a", borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ background: "var(--brand-primary)" }}>
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="white" aria-hidden>
                        <path d="M10 7a2 2 0 100-4 2 2 0 000 4zm3 1h-2.5a1.5 1.5 0 00-1.5 1.5V13h5V9.5A1.5 1.5 0 0013 8z"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.55rem] font-bold text-white/80 truncate">{cfg.mockChannel ?? "#agentforce-ai"}</p>
                      <p className="text-[0.45rem] text-white/30">{cfg.mockChannelSub ?? "Salesforce Agent · 3 members"}</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="px-3 py-3 space-y-3 overflow-hidden" style={{ height: 360 }}>
                  {cfg.mockMessages.map((msg, i) => (
                    <div key={i} className={msg.active ? "-mx-3 px-3 py-1.5 rounded" : ""} style={msg.active ? { background: "color-mix(in srgb, var(--brand-primary) 8%, transparent)" } : {}}>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center text-[0.45rem] font-bold shrink-0 text-white" style={{ background: msg.actor === "user" ? "rgba(59,130,246,0.7)" : "color-mix(in srgb, var(--brand-primary) 70%, transparent)" }}>
                          {msg.name.charAt(0)}
                        </div>
                        <span className="text-[0.5rem] font-bold text-white/60 truncate">{msg.name}</span>
                        <span className="text-[0.45rem] text-white/20 ml-auto shrink-0">{msg.time}</span>
                        {msg.done && <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="shrink-0" aria-hidden><path d="M2 5l2 2 4-4" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        {msg.active && <span className="shrink-0 w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand-primary)" }} />}
                      </div>
                      <p className="text-[0.55rem] text-white/55 leading-relaxed pl-5">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="absolute bottom-0 left-0 right-0 border-t px-3 py-2 flex items-center gap-2" style={{ background: "#12122a", borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex-1 rounded-full px-3 py-1.5" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <span className="text-[0.5rem] text-white/20">Message {cfg.mockChannel ?? "#agentforce-ai"}…</span>
                  </div>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--brand-primary) 40%, transparent)" }}>
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
