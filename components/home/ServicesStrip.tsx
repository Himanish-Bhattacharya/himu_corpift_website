'use client';

import { motion } from 'framer-motion';
import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';

const SERVICES = [
  {
    num: '01',
    title: 'Customised Gift Hampers',
    desc: 'Bespoke hampers designed around your brand, budget, and recipients — from concept to delivery.',
  },
  {
    num: '02',
    title: 'Handcrafted Gifts',
    desc: "Artisanal pieces sourced directly from Jaipur's finest craftspeople, carrying culture in every detail.",
  },
  {
    num: '03',
    title: 'Quality Products',
    desc: 'Every item individually reviewed for quality, sustainability, and that elusive element of delight.',
  },
];

export default function ServicesStrip() {
  return (
    <section className="bg-bg-dark text-bg py-28 md:py-36">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">

        <RevealOnScroll className="mb-14">
          <SectionLabel light className="block mb-4">What We Do</SectionLabel>
          <h2 className="font-display text-heading-lg text-bg">
            The best of our services
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <RevealOnScroll key={service.num} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-[#1F3A2E] border border-border-dark rounded-sm p-8 flex flex-col gap-10 hover:border-accent/30 transition-colors duration-300"
              >
                {/* Top row: number + accent line */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-[13px] tracking-[0.1em] font-body text-muted/50">
                    {service.num}
                  </span>
                  <div className="w-8 h-px bg-accent/40" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display text-heading-sm text-bg mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[14px] font-body text-muted leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
}
