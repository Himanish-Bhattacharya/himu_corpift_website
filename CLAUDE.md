# CLAUDE.md — Corpift Website (Next.js)

This file gives you everything you need to work on the Corpift website without asking
repeated questions. Read this before touching any code.

---

## 1. What Is This Project?

A **static multi-page marketing website** for **Corpift** — a premium corporate gifting
company based in Jaipur, India. They sell handcrafted, eco-friendly, and customized gift
hampers to businesses (B2B).

**This is NOT an e-commerce site.** There is no payment flow. The "cart" collects items
into an inquiry form submitted via email. Think of it as a "quote request" system
dressed as a cart.

**Live reference (old site):** https://corpift.com — we are replacing this.

---

## 2. Tech Stack

| Layer         | Choice                  | Why                                                    |
| ------------- | ----------------------- | ------------------------------------------------------ |
| Framework     | Next.js 14 (App Router) | File-based routing, shared layouts, static export      |
| Styling       | Tailwind CSS v3         | Design token consistency, rapid iteration              |
| Animation     | Framer Motion           | Page transitions, drawer, stagger, magnetic effects    |
| State         | Zustand                 | Cart state — clean, minimal, persisted to localStorage |
| Forms         | React Hook Form + Zod   | Inquiry form validation                                |
| UI primitives | shadcn/ui               | Dialog, Input, Textarea — pre-styled, fully owned      |
| Icons         | Lucide React            | Consistent icon set                                    |
| Fonts         | next/font (Google)      | Zero layout shift font loading                         |
| Deploy        | Vercel (free tier)      | Static export via `next build`                         |

**Output mode:** `next export` (static HTML, no server required)

---

## 3. Project Structure

```
corpift/
├── CLAUDE.md
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
│
├── app/
│   ├── layout.tsx           ← root layout: fonts, Header, Footer, CartDrawer
│   ├── page.tsx             ← homepage
│   ├── shop/
│   │   └── page.tsx         ← product catalog
│   ├── about/
│   │   └── page.tsx         ← brand story + team
│   ├── services/
│   │   └── page.tsx         ← service listings
│   └── contact/
│       └── page.tsx         ← contact form + map
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx       ← fixed nav, cart icon, mobile menu
│   │   ├── Footer.tsx       ← links, address, logo
│   │   └── CartDrawer.tsx   ← slide-in drawer + inquiry modal
│   ├── ui/                  ← shadcn/ui components live here
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Marquee.tsx
│   │   ├── AboutTeaser.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── ServicesStrip.tsx
│   │   ├── Testimonials.tsx
│   │   └── CtaBanner.tsx
│   ├── shop/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── FilterBar.tsx
│   └── shared/
│       ├── SectionLabel.tsx   ← gold label above headings
│       ├── RevealOnScroll.tsx ← Framer Motion scroll wrapper
│       └── InquiryModal.tsx   ← form modal triggered from cart
│
├── store/
│   └── cartStore.ts           ← Zustand cart store
│
├── data/
│   └── products.ts            ← all product data
│
├── lib/
│   └── utils.ts               ← cn() helper, formatPrice(), etc.
│
└── public/
    └── images/                ← product and brand images
```

---

## 4. Business Context

| Field         | Detail                                                                |
| ------------- | --------------------------------------------------------------------- |
| Company       | Corpift                                                               |
| Location      | 546, Shanti Nagar, near CK Birla Hospital, Durgapura, Jaipur - 302018 |
| Phone         | +91 9057370100                                                        |
| WhatsApp      | +91 8003920353                                                        |
| Email         | corpift@outlook.com                                                   |
| Hours         | Mon–Fri: 7am–10pm, Sat–Sun: 9am–5pm                                   |
| Target buyers | HR managers, procurement leads, event planners                        |
| Order type    | Bulk / corporate orders — NOT individual retail                       |
| Founder & CEO | Himanish Bhattacharya                                                 |

---

## 5. Design System

### Fonts — loaded via `next/font/google` in `app/layout.tsx`

```ts
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});
```

- **Display/Headings:** Cormorant Garamond (`font-display` Tailwind class)
- **Body/UI:** Jost (`font-body` Tailwind class)
- NEVER use Inter, Roboto, or system-ui for headings

### Tailwind Config Tokens — `tailwind.config.js`

