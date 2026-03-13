import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';

const stats = [
  { value: '2021', label: 'Founded' },
  { value: '500+', label: 'Happy Clients' },
  { value: '50+',  label: 'Gift Categories' },
];

export default function AboutTeaser() {
  return (
    <section className="bg-bg-alt py-28 md:py-36">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Stats */}
          <RevealOnScroll>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-8 md:gap-12">
              {stats.map((stat, i) => (
                <RevealOnScroll key={stat.label} delay={i * 0.1}>
                  <div>
                    <p className="font-display text-display-sm text-accent leading-none mb-1">
                      {stat.value}
                    </p>
                    <p className="text-[11px] font-medium tracking-[0.14em] uppercase font-body text-muted">
                      {stat.label}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </RevealOnScroll>

          {/* Copy */}
          <RevealOnScroll delay={0.15}>
            <div>
              <SectionLabel className="block mb-4">Our Story</SectionLabel>
              <h2 className="font-display text-heading-lg text-text mb-6 leading-tight">
                Crafting gifts that leave a lasting impression
              </h2>
              <p className="text-[15px] text-muted font-body leading-relaxed mb-4">
                Born in Jaipur — India&apos;s city of craftsmanship — Corpift was founded with a singular belief:
                corporate gifting should feel personal, not transactional.
              </p>
              <p className="text-[15px] text-muted font-body leading-relaxed mb-8">
                We partner with local artisans and sustainable suppliers to create hampers that carry the soul of Rajasthan.
                Every piece is thoughtfully chosen, beautifully packaged, and delivered with care.
              </p>
              <Link href="/about" className="btn-ghost group flex items-center gap-2 w-fit">
                Discover Our Story
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
