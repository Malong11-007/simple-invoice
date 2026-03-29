# The Editorial Ledger — Simple Invoice Generator

A clean, customizable invoice generator that runs entirely in the browser. Built with **SvelteKit** and **Tailwind CSS** — a modern, component-based architecture.

**🔒 100% Private — No data is sent anywhere. Everything works completely in your browser.**

## Features

- **Installable PWA** — Add to home screen on mobile or desktop, works like a native app
- **Works offline** — Full functionality without an internet connection via service worker
- **100% private** — All data stays on your device, nothing is ever sent to a server
- **Editable company info** — Click to edit your company name, address, and email
- **Dynamic line items** — Add/remove invoice line items with automatic calculations
- **Multi-currency support** — Switch between USD ($), GBP (£), and EUR (€)
- **Tax options** — Toggle tax on/off with preset rates (0%, 5%, 8%, 10%) or enter a custom rate
- **Due date toggle** — Show or hide the due date field
- **Payment instructions** — Built-in section for bank/ACH payment details
- **Print / PDF export** — Clean print-optimized layout for saving as PDF
- **Local storage persistence** — Invoice data is saved automatically in the browser
- **Mobile-friendly** — Responsive layout with touch-friendly controls

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

The production-ready static site is output to the `build/` directory.

### Preview production build

```bash
npm run preview
```

### Run tests

```bash
npm test
```

### Type checking

```bash
npm run check
```

### Install as an App

On **mobile**: Open the site in Chrome/Safari → tap "Add to Home Screen"
On **desktop**: Click the install icon in the browser address bar

The app works fully offline after the first visit.

## Deployment

This project is configured for automatic deployment to **GitHub Pages** via the included workflow (`.github/workflows/deploy.yml`).

To enable:
1. Go to your repository **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` and the site will deploy automatically

The workflow runs `npm test` and `npm run build` before deploying.

## Tech Stack

- [SvelteKit](https://svelte.dev/) — Component framework with static site generation
- [Tailwind CSS](https://tailwindcss.com/) (npm) — Utility-first styling
- [Vite](https://vite.dev/) — Build tool and dev server
- [Vitest](https://vitest.dev/) — Unit testing framework
- [Google Material Symbols](https://fonts.google.com/icons) — Icon set
- [Inter](https://fonts.google.com/specimen/Inter) — Typography
- Service Worker — Offline caching for PWA support
- Web App Manifest — Installable on mobile and desktop

## Project Structure

```
src/
├── app.css                        # Global styles (Tailwind + custom CSS)
├── app.html                       # HTML template with PWA meta tags
├── app.d.ts                       # TypeScript declarations
├── lib/
│   ├── components/
│   │   ├── Header.svelte          # App header with print button
│   │   ├── PrivacyBanner.svelte   # Privacy notice banner
│   │   ├── InvoiceHeader.svelte   # Sender info + invoice details
│   │   ├── BillTo.svelte          # Client billing info
│   │   ├── CurrencySelector.svelte# Currency dropdown
│   │   ├── LineItems.svelte       # Dynamic line items
│   │   ├── PaymentInstructions.svelte # Bank/payment details
│   │   ├── Totals.svelte          # Subtotal, tax, total
│   │   └── Footer.svelte          # App footer
│   ├── stores/
│   │   └── invoice.ts             # Svelte stores for invoice state
│   └── utils/
│       └── currency.ts            # Currency formatting utilities
├── routes/
│   ├── +layout.svelte             # Root layout with CSS import
│   ├── +layout.ts                 # Static prerendering config
│   └── +page.svelte               # Main invoice page
└── tests/
    ├── setup.ts                   # Test setup
    ├── currency.test.ts           # Currency utility tests
    └── invoice.test.ts            # Invoice store tests
static/
├── icons/                         # PWA icons
├── manifest.json                  # PWA manifest
└── sw.js                          # Service worker
```
