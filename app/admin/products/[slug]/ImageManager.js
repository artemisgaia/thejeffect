'use client';
import { useEffect, useRef, useState } from 'react';
import { createBrowserSupabase, PRODUCT_BUCKET } from '@/lib/supabase/browser';

const MAX_IMAGES = 12;
const MAX_EDGE = 2000;

// Resize and convert to WebP in the browser before upload: smaller files, one format.
async function toWebp(file) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not process image'))), 'image/webp', 0.9));
}

export default function ImageManager({ slug, initial, catalog, savedAt }) {
  const [images, setImages] = useState(initial);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [over, setOver] = useState(false);
  const fresh = useRef(new Set()); // uploaded this session, not yet saved
  const input = useRef(null);

  // Once saved, files are referenced by the live product and must not be auto-deleted.
  useEffect(() => { fresh.current.clear(); }, [savedAt]);

  async function upload(fileList) {
    const files = [...fileList].filter((f) => f.type.startsWith('image/'));
    if (!files.length) return;
    setError('');
    const supabase = createBrowserSupabase();
    const added = [];
    for (let i = 0; i < files.length; i++) {
      if (images.length + added.length >= MAX_IMAGES) { setError(`Up to ${MAX_IMAGES} photos per product.`); break; }
      setBusy(`Uploading ${i + 1} of ${files.length}…`);
      try {
        const blob = await toWebp(files[i]);
        const path = `${slug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;
        const { error: upErr } = await supabase.storage.from(PRODUCT_BUCKET).upload(path, blob, {
          contentType: 'image/webp', cacheControl: '31536000', upsert: false,
        });
        if (upErr) throw upErr;
        const { data } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path);
        fresh.current.add(path);
        added.push({ path, url: data.publicUrl, alt: '' });
      } catch (e) {
        setError(`${files[i].name}: ${e.message || 'upload failed'}`);
      }
    }
    setBusy('');
    if (added.length) setImages((cur) => [...cur, ...added]);
    if (input.current) input.current.value = '';
  }

  async function remove(idx) {
    const img = images[idx];
    setImages((cur) => cur.filter((_, i) => i !== idx));
    // A file that was never saved can be deleted right away.
    if (fresh.current.has(img.path)) {
      fresh.current.delete(img.path);
      await createBrowserSupabase().storage.from(PRODUCT_BUCKET).remove([img.path]);
    }
  }

  const move = (idx, dir) => setImages((cur) => {
    const next = [...cur];
    const to = idx + dir;
    if (to < 0 || to >= next.length) return cur;
    [next[idx], next[to]] = [next[to], next[idx]];
    return next;
  });

  const setAlt = (idx, alt) => setImages((cur) => cur.map((im, i) => (i === idx ? { ...im, alt } : im)));

  return (
    <div>
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      {images.length === 0 && catalog.length > 0 && (
        <>
          <p className="adm-alert adm-alert--warn" style={{ marginBottom: 14 }}>
            Using the original catalog images. Upload your own photos below to replace them.
          </p>
          <div className="adm-imgs" style={{ marginBottom: 16 }}>
            {catalog.map((c) => (
              <div className="adm-img" key={c.src}>
                <div className="adm-img__frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.src} alt={c.alt} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {images.length > 0 && (
        <div className="adm-imgs" style={{ marginBottom: 16 }}>
          {images.map((img, i) => (
            <div className="adm-img" key={img.path}>
              <div className="adm-img__frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.alt} loading="lazy" />
                {i === 0 && <span className="adm-badge adm-badge--ok adm-img__tag">Main</span>}
              </div>
              <div className="adm-img__body">
                <input type="text" value={img.alt} onChange={(e) => setAlt(i, e.target.value)} placeholder="Alt text (describe the photo)" aria-label={`Alt text for photo ${i + 1}`} />
                <div className="adm-img__ctrl">
                  <button type="button" className="adm-btn adm-btn--small" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move earlier">←</button>
                  <button type="button" className="adm-btn adm-btn--small" onClick={() => move(i, 1)} disabled={i === images.length - 1} aria-label="Move later">→</button>
                  {i !== 0 && <button type="button" className="adm-btn adm-btn--small" onClick={() => move(i, -i)}>Make main</button>}
                  <button type="button" className="adm-btn adm-btn--small adm-btn--danger" onClick={() => remove(i)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className={`adm-drop${over ? ' is-over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); upload(e.dataTransfer.files); }}
      >
        <p><strong>Drag photos here</strong> or</p>
        <button type="button" className="adm-btn" style={{ marginTop: 10 }} onClick={() => input.current?.click()} disabled={Boolean(busy)}>Choose files</button>
        <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
        <p className="adm-progress" role="status">{busy || 'JPG, PNG or WebP. Resized to 2000px and converted to WebP automatically.'}</p>
      </div>
      {error && <p className="adm-alert adm-alert--error" role="alert" style={{ marginTop: 12 }}>{error}</p>}
    </div>
  );
}
