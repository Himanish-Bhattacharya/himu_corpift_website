'use client';

import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/data/products';

interface FilterBarProps {
  active: string;
  onChange: (slug: string) => void;
}

const ALL_TAB = { slug: 'all', label: 'All' };

export default function FilterBar({ active, onChange }: FilterBarProps) {
  const tabs = [ALL_TAB, ...CATEGORIES];

  return (
    <div className="sticky top-[72px] z-40 bg-bg border-b border-border">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-0">
          {tabs.map((tab) => {
            const isActive = active === tab.slug;
            return (
              <button
                key={tab.slug}
                onClick={() => onChange(tab.slug)}
                className={cn(
                  'flex-shrink-0 px-5 py-4 text-[12px] font-medium tracking-[0.1em] uppercase font-body',
                  'relative transition-colors duration-200 border-b-2',
                  isActive
                    ? 'text-accent border-accent'
                    : 'text-muted border-transparent hover:text-text'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
