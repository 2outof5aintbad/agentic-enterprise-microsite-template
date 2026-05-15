"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ACCOUNT } from "@/data/account";

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
    }`}>
      <div className="flex items-center gap-3 bg-[var(--brand-bg)]/90 backdrop-blur-xl border border-white/15 rounded-full px-2 py-2 shadow-2xl shadow-black/50">
        <p className="hidden sm:block text-sm text-white/60 font-medium pl-3 pr-1">
          Ready to go deeper?
        </p>
        <Link
          href={ACCOUNT.cta.primary.href}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-white font-bold text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
        >
          {ACCOUNT.cta.primary.label}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="w-8 h-8 flex items-center justify-center rounded-full text-white/30 hover:text-white/70 hover:bg-white/10 transition-all"
          aria-label="Dismiss"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
