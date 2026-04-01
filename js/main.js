/* main.js — Klub Abstynenta "NADZIEJA" v2 */
(function () {
  'use strict';

  /* ── Hamburger ── */
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  if (ham && mob) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mob.classList.toggle('open');
    });
  }
  function closeMob() {
    if (ham) ham.classList.remove('open');
    if (mob) mob.classList.remove('open');
  }
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMob));

  /* ── Fade-in on scroll ── */
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.07 }
  );
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* ── Lightbox ── */
  let lbPhotos = [], lbIdx = 0;
  const lbOverlay = document.getElementById('lbOverlay');
  const lbImg     = document.getElementById('lbImg');
  const lbCap     = document.getElementById('lbCap');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');

  window.openLb = function (photos, idx) {
    lbPhotos = photos; lbIdx = idx;
    _lbShow();
    lbOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  function _lbShow() {
    const p = lbPhotos[lbIdx];
    lbImg.src = typeof p === 'object' ? p.src : p;
    if (lbCap) lbCap.textContent = (typeof p === 'object' && p.cap) ? p.cap : '';
    if (lbPrev) lbPrev.style.display = lbPhotos.length < 2 ? 'none' : '';
    if (lbNext) lbNext.style.display = lbPhotos.length < 2 ? 'none' : '';
  }
  window.closeLb = function () {
    lbOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };
  window.lbPrev = function () { lbIdx = (lbIdx - 1 + lbPhotos.length) % lbPhotos.length; _lbShow(); };
  window.lbNext = function () { lbIdx = (lbIdx + 1) % lbPhotos.length; _lbShow(); };

  if (lbOverlay) {
    lbOverlay.addEventListener('click', e => { if (e.target === lbOverlay) window.closeLb(); });
  }
  document.addEventListener('keydown', e => {
    if (!lbOverlay || !lbOverlay.classList.contains('open')) {
      if (e.key === 'Escape') closeModal();
      return;
    }
    if (e.key === 'Escape') window.closeLb();
    if (e.key === 'ArrowLeft') window.lbPrev();
    if (e.key === 'ArrowRight') window.lbNext();
  });

  /* ── Event Modals ── */
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalContent  = document.getElementById('modalContent');

  window.openModal = function (eventId) {
    const tpl = document.getElementById('event-' + eventId);
    if (!tpl || !modalContent) return;
    modalContent.innerHTML = tpl.innerHTML;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Re-attach lazy loading
    modalContent.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src; img.removeAttribute('data-src');
    });
  };
  window.closeModal = function () {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (modalContent) modalContent.innerHTML = '';
  };
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', e => { if (e.target === modalBackdrop) window.closeModal(); });
  }

  /* ── Sticky nav shadow on scroll ── */
  const nav = document.querySelector('nav');
  if (nav) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          nav.style.boxShadow = window.scrollY > 10
            ? '0 4px 20px rgba(0,0,0,.10)'
            : '0 1px 3px rgba(0,0,0,.06)';
          ticking = false;
        });
        ticking = true;
      }
    });
  }
})();
