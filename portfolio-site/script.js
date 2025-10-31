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

  // Update social media icons in the footer
  const socialsContainer = document.querySelector('.socials');
  const icons = [
    { src: 'assets/icons/github.svg', alt: 'GitHub', link: 'https://github.com' },
    { src: 'assets/icons/instagram.svg', alt: 'Instagram', link: 'https://instagram.com' },
    { src: 'assets/icons/linkedin.svg', alt: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  icons.forEach(icon => {
    const a = document.createElement('a');
    a.href = icon.link;
    a.target = '_blank';
    const img = document.createElement('img');
    img.src = icon.src;
    img.alt = icon.alt;
    img.style.width = '24px'; // Set icon size
    img.style.height = '24px'; // Set icon size
    a.appendChild(img);
    socialsContainer.appendChild(a);
  });
})();