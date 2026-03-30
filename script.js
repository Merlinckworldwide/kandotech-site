'use strict';

// ========== LOADER ==========
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 1200);
});

// ========== THEME TOGGLE ==========
(function () {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

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

// ========== FLOATING HELP BUTTON ==========
(function () {
  const floatingHelp = document.getElementById('floatingHelp');
  const helpButton = document.getElementById('helpButton');
  if (helpButton) {
    helpButton.addEventListener('click', (e) => {
      e.stopPropagation();
      floatingHelp.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!floatingHelp.contains(e.target)) floatingHelp.classList.remove('open');
    });
  }
})();

// ========== NAVBAR SCROLL EFFECT ==========
(function () {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
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
  if (hamburger) hamburger.addEventListener('click', toggleMenu);
  document.querySelectorAll('.mob-link').forEach((link) => {
    link.addEventListener('click', toggleMenu);
  });
})();

// ========== ACTIVE NAV LINK ==========
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;
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
      const offsetTop = target.offsetTop - 75;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      const mobileMenu = document.getElementById('mobileMenu');
      const hamburger = document.getElementById('hamburger');
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        if (hamburger) hamburger.classList.remove('open');
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
          const increment = target / 40;
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + '+';
            }
          };
          updateCounter();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((counter) => observer.observe(counter));
  setTimeout(() => {
    counters.forEach((counter) => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) observer.observe(counter);
    });
  }, 300);
})();

