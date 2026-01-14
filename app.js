document.getElementById('y').textContent = new Date().getFullYear();

window.openPost = function(){
  document.getElementById('postOverlay').classList.add('active');
}
window.closePost = function(){
  document.getElementById('postOverlay').classList.remove('active');
}
window.overlayClickClose = function(e){
  if (e.target && e.target.id === 'postOverlay') closePost();
}

document.addEventListener('keydown', function(e){
  if (e.key === 'Escape') closePost();
});

// Scroll Reveal
(function initReveal(){
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();

// Hero Parallax
(function initParallax(){
  const photo = document.querySelector('.hero-photo');
  const heroTitle = document.querySelector('.hero h1');
  const heroSub = document.querySelector('.hero .sub');
  if (!photo && !heroTitle) return;

  let ticking = false;

  function onScroll(){
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const y = window.scrollY || 0;

      if (photo) {
        const imgOffset = Math.min(24, y * 0.06);
        photo.style.transform = `translateY(${imgOffset}px)`;
      }

      const t = Math.min(14, y * 0.03);
      const o = Math.max(0.92, 1 - y / 1200);

      if (heroTitle) {
        heroTitle.style.transform = `translateY(${t}px)`;
        heroTitle.style.opacity = String(o);
      }
      if (heroSub) {
        heroSub.style.transform = `translateY(${t}px)`;
        heroSub.style.opacity = String(o);
      }

      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