```js
theme: {
  extend: {
    colors: {
      bg:            '#FAFAF8',
      'bg-alt':      '#F3EFE8',
      'bg-dark':     '#1B1916',
      'bg-card':     '#FFFFFF',
      text:          '#1B1916',
      muted:         '#7A7570',
      light:         '#ABA69F',
      accent:        '#B5923E',
      'accent-dark': '#8F7030',
      'accent-light':'#D4B472',
      border:        '#E4DED4',
      'border-dark': '#2E2B27',
    },
    fontFamily: {
      display: ['var(--font-display)', 'Georgia', 'serif'],
      body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      'display-lg': ['clamp(64px, 10vw, 120px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
      'display-md': ['clamp(48px, 7vw, 80px)',   { lineHeight: '0.95' }],
      'display-sm': ['clamp(36px, 5vw, 56px)',   { lineHeight: '1.0' }],
      'heading-lg': ['clamp(32px, 4vw, 48px)',   { lineHeight: '1.1' }],
      'heading-md': ['clamp(24px, 3vw, 36px)',   { lineHeight: '1.1' }],
      'heading-sm': ['clamp(20px, 2.5vw, 28px)', { lineHeight: '1.2' }],
    },
    transitionTimingFunction: {
      'ease-custom': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  },
}
```

### Aesthetic Direction

- **Modern Minimal Premium** — Aesop meets Indian craft
- Warm, tactile, editorial. NOT a SaaS site
- Generous whitespace. Asymmetric grids. Grid-breaking moments
- Subtle grain/noise texture on `<body>` (SVG data URI, `opacity-[0.025]`, `fixed`, `pointer-events-none`)
- Gold (`#B5923E`) is the ONLY accent — no blue, green, or purple anywhere

---

## 6. Component Patterns

### SectionLabel

```tsx
// Always appears above major section headings
<SectionLabel>Our Products</SectionLabel>
// → <span className="text-accent text-[11px] font-medium tracking-[0.14em] uppercase font-body">
```

### RevealOnScroll

```tsx
// Wrap any element that should animate in on scroll
<RevealOnScroll delay={0.1}>
  <ProductCard ... />
</RevealOnScroll>

// Internal implementation:
<motion.div
  initial={{ opacity: 0, y: 28 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-60px' }}
  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }}
>
  {children}
</motion.div>
```

### ProductCard

```tsx
<ProductCard product={product} />
// - motion.div with whileHover={{ y: -4 }} + box-shadow transition
// - Image overlay with "Add to Inquiry" button on hover
// - Category label in accent gold (text-accent, t-label size)
// - Name in font-display
// - Price as "Starting from Rs. {price}"
// - onAddToCart calls useCartStore().addItem()
```

### Buttons (defined as globals in `app/globals.css`)

```css
.btn-primary {
  @apply bg-text text-bg text-[13px] font-medium tracking-[0.06em] uppercase py-3 px-8 rounded-sm transition-all duration-300 ease-custom hover:bg-accent hover:-translate-y-px;
}
.btn-outline {
  @apply border border-border-dark text-text ... hover:border-accent hover:text-accent hover:-translate-y-px;
}
.btn-ghost {
  @apply text-text border-b border-text pb-1 ... hover:text-accent hover:border-accent;
}
.btn-accent {
  @apply bg-accent text-white ... hover:bg-accent-dark hover:-translate-y-px;
}
```

Arrow icon: wrap button content in `<span className="group">`, apply `group-hover:translate-x-1` to Lucide `<ArrowRight>`.

---

## 7. Cart System (Zustand)

### Store — `store/cartStore.ts`

```ts
interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isModalOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openModal: () => void;
  closeModal: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

// Persist with zustand/middleware:
// persist(store, { name: 'corpift-cart' })
```

### CartDrawer — `components/layout/CartDrawer.tsx`

```
Uses: AnimatePresence to mount/unmount
Overlay: motion.div opacity 0 → 0.4 (bg-dark), closes drawer on click
Drawer:  motion.div x:'100%' → x:0, w-[440px] desktop / w-full mobile
Duration: 0.5s, ease: [0.25, 0.46, 0.45, 0.94]

Structure:
  - Header: title + item count + close button (X icon)
  - Body: scrollable item list OR empty state
  - Footer: subtotal + "Submit Inquiry" button (btn-accent)

Empty state: centered ShoppingBag icon (opacity-30) + message in font-display
```

### InquiryModal — `components/shared/InquiryModal.tsx`

