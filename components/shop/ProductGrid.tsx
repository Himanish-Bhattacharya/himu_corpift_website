'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { type Product } from '@/data/products';
import ProductCard from './ProductCard';
import RevealOnScroll from '@/components/shared/RevealOnScroll';

interface ProductGridProps {
  products: Product[];
  filterKey: string;   // changes only on filter switch — triggers full re-animate
  newFromIndex: number; // products before this index are already visible, skip animation
}

export default function ProductGrid({ products, filterKey, newFromIndex }: ProductGridProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={filterKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {products.map((product, i) =>
          i < newFromIndex ? (
            // Already rendered — no re-animation
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ) : (
            // Newly loaded batch — animate in with stagger relative to batch start
            <RevealOnScroll
              key={product.id}
              delay={Math.min((i - newFromIndex) * 0.07, 0.35)}
              className="h-full"
            >
              <ProductCard product={product} />
            </RevealOnScroll>
          )
        )}
      </motion.div>
    </AnimatePresence>
  );
}
