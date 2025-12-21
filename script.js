// Mobile nav
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger?.addEventListener('click', () => {
  const open = nav.style.display === 'block';
  nav.style.display = open ? 'none' : 'block';
});

// Smooth scroll highlight (basic)
const links = document.querySelectorAll('.nav__link');
links.forEach(link => {
  link.addEventListener('click', e => {
    // Close mobile nav after click
    if (window.innerWidth < 720) nav.style.display = 'none';
  });
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Counters
const counters = document.querySelectorAll('.stat__number[data-target]');
const observeCounters = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.getAttribute('data-target'));
    let current = 0;
    const step = Math.ceil(target / 60);
    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target.toString();
      } else {
        el.textContent = current.toString();
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
    observeCounters.unobserve(el);
  });
}, { threshold: 0.3 });
counters.forEach(c => observeCounters.observe(c));

// Modal
const playBtn = document.getElementById('playVideo');
const modal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');
const backdrop = document.getElementById('modalBackdrop');

function openModal() { modal.classList.add('open'); }
function hideModal() { modal.classList.remove('open'); }

playBtn?.addEventListener('click', openModal);
closeModal?.addEventListener('click', hideModal);
backdrop?.addEventListener('click', hideModal);

// Projects filter
const filterBtns = document.querySelectorAll('.filter__btn');
const cards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.getAttribute('data-filter');
    cards.forEach(card => {
      const c = card.getAttribute('data-cat');
      const show = cat === 'all' || c === cat;
      card.style.display = show ? 'flex' : 'none';
    });
  });
});

// Testimonials carousel
const track = document.querySelector('.carousel__track');
const slides = document.querySelectorAll('.testimonial');
let index = 0;

function updateCarousel() {
  const width = track.clientWidth;
  track.style.transform = `translateX(-${index * width}px)`;
}
window.addEventListener('resize', updateCarousel);
updateCarousel();

document.getElementById('prev')?.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
});
document.getElementById('next')?.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  updateCarousel();
});

// Prevent default submit (demo)
document.querySelector('.contact__form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thanks! Your message was not actually sent (demo site).');
});
