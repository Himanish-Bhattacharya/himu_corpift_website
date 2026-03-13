export default function Marquee() {
  const text = 'Corporate Gifts ◆ Sustainable Gifts ◆ Festival Hampers ◆ Handicraft Items ◆ Custom Packaging ◆ ';

  return (
    <div className="bg-bg-dark overflow-hidden py-5 border-y border-border-dark">
      <div
        className="flex whitespace-nowrap animate-scroll hover:[animation-play-state:paused]"
        style={{ width: 'max-content' }}
      >
        {/* Repeat 3× to create seamless loop */}
        {[0, 1, 2].map((_, i) => (
          <span key={i} className="font-display italic text-xl text-bg/60 pr-0">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
