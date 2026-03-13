import { sanityClient } from '@/lib/sanity';

export type Category =
  | 'sustainable'
  | 'clients'
  | 'employees'
  | 'festival'
  | 'handicraft';

export interface Product {
  id: string;
  name: string;
  categories: Category[];
  price: number;
  image: string;
  description?: string;
  featured?: boolean;
  serialNumber?: number;
  gallery?: string[];
}

const productFields = `
  "id": _id,
  name,
  categories,
  price,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  description,
  featured,
  serialNumber
`;

export async function getProducts(): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product"] | order(serialNumber asc) { ${productFields} }`
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && featured == true] | order(serialNumber asc) { ${productFields} }`
  );
}

export const CATEGORIES = [
  { slug: 'clients',     label: 'For Clients',   description: 'Thoughtfully curated gifts for your most valued clients — premium, memorable, and designed to strengthen lasting business relationships.' },
  { slug: 'employees',   label: 'For Employees',  description: 'Celebrate your team with gifts that recognise effort and build culture — from welcome kits to milestone rewards and everyday appreciation.' },
  { slug: 'sustainable', label: 'Sustainable',    description: 'Eco-conscious gifts sourced from ethical suppliers — recycled materials, minimal packaging, and verified sustainable practices throughout.' },
  { slug: 'festival',    label: 'Festival',       description: 'Bespoke festive hampers for Diwali, Holi, Eid, Christmas, and every celebration — crafted to honour each occasion with authenticity.' },
  { slug: 'handicraft',  label: 'Handicraft',     description: "Artisanal pieces sourced directly from Jaipur's finest craftspeople — unique works of cultural heritage that no mass-produced gift can replicate." },
];
