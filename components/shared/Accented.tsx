import { Fragment } from 'react';
import { cn } from '@/lib/utils';

/** Split a CMS heading into lines (newline = line break). */
export function headingLines(text: string): string[] {
  return text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
}

/**
 * Renders one line of CMS text, turning *word* into an accented italic.
 * `accentClass` sets the accent colour (e.g. text-accent on light, text-accent-light on dark).
 */
export function AccentedLine({ text, accentClass = 'text-accent' }: { text: string; accentClass?: string }) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className={cn('italic', accentClass)}>
            {part}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

/** Multi-line accented heading content (place inside an <h1>/<h2>). */
export default function Accented({ text, accentClass }: { text: string; accentClass?: string }) {
  const lines = headingLines(text);
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <AccentedLine text={line} accentClass={accentClass} />
        </Fragment>
      ))}
    </>
  );
}
