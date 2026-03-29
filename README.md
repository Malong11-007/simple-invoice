# The Editorial Ledger — Simple Invoice Generator

A clean, customizable invoice generator that runs entirely in the browser. Built with **Tailwind CSS** and vanilla JavaScript — no build step required.

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

Simply open `index.html` in a browser, or visit the hosted version on GitHub Pages.

### Install as an App

On **mobile**: Open the site in Chrome/Safari → tap "Add to Home Screen"
On **desktop**: Click the install icon in the browser address bar

The app works fully offline after the first visit.

### Local Development

No build tools or dependencies required — just open the file:

```bash
open index.html
# or use a local server:
npx serve .
```

## Deployment

This project is configured for automatic deployment to **GitHub Pages** via the included workflow (`.github/workflows/deploy.yml`).

To enable:
1. Go to your repository **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` and the site will deploy automatically

## Tech Stack

- [Tailwind CSS](https://tailwindcss.com/) (CDN) — Utility-first styling
- [Google Material Symbols](https://fonts.google.com/icons) — Icon set
- [Inter](https://fonts.google.com/specimen/Inter) — Typography
- Vanilla JavaScript — No frameworks, no build step
- Service Worker — Offline caching for PWA support
- Web App Manifest — Installable on mobile and desktop
