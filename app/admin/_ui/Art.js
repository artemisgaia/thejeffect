// Flat Shopify-style illustrations for empty states (inline SVG, no assets).
const ART = {
  orders: <><rect x="28" y="18" width="64" height="84" rx="6" fill="#f1f1f1" stroke="#d4d4d4"/><rect x="38" y="30" width="30" height="8" rx="2" fill="#303030"/><rect x="38" y="46" width="44" height="4" rx="2" fill="#c9c9c9"/><rect x="38" y="56" width="36" height="4" rx="2" fill="#c9c9c9"/><circle cx="82" cy="84" r="22" fill="#5aa889"/><path d="M72 84l7 7 12-14" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  cart: <><path d="M22 30h14l10 44h46l10-32H44" fill="#f1f1f1" stroke="#303030" strokeWidth="3" strokeLinejoin="round"/><circle cx="54" cy="90" r="6" fill="#303030"/><circle cx="86" cy="90" r="6" fill="#303030"/><circle cx="92" cy="34" r="16" fill="#e85d4a"/><path d="M85 27l14 14M99 27L85 41" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></>,
  layers: <><path d="M60 16 20 38l40 22 40-22z" fill="#5aa889"/><path d="M20 56l40 22 40-22" stroke="#303030" strokeWidth="3" fill="none"/><path d="M20 74l40 22 40-22" stroke="#c9c9c9" strokeWidth="3" fill="none"/></>,
  clipboard: <><rect x="30" y="20" width="60" height="82" rx="6" fill="#f1f1f1" stroke="#303030" strokeWidth="3"/><rect x="46" y="12" width="28" height="14" rx="4" fill="#303030"/><path d="M42 54h36M42 68h36M42 82h22" stroke="#8a8a8a" strokeWidth="4" strokeLinecap="round"/></>,
  swap: <><rect x="14" y="34" width="38" height="52" rx="6" fill="#e3e3e3"/><rect x="68" y="34" width="38" height="52" rx="6" fill="#e3e3e3"/><circle cx="60" cy="60" r="14" fill="#2d8f5f"/><path d="M53 60h14M62 54l6 6-6 6" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  gift: <><rect x="22" y="48" width="76" height="52" rx="6" fill="#5aa889"/><rect x="16" y="34" width="88" height="20" rx="5" fill="#2d8f5f"/><rect x="54" y="34" width="12" height="66" fill="#fff" opacity=".85"/><path d="M60 34c-8-14-22-10-18-2s18 2 18 2zM60 34c8-14 22-10 18-2s-18 2-18 2z" fill="none" stroke="#303030" strokeWidth="3"/></>,
  users: <><circle cx="44" cy="44" r="14" fill="#303030"/><path d="M18 96c0-18 12-28 26-28s26 10 26 28z" fill="#303030"/><circle cx="82" cy="50" r="11" fill="#8a8a8a"/><path d="M64 96c0-14 8-22 18-22s18 8 18 22z" fill="#8a8a8a"/></>,
  building: <><rect x="26" y="24" width="48" height="76" rx="4" fill="#e3e3e3" stroke="#303030" strokeWidth="3"/><rect x="74" y="50" width="26" height="50" rx="4" fill="#5aa889"/><path d="M38 40h8M54 40h8M38 56h8M54 56h8M38 72h8M54 72h8" stroke="#303030" strokeWidth="4" strokeLinecap="round"/></>,
  menu: <><rect x="20" y="28" width="80" height="64" rx="8" fill="#f1f1f1" stroke="#303030" strokeWidth="3"/><path d="M32 46h56M32 60h56M32 74h34" stroke="#303030" strokeWidth="4" strokeLinecap="round"/></>,
  content: <><rect x="26" y="16" width="68" height="88" rx="6" fill="#f1f1f1" stroke="#303030" strokeWidth="3"/><rect x="36" y="28" width="48" height="26" rx="3" fill="#5aa889"/><path d="M36 66h48M36 78h48M36 90h28" stroke="#8a8a8a" strokeWidth="4" strokeLinecap="round"/></>,
  database: <><ellipse cx="60" cy="32" rx="34" ry="12" fill="#5aa889"/><path d="M26 32v56c0 7 15 12 34 12s34-5 34-12V32" fill="#f1f1f1" stroke="#303030" strokeWidth="3"/><path d="M26 60c0 7 15 12 34 12s34-5 34-12" stroke="#303030" strokeWidth="3" fill="none"/></>,
  image: <><rect x="18" y="26" width="84" height="68" rx="8" fill="#f1f1f1" stroke="#303030" strokeWidth="3"/><circle cx="46" cy="52" r="8" fill="#5aa889"/><path d="M22 90l28-26 18 16 14-12 20 18" stroke="#303030" strokeWidth="3" fill="none" strokeLinejoin="round"/></>,
  globe: <><circle cx="60" cy="60" r="38" fill="#e9f5ef" stroke="#303030" strokeWidth="3"/><path d="M22 60h76M60 22c-16 18-16 58 0 76M60 22c16 18 16 58 0 76" stroke="#303030" strokeWidth="3" fill="none"/></>,
  doc: <><rect x="28" y="16" width="64" height="88" rx="6" fill="#f1f1f1" stroke="#303030" strokeWidth="3"/><path d="M40 40h40M40 54h40M40 68h40M40 82h24" stroke="#8a8a8a" strokeWidth="4" strokeLinecap="round"/></>,
  pin: <><path d="M60 104s32-26 32-52a32 32 0 1 0-64 0c0 26 32 52 32 52z" fill="#5aa889" stroke="#303030" strokeWidth="3"/><circle cx="60" cy="52" r="11" fill="#fff"/></>,
  discount: <><rect x="20" y="30" width="80" height="60" rx="8" fill="#f5c46b"/><circle cx="46" cy="58" r="8" fill="#fff"/><circle cx="74" cy="64" r="8" fill="#fff"/><path d="M78 46 42 76" stroke="#303030" strokeWidth="4" strokeLinecap="round"/></>,
  box: <><path d="M60 16 100 36v44L60 102 20 80V36z" fill="#e9f5ef" stroke="#303030" strokeWidth="3" strokeLinejoin="round"/><path d="M20 36l40 22 40-22M60 58v44" stroke="#303030" strokeWidth="3" fill="none"/></>,
};

export default function Art({ name = 'box' }) {
  return (
    <svg className="adm-art" viewBox="0 0 120 120" role="img" aria-hidden="true">
      {ART[name] || ART.box}
    </svg>
  );
}
