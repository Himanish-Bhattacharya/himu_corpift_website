'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';

const SERVICES = [
  {
    num: '01',
    title: 'Customised Gift Hampers',
    desc: 'Bespoke hampers designed around your brand, budget and recipients — from concept to doorstep.',
  },
  {
    num: '02',
    title: 'Handcrafted Gifts',
    desc: "Artisanal pieces sourced directly from Jaipur's finest craftspeople, carrying culture in every detail.",
  },
  {
    num: '03',
    title: 'Quality, Checked by Hand',
    desc: 'Every item individually reviewed for quality, sustainability and that elusive element of delight.',
  },
];

export default function ServicesStrip() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>('[data-svc-row]').forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 85%', once: true } });
        tl.from(row.querySelector('[data-svc-rule]'), { scaleX: 0, transformOrigin: 'left', duration: 1.1, ease: 'power3.inOut' })
          .from(row.querySelectorAll('[data-svc-fade]'), { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, '-=0.6');
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-bg-dark text-bg py-24 md:py-36">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <div>
            <SectionLabel light className="block mb-5">What We Do</SectionLabel>
            <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-[1]">
              The craft <em className="italic text-accent-light">behind</em> every gift
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 w-fit text-[13px] font-medium tracking-[0.06em] uppercase font-body text-bg border-b border-bg/50 pb-1 hover:text-accent-light hover:border-accent-light transition-colors"
          >
            All services
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div>
          {SERVICES.map((service) => (
            <div key={service.num} data-svc-row className="group relative">
              <div data-svc-rule className="h-px bg-border-dark" />
              <div className="grid grid-cols-12 gap-x-8 gap-y-4 md:items-center py-10 md:py-14">
                <span
                  data-svc-fade
                  className="col-span-12 md:col-span-2 font-display text-[52px] md:text-[88px] leading-none text-outline transition-colors duration-500 group-hover:text-accent-light/20"
                >
                  {service.num}
                </span>
                <h3
                  data-svc-fade
                  className="col-span-12 md:col-span-5 font-display text-[30px] md:text-[clamp(30px,3.2vw,44px)] leading-[1.1] transition-transform duration-500 group-hover:translate-x-2"
                >
                  {service.title}
                </h3>
                <p
                  data-svc-fade
                  className="col-span-12 md:col-span-5 text-[15px] font-body text-muted-dark leading-relaxed md:pl-4"
                >
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
          <div className="h-px bg-border-dark" />
        </div>
      </div>
    </section>
  );
}
