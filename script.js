'use strict';

// ========== LOADER ==========
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hide');
  }, 1500);
});

// ========== THEME TOGGLE ==========
(function () {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';

  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
})();

// ========== FLOATING ACTION BUTTON ==========
(function () {
  const fabContainer = document.getElementById('fabContainer');
  const fabMain = document.getElementById('fabMain');

  fabMain.addEventListener('click', () => {
    fabContainer.classList.toggle('open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!fabContainer.contains(e.target)) {
      fabContainer.classList.remove('open');
    }
  });
})();

// ========== NAVBAR SCROLL ==========
(function () {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.style.background = 'rgba(var(--bg-primary), 0.98)';
    } else {
      navbar.style.background = 'rgba(var(--bg-primary), 0.95)';
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

// ========== ACTIVE NAV LINK ==========
(function () {
  const sections = document.querySelectorAll('section[id], div[id="home"]');
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
      if (href === `#${current}` || (current === '' && href === '#home')) {
        link.classList.add('active');
      }
    });
  });
})();

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });

      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobileMenu');
      const hamburger = document.getElementById('hamburger');
      if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
});

// ========== NUMBER COUNTERS ==========
(function () {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const observer = new IntersectionObserver(
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
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
})();

// ========== SCROLL REVEAL ==========
(function () {
  const revealElements = document.querySelectorAll(
    '.service-card, .about-content, .about-stats, .contact-card, .section-header'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
})();

// ========== SERVICE MODAL (POPUP) ==========
const serviceDetails = {
  phone: {
    icon: '📱',
    title: 'Phone Repair Services',
    description:
      'Expert mobile phone repair for all major brands. Fast turnaround with quality parts.',
    features: [
      'Screen replacement (OLED/LCD)',
      'Battery replacement',
      'Water damage repair',
      'Software issues & flashing',
      'FRP bypass & unlocking',
      'Charging port repair',
      'Camera & speaker repair',
    ],
  },
  computer: {
    icon: '💻',
    title: 'Computer Repair Services',
    description: 'Comprehensive computer repair and maintenance for desktops and laptops.',
    features: [
      'Windows/macOS installation',
      'Virus & malware removal',
      'Hardware upgrades (RAM, SSD)',
      'Motherboard repair',
      'Data recovery',
      'Driver installation',
      'Screen & keyboard replacement',
    ],
  },
  web: {
    icon: '🌐',
    title: 'Web Development Services',
    description: 'Professional website development tailored to your business needs.',
    features: [
      'Custom website design',
      'E-commerce stores',
      'SEO optimization',
      'Mobile-responsive designs',
      'CMS integration (WordPress)',
      'Website maintenance',
      'Domain & hosting setup',
    ],
  },
  graphic: {
    icon: '🎨',
    title: 'Graphic Design Services',
    description: 'Creative design solutions to make your brand stand out.',
    features: [
      'Logo & brand identity',
      'Business cards & flyers',
      'Social media graphics',
      'Posters & banners',
      'Product packaging',
      'Video editing',
      'Animation & motion graphics',
    ],
  },
  networking: {
    icon: '📡',
    title: 'Networking Services',
    description: 'Professional network setup and security solutions.',
    features: [
      'WiFi installation',
      'CCTV camera setup',
      'Server configuration',
      'Network security',
      'VPN setup',
      'Cloud services',
      'Data backup solutions',
    ],
  },
  appliances: {
    icon: '⚡',
    title: 'Home Appliance Repair',
    description: 'Expert repair for all home electronics and appliances.',
    features: [
      'TV repair (all brands)',
      'Kettle & iron repair',
      'Cooker & oven repair',
      'Water heater service',
      'Electrical wiring',
      'Microwave repair',
      'Fridge & freezer repair',
    ],
  },
  training: {
    icon: '🎓',
    title: 'Tech Training Programs',
    description: 'Hands-on training to build valuable tech skills.',
    features: [
      'Phone repair course',
      'Web development bootcamp',
      'Networking fundamentals',
      'Cybersecurity basics',
      'Graphic design training',
      'Computer literacy',
      'Certificate upon completion',
    ],
  },
  business: {
    icon: '🏢',
    title: 'Business Solutions',
    description: 'Technology solutions to grow your business.',
    features: [
      'POS system setup',
      'CRM implementation',
      'Inventory management',
      'Business automation',
      'Online store setup',
      'Digital marketing',
      'IT consulting',
    ],
  },
};

(function () {
  const modal = document.getElementById('serviceModal');
  const modalClose = document.querySelector('.modal-close');
  const serviceCards = document.querySelectorAll('.service-card');

  function openModal(serviceId) {
    const details = serviceDetails[serviceId];
    if (!details) return;

    document.querySelector('.modal-icon').innerHTML = details.icon;
    document.querySelector('.modal-title').textContent = details.title;
    document.querySelector('.modal-description').textContent = details.description;

    const featuresHtml = `
      <ul style="list-style: none;">
        ${details.features.map((f) => `<li><i class="fas fa-check-circle" style="color: var(--accent); margin-right: 10px;"></i> ${f}</li>`).join('')}
      </ul>
    `;
    document.querySelector('.modal-features').innerHTML = featuresHtml;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  serviceCards.forEach((card) => {
    const learnBtn = card.querySelector('.card-learn-more');
    const serviceId = card.getAttribute('data-service');

    learnBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(serviceId);
    });

    card.addEventListener('click', () => {
      openModal(serviceId);
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
})();

// ========== PARTICLE BACKGROUND ==========
(function () {
  const particlesContainer = document.querySelector('.hero-bg-particles');
  if (!particlesContainer) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'var(--accent)';
    particle.style.borderRadius = '50%';
    particle.style.opacity = Math.random() * 0.3;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `float ${5 + Math.random() * 10}s ease-in-out infinite`;
    particlesContainer.appendChild(particle);
  }
})();

// Add floating animation style
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(10px); }
  }
`;
document.head.appendChild(style);

// ========== SERVICE CARD HOVER ANIMATION ==========
document.querySelectorAll('.service-card').forEach((card) => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-8px)';
  });
  card.addEventListener('mouseleave', function () {
    this.style.transform = '';
  });
});

console.log('KandoTech — Fully loaded with premium features!');