// ========== SERVICE MODAL DATA ==========
const serviceDetails = {
  phone: {
    icon: '📱',
    title: 'Phone Repair',
    description: 'Expert mobile phone repair for all major brands with fast turnaround.',
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
    title: 'Computer Repair',
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
  appliances: {
    icon: '⚡',
    title: 'Home Appliances',
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
  hardware: {
    icon: '🔧',
    title: 'Hardware Fix',
    description: 'Professional hardware repair and component-level fixes.',
    features: [
      'Component replacement',
      'System upgrades',
      'Cooling system repair',
      'Power supply fix',
      'Motherboard diagnostics',
      'Chip-level repair',
    ],
  },
  'custom-software': {
    icon: '🛠️',
    title: 'Custom Software',
    description: 'Tailored software solutions built specifically for your business needs.',
    features: [
      'Desktop applications',
      'Business management systems',
      'ERP solutions',
      'Automation tools',
      'Inventory systems',
      'Reporting dashboards',
    ],
  },
  'mobile-apps': {
    icon: '📱',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile app development.',
    features: [
      'iOS development (Swift)',
      'Android development (Kotlin/Java)',
      'Flutter cross-platform',
      'React Native apps',
      'App store deployment',
      'UI/UX design',
    ],
  },
  api: {
    icon: '🔌',
    title: 'API & Backend',
    description: 'Robust backend systems and API development.',
    features: [
      'RESTful APIs',
      'GraphQL APIs',
      'Microservices architecture',
      'Database integration',
      'Authentication systems',
      'Cloud deployment',
    ],
  },
  database: {
    icon: '🗄️',
    title: 'Database Systems',
    description: 'Database design, setup, and optimization services.',
    features: [
      'MySQL/PostgreSQL',
      'MongoDB/NoSQL',
      'Database migration',
      'Performance tuning',
      'Backup & recovery',
      'Data warehousing',
    ],
  },
  web: {
    icon: '🌐',
    title: 'Web Development',
    description: 'Modern, responsive websites that drive results.',
    features: [
      'Custom website design',
      'E-commerce stores',
      'CMS integration (WordPress)',
      'SEO optimization',
      'Hosting setup',
      'Website maintenance',
    ],
  },
  ecommerce: {
    icon: '🛒',
    title: 'E-commerce',
    description: 'Complete online store solutions to sell your products.',
    features: [
      'Shopify/WooCommerce setup',
      'Payment gateway integration',
      'Inventory management',
      'Order processing',
      'Product catalog setup',
      'Mobile-responsive stores',
    ],
  },
  cloud: {
    icon: '☁️',
    title: 'Cloud & Email',
    description: 'Cloud services and professional email setup.',
    features: [
      'Google Workspace setup',
      'Microsoft 365 configuration',
      'Cloud migration',
      'Email hosting',
      'Data backup',
      'Collaboration tools',
    ],
  },
  marketing: {
    icon: '📊',
    title: 'Digital Marketing',
    description: 'Grow your online presence and reach more customers.',
    features: [
      'Social media management',
      'SEO optimization',
      'Google Ads campaigns',
      'Content creation',
      'Email marketing',
      'Analytics & reporting',
    ],
  },
  networking: {
    icon: '📡',
    title: 'Networking',
    description: 'Professional network setup and security solutions.',
    features: [
      'WiFi installation',
      'CCTV camera setup',
      'Server configuration',
      'VPN setup',
      'Network security',
      'Cloud services',
      'Data backup solutions',
    ],
  },
  cybersecurity: {
    icon: '🔒',
    title: 'Cybersecurity',
    description: 'Protect your digital assets from threats.',
    features: [
      'Security audits',
      'Firewall setup',
      'Data protection',
      'Threat monitoring',
      'Vulnerability assessment',
      'Employee training',
    ],
  },
  itsupport: {
    icon: '🖥️',
    title: 'IT Support',
    description: 'Reliable IT support services for businesses.',
    features: [
      'Help desk support',
      'Remote assistance',
      'System maintenance',
      'Troubleshooting',
      'Hardware setup',
      'Software installation',
    ],
  },
  businessit: {
    icon: '🏢',
    title: 'Business IT',
    description: 'Technology solutions to grow your business.',
    features: [
      'POS systems',
      'CRM implementation',
      'Process automation',
      'Inventory systems',
      'Business analytics',
      'IT consulting',
    ],
  },
  graphic: {
    icon: '🎨',
    title: 'Graphic Design',
    description: 'Creative design solutions for your brand.',
    features: [
      'Logo design',
      'Brand identity',
      'Posters & flyers',
      'Social media graphics',
      'Business cards',
      'Packaging design',
    ],
  },
  printing: {
    icon: '🖨️',
    title: 'Printing',
    description: 'Professional printing services for all needs.',
    features: [
      'Banner printing',
      'Business cards',
      'Flyers & posters',
      'Event cards',
      'Sticker printing',
      'Document printing',
    ],
  },
  motion: {
    icon: '🎬',
    title: 'Motion Graphics',
    description: 'Animated visual content that engages.',
    features: [
      'Logo animation',
      'Intro videos',
      'Explainer videos',
      'Social media reels',
      'Motion typography',
      '2D/3D animation',
    ],
  },
  branding: {
    icon: '👕',
    title: 'Branding & Merch',
    description: 'Custom branded merchandise.',
    features: [
      'T-shirt design',
      'Uniforms & caps',
      'Mugs & merchandise',
      'Corporate gifts',
      'Branded stationery',
      'Promotional items',
    ],
  },
  training: {
    icon: '🎓',
    title: 'Tech Training',
    description: 'Hands-on tech courses for all skill levels.',
    features: [
      'Phone repair course',
      'Web development bootcamp',
      'Networking fundamentals',
      'Cybersecurity basics',
      'Graphic design training',
      'Certificate upon completion',
    ],
  },
  cv: {
    icon: '📄',
    title: 'CV & Resume',
    description: 'Professional CV services to boost your career.',
    features: [
      'CV writing',
      'Resume formatting',
      'Cover letters',
      'LinkedIn profile sync',
      'Portfolio creation',
      'Job application prep',
    ],
  },
  profile: {
    icon: '👔',
    title: 'Profile Optimization',
    description: 'Enhance your professional profiles.',
    features: [
      'LinkedIn optimization',
      'Fiverr profile',
      'Upwork profile',
      'Portfolio setup',
      'Personal branding',
      'Profile content writing',
    ],
  },
  career: {
    icon: '🎯',
    title: 'Career Coaching',
    description: 'Career guidance and mentoring.',
    features: [
      'Job interview prep',
      'Career path planning',
      'Certification guidance',
      'Skill assessment',
      'Salary negotiation',
      'Industry insights',
    ],
  },
};

// ========== SERVICE MODAL ==========
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
    const featuresHtml = `<ul>${details.features.map((f) => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}</ul>`;
    document.querySelector('.modal-features').innerHTML = featuresHtml;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  serviceCards.forEach((card) => {
    const serviceId = card.getAttribute('data-service');
    card.addEventListener('click', () => openModal(serviceId));
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal();
  });
})();

// ========== PARTICLE BACKGROUND ==========
(function () {
  const particlesContainer = document.querySelector('.hero-bg-particles');
  if (!particlesContainer) return;
  for (let i = 0; i < 60; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `position:absolute; width:${Math.random() * 3 + 1}px; height:${Math.random() * 3 + 1}px; background:var(--accent); border-radius:50%; opacity:${Math.random() * 0.25}; left:${Math.random() * 100}%; top:${Math.random() * 100}%; animation:float ${Math.random() * 12 + 5}s ease-in-out infinite; animation-delay:${Math.random() * 5}s`;
    particlesContainer.appendChild(particle);
  }
})();

if (!document.querySelector('#float-style')) {
  const style = document.createElement('style');
  style.id = 'float-style';
  style.textContent =
    '@keyframes float { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-25px) translateX(12px); } }';
  document.head.appendChild(style);
}

// ========== REVEAL ON SCROLL ==========
(function () {
  const revealElements = document.querySelectorAll(
    '.service-card, .category-block, .about-content, .about-stats, .contact-card, .section-header'
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
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );
  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.35s ease-out, transform 0.35s ease-out';
    observer.observe(el);
  });
})();

console.log('KandoTech — Fully optimized with smooth transitions!');
