"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { PULSE, CATEGORY_LABELS, CATEGORY_COLORS, type PulseCategory } from "@/data/pulse";

const FILTER_OPTIONS: { id: PulseCategory | "all"; label: string }[] = [
  { id: "all",          label: "All" },
  { id: "event",        label: "Events" },
  { id: "announcement", label: "Announcements" },
  { id: "account",      label: "Account Updates" },
  { id: "product",      label: "Product News" },
];

export default function PulsePage() {
  const [filter, setFilter] = useState<PulseCategory | "all">("all");

  const pinned = PULSE.filter((p) => p.pinned);
  const rest = PULSE.filter((p) => !p.pinned);

  const visible = rest.filter((p) => filter === "all" || p.category === filter);

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-bg)" }}>
      <Nav />

      <section className="relative overflow-hidden" style={{ background: "var(--brand-bg)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 12%, transparent) 0%, transparent 60%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-16">
          <FadeIn>
            <div className="mb-6"><span className="eyebrow-pill">Account Pulse</span></div>
            <h1 className="font-display text-6xl sm:text-7xl font-black tracking-tight leading-[0.92] mb-6 max-w-3xl" style={{ color: "var(--brand-text-heading)" }}>
              What&rsquo;s happening<br />right now.
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "var(--brand-text-muted)" }}>
              Events, announcements, and account updates — everything relevant to this engagement in one place.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Pinned items */}
      {pinned.length > 0 && (
        <Section>
          <div className="space-y-4">
            {pinned.map((item, i) => {
              const colors = CATEGORY_COLORS[item.category];
              return (
                <FadeIn key={item.id} delay={i * 60}>
                  <div className="relative rounded-2xl border overflow-hidden" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-primary)", borderLeftWidth: 3 }}>
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.6rem] font-bold tracking-widest uppercase border bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border-[var(--brand-primary)]/25">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor" aria-hidden><path d="M5 0l1.2 3.7H10L7 6l1.2 3.8L5 7.5 1.8 9.8 3 6 0 3.7h3.8z"/></svg>
                        Pinned
                      </span>
                    </div>
                    <div className="p-6 pr-24">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.6rem] font-bold tracking-widest uppercase border ${colors}`}>
                          {CATEGORY_LABELS[item.category]}
                        </span>
                        <span className="text-xs font-medium" style={{ color: "var(--brand-text-muted)" }}>{item.date}</span>
                      </div>
                      <h2 className="font-display text-xl font-black mb-3 leading-snug" style={{ color: "var(--brand-text-heading)" }}>{item.title}</h2>
                      <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--brand-text-muted)" }}>{item.body}</p>
                      {item.link && (
                        <Link
                          href={item.link.href}
                          className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold transition-colors duration-150 hover:underline"
                          style={{ color: "var(--brand-primary)" }}
                        >
                          {item.link.label}
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </Link>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Section>
      )}

      {/* Filtered feed */}
      <Section alt>
        <SectionHeader eyebrow="Feed" title="Events &amp; Updates" />

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {FILTER_OPTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150"
              style={filter === id
                ? { background: "var(--brand-primary)", color: "white" }
                : { background: "var(--brand-card-bg)", color: "var(--brand-text-muted)", border: "1px solid var(--brand-card-border)" }}
            >
              {label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="text-sm py-12 text-center" style={{ color: "var(--brand-text-muted)" }}>No items in this category yet.</p>
        ) : (
          <div className="space-y-4">
            {visible.map((item, i) => {
              const colors = CATEGORY_COLORS[item.category];
              return (
                <FadeIn key={item.id} delay={i * 50}>
                  <div className="rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.6rem] font-bold tracking-widest uppercase border ${colors}`}>
                        {CATEGORY_LABELS[item.category]}
                      </span>
                      <span className="text-xs font-medium" style={{ color: "var(--brand-text-muted)" }}>{item.date}</span>
                    </div>
                    <h3 className="font-display text-lg font-black mb-2 leading-snug" style={{ color: "var(--brand-text-heading)" }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>{item.body}</p>
                    {item.link && (
                      <Link
                        href={item.link.href}
                        target={item.link.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold transition-colors duration-150 hover:underline"
                        style={{ color: "var(--brand-primary)" }}
                      >
                        {item.link.label}
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </Link>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}
      </Section>

      <Footer />
    </div>
  );
}
