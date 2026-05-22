const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('http://localhost:3000/intake', { waitUntil: 'networkidle0' });
  
  const snippetBox = await page.evaluate(() => {
    const el = document.querySelector('.w-\\[900px\\]');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, bottom: rect.bottom };
  });

  const buttonBox = await page.evaluate(() => {
    const el = document.querySelector('a[href="/samples/snippet"]');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, bottom: rect.bottom };
  });

  const containerBox = await page.evaluate(() => {
    const el = document.querySelector('.hero-stage');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, bottom: rect.bottom };
  });

  console.log("Snippet:", snippetBox);
  console.log("Button:", buttonBox);
  console.log("Container:", containerBox);

  await browser.close();
})();
