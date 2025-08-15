// Year
document.addEventListener('DOMContentLoaded', () => {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  
    // Theme persistence
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    const savedAccent = localStorage.getItem('accent');
    if (savedTheme) body.classList.add(savedTheme);
    if (savedAccent === 'oxblood') body.classList.add('theme-oxblood');
  
    const themeBtn = document.getElementById('toggleTheme');
    const accentBtn = document.getElementById('toggleAccent');
    themeBtn && themeBtn.addEventListener('click', () => {
      const next = body.classList.contains('theme-parchment') ? '' : 'theme-parchment';
      body.classList.toggle('theme-parchment');
      localStorage.setItem('theme', next);
    });
    accentBtn && accentBtn.addEventListener('click', () => {
      body.classList.toggle('theme-oxblood');
      localStorage.setItem('accent', body.classList.contains('theme-oxblood') ? 'oxblood' : '');
    });
  
    // Filters (research page)
    const filters = Array.from(document.querySelectorAll('.filter'));
    const projects = Array.from(document.querySelectorAll('.project'));
    if (filters.length) {
      const apply = (tag) => {
        projects.forEach(p => {
          const tags = (p.dataset.tags || '').split(',').map(s => s.trim());
          const show = tag === 'all' || tags.includes(tag);
          p.style.display = show ? '' : 'none';
        });
      };
      filters.forEach(btn => btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        apply(btn.dataset.filter);
      }));
    }
  
    // Contact form → mailto
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const name = encodeURIComponent(fd.get('name'));
        const email = encodeURIComponent(fd.get('email'));
        const message = encodeURIComponent(fd.get('message'));
        const subject = `Inquiry from ${decodeURIComponent(name)}`;
        const bodyTxt = `Name: ${decodeURIComponent(name)}%0AEmail: ${decodeURIComponent(email)}%0A%0A${decodeURIComponent(message)}`;
        window.location.href = `mailto:danabiomath@fsu.edu?subject=${encodeURIComponent(subject)}&body=${bodyTxt}`;
      });
    }
  });