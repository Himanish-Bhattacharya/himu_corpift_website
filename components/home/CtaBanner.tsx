import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import RevealOnScroll from '@/components/shared/RevealOnScroll';

export default function CtaBanner() {
  return (
    <section className="bg-bg-dark text-bg py-28 md:py-36">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <h2 className="font-display italic text-display-md text-bg leading-tight mb-6 max-w-2xl">
                Ready to elevate<br />your gifting?
              </h2>
              <div className="flex items-center gap-3 text-muted mb-0">
                <Phone size={16} className="text-accent" />
                <a
                  href="tel:+919057370100"
                  className="font-display text-heading-sm text-bg hover:text-accent transition-colors"
                >
                  +91 9057370100
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group btn-primary border border-bg/20 flex items-center gap-2 justify-center"
              >
                Get in Touch
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/shop"
                className="group btn-outline border-border-dark text-bg hover:border-accent hover:text-accent flex items-center gap-2 justify-center"
              >
                Browse Products
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
