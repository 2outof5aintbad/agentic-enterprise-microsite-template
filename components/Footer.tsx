import Link from "next/link";
import { ACCOUNT } from "@/data/account";

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-bg)] border-t border-white/8">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-display text-base font-black text-white/50">{ACCOUNT.company}</p>
          <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/25 mt-0.5">
            Prepared by the Salesforce Account Team
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <Link href="/act-1"        className="px-4 py-2 rounded-full text-sm text-white/55 hover:text-white hover:bg-white/10 transition-all font-semibold">Act 1</Link>
          <Link href="/act-2"        className="px-4 py-2 rounded-full text-sm text-white/55 hover:text-white hover:bg-white/10 transition-all font-semibold">Data Foundation</Link>
          <Link href="/act-3"        className="px-4 py-2 rounded-full text-sm text-white/55 hover:text-white hover:bg-white/10 transition-all font-semibold">Agentic</Link>
          <Link href="/account-team" className="px-4 py-2 rounded-full text-sm text-white/55 hover:text-white hover:bg-white/10 transition-all font-semibold">Team</Link>
        </div>
      </div>
    </footer>
  );
}
