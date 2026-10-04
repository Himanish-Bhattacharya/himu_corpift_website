'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Product, Category } from '@/data/products';
import { CATEGORIES } from '@/data/products';
import FilterBar from '@/components/shop/FilterBar';
import ProductGrid from '@/components/shop/ProductGrid';
import SectionLabel from '@/components/shared/SectionLabel';

const PAGE_SIZE = 24;

export default function ShopPageClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState('all');

  // Honour /shop?category=… links (e.g. from the homepage category cards)
  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get('category');
    if (cat && CATEGORIES.some((c) => c.slug === cat)) setActiveCategory(cat);
  }, []);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [newFromIndex, setNewFromIndex] = useState(0);

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.categories?.includes(activeCategory as Category));

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
    setNewFromIndex(0);
  }

  function handleLoadMore() {
    setNewFromIndex(visibleCount);
    setVisibleCount((c) => c + PAGE_SIZE);
  }

  return (
    <>
      {/* Page hero */}
      <section className="bg-bg-alt pt-[72px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-20">
          <nav className="flex items-center gap-2 text-[12px] font-body text-muted mb-6">
            <Link href="/" className="hover:text-text transition-colors">Home</Link>
            <ChevronRight size={13} className="text-light" />
            <span className="text-text">Shop</span>
          </nav>

          <SectionLabel className="block mb-4">Our Collection</SectionLabel>
          <h1 className="font-display text-display-sm text-text">
            Every Gift, Thoughtfully Made
          </h1>
          <p className="text-[15px] text-muted font-body mt-4 max-w-lg leading-relaxed">
            Explore our full range of handcrafted corporate gift hampers — from sustainable stationery
            to artisanal festive collections.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <FilterBar
        categories={CATEGORIES.filter((c) => products.some((p) => p.categories?.includes(c.slug as Category)))}
        active={activeCategory}
        onChange={handleCategoryChange}
      />

      {/* Product grid */}
      <section className="bg-bg py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[13px] font-body text-muted">
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {filtered.length > 0 ? (
            <>
              <ProductGrid products={visible} filterKey={activeCategory} newFromIndex={newFromIndex} />

              {hasMore && (
                <div className="mt-16 flex flex-col items-center gap-3">
                  <button onClick={handleLoadMore} className="btn-outline">
                    Load More
                  </button>
                  <p className="text-[12px] font-body text-muted">
                    Showing {visible.length} of {filtered.length}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <p className="font-display text-heading-md text-muted">No products found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
