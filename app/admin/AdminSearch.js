'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './_ui/Icon';

// Cmd/Ctrl+K quick-jump, like Shopify's search bar.
export default function AdminSearch({ items }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [hot, setHot] = useState(0);
  const ref = useRef(null);

  const results = useMemo(() => {
    const n = q.trim().toLowerCase();
    return (n ? items.filter((i) => `${i.label} ${i.hint}`.toLowerCase().includes(n)) : items.slice(0, 8)).slice(0, 9);
  }, [q, items]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); ref.current?.focus(); setOpen(true); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (href) => { setOpen(false); setQ(''); router.push(href); };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHot((h) => Math.min(h + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHot((h) => Math.max(h - 1, 0)); }
    if (e.key === 'Enter' && results[hot]) go(results[hot].href);
  };

  return (
    <div className="adm-search" role="search">
      <Icon name="search" size={16} />
      <input
        ref={ref}
        type="search"
        placeholder="Search"
        aria-label="Search the admin"
        value={q}
        onChange={(e) => { setQ(e.target.value); setHot(0); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={onKeyDown}
      />
      <kbd>⌘K</kbd>
      {open && results.length > 0 && (
        <div className="adm-search__results">
          {results.map((r, i) => (
            <a key={r.href + r.label} href={r.href} className={i === hot ? 'is-hot' : ''} onMouseDown={(e) => { e.preventDefault(); go(r.href); }}>
              {r.label}<small>{r.hint}</small>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
