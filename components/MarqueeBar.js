const ITEMS = [
  'Made in the USA', 'Mindful Rituals', 'Clean Formulas',
  'Radiant Confidence', 'Luminous Skin', 'Cruelty Free', 'Free Shipping $50+',
];

export default function MarqueeBar({ items = ITEMS }) {
  // Duplicate for seamless loop
  const all = [...items, ...items];
  return (
    <div className="marquee-bar" aria-hidden="true">
      <div className="marquee-track">
        {all.map((item, i) => (
          <span className="marquee-item" key={i}>
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
