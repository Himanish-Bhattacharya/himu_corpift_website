'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';

const SLIDES = [
  { src: '/images/hero/slide-1.jpg', alt: 'Premium corporate gift hamper' },
  { src: '/images/hero/slide-2.jpg', alt: 'Handcrafted Jaipur gifts' },
  { src: '/images/hero/slide-3.jpg', alt: 'Festive gift collection' },
  { src: '/images/hero/slide-4.jpg', alt: 'Artisan corporate gifts' },
];

const INTERVAL = 4000;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="relative min-h-screen bg-bg overflow-hidden">

      {/* ── CAROUSEL ──
           Mobile:   absolute inset-0 (fills whole viewport behind text)
           Desktop:  absolute right panel covering left-[45%] to right edge  */}
      <div
        className="absolute inset-0 md:inset-y-0 md:left-[45%] md:right-0 md:left-auto"
        style={{ left: 0 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* override left:0 on desktop via inline style trick — use a wrapper instead */}
      </div>

      {/* Cleaner: separate absolute divs per breakpoint via a single responsive div */}
      <div
        className="absolute inset-0 md:left-[45%]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slides */}
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[current].src}
              alt={SLIDES[current].alt}
              fill
              className="object-cover"
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Mobile: strong bottom-up gradient so text is readable */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-bg-dark/95 via-bg-dark/55 to-bg-dark/5 z-10 pointer-events-none" />

        {/* Desktop: subtle left-edge blend into text panel */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />

        {/* Slide counter — top right, desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="hidden md:block absolute top-6 right-6 z-20"
        >
          <span className="font-body text-[12px] text-white/70 tracking-[0.14em]">
            {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Dot indicators
            Mobile: top-left (above text overlay)
            Desktop: bottom-left */}
        <div className="hidden md:flex absolute md:bottom-7 md:left-8 z-20 items-center gap-[10px]">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setPaused(true); }}
              aria-label={`Go to slide ${i + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  i === current
                    ? 'w-7 h-[3px] bg-white'
                    : 'w-[6px] h-[6px] bg-white/40 hover:bg-white/70'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── TEXT PANEL ──
           Mobile:   sits in normal flow, justify-end pushes text to bottom, z-20 over gradient
           Desktop:  left 45% of the section, light background, centered  */}
      <div className="relative z-20 flex flex-col justify-end md:justify-center md:w-[45%] min-h-screen pl-5 md:pl-8 lg:pl-12 xl:pl-20 pr-6 md:pr-10 lg:pr-16 pb-16 pt-32 md:pt-0 md:pb-0">

        <motion.div variants={container} initial="hidden" animate="show">

          <motion.div variants={item} className="mb-6">
            <SectionLabel>Welcome to Corpift</SectionLabel>
          </motion.div>

          {/* Mobile: white text over dark image. Desktop: dark text on light bg */}
          <h1 className="font-display font-light text-display-lg text-bg md:text-text leading-[0.95] -tracking-[0.02em] mb-8">
            <motion.span variants={item} className="block">Premium</motion.span>
            <motion.span variants={item} className="block">
              <em className="text-accent not-italic">Corporate</em> Gifts
            </motion.span>
            <motion.span variants={item} className="block">From Jaipur.</motion.span>
          </h1>

          <motion.p
            variants={item}
            className="max-w-md text-[16px] text-bg/75 md:text-muted font-body leading-relaxed mb-10"
          >
            Handcrafted, eco-friendly gift hampers curated for discerning businesses.
            From bulk corporate orders to bespoke festival collections — we make every gifting moment memorable.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-start gap-4">

            {/* Primary CTA: accent/gold on mobile (visible over dark image), dark on desktop */}
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] uppercase font-body py-3 px-8 rounded-sm transition-all duration-300 bg-accent text-white hover:bg-accent-dark md:bg-text md:text-bg md:hover:bg-accent md:-translate-y-0 hover:-translate-y-px"
            >
              Explore Gifts
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            {/* Ghost CTA: white border/text on mobile, standard on desktop */}
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] uppercase font-body border-b pb-px transition-colors duration-200 text-bg border-bg md:text-text md:border-text hover:text-accent hover:border-accent"
            >
              Our Story
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

          </motion.div>
        </motion.div>

        {/* Scroll indicator — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="hidden md:flex absolute bottom-10 left-5 md:left-8 lg:left-12 xl:left-20 items-center gap-3"
        >
          <div className="w-px h-12 bg-border" />
          <span className="text-[11px] font-body text-light tracking-[0.1em] uppercase">Scroll to explore</span>
        </motion.div>

      </div>

    </section>
  );
}
