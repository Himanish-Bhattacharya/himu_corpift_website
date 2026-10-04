'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';

/** Counts a number up when scrolled into view. `value` like "500+" or "2022". */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\D*)(\d+)(.*)$/);

  useGSAP(() => {
    if (!match || !ref.current || prefersReducedMotion()) return;
    const [, prefix, num, suffix] = match;
    const target = parseInt(num, 10);
    // Years count up from a nearby value rather than from zero
    const from = target > 1900 && target < 2100 ? target - 12 : 0;
    const counter = { n: from };
    ref.current.textContent = `${prefix}${from}${suffix}`;
    gsap.to(counter, {
      n: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(counter.n)}${suffix}`;
      },
    });
  });

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
