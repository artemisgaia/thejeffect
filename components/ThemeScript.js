'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ThemeScript() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove('no-js');

    const cleanups = [];

    const listen = (el, evt, fn, opts) => {
      el.addEventListener(evt, fn, opts);
      cleanups.push(() => el.removeEventListener(evt, fn, opts));
    };

    /* ── Header scroll behaviour ── */
    const header = document.getElementById('site-header');
    const hero = document.querySelector('.hero');
    const isHeroPage = !!hero;
    if (header) {
      const updateHeader = () => {
        const y = window.scrollY;
        const scrolled = y > 50;
        header.classList.toggle('scrolled', scrolled);
        if (isHeroPage && hero) {
          const hBottom = hero.getBoundingClientRect().bottom;
          header.classList.toggle('hero-active', !scrolled && hBottom > 80);
        }
      };
      listen(window, 'scroll', updateHeader, { passive: true });
      if (isHeroPage) header.classList.add('hero-active');
      updateHeader();
    }

    /* ── Mobile nav ── */
    const menuBtn = document.getElementById('menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mOverlay = document.getElementById('mobile-overlay');
    const mClose = document.getElementById('mobile-close');
    const openMobile = () => {
      if (!mobileNav) return;
      mobileNav.classList.add('open'); mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    };
    const closeMobile = () => {
      if (!mobileNav) return;
      mobileNav.classList.remove('open'); mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    };
    if (menuBtn) listen(menuBtn, 'click', openMobile);
    if (mOverlay) listen(mOverlay, 'click', closeMobile);
    if (mClose) listen(mClose, 'click', closeMobile);
    if (mobileNav) {
      mobileNav.querySelectorAll('a').forEach((a) => listen(a, 'click', closeMobile));
      listen(mobileNav, 'keydown', (e) => { if (e.key === 'Escape') closeMobile(); });
    }

    /* ── Search popup ── */
    const searchBtn = document.getElementById('search-btn');
    const searchPopup = document.getElementById('search-popup');
    const searchClose = document.getElementById('search-close');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-popup-input');
    const openSearch = () => {
      if (!searchPopup) return;
      closeMobile();
      searchPopup.classList.add('open'); searchPopup.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (searchInput) setTimeout(() => searchInput.focus(), 80);
    };
    const closeSearch = () => {
      if (!searchPopup) return;
      searchPopup.classList.remove('open'); searchPopup.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    if (searchBtn) listen(searchBtn, 'click', openSearch);
    if (searchClose) listen(searchClose, 'click', closeSearch);
    if (searchOverlay) listen(searchOverlay, 'click', closeSearch);

    /* ── Keyboard shortcuts ── */
    const onKeyDown = (e) => {
      if (e.key === 'Escape') { closeSearch(); closeMobile(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    };
    listen(document, 'keydown', onKeyDown);

    /* ── Accordions ── */
    document.querySelectorAll('.accordion__btn').forEach((btn) => {
      listen(btn, 'click', function () {
        const acc = this.closest('.accordion');
        const isOpen = acc.classList.contains('is-open');
        document.querySelectorAll('.accordion.is-open').forEach((a) => {
          a.classList.remove('is-open');
          const b = a.querySelector('.accordion__btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) { acc.classList.add('is-open'); this.setAttribute('aria-expanded', 'true'); }
      });
    });

    /* ── Collection filters ── */
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn) => {
      listen(btn, 'click', function () {
        filterBtns.forEach((b) => b.classList.remove('is-active'));
        this.classList.add('is-active');
        const filter = this.dataset.filter || 'all';
        document.querySelectorAll('.product-card').forEach((card) => {
          if (filter === 'all') { card.style.display = ''; return; }
          const type = (card.dataset.type || '').toLowerCase();
          card.style.display = type.indexOf(filter) !== -1 ? '' : 'none';
        });
      });
    });

    /* ── Scroll reveal (with MutationObserver for client navigation) ── */
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } }),
        { threshold: 0.06, rootMargin: '0px 0px -28px 0px' }
      );
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => io.observe(el));

      const mo = new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const node of m.addedNodes) {
            if (node.nodeType !== 1) continue;
            if (node.classList?.contains('reveal') && !node.classList.contains('revealed')) {
              io.observe(node);
            }
            node.querySelectorAll?.('.reveal:not(.revealed)')?.forEach((el) => io.observe(el));
          }
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
      cleanups.push(() => { io.disconnect(); mo.disconnect(); });

      // Safety net: if IntersectionObserver never fires (broken viewport
      // state, extensions, edge-case browsers), force-reveal everything
      // after a short delay so content is never stuck invisible.
      const fallback = setTimeout(() => {
        document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => el.classList.add('revealed'));
      }, 1500);
      cleanups.push(() => clearTimeout(fallback));
    } else {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
    }

    /* ── Sticky ATC bar ── */
    const stickyBar = document.querySelector('.sticky-bar');
    if (stickyBar) {
      listen(window, 'scroll', () => {
        stickyBar.classList.toggle('show', window.scrollY > window.innerHeight * 0.65);
      }, { passive: true });
    }

    /* ── Product gallery swiper (mobile) ── */
    const swiper = document.getElementById('gallery-swiper');
    const dots = Array.from(document.querySelectorAll('.product-gallery__dot'));
    const thumbs = Array.from(document.querySelectorAll('.product-gallery__thumb'));
    if (swiper && dots.length > 0) {
      listen(swiper, 'scroll', function () {
        const idx = Math.round(this.scrollLeft / this.offsetWidth);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        thumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
      }, { passive: true });
      dots.forEach((dot) => {
        listen(dot, 'click', function () {
          const idx = parseInt(this.dataset.index || 0);
          swiper.scrollTo({ left: idx * swiper.offsetWidth, behavior: 'smooth' });
        });
      });
    }
    thumbs.forEach((thumb) => {
      listen(thumb, 'click', function () {
        const idx = parseInt(this.dataset.index || 0);
        if (swiper) swiper.scrollTo({ left: idx * swiper.offsetWidth, behavior: 'smooth' });
        thumbs.forEach((t) => t.classList.remove('active'));
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        this.classList.add('active');
      });
    });

    return () => { cleanups.forEach((fn) => fn()); };
  }, [pathname]);

  return null;
}
