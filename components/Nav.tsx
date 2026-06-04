"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ACCOUNT } from "@/data/account";

const allNavLinks = [
  { href: "/",               slug: "overview",      label: "Overview" },
  { href: "/act-1",          slug: "act-1",         label: ACCOUNT.acts[0].title },
  { href: "/act-2",          slug: "act-2",         label: ACCOUNT.acts[1].title },
  { href: "/act-3",          slug: "act-3",         label: ACCOUNT.acts[2].title },
  { href: "/architecture",   slug: "architecture",  label: "Architecture" },
  { href: "/strategy",       slug: "strategy",      label: "Strategy" },
  { href: "/agent-tracker",  slug: "agent-tracker", label: "Agent Tracker" },
  { href: "/proof",          slug: "proof",         label: "Results" },
  { href: "/use-cases",      slug: "use-cases",     label: "Use Cases" },
  { href: "/business-case",  slug: "business-case", label: "Business Case" },
  { href: "/pilot",          slug: "pilot",         label: "Pilot Plan" },
  { href: "/account-team",   slug: "account-team",  label: "Account Team" },
  { href: "/demo-library",   slug: "demo-library",  label: "Demo Library" },
  { href: "/pulse",          slug: "pulse",          label: "Account Pulse" },
  { href: "/roi-calculator", slug: "roi-calculator", label: "ROI Calculator" },
  { href: "/innovation",     slug: "innovation",     label: "Innovation" },
  { href: "/headless-360",   slug: "headless-360",   label: "Headless 360" },
];

const navLinks = allNavLinks.filter(
  ({ slug }) => slug === "overview" || ACCOUNT.pages.includes(slug)
);

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
    <header className="sticky top-0 z-50 bg-[var(--brand-bg)] border-b border-[var(--brand-surface-border)] shadow-lg shadow-black/20">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--brand-primary)]" />

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          {ACCOUNT.brand.customerLogo ? (
            <div className="flex items-center gap-2.5">
              <Image
                src={ACCOUNT.brand.customerLogoDark ?? ACCOUNT.brand.customerLogo}
                alt={ACCOUNT.company}
                width={96}
                height={28}
                className="object-contain object-left max-h-7"
                style={{ width: "auto" }}
              />
              <span className="text-sm font-light select-none" style={{ color: "var(--brand-text-muted)" }}>×</span>
              {/* Salesforce cloud mark */}
              <svg width="28" height="20" viewBox="0 0 52 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Salesforce" role="img">
                <path d="M21.7 4.2A10.5 10.5 0 0 1 30 0c4 0 7.5 2.2 9.4 5.5A8.8 8.8 0 0 1 43 4.7c4.8 0 8.7 3.9 8.7 8.8 0 4.8-3.9 8.7-8.7 8.7H10.5A10.5 10.5 0 0 1 0 11.7C0 5.8 4.7 1 10.5 1c1 0 2 .1 2.9.4A11.7 11.7 0 0 1 21.7 4.2Z" fill="var(--brand-primary)"/>
              </svg>
            </div>
          ) : (
            <div className="leading-tight">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-0.5" style={{ color: "var(--brand-text-muted)" }}>
                Executive Briefing
              </p>
              <p className="font-display text-[1rem] font-black leading-none group-hover:text-[var(--brand-primary)] transition-colors duration-200" style={{ color: "var(--brand-text-heading)" }}>
                {ACCOUNT.company}
              </p>
            </div>
          )}
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-[var(--brand-surface)] transition-colors"
          >
            <span className={`block w-5 h-0.5 transition-all duration-200 origin-center ${open ? "rotate-45 translate-y-2" : ""}`} style={{ background: "var(--brand-text)" }} />
            <span className={`block w-5 h-0.5 transition-all duration-200 ${open ? "opacity-0" : ""}`} style={{ background: "var(--brand-text)" }} />
            <span className={`block w-5 h-0.5 transition-all duration-200 origin-center ${open ? "-rotate-45 -translate-y-2" : ""}`} style={{ background: "var(--brand-text)" }} />
          </button>

          {open && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-64 bg-[var(--brand-bg)] border border-[var(--brand-surface-border)] rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
              <nav className="p-2">
                {navLinks.map(({ href, label }) => {
                  const active = href === "/" ? pathname === "/" : pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                        active ? "bg-[var(--brand-primary)]" : "hover:bg-[var(--brand-surface)]"
                      }`}
                      style={{ color: active ? "var(--brand-text-on-primary)" : "var(--brand-text-muted)" }}
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
              {ACCOUNT.pages.includes("account-team") && (
                <div className="p-2 pt-0">
                  <div className="h-px bg-white/8 mb-2" />
                  <Link
                    href="/account-team"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] font-bold text-sm transition-all duration-150"
                    style={{ color: "var(--brand-text-on-primary)" }}
                    onClick={() => setOpen(false)}
                  >
                    {ACCOUNT.cta.primary.label}
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
