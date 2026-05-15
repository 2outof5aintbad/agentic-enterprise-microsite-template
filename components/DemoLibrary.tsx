"use client";

import { useState, useEffect, useCallback } from "react";
import type { DemoVideo, DemoCategory } from "@/data/account";

const FILTERS: { id: DemoCategory | "all"; label: string }[] = [
  { id: "all",        label: "All" },
  { id: "agentforce", label: "Agentforce" },
  { id: "data",       label: "Data Cloud" },
  { id: "service",    label: "Service" },
  { id: "sales",      label: "Sales" },
  { id: "platform",   label: "Platform" },
];

// Extract Vidyard video ID from embed URL and return thumbnail
function thumbUrl(embedUrl: string) {
  const match = embedUrl.match(/play\.vidyard\.com\/([^.]+)\.html/);
  return match ? `https://play.vidyard.com/${match[1]}.jpg` : null;
}

// ── Modal ────────────────────────────────────────────────────────────────────

function VideoModal({ video, onClose }: { video: DemoVideo; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0A0A0A] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-white/8">
          <div>
            {video.duration && (
              <p className="text-[0.6rem] font-bold text-white/30 tracking-wider uppercase mb-1">{video.duration}</p>
            )}
            <p className="font-display text-lg font-black text-white leading-tight">{video.title}</p>
            <p className="text-sm text-white/60 mt-0.5">{video.description}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 2l10 10M12 2L2 12" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Iframe */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={video.embedUrl}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="autoplay; fullscreen"
            title={video.title}
          />
        </div>
      </div>
    </div>
  );
}

// ── Featured Card ────────────────────────────────────────────────────────────

function FeaturedCard({ video, onPlay }: { video: DemoVideo; onPlay: () => void }) {
  const thumb = thumbUrl(video.embedUrl);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] group cursor-pointer" onClick={onPlay}>
      {/* Thumbnail */}
      <div className="relative w-full" style={{ paddingBottom: "42%" }}>
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a0a] to-[#0A0A0A]" />
        )}
        {/* Dark overlay so play button is always visible */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[var(--brand-primary)]/80 border-2 border-white/20 flex items-center justify-center group-hover:bg-[var(--brand-primary)] group-hover:scale-110 transition-all duration-300 shadow-xl shadow-black/40">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
              <path d="M10 8l14 6-14 6V8z" fill="white"/>
            </svg>
          </div>
        </div>

        {/* Featured badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--brand-primary)] text-white text-[0.6rem] font-bold tracking-widest uppercase shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            Featured
          </span>
        </div>

        {video.duration && (
          <div className="absolute bottom-3 right-4">
            <span className="px-2 py-0.5 rounded bg-black/60 text-white text-xs font-bold tabular-nums">{video.duration}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-display text-2xl font-black text-white leading-tight mb-1.5 group-hover:text-[var(--brand-primary)] transition-colors duration-200">{video.title}</h3>
        <p className="text-sm text-white/65 leading-relaxed">{video.description}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-primary)]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="8" cy="8" r="7" fill="var(--brand-primary)" fillOpacity="0.2"/>
            <path d="M6.5 5.5l5 2.5-5 2.5V5.5z" fill="var(--brand-primary)"/>
          </svg>
          Watch demo
        </div>
      </div>
    </div>
  );
}

// ── Video Card ───────────────────────────────────────────────────────────────

function VideoCard({ video, onPlay }: { video: DemoVideo; onPlay: () => void }) {
  const thumb = thumbUrl(video.embedUrl);

  return (
    <div
      className="group cursor-pointer rounded-2xl overflow-hidden border border-black/8 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
      onClick={onPlay}
    >
      {/* Thumbnail */}
      <div className="relative bg-[#0A0A0A]" style={{ paddingBottom: "56.25%" }}>
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a0a] to-[#0A0A0A]" />
        )}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)]/70 border border-white/20 flex items-center justify-center group-hover:bg-[var(--brand-primary)] group-hover:scale-110 transition-all duration-300 shadow-lg">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M5 3.5l7 3.5-7 3.5V3.5z" fill="white"/>
            </svg>
          </div>
        </div>

        {video.duration && (
          <div className="absolute bottom-2 right-2">
            <span className="px-1.5 py-0.5 rounded bg-black/60 text-white text-[0.65rem] font-bold tabular-nums">{video.duration}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-sm font-bold text-[#0A0A0A] leading-snug mb-1 group-hover:text-[var(--brand-primary)] transition-colors duration-200">{video.title}</h3>
        <p className="text-xs text-[#3D3D3D] leading-snug">{video.description}</p>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function DemoLibrary({ videos }: { videos: DemoVideo[] }) {
  const [filter, setFilter]      = useState<DemoCategory | "all">("all");
  const [activeVideo, setActive] = useState<DemoVideo | null>(null);
  const closeModal               = useCallback(() => setActive(null), []);

  const featured     = videos.find((v) => v.featured);
  const rest         = videos.filter((v) => !v.featured);
  const filtered     = filter === "all" ? rest : rest.filter((v) => v.category === filter);
  const showFeatured = filter === "all" || featured?.category === filter;

  return (
    <>
      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap mb-10">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
              filter === id
                ? "bg-[var(--brand-primary)] text-white shadow-md shadow-[#F40009]/25"
                : "bg-white border border-black/10 text-[#3D3D3D] hover:border-[var(--brand-primary)]/30 hover:text-[var(--brand-primary)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Featured video */}
      {featured && showFeatured && (
        <div className="mb-10">
          <FeaturedCard video={featured} onPlay={() => setActive(featured)} />
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={() => setActive(video)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-base font-semibold text-[#3D3D3D]">No demos in this category yet.</p>
          <p className="text-sm text-black/40 mt-1">Check back soon — more are on the way.</p>
        </div>
      )}

      {/* Modal */}
      {activeVideo && <VideoModal video={activeVideo} onClose={closeModal} />}
    </>
  );
}
