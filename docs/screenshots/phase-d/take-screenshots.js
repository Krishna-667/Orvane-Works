const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const dir = 'e:/Free_Lance/Orvane/docs/screenshots/phase-d';
  fs.mkdirSync(dir, { recursive: true });

  const pages = [
    { name: 'home', url: 'http://localhost:3000/' },
    { name: 'dashboard', url: 'http://localhost:3000/dashboard' },
    { name: 'contact', url: 'http://localhost:3000/contact' },
  ];
  const viewports = [
    { name: '360', width: 360, height: 640 },
    { name: '768', width: 768, height: 1024 },
    { name: '1280', width: 1280, height: 800 },
  ];
  const themes = ['light', 'dark'];

  for (const theme of themes) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ colorScheme: theme === 'dark' ? 'dark' : 'light' });
    for (const vp of viewports) {
      const page = await ctx.newPage();
      await page.setViewportSize({ width: vp.width, height: vp.height });
      for (const pg of pages) {
        await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 15000 });
        const file = path.join(dir, `${pg.name}-${theme}-${vp.name}.png`);
        await page.screenshot({ path: file, fullPage: false });
        console.log('Saved:', file);
      }
      await page.close();
    }
    await ctx.close();
    await browser.close();
  }
  console.log('All screenshots done.');
})();
