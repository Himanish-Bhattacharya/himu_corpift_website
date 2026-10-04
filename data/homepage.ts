import { sanityClient } from '@/lib/sanity';
import { productFields, type Product } from '@/data/products';

export interface CmsImage {
  src: string;
  alt: string;
  /** CSS object-position derived from the hotspot set in Sanity */
  position?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  city?: string;
}

export interface HomepageContent {
  heroSlides: CmsImage[];
  heroEyebrow: string;
  heroHeadline: string;
  heroText: string;
  marqueeItems: string[];
  storyImage: CmsImage;
  storyHeading: string;
  storyParagraphs: string[];
  storyStats: Stat[];
  storyCaption: string;
  storyCaptionText: string;
  categoriesHeading: string;
  categoriesText: string;
  categoryImages: Record<string, CmsImage>;
  featuredHeading: string;
  featuredProducts: Product[];
  scheduledHeading: string;
  scheduledText: string;
  scheduledPrice: number;
  servicesHeading: string;
  services: Service[];
  testimonials: Testimonial[];
  ctaImage: CmsImage;
  ctaHeading: string;
  ctaText: string;
}

// What the site shows when a field is left empty in Sanity.
// Headings: *word* = gold italics, newline = line break.
export const HOMEPAGE_DEFAULTS: HomepageContent = {
  heroSlides: [
    { src: '/images/hero/slide-3.jpg', alt: 'Curated corporate gift boxes with watch, diary and accessories' },
    { src: '/images/hero/slide-4.jpg', alt: 'Wrapped corporate gift and leather diary on a boardroom table' },
    { src: '/images/hero/slide-1.jpg', alt: 'Branded gift boxes in soft sage and ivory' },
  ],
  heroEyebrow: 'Corporate gifting · Since 2022',
  heroHeadline: 'Corporate gifts,\n*crafted* in Jaipur.',
  heroText: 'Handcrafted, sustainable gift hampers for teams and clients — curated, branded and delivered across India.',
  marqueeItems: [
    'Handcrafted in Jaipur',
    'Custom branding',
    'Bulk & corporate orders',
    'Sustainable materials',
    'Festive hampers',
    'Pan-India delivery',
  ],
  storyImage: { src: '/images/hero/slide-2.jpg', alt: 'Wrapped gift with brass details beside a green notebook and pen' },
  storyHeading: 'Gifting should feel *personal*, not transactional.',
  storyParagraphs: [
    "Born in Jaipur — India's city of craftsmanship — Corpift partners with local artisans and sustainable suppliers to build hampers that carry the soul of Rajasthan.",
    "Every piece is thoughtfully chosen, beautifully packaged and branded for you — then delivered with care, whether it's ten gifts or ten thousand.",
  ],
  storyStats: [
    { value: '2022', label: 'Founded' },
    { value: '500+', label: 'Happy Clients' },
    { value: '50+', label: 'Gift Categories' },
  ],
  storyCaption: 'Made by hand.',
  storyCaptionText: 'Sourced from artisans across Rajasthan.',
  categoriesHeading: 'Something for *every* occasion',
  categoriesText:
    'From onboarding kits to festive hampers — explore collections built for the people who matter to your business.',
  categoryImages: {
    clients: { src: '/images/categories/client_category.jpeg', alt: '' },
    employees: { src: '/images/categories/employee_category.jpeg', alt: '' },
    sustainable: { src: '/images/categories/sustainable_category.jpeg', alt: '' },
    festival: { src: '/images/categories/festival_category.jpeg', alt: '' },
    handicraft: { src: '/images/categories/handicraft_category.jpeg', alt: '' },
  },
  featuredHeading: 'Thoughtfully curated,\n*beautifully* delivered',
  featuredProducts: [],
  scheduledHeading: 'Scheduled *Gifting*',
  scheduledText:
    'Never miss a birthday, anniversary or celebration again. Share your list once — we handle every gift, every time.',
  scheduledPrice: 15,
  servicesHeading: 'The craft *behind* every gift',
  services: [
    {
      title: 'Customised Gift Hampers',
      description: 'Bespoke hampers designed around your brand, budget and recipients — from concept to doorstep.',
    },
    {
      title: 'Handcrafted Gifts',
      description: "Artisanal pieces sourced directly from Jaipur's finest craftspeople, carrying culture in every detail.",
    },
    {
      title: 'Quality, Checked by Hand',
      description: 'Every item individually reviewed for quality, sustainability and that elusive element of delight.',
    },
  ],
  testimonials: [
    {
      quote:
        'Lovely experience with Corpift. Products quality is super. On time delivery. Will definitely order again for our next corporate event.',
      name: 'Abhilash Joshi',
      city: 'Mumbai',
    },
    {
      quote:
        'Amazing diaries. Good quality pages and designs are also great. Feels like a Jackpot! Our entire team was thrilled with the gifting.',
      name: 'Rupal Srivastav',
      city: 'Mumbai',
    },
  ],
  ctaImage: { src: '/images/hero/slide-4.jpg', alt: '' },
  ctaHeading: 'Ready to elevate\nyour *gifting?*',
  ctaText: "Tell us about your team, your clients and your budget — we'll come back with a curated proposal.",
};