```
Uses: shadcn/ui Dialog
Animation: Framer scale 0.96 → 1 + opacity
Triggered by: "Submit Inquiry" in CartDrawer footer

Fields (React Hook Form + Zod):
  - name: string (required)
  - company: string (required)
  - email: string, email format (required)
  - phone: string (required)
  - message: string (optional)
  - cartSummary: auto-generated from store items (hidden)

On submit:
  1. Format cart as readable string
  2. Open mailto:corpift@outlook.com with subject + body
  3. Show success state (checkmark + thank you message)
  4. clearCart() → closeModal() → closeCart() after 2s delay

Input focus ring: ring-accent (gold outline on focus)
```

---

## 8. Page Transitions

```tsx
// components/layout/PageTransition.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Used in app/layout.tsx wrapping {children}
```

---

## 9. Product Data — `data/products.ts`

```ts
export type Category =
  | "sustainable"
  | "clients"
  | "employees"
  | "festival"
  | "handicraft";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number; // INR starting price
  image: string; // path relative to /public
  description?: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Recycled Handmade Notebook",
    category: "sustainable",
    price: 99,
    featured: true,
  },
  {
    id: 2,
    name: "Sustainable Stationery Hamper",
    category: "sustainable",
    price: 299,
    featured: true,
  },
  {
    id: 3,
    name: "Aromatherapy Hamper",
    category: "clients",
    price: 599,
    featured: true,
  },
  {
    id: 4,
    name: "Wooden Table Lamp",
    category: "handicraft",
    price: 599,
    featured: true,
  },
  {
    id: 5,
    name: "Premium Diwali Hamper",
    category: "festival",
    price: 899,
    featured: true,
  },
  {
    id: 6,
    name: "Executive Welcome Kit",
    category: "employees",
    price: 1299,
    featured: true,
  },
  { id: 7, name: "Handcrafted Diary Set", category: "clients", price: 449 },
  { id: 8, name: "Artisan Tea Hamper", category: "clients", price: 699 },
  { id: 9, name: "Custom Branded Pen Set", category: "employees", price: 199 },
  { id: 10, name: "Holi Gift Hamper", category: "festival", price: 499 },
  {
    id: 11,
    name: "Bamboo Desk Organiser",
    category: "sustainable",
    price: 349,
  },
  {
    id: 12,
    name: "Jaipur Block Print Tote",
    category: "handicraft",
    price: 249,
  },
];

export const CATEGORIES = [
  { slug: "clients", label: "For Clients", count: 3 },
  { slug: "employees", label: "For Employees", count: 2 },
  { slug: "sustainable", label: "Sustainable", count: 3 },
  { slug: "festival", label: "Festival", count: 2 },
  { slug: "handicraft", label: "Handicraft", count: 2 },
];
```

**To add a product:** add an entry to `PRODUCTS`. Image goes in `/public/images/`.

---

## 10. Homepage Sections

Build in this order in `app/page.tsx`. Each is its own component in `components/home/`:

| Component          | Description                                                            |
| ------------------ | ---------------------------------------------------------------------- |
| `Hero`             | Full-viewport, Cormorant headline with italic word, 2 CTAs, gold shape |
| `Marquee`          | Dark ticker strip, category names + diamond separators, CSS scroll     |
| `AboutTeaser`      | 2-col: stats block left, brand copy + link to /about right             |
| `CategoryGrid`     | 5 cards asymmetric grid, hover reveals description                     |
| `FeaturedProducts` | 6 cards (featured: true), add-to-inquiry, staggered reveal             |
| `ServicesStrip`    | Dark bg, 3 services with 01/02/03 large number labels                  |
| `Testimonials`     | 2 reviews, oversized quotation marks, name + city                      |
| `CtaBanner`        | Dark full-width, large italic headline, phone + CTA                    |

---

## 11. Animations Reference

| Element            | Implementation                                                 |
| ------------------ | -------------------------------------------------------------- |
| Page transition    | `AnimatePresence` + `opacity/y` in `PageTransition`            |
| Scroll reveals     | `whileInView` in `RevealOnScroll`, `viewport={{ once: true }}` |
| Stagger children   | `variants` with `staggerChildren: 0.08` on parent motion.div   |
| Cart drawer        | `AnimatePresence` + `x: '100%'` → `x: 0`                       |
| Cart overlay       | `AnimatePresence` + `opacity: 0` → `opacity: 0.4`              |
| Product card hover | `whileHover={{ y: -4 }}` on motion.div                         |
| Cart badge appear  | `AnimatePresence` + `scale: 0` → `scale: 1`                    |
| Modal open         | shadcn Dialog + `scale: 0.96` → `scale: 1` override            |
| Marquee            | Pure CSS `@keyframes scroll` — infinite, pauses on hover       |
| Button arrow       | `group-hover:translate-x-1` Tailwind on Lucide `<ArrowRight>`  |
| Nav underline      | `after:w-0 hover:after:w-full after:bg-accent` pseudo-element  |

