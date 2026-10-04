export default function Marquee({ items: ITEMS }: { items: string[] }) {
  const row = (
    <div className="flex items-center shrink-0" aria-hidden>
      {ITEMS.map((item, i) => (
        <span key={item + i} className="flex items-center">
          <span className="font-display italic text-[22px] md:text-[28px] text-text/80 px-8 md:px-10 whitespace-nowrap">
            {item}
          </span>
          <span className="text-accent text-[10px]">◆</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="bg-bg border-b border-border overflow-hidden py-6 md:py-7">
      <p className="sr-only">{ITEMS.join(', ')}</p>
      <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}
