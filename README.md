# Kids World Toys, Maharagama — Website Demo (frontend only)

A playful online toy shop demo for **Kids World Toys, Maharagama (074 295 0405)**, built with
**React 18 + TypeScript + Vite + Tailwind CSS v4** (plus Framer Motion, Lucide icons and React Router).
There is no backend: products are sample data, the cart lives in `localStorage`, and the checkout is a
clearly-labelled demo.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## What's inside

| Route | Page |
| --- | --- |
| `/` | Home — hero, trust strip, categories, **Ride-on Jeep collection** (from the leaflet), popular picks, shop-by-age, gift ideas, why us, visit us |
| `/shop` | Search + category / age / price / offers / availability filters + sorting (all in the URL) |
| `/product/:id` | Details, quantity, add to cart, WhatsApp enquiry, related items |
| `/cart` → `/checkout` → `/order-confirmation` | Cart, validated order form, `DEMO-001` style confirmation, prefilled WhatsApp order |
| `/about` `/contact` `/delivery-returns` `/faq` | Trust & info pages |

The app uses `HashRouter` so the demo works from any static host. Switch to `BrowserRouter` in
[src/App.tsx](src/App.tsx) when deploying behind a real server.

## Where to edit things

- **Shop details** (phones, address, hours, delivery wording, jeep "from" price): [src/data/store.ts](src/data/store.ts)
- **Products** (sample names / prices / stock): [src/data/products.ts](src/data/products.ts). Product photos live in
  `public/images/products/<product-id>.jpg` — replace a file to change a photo (see the README.txt in that folder).
- **Categories & age groups**: [src/data/categories.ts](src/data/categories.ts)
- **Brand colours & fonts**: the `@theme` block in [src/index.css](src/index.css)

## Demo rules followed

- Orders are **not** sent anywhere and no payment is taken; the confirmation says so.
- Prices, stock and photos are samples (stock photos from Pexels — replace with the shop's own) (marked "Demo price"). The only real price is the jeep
  "starting from Rs. 23,800" taken from the leaflet.
- Details the owner must still confirm are tagged **"Shop to confirm"** (delivery charges/times, returns,
  shop opening hours, map pin, payment methods, social links).

## Leftovers from the original export

`_legacy/` holds the old Magic Patterns frame files. `pages/` and `src/shared/` are also old and unused
(they are excluded from the TypeScript build); delete all three whenever you like.
