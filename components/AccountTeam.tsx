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
  sales:        "bg-[var(--brand-primary)]/15 text-[var(--brand-primary)]",
  engineering:  "bg-blue-500/15 text-blue-400",
  architecture: "bg-purple-500/15 text-purple-400",
  success:      "bg-emerald-500/15 text-emerald-400",
  specialist:   "bg-amber-500/15 text-amber-400",
  analytics:    "bg-teal-500/15 text-teal-400",
  data:         "bg-indigo-500/15 text-indigo-400",
};

function MemberCard({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200" style={{ background: "var(--brand-card-bg)", borderColor: "var(--brand-card-border)" }}>
      {/* Avatar */}
      <div className="shrink-0">
        {member.image && !imgError ? (
          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/10">
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
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-black ring-2 ring-white/10 ${GROUP_COLOR[member.group]}`}>
            {initials(member.name)}
          </div>
        )}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-sm font-bold leading-snug" style={{ color: "var(--brand-text-heading)" }}>{member.name}</p>
        <p className="text-xs font-semibold mt-0.5 leading-snug" style={{ color: "var(--brand-primary)" }}>{member.role}</p>
        <p className="text-xs mt-1 leading-snug" style={{ color: "var(--brand-text-muted)" }}>{member.description}</p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="inline-flex items-center gap-1 text-[0.65rem] hover:text-[var(--brand-primary)] transition-colors duration-150 font-medium"
              style={{ color: "var(--brand-text-muted)", opacity: 0.6 }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                <rect x="1" y="2.5" width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M1 3.5l4.5 3 4.5-3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              Email
            </a>
          )}
          {member.slack && (
            <a
              href={`https://salesforce.enterprise.slack.com/team/${member.slack}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[0.65rem] font-medium transition-opacity duration-150 hover:opacity-100"
              style={{ color: "white", opacity: 0.55 }}
            >
              Slack {member.name.split(" ")[0]}
            </a>
          )}
        </div>
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
            className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 transition-all"
            style={{ background: "var(--brand-card-bg)", border: "1px solid var(--brand-card-border)", color: "var(--brand-text)" }}
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
              className={`w-24 py-2 rounded-full text-sm font-semibold text-center transition-all duration-150 ${
                filter === id
                  ? "bg-[var(--brand-primary)] shadow-md shadow-[var(--brand-primary)]/25"
                  : "border text-[var(--brand-text-muted)] hover:border-[var(--brand-primary)]/40 hover:text-[var(--brand-primary)]"
              }`}
              style={filter === id ? { color: "var(--brand-text-on-primary)" } : {}}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {grouped.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-base font-semibold" style={{ color: "var(--brand-text-muted)" }}>No results for &ldquo;{query}&rdquo;</p>
          <p className="text-sm mt-1" style={{ color: "var(--brand-text-muted)", opacity: 0.5 }}>Try a different name or role.</p>
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
                <div className="h-px flex-1" style={{ background: "var(--brand-surface-border)" }} />
                <span className="text-xs font-bold tabular-nums" style={{ color: "var(--brand-text-muted)", opacity: 0.4 }}>{groupMembers.length}</span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {groupMembers.map((member) => (
                  <div key={member.name} id={member.name.toLowerCase().replace(/\s+/g, "-")}>
                    <MemberCard member={member} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
