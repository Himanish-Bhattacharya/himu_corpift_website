import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SMALL_WORDS = new Set(['a', 'an', 'and', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with', 'without']);

/** Product names in the CMS are often ALL CAPS — show them in title case instead. */
export function displayName(name: string): string {
  if (!name || name !== name.toUpperCase()) return name;
  return name
    .toLowerCase()
    .split(' ')
    .map((word, i) =>
      i > 0 && SMALL_WORDS.has(word) ? word : word.replace(/^[a-z]/, (c) => c.toUpperCase())
    )
    .join(' ');
}

export function formatPrice(price: number): string {
  return `Starting from Rs. ${price.toLocaleString('en-IN')}`;
}
