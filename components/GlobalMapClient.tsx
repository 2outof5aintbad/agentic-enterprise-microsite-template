"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { ACCOUNT } from "@/data/account";
import type { GlobalMapOU } from "@/data/account";

const GEO_URL    = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
const BASE_SCALE = 130;
const WORLD_PX   = 2 * Math.PI * BASE_SCALE; // ≈ 816.8 SVG units = 360° longitude
const SVG_W  = 800;
const SVG_H  = 500;   // taller SVG — shows ±70° lat comfortably
const SVG_CX = SVG_W / 2;
const SVG_CY = SVG_H / 2;
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;

const NUMERIC_TO_ALPHA3: Record<string, string> = {
  "840":"USA","124":"CAN","484":"MEX",
  "826":"GBR","276":"DEU","250":"FRA","724":"ESP","380":"ITA",
  "616":"POL","528":"NLD","056":"BEL","752":"SWE","578":"NOR",
  "208":"DNK","246":"FIN","040":"AUT","756":"CHE","620":"PRT",
  "300":"GRC","792":"TUR","642":"ROU","348":"HUN","203":"CZE",
  "703":"SVK","100":"BGR","191":"HRV","705":"SVN","233":"EST",
  "428":"LVA","440":"LTU",
  "392":"JPN",
  "710":"ZAF","566":"NGA","404":"KEN","288":"GHA","231":"ETH",
  "834":"TZA","800":"UGA","716":"ZWE","894":"ZMB","508":"MOZ",
  "076":"BRA","032":"ARG","170":"COL","152":"CHL","604":"PER",
  "862":"VEN","218":"ECU","068":"BOL","600":"PRY","858":"URY",
  "320":"GTM","340":"HND","222":"SLV","558":"NIC","188":"CRI",
  "591":"PAN","214":"DOM","192":"CUB","388":"JAM",
  "643":"RUS","804":"UKR","398":"KAZ","860":"UZB","031":"AZE",
  "268":"GEO","051":"ARM","682":"SAU","784":"ARE","818":"EGY",
  "368":"IRQ","400":"JOR","422":"LBN","376":"ISR","586":"PAK",
  "364":"IRN",
  "156":"CHN","356":"IND","036":"AUS","360":"IDN","764":"THA",
  "704":"VNM","608":"PHL","458":"MYS","702":"SGP","554":"NZL",
  "050":"BGD","144":"LKA","104":"MMR","116":"KHM","418":"LAO",
  "410":"KOR",
};

type OUStatus = "live" | "in-progress" | "none";

const STATUS_FILL: Record<string, { color: string; opacity: number }> = {
  live:          { color: "#22c55e", opacity: 0.78 },
  "in-progress": { color: "#f59e0b", opacity: 0.70 },
  none:          { color: "#ffffff", opacity: 0.06 },
};

