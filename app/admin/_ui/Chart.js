// Dependency-free SVG line/area chart used by Home and Analytics.
export default function Chart({ labels = [], series = [], format = (v) => v, height = 190 }) {
  const W = 640; const H = height; const pad = { l: 40, r: 10, t: 10, b: 24 };
  const all = series.flatMap((s) => s.points);
  const max = Math.max(1, ...all);
  const nice = (m) => { const p = 10 ** Math.floor(Math.log10(m)); const n = m / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p; };
  const top = nice(max);
  const x = (i) => pad.l + (labels.length <= 1 ? 0 : (i * (W - pad.l - pad.r)) / (labels.length - 1));
  const y = (v) => pad.t + (H - pad.t - pad.b) * (1 - v / top);
  const ticks = [0, 0.5, 1].map((t) => t * top);
  const step = Math.max(1, Math.ceil(labels.length / 6));
  return (
    <svg className="adm-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Chart">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#ebebeb" />
          <text x={pad.l - 6} y={y(t) + 4} textAnchor="end">{format(t)}</text>
        </g>
      ))}
      {labels.map((l, i) => (i % step === 0 ? <text key={l + i} x={x(i)} y={H - 6} textAnchor="middle">{l}</text> : null))}
      {series.map((s) => {
        const d = s.points.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
        return (
          <g key={s.label}>
            {s.area && <path d={`${d} L${x(s.points.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z`} fill={s.color} opacity=".12" />}
            <path d={d} fill="none" stroke={s.color} strokeWidth="2" strokeDasharray={s.dash ? '4 4' : undefined} strokeLinejoin="round" />
          </g>
        );
      })}
    </svg>
  );
}
