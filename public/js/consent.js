/* Milena Marczykowska Ceremonie – zgoda na cookies (Consent Mode v2, tryb podstawowy).
 *
 * Domyślne zgody (odrzucone) ustawia views/partials/analytics.ejs. Ten skrypt:
 *  - pokazuje pasek #cookie-banner, dopóki odwiedzający nie wybierze,
 *  - po „Akceptuję” aktualizuje zgody i dopiero wtedy pobiera gtag.js
 *    (przed zgodą do Google nie trafia żadne żądanie),
 *  - po „Odrzucam” zapamiętuje wybór i usuwa ewentualne ciasteczka _ga / _gcl,
 *  - link [data-cookie-settings] (stopka) otwiera pasek ponownie.
 * Wybór trzymamy w localStorage – bez własnych ciasteczek.
 */
(function () {
  'use strict';

  var KEY = 'mm-cookie-consent';
  var banner = document.getElementById('cookie-banner');
  if (!banner || typeof window.gtag !== 'function') return;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* tryb prywatny – pasek wróci przy kolejnej wizycie */ }
  }

  var loaded = false;
  function grantAndLoad() {
    if (loaded || !window.MM_GTAG_ID) return;
    loaded = true;
    window.gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(window.MM_GTAG_ID);
    document.head.appendChild(s);
  }

  /* GA i Ads zapisują ciasteczka na domenie nadrzędnej – czyścimy każdy możliwy zakres. */
  function clearTrackingCookies() {
    var host = location.hostname;
    var parent = host.split('.').slice(-2).join('.');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (!/^(_ga|_gcl|_gid)/.test(name)) return;
      ['', host, '.' + host, '.' + parent].forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
      });
    });
  }

  function show() { banner.hidden = false; }
  function hide() { banner.hidden = true; }

  var choice = read();
  if (choice === 'granted') grantAndLoad();
  else if (choice !== 'denied') show();

  banner.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-consent]');
    if (!btn) return;
    var value = btn.getAttribute('data-consent');
    var wasLoaded = loaded;
    write(value);
    hide();
    if (value === 'granted') {
      grantAndLoad();
    } else {
      clearTrackingCookies();
      /* Załadowanego gtag.js nie da się „wyładować” – przeładowanie strony go zatrzymuje. */
      if (wasLoaded) location.reload();
    }
  });

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('[data-cookie-settings]');
    if (!link) return;
    e.preventDefault();
    show();
    var first = banner.querySelector('[data-consent]');
    if (first) first.focus();
  });
})();
