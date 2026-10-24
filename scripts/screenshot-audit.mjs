/**
 * Screenshot audit script – Phase B
 * Takes before/after screenshots of key pages at 360, 768, 1280px in light & dark.
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'http://localhost:3000';
const OUT_DIR = 'docs/screenshots/phase-b';
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

async function setDark(page) {
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  });
  await page.waitForTimeout(200);
}

async function setLight(page) {
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  });
  await page.waitForTimeout(200);
}

const browser = await chromium.launch();

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();

  for (const pg of pages) {
    // Light
    await setLight(page);
    await screenshot(page, pg.path, join(OUT_DIR, `${pg.name}-light-${vp.name}.png`));
    // Dark
    await setDark(page);
    await screenshot(page, pg.path, join(OUT_DIR, `${pg.name}-dark-${vp.name}.png`));
  }

  await context.close();
}

await browser.close();
console.log('\nAll screenshots saved to', OUT_DIR);
