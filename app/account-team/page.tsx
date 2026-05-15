import type { Metadata } from "next";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import AccountTeam from "@/components/AccountTeam";

export const metadata: Metadata = {
  title: "Account Team",
};

export default function AccountTeamPage() {
  return (
    <div className="min-h-screen bg-[var(--brand-light)]">
      <Nav />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="mb-4">
            <span className="eyebrow-pill">Salesforce Account Team</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-[#0A0A0A] tracking-tight leading-[0.95] mb-4">
            {ACCOUNT.company} Account Team
          </h1>
          <p className="text-lg text-[#3D3D3D] max-w-2xl leading-relaxed">
            Key contacts across sales, technical, and customer success teams supporting {ACCOUNT.company}.
          </p>
        </div>
        <AccountTeam members={ACCOUNT.team} />
      </div>
    </div>
  );
}