const STATUS_META = {
  live: {
    label: "Live", fill: "#22c55e",
    dot: "bg-emerald-400",
    pill: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  "in-progress": {
    label: "In Progress", fill: "#f59e0b",
    dot: "bg-amber-400",
    pill: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
};

function getOUForCountry(alpha3: string, ous: GlobalMapOU[]): GlobalMapOU | null {
  return ous.find(ou => ou.countries.includes(alpha3)) ?? null;
}

type DetailTab = "current" | "before" | "future";

function OUDetail({ ou, future, onClose }: { ou: GlobalMapOU; future: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<DetailTab>(future ? "future" : "current");
  const meta = STATUS_META[ou.status] ?? STATUS_META["in-progress"];
  const tabs: { id: DetailTab; label: string }[] = [
    { id: "before", label: "Before" },
    { id: "current", label: "Today" },
    { id: "future", label: "With Agentforce" },
  ];
  return (
    <div className="rounded-2xl border border-white/12 overflow-hidden" style={{ background: "rgba(10,10,16,0.95)" }}>
      <div className="px-5 pt-4 pb-3 border-b border-white/8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`w-2 h-2 rounded-full ${meta.dot} ${ou.status === "live" ? "animate-pulse" : ""}`} />
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.55rem] font-bold tracking-widest uppercase border ${meta.pill}`}>
                {future ? "Future State" : meta.label}
              </span>
              {ou.agentforce && !future && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.55rem] font-bold tracking-widest uppercase border bg-[var(--brand-primary)]/15 text-[var(--brand-primary)] border-[var(--brand-primary)]/30">
                  Agentforce Live
                </span>
              )}
            </div>
            <h3 className="font-display text-base font-black text-white">{ou.label}</h3>
          </div>
          <button onClick={onClose} className="shrink-0 w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center text-white/35 hover:text-white transition-all">
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
      <div className="flex border-b border-white/8">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 py-2.5 text-[0.65rem] font-bold tracking-wide transition-all duration-150 ${
              tab === t.id
                ? t.id === "future" ? "text-[var(--brand-primary)] border-b-2 border-[var(--brand-primary)] -mb-px" : "text-white border-b-2 border-white/50 -mb-px"
                : "text-white/30 hover:text-white/55"
            }`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="px-5 py-4 space-y-3">
        {tab === "before" && ou.before && (
          <p className="text-sm text-white/65 leading-relaxed">{ou.before}</p>
        )}
        {tab === "current" && (
          <p className="text-sm text-white/65 leading-relaxed">{ou.current}</p>
        )}
        {tab === "future" && ou.future && (
          <>
            <p className="text-sm text-white/70 leading-relaxed">{ou.future}</p>
            {ou.futureHighlights && (
              <div className="space-y-2 pt-1">
                {ou.futureHighlights.map(item => (
                  <div key={item} className="flex items-start gap-2 text-xs text-white/50">
                    <div className="w-4 h-4 rounded-full shrink-0 mt-0.5 flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--brand-primary) 15%, transparent)" }}>
                      <svg width="7" height="7" viewBox="0 0 8 8" fill="none" aria-hidden><path d="M1.5 4l1.5 1.5L6.5 2" stroke="var(--brand-primary)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function GlobalMapClient() {
  const cfg = ACCOUNT.globalMap;
  if (!cfg) return null;
  const { ous, timeline, markers = [] } = cfg;

  // ── Pan / zoom state ──────────────────────────────────────────────────────
  const [lon,  setLon]  = useState(15);   // longitude at center of view
  const [lat,  setLat]  = useState(20);   // latitude at center of view
  const [zoom, setZoom] = useState(1);

  const mapRef   = useRef<HTMLDivElement>(null);
  const dragRef  = useRef<{ startX: number; startY: number; startLon: number; startLat: number; t: number; lastX: number; lastY: number } | null>(null);
  const velRef   = useRef({ x: 0, y: 0 });
  const rafRef   = useRef<number | null>(null);
  const sizeRef  = useRef({ w: 800, h: 500 });

  useEffect(() => {
    const update = () => {
      if (mapRef.current) {
        const r = mapRef.current.getBoundingClientRect();
        sizeRef.current = { w: r.width, h: r.height };
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pxToLon = useCallback((px: number) =>
    px * (SVG_W / sizeRef.current.w) / zoom * (360 / WORLD_PX), [zoom]);

  // Latitude is non-linear (Mercator) but for small deltas this is a good enough approximation
  const pxToLat = useCallback((py: number) =>
    py * (SVG_H / sizeRef.current.h) / zoom * (180 / (Math.PI * BASE_SCALE)), [zoom]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, startLon: lon, startLat: lat, t: e.timeStamp, lastX: e.clientX, lastY: e.clientY };
    velRef.current = { x: 0, y: 0 };
  }, [lon, lat]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const dt = e.timeStamp - dragRef.current.t;
    if (dt > 0) {
      velRef.current.x = -pxToLon(e.clientX - dragRef.current.lastX) / Math.max(dt / 16, 0.5);
      velRef.current.y =  pxToLat(e.clientY - dragRef.current.lastY) / Math.max(dt / 16, 0.5);
    }
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    dragRef.current.t     = e.timeStamp;
    setLon(dragRef.current.startLon - pxToLon(dx));
    setLat(l => Math.max(-60, Math.min(80, dragRef.current!.startLat + pxToLat(dy))));
  }, [pxToLon, pxToLat]);

  const handlePointerUp = useCallback(() => {
    if (!dragRef.current) return;
    dragRef.current = null;
    let vx = velRef.current.x;
    let vy = velRef.current.y;
    if (Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05) return;
    const animate = () => {
      vx *= 0.94; vy *= 0.94;
      setLon(l => l + vx);
      setLat(l => Math.max(-60, Math.min(80, l + vy)));
      if (Math.abs(vx) > 0.008 || Math.abs(vy) > 0.008) rafRef.current = requestAnimationFrame(animate);
      else rafRef.current = null;
    };
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setZoom(z => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z * (e.deltaY > 0 ? 0.88 : 1.14))));
  }, []);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  // ── Timeline state ────────────────────────────────────────────────────────
  const [timelineIdx, setTimelineIdx] = useState(0);
  const [isPlaying,   setIsPlaying]   = useState(true);
  const [hoveredOU,   setHoveredOU]   = useState<string | null>(null);
  const [selectedOU,  setSelectedOU]  = useState<GlobalMapOU | null>(null);
  const [tooltip,     setTooltip]     = useState<{ x: number; y: number; text: string; sub: string } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setTimeout(() => {
      setTimelineIdx(i => {
        if (i < timeline.length - 1) return i + 1;
        setIsPlaying(false);
        return i;
      });
    }, timelineIdx === 0 ? 800 : 1400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPlaying, timelineIdx, timeline.length]);

  const replay = () => { setTimelineIdx(0); setIsPlaying(true); setSelectedOU(null); setLon(15); setLat(20); setZoom(1); };

  // ── Country fill ──────────────────────────────────────────────────────────
  const currentFrame  = timeline[timelineIdx];
  const isFutureFrame = timelineIdx === timeline.length - 1;

  const getTimelineFill = useCallback((alpha3: string) => {
    const ou = getOUForCountry(alpha3, ous);
    if (!ou) return { fill: "rgba(255,255,255,0.05)", stroke: "rgba(255,255,255,0.07)", strokeWidth: 0.3 };

    const ouStatus: OUStatus = currentFrame.ouStatus[ou.id] ?? "none";
    const isHovered  = hoveredOU  === ou.id;
    const isSelected = selectedOU?.id === ou.id;
    const isActive   = isHovered || isSelected;

    const { color, opacity } = STATUS_FILL[ouStatus];
    const boosted   = isActive ? Math.min(opacity + 0.2, 0.97) : opacity;
    const alphaHex  = Math.round(boosted * 255).toString(16).padStart(2, "0");
    const glowColor = ouStatus === "live" ? "rgba(34,197,94,0.9)" : ouStatus === "in-progress" ? "rgba(245,158,11,0.9)" : "rgba(255,255,255,0.3)";

    return {
      fill:        ouStatus === "none" ? "rgba(255,255,255,0.05)" : `${color}${alphaHex}`,
      stroke:      isActive ? glowColor : ouStatus !== "none" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
      strokeWidth: isActive ? 0.8 : 0.4,
      filter:      isActive && ouStatus !== "none" ? `drop-shadow(0 0 10px ${glowColor})` : undefined,
    };
  }, [currentFrame, hoveredOU, selectedOU, ous]);

  // ── Geo interaction ───────────────────────────────────────────────────────
  const handleGeoEnter = useCallback((alpha3: string, name: string, e: React.MouseEvent) => {
    const ou = getOUForCountry(alpha3, ous);
    if (!ou) return;
    setHoveredOU(ou.id);
    const rect = mapRef.current?.getBoundingClientRect();
    if (rect) setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, text: name, sub: ou.label });
  }, [ous]);

  const handleGeoMove = useCallback((e: React.MouseEvent) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (rect) setTooltip(t => t ? { ...t, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
  }, []);

  const handleGeoLeave  = useCallback(() => { setHoveredOU(null); setTooltip(null); }, []);

  const handleGeoClick  = useCallback((alpha3: string) => {
    const ou = getOUForCountry(alpha3, ous);
    if (!ou) return;
    setIsPlaying(false);
    const already = selectedOU?.id === ou.id;
    setSelectedOU(already ? null : ou);
    if (!already && ou.zoom) { setZoom(ou.zoom.zoom); setLon(ou.zoom.coordinates[0]); setLat(ou.zoom.coordinates[1]); }
  }, [selectedOU, ous]);

  const handleOUCardClick = useCallback((ou: GlobalMapOU) => {
    setIsPlaying(false);
    const already = selectedOU?.id === ou.id;
    setSelectedOU(already ? null : ou);
    if (!already && ou.zoom) { setZoom(ou.zoom.zoom); setLon(ou.zoom.coordinates[0]); setLat(ou.zoom.coordinates[1]); }
    else if (already) { setZoom(1); setLon(15); setLat(20); }
  }, [selectedOU]);

  const frameLive       = Object.values(currentFrame.ouStatus).filter(s => s === "live").length;
  const frameInProgress = Object.values(currentFrame.ouStatus).filter(s => s === "in-progress").length;

  // ── Zoom transform — scale about the projected position of (lon, lat) ──────
  // We scale about SVG center since the projection already centers on (lon, lat)
  const zoomTransform = `translate(${SVG_CX} ${SVG_CY}) scale(${zoom}) translate(${-SVG_CX} ${-SVG_CY})`;

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-stretch">

        {/* ── Timeline sidebar ── */}
        <div className="hidden sm:flex flex-col items-center gap-0 w-16 shrink-0 py-2" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
          <button
            onClick={isPlaying ? () => setIsPlaying(false) : replay}
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all border border-white/15 hover:border-[var(--brand-primary)]/50 hover:bg-[var(--brand-primary)]/10 mb-4"
            style={{ color: "var(--brand-primary)" }}
          >
            {isPlaying ? (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden><rect x="2" y="1" width="3" height="10" rx="1"/><rect x="7" y="1" width="3" height="10" rx="1"/></svg>
            ) : timelineIdx === timeline.length - 1 ? (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" aria-hidden><path d="M6 1a5 5 0 100 10A5 5 0 006 1zM6 4v3l2 1" strokeWidth="1.4" strokeLinecap="round"/></svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden><path d="M3 2l7 4-7 4V2z"/></svg>
            )}
          </button>
          <div className="flex flex-col flex-1 items-center gap-0 w-full">
            {timeline.map((frame, i) => {
              const isActive = i === timelineIdx;
              const isPast   = i < timelineIdx;
              const isFuture = i === timeline.length - 1;
              return (
                <button key={frame.year} onClick={() => { setTimelineIdx(i); setIsPlaying(false); }} className="flex flex-row items-center gap-2 w-full group flex-1">
                  <div className="flex flex-col items-center flex-1 h-full">
                    {i > 0 && <div className="w-0.5 flex-1 rounded-full" style={{ background: isPast || isActive ? "var(--brand-primary)" : "rgba(255,255,255,0.12)", minHeight: 8 }} />}
                    <div className="rounded-full shrink-0 transition-all duration-300" style={{ width: isActive ? 14 : 8, height: isActive ? 14 : 8, background: isActive ? "var(--brand-primary)" : isPast ? "color-mix(in srgb, var(--brand-primary) 60%, transparent)" : "rgba(255,255,255,0.15)", boxShadow: isActive ? "0 0 10px var(--brand-primary)" : "none" }} />
                    {i < timeline.length - 1 && <div className="w-0.5 flex-1 rounded-full" style={{ background: isPast ? "var(--brand-primary)" : "rgba(255,255,255,0.12)", minHeight: 8 }} />}
                  </div>
                  <span className="text-[0.6rem] font-bold tabular-nums transition-all duration-200 w-9 text-left leading-none" style={{ color: isActive ? "white" : isPast ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.20)", fontStyle: isFuture ? "italic" : "normal" }}>
                    {isFuture ? "Future" : frame.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Map canvas ── */}
        <div
          ref={mapRef}
          className="relative rounded-3xl border border-white/10 overflow-hidden flex-1 select-none"
          style={{ background: "#060d1a", aspectRatio: "8/5", cursor: dragRef.current ? "grabbing" : "grab" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onMouseMove={handleGeoMove}
        >
          {/* Grid */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" aria-hidden>
            <defs><pattern id="mapgrid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#mapgrid)" />
          </svg>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.75) 100%)" }} />

          {/* Year label */}
          <div className="absolute top-4 left-5 z-10 pointer-events-none">
            <p className="font-display font-black text-white leading-none tabular-nums" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", opacity: 0.7, textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
              {currentFrame.year}
            </p>
            <p className="text-[0.65rem] font-bold mt-0.5 tracking-wide" style={{ color: isFutureFrame ? "var(--brand-primary)" : "rgba(255,255,255,0.40)" }}>
              {currentFrame.label}
            </p>
          </div>

          {/* Live count */}
          <div className="absolute top-5 right-6 z-10 pointer-events-none flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-bold text-white/70">{frameLive} live</span>
            </div>
            {frameInProgress > 0 && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-sm font-bold text-white/50">{frameInProgress} in progress</span>
              </div>
            )}
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-4 right-6 z-10 pointer-events-none">
            <p className="text-[0.55rem] font-medium text-white/20 tracking-wide">Scroll to zoom · drag to pan</p>
          </div>

          {/* Reset zoom */}
          {zoom > 1.2 && (
            <button
              onClick={() => { setZoom(1); setLon(15); setLat(20); setSelectedOU(null); }}
              className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs font-bold border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
              style={{ background: "rgba(0,0,0,0.6)" }}
            >
              ← World view
            </button>
          )}

          {/* The map — 3 tiling copies */}
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: BASE_SCALE, rotate: [-lon, 0, 0], center: [0, lat] }}
            width={SVG_W}
            height={SVG_H}
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            <g transform={zoomTransform}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  [-1, 0, 1].map(offset => (
                    <g key={offset} transform={`translate(${offset * WORLD_PX}, 0)`}>
                      {geographies.map(geo => {
                        const numericId = String(geo.id).padStart(3, "0");
                        const alpha3    = NUMERIC_TO_ALPHA3[numericId];
                        const style     = alpha3 ? getTimelineFill(alpha3) : { fill: "rgba(255,255,255,0.04)", stroke: "rgba(255,255,255,0.06)", strokeWidth: 0.3 };
                        const name: string = geo.properties?.name ?? "";
                        return (
                          <Geography
                            key={`${geo.rsmKey}-${offset}`}
                            geography={geo}
                            fill={style.fill}
                            stroke={style.stroke}
                            strokeWidth={style.strokeWidth}
                            style={{
                              default: { outline: "none", filter: style.filter ?? "none", transition: "fill 0.6s ease, filter 0.3s ease" },
                              hover:   { outline: "none", cursor: alpha3 && getOUForCountry(alpha3, ous) ? "pointer" : "default" },
                              pressed: { outline: "none" },
                            }}
                            onMouseEnter={e => alpha3 && handleGeoEnter(alpha3, name, e)}
                            onMouseLeave={handleGeoLeave}
                            onClick={() => alpha3 && handleGeoClick(alpha3)}
                          />
                        );
                      })}

                      {/* Markers */}
                      {markers.map((marker, mi) =>
                        timelineIdx >= (marker.fromIndex ?? 0) ? (
                          <Marker key={`m-${mi}-${offset}`} coordinates={marker.coordinates}>
                            <circle r={6} fill="none" stroke="var(--brand-primary)" strokeWidth={1.5} opacity={0.7}>
                              <animate attributeName="r" from="6" to="18" dur="2s" repeatCount="indefinite" />
                              <animate attributeName="opacity" from="0.7" to="0" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle r={5} fill="var(--brand-primary)" stroke="white" strokeWidth={1} />
                          </Marker>
                        ) : null
                      )}
                    </g>
                  ))
                }
              </Geographies>
            </g>
          </ComposableMap>

          {/* Tooltip */}
          {tooltip && (
            <div className="absolute pointer-events-none z-20 rounded-xl px-3 py-2 shadow-xl backdrop-blur-sm"
              style={{ left: tooltip.x + 14, top: tooltip.y - 40, transform: "translateY(-50%)", background: "rgba(13,17,23,0.95)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <p className="text-xs font-bold text-white leading-tight">{tooltip.text}</p>
              <p className="text-[0.6rem] text-white/45 mt-0.5">{tooltip.sub}</p>
            </div>
          )}
        </div>

        {/* ── Detail panel ── */}
        <div className="hidden lg:block shrink-0 overflow-y-auto" style={{ width: "260px", maxHeight: "100%" }}>
          {selectedOU ? (
            <OUDetail ou={selectedOU} future={isFutureFrame} onClose={() => { setSelectedOU(null); setZoom(1); setLon(15); setLat(20); }} />
          ) : (
            <div className="h-full min-h-[200px] rounded-2xl border border-white/8 flex flex-col items-center justify-center gap-3 p-5 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden><circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2"/><path d="M12 8v5M12 15h.01" stroke="rgba(255,255,255,0.25)" strokeWidth="1.4" strokeLinecap="round"/></svg>
              <p className="text-[0.65rem] text-white/25 leading-relaxed">Click any country or region to explore details</p>
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      {currentFrame.caption && (
        <p className="text-xs text-white/40 pl-1">{currentFrame.caption}</p>
      )}

      {/* OU cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ous.map(ou => {
          const ouStatus = currentFrame.ouStatus[ou.id] ?? "none";
          const meta     = ouStatus === "live" ? STATUS_META.live : ouStatus === "in-progress" ? STATUS_META["in-progress"] : null;
          const isSelected = selectedOU?.id === ou.id;
          return (
            <button
              key={ou.id}
              onClick={() => handleOUCardClick(ou)}
              onMouseEnter={() => setHoveredOU(ou.id)}
              onMouseLeave={() => setHoveredOU(null)}
              className="text-left rounded-xl border transition-all duration-200 px-4 py-4"
              style={isSelected
                ? { borderColor: "color-mix(in srgb, var(--brand-primary) 60%, transparent)", background: "color-mix(in srgb, var(--brand-primary) 10%, transparent)" }
                : ouStatus !== "none"
                ? { borderColor: "rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)" }
                : { borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", opacity: 0.5 }
              }
            >
              <div className="flex items-center gap-1.5 mb-2">
                {meta
                  ? <span className={`w-2 h-2 rounded-full shrink-0 ${meta.dot} ${ouStatus === "live" ? "animate-pulse" : ""}`} />
                  : <span className="w-2 h-2 rounded-full shrink-0 bg-white/20" />
                }
                {ou.agentforce && ouStatus === "live" && (
                  <span className="text-[0.5rem] font-bold tracking-widest uppercase text-[var(--brand-primary)]">AF Live</span>
                )}
              </div>
              <p className="text-sm font-bold text-white/80 leading-snug">{ou.label}</p>
              {meta && <p className={`text-[0.6rem] mt-1 font-medium ${ouStatus === "live" ? "text-emerald-400/70" : "text-amber-400/70"}`}>{meta.label}</p>}
              {ouStatus === "none" && <p className="text-[0.6rem] mt-1 text-white/25">Not yet started</p>}
            </button>
          );
        })}
      </div>

      {selectedOU && (
        <div className="lg:hidden">
          <OUDetail ou={selectedOU} future={isFutureFrame} onClose={() => { setSelectedOU(null); setZoom(1); setLon(15); setLat(20); }} />
        </div>
      )}
    </div>
  );
}
