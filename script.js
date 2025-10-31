(function(){
  const btn = document.getElementById('themeToggle');
  const body = document.body;
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  // Theme handling
  const saved = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  if (saved === 'light') body.classList.add('light');
  btn.textContent = body.classList.contains('light') ? '🌙' : '☀️';

  btn.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    btn.textContent = isLight ? '🌙' : '☀️';
  });

  // Fake contact form submit
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Message sent successfully!');
    form.reset();
  });
})();
