import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'For Clients',   value: 'clients' },
          { title: 'For Employees', value: 'employees' },
          { title: 'Sustainable',   value: 'sustainable' },
          { title: 'Festival',      value: 'festival' },
          { title: 'Handicraft',    value: 'handicraft' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'price',
      title: 'Price (INR)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'serialNumber',
      title: 'Serial Number',
      type: 'number',
      description: 'Used to match product images (image 1.jpg = serial 1). Do not change.',
      readOnly: true,
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Additional images for the product (e.g., side views, close-ups).',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      price: 'price',
      serialNumber: 'serialNumber',
    },
    prepare({ title, media, price, serialNumber }) {
      return {
        title,
        media,
        subtitle: [serialNumber ? `#${serialNumber}` : '', price ? `Rs. ${price.toLocaleString('en-IN')}` : ''].filter(Boolean).join(' · '),
      };
    },
  },
});
