import { cn } from '@/lib/utils';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export default function SectionLabel({ children, className, light }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'text-[11px] font-medium tracking-[0.14em] uppercase font-body',
        light ? 'text-accent-light' : 'text-accent',
        className
      )}
    >
      {children}
    </span>
  );
}
