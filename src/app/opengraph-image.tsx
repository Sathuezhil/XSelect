import { ImageResponse } from "next/og";

export const alt = "XSelect — Discover More. Shop Smarter.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111827",
          color: "white",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#10B981" }}>XSELECT</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>
          <div>Discover More.</div>
          <div>Shop Smarter.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#94A3B8" }}>Curated finds for shoppers in the UAE</div>
      </div>
    ),
    size,
  );
}
