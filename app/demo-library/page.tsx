import type { Metadata } from "next";
import { ACCOUNT } from "@/data/account";
import Nav from "@/components/Nav";
import DemoLibrary from "@/components/DemoLibrary";

export const metadata: Metadata = {
  title: "Demo Library",
};

export default function DemoLibraryPage() {
  return (
    <div className="min-h-screen bg-[var(--brand-light)]">
      <Nav />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="mb-4">
            <span className="eyebrow-pill">Demo Library</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-[#0A0A0A] tracking-tight leading-[0.95] mb-4">
            See It in Action
          </h1>
          <p className="text-lg text-[#3D3D3D] max-w-2xl leading-relaxed">
            Focused demos showing the {ACCOUNT.company} agentic enterprise vision in action.
          </p>
        </div>
        <DemoLibrary videos={ACCOUNT.demos} />
      </div>
    </div>
  );
}
