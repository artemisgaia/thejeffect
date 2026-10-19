'use client';
import { useActionState, useState } from 'react';
import { saveProduct, resetProduct } from './actions';
import ImageManager from './ImageManager';

function Counter({ value, max }) {
  return <span className={`adm-counter${value.length > max ? ' is-over' : ''}`}>{value.length} / {max}</span>;
}

export default function ProductForm({ initial, catalogImages, hasOverride }) {
  const [state, action, pending] = useActionState(saveProduct, null);
  const [seoTitle, setSeoTitle] = useState(initial.seoTitle);
  const [seoDesc, setSeoDesc] = useState(initial.seoDescription);

  return (
    <>
      <form action={action} className="adm-form">
        <input type="hidden" name="slug" value={initial.slug} />

        <section className="adm-card">
          <h2>Details</h2>
          <p className="adm-card__sub">What shoppers read first.</p>
          <div className="adm-form">
            <div className="adm-row">
              <label className="adm-field"><span>Name</span><input type="text" name="name" defaultValue={initial.name} required maxLength={120} /></label>
              <label className="adm-field"><span>Descriptor</span><input type="text" name="descriptor" defaultValue={initial.descriptor} required maxLength={160} /><small>The plain-English product type, shown under the name.</small></label>
            </div>
            <label className="adm-field"><span>Tagline</span><input type="text" name="tagline" defaultValue={initial.tagline} maxLength={240} /></label>
            <label className="adm-field"><span>Short description</span><textarea name="short" defaultValue={initial.short} maxLength={1200} /></label>
          </div>
        </section>

        <section className="adm-card">
          <h2>Pricing</h2>
          <p className="adm-card__sub">Checkout always uses the price saved here.</p>
          <div className="adm-row">
            <label className="adm-field"><span>Price</span><div className="adm-money"><input type="number" name="price" step="0.01" min="0.01" defaultValue={initial.price} required /></div></label>
            <label className="adm-field"><span>Compare-at price</span><div className="adm-money"><input type="number" name="compare_at_price" step="0.01" min="0" defaultValue={initial.compare_at_price} /></div><small>Optional. Shows a strikethrough price and a Sale badge.</small></label>
            <label className="adm-field"><span>Size</span><input type="text" name="size" defaultValue={initial.size} required maxLength={60} /></label>
          </div>
        </section>

        <section className="adm-card">
          <h2>Photos</h2>
          <p className="adm-card__sub">The first photo is the main image. Portrait 3:4 works best.</p>
          <ImageManager slug={initial.slug} initial={initial.images} catalog={catalogImages} savedAt={state?.at} />
        </section>

        <section className="adm-card">
          <h2>Visibility &amp; merchandising</h2>
          <p className="adm-card__sub">&nbsp;</p>
          <div className="adm-switches">
            <label className="adm-switch"><input type="checkbox" name="published" defaultChecked={initial.published} /><div><strong>Published</strong><span>Untick to hide it everywhere on the site.</span></div></label>
            <label className="adm-switch"><input type="checkbox" name="sold_out" defaultChecked={initial.sold_out} /><div><strong>Sold out</strong><span>Stays visible but cannot be added to the cart.</span></div></label>
            <label className="adm-switch"><input type="checkbox" name="bestseller" defaultChecked={initial.bestseller} /><div><strong>Bestseller badge</strong><span>Shown on the product card.</span></div></label>
            <label className="adm-switch"><input type="checkbox" name="is_new" defaultChecked={initial.is_new} /><div><strong>New badge</strong><span>Shown when it is not a bestseller.</span></div></label>
            <label className="adm-switch"><input type="checkbox" name="featured" defaultChecked={initial.featured} /><div><strong>Feature on the homepage</strong><span>The homepage row shows four featured products.</span></div></label>
          </div>
          <label className="adm-field" style={{ marginTop: 18 }}>
            <span>Tags</span>
            <input type="text" name="tags" defaultValue={initial.tags} placeholder="hydration, brightening, sensitive-skin" />
            <small>Comma separated. Used for filtering and related products.</small>
          </label>
        </section>

        <section className="adm-card">
          <h2>Search appearance</h2>
          <p className="adm-card__sub">How the product appears on Google.</p>
          <div className="adm-form">
            <label className="adm-field"><span>Page title</span><input type="text" name="seo_title" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} /><Counter value={seoTitle} max={60} /></label>
            <label className="adm-field"><span>Meta description</span><textarea name="seo_description" value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} style={{ minHeight: 84 }} /><Counter value={seoDesc} max={160} /></label>
          </div>
        </section>

        <div className="adm-savebar">
          <button type="submit" className="adm-btn adm-btn--primary" disabled={pending}>{pending ? 'Saving…' : 'Save changes'}</button>
          {state?.error && <p className="adm-alert adm-alert--error" role="alert">{state.error}</p>}
          {state?.ok && <p className="adm-alert adm-alert--ok" role="status">{state.message}</p>}
        </div>
      </form>

      {hasOverride && (
        <form action={resetProduct} style={{ marginTop: 28 }}
          onSubmit={(e) => { if (!confirm('Discard all edits and uploaded photos for this product? It will go back to the original catalog version.')) e.preventDefault(); }}>
          <input type="hidden" name="slug" value={initial.slug} />
          <button type="submit" className="adm-btn adm-btn--danger">Revert to catalog version</button>
        </form>
      )}
    </>
  );
}
