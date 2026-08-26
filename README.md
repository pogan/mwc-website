# Milena Wolak Ceremonie

A production business website for **Milena Wolak**, an independent humanist ceremony
celebrant based in Gdańsk, Poland. The site is the client's primary sales channel: it
presents her services (weddings, same-sex ceremonies, baby-welcoming ceremonies, and
funerals), makes pricing transparent up front, and converts visitors into leads through
a server-validated contact form that emails inquiries directly to the celebrant.

Built and deployed by Karol Konop as a freelance/contract engagement — architecture,
copy structure, SEO setup, and deployment pipeline included.

## What problem this solves for the client

- **Professional web presence** for a solo service business competing with wedding
  agencies and marketplaces.
- **Lead generation**: a single contact form (`POST /kontakt`) replaces ad-hoc
  DM/email inquiries, with server-side validation so the celebrant only receives
  usable submissions.
- **Pricing and service transparency**: a dedicated pricing page and FAQ reduce
  back-and-forth before a client even reaches out.
- **Discoverability**: per-page SEO metadata, `sitemap.xml`, JSON-LD structured data
  (LocalBusiness/Service/FAQ schema), and an `llms.txt` file for AI-assisted search.

## Tech stack

- **Node.js + Express** — server, routing, request handling
- **EJS** (`express-ejs-layouts`) — server-rendered views with a shared layout and
  reusable partials (navbar, footer, hero, CTA)
- **Bootstrap 5** — responsive, mobile-first grid and components
- Custom CSS (`public/css/style.css`) and vanilla JS (`public/js/main.js`) — no
  front-end framework or build step
- **Helmet** — security headers, including a Content Security Policy scoped to the
  specific third-party origins the site actually uses (Bootstrap CDN, Google Fonts)
- **Nodemailer** — SMTP-based email delivery for contact-form submissions
- **PM2** (`ecosystem.config.js`) — process management in production
- GitHub Actions (`.github/workflows/deploy.yml`) — deploy-on-push to `main` via SSH,
  with a manual `workflow_dispatch` path for redeploying a specific ref/SHA (rollback)

## Architecture notes

- **Single source of truth for content**: navigation, service copy, pricing packages,
  FAQ entries, and contact details all live in `data/site.js` and are injected into
  every view via `res.locals`. Editing that one file updates the whole site
  consistently — no copy duplicated across templates.
- **Server-side form validation**: `lib/contactForm.js` validates name/email/message
  server-side (never trusting the client), returns field-level errors back into the
  same rendered page (no client-side-only validation, no JS framework required), and
  only calls out to `lib/mailer.js` once input is clean. Errors during SMTP delivery
  are caught and surfaced as a user-facing fallback message rather than a raw 500.
- **Accessibility**: scroll-reveal animations (`IntersectionObserver` in
  `public/js/main.js`) are disabled via `@media (prefers-reduced-motion: reduce)` in
  CSS, content is not JS-gated (unstyled/plain content is visible without
  JavaScript — the `.js` class only tightens presentation once JS confirms it's
  active), and pages use semantic HTML with appropriate landmarks/ARIA on icon-only
  elements.
- **Progressive enhancement**: `main.js` degrades gracefully — the reveal
  animations, animated stat counters, and mobile-nav auto-close all feature-detect
  before attaching (`'IntersectionObserver' in window`, etc.) so a JS failure never
  hides content.
- **Config via environment**: SMTP credentials, the inbox that receives leads, and
  the port are all read from environment variables (`dotenv`), never hardcoded —
  see `.env.example` for the full list.

## Project structure

```
mwc-website/
├── server.js               # Express app: routes, security headers, sitemap, error handling
├── data/
│   └── site.js              # Single source of truth: nav, services, pricing, FAQ, contact info
├── lib/
│   ├── contactForm.js        # Server-side validation + orchestration for the contact form
│   └── mailer.js             # Nodemailer transport + email composition
├── views/
│   ├── partials/              # layout, navbar, footer, hero, CTA
│   └── pages/                 # one template per route
├── public/
│   ├── css/style.css          # hand-written styles (Bootstrap 5 as base)
│   ├── js/main.js             # scroll reveal, stat counters, mobile-nav behavior
│   ├── images/                 # optimized photos (JPEG + WebP pairs)
│   ├── robots.txt / llms.txt
│   └── favicon.svg
├── ecosystem.config.js        # PM2 process definition for production
└── .github/workflows/deploy.yml
```

## Requirements

- Node.js 18+ (tested on Node 24)

## Setup

```bash
npm install
cp .env.example .env   # then fill in real SMTP credentials and the recipient address
npm start               # http://localhost:3000
```

Development mode (auto-restart on file changes, via Node's built-in `--watch`):

```bash
npm run dev
```

Override the port:

```bash
PORT=8080 npm start
```

### Environment variables

See `.env.example` for the full list — SMTP host/port/credentials for outbound mail,
the inbox address that receives contact-form leads, and `PORT`. Nothing in the repo
requires secrets to run in read-only/browsing mode; only actually submitting the
contact form requires working SMTP configuration.

### Production deployment

`ecosystem.config.js` defines a PM2 process (`pm2 start ecosystem.config.js`) with
autorestart, a memory-restart threshold, and file logging. `.github/workflows/deploy.yml`
deploys on every push to `main` over SSH to a host that runs a fixed deploy script, and
also supports a manual re-run against an arbitrary ref/commit SHA for rollbacks.

## Notes

- All copy, pricing, and photography are the client's own business content.
- The `kk_input_data/` directory referenced during development (raw client-supplied
  photos and text drafts) is intentionally excluded from the repository via
  `.gitignore` and was never committed.
