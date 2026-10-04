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

export default async function HomePage() {
  const [products, featured] = await Promise.all([
    getProducts(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      <Hero />
      <Marquee />
      <AboutTeaser />
      <CategoryGrid products={products} />
      <FeaturedProducts featured={featured} all={products} />
      <ScheduledGifting />
      <ServicesStrip />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
