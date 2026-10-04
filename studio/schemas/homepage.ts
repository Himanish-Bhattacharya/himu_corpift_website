import { defineArrayMember, defineField, defineType } from 'sanity';

// Singleton: there is exactly one Homepage document (id "homepage").
// Every field is optional — anything left empty falls back to the website's built-in default.

const HEADING_HELP = 'Wrap a word in *asterisks* to show it in gold italics. Press Enter for a line break.';

const imageWithAlt = (name: string, title: string, description?: string, group?: string) =>
  defineField({
    name,
    title,
    type: 'image',
    description,
    group,
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'string',
        description: 'Short description of the photo, for screen readers and Google.',
      }),
    ],
  });

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'story', title: 'Our Story' },
    { name: 'categories', title: 'Categories' },
    { name: 'featured', title: 'Featured Gifts' },
    { name: 'scheduled', title: 'Scheduled Gifting' },
    { name: 'services', title: 'Services' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'cta', title: 'Closing Banner' },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────
    defineField({
      name: 'heroSlides',
      title: 'Carousel Photos',
      type: 'array',
      group: 'hero',
      description: 'Large landscape photos (at least 1600px wide). Drag to reorder. Text sits on the left, so keep the subject centre or right.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({ name: 'heroEyebrow', title: 'Small label above headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'text', rows: 2, group: 'hero', description: HEADING_HELP }),
    defineField({ name: 'heroText', title: 'Supporting text', type: 'text', rows: 3, group: 'hero' }),

    // ── Marquee ───────────────────────────────────────────
    defineField({
      name: 'marqueeItems',
      title: 'Scrolling strip (below hero)',
      type: 'array',
      group: 'hero',
      of: [defineArrayMember({ type: 'string' })],
    }),

    // ── Our Story ─────────────────────────────────────────
    imageWithAlt('storyImage', 'Photo', 'Portrait-shaped photo works best.', 'story'),
    defineField({ name: 'storyHeading', title: 'Heading', type: 'text', rows: 2, group: 'story', description: HEADING_HELP }),
    defineField({
      name: 'storyParagraphs',
      title: 'Paragraphs',
      type: 'array',
      group: 'story',
      of: [defineArrayMember({ type: 'text', rows: 4 })],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: 'storyStats',
      title: 'Stats',
      type: 'array',
      group: 'story',
      description: 'Up to 3. Numbers count up on scroll, e.g. "500+" or "2022".',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Number', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({ name: 'storyCaption', title: 'Caption card — title', type: 'string', group: 'story' }),
    defineField({ name: 'storyCaptionText', title: 'Caption card — text', type: 'string', group: 'story' }),

    // ── Categories ────────────────────────────────────────
    defineField({ name: 'categoriesHeading', title: 'Heading', type: 'text', rows: 2, group: 'categories', description: HEADING_HELP }),
    defineField({ name: 'categoriesText', title: 'Intro text', type: 'text', rows: 3, group: 'categories' }),
    defineField({
      name: 'categoryImages',
      title: 'Category photos',
      type: 'object',
      group: 'categories',
      description: 'Categories with no products are hidden automatically.',
      fields: [
        imageWithAlt('clients', 'For Clients'),
        imageWithAlt('employees', 'For Employees'),
        imageWithAlt('sustainable', 'Sustainable'),
        imageWithAlt('festival', 'Festival'),
        imageWithAlt('handicraft', 'Handicraft'),
      ],
    }),

    // ── Featured ──────────────────────────────────────────
    defineField({ name: 'featuredHeading', title: 'Heading', type: 'text', rows: 2, group: 'featured', description: HEADING_HELP }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured Gifts',
      type: 'array',
      group: 'featured',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'product' }] })],
      description:
        'Pick products and drag to reorder. Choose 3, 6 or 9 for full rows. ' +
        'If empty, products with "Featured on Homepage" switched on are shown instead.',
      validation: (Rule) => Rule.unique().max(9),
    }),

    // ── Scheduled gifting ─────────────────────────────────
    defineField({ name: 'scheduledHeading', title: 'Heading', type: 'text', rows: 2, group: 'scheduled', description: HEADING_HELP }),
    defineField({ name: 'scheduledText', title: 'Intro text', type: 'text', rows: 3, group: 'scheduled' }),
    defineField({ name: 'scheduledPrice', title: 'Starting price (₹ per person)', type: 'number', group: 'scheduled' }),

    // ── Services ──────────────────────────────────────────
    defineField({ name: 'servicesHeading', title: 'Heading', type: 'text', rows: 2, group: 'services', description: HEADING_HELP }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'services',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
      validation: (Rule) => Rule.max(5),
    }),

    // ── Testimonials ──────────────────────────────────────
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      group: 'testimonials',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'city', title: 'City / Company', type: 'string' }),
          ],
          preview: { select: { title: 'name', subtitle: 'quote' } },
        }),
      ],
    }),

    // ── Closing banner ────────────────────────────────────
    imageWithAlt('ctaImage', 'Background photo', 'Shown behind a dark overlay.', 'cta'),
    defineField({ name: 'ctaHeading', title: 'Heading', type: 'text', rows: 2, group: 'cta', description: HEADING_HELP }),
    defineField({ name: 'ctaText', title: 'Text', type: 'text', rows: 3, group: 'cta' }),
  ],
  // Pre-fill the text with what the website currently shows, so editors start from the live copy.
  // (Photos start empty — the website keeps its built-in photos until new ones are uploaded.)
  initialValue: {
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
    storyHeading: 'Gifting should feel *personal*, not transactional.',
    storyParagraphs: [
      "Born in Jaipur — India's city of craftsmanship — Corpift partners with local artisans and sustainable suppliers to build hampers that carry the soul of Rajasthan.",
      "Every piece is thoughtfully chosen, beautifully packaged and branded for you — then delivered with care, whether it's ten gifts or ten thousand.",
    ],
    storyStats: [
      { _key: 'founded', _type: 'object', value: '2022', label: 'Founded' },
      { _key: 'clients', _type: 'object', value: '500+', label: 'Happy Clients' },
      { _key: 'categories', _type: 'object', value: '50+', label: 'Gift Categories' },
    ],
    storyCaption: 'Made by hand.',
    storyCaptionText: 'Sourced from artisans across Rajasthan.',
    categoriesHeading: 'Something for *every* occasion',
    categoriesText:
      'From onboarding kits to festive hampers — explore collections built for the people who matter to your business.',
    featuredHeading: 'Thoughtfully curated,\n*beautifully* delivered',
    scheduledHeading: 'Scheduled *Gifting*',
    scheduledText:
      'Never miss a birthday, anniversary or celebration again. Share your list once — we handle every gift, every time.',
    scheduledPrice: 15,
    servicesHeading: 'The craft *behind* every gift',
    services: [
      {
        _key: 's1',
        _type: 'object',
        title: 'Customised Gift Hampers',
        description: 'Bespoke hampers designed around your brand, budget and recipients — from concept to doorstep.',
      },
      {
        _key: 's2',
        _type: 'object',
        title: 'Handcrafted Gifts',
        description: "Artisanal pieces sourced directly from Jaipur's finest craftspeople, carrying culture in every detail.",
      },
      {
        _key: 's3',
        _type: 'object',
        title: 'Quality, Checked by Hand',
        description: 'Every item individually reviewed for quality, sustainability and that elusive element of delight.',
      },
    ],
    testimonials: [
      {
        _key: 't1',
        _type: 'object',
        quote:
          'Lovely experience with Corpift. Products quality is super. On time delivery. Will definitely order again for our next corporate event.',
        name: 'Abhilash Joshi',
        city: 'Mumbai',
      },
      {
        _key: 't2',
        _type: 'object',
        quote:
          'Amazing diaries. Good quality pages and designs are also great. Feels like a Jackpot! Our entire team was thrilled with the gifting.',
        name: 'Rupal Srivastav',
        city: 'Mumbai',
      },
    ],
    ctaHeading: 'Ready to elevate\nyour *gifting?*',
    ctaText: "Tell us about your team, your clients and your budget — we'll come back with a curated proposal.",
  },
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
});
