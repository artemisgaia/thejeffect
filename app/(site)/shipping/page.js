export const metadata = {
  title: 'Shipping & Returns — The J Effect',
  description: 'Learn about our fast shipping options and our 30-day return policy.',
};

export default function ShippingPage() {
  return (
    <div className="policy-page">
      <div className="policy-page__inner reveal">
        <h1 className="policy-page__title">Shipping & Returns</h1>
        <div className="policy-page__content">
          <h2>Shipping Information</h2>
          <p>We are thrilled to offer free standard shipping on all U.S. orders over $50. All orders are processed and shipped from our Los Angeles facility within 1–2 business days.</p>
          
          <h3>Estimated Transit Times:</h3>
          <ul>
            <li><strong>Standard Shipping (USPS/UPS):</strong> 3–5 business days</li>
            <li><strong>Expedited Shipping:</strong> 2 business days</li>
            <li><strong>Overnight:</strong> Next business day (if ordered before 12 PM PST)</li>
          </ul>

          <p>Once your order ships, you will receive a confirmation email with a tracking number.</p>

          <hr />

          <h2>Returns & Exchanges</h2>
          <p>We want you to love your ritual. If you are not completely satisfied with your purchase from The J Effect, we offer a 30-day money-back guarantee on all unopened or gently used products.</p>
          
          <h3>How to Initiate a Return:</h3>
          <ol>
            <li>Email our support team at <strong>hello@thejeffect.com</strong> with your order number.</li>
            <li>We will provide you with a pre-paid return shipping label (a $5 processing fee will be deducted from your refund).</li>
            <li>Carefully package your items and drop them off at your nearest USPS location.</li>
          </ol>
          <p>Refunds will be processed to the original form of payment within 5–7 business days of us receiving the returned product.</p>
        </div>
      </div>
    </div>
  );
}
