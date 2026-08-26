/**
 * Milena Wolak Ceremonie – aplikacja Express.js
 * Serwuje stronę wizytówkę celebrantki ceremonii humanistycznych.
 */

require('dotenv').config();

const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const helmet = require('helmet');

const site = require('./data/site');
const { processContactForm } = require('./lib/contactForm');

const app = express();
const PORT = process.env.PORT || 3000;

/* ----------------------------- Konfiguracja ----------------------------- */

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'partials/layout');

// Bezpieczeństwo nagłówków. CSP dopuszcza CDN Bootstrapa i Google Fonts.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net', 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        frameSrc: ["'self'", 'https://www.google.com', 'https://maps.google.com']
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '7d' }));

// Wspólne zmienne dostępne w każdym widoku.
app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.nav = site.nav;
  res.locals.currentPath = req.path;
  res.locals.brand = site.brand;
  res.locals.contact = site.contact;
  res.locals.form = null; // domyślny stan formularza kontaktowego
  res.locals.canonicalUrl = site.url + (req.path === '/' ? '' : req.path.replace(/\/$/, ''));
  res.locals.ogImage = '/images/wedding-beach.jpg'; // domyślne, nadpisywane per trasa
  res.locals.serviceSchema = null;
  res.locals.faqSchema = false;
  next();
});

/* -------------------------------- Trasy --------------------------------- */

app.get('/', (req, res) => {
  res.render('pages/home', {
    title: `${site.brand.name} – ${site.brand.role} | Gdańsk`,
    description:
      'Milena Wolak – celebrantka ceremonii humanistycznych. Śluby, ceremonie dla par LGBT+, przywitania dziecka, ceremonie pożegnania i odnowienie przysięgi szyte na miarę. Gdańsk, Trójmiasto i cała Polska.',
    ogImage: '/images/wedding-beach.jpg'
  });
});

app.get('/ceremonie-slubne', (req, res) => {
  res.render('pages/ceremonie-slubne', {
    title: 'Ślub Humanistyczny – Gdańsk, Trójmiasto i cała Polska | Milena Wolak',
    description:
      'Ślub humanistyczny szyty na miarę: spersonalizowany scenariusz, pomoc w przysiędze, rytuały i pełna koordynacja dnia ślubu. Gdańsk, Trójmiasto i cała Polska.',
    ogImage: '/images/wedding-arch.jpg',
    serviceSchema: {
      name: 'Ślub humanistyczny',
      description:
        'Spersonalizowany scenariusz oparty na Waszej historii, pomoc w napisaniu przysięgi i rytuały szyte na miarę.'
    }
  });
});

app.get('/pary-jednoplciowe', (req, res) => {
  res.redirect(301, '/pary-lgbt');
});

app.get('/pary-lgbt', (req, res) => {
  res.render('pages/pary-lgbt', {
    title: 'Ceremonie dla Par LGBT+ – Gdańsk i cała Polska | Milena Wolak',
    description:
      'Ceremonie humanistyczne dla par LGBT+ – bez ograniczeń i uprzedzeń. Piękna, osobista celebracja miłości. Gdańsk, Trójmiasto i cała Polska.',
    ogImage: '/images/couple-samesex.jpg',
    serviceSchema: {
      name: 'Ceremonia dla par LGBT+',
      description:
        'Ceremonia bez ograniczeń i uprzedzeń – równie piękna, osobista i pełna emocji, na jaką zasługuje każda miłość.'
    }
  });
});

app.get('/przywitanie-dziecka', (req, res) => {
  res.render('pages/przywitanie-dziecka', {
    title: 'Przywitanie Dziecka w Rodzinie – Gdańsk i cała Polska | Milena Wolak',
    description:
      'Świecka ceremonia powitania dziecka w rodzinie – ciepła uroczystość celebrująca miłość, więzi i wspólną przyszłość. Gdańsk, Trójmiasto i cała Polska.',
    ogImage: '/images/family-children.jpg',
    serviceSchema: {
      name: 'Przywitanie dziecka w rodzinie',
      description:
        'Symboliczne powitanie nowego członka rodziny – ciepła uroczystość celebrująca miłość, więzi i wspólną przyszłość.'
    }
  });
});

app.get('/ceremonie-funeralne', (req, res) => {
  res.redirect(301, '/ceremonie-pozegnania');
});

app.get('/ceremonie-pozegnania', (req, res) => {
  res.render('pages/ceremonie-pozegnania', {
    title: 'Ceremonie Pożegnania, Świeckie Pożegnanie – Gdańsk i cała Polska | Milena Wolak',
    description:
      'Godne, świeckie ceremonie pożegnania. Osobista opowieść o życiu bliskiej osoby, uczczona słowem, ciszą i pamięcią. Gdańsk, Trójmiasto i cała Polska.',
    ogImage: '/images/funerals.jpg',
    serviceSchema: {
      name: 'Ceremonia pożegnania',
      description:
        'Godne, świeckie pożegnanie bliskiej osoby – opowieść o życiu, które warto uczcić słowem, ciszą i pamięcią.'
    }
  });
});

