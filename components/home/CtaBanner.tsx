'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';

export default function CtaBanner() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '[data-cta-img]',
        { scale: 1.15 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } }
      );
      gsap.from('[data-cta-head]', {
        scale: 0.92,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 30%', scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative bg-bg-dark text-bg overflow-hidden">
      <div data-cta-img className="absolute inset-0">
        <Image
          src="/images/hero/slide-4.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-bg-dark/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark/40" />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-28 md:py-44 text-center">
        <SectionLabel light className="block mb-8">Let&apos;s Work Together</SectionLabel>
        <h2
          data-cta-head
          className="font-display italic font-light text-[clamp(48px,8vw,120px)] leading-[0.95] mb-10 md:mb-14"
        >
          Ready to elevate
          <br />
          your <span className="text-accent-light">gifting?</span>
        </h2>

        <p className="text-[15px] md:text-[16px] font-body text-bg/75 max-w-lg mx-auto leading-relaxed mb-10">
          Tell us about your team, your clients and your budget — we&apos;ll come back with a curated proposal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link href="/contact" className="group btn-light flex items-center gap-2">
            Request a Quote
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/shop"
            className="group flex items-center gap-2 border border-bg/40 text-bg text-[13px] font-medium tracking-[0.06em] uppercase font-body py-3 px-8 rounded-sm hover:border-accent-light hover:text-accent-light transition-colors"
          >
            Browse Products
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        <a
          href="tel:+919057370100"
          className="inline-flex items-center gap-3 font-display text-[22px] md:text-[26px] text-bg/90 hover:text-accent-light transition-colors"
        >
          <Phone size={16} className="text-accent-light" />
          +91 9057370100
        </a>
      </div>
    </section>
  );
}
