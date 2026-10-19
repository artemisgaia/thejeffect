export default function Loading() {
  return (
    <div className="global-loading">
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: '1.2rem',
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: 'var(--forest)',
          marginBottom: '24px',
          fontWeight: 400,
        }}>
          The J Effect
        </div>
        <div className="global-loading__spinner"></div>
      </div>
    </div>
  );
}
