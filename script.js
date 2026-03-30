'use strict';

// ========== LOADER ==========
(function () {
  const loader = document.getElementById('loader');
  const progressBar = document.getElementById('loaderProgressBar');
  const loaderText = document.getElementById('loaderText');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hide');
        document.body.style.overflow = '';
      }, 500);
    }
    progressBar.style.width = Math.min(progress, 100) + '%';
    if (progress < 30) loaderText.textContent = 'Loading assets...';
    else if (progress < 70) loaderText.textContent = 'Preparing experience...';
    else loaderText.textContent = 'Almost ready...';
  }, 120);

  document.body.style.overflow = 'hidden';
})();

// ========== CUSTOM CURSOR ==========
(function () {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0,
    mouseY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  function animate() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate(${followerX - 16}px, ${followerY - 16}px)`;
    requestAnimationFrame(animate);
  }
  animate();

  const links = document.querySelectorAll('a, button, .service-card');
  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      follower.style.width = '48px';
      follower.style.height = '48px';
      follower.style.borderColor = 'var(--accent)';
      follower.style.background = 'rgba(37, 99, 235, 0.1)';
    });
    link.addEventListener('mouseleave', () => {
      follower.style.width = '32px';
      follower.style.height = '32px';
      follower.style.background = 'transparent';
    });
  });
})();

// ========== NAVBAR SCROLL EFFECT ==========
(function () {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (currentScroll > 100 && currentScroll > lastScroll) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });
})();

// ========== MOBILE MENU ==========
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function toggleMenu() {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  document.querySelectorAll('.mob-link').forEach((link) => {
    link.addEventListener('click', toggleMenu);
  });
})();

// ========== SCROLL REVEAL ==========
(function () {
  const revealElements = document.querySelectorAll('.reveal-item, .reveal-up');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay');
          if (delay) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, parseInt(delay));
          } else {
            entry.target.classList.add('visible');
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));

  // Trigger initial hero reveal
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal-item').forEach((el) => {
      const delay = el.getAttribute('data-delay');
      setTimeout(() => el.classList.add('visible'), delay || 0);
    });
  }, 200);
})();

// ========== STAT COUNTERS ==========
(function () {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count'));
          let current = 0;
          const increment = target / 50;
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };
          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
})();

// ========== ACTIVE NAV LINK (SCROLL SPY) ==========
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}` || (current === '' && href === '#')) {
        link.classList.add('active');
      }
    });
  });
})();

// ========== SMOOTH SCROLL ==========
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });
})();

// ========== HERO CANVAS PARTICLES ==========
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.3;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }
    animate();
  }

  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  init();
})();

// ========== SERVICE CARD HOVER EFFECT ==========
(function () {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card) => {
    card.addEventListener('mouseenter', function (e) {
      this.style.transform = `translateY(-8px)`;
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });
})();

// ========== TICKER INFINITE LOOP ==========
(function () {
  const ticker = document.getElementById('tickerTrack');
  if (ticker) {
    const content = ticker.innerHTML;
    ticker.innerHTML = content + content;
  }
})();

// ========== ADD RIPPLE EFFECT TO BUTTONS ==========
(function () {
  const buttons = document.querySelectorAll('.btn-primary, .btn-ghost, .contact-card');
  buttons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(37, 99, 235, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
})();

// Add ripple keyframe if not exists
if (!document.querySelector('#ripple-style')) {
  const style = document.createElement('style');
  style.id = 'ripple-style';
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

console.log('KandoTech — Fully loaded and responsive!');
