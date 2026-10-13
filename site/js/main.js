document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  /* ---------- Dark mode ---------- */
  window.toggleDark = function () {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('icon-sun').classList.toggle('hidden', !isDark);
    document.getElementById('icon-moon').classList.toggle('hidden', isDark);
    lucide.createIcons();
  };
  if (localStorage.getItem('theme') === 'dark') window.toggleDark();

  /* ---------- Mobile menu ---------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  mobileMenu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'))
  );

  /* ---------- Scroll fade-in ---------- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* ---------- Scroll: navbar, progress bar, back-to-top ---------- */
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    document.getElementById('navbar').classList.toggle('shadow-md', scrollTop > 50);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById('scroll-progress').style.width = ((scrollTop / docHeight) * 100) + '%';
    document.getElementById('back-to-top').classList.toggle('visible', scrollTop > 400);
  });

  /* ---------- Animated counters ---------- */
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const isDecimal = el.dataset.decimal;
      const steps = 60, duration = 1500;
      let current = 0;
      const timer = setInterval(() => {
        current += target / steps;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
      }, duration / steps);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

  /* ---------- Open / closed badge ---------- */
  function updateClinicStatus() {
    const now = new Date();
    const day = now.getDay(); // 0=Sun ... 6=Sat
    const time = now.getHours() + now.getMinutes() / 60;
    let isOpen = false;
    if (day >= 1 && day <= 5) isOpen = (time >= 9 && time < 18.5); // 9:00 - 18:30
    else if (day === 6)       isOpen = (time >= 9 && time < 16);   // 9:00 - 16:00
    const statusEl = document.getElementById('clinic-status');
    const dotEl = document.getElementById('status-dot');
    const textEl = document.getElementById('status-text');
    const base = 'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ';
    if (isOpen) {
      statusEl.className = base + 'status-open';
      dotEl.className = 'w-2 h-2 rounded-full bg-green-500 animate-pulse';
      textEl.textContent = 'Open Now';
    } else {
      statusEl.className = base + 'status-closed';
      dotEl.className = 'w-2 h-2 rounded-full bg-red-500';
      textEl.textContent = 'Closed Now';
    }
  }
  updateClinicStatus();

  /* ---------- FAQ accordion ---------- */
  window.toggleFaq = function (btn) {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').classList.remove('open');
    });
    if (!wasOpen) { item.classList.add('open'); answer.classList.add('open'); }
    lucide.createIcons();
  };

  /* ---------- Lightbox ---------- */
  const galleryImages = [
    'Images/Clinic2.jpeg', 'Images/Clinic3.jpeg', 'Images/Clinic4.jpeg',
    'Images/Clinic5.jpeg', 'Images/Clinic6.jpeg'
  ];
  let currentLightboxIndex = 0;
  window.openLightbox = function (index) {
    currentLightboxIndex = index;
    document.getElementById('lightbox-img').src = galleryImages[index];
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  window.closeLightbox = function () {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
  };
  window.closeLightboxOutside = function (e) { if (e.target.id === 'lightbox') window.closeLightbox(); };
  window.lightboxNav = function (dir) {
    currentLightboxIndex = (currentLightboxIndex + dir + galleryImages.length) % galleryImages.length;
    document.getElementById('lightbox-img').src = galleryImages[currentLightboxIndex];
  };
  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    if (e.key === 'Escape')     window.closeLightbox();
    if (e.key === 'ArrowLeft')  window.lightboxNav(-1);
    if (e.key === 'ArrowRight') window.lightboxNav(1);
  });

  /* ---------- Before / After toggle ---------- */
  window.toggleComparison = function (button, imageId) {
    const img = document.getElementById(imageId);
    img.style.opacity = 0;
    setTimeout(() => {
      if (img.dataset.state === 'after') {
        img.src = img.dataset.before;
        img.dataset.state = 'before';
        button.innerHTML = '👁 View After';
      } else {
        img.src = img.dataset.after;
        img.dataset.state = 'after';
        button.innerHTML = '👁 View Before';
      }
      img.style.opacity = 1;
    }, 200);
  };
});