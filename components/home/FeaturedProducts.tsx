import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';
import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import ProductCard from '@/components/shop/ProductCard';
import Accented from '@/components/shared/Accented';

interface FeaturedProductsProps {
  featured: Product[];
  all: Product[];
  heading: string;
}

export default function FeaturedProducts({ featured, all, heading }: FeaturedProductsProps) {
  // Always show complete rows of 3 (between 3 and 9 cards), topping up with other products if needed
  const count = Math.min(9, Math.max(3, Math.ceil(featured.length / 3) * 3));
  const ids = new Set(featured.map((p) => p.id));
  const products = [...featured, ...all.filter((p) => !ids.has(p.id))].slice(0, count);

  return (
    <section className="bg-bg py-24 md:py-36">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-16 gap-6">
          <div>
            <SectionLabel className="block mb-5">Featured Gifts</SectionLabel>
            <h2 className="font-display text-[clamp(36px,4.4vw,60px)] text-text leading-[1.02] max-w-3xl">
              <Accented text={heading} />
            </h2>
          </div>
          <Link href="/shop" className="group btn-outline inline-flex items-center gap-2 w-fit self-start md:self-auto">
            View All Products
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => (
            <RevealOnScroll key={product.id} delay={(i % 3) * 0.1} className="h-full">
              <ProductCard product={product} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
