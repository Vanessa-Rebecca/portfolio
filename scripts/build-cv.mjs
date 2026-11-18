// Renders cv/cv.html to public/cv/Vanessa-Konso-CV.pdf using a locally installed Chrome or Edge.
// Usage: npm run cv   (optionally set CHROME_PATH to your browser executable)
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const input = join(root, "cv", "cv.html");
const outDir = join(root, "public", "cv");
const output = join(outDir, "Vanessa-Konso-CV.pdf");

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error("No Chrome/Edge found. Set CHROME_PATH to your browser executable.");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const profile = mkdtempSync(join(tmpdir(), "cv-chrome-"));
try {
  execFileSync(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      `--user-data-dir=${profile}`,
      "--no-pdf-header-footer",
      `--print-to-pdf=${output}`,
      pathToFileURL(input).href,
    ],
    { stdio: "ignore" },
  );
} finally {
  rmSync(profile, { recursive: true, force: true });
}
console.log(`CV written to ${output}`);
