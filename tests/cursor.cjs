// Ejecutar con Node y Playwright disponible: node tests/cursor.cjs
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');

(async () => {
  const root = path.resolve(__dirname, '..');
  const server = http.createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try {
      const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml' };
      res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
      res.end(await fs.readFile(file));
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    // Simular un documento externo interactivo sin depender de Spotify/red.
    await page.route('**/*', route => {
      if (route.request().url().startsWith('http://127.0.0.1:')) return route.continue();
      if (route.request().url().includes('open.spotify.com/embed/')) {
        return route.fulfill({ contentType: 'text/html', body: '<button onclick="this.textContent=\'Reproduciendo\'">Reproducir</button>' });
      }
      return route.abort();
    });
    const url = `http://127.0.0.1:${server.address().port}`;
    await page.goto(url, { waitUntil: 'load' });
    const state = () => page.evaluate(() => {
      const cursor = document.getElementById('cursor-custom');
      const rect = cursor.getBoundingClientRect();
      return {
        parent: cursor.parentElement.id || cursor.parentElement.tagName,
        open: cursor.matches(':popover-open'),
        opacity: getComputedStyle(cursor).opacity,
        active: document.documentElement.classList.contains('cursor-personalizado-activo'),
        hover: cursor.classList.contains('cursor-hover'),
        x: rect.x + rect.width / 2, y: rect.y + rect.height / 2,
        count: document.querySelectorAll('#cursor-custom, #cursor-modal').length,
      };
    });
    await page.mouse.move(100, 100);
    assert.equal((await state()).active, true);
    assert.equal((await state()).count, 1);

    // Abrir en orden inverso al DOM para verificar el apilamiento real.
    await page.evaluate(() => document.getElementById('visorGaleria').showModal());
    await page.mouse.move(500, 400);
    assert.equal((await state()).parent, 'visorGaleria');
    await page.evaluate(() => document.getElementById('hojaProyecto').showModal());
    await page.mouse.move(600, 450);
    assert.equal((await state()).parent, 'hojaProyecto');
    assert.equal((await state()).open, true);
    assert.equal((await state()).opacity, '1');
    // Incluso con transform y overflow, las coordenadas son del viewport.
    await page.evaluate(() => {
      const modal = document.getElementById('hojaProyecto');
      modal.style.transform = 'translateY(15px) scale(.95)';
      modal.scrollTop = 100;
    });
    await page.mouse.move(30, 30);
    const outside = await state();
    assert.ok(Math.abs(outside.x - 30) < 1 && Math.abs(outside.y - 30) < 1);
    assert.equal(outside.opacity, '1');
    // Hit test solo durante la prueba para demostrar que se pinta por encima.
    assert.equal(await page.evaluate(() => {
      const cursor = document.getElementById('cursor-custom');
      cursor.style.pointerEvents = 'auto';
      const top = document.elementFromPoint(30, 30) === cursor;
      cursor.style.removeProperty('pointer-events');
      return top;
    }), true);
    await page.keyboard.press('Escape');
    assert.equal((await state()).parent, 'visorGaleria');
    await page.locator('#cerrarVisorGaleria').hover();
    assert.equal((await state()).hover, true);
    await page.locator('#cerrarVisorGaleria').click();
    assert.equal((await state()).parent, 'BODY');
    assert.equal((await state()).count, 1);
    console.log('PASS: modales, orden inverso, Escape, clics, hover y coordenadas fuera del modal.');

    await page.locator('#spotifyPlayer').scrollIntoViewIfNeeded();
    await page.frameLocator('#spotifyPlayer').getByRole('button').hover();
    assert.equal((await state()).active, false);
    assert.equal((await state()).opacity, '0');
    await page.frameLocator('#spotifyPlayer').getByRole('button').click();
    assert.equal(await page.frameLocator('#spotifyPlayer').getByRole('button').textContent(), 'Reproduciendo');
    await page.mouse.move(10, 400);
    assert.equal((await state()).active, true);
    assert.equal((await state()).opacity, '1');
    console.log('PASS: iframe externo interactivo y recuperación del cursor al salir.');

    await page.evaluate(() => {
      const button = document.createElement('button');
      button.id = 'dynamic-test'; button.textContent = 'Nuevo';
      button.style.cssText = 'position:fixed;top:20px;left:20px;z-index:999999';
      document.body.appendChild(button);
    });
    await page.locator('#dynamic-test').hover();
    assert.equal((await state()).hover, true);
    await page.evaluate(() => window.dispatchEvent(new Event('blur')));
    assert.equal((await state()).active, false);
    await page.mouse.move(400, 400);
    assert.equal((await state()).active, true);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.locator('#cursor-custom').evaluate(el => getComputedStyle(el).transitionDuration), '0s');
    console.log('PASS: elementos dinámicos, pérdida de foco y movimiento reducido.');

    const mobile = await browser.newPage({ isMobile: true, hasTouch: true, viewport: { width: 390, height: 844 } });
    await mobile.route('**/*', route => route.request().url().startsWith(url) ? route.continue() : route.abort());
    await mobile.goto(url, { waitUntil: 'load' });
    await mobile.touchscreen.tap(20, 300);
    assert.equal(await mobile.locator('html').evaluate(el => el.classList.contains('cursor-personalizado-activo')), false);
    console.log('PASS: dispositivo táctil sin cursor personalizado.');

    const fallback = await browser.newPage();
    await fallback.route('**/*', route => route.request().url().startsWith(url) ? route.continue() : route.abort());
    await fallback.addInitScript(() => { HTMLElement.prototype.showPopover = undefined; });
    await fallback.goto(url, { waitUntil: 'load' });
    await fallback.mouse.move(100, 100);
    assert.equal(await fallback.locator('html').evaluate(el => el.classList.contains('cursor-personalizado-activo')), false);
    assert.notEqual(await fallback.locator('body').evaluate(el => getComputedStyle(el).cursor), 'none');
    console.log('PASS: navegador sin Popover API conserva el cursor nativo.');
    assert.deepEqual(errors, []);
    await page.evaluate(() => document.getElementById('hojaProyecto').showModal());
    await page.mouse.move(640, 450);
    const screenshot = path.join(os.tmpdir(), 'portfolio-cursor-modal.png');
    await page.screenshot({ path: screenshot });
    console.log('Captura:', screenshot);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
