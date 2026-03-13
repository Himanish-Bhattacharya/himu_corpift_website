'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { type Product } from '@/data/products';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const [added, setAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [product.image, ...(product.gallery || [])].filter(Boolean) as string[];

  const handleAdd = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setTimeout(() => openCart(), 300);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group h-full flex flex-col bg-bg-card rounded-sm overflow-hidden border border-border hover:shadow-[0_12px_40px_rgba(27,25,22,0.10)] transition-shadow duration-500"
    >
      {/* Image container */}
      <div className="relative aspect-square bg-bg-alt overflow-hidden group/image">
        {allImages.length > 0 && (
          <Image
            src={allImages[currentImageIndex]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
        )}

        {/* Carousel arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-bg-dark rounded-full p-1 opacity-0 group-hover/image:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-bg-dark rounded-full p-1 opacity-0 group-hover/image:opacity-100 transition-opacity z-10"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
              {allImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Hover overlay */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          >
            <button
              onClick={handleAdd}
              className={`btn-accent flex items-center gap-2 px-6 py-3 text-[12px] transition-all relative z-20 ${
                added ? 'bg-green-700' : ''
              }`}
            >
              <ShoppingBag size={14} />
              {added ? 'Added!' : 'Add to Inquiry'}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Card body */}
      <div className="flex-1 flex flex-col p-5">
        <h3 className="font-display text-heading-sm text-text mb-3 leading-tight line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-[13px] text-muted font-body leading-relaxed mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="font-display text-accent text-xl mt-auto pt-2">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.div>
  );
}
