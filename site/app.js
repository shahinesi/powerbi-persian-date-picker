(() => {
  const sidebar = document.querySelector('[data-sidebar]');
  const menu = document.querySelector('[data-menu]');
  const search = document.querySelector('[data-search]');
  const links = [...document.querySelectorAll('[data-toc] a')];
  const sections = [...document.querySelectorAll('[data-section]')];

  menu?.addEventListener('click', () => sidebar?.classList.toggle('open'));
  links.forEach((link) => link.addEventListener('click', () => sidebar?.classList.remove('open')));

  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      sections.forEach((section) => {
        const text = `${section.textContent || ''} ${section.dataset.searchText || ''}`.toLowerCase();
        section.classList.toggle('search-hidden', Boolean(q) && !text.includes(q));
      });
      links.forEach((link) => {
        const target = document.querySelector(link.getAttribute('href'));
        link.classList.toggle('search-hidden', Boolean(target?.classList.contains('search-hidden')));
      });
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-15% 0px -70% 0px', threshold: [0, .2, .5, 1] });
    sections.forEach((section) => observer.observe(section));
  }
})();
