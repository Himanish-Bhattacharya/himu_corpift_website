import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { getPosts, formatBlogDate } from '@/data/blog';

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      {/* Hero */}
      <section className="bg-bg-alt pt-[72px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-[12px] font-body text-muted mb-6">
            <Link href="/" className="hover:text-text transition-colors">Home</Link>
            <ChevronRight size={13} className="text-light" />
            <span className="text-text">Blog</span>
          </nav>
          <SectionLabel className="block mb-4">Insights &amp; Ideas</SectionLabel>
          <h1 className="font-display text-display-sm text-text max-w-2xl leading-tight">
            Thoughtful gifting — stories, guides &amp; inspiration
          </h1>
          <p className="text-[15px] text-muted font-body mt-4 max-w-lg leading-relaxed">
            Practical advice and inspiration for corporate gifting, from festive ideas to employee appreciation.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-bg py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          {posts.length === 0 ? (
            <p className="font-display text-heading-md text-muted text-center py-24">
              No posts yet. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              {posts.map((post, i) => (
                <RevealOnScroll key={post.id} delay={i * 0.08}>
                  <article className="group">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden bg-bg-alt mb-6">
                        {post.image && (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 ease-custom group-hover:scale-105"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </Link>

                    <p className="text-[11px] font-medium tracking-[0.12em] uppercase font-body text-accent mb-3">
                      {formatBlogDate(post.date)}
                    </p>

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="font-display text-heading-sm text-text mb-3 leading-snug group-hover:text-accent transition-colors duration-200">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-[14px] font-body text-muted leading-relaxed mb-5">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="group/link inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.08em] uppercase font-body text-text border-b border-text pb-px hover:text-accent hover:border-accent transition-colors duration-200"
                    >
                      Read Article
                      <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-alt py-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <RevealOnScroll>
            <SectionLabel className="block mb-4">Ready to Gift?</SectionLabel>
            <h2 className="font-display text-heading-lg text-text mb-6 max-w-xl mx-auto">
              Turn these ideas into something real
            </h2>
            <p className="text-[15px] font-body text-muted mb-8 max-w-md mx-auto leading-relaxed">
              Browse our curated collections or get in touch to discuss a bespoke corporate gifting programme.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop" className="group btn-primary flex items-center gap-2">
                Browse Products
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link href="/contact" className="group btn-outline flex items-center gap-2">
                Get a Quote
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
