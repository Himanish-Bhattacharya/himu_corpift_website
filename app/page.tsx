import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import AboutTeaser from '@/components/home/AboutTeaser';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ServicesStrip from '@/components/home/ServicesStrip';
import ScheduledGifting from '@/components/home/ScheduledGifting';
import Testimonials from '@/components/home/Testimonials';
import CtaBanner from '@/components/home/CtaBanner';
import { getProducts, getFeaturedProducts } from '@/data/products';
import { getHomepage } from '@/data/homepage';

export default async function HomePage() {
  // All homepage copy and images come from the "Homepage" document in Sanity, with built-in fallbacks
  const [products, featured, home] = await Promise.all([getProducts(), getFeaturedProducts(), getHomepage()]);

  // Products hand-picked in Sanity win; otherwise use the per-product "Featured on Homepage" toggles
  const picked = home.featuredProducts.length > 0 ? home.featuredProducts : featured;

  return (
    <>
      <Hero slides={home.heroSlides} eyebrow={home.heroEyebrow} headline={home.heroHeadline} text={home.heroText} />
      <Marquee items={home.marqueeItems} />
      <AboutTeaser
        image={home.storyImage}
        heading={home.storyHeading}
        paragraphs={home.storyParagraphs}
        stats={home.storyStats}
        caption={home.storyCaption}
        captionText={home.storyCaptionText}
      />
      <CategoryGrid
        products={products}
        heading={home.categoriesHeading}
        text={home.categoriesText}
        images={home.categoryImages}
      />
      <FeaturedProducts featured={picked} all={products} heading={home.featuredHeading} />
      <ScheduledGifting heading={home.scheduledHeading} text={home.scheduledText} price={home.scheduledPrice} />
      <ServicesStrip heading={home.servicesHeading} services={home.services} />
      <Testimonials items={home.testimonials} />
      <CtaBanner image={home.ctaImage} heading={home.ctaHeading} text={home.ctaText} />
    </>
  );
}
