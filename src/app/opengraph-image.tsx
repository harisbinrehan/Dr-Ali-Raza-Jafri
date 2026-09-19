import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — clinical dental courses taught by ${site.instructorName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const HEADLINE = ["Learn the case,", "not the slide deck"];

/** Plus Jakarta Sans for the card, fetched as TTF; the card still renders if this fails. */
async function loadDisplayFont(weight: 600 | 700) {
  try {
    const family = `Plus+Jakarta+Sans:wght@${weight}`;
    const text = encodeURIComponent([...HEADLINE, site.name].join(""));
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${text}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const [photo, mark, bold, semibold] = await Promise.all([
    readFile(join(process.cwd(), "public/images/teaching-whiteboard-portrait.jpg"), "base64"),
    readFile(join(process.cwd(), "public/images/brand-mark-96.png"), "base64"),
    loadDisplayFont(700),
    loadDisplayFont(600),
  ]);
  const fonts = [
    ...(bold ? [{ name: "Plus Jakarta Sans", data: bold, style: "normal" as const, weight: 700 as const }] : []),
    ...(semibold ? [{ name: "Plus Jakarta Sans", data: semibold, style: "normal" as const, weight: 600 as const }] : []),
  ];
  const display = fonts.length ? "Plus Jakarta Sans" : undefined;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f5f1ea", color: "#17181c" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 56px 60px 72px", width: 780 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={`data:image/png;base64,${mark}`} width={56} height={56} alt="" style={{ borderRadius: 999 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 28, fontFamily: display, fontWeight: 600 }}>{site.name}</span>
              <span style={{ fontSize: 16, color: "#5f6068", marginTop: 2 }}>{site.instructorName}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: display }}>
            <span style={{ fontSize: 80, lineHeight: 1.02, letterSpacing: -2, fontWeight: 700 }}>{HEADLINE[0]}</span>
            <span style={{ fontSize: 80, lineHeight: 1.02, letterSpacing: -2, fontWeight: 700 }}>{HEADLINE[1]}</span>
          </div>
          <div style={{ display: "flex", borderTop: "1px solid rgba(23,24,28,0.2)", paddingTop: 22, fontSize: 22, color: "#3a3c42" }}>{site.tagline}</div>
        </div>
        <img src={`data:image/jpeg;base64,${photo}`} width={420} height={630} alt="" style={{ objectFit: "cover" }} />
      </div>
    ),
    { ...size, fonts },
  );
}
