'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import CountUp from '@/components/shared/CountUp';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';

const stats = [
  { value: '2022', label: 'Founded' },
  { value: '500+', label: 'Happy Clients' },
  { value: '50+',  label: 'Gift Categories' },
];

export default function AboutTeaser() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Image unveils like a curtain lifting, then drifts gently with scroll
      gsap.fromTo(
        '[data-about-frame]',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '[data-about-frame]', start: 'top 80%', once: true },
        }
      );
      gsap.fromTo(
        '[data-about-img]',
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-bg py-24 md:py-36">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          {/* Image */}
          <div className="lg:col-span-5 relative">
            <div data-about-frame className="relative aspect-[4/5] overflow-hidden rounded-sm bg-bg-alt">
              <div data-about-img className="absolute inset-0 -top-[10%] h-[120%]">
                <Image
                  src="/images/hero/slide-2.jpg"
                  alt="Wrapped gift with brass details beside a green notebook and pen"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Offset caption card */}
            <div className="absolute -bottom-6 right-4 lg:-right-10 bg-bg-dark text-bg px-6 py-5 rounded-sm max-w-[220px] shadow-[0_20px_50px_rgba(20,37,30,0.25)]">
              <p className="font-display italic text-[22px] leading-tight text-accent-light">Made by hand.</p>
              <p className="text-[12px] font-body text-muted-dark mt-1">Sourced from artisans across Rajasthan.</p>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7 lg:pl-6">
            <RevealOnScroll>
              <SectionLabel className="block mb-5">Our Story</SectionLabel>
              <h2 className="font-display text-heading-lg md:text-[clamp(36px,4.4vw,60px)] text-text mb-8 leading-[1.05]">
                Gifting should feel <em className="italic text-accent">personal</em>, not transactional.
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-12 max-w-2xl">
                <p className="text-[15px] text-muted font-body leading-relaxed">
                  Born in Jaipur — India&apos;s city of craftsmanship — Corpift partners with local artisans and
                  sustainable suppliers to build hampers that carry the soul of Rajasthan.
                </p>
                <p className="text-[15px] text-muted font-body leading-relaxed">
                  Every piece is thoughtfully chosen, beautifully packaged and branded for you — then delivered
                  with care, whether it&apos;s ten gifts or ten thousand.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-3 border-y border-border mb-12">
              {stats.map((stat, i) => (
                <div key={stat.label} className={i > 0 ? 'border-l border-border pl-4 sm:pl-8 py-7' : 'py-7 pr-4'}>
                  <CountUp
                    value={stat.value}
                    className="block font-display text-[clamp(34px,4.5vw,56px)] text-text leading-none mb-2 tabular-nums"
                  />
                  <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase font-body text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-ghost group inline-flex items-center gap-2">
              Discover Our Story
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
