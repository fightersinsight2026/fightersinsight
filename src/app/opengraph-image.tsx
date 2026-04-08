import { ImageResponse } from "next/og";

export const alt = "The Fighter's Insight";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "radial-gradient(ellipse at top, rgba(225,29,42,0.35) 0%, rgba(7,7,8,1) 60%), #070708",
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#e11d2a",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 26,
            }}
          >
            FI
          </div>
          <div style={{ fontWeight: 900, fontSize: 32, letterSpacing: -1 }}>
            FIGHTER&apos;S <span style={{ color: "#e11d2a" }}>INSIGHT</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 86, fontWeight: 900, lineHeight: 1, letterSpacing: -3 }}>
            Where fight fans
            <br />
            <span style={{ color: "#e11d2a" }}>think deeper.</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#c3c8d2" }}>
            Blogs · Live reactions · Forum · Training · Gear
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
