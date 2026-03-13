'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, type Category, type Product } from '@/data/products';
import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';

import Image from 'next/image';

const BG_IMAGES: Record<string, string> = {
  clients:     '/images/categories/client_category.jpeg',
  employees:   '/images/categories/employee_category.jpeg',
  sustainable: '/images/categories/sustainable_category.jpeg',
  festival:    '/images/categories/festival_category.jpeg',
  handicraft:  '/images/categories/handicraft_category.jpeg',
};

export default function CategoryGrid({ products }: { products: Product[] }) {
  return (
    <section className="bg-bg py-28 md:py-36">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <RevealOnScroll className="mb-14">
          <SectionLabel className="block mb-4">Browse by Category</SectionLabel>
          <h2 className="font-display text-heading-lg text-text">
            Something for every occasion
          </h2>
        </RevealOnScroll>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {/* First 2 large cards */}
          {CATEGORIES.slice(0, 2).map((cat, i) => {
            const count = products.filter((p) => p.categories.includes(cat.slug as Category)).length;
            return (
              <RevealOnScroll key={cat.slug} delay={i * 0.08}>
                <CategoryCard cat={cat} count={count} large />
              </RevealOnScroll>
            );
          })}

          {/* Last 3 small cards */}
          {CATEGORIES.slice(2).map((cat, i) => {
            const count = products.filter((p) => p.categories.includes(cat.slug as Category)).length;
            return (
              <RevealOnScroll key={cat.slug} delay={(i + 2) * 0.08}>
                <CategoryCard cat={cat} count={count} />
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  cat,
  count,
  large = false,
}: {
  cat: (typeof CATEGORIES)[0];
  count: number;
  large?: boolean;
}) {
  const bgImage = BG_IMAGES[cat.slug];

  return (
    <Link href={`/shop?category=${cat.slug}`} className="block group">
      <motion.div
        whileHover="hover"
        className={`relative rounded-sm overflow-hidden bg-bg-alt ${large ? 'h-64 md:h-80' : 'h-48 md:h-64'}`}
      >
        {/* Background Image */}
        {bgImage && (
          <Image
            src={bgImage}
            alt={cat.label}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        )}
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Default state */}
        <motion.div
          variants={{ hover: { opacity: 0 } }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex flex-col justify-end p-7 z-10"
        >
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase font-body text-white mb-2">
            {count} {count === 1 ? 'product' : 'products'}
          </p>
          <h3 className="font-display text-heading-md text-white drop-shadow-md">
            {cat.label}
          </h3>
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          variants={{ hover: { opacity: 1 } }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-bg-dark/85 flex flex-col items-start justify-end p-7 z-20"
        >
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase font-body text-accent mb-2">
            {cat.label}
          </p>
          <p className="text-bg/90 font-body text-[14px] leading-relaxed mb-5">
            {cat.description}
          </p>
          <span className="group/inner btn-outline border-bg/30 text-bg hover:border-accent hover:text-accent flex items-center gap-2 text-[12px] py-2 px-5">
            Browse
            <ArrowRight size={13} className="group-hover/inner:translate-x-1 transition-transform duration-200" />
          </span>
        </motion.div>
      </motion.div>
    </Link>
  );
}
