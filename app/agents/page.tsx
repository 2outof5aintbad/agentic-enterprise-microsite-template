"use client";

import { useState } from "react";
import type { AgentCategory } from "@/data/account";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

const CATEGORY_COLORS: Record<string, string> = {
  sales:         "bg-blue-500/10 text-blue-400 border-blue-500/20",
  service:       "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "field-service": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  marketing:     "bg-purple-500/10 text-purple-400 border-purple-500/20",
  operations:    "bg-teal-500/10 text-teal-400 border-teal-500/20",
  finance:       "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  hr:            "bg-rose-500/10 text-rose-400 border-rose-500/20",
  consulting:    "bg-orange-500/10 text-orange-400 border-orange-500/20",
  platform:      "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

function AgentInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter((w) => !["Agent", "AI", "the"].includes(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div className="w-16 h-16 rounded-2xl bg-[var(--brand-primary)]/15 border border-[var(--brand-primary)]/25 flex items-center justify-center">
      <span className="font-display text-xl font-black text-[var(--brand-primary)]">{initials}</span>
    </div>
  );
}

export default function AgentsPage() {
  const { agents } = ACCOUNT;
  const allCategories = [
    { id: "all" as AgentCategory | "all", label: "All Agents" },
    ...agents.categories,
  ];

  const [activeCategory, setActiveCategory] = useState<AgentCategory | "all">("all");

  const visible = activeCategory === "all"
    ? agents.roster
    : agents.roster.filter((a) => a.category === activeCategory);

  const getCategoryLabel = (cat: AgentCategory) =>
    agents.categories.find((c) => c.id === cat)?.label ?? cat;

  const counts = agents.categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.id] = agents.roster.filter((a) => a.category === cat.id).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[50vh] flex flex-col justify-end">
        <div className="absolute inset-0 bg-[#0A0A0A]" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <circle cx="1200" cy="100" r="350" fill="var(--brand-primary)" opacity="0.04" />
          <circle cx="300"  cy="380" r="200" fill="var(--brand-primary)" opacity="0.03" />
        </svg>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="hero-eyebrow mb-6">
            <span className="eyebrow-pill">Specialized Agents</span>
          </div>
          <h1 className="hero-headline font-display text-5xl sm:text-6xl font-black tracking-tight leading-[0.92] mb-6 text-white">
            {agents.headline}
          </h1>
          <p className="hero-sub text-xl text-white/80 leading-relaxed max-w-2xl">{agents.opening}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      </section>

      {/* Filter bar */}
      <section className="bg-[#0A0A0A] sticky top-16 z-30 border-b border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-2 flex-wrap">
          {allCategories.map((cat) => {
            const count = cat.id === "all" ? agents.roster.length : (counts[cat.id] ?? 0);
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as AgentCategory | "all")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                  active
                    ? "bg-[var(--brand-primary)] text-white shadow-md"
                    : "border border-white/15 text-white/55 hover:text-white hover:border-white/30"
                }`}
              >
                {cat.label}
                <span className={`text-xs font-bold ${active ? "text-white/75" : "text-white/35"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Agent cards */}
      <section className="bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((agent, i) => (
              <FadeIn key={agent.id} delay={i * 60}>
                <div className="group relative h-full flex flex-col bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-[var(--brand-primary)]/40 hover:bg-white/[0.05] transition-all duration-200">
                  {/* Card header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between gap-3 mb-5">
                      {agent.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={agent.image} alt="" className="w-16 h-16 rounded-2xl object-cover" />
                      ) : (
                        <AgentInitials name={agent.name} />
                      )}
                      <span className={`mt-1 inline-flex items-center px-2.5 py-1 rounded-full text-[0.6rem] font-bold tracking-wide uppercase border ${CATEGORY_COLORS[agent.category] ?? CATEGORY_COLORS.platform}`}>
                        {getCategoryLabel(agent.category)}
                      </span>
                    </div>

                    <p className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-white/30 mb-1.5">Agent</p>
                    <h3 className="font-display text-xl font-black text-white leading-tight mb-4">
                      {agent.name}
                    </h3>
                  </div>

                  {/* Tagline block */}
                  <div className="px-6 pb-5 flex-1">
                    <div className="bg-[var(--brand-primary)]/8 border border-[var(--brand-primary)]/15 rounded-xl p-4 mb-4">
                      <p className="text-sm text-white/85 leading-relaxed italic">
                        &ldquo;{agent.tagline}&rdquo;
                      </p>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">{agent.description}</p>
                  </div>

                  {/* Bottom accent */}
                  <div className="h-1 bg-gradient-to-r from-[var(--brand-primary)]/0 via-[var(--brand-primary)]/40 to-[var(--brand-primary)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </FadeIn>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="text-center py-24">
              <p className="text-white/30 text-sm">No agents in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[var(--brand-primary)]">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <FadeIn>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-[0.92] mb-6 max-w-3xl mx-auto">
              {ACCOUNT.cta.headline}
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">{ACCOUNT.cta.body}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={ACCOUNT.cta.primary.href}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-[var(--brand-primary)] font-bold text-base transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5"
              >
                {ACCOUNT.cta.primary.label}
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href={ACCOUNT.cta.secondary.href}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 border-white/50 hover:border-white text-white font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
              >
                {ACCOUNT.cta.secondary.label}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
