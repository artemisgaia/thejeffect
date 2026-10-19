// "The J Effect" wordmark: the J is the brand's signature mark.
export default function Wordmark({ className = '' }) {
  return (
    <span className={`wordmark ${className}`.trim()}>
      <span className="wordmark__the">The</span>
      <em className="wordmark__j">J</em>
      <span className="wordmark__effect">Effect</span>
    </span>
  );
}
