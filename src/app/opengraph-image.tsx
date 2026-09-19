import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — clinical dental courses taught by ${site.instructorName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [photo, mark] = await Promise.all([
    readFile(join(process.cwd(), "public/images/teaching-whiteboard-portrait.jpg"), "base64"),
    readFile(join(process.cwd(), "public/images/brand-mark-96.png"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0b1222", color: "#fff" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 56px 64px 72px", width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={`data:image/png;base64,${mark}`} width={64} height={64} alt="" style={{ borderRadius: 999 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30 }}>{site.name}</span>
              <span style={{ fontSize: 16, letterSpacing: 3, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>{site.instructorName.toUpperCase()}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ width: 56, height: 3, background: "#e27b22", marginBottom: 28 }} />
            <span style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -2 }}>Learn the case,</span>
            <span style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -2, color: "#f29a4a" }}>not the slide deck</span>
          </div>
          <span style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{site.tagline}</span>
        </div>
        <img src={`data:image/jpeg;base64,${photo}`} width={440} height={630} alt="" style={{ objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}
