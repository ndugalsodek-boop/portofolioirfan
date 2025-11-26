// Loader
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hidden'), 600);
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Custom cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Hover cursor
document.querySelectorAll('a, button, .cta, .arrow').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
});

// Parallax profile card
const profile = document.querySelector('[data-parallax]');
document.addEventListener('mousemove', (e) => {
  const rect = profile.getBoundingClientRect();
  const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
  const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
  profile.style.transform =
    `translate(${dx * 10}px, ${dy * 10}px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
});

// Reset parallax on leave
profile.addEventListener('mouseleave', () =>
  profile.style.transform = "translate(0,0) rotateX(0) rotateY(0)"
);

// Reveal scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Projects slider
const slidesEl = document.getElementById('slides');
const slideEls = [...slidesEl.children];
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const dotsWrap = document.getElementById('dots');
let index = 0;

function renderDots() {
  dotsWrap.innerHTML = "";
  slideEls.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot';
    d.onclick = () => goTo(i);
    if (i === index) d.classList.add('active');
    dotsWrap.appendChild(d);
  });
}

function update() {
  slidesEl.style.transform = `translateX(${-index * 338}px)`;
  [...dotsWrap.children].forEach((d, i) =>
    d.classList.toggle('active', i === index)
  );
}

function goTo(i) {
  index = Math.max(0, Math.min(i, slideEls.length - 1));
  update();
}

prev.onclick = () => goTo(index - 1);
next.onclick = () => goTo(index + 1);

// Contact form fake send
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.send-btn');
  btn.textContent = "Sending...";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "Sent!";
    e.target.reset();
    setTimeout(() => {
      btn.textContent = "Send Message";
      btn.disabled = false;
    }, 1500);
  }, 900);
});

// Smooth scroll to projects
document.getElementById('viewProjects').onclick = () =>
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
