// Minimal outline icon set (24px grid, 1.6 stroke) used across the admin.
const P = {
  home: 'M3 10.5 12 3l9 7.5M5 9.5V20h5v-5h4v5h5V9.5',
  orders: 'M4 6h16v12H4zM4 10h16M8 14h3',
  tag: 'M3 12V4h8l10 10-8 8zM7.5 8.5h.01',
  users: 'M16 20v-1.5a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.3M15.5 4.2a3.5 3.5 0 0 1 0 6.6',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20a8 8 0 0 1 16 0',
  growth: 'M4 20V10M10 20V4M16 20v-8M22 20H2',
  percent: 'M19 5 5 19M7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  content: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  chart: 'M4 4v16h16M8 16v-4M12 16V8M16 16v-6',
  store: 'M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9M10 20v-5h4v5',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 13a7.7 7.7 0 0 0 0-2l2-1.5-2-3.5-2.3.9a7.6 7.6 0 0 0-1.7-1L15 3.4h-4l-.4 2.5a7.6 7.6 0 0 0-1.7 1l-2.3-.9-2 3.5 2 1.5a7.7 7.7 0 0 0 0 2l-2 1.5 2 3.5 2.3-.9a7.6 7.6 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7.6 7.6 0 0 0 1.7-1l2.3.9 2-3.5z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
  back: 'M15 5l-7 7 7 7',
  plus: 'M12 5v14M5 12h14',
  truck: 'M2 6h11v10H2zM13 9h4l3 3v4h-7M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  box: 'M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8',
  gift: 'M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7c-2 0-4-.5-4-2.5S10 2 12 5c2-3 4-1.5 4 .5S14 7 12 7z',
  building: 'M4 21V6l8-3v18M12 21V10l8 3v8M8 9h.01M8 13h.01M8 17h.01M16 15h.01M16 18h.01',
  card: 'M3 6h18v12H3zM3 10h18M7 15h3',
  layers: 'M12 3 3 8l9 5 9-5zM3 13l9 5 9-5',
  clipboard: 'M9 4h6v3H9zM7 5H5v16h14V5h-2M9 12h6M9 16h6',
  swap: 'M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7',
  image: 'M3 5h18v14H3zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 16l-5-5-8 8',
  menu: 'M4 7h16M4 12h16M4 17h10',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1',
  cart: 'M3 4h2l2.5 11h10L20 7H6M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  theme: 'M3 4h18v12H3zM8 20h8M12 16v4',
  pos: 'M5 3h14v18H5zM9 7h6M9 11h.01M12 11h.01M15 11h.01M9 15h.01M12 15h.01M15 15h.01',
  pin: 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  bell: 'M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7zM10 20a2 2 0 0 0 4 0',
  shield: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z',
  doc: 'M6 3h9l4 4v14H6zM14 3v5h5',
  plug: 'M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0zM12 18v3',
  receipt: 'M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2zM9 8h6M9 12h6',
  plan: 'M12 3l2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.3 9.4l6-.9z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  pulse: 'M3 12h4l3-8 4 16 3-8h4',
  mail: 'M3 5h18v14H3zM3 7l9 7 9-7',
  code: 'M9 7l-5 5 5 5M15 7l5 5-5 5',
  lang: 'M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c-1 4-4 7-7 8M13 21l4-10 4 10M14.5 18h5',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
  check: 'M5 12l4.5 4.5L19 7',
  external: 'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6',
  database: 'M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
};

export default function Icon({ name, size = 18, className = '', title }) {
  const d = P[name] || P.grid;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} aria-label={title}>
      <path d={d} />
    </svg>
  );
}
export const ICON_NAMES = Object.keys(P);
