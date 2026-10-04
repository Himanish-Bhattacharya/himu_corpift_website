'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronLeft, ChevronRight, Check, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { type Product } from '@/data/products';
import { cn, displayName, formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const [added, setAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const name = displayName(product.name);
  // CMS names often pack several variants after " | " — show only the first part on the card
  const title = name.split(' | ')[0];
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
      className="group h-full flex flex-col bg-bg-card rounded-sm overflow-hidden border border-border hover:shadow-[0_16px_48px_rgba(20,37,30,0.12)] transition-shadow duration-500"
    >
      {/* Image */}
      <div className="relative aspect-square bg-bg-alt overflow-hidden">
        {allImages.length > 0 && (
          <Image
            src={allImages[currentImageIndex]}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
        )}

        {/* Desktop hover overlay */}
        <div className="absolute inset-0 hidden md:flex items-end justify-center pb-8 bg-gradient-to-t from-bg-dark/60 via-bg-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAdd}
            className="btn-light flex items-center gap-2 px-6 py-3 text-[12px] translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            {added ? <Check size={14} /> : <ShoppingBag size={14} />}
            {added ? 'Added' : 'Add to Inquiry'}
          </button>
        </div>

        {/* Gallery controls */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-bg-card/85 hover:bg-bg-card text-text rounded-full p-2 md:p-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-bg-card/85 hover:bg-bg-card text-text rounded-full p-2 md:p-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute top-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {allImages.map((_, idx) => (
                <span
                  key={idx}
                  className={cn(
                    'h-1 rounded-full transition-all',
                    idx === currentImageIndex ? 'w-4 bg-bg-card' : 'w-1.5 bg-bg-card/60'
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col p-5">
        <h3 className="font-display text-[22px] md:text-[24px] text-text mb-2 leading-[1.15] line-clamp-2">
          {title}
        </h3>
        {product.description && (
          <p className="text-[13px] text-muted font-body leading-relaxed mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-auto pt-3 flex items-center justify-between gap-3">
          <p className="font-body text-[13px] text-muted">
            <span className="font-display text-[22px] text-accent-dark">{formatPrice(product.price).replace('Starting from ', '')}</span>
            <span className="ml-1.5 text-[11px] uppercase tracking-[0.1em] text-light">onwards</span>
          </p>
          {/* Always-visible add button (touch devices have no hover) */}
          <button
            onClick={handleAdd}
            aria-label={`Add ${name} to inquiry`}
            className={cn(
              'md:hidden flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors',
              added ? 'bg-accent text-white' : 'bg-bg-dark text-bg'
            )}
          >
            {added ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
