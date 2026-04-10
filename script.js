document.addEventListener('DOMContentLoaded', () => {

  /* ===== Tab Switching ===== */
  const btns   = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-content');

  function switchTab(id) {
    // Activate the right tab button
    btns.forEach(b => b.classList.toggle('active', b.dataset.tab === id));

    // Show the right panel
    panels.forEach(p => p.classList.toggle('active', p.id === 'tab-' + id));

    // Keep story-map node highlight in sync
    document.querySelectorAll('.story-map-node').forEach(n => {
      n.classList.toggle('active', n.dataset.goto === id);
    });

    // Scroll to tab bar
    window.scrollTo({ top: document.getElementById('tabBar').offsetTop, behavior: 'smooth' });

    // Trigger reveal animations in the newly-visible panel
    setTimeout(observeReveals, 100);
  }

  // Tab bar buttons
  btns.forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));

  // All [data-goto] elements: nav prev/next buttons + story-map nodes
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => switchTab(el.dataset.goto));
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
