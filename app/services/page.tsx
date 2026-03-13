import Link from 'next/link';
import { ChevronRight, ArrowRight, ListChecks, Gift, Truck } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';

const SERVICES = [
  {
    num: '01',
    title: 'Customised Gift Hampers',
    desc: 'Tell us your budget, your brand, and your recipients — we do the rest. From concept to delivery, every hamper is tailored to create the exact impression you want to make.',
  },
  {
    num: '02',
    title: 'Handcrafted Gifts',
    desc: "Sourced directly from Jaipur's finest artisans, our handcrafted collection carries the region's rich cultural heritage. Each piece is a unique work of art that no mass-produced gift can replicate.",
  },
  {
    num: '03',
    title: 'Bulk Corporate Orders',
    desc: 'Ordering for 50 people or 5,000? We scale effortlessly while maintaining quality across every single unit. Competitive pricing, consistent delivery, and dedicated account management.',
  },
  {
    num: '04',
    title: 'Festive Collections',
    desc: 'Diwali, Holi, Eid, Christmas — we create bespoke festive hampers that celebrate each occasion with authenticity and care. Seasonal collections available well in advance of every major festival.',
  },
  {
    num: '05',
    title: 'Sustainable Gifting',
    desc: 'For companies that care about the planet, our eco-friendly range is curated exclusively from sustainable suppliers. Recycled materials, minimal packaging, and verified ethical sourcing.',
  },
  {
    num: '06',
    title: 'Custom Branding & Packaging',
    desc: "Your logo, your colours, your story — printed, embossed, or engraved on every element of the hamper. We make sure your gifts are unmistakably yours.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-alt pt-[72px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-[12px] font-body text-muted mb-6">
            <Link href="/" className="hover:text-text transition-colors">Home</Link>
            <ChevronRight size={13} className="text-light" />
            <span className="text-text">Services</span>
          </nav>
          <SectionLabel className="block mb-4">What We Offer</SectionLabel>
          <h1 className="font-display text-display-sm text-text max-w-2xl leading-tight">
            End-to-end gifting solutions for your business
          </h1>
          <p className="text-[15px] text-muted font-body mt-4 max-w-lg leading-relaxed">
            From concept to delivery, we handle every aspect of your corporate gifting programme with care and precision.
          </p>
        </div>
      </section>

      {/* Scheduled Gifting — featured service */}
      <section className="bg-bg-dark py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-10">
              <span className="text-[11px] font-medium tracking-[0.14em] uppercase font-body text-accent">Featured Service</span>
              <div className="h-px w-8 bg-accent/40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-14">
              <div>
                <h2 className="font-display text-display-sm text-bg leading-tight mb-5">
                  Scheduled Gifting
                </h2>
                <p className="text-[15px] font-body text-muted leading-relaxed mb-6">
                  Share your employee or client list with their special dates — birthdays, anniversaries, celebrations. We curate the perfect hamper for each person and deliver it the day before, every time.
                </p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="font-display text-display-sm text-accent leading-none">Rs. 15</span>
                  <span className="text-[13px] font-body text-muted">per person, onwards</span>
                </div>
                <Link href="/contact" className="group btn-accent flex items-center gap-2 w-fit">
                  Get Started
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: ListChecks, title: 'Share your list', desc: 'Names, dates, and any preferences — one spreadsheet is all we need.' },
                  { icon: Gift,       title: 'We set it up',   desc: 'We pick and curate the right hamper for each person and occasion.' },
                  { icon: Truck,      title: 'Delivered on time', desc: 'Every gift arrives the day before — no reminders needed from you.' },
                ].map((step, i) => (
                  <RevealOnScroll key={step.title} delay={i * 0.08}>
                    <div className="flex items-start gap-4 bg-[#1F3A2E] border border-border-dark rounded-sm p-5">
                      <div className="w-9 h-9 rounded-sm bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <step.icon size={16} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-display text-heading-sm text-bg mb-1">{step.title}</h3>
                        <p className="text-[13px] font-body text-muted leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Services list — alternating layout */}
      <section className="bg-bg py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="divide-y divide-border">
            {SERVICES.map((service, i) => {
              const isEven = i % 2 === 0;
              return (
                <RevealOnScroll key={service.num} delay={0}>
                  <div
                    className={`py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start ${
                      !isEven ? 'md:grid-flow-dense' : ''
                    }`}
                  >
                    {/* Number */}
                    <div className={`md:col-span-2 ${!isEven ? 'md:col-start-11' : ''}`}>
                      <span className="font-display text-[80px] leading-none text-accent/20 select-none">
                        {service.num}
                      </span>
                    </div>

                    {/* Content */}
                    <div className={`md:col-span-8 ${!isEven ? 'md:col-start-2' : 'md:col-start-4'}`}>
                      <h2 className="font-display text-heading-lg text-text mb-5">
                        {service.title}
                      </h2>
                      <p className="text-[15px] font-body text-muted leading-relaxed mb-8">
                        {service.desc}
                      </p>
                      <Link
                        href="/contact"
                        className="group btn-outline flex items-center gap-2 w-fit"
                      >
                        Request This Service
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-dark text-bg py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <RevealOnScroll>
            <SectionLabel light className="block mb-6">Get Started</SectionLabel>
            <h2 className="font-display italic text-display-md text-bg mb-8">
              Let&apos;s create something memorable
            </h2>
            <Link href="/contact" className="group btn-accent flex items-center gap-2 mx-auto w-fit">
              Talk to Us
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
