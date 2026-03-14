import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://codepen.io/b-bhupendra/pen/QWOZjZP', { waitUntil: 'networkidle2' });
  const content = await page.content();
  console.log(content);
  await browser.close();
})();
