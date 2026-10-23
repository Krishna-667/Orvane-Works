import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve(process.cwd(), "docs/screenshots");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function capture() {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const viewports = [
    { name: "phase1-360px.png", width: 360, height: 800 },
    { name: "phase1-768px.png", width: 768, height: 1024 },
    { name: "phase1-1280px.png", width: 1280, height: 800 },
  ];

  for (const vp of viewports) {
    const page = await context.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    const targetPath = path.join(outDir, vp.name);
    await page.screenshot({ path: targetPath, fullPage: true });
    console.log(`Saved screenshot: ${targetPath}`);
    await page.close();
  }

  await browser.close();
}

capture().catch((err) => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
