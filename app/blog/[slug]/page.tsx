import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import SectionLabel from '@/components/shared/SectionLabel';
import { getPosts, getPostBySlug, formatBlogDate } from '@/data/blog';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return { title: post.title };
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[17px] font-body text-[#4A4643] leading-[1.85] mb-6">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display text-heading-sm text-text mt-12 mb-4 first:mt-0">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-body font-semibold text-[18px] text-text mt-8 mb-3">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-3 mb-8">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="space-y-4 mb-8">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex gap-3 text-[17px] font-body text-[#4A4643] leading-[1.85]">
        <span className="text-accent flex-shrink-0 mt-[3px] select-none">—</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-[17px] font-body text-[#4A4643] leading-[1.85]">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-text">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
  types: {
    image: ({ value }: { value: { asset: { url: string }; alt?: string } }) => (
      <div className="my-10 rounded-sm overflow-hidden">
        <Image
          src={value.asset.url}
          alt={value.alt ?? ''}
          width={1200}
          height={675}
          className="w-full object-cover"
        />
      </div>
    ),
  },
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, allPosts] = await Promise.all([
    getPostBySlug(params.slug),
    getPosts(),
  ]);

  if (!post) notFound();

  const otherPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="bg-bg-alt pt-[72px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-14 md:py-20">
          <nav className="flex items-center gap-2 text-[12px] font-body text-muted mb-8">
            <Link href="/" className="hover:text-text transition-colors">Home</Link>
            <ChevronRight size={13} className="text-light" />
            <Link href="/blog" className="hover:text-text transition-colors">Blog</Link>
            <ChevronRight size={13} className="text-light" />
            <span className="text-text truncate max-w-[200px]">{post.title}</span>
          </nav>

          <SectionLabel className="block mb-4">{formatBlogDate(post.date)}</SectionLabel>
          <h1 className="font-display text-display-sm text-text max-w-3xl leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Featured image */}
      {post.image && (
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 -mt-4 mb-16 md:mb-24">
          <div className="relative w-full aspect-[16/7] rounded-sm overflow-hidden bg-bg-alt">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article body */}
      <section className="bg-bg pb-24 md:pb-32">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[720px]">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>

          <div className="mt-14 pt-10 border-t border-border">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.08em] uppercase font-body text-muted hover:text-text transition-colors duration-200"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* More articles */}
      {otherPosts.length > 0 && (
        <section className="bg-bg-alt py-20 md:py-24">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <SectionLabel className="block mb-8">More Articles</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {otherPosts.map((related) => (
                <article key={related.id} className="group">
                  <Link href={`/blog/${related.slug}`} className="block">
                    <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden bg-bg mb-5">
                      {related.image && (
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-custom group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </Link>
                  <p className="text-[11px] font-medium tracking-[0.12em] uppercase font-body text-accent mb-2">
                    {formatBlogDate(related.date)}
                  </p>
                  <Link href={`/blog/${related.slug}`}>
                    <h3 className="font-display text-heading-sm text-text mb-3 leading-snug group-hover:text-accent transition-colors duration-200">
                      {related.title}
                    </h3>
                  </Link>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="group/link inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.08em] uppercase font-body text-text border-b border-text pb-px hover:text-accent hover:border-accent transition-colors duration-200"
                  >
                    Read Article
                    <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-bg-dark text-bg py-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <SectionLabel light className="block mb-5">Ready to Gift?</SectionLabel>
          <h2 className="font-display italic text-display-md text-bg mb-7">
            Let&apos;s create something memorable
          </h2>
          <Link href="/contact" className="group btn-accent inline-flex items-center gap-2">
            Talk to Us
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
