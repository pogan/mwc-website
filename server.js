/**
 * Milena Wolak Ceremonie – aplikacja Express.js
 * Serwuje stronę wizytówkę celebrantki ceremonii humanistycznych.
 */

const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const helmet = require('helmet');

const site = require('./data/site');

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
  next();
});

/* -------------------------------- Trasy --------------------------------- */

app.get('/', (req, res) => {
  res.render('pages/home', {
    title: `${site.brand.name} – ${site.brand.role}`,
    description:
      'Milena Wolak – celebrantka ceremonii humanistycznych. Śluby, ceremonie dla par jednopłciowych, przywitania dziecka i ceremonie funeralne szyte na miarę. Gdańsk i cała Polska.'
  });
});

app.get('/ceremonie-slubne', (req, res) => {
  res.render('pages/ceremonie-slubne', {
    title: 'Ceremonie ślubne – ślub humanistyczny | Milena Wolak',
    description:
      'Ślub humanistyczny szyty na miarę: spersonalizowany scenariusz, pomoc w przysiędze, rytuały i pełna koordynacja dnia ślubu.'
  });
});

app.get('/pary-jednoplciowe', (req, res) => {
  res.render('pages/pary-jednoplciowe', {
    title: 'Ceremonie dla par jednopłciowych | Milena Wolak',
    description:
      'Ceremonie humanistyczne dla par jednopłciowych – bez ograniczeń i uprzedzeń. Piękna, osobista celebracja miłości.'
  });
});

app.get('/przywitanie-dziecka', (req, res) => {
  res.render('pages/przywitanie-dziecka', {
    title: 'Przywitanie dziecka w rodzinie | Milena Wolak',
    description:
      'Świecka ceremonia powitania dziecka w rodzinie – ciepła uroczystość celebrująca miłość, więzi i wspólną przyszłość.'
  });
});

app.get('/ceremonie-funeralne', (req, res) => {
  res.render('pages/ceremonie-funeralne', {
    title: 'Ceremonie funeralne – świeckie pożegnanie | Milena Wolak',
    description:
      'Godne, świeckie ceremonie pożegnania. Osobista opowieść o życiu bliskiej osoby, uczczona słowem, ciszą i pamięcią.'
  });
});

app.get('/o-mnie', (req, res) => {
  res.render('pages/o-mnie', {
    title: 'O mnie – Milena Wolak, celebrantka',
    description:
      'Poznaj Milenę Wolak – celebrantkę łączącą sceniczną charyzmę z wrażliwością na ludzkie historie. W branży ślubnej od 2017 roku.'
  });
});

app.get('/cennik', (req, res) => {
  res.render('pages/cennik', {
    title: 'Cennik ceremonii | Milena Wolak',
    description:
      'Cennik ceremonii humanistycznych Mileny Wolak – pakiety personalizowane i dwujęzyczne, oprawa muzyczna oraz warunki dojazdu.'
  });
});

app.get('/faq', (req, res) => {
  res.render('pages/faq', {
    title: 'FAQ – najczęściej zadawane pytania | Milena Wolak',
    description:
      'Odpowiedzi na najczęstsze pytania o ślub humanistyczny, przysięgę, oprawę muzyczną i dojazd celebrantki.'
  });
});

app.get('/kontakt', (req, res) => {
  res.render('pages/kontakt', {
    title: 'Kontakt | Milena Wolak Ceremonie',
    description:
      'Skontaktuj się z Mileną Wolak. Zapraszam na spotkanie osobiste lub online, aby porozmawiać o Waszej wyjątkowej ceremonii.'
  });
});

// Obsługa formularza kontaktowego (bez wysyłki e-mail – walidacja i komunikat).
app.post('/kontakt', (req, res) => {
  const { name = '', email = '', phone = '', eventType = '', message = '' } = req.body;
  const errors = [];

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (cleanName.length < 2) errors.push('Podaj imię (min. 2 znaki).');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) errors.push('Podaj poprawny adres e-mail.');
  if (cleanMessage.length < 10) errors.push('Napisz kilka słów o swojej ceremonii (min. 10 znaków).');

  const formState = {
    values: { name: cleanName, email: cleanEmail, phone: phone.trim(), eventType: eventType.trim(), message: cleanMessage },
    errors,
    success: errors.length === 0
  };

  // W realnym wdrożeniu tutaj następowałaby wysyłka wiadomości (np. Nodemailer).
  if (formState.success) {
    formState.values = { name: '', email: '', phone: '', eventType: '', message: '' };
  }

  res.status(errors.length ? 422 : 200).render('pages/kontakt', {
    title: 'Kontakt | Milena Wolak Ceremonie',
    description: 'Skontaktuj się z Mileną Wolak.',
    form: formState
  });
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
