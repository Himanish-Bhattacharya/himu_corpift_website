# Corpift — Corporate Gifting Website

Premium corporate gifting website for **Corpift**, Jaipur. Built with Next.js 14 static export, Sanity CMS, and Tailwind CSS.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, static export) |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| CMS | Sanity v3 |
| State | Zustand (cart, persisted to localStorage) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Deploy | Vercel |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev        # → http://localhost:3000

# Type check
npx tsc --noEmit

# Build for production
npm run build
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=vah53psk
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## Sanity CMS

All products and blog posts are managed through Sanity.

**Studio (live):** https://corpift.sanity.studio/

**Running the studio locally:**
```bash
cd studio
npm install
npm run dev        # → http://localhost:3333
```

**Deploying the studio:**
```bash
cd studio
npm run deploy     # → https://corpift.sanity.studio/
```

### Content Types

- **Product** — name, slug, categories (multi-select), price (INR), image, description, featured flag, serial number
- **Blog Post** — title, slug, date, excerpt, cover image, rich text content (Portable Text)

### Adding Product Images

Each product has a `serialNumber` field (1–100) that matches the image filename. To bulk-upload images without triggering 100 Vercel rebuilds:

1. Disable the Sanity webhook in [sanity.io/manage](https://sanity.io/manage) → API → Webhooks
2. Upload all images in the Studio
3. Re-enable the webhook
4. Trigger one manual redeploy from the Vercel dashboard

---

## Data Migration Scripts

One-time scripts used to seed Sanity from source data:

```bash
# Migrate 100 products from CSV
node scripts/migrate-to-sanity.mjs

# Migrate 4 blog posts
node scripts/migrate-blogs-to-sanity.mjs
```

Both scripts require `SANITY_WRITE_TOKEN` in `.env.local` (Editor-role token from Sanity dashboard).

---

## Deployment

The site is deployed on **Vercel**. Every push to `main` triggers a production build.

**Auto-rebuild on content publish:**
A Sanity webhook is configured to call a Vercel Deploy Hook whenever content is published, updated, or deleted — keeping the static site in sync with the CMS.

**Custom domain:**
DNS is managed through GoDaddy, pointing to Vercel.

---

## Cart System

The "cart" is an inquiry system — no payments. Users add products and submit an inquiry via email (`corpift@outlook.com`). Cart state is persisted to `localStorage` via Zustand.

---

## Contact

- **Email:** corpift@outlook.com
- **Phone:** +91 9057370100
- **WhatsApp:** +91 8003920353
- **Address:** 546, Shanti Nagar, near CK Birla Hospital, Durgapura, Jaipur – 302018
