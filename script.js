/* =============================================
   PORTFOLIO JAVASCRIPT
   Loader, Custom Cursor, Scroll Animations, Nav, Form, Scroll Dots
   ============================================= */

// ── LOADER ──
(function () {
  const loader = document.getElementById('loader');
  const pct = document.getElementById('loaderPct');
  const bar = document.querySelector('.loader-bar');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 12 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.cursor = 'none';
        triggerHeroReveal();
      }, 400);
    }
    pct.textContent = Math.floor(progress) + '%';
    bar.style.width = progress + '%';
  }, 80);
})();

function triggerHeroReveal() {
  const heroEls = document.querySelectorAll('#hero .reveal');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120);
  });
}

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursor-dot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
  // Show cursor on first move
  if (cursor.style.opacity === '0' || !cursor.style.opacity) {
    cursor.style.opacity = '1';
    dot.style.opacity = '1';
  }
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .tech-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── MOBILE MENU ──
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = menuToggle.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
});

function closeMobileMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  const spans = menuToggle.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.transform = '';
}

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section').forEach(section => {
  const revealEls = section.querySelectorAll('.reveal');
  revealEls.forEach((el, i) => {
    el.dataset.delay = i * 100;
    revealObserver.observe(el);
  });
});

// ── SCROLL DOTS ──
const scrollDots = document.querySelectorAll('.scroll-dot');
const dotSections = ['hero', 'about', 'skills', 'projects', 'contact'];

function updateScrollDots() {
  const scrollPos = window.scrollY + window.innerHeight * 0.4;
  let activeIdx = 0;

  dotSections.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.offsetTop <= scrollPos) {
      activeIdx = i;
    }
  });

  scrollDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIdx);
  });
}

window.addEventListener('scroll', updateScrollDots, { passive: true });
updateScrollDots();

// ── SMOOTH ACTIVE NAV LINKS ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.style.color = '');
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.style.color = 'var(--text)';
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// ── EMAILJS INIT ──
(function () {
  emailjs.init("AVDU3AdUIxdK5qM81");
})();

// ── FORM SUBMIT (EmailJS) ──
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  const error = document.getElementById('formError');

  const originalBtnHTML = btn.innerHTML;
  btn.textContent = 'Sending...';
  btn.disabled = true;
  error.style.display = 'none';
  success.style.display = 'none';

  emailjs.sendForm('service_ii482p4', 'template_z3ub0x5', form)
    .then(() => {
      btn.style.display = 'none';
      success.style.display = 'block';
      form.reset();
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      btn.innerHTML = originalBtnHTML;
      btn.disabled = false;
      error.style.display = 'block';
    });
}

// ── PARALLAX HERO BG TEXT ──
const bgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (bgText) {
    const scrolled = window.scrollY;
    bgText.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
  }
});

// ── FLOATING CARDS PARALLAX ──
document.addEventListener('mousemove', e => {
  const cards = document.querySelectorAll('.floating-card');
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  cards.forEach((card, i) => {
    const factor = i % 2 === 0 ? 1 : -1;
    // Apply subtle additional parallax via CSS variable approach
    card.style.setProperty('--px', `${x * factor * 0.3}px`);
    card.style.setProperty('--py', `${y * factor * 0.3}px`);
  });
});

// ── SMOOTH COUNTER ANIMATION ──
function animateCounter(el, target, duration = 2500) {
  el.textContent = '0+';
  const stepTime = duration / target;
  let current = 0;
  const tick = () => {
    current++;
    el.textContent = current + '+';
    if (current < target) {
      setTimeout(tick, stepTime);
    }
  };
  setTimeout(tick, stepTime);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const val = parseInt(num.textContent);
        if (!isNaN(val)) animateCounter(num, val);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// Tech stack icon fallback — hide broken icon images gracefully
document.querySelectorAll('.tech-card img').forEach(img => {
  img.addEventListener('error', () => { img.style.display = 'none'; }, { once: true });
});
// ── STAR FIELD ANIMATION ──
(function () {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, stars = [], shootingStars = [];
  const STAR_COUNT = 220;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: randBetween(0.3, 1.6),
      alpha: randBetween(0.3, 1),
      speed: randBetween(0.002, 0.008),
      phase: Math.random() * Math.PI * 2,
      drift: randBetween(-0.04, 0.04),
    };
  }

  function createShootingStar() {
    const startX = Math.random() * W;
    const startY = Math.random() * H * 0.5;
    return {
      x: startX, y: startY,
      len: randBetween(80, 200),
      speed: randBetween(8, 16),
      angle: Math.PI / 4 + randBetween(-0.2, 0.2),
      alpha: 1,
      active: true,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: STAR_COUNT }, createStar);
  }

  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, W, H);
    frame++;

    // Occasionally spawn a shooting star
    if (Math.random() < 0.003 && shootingStars.length < 3) {
      shootingStars.push(createShootingStar());
    }

    // Draw regular stars
    stars.forEach(s => {
      s.phase += s.speed;
      s.x += s.drift;
      if (s.x < 0) s.x = W;
      if (s.x > W) s.x = 0;
      const twinkle = 0.5 + 0.5 * Math.sin(s.phase);
      const a = s.alpha * twinkle;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
    });

    // Draw shooting stars
    shootingStars = shootingStars.filter(ss => {
      if (!ss.active) return false;
      const tail = {
        x: ss.x - Math.cos(ss.angle) * ss.len,
        y: ss.y - Math.sin(ss.angle) * ss.len,
      };
      const grad = ctx.createLinearGradient(tail.x, tail.y, ss.x, ss.y);
      grad.addColorStop(0, `rgba(255,255,255,0)`);
      grad.addColorStop(0.7, `rgba(167,139,250,${ss.alpha * 0.6})`);
      grad.addColorStop(1, `rgba(255,255,255,${ss.alpha})`);

      ctx.beginPath();
      ctx.moveTo(tail.x, tail.y);
      ctx.lineTo(ss.x, ss.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.alpha -= 0.018;
      if (ss.alpha <= 0 || ss.x > W + 100 || ss.y > H + 100) ss.active = false;
      return ss.active;
    });
  }

  window.addEventListener('resize', () => {
    resize();
    stars = Array.from({ length: STAR_COUNT }, createStar);
  });

  init();
  animate();
})();