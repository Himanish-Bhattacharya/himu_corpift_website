'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import type { CmsImage } from '@/data/homepage';
import { AccentedLine, headingLines } from '@/components/shared/Accented';

interface HeroProps {
  slides: CmsImage[];
  eyebrow: string;
  headline: string;
  text: string;
}

const INTERVAL = 6000;

export default function Hero({ slides: SLIDES, eyebrow, headline, text }: HeroProps) {
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (SLIDES.length < 2) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, [SLIDES.length]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Intro: headline lines rise out of their masks, then the supporting copy
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('[data-hero-line]', { yPercent: 110, duration: 1.3, stagger: 0.12, delay: 0.15 })
        .from('[data-hero-fade]', { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.1 }, '-=0.8')
        .from('[data-hero-rule]', { scaleX: 0, transformOrigin: 'left', duration: 1.2 }, '<');

      // Scroll: image drifts slower than the page, copy lifts and fades
      gsap.to('[data-hero-media]', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('[data-hero-content]', {
        yPercent: -18,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '70% top', scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative h-[100svh] min-h-[620px] bg-bg-dark overflow-hidden text-bg">
      {/* Slides */}
      <div data-hero-media className="absolute inset-0 -top-[8%] h-[116%]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src + i}
            className={cn(
              'absolute inset-0 transition-opacity duration-[1600ms] ease-in-out',
              i === current ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              className={cn(
                'object-cover transition-transform duration-[7000ms] ease-out',
                i === current ? 'scale-100' : 'scale-[1.08]'
              )}
              style={slide.position ? { objectPosition: slide.position } : undefined}
            />
          </div>
        ))}
      </div>

      {/* Scrims — guarantee legible text over any photo */}
      <div className="absolute inset-0 bg-bg-dark/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-bg-dark/10 md:bg-gradient-to-r md:from-bg-dark/90 md:via-bg-dark/45 md:to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg-dark/60 to-transparent" />

      {/* Copy */}
      <div
        data-hero-content
        className="relative z-10 h-full max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 flex flex-col justify-end pb-24 md:pb-28"
      >
        <p data-hero-fade className="flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] uppercase font-body text-accent-light mb-6 md:mb-8">
          <span data-hero-rule className="block w-10 h-px bg-accent-light" />
          {eyebrow}
        </p>

        <h1 className="font-display font-light text-[clamp(48px,8.4vw,124px)] leading-[0.98] tracking-[-0.02em] mb-8 md:mb-10">
          {headingLines(headline).map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block">
                <AccentedLine text={line} accentClass="text-accent-light" />
              </span>
            </span>
          ))}
        </h1>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p data-hero-fade className="max-w-md text-[15px] md:text-[16px] text-bg/80 font-body leading-relaxed mb-9">
              {text}
            </p>
            <div data-hero-fade className="flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link href="/shop" className="group btn-light inline-flex items-center gap-2">
                Explore Gifts
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] uppercase font-body text-bg border-b border-bg/60 pb-1 hover:text-accent-light hover:border-accent-light transition-colors"
              >
                Request a Quote
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Slide progress */}
          <div data-hero-fade className={cn('hidden items-center gap-4', SLIDES.length > 1 && 'md:flex')}>
            <span className="font-body text-[12px] tracking-[0.14em] text-bg/70 tabular-nums">
              {String(current + 1).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Show image ${i + 1}`}
                  className="relative w-12 h-px bg-bg/25 overflow-hidden"
                >
                  <span
                    key={`${i}-${current}`}
                    className={cn(
                      'absolute inset-y-0 left-0 bg-bg',
                      i === current ? 'w-full' : i < current ? 'w-full' : 'w-0'
                    )}
                    style={i === current ? { animation: `heroProgress ${INTERVAL}ms linear` } : undefined}
                  />
                </button>
              ))}
            </div>
            <span className="font-body text-[12px] tracking-[0.14em] text-bg/40 tabular-nums">
              {String(SLIDES.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="block w-px h-10 bg-gradient-to-b from-transparent to-bg/60 animate-pulse" />
      </div>
    </section>
  );
}
