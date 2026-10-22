'use client';
import Link from 'next/link';
import { useActionState } from 'react';
import { createProduct } from './actions';

export default function NewProductForm({ categories }) {
  const [s, action, pending] = useActionState(createProduct, null);
  return (
    <form action={action} className="adm-form">
      <div className="adm-split">
        <div>
          <section className="adm-card"><div className="adm-form">
            <label className="adm-field"><span>Title</span><input type="text" name="name" required placeholder="Golden Hour" /></label>
            <label className="adm-field"><span>Descriptor</span><input type="text" name="descriptor" placeholder="Triple Vitamin C Brightening Serum" /></label>
            <label className="adm-field"><span>Short description</span><textarea name="short" rows={4} /></label>
            <label className="adm-field"><span>Tagline</span><input type="text" name="tagline" /></label>
          </div></section>
          <section className="adm-card"><h2>Details</h2><div className="adm-form" style={{ marginTop: 10 }}>
            <label className="adm-field"><span>Benefits</span><textarea name="benefits" rows={3} /><small>One per line.</small></label>
            <label className="adm-field"><span>How to use</span><textarea name="how_to_use" rows={3} /><small>One step per line.</small></label>
            <label className="adm-field"><span>Ingredients</span><textarea name="ingredients" rows={3} /></label>
          </div></section>
          <section className="adm-card"><h2>Pricing</h2><div className="adm-row" style={{ marginTop: 10 }}>
            <label className="adm-field"><span>Price</span><div className="adm-money"><input type="number" name="price" step="0.01" min="0.01" required /></div></label>
            <label className="adm-field"><span>Size</span><input type="text" name="size" placeholder="1 fl oz / 30 ml" /></label>
          </div></section>
          <p className="adm-card__sub">After you create the product you can add photos, SEO and inventory on the next screen.</p>
        </div>
        <div>
          <section className="adm-card"><h2>Product organization</h2><div className="adm-form" style={{ marginTop: 10 }}>
            <label className="adm-field"><span>Category</span><select name="category" defaultValue="serum">{categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}</select></label>
            <label className="adm-field"><span>Type</span><input type="text" name="type" placeholder="Serum" /></label>
            <label className="adm-field"><span>Tags</span><input type="text" name="tags" placeholder="hydration, sensitive-skin" /></label>
            <label className="adm-field"><span>URL handle</span><input type="text" name="slug" placeholder="generated from the title" /></label>
            <div className="adm-setting"><div><strong>Active</strong><span>Show on the storefront.</span></div><label className="adm-toggle"><input type="checkbox" name="published" defaultChecked aria-label="Active" /><i /></label></div>
          </div></section>
        </div>
      </div>
      {s?.error && <p className="adm-alert adm-alert--error" role="alert">{s.error}</p>}
      <div className="adm-savebar"><Link className="adm-btn" href="/admin/products">Discard</Link><button className="adm-btn adm-btn--primary" disabled={pending}>{pending ? 'Saving…' : 'Save product'}</button></div>
    </form>
  );
}
