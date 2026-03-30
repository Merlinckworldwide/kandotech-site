/* ═══════════════════════════════════════════
   KandoTech Solutions — script.js
   ═══════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────
   1. LOADER
───────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');
  const text = document.getElementById('loaderText');
  const messages = ['Initializing…', 'Loading services…', 'Almost ready…', 'Welcome.'];
  let progress = 0;
  let msgIndex = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress >= 100) progress = 100;

    fill.style.width = progress + '%';

    const step = Math.floor((progress / 100) * messages.length);
    if (step !== msgIndex && step < messages.length) {
      msgIndex = step;
      text.textContent = messages[msgIndex];
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('done');
        document.body.classList.add('loaded');
        triggerHeroAnimations();
      }, 300);
    }
  }, 80);
})();

/* ─────────────────────────────────
   2. HERO CANVAS — particle field
───────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildParticles();
  }

  function buildParticles() {
    const count = Math.floor((W * H) / 12000);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.6 + 0.1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,135,${p.a})`;
      ctx.fill();
    });

    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,255,135,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

/* ─────────────────────────────────
   3. HERO REVEAL ON LOAD
───────────────────────────────── */
function triggerHeroAnimations() {
  document.querySelectorAll('.hero .reveal-item').forEach((el) => {
    const delay = el.style.getPropertyValue('--d') || '0ms';
    setTimeout(() => el.classList.add('visible'), parseInt(delay) + 100);
  });

  // Animate counters
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + (el.dataset.count === '100' ? '' : '');
    }, 30);
  });
}

/* ─────────────────────────────────
   4. CUSTOM CURSOR
───────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (!cursor || !cursorDot) return;

  let cx = -100,
    cy = -100; // current (lagged)
  let tx = -100,
    ty = -100; // target (instant)

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    cursorDot.style.left = tx + 'px';
    cursorDot.style.top = ty + 'px';
  });

  function animateCursor() {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverEls = document.querySelectorAll('a, button, .service-card, .contact-card, .pillar');
  hoverEls.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* ─────────────────────────────────
   5. NAVBAR — scroll behavior
───────────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;

      // Add scrolled class
      nav.classList.toggle('scrolled', y > 60);

      // Hide/show on scroll direction (optional feel)
      if (y > 200) {
        if (y > lastScroll + 4) {
          nav.style.transform = 'translateY(-100%)';
        } else if (y < lastScroll - 4) {
          nav.style.transform = 'translateY(0)';
        }
      } else {
        nav.style.transform = 'translateY(0)';
      }
      lastScroll = y;
    },
    { passive: true }
  );
})();

/* ─────────────────────────────────
   6. MOBILE MENU
───────────────────────────────── */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobLinks = mobileMenu.querySelectorAll('.mob-link');

  function toggle() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggle);

  mobLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ─────────────────────────────────
   7. SCROLL REVEAL — IntersectionObserver
───────────────────────────────── */
(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
})();

/* ─────────────────────────────────
   8. ACTIVE NAV LINK — scroll spy
───────────────────────────────── */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => link.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => observer.observe(s));
})();

/* ─────────────────────────────────
   9. SERVICE CARDS — tilt effect
───────────────────────────────── */
(function initTilt() {
  const cards = document.querySelectorAll('.service-card, .contact-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ─────────────────────────────────
   10. SMOOTH SCROLL for anchors
───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─────────────────────────────────
   11. FOOTER year (future-proof)
───────────────────────────────── */
(function setYear() {
  const els = document.querySelectorAll('.footer-year');
  const y = new Date().getFullYear();
  els.forEach((el) => {
    el.textContent = y;
  });
})();
