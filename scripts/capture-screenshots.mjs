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
    { namePrefix: "phase3-services", url: "http://localhost:3000/services" },
    { namePrefix: "phase3-packages", url: "http://localhost:3000/packages" },
    { namePrefix: "phase3-portfolio", url: "http://localhost:3000/portfolio" },
    { namePrefix: "phase3-contact", url: "http://localhost:3000/contact" },
    { namePrefix: "phase3-hardware", url: "http://localhost:3000/hardware" },
    { namePrefix: "phase3-how-we-work", url: "http://localhost:3000/how-we-work" },
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
      await page.goto(route.url, { waitUntil: "load", timeout: 15000 });
      await page.waitForTimeout(400);
      const filename = `${route.namePrefix}-${vp.name}`;
      const targetPath = path.join(outDir, filename);
      await page.screenshot({ path: targetPath, fullPage: true });
      console.log(`Saved screenshot: ${targetPath}`);
      await page.close();
    }
  }

  await browser.close();
  console.log("All Phase 3 screenshots captured successfully.");
}

capture().catch((err) => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
