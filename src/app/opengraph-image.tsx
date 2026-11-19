import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/data/profile";

// Social-share card shown when the site link is posted on LinkedIn, WhatsApp, X, Slack…
export const alt = `${profile.name} — ${profile.role} in ${profile.location}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const root = process.cwd();
const [photo, serif, serifItalic] = await Promise.all([
  readFile(join(root, "public", profile.photo.src), "base64"),
  readFile(join(root, "src/assets/fonts/InstrumentSerif-Regular.ttf")),
  readFile(join(root, "src/assets/fonts/InstrumentSerif-Italic.ttf")),
]);
const photoSrc = `data:image/jpeg;base64,${photo}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#08070b",
          color: "#f3f1f7",
          position: "relative",
          padding: "64px 72px",
        }}
      >
        {/* glows */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: 120,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(139,92,246,0.45) 0%, rgba(139,92,246,0) 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(103,232,249,0.18) 0%, rgba(103,232,249,0) 65%)",
          }}
        />

        {/* text */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 20, letterSpacing: 4, color: "#a3a0b0" }}>
            <div style={{ width: 10, height: 10, borderRadius: 9999, background: "#a78bfa" }} />
            SOFTWARE ENGINEER — KAMPALA, UGANDA
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Serif", fontSize: 120, lineHeight: 0.9, letterSpacing: -2 }}>Vanessa</div>
            <div style={{ display: "flex", fontFamily: "Serif", fontStyle: "italic", fontSize: 104, lineHeight: 1, letterSpacing: -2 }}>
              <span style={{ color: "#d9d4e8" }}>Rebecca</span>
              <span style={{ marginLeft: 26, color: "#a78bfa" }}>Konso</span>
            </div>
            <div style={{ marginTop: 28, fontFamily: "Serif", fontSize: 40, lineHeight: 1.15, color: "#f3f1f7", maxWidth: 520 }}>
              I build software that makes complex work feel simple.
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, fontSize: 20, color: "#a3a0b0" }}>
            {["Next.js", "TypeScript", "PostgreSQL", "AI / ML"].map((t) => (
              <div
                key={t}
                style={{ display: "flex", padding: "8px 18px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.18)" }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* portrait */}
        <div
          style={{
            display: "flex",
            width: 336,
            height: 502,
            borderRadius: 32,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={photoSrc} alt="" width={336} height={504} style={{ objectFit: "cover" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 400 },
        { name: "Serif", data: serifItalic, style: "italic", weight: 400 },
      ],
    },
  );
}