app.get('/odnowienie-przysiegi', (req, res) => {
  res.render('pages/odnowienie-przysiegi', {
    title: 'Odnowienie Przysięgi Małżeńskiej – Gdańsk i cała Polska | Milena Wolak',
    description:
      'Celebracja Waszej historii, miłości i drogi, którą przeszliście razem. Autorska ceremonia odnowienia przysięgi małżeńskiej. Gdańsk, Trójmiasto i cała Polska.',
    ogImage: '/images/wedding-candles.jpg',
    serviceSchema: {
      name: 'Odnowienie przysięgi małżeńskiej',
      description:
        'Celebracja Waszej historii, miłości i drogi, którą przeszliście razem – świętujcie na własnych zasadach, po latach.'
    }
  });
});

app.get('/o-mnie', (req, res) => {
  res.render('pages/o-mnie', {
    title: 'O mnie – Milena Wolak, Celebrantka z Gdańska',
    description:
      'Poznaj Milenę Wolak – celebrantkę łączącą sceniczną charyzmę z wrażliwością na ludzkie historie. W branży ślubnej od 2017 roku. Gdańsk i cała Polska.',
    ogImage: '/images/milena-portrait.jpg'
  });
});

app.get('/cennik', (req, res) => {
  res.render('pages/cennik', {
    title: 'Cennik Ceremonii Humanistycznych – Gdańsk i cała Polska | Milena Wolak',
    description:
      'Cennik ceremonii humanistycznych Mileny Wolak – pakiety personalizowane i dwujęzyczne, oprawa muzyczna oraz warunki dojazdu. Gdańsk, Trójmiasto i cała Polska.',
    ogImage: '/images/wedding-rustic.jpg'
  });
});

app.get('/faq', (req, res) => {
  res.render('pages/faq', {
    title: 'FAQ – najczęściej zadawane pytania | Milena Wolak',
    description:
      'Odpowiedzi na najczęstsze pytania o ślub humanistyczny, przysięgę, oprawę muzyczną i dojazd celebrantki.',
    ogImage: '/images/ceremony-inclusive.jpg',
    faqSchema: true
  });
});

app.get('/kontakt', (req, res) => {
  res.render('pages/kontakt', {
    title: 'Kontakt – Gdańsk, Trójmiasto i cała Polska | Milena Wolak Ceremonie Humanistyczne',
    description:
      'Skontaktuj się z Mileną Wolak. Zapraszam na spotkanie osobiste lub online, aby porozmawiać o Waszej wyjątkowej ceremonii. Gdańsk, Trójmiasto i cała Polska.',
    ogImage: '/images/wedding-arch.jpg'
  });
});

// Obsługa formularza kontaktowego – walidacja i wysyłka e-mail (patrz lib/contactForm.js).
app.post('/kontakt', async (req, res) => {
  const formState = await processContactForm(req.body);

  res.status(formState.errors.length ? 422 : 200).render('pages/kontakt', {
    title: 'Kontakt – Gdańsk, Trójmiasto i cała Polska | Milena Wolak Ceremonie Humanistyczne',
    description: 'Skontaktuj się z Mileną Wolak.',
    ogImage: '/images/wedding-arch.jpg',
    form: formState
  });
});

/* -------------------------------- Sitemap -------------------------------- */

app.get('/sitemap.xml', (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  // '/' i '/kontakt' są ukryte w menu (patrz data/site.js), ale mają zostać w sitemapie.
  const navPaths = site.nav.map((item) => item.path);
  const paths = ['/', ...navPaths, '/kontakt'].filter((p, i, arr) => arr.indexOf(p) === i);
  const urls = paths
    .map((path) => {
      const priority = path === '/' ? '1.0' : site.services.some((s) => s.path === path) ? '0.8' : '0.5';
      return `  <url>\n    <loc>${site.url}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  res.type('application/xml').send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
  );
});

/* ------------------------------ 404 / błędy ----------------------------- */

app.use((req, res) => {
  res.status(404).render('pages/404', {
    title: 'Nie znaleziono strony (404) | Milena Wolak',
    description: 'Strona, której szukasz, nie istnieje.'
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('pages/404', {
    title: 'Błąd serwera | Milena Wolak',
    description: 'Coś poszło nie tak.'
  });
});

app.listen(PORT, () => {
  console.log(`✦ Milena Wolak Ceremonie – serwer działa na http://localhost:${PORT}`);
});

module.exports = app;
