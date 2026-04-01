document.addEventListener('DOMContentLoaded', () => {

  /* ===== Tab Switching ===== */
  const btns   = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-content');

  function switchTab(id) {
    btns.forEach(b => b.classList.toggle('active', b.dataset.tab === id));
    panels.forEach(p => p.classList.toggle('active', p.id === 'tab-' + id));
    window.scrollTo({ top: document.getElementById('tabBar').offsetTop, behavior: 'smooth' });
    // re-observe reveals in the newly-visible tab
    setTimeout(observeReveals, 100);
  }

  btns.forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));

  // "What's Next" cards also switch tabs
  document.querySelectorAll('.next-card[data-goto]').forEach(c => {
    c.addEventListener('click', () => switchTab(c.dataset.goto));
  });

  /* ===== Scroll Reveal ===== */
  function observeReveals() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }

  observeReveals();
});
