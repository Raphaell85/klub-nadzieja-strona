(function(){
  'use strict';

  /* Hamburger */
  var ham = document.getElementById('hamburger');
  var mob = document.getElementById('mobileMenu');
  if(ham && mob){
    ham.addEventListener('click', function(){
      ham.classList.toggle('open');
      mob.classList.toggle('open');
    });
  }
  function closeMob(){ if(ham)ham.classList.remove('open'); if(mob)mob.classList.remove('open'); }
  document.querySelectorAll('.mobile-menu a').forEach(function(a){ a.addEventListener('click', closeMob); });
  window.closeMob = closeMob;

  /* Fade-in */
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.07 });
  document.querySelectorAll('.fade-in').forEach(function(el){ obs.observe(el); });

  /* Lightbox */
  var lbPhotos=[], lbIdx=0;
  var lbOverlay = document.getElementById('lbOverlay');
  var lbImg     = document.getElementById('lbImg');
  var lbCap     = document.getElementById('lbCap');

  function lbShow(){
    var p = lbPhotos[lbIdx];
    lbImg.src = typeof p==='object' ? p.src : p;
    if(lbCap) lbCap.textContent = (typeof p==='object' && p.cap) ? p.cap : '';
    var prev = document.getElementById('lbPrev');
    var next = document.getElementById('lbNext');
    var hide = lbPhotos.length < 2;
    if(prev) prev.style.display = hide ? 'none' : '';
    if(next) next.style.display = hide ? 'none' : '';
  }
  window.openLb = function(photos, idx){
    lbPhotos = photos; lbIdx = idx;
    lbShow();
    lbOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeLb = function(){
    lbOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };
  window.lbPrev = function(){ lbIdx=(lbIdx-1+lbPhotos.length)%lbPhotos.length; lbShow(); };
  window.lbNext = function(){ lbIdx=(lbIdx+1)%lbPhotos.length; lbShow(); };
  if(lbOverlay) lbOverlay.addEventListener('click', function(e){ if(e.target===lbOverlay) window.closeLb(); });

  /* Modal */
  var modalBackdrop = document.getElementById('modalBackdrop');
  var modalContent  = document.getElementById('modalContent');
  window.openModal = function(id){
    var tpl = document.getElementById('event-'+id);
    if(!tpl || !modalContent) return;
    modalContent.innerHTML = tpl.innerHTML;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeModal = function(){
    if(!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    if(modalContent) modalContent.innerHTML = '';
  };
  if(modalBackdrop) modalBackdrop.addEventListener('click', function(e){ if(e.target===modalBackdrop) window.closeModal(); });

  /* Keyboard */
  document.addEventListener('keydown', function(e){
    if(lbOverlay && lbOverlay.classList.contains('open')){
      if(e.key==='Escape') window.closeLb();
      if(e.key==='ArrowLeft') window.lbPrev();
      if(e.key==='ArrowRight') window.lbNext();
      return;
    }
    if(e.key==='Escape') window.closeModal();
  });

  /* Nav shadow on scroll */
  var nav = document.querySelector('nav');
  if(nav){
    window.addEventListener('scroll', function(){
      nav.style.boxShadow = window.scrollY > 8
        ? '0 4px 20px rgba(13,46,20,.12)'
        : '0 1px 3px rgba(13,46,20,.07)';
    }, { passive: true });
  }
})();
