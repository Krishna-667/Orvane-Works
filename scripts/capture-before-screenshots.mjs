import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve(process.cwd(), "docs/screenshots/phase-b-evidence");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function captureAll(stage = "before") {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Inject auth cookie so protected routes render without redirect
  await context.addCookies([
    {
      name: "sb-mock-auth-token",
      value: "mock-session-token",
      domain: "localhost",
      path: "/",
    },
  ]);

  const targets = [
    {
      id: "spot1-contact-footer",
      url: "http://localhost:3000/contact",
    },
    {
      id: "spot2-employee-order-submit-buttons",
      url: "http://localhost:3000/employee/orders/ORV-2026-0001",
    },
    {
      id: "spot3-employee-dashboard-action-button",
      url: "http://localhost:3000/employee",
    },
    {
      id: "spot4-client-new-order-submit-button",
      url: "http://localhost:3000/dashboard/orders/new",
    },
    {
      id: "spot5-admin-employees-invite-button",
      url: "http://localhost:3000/admin/employees",
    },
    {
      id: "spot6-admin-orders-filter-chip",
      url: "http://localhost:3000/admin/orders",
    },
  ];

  const viewports = [
    { width: 360, height: 800, name: "360px" },
    { width: 768, height: 1024, name: "768px" },
    { width: 1280, height: 800, name: "1280px" },
  ];

  for (const target of targets) {
    for (const theme of ["light", "dark"]) {
      for (const vp of viewports) {
        const page = await context.newPage();
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(target.url, { waitUntil: "networkidle", timeout: 25000 });

        if (theme === "dark") {
          await page.evaluate(() => {
            document.documentElement.classList.add("dark");
          });
        } else {
          await page.evaluate(() => {
            document.documentElement.classList.remove("dark");
          });
        }
        await page.waitForTimeout(300);

        const filename = `${stage}-${target.id}-${theme}-${vp.name}.png`;
        const filePath = path.join(outDir, filename);
        await page.screenshot({ path: filePath, fullPage: true });
        console.log(`Saved [${stage}]: ${filename}`);
        await page.close();
      }
    }
  }

  await browser.close();
  console.log(`Successfully captured all ${stage} screenshots!`);
}

const stageArg = process.argv[2] || "before";
captureAll(stageArg).catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
