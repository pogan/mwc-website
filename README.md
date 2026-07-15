# Milena Wolak Ceremonie

Strona internetowa (wizytówka) **Mileny Wolak** – celebrantki ceremonii humanistycznych.
Aplikacja webowa zbudowana w oparciu o **Express.js**, **EJS**, **Bootstrap 5** oraz
własne style i skrypty JavaScript.

## ✦ Funkcje

- W pełni responsywny layout (mobile-first, Bootstrap 5)
- Elegancki, „ślubny” design (ciepła paleta, typografia serif + sans)
- Podstrony:
  - **Start** – strona główna z prezentacją oferty
  - **Ceremonie ślubne**
  - **Pary jednopłciowe**
  - **Przywitanie dziecka w rodzinie**
  - **Ceremonie funeralne**
  - **O mnie**
  - **Cennik**
  - **FAQ** (rozwijane pytania)
  - **Kontakt** (formularz z walidacją po stronie serwera)
- Animacje pojawiania się sekcji (IntersectionObserver, z poszanowaniem `prefers-reduced-motion`)
- Nagłówki bezpieczeństwa (Helmet + Content Security Policy)
- Centralne zarządzanie treścią w `data/site.js`

## ✦ Wymagania

- Node.js 18+ (testowane na Node 24)

## ✦ Instalacja i uruchomienie

```bash
npm install
npm start
```

Domyślnie aplikacja wystartuje pod adresem: <http://localhost:3000>

Tryb deweloperski (automatyczny restart przy zmianach):

```bash
npm run dev
```

Zmiana portu:

```bash
PORT=8080 npm start
```

## ✦ Struktura projektu

```
mwc-website/
├── server.js              # aplikacja Express (trasy, konfiguracja)
├── data/
│   └── site.js            # centralne treści: nawigacja, oferta, cennik, FAQ, kontakt
├── views/
│   ├── partials/          # layout, navbar, footer, hero, CTA
│   └── pages/             # widoki poszczególnych podstron
├── public/
│   ├── css/style.css      # style własne
│   ├── js/main.js         # skrypty front-end
│   ├── images/            # zdjęcia
│   └── favicon.svg
└── package.json
```

## ✦ Edycja treści

Większość treści (dane kontaktowe, pozycje menu, oferta, cennik, FAQ, opinie)
znajduje się w jednym pliku: **`data/site.js`**. Zmiana tam automatycznie
aktualizuje wszystkie podstrony.

## ✦ Formularz kontaktowy

Formularz waliduje dane po stronie serwera (imię, poprawny e-mail, treść wiadomości).
W obecnej wersji nie wysyła jeszcze wiadomości e-mail – w produkcji wystarczy podłączyć
np. [Nodemailer](https://nodemailer.com/) w obsłudze `POST /kontakt` w `server.js`.

## ✦ Uwagi

- Zdjęcia pochodzą z materiałów przekazanych przez klientkę (folder `kk_input_data`,
  wykluczony z repozytorium).
- Adres e-mail i dane kontaktowe warto potwierdzić przed publikacją (patrz sekcja
  „Do potwierdzenia” poniżej).

## ✦ Do potwierdzenia przed publikacją

- [ ] Adres e-mail (w materiałach źródłowych widniał `marczykowska@qmail.com` – prawdopodobnie literówka; przyjęto `marczykowska@gmail.com`)
- [ ] Statystyki na stronie głównej (liczba wesel itp.)
- [ ] Ceny i zakres pakietów
- [ ] Podłączenie realnej wysyłki formularza kontaktowego
