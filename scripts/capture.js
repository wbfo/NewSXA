const { chromium } = require('playwright');
const path = require('path');

async function capture() {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: true
  });
  
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2, // Capture at high DPI for super crisp text and assets!
  });

  console.log('Navigating to http://localhost:3000/...');
  // Navigate and wait until network is idle so everything is loaded
  await page.goto('http://localhost:3000/', {
    waitUntil: 'networkidle'
  });

  console.log('Waiting 6 seconds for Framer Motion stagger reveals and floating logo loops to settle in...');
  await page.waitForTimeout(6000);

  // Take screenshot of the viewport
  const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');
  console.log(`Saving screenshot to ${outputPath}...`);
  await page.screenshot({
    path: outputPath,
    type: 'png'
  });

  console.log('Screenshot captured successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Error capturing screenshot:', err);
  process.exit(1);
});
