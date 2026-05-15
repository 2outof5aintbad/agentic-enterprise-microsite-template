import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#0A0A0A",
          padding: "64px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Red accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "#F40009" }} />

        {/* Background wave */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}
          viewBox="0 0 1200 630"
        >
          <path
            d="M-100 420 Q200 260 500 340 Q800 420 1100 240 Q1260 150 1400 300"
            stroke="#F40009"
            strokeWidth="220"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "24px",
          }}
        >
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F40009" }} />
          <span style={{ color: "#F40009", fontSize: "14px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Private AI Transformation Briefing
          </span>
        </div>

        {/* Headline */}
        <div style={{ fontSize: "72px", fontWeight: 900, color: "#ffffff", lineHeight: 0.95, marginBottom: "28px", letterSpacing: "-0.02em" }}>
          The Commercial Cockpit
        </div>

        {/* Subhead */}
        <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.65)", lineHeight: 1.4, maxWidth: "700px", marginBottom: "52px" }}>
          How Agentforce and Data Cloud can accelerate commercial execution for Coca-Cola.
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#F40009", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "16px", height: "20px", background: "rgba(255,255,255,0.9)", borderRadius: "2px" }} />
            </div>
            <div>
              <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "15px", fontWeight: 700 }}>Michael Emery</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Account SE · Salesforce</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Commercial Cockpit", "Data 360", "Agentic Enterprise", "Value Estimator"].map((label) => (
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
