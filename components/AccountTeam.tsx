"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { TeamMember, TeamGroup } from "@/data/account";

const GROUP_LABELS: Record<TeamGroup, string> = {
  sales:        "Sales Leadership",
  engineering:  "Solution Engineering",
  architecture: "Technical Architecture",
  success:      "Customer Success",
  specialist:   "Specialists",
  analytics:    "Analytics",
  data:         "Data",
};

const GROUP_ORDER: TeamGroup[] = ["sales", "engineering", "architecture", "success", "specialist", "analytics", "data"];

const FILTER_BUTTONS: { id: TeamGroup | "all"; label: string }[] = [
  { id: "all",          label: "All" },
  { id: "sales",        label: "Sales" },
  { id: "engineering",  label: "Solutions" },
  { id: "architecture", label: "Architecture" },
  { id: "success",      label: "Success" },
  { id: "specialist",   label: "Specialists" },
  { id: "analytics",    label: "Analytics" },
  { id: "data",         label: "Data" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const GROUP_COLOR: Record<TeamGroup, string> = {
  sales:        "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]",
  engineering:  "bg-blue-50 text-blue-700",
  architecture: "bg-purple-50 text-purple-700",
  success:      "bg-emerald-50 text-emerald-700",
  specialist:   "bg-amber-50 text-amber-700",
  analytics:    "bg-teal-50 text-teal-700",
  data:         "bg-indigo-50 text-indigo-700",
};

function MemberCard({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-black/6 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Avatar */}
      <div className="shrink-0">
        {member.image && !imgError ? (
          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-black/6">
            <Image
              src={member.image}
              alt={member.name}
              width={56}
              height={56}
              unoptimized
              className="object-cover w-full h-full"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-black ring-2 ring-black/6 ${GROUP_COLOR[member.group]}`}>
            {initials(member.name)}
          </div>
        )}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-sm font-bold text-[#0A0A0A] leading-snug">{member.name}</p>
        <p className="text-xs font-semibold text-[var(--brand-primary)] mt-0.5 leading-snug">{member.role}</p>
        <p className="text-xs text-[#3D3D3D] mt-1 leading-snug">{member.description}</p>
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-1 mt-2 text-[0.65rem] text-black/40 hover:text-[var(--brand-primary)] transition-colors duration-150 font-medium"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
              <rect x="1" y="2.5" width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
              <path d="M1 3.5l4.5 3 4.5-3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
            </svg>
            {member.email}
          </a>
        )}
      </div>
    </div>
  );
}

interface Props {
  members: TeamMember[];
}

export default function AccountTeam({ members }: Props) {
  const [query, setQuery]   = useState("");
  const [filter, setFilter] = useState<TeamGroup | "all">("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return members.filter((m) => {
      const matchesGroup = filter === "all" || m.group === filter;
      const matchesQuery = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q);
      return matchesGroup && matchesQuery;
    });
  }, [members, query, filter]);

  // Group filtered results preserving order
  const grouped = useMemo(() => {
    return GROUP_ORDER.map((group) => ({
      group,
      label: GROUP_LABELS[group],
      members: filtered.filter((m) => m.group === group),
    })).filter((g) => g.members.length > 0);
  }, [filtered]);

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <div className="relative flex-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" aria-hidden>
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name or role…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-black/10 bg-white text-sm text-[#0A0A0A] placeholder-black/30 focus:outline-none focus:border-[var(--brand-primary)]/40 focus:ring-2 focus:ring-[var(--brand-primary)]/10 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60 transition-colors"
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTER_BUTTONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                filter === id
                  ? "bg-[var(--brand-primary)] text-white shadow-md shadow-[var(--brand-primary)]/25"
                  : "bg-white border border-black/10 text-[#3D3D3D] hover:border-[var(--brand-primary)]/30 hover:text-[var(--brand-primary)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {grouped.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-base font-semibold text-[#3D3D3D]">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-black/40 mt-1">Try a different name or role.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {grouped.map(({ group, label, members: groupMembers }) => (
            <div key={group}>
              {/* Group header */}
              <div className="flex items-center gap-4 mb-5">
                <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${GROUP_COLOR[group]}`}>
                  {label}
                </div>
                <div className="h-px flex-1 bg-black/8" />
                <span className="text-xs font-bold text-black/25 tabular-nums">{groupMembers.length}</span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {groupMembers.map((member) => (
                  <MemberCard key={member.name} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
