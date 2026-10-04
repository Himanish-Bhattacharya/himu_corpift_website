'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CATEGORIES, type Category, type Product } from '@/data/products';
import SectionLabel from '@/components/shared/SectionLabel';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import type { CmsImage } from '@/data/homepage';
import Accented from '@/components/shared/Accented';

interface CategoryGridProps {
  products: Product[];
  heading: string;
  text: string;
  images: Record<string, CmsImage>;
}

export default function CategoryGrid({ products, heading, text, images }: CategoryGridProps) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // Only show categories that actually have products
  const categories = CATEGORIES.map((cat) => ({
    ...cat,
    count: products.filter((p) => p.categories?.includes(cat.slug as Category)).length,
  })).filter((cat) => cat.count > 0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scroll the cards horizontally
      mm.add('(min-width: 1024px)', () => {
        const el = track.current;
        if (!el) return;
        const distance = () => el.scrollWidth - window.innerWidth;
        if (distance() <= 0) return;

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Each card's image drifts slightly against the scroll direction
        gsap.utils.toArray<HTMLElement>('[data-cat-img]').forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [categories.length] }
  );

  const intro = (
    <>
      <SectionLabel light className="block mb-5">Browse by Category</SectionLabel>
            <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-[1] mb-6">
              <Accented text={heading} accentClass="text-accent-light" />
            </h2>
            <p className="text-[15px] font-body text-muted-dark leading-relaxed max-w-sm mb-10">
              {text}
            </p>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 w-fit text-[13px] font-medium tracking-[0.06em] uppercase font-body text-bg border-b border-bg/50 pb-1 hover:text-accent-light hover:border-accent-light transition-colors"
            >
              View all products
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
    </>
  );

  return (
    <section ref={root} className="relative bg-bg-dark text-bg overflow-hidden">
      <div className="lg:h-screen flex flex-col justify-center py-24 lg:py-0">
        {/* Mobile/tablet: intro sits above a swipeable row */}
        <div className="lg:hidden px-5 md:px-8 mb-12">{intro}</div>

        <div
          ref={track}
          className="flex gap-4 md:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-px-5 md:scroll-px-8 scrollbar-hide px-5 md:px-8 lg:px-12 lg:w-max"
        >
          {/* Desktop: intro is the first panel of the horizontal track */}
          <div className="hidden lg:flex shrink-0 w-[34vw] max-w-[520px] flex-col justify-center pr-12">
            {intro}
            <p className="flex items-center gap-3 mt-16 text-[11px] tracking-[0.18em] uppercase font-body text-muted-dark/70">
              <span className="block w-8 h-px bg-muted-dark/50" /> Keep scrolling
            </p>
          </div>

          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group snap-start shrink-0 relative w-[78vw] sm:w-[52vw] lg:w-[30vw] max-w-[460px] h-[480px] lg:h-[72vh] lg:max-h-[640px] rounded-sm overflow-hidden bg-bg-dark-2"
            >
              <div data-cat-img className="absolute inset-0 -left-[8%] w-[116%]">
                {images[cat.slug] && (
                  <Image
                    src={images[cat.slug].src}
                    alt={images[cat.slug].alt}
                    fill
                    sizes="(max-width: 1024px) 80vw, 30vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    style={images[cat.slug].position ? { objectPosition: images[cat.slug].position } : undefined}
                    loading="lazy"
                  />
                )}
              </div>

              {/* Scrim keeps text readable on any photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-bg-dark/10" />

              <div className="relative h-full flex flex-col justify-between p-7 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="font-display text-[56px] md:text-[72px] leading-none text-outline">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="w-11 h-11 rounded-full border border-bg/40 flex items-center justify-center text-bg group-hover:bg-bg group-hover:text-text transition-colors duration-300">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                <div>
                  <p className="text-[11px] font-medium tracking-[0.16em] uppercase font-body text-accent-light mb-3">
                    {cat.count} {cat.count === 1 ? 'product' : 'products'}
                  </p>
                  <h3 className="font-display text-[clamp(32px,3vw,44px)] leading-[1.05] mb-3">{cat.label}</h3>
                  <p className="text-[14px] font-body text-bg/75 leading-relaxed line-clamp-3 max-w-sm">
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}

          {/* Trailing spacer so the last card can clear the edge */}
          <div className="shrink-0 w-1 lg:w-[6vw]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
