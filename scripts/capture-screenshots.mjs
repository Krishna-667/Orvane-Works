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

  const routes = [
    { namePrefix: "phase5-dashboard", url: "http://localhost:3000/dashboard" },
    { namePrefix: "phase5-new-order", url: "http://localhost:3000/dashboard/orders/new" },
    { namePrefix: "phase5-order-detail", url: "http://localhost:3000/dashboard/orders/ORV-2026-0001" },
    { namePrefix: "phase5-settings", url: "http://localhost:3000/dashboard/settings" },
  ];

  const viewports = [
    { name: "360px.png", width: 360, height: 800 },
    { name: "768px.png", width: 768, height: 1024 },
    { name: "1280px.png", width: 1280, height: 800 },
  ];

  for (const route of routes) {
    for (const vp of viewports) {
      const page = await context.newPage();
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(route.url, { waitUntil: "domcontentloaded", timeout: 20000 });
      await page.waitForTimeout(600);
      const filename = `${route.namePrefix}-${vp.name}`;
      const targetPath = path.join(outDir, filename);
      await page.screenshot({ path: targetPath, fullPage: true });
      console.log(`Saved screenshot: ${targetPath}`);
      await page.close();
    }
  }

  await browser.close();
  console.log("All Phase 5 screenshots captured successfully.");
}

capture().catch((err) => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
