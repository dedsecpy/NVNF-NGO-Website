import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "New Vision Nepal Foundation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1B4332",
          backgroundImage: "linear-gradient(135deg, #1B4332 0%, #1C1C1E 100%)",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#F5F0E8",
            textAlign: "center",
            padding: "0 60px",
            lineHeight: 1.2,
          }}
        >
          New Vision Nepal Foundation
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#E8690B",
            marginTop: 20,
          }}
        >
          Rebuilding Nepal. One Life at a Time.
        </div>
      </div>
    ),
    { ...size }
  );
}
