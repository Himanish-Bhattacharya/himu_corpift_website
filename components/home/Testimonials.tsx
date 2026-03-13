import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';

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
  return (
    <section className="bg-bg-alt py-28 md:py-36">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <RevealOnScroll className="mb-16">
          <SectionLabel className="block mb-4">What Clients Say</SectionLabel>
          <h2 className="font-display text-heading-lg text-text">
            Trusted by businesses across India
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {TESTIMONIALS.map((t, i) => (
            <RevealOnScroll key={t.name} delay={i * 0.1}>
              <div className="relative bg-bg-card rounded-sm p-10 md:p-12 border border-border">
                {/* Quotation mark */}
                <span
                  aria-hidden
                  className="absolute top-4 left-8 font-display text-[120px] leading-none text-accent/15 select-none"
                >
                  &ldquo;
                </span>

                <div className="relative z-10 pt-8">
                  <p className="font-display italic text-heading-sm text-text leading-relaxed mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-px bg-accent" />
                    <div>
                      <p className="text-[14px] font-medium font-body text-text">{t.name}</p>
                      <p className="text-[12px] text-muted font-body">{t.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
