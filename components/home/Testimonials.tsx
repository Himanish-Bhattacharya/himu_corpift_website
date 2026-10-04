'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { cn } from '@/lib/utils';

const TESTIMONIALS = [
  {
    quote: 'Lovely experience with Corpift. Products quality is super. On time delivery. Will definitely order again for our next corporate event.',
    name: 'Abhilash Joshi',
    city: 'Mumbai',
  },
  {
    quote: 'Amazing diaries. Good quality pages and designs are also great. Feels like a Jackpot! Our entire team was thrilled with the gifting.',
    name: 'Rupal Srivastav',
    city: 'Mumbai',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, [index]);

  return (
    <section className="bg-bg py-24 md:py-40 overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 lg:px-12 text-center">
        <RevealOnScroll>
          <SectionLabel className="block mb-10 md:mb-14">What Clients Say</SectionLabel>
        </RevealOnScroll>

        <div className="relative">
          <span
            aria-hidden
            className="absolute -top-16 md:-top-24 left-1/2 -translate-x-1/2 font-display text-[200px] md:text-[300px] leading-none text-accent/15 select-none pointer-events-none"
          >
            &ldquo;
          </span>

          <div className="relative min-h-[300px] md:min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <blockquote className="font-display italic text-[clamp(26px,3.4vw,44px)] text-text leading-[1.3] mb-10">
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center justify-center gap-4">
                  <span className="w-10 h-px bg-accent" />
                  <span className="text-[13px] font-medium font-body text-text tracking-[0.04em]">{t.name}</span>
                  <span className="text-[13px] font-body text-muted">{t.city}</span>
                  <span className="w-10 h-px bg-accent" />
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial from ${item.name}`}
                className={cn(
                  'h-[3px] rounded-full transition-all duration-500',
                  i === index ? 'w-10 bg-accent' : 'w-4 bg-text/20 hover:bg-text/40'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
