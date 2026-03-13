import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';
import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import ProductCard from '@/components/shop/ProductCard';

export default function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products;

  return (
    <section className="bg-bg py-28 md:py-36">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <SectionLabel className="block mb-4">Our Products</SectionLabel>
            <h2 className="font-display text-heading-lg text-text">
              Thoughtfully curated<br />for every occasion
            </h2>
          </div>
          <Link href="/shop" className="group btn-ghost flex items-center gap-2 w-fit self-start md:self-auto">
            View All Products
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <RevealOnScroll key={product.id} delay={i * 0.08}>
              <ProductCard product={product} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
