import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Package, Hand, Star, ArrowUpRight } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind Corpift — handcrafted corporate gifts from Jaipur, founded by Himanish Bhattacharya.',
};

const STATS = [
  { value: '15',   label: 'Experts' },
  { value: '500+', label: 'Happy Clients' },
  { value: '20+',  label: 'Offers' },
  { value: '40',   label: 'Categories' },
];

const TEAM = [
  {
    name: 'Himanish Bhattacharya',
    role: 'Founder & CEO',
    image: '/images/HIMU_DP.webp',
    url: 'https://himanishbhattacharya.com',
  },
];

const VALUES = [
  {
    icon: Package,
    title: 'Unique Packaging',
    desc: 'Unique packaging turns every gift into an unforgettable experience, making the presentation as special as the present itself.',
  },
  {
    icon: Hand,
    title: 'Hand Picked',
    desc: 'Our hand-picked gifts are carefully selected to ensure each one feels uniquely special for your recipients.',
  },
  {
    icon: Star,
    title: 'Custom Made',
    desc: 'Our custom-made gifts are designed to perfectly capture your unique vision and create memorable, one-of-a-kind experiences.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-alt pt-[72px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-[12px] font-body text-muted mb-6">
            <Link href="/" className="hover:text-text transition-colors">Home</Link>
            <ChevronRight size={13} className="text-light" />
            <span className="text-text">About</span>
          </nav>
          <SectionLabel className="block mb-4">Our Story</SectionLabel>
          <h1 className="font-display text-display-sm text-text max-w-3xl leading-tight">
            Leaders in Handcrafted Corporate Gifts &amp; Custom Gift Hampers
          </h1>
        </div>
      </section>

      {/* Brand story */}
      <section className="bg-bg py-28 md:py-36">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            <RevealOnScroll>
              <div className="space-y-6 text-[15px] font-body text-muted leading-relaxed">
                <p>
                  Receiving a gift is a transformative experience that fosters a strong connection with the giver and builds positive associations with both individuals and brands. In corporate gifting, your business sends thoughtful gifts to clients, customers, employees, vendors, or prospects — enhancing relationships and creating lasting impressions.
                </p>
                <p>
                  Corpift was founded by an Engineer with a vision to promote beautiful, functional handcrafted gifts that leave a lasting impression. Our offerings go beyond handcrafted items to include a wide range of customized and unique gifts, with the added benefit of personalization for both the giver and the receiver.
                </p>
                <p>
                  Based in Jaipur — India&apos;s city of craftsmanship — we work directly with skilled artisans, sustainable suppliers, and thoughtful designers to create gifts that carry meaning. Every piece in a Corpift hamper tells a story.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <blockquote className="border-l-2 border-accent pl-8">
                <p className="font-display italic text-heading-md text-text leading-relaxed mb-6">
                  &ldquo;Our mission is to offer unique gifting solutions that leave a lasting impression — for every client, every occasion, every time.&rdquo;
                </p>
                <footer>
                  <p className="text-[14px] font-body font-medium text-text">Himanish Bhattacharya</p>
                  <p className="text-[12px] font-body text-accent tracking-[0.08em] uppercase">Founder &amp; CEO</p>
                </footer>
              </blockquote>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-bg-alt py-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-border">
            {STATS.map((stat, i) => (
              <RevealOnScroll key={stat.label} delay={i * 0.08}>
                <div className="text-center md:px-8">
                  <p className="font-display text-display-sm text-accent leading-none mb-2">
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-medium tracking-[0.12em] uppercase font-body text-muted">
                    {stat.label}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube video */}
      <section className="bg-bg py-28 md:py-36">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <RevealOnScroll className="mb-12">
            <SectionLabel className="block mb-4">See Us in Action</SectionLabel>
            <h2 className="font-display text-heading-lg text-text max-w-xl">
              Watch how we craft every gift with care
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-bg-alt shadow-[0_20px_60px_rgba(27,25,22,0.12)]">
              <iframe
                src="https://www.youtube.com/embed/CkCW5qg84uM?rel=0&modestbranding=1"
                title="Corpift — Handcrafted Corporate Gifting"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg-alt py-28 md:py-36">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <RevealOnScroll className="mb-14">
            <SectionLabel className="block mb-4">Our Speciality</SectionLabel>
            <h2 className="font-display text-heading-lg text-text">
              Elevate your brand with bespoke<br />corporate gifts
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <RevealOnScroll key={v.title} delay={i * 0.1}>
                <div className="bg-bg rounded-sm p-8 border border-border hover:border-accent/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center mb-6">
                    <v.icon size={18} className="text-accent" />
                  </div>
                  <h3 className="font-display text-heading-sm text-text mb-3">{v.title}</h3>
                  <p className="text-[14px] font-body text-muted leading-relaxed">{v.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-bg py-28 md:py-36">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <RevealOnScroll className="mb-14 text-center">
            <SectionLabel className="block mb-4">The Team</SectionLabel>
            <h2 className="font-display text-heading-lg text-text">
              Passionate people, purposeful gifts
            </h2>
          </RevealOnScroll>

          <div className="flex flex-wrap justify-center gap-8 md:gap-10">
            {TEAM.map((member, i) => (
              <RevealOnScroll key={member.name} delay={i * 0.1} className="w-full max-w-[340px]">
                <a
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block text-center"
                >
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-5 bg-bg-alt">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 340px"
                      className="object-cover object-top transition-transform duration-700 ease-custom group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display text-heading-sm text-text group-hover:text-accent transition-colors duration-300 inline-flex items-center gap-1.5">
                    {member.name}
                    <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="text-[11px] font-medium tracking-[0.12em] uppercase font-body text-accent mt-1">
                    {member.role}
                  </p>
                </a>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