// ── Sanity → site mapping ─────────────────────────────────

interface RawImage {
  url?: string;
  alt?: string;
  hotspot?: { x: number; y: number };
}

const imageFields = `{ "url": asset->url, alt, hotspot }`;

function toImage(raw: RawImage | null | undefined, width: number): CmsImage | undefined {
  if (!raw?.url) return undefined;
  return {
    // Ask Sanity's CDN for a right-sized, modern-format version instead of the original upload
    src: `${raw.url}?w=${width}&auto=format&q=80`,
    alt: raw.alt ?? '',
    position: raw.hotspot ? `${Math.round(raw.hotspot.x * 100)}% ${Math.round(raw.hotspot.y * 100)}%` : undefined,
  };
}

const text = (value: string | null | undefined, fallback: string) => (value && value.trim() ? value : fallback);
const list = <T>(value: (T | null)[] | null | undefined, fallback: T[]) => {
  const clean = (value ?? []).filter((v): v is T => Boolean(v));
  return clean.length > 0 ? clean : fallback;
};

export async function getHomepage(): Promise<HomepageContent> {
  const d = HOMEPAGE_DEFAULTS;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc: any = await sanityClient.fetch(`*[_id == "homepage"][0]{
    heroSlides[]${imageFields}, heroEyebrow, heroHeadline, heroText,
    marqueeItems,
    storyImage${imageFields}, storyHeading, storyParagraphs, storyStats[]{ value, label }, storyCaption, storyCaptionText,
    categoriesHeading, categoriesText,
    categoryImages{
      clients${imageFields}, employees${imageFields}, sustainable${imageFields}, festival${imageFields}, handicraft${imageFields}
    },
    featuredHeading, featuredProducts[]->{ ${productFields} },
    scheduledHeading, scheduledText, scheduledPrice,
    servicesHeading, services[]{ title, description },
    testimonials[]{ quote, name, city },
    ctaImage${imageFields}, ctaHeading, ctaText
  }`);

  if (!doc) return d;

  const categoryImages = { ...d.categoryImages };
  for (const slug of Object.keys(categoryImages)) {
    const img = toImage(doc.categoryImages?.[slug], 1000);
    if (img) categoryImages[slug] = img;
  }

  return {
    heroSlides: list(((doc.heroSlides ?? []) as RawImage[]).map((s) => toImage(s, 2400) ?? null), d.heroSlides),
    heroEyebrow: text(doc.heroEyebrow, d.heroEyebrow),
    heroHeadline: text(doc.heroHeadline, d.heroHeadline),
    heroText: text(doc.heroText, d.heroText),
    marqueeItems: list(doc.marqueeItems, d.marqueeItems),
    storyImage: toImage(doc.storyImage, 1200) ?? d.storyImage,
    storyHeading: text(doc.storyHeading, d.storyHeading),
    storyParagraphs: list(doc.storyParagraphs, d.storyParagraphs),
    storyStats: list(doc.storyStats, d.storyStats),
    storyCaption: text(doc.storyCaption, d.storyCaption),
    storyCaptionText: text(doc.storyCaptionText, d.storyCaptionText),
    categoriesHeading: text(doc.categoriesHeading, d.categoriesHeading),
    categoriesText: text(doc.categoriesText, d.categoriesText),
    categoryImages,
    featuredHeading: text(doc.featuredHeading, d.featuredHeading),
    // Drops references to products that have since been deleted
    featuredProducts: list<Product>(doc.featuredProducts, []),
    scheduledHeading: text(doc.scheduledHeading, d.scheduledHeading),
    scheduledText: text(doc.scheduledText, d.scheduledText),
    scheduledPrice: typeof doc.scheduledPrice === 'number' ? doc.scheduledPrice : d.scheduledPrice,
    servicesHeading: text(doc.servicesHeading, d.servicesHeading),
    services: list(doc.services, d.services),
    testimonials: list(doc.testimonials, d.testimonials),
    ctaImage: toImage(doc.ctaImage, 2000) ?? d.ctaImage,
    ctaHeading: text(doc.ctaHeading, d.ctaHeading),
    ctaText: text(doc.ctaText, d.ctaText),
  };
}
