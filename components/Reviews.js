const DEFAULT_REVIEWS = [
  { text: "My skin looks rested — like I've been taking better care of myself all along. The routine actually sticks.", author: 'J. — Verified Customer', product: 'Daily Ritual Set' },
  { text: "The routine feels simple, but my glow looks entirely intentional. I get compliments every week.", author: 'A. — Verified Customer', product: 'Watermelon Hydration Moisturizer' },
  { text: "Finally — skincare that feels calm and genuinely effective. No guessing, no overwhelm.", author: 'M. — Verified Customer', product: 'Gentle Cleansing Gel' },
  { text: "I replaced five products with three from The J Effect. My skin has never looked this clear or felt this soft.", author: 'S. — Verified Customer', product: 'Hyaluronic Acid Serum' },
  { text: "The Retinol & Peptide serum changed everything. I wake up looking like I got ten hours of sleep.", author: 'K. — Verified Customer', product: 'Retinol & Peptide Face Serum' },
  { text: "Clean ingredients I can actually pronounce, and results I can actually see. This is what skincare should be.", author: 'R. — Verified Customer', product: 'Anti Aging Moisturizer' },
];

export default function Reviews({
  eyebrow = 'Real People. Real Results.',
  title = 'The community speaks.',
  avgRating = '5.0',
  reviews = DEFAULT_REVIEWS,
}) {
  return (
    <section className="reviews">
      <div className="reviews__inner">
        <div className="reviews__header">
          <div>
            <div className="eyebrow reveal">{eyebrow}</div>
            <h2 className="section-title section-title--dark reveal reveal--d1">{title}</h2>
          </div>
          <div className="reviews__avg reveal reveal--d2" aria-label={`${avgRating} stars average`}>
            <div>
              <div className="reviews__score">{avgRating}</div>
              <div style={{ color: 'var(--gold)', fontSize: '.72rem', marginTop: '3px' }}>★★★★★</div>
            </div>
            <div>
              <div style={{ fontSize: '.76rem', fontWeight: 300, color: 'rgba(247,243,236,.7)', fontFamily: "'DM Sans', sans-serif" }}>Average Rating</div>
              <div className="reviews__meta">Community</div>
            </div>
          </div>
        </div>

        <div className="reviews__grid">
          {reviews.map((r, i) => (
            <div className={`review-card reveal reveal--d${i + 1}`} key={i}>
              <div className="review-card__stars">★★★★★</div>
              <p className="review-card__text">&ldquo;{r.text}&rdquo;</p>
              <div className="review-card__author">{r.author}</div>
              <div className="review-card__product">{r.product}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
