/**
 * After-state screenshot audit – Phase B (post-fixes)
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'http://localhost:3000';
const OUT_DIR = 'docs/screenshots/phase-b-after';
mkdirSync(OUT_DIR, { recursive: true });

const viewports = [
  { name: '360', width: 360, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1280', width: 1280, height: 900 },
];

const pages = [
  { path: '/', name: 'home' },
  { path: '/contact', name: 'contact' },
  { path: '/services', name: 'services' },
  { path: '/about', name: 'about' },
  { path: '/team', name: 'team' },
];

async function screenshot(page, path, name) {
  await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: name, fullPage: true });
  console.log(`  ✓ ${name}`);
}

const browser = await chromium.launch();

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();

  for (const pg of pages) {
    // Light
    await page.evaluate(() => { document.documentElement.classList.remove('dark'); });
    await screenshot(page, pg.path, join(OUT_DIR, `${pg.name}-light-${vp.name}.png`));
    // Dark
    await page.evaluate(() => { document.documentElement.classList.add('dark'); });
    await screenshot(page, pg.path, join(OUT_DIR, `${pg.name}-dark-${vp.name}.png`));
  }

  await context.close();
}

await browser.close();
console.log('\nAll after-state screenshots saved to', OUT_DIR);
