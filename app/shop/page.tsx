import { getProducts } from '@/data/products';
import ShopPageClient from '@/components/shop/ShopPageClient';

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopPageClient products={products} />;
}