**Standard easing everywhere:** `[0.25, 0.46, 0.45, 0.94]`

---

## 12. Header Rules

```
Position: fixed, z-50, full-width
On scroll (scrollY > 20): backdrop-blur-xl bg-bg/80 shadow-[0_1px_0_theme(colors.border)]
Layout: Logo left | Nav links center | Cart icon + CTA right

Cart icon: <ShoppingBag size={20}> from lucide-react
Cart badge: AnimatePresence scale animation, bg-accent, absolute top-right
Active link: check with usePathname(), apply text-accent + after:w-full

Mobile (<768px):
  - Hide center nav
  - Show hamburger (3 lines → X animation)
  - Full-width dropdown menu with same links
```

---

## 13. Rules & Conventions

**DO:**

- Add `'use client'` only to components using hooks, Framer Motion, or browser APIs
- Keep all product data in `data/products.ts` — never hardcode in JSX
- Use Tailwind classes for all styling — no inline styles except Framer `style` prop
- Use `cn()` from `lib/utils.ts` for all conditional class merging
- Use `next/image` for every image with `width`, `height`, `alt`, and `loading="lazy"`
- Use `next/link` for all internal navigation — never raw `<a href>`
- Access cart only via `useCartStore()` — never prop-drill cart state
- Use `RevealOnScroll` wrapper for all scroll-triggered animations

**DON'T:**

- Don't manage cart in component state — Zustand only
- Don't use `<img>` — always `next/image`
- Don't use `<a>` for internal links — always `next/link`
- Don't add payment or checkout — inquiry system only
- Don't use purple, blue, or green accents — gold (`#B5923E`) only
- Don't use Inter, Roboto, or system fonts for headings — Cormorant Garamond only
- Don't put Lorem Ipsum in any page component — use realistic copy
- Don't use `!important`

---

## 14. Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev          # → http://localhost:3000

# Type check
npx tsc --noEmit

# Build for production (static export)
npm run build

# Add a shadcn component
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add label
```

---

## 15. Dependencies — `package.json`

```json
{
  "dependencies": {
    "next": "14.2.5",
    "react": "^18",
    "react-dom": "^18",
    "framer-motion": "^11",
    "zustand": "^4",
    "react-hook-form": "^7",
    "zod": "^3",
    "@hookform/resolvers": "^3",
    "lucide-react": "^0.400.0",
    "clsx": "^2",
    "tailwind-merge": "^2"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "tailwindcss": "^3",
    "autoprefixer": "^10",
    "postcss": "^8"
  }
}
```

---

## 16. Config Files

### `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // static export — no server needed
  images: {
    unoptimized: true, // required for static export
  },
  trailingSlash: true,
};
module.exports = nextConfig;
```

### `lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `Starting from Rs. ${price.toLocaleString("en-IN")}`;
}
```

---

## 17. Copy & Tone

**Tagline:** "Where tradition meets modernity"
**Sub-tagline:** "Premium handcrafted corporate gifts from Jaipur"

**Voice:** Confident, warm, artisanal. Not startup-casual. Not overly formal.
Short sentences. No jargon.

**Avoid:** "synergy", "solutions", "leverage", "world-class", "cutting-edge"
**Use:** "crafted", "curated", "thoughtful", "distinctive", "lasting"

---

## 18. Common Tasks

| Task                   | How                                                              |
| ---------------------- | ---------------------------------------------------------------- |
| Add a product          | Add entry to `PRODUCTS` in `data/products.ts`                    |
| Change accent color    | Update `accent` in `tailwind.config.js` colors object            |
| Update contact info    | Search `+91 9057370100` across all files and replace             |
| Add a new page         | Create `app/[slug]/page.tsx`, add route to Header nav array      |
| Change inquiry email   | Search `corpift@outlook.com` in `InquiryModal.tsx`               |
| Add a shadcn component | Run `npx shadcn-ui@latest add [name]`                            |
| Disable noise texture  | Comment out the grain overlay div in `app/layout.tsx`            |
| Make a section dark    | `<section className="bg-bg-dark text-bg">` + update child colors |
| Feature a product      | Set `featured: true` on product in `data/products.ts`            |
