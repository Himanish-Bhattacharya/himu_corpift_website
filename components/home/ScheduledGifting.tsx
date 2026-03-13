'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ListChecks, Gift, Truck } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';

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

export default function ScheduledGifting() {
  return (
    <section className="bg-bg-dark text-bg py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">

        {/* Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
            <div>
              <SectionLabel light className="block mb-4">New Service</SectionLabel>
              <h2 className="font-display text-display-sm text-bg leading-tight">
                Scheduled Gifting
              </h2>
              <p className="text-[15px] font-body text-muted mt-4 max-w-lg leading-relaxed">
                Never miss a birthday, anniversary, or celebration again.
                Share your list once — we handle every gift, every time.
              </p>
            </div>

            {/* Price callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
              className="flex-shrink-0 border border-accent/30 rounded-sm px-8 py-6 text-center bg-accent/[0.04]"
            >
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase font-body text-accent mb-2">
                Starting from
              </p>
              <p className="font-display text-display-sm text-accent leading-none">
                Rs. 15
              </p>
              <p className="text-[12px] font-body text-muted mt-1">per person</p>
            </motion.div>
          </div>
        </RevealOnScroll>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {STEPS.map((step, i) => (
            <RevealOnScroll key={step.num} delay={i * 0.1}>
              <div className="bg-[#1F3A2E] border border-border-dark rounded-sm p-8 h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
                    <step.icon size={18} className="text-accent" />
                  </div>
                  <span className="font-display text-[13px] tracking-[0.1em] font-body text-muted/40">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-display text-heading-sm text-bg mb-3">
                  {step.title}
                </h3>
                <p className="text-[14px] font-body text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* CTA */}
        <RevealOnScroll delay={0.2}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/contact"
              className="group btn-accent flex items-center gap-2"
            >
              Get Started
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <p className="text-[13px] font-body text-muted">
              Works for employee gifting, client gifting, or both.
            </p>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
