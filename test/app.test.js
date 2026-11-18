const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Baza statystyk testów w katalogu tymczasowym.
process.env.STATS_DB = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'mwc-')), 'stats.sqlite');
process.env.ADMIN_EMAILS = 'admin@example.com';
process.env.GOOGLE_CLIENT_ID = 'test.apps.googleusercontent.com';
const app = require('../server');

const BROWSER = {
  'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1',
  'accept-language': 'pl-PL,pl;q=0.9',
};

let base, server;
test.before(async () => {
  server = await new Promise((resolve) => {
    const s = app.listen(0, '127.0.0.1', () => resolve(s));
  });
  base = `http://127.0.0.1:${server.address().port}`;
});
test.after(() => server.close());

test('strony publiczne odpowiadają 200, stopka z wersją', async () => {
  for (const p of ['/', '/o-mnie', '/ceremonie-slubne', '/cennik', '/kontakt', '/faq', '/poradnik', '/polityka-prywatnosci']) {
    const res = await fetch(base + p);
    assert.equal(res.status, 200, p);
    assert.ok((await res.text()).includes(app.locals.appVersion.label), `${p}: wersja w stopce`);
  }
});

test('/healthz w formacie vamude-kit', async () => {
  const res = await fetch(`${base}/healthz`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.status, 'ok');
  assert.equal(body.app, 'mwc-website');
});

test('panel /kierownik: logowanie Google, statystyki tylko dla admina', async () => {
  const login = await fetch(`${base}/kierownik`);
  assert.equal(login.status, 200);
  assert.match(await login.text(), /data-client_id="test\.apps\.googleusercontent\.com"/);
  const stats = await fetch(`${base}/kierownik/stats`, { redirect: 'manual' });
  assert.equal(stats.status, 303);
  assert.equal(stats.headers.get('location'), '/kierownik?next=%2Fkierownik%2Fstats');
  assert.equal((await fetch(`${base}/kierownik/stats.json`)).status, 401);
  assert.equal((await fetch(`${base}/stats`)).status, 404);
});

test('podgląd: PREVIEW_LOGIN daje wejście do statystyk bez Google', async () => {
  process.env.PREVIEW_LOGIN = 'true';
  await fetch(`${base}/cennik`, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'accept-language': 'pl' } });
  await new Promise((r) => setTimeout(r, 20));
  const res = await fetch(`${base}/kierownik/podglad`, { method: 'POST', redirect: 'manual' });
  assert.equal(res.status, 303);
  const cookie = res.headers.get('set-cookie').split(';')[0];
  const json = await fetch(`${base}/kierownik/stats.json`, { headers: { cookie } });
  assert.equal(json.status, 200);
  assert.ok((await json.json()).pages.some((p) => p.name === '/cennik'));
  delete process.env.PREVIEW_LOGIN;
});
