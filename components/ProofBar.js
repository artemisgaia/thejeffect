const DEFAULT_STATS = [
  { num: '48+',  label: 'Ritual Products' },
  { num: '100%', label: 'Clean Formulas' },
  { num: 'USA',  label: 'Crafted With Care' },
  { num: '★ 5.0', label: 'Community Rating' },
];

export default function ProofBar({ stats = DEFAULT_STATS }) {
  return (
    <section className="proof-bar reveal" aria-label="Trust stats">
      <div className="proof-bar__inner">
        {stats.map((s, i) => (
          <div className="proof-stat" key={i}>
            <div className="proof-stat__num">{s.num}</div>
            <div className="proof-stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
