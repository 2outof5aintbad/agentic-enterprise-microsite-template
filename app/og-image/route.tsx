import { ImageResponse } from "next/og";
import { ACCOUNT } from "@/data/account";

export const runtime = "edge";

export async function GET() {
  const { company, hero, brand } = ACCOUNT;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: brand.bg,
          padding: "64px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Brand accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: brand.primary }} />

        {/* Background wave */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}
          viewBox="0 0 1200 630"
        >
          <path
            d="M-100 420 Q200 260 500 340 Q800 420 1100 240 Q1260 150 1400 300"
            stroke={brand.primary}
            strokeWidth="220"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: brand.primary }} />
          <span style={{ color: brand.primary, fontSize: "14px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            {hero.eyebrow}
          </span>
        </div>

        {/* Headline */}
        <div style={{ fontSize: "72px", fontWeight: 900, color: "#ffffff", lineHeight: 0.95, marginBottom: "28px", letterSpacing: "-0.02em" }}>
          {hero.headline.replace(/\n/g, " ")}
        </div>

        {/* Subhead */}
        <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.65)", lineHeight: 1.4, maxWidth: "700px", marginBottom: "52px" }}>
          {hero.subheadline}
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: brand.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "16px", height: "20px", background: "rgba(255,255,255,0.9)", borderRadius: "2px" }} />
            </div>
            <div>
              <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "15px", fontWeight: 700 }}>Salesforce Account Team</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{company} · Confidential</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Act 1", "Data Foundation", "Agentic Enterprise", "Use Cases"].map((label) => (
              <div
                key={label}
                style={{
                  padding: "6px 14px",
                  borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
