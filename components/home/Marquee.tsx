const ITEMS = [
  'Handcrafted in Jaipur',
  'Custom branding',
  'Bulk & corporate orders',
  'Sustainable materials',
  'Festive hampers',
  'Pan-India delivery',
];

export default function Marquee() {
  const row = (
    <div className="flex items-center shrink-0" aria-hidden>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
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
