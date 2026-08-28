/* Milena Marczykowska Ceremonie – interakcje po stronie klienta */
(function () {
  'use strict';

  /* Oznacz, że JavaScript jest aktywny – dopiero wtedy chowamy sekcje do animacji.
     Dzięki temu bez JS cała treść jest widoczna od razu (brak „znikającej” sekcji). */
  document.documentElement.classList.add('js');

  /* Cień nagłówka po przewinięciu */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Animacje pojawiania się sekcji */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Zamykanie menu mobilnego po kliknięciu w link */
  var navLinks = document.querySelectorAll('#mainNav .nav-link');
  var collapseEl = document.getElementById('mainNav');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (collapseEl && collapseEl.classList.contains('show') && window.bootstrap) {
        var instance = window.bootstrap.Collapse.getInstance(collapseEl);
        if (instance) instance.hide();
      }
    });
  });

  /* Liczniki statystyk */
  var stats = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && stats.length) {
    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10) || 0;
          var suffix = el.getAttribute('data-suffix') || '';
          var start = 0;
          var duration = 1400;
          var startTime = null;
          function tick(now) {
            if (!startTime) startTime = now;
            var progress = Math.min((now - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(start + (target - start) * eased) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          statObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    stats.forEach(function (el) { statObserver.observe(el); });
  }
})();
