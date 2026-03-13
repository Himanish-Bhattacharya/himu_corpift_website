import { sanityClient } from '@/lib/sanity';
import type { PortableTextBlock } from '@portabletext/types';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  content: PortableTextBlock[];
}

const postFields = `
  "id": _id,
  "slug": slug.current,
  title,
  excerpt,
  date,
  "image": coverImage.asset->url,
  content
`;

export async function getPosts(): Promise<BlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "blogPost"] | order(date desc) { ${postFields} }`
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] { ${postFields} }`,
    { slug }
  );
}

export async function getPostSlugs(): Promise<{ slug: string }[]> {
  return sanityClient.fetch(
    `*[_type == "blogPost"] { "slug": slug.current }`
  );
}

export function formatBlogDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
