import type { Metadata } from 'next';
import { getProducts } from '@/data/products';
import ShopPageClient from '@/components/shop/ShopPageClient';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse handcrafted, sustainable and festive corporate gifts. Add items to an inquiry for a bulk quote.',
};

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopPageClient products={products} />;
}
