const body = document.body;
const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

const closeMenu = () => {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  body.classList.remove('menu-open');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  mobileMenu.classList.toggle('is-open', !isOpen);
  mobileMenu.setAttribute('aria-hidden', String(isOpen));
  body.classList.toggle('menu-open', !isOpen);
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

let lastScroll = 0;
const handleHeader = () => {
  const currentScroll = window.scrollY;
  header?.classList.toggle('is-scrolled', currentScroll > 46);
  lastScroll = currentScroll;
};
window.addEventListener('scroll', handleHeader, { passive: true });
handleHeader();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const parallaxItems = document.querySelectorAll('[data-parallax]');
if (!reduceMotion && parallaxItems.length) {
  let ticking = false;
  const updateParallax = () => {
    const viewport = window.innerHeight;
    parallaxItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < viewport) {
        const intensity = Number(item.dataset.parallax || 0.1);
        const offset = (rect.top - viewport / 2) * intensity;
        item.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateParallax); ticking = true; }
  }, { passive: true });
}

const comparison = document.querySelector('[data-comparison]');
const range = comparison?.querySelector('.comparison-range');
const beforeImage = comparison?.querySelector('.comparison-before');
const handle = comparison?.querySelector('[data-handle]');
const updateComparison = (value) => {
  if (!beforeImage || !handle) return;
  beforeImage.style.width = `${value}%`;
  handle.style.left = `${value}%`;
};
range?.addEventListener('input', (event) => updateComparison(event.target.value));
updateComparison(range?.value || 54);

const track = document.querySelector('[data-testimonial-track]');
const cards = track ? [...track.children] : [];
const prev = document.querySelector('[data-prev]');
const next = document.querySelector('[data-next]');
const slideCount = document.querySelector('[data-slide-count]');
let activeSlide = 0;
const getVisibleSlides = () => window.innerWidth <= 600 ? 1 : window.innerWidth <= 1000 ? 2 : 3;
const updateCarousel = () => {
  if (!track || !cards.length) return;
  const visible = getVisibleSlides();
  const maxIndex = Math.max(0, cards.length - visible);
  activeSlide = Math.min(activeSlide, maxIndex);
  const gap = parseFloat(getComputedStyle(track).gap) || 18;
  const width = cards[0].getBoundingClientRect().width + gap;
  track.style.transform = `translateX(-${activeSlide * width}px)`;
  if (slideCount) slideCount.textContent = `${String(activeSlide + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
};
prev?.addEventListener('click', () => { activeSlide = Math.max(0, activeSlide - 1); updateCarousel(); });
next?.addEventListener('click', () => { activeSlide = Math.min(cards.length - getVisibleSlides(), activeSlide + 1); updateCarousel(); });
window.addEventListener('resize', updateCarousel);
updateCarousel();

const counters = document.querySelectorAll('[data-counter]');
if ('IntersectionObserver' in window && !reduceMotion) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.counter);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1500;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(target * eased);
        el.textContent = `${prefix}${value.toLocaleString('pt-BR')}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((counter) => counterObserver.observe(counter));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
});
