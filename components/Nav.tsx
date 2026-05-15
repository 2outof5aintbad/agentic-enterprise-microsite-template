"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ACCOUNT } from "@/data/account";

const navLinks = [
  { href: "/",              label: "Overview" },
  { href: "/act-1",        label: ACCOUNT.acts[0].title },
  { href: "/act-2",        label: "Data Foundation" },
  { href: "/act-3",        label: "Agentic Enterprise" },
  { href: "/account-team", label: "Account Team" },
  { href: "/demo-library", label: "Demo Library" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--brand-bg)] border-b border-white/10 shadow-lg shadow-black/30">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--brand-primary)]" />

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="leading-tight">
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/50 mb-0.5">
              Executive Briefing
            </p>
            <p className="font-display text-[1rem] font-black text-white leading-none group-hover:text-[var(--brand-primary)] transition-colors duration-200">
              {ACCOUNT.company}
            </p>
          </div>
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-white/8 transition-colors"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 origin-center ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 origin-center ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          {open && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-64 bg-[var(--brand-bg)] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
              <nav className="p-2">
                {navLinks.map(({ href, label }) => {
                  const active = href === "/" ? pathname === "/" : pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                        active
                          ? "bg-[var(--brand-primary)] text-white"
                          : "text-white/70 hover:text-white hover:bg-white/8"
                      }`}
                    >
                      {label}
                      {active && (
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                          <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-2 pt-0">
                <div className="h-px bg-white/8 mb-2" />
                <Link
                  href="/account-team"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-white font-bold text-sm transition-all duration-150"
                  onClick={() => setOpen(false)}
                >
                  {ACCOUNT.cta.primary.label}
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
