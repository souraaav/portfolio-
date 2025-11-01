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

  // Update form handling
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    
    try {
      // Add your form submission logic here
      // For now, just simulate a delay
      await new Promise(r => setTimeout(r, 1000));
      alert('Message sent successfully!');
      form.reset();
    } catch (err) {
      alert('Failed to send message. Please try again.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send message';
    }
  });
})();
