'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ListChecks, Gift, Truck } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import Accented from '@/components/shared/Accented';

const STEPS = [
  {
    icon: ListChecks,
    num: '01',
    title: 'Share your list',
    desc: 'Send us your employee or client list with their special dates — birthdays, anniversaries, celebrations.',
  },
  {
    icon: Gift,
    num: '02',
    title: 'We set it up',
    desc: 'We curate the right hamper for each person based on the occasion and your budget.',
  },
  {
    icon: Truck,
    num: '03',
    title: 'Delivered on time',
    desc: 'Every gift arrives the day before the occasion — no follow-ups, no reminders needed from you.',
  },
];

export default function ScheduledGifting({ heading, text, price }: { heading: string; text: string; price: number }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // The connecting line draws itself as the steps scroll into view
      gsap.fromTo(
        '[data-sg-line]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-sg-steps]', start: 'top 80%', end: 'bottom 60%', scrub: true },
        }
      );
      gsap.from('[data-sg-step]', {
        autoAlpha: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-sg-steps]', start: 'top 80%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-bg-alt py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-24">
            <div>
              <SectionLabel className="block mb-5">New Service</SectionLabel>
              <h2 className="font-display text-[clamp(40px,5.4vw,76px)] text-text leading-[0.98]">
                <Accented text={heading} />
              </h2>
              <p className="text-[15px] font-body text-muted mt-6 max-w-lg leading-relaxed">
                {text}
              </p>
            </div>

            {/* Price callout */}
            <div className="flex-shrink-0 bg-bg-dark text-bg rounded-sm px-9 py-7 w-fit">
              <p className="text-[11px] font-medium tracking-[0.16em] uppercase font-body text-accent-light mb-2">
                Starting from
              </p>
              <p className="font-display text-[56px] leading-none">
                ₹{price.toLocaleString('en-IN')}<span className="text-[18px] text-muted-dark font-body ml-2">/ person</span>
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Steps */}
        <div data-sg-steps className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 mb-16">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-7 left-7 right-[calc(33%-1.75rem)] h-px bg-text/10">
            <div data-sg-line className="h-full bg-accent origin-left" />
          </div>

          {STEPS.map((step) => (
            <div key={step.num} data-sg-step className="relative">
              <div className="relative z-10 w-14 h-14 rounded-full bg-bg border border-accent/40 flex items-center justify-center mb-8">
                <step.icon size={20} className="text-accent" />
              </div>
              <p className="font-body text-[11px] tracking-[0.16em] uppercase text-accent mb-3">Step {step.num}</p>
              <h3 className="font-display text-[30px] text-text leading-tight mb-3">{step.title}</h3>
              <p className="text-[15px] font-body text-muted leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <RevealOnScroll delay={0.1}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link href="/contact" className="group btn-primary flex items-center gap-2">
              Get Started
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <p className="text-[13px] font-body text-muted">Works for employee gifting, client gifting, or both.</p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
