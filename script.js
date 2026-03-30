'use strict';

// ========== LOADER ==========
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 1500);
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
    helpButton.addEventListener('click', () => floatingHelp.classList.toggle('open'));
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
    if (currentScroll > 100 && currentScroll > lastScroll)
      navbar.style.transform = 'translateY(-100%)';
    else navbar.style.transform = 'translateY(0)';
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
  document
    .querySelectorAll('.mob-link')
    .forEach((link) => link.addEventListener('click', toggleMenu));
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
      if (scrollPos >= sectionTop && scrollPos < sectionBottom)
        current = section.getAttribute('id');
    });
    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}` || (current === '' && href === '#home'))
        link.classList.add('active');
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
          const increment = target / 50;
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
    { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
  );
  counters.forEach((counter) => observer.observe(counter));
  setTimeout(() => {
    counters.forEach((counter) => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) observer.observe(counter);
    });
  }, 500);
})();

// ========== SERVICE MODAL DATA ==========
const serviceDetails = {
  phone: {
    icon: '📱',
    title: 'Phone Repair',
    description: 'Expert mobile phone repair for all major brands.',
    features: [
      'Screen replacement',
      'Battery replacement',
      'Water damage repair',
      'Software issues',
      'FRP bypass',
      'Charging port repair',
    ],
  },
  computer: {
    icon: '💻',
    title: 'Computer Repair',
    description: 'Comprehensive computer repair and maintenance.',
    features: [
      'Windows/macOS installation',
      'Virus removal',
      'Hardware upgrades',
      'Data recovery',
      'Driver installation',
    ],
  },
  appliances: {
    icon: '⚡',
    title: 'Home Appliances',
    description: 'Expert repair for home electronics.',
    features: [
      'TV repair',
      'Kettle & iron repair',
      'Cooker repair',
      'Water heater service',
      'Electrical wiring',
    ],
  },
  hardware: {
    icon: '🔧',
    title: 'Hardware Fix',
    description: 'Professional hardware repair and upgrades.',
    features: [
      'Component replacement',
      'System upgrades',
      'Cooling system repair',
      'Power supply fix',
    ],
  },
  'custom-software': {
    icon: '🛠️',
    title: 'Custom Software',
    description: 'Tailored software solutions for your business.',
    features: [
      'Desktop applications',
      'Business management systems',
      'ERP solutions',
      'Automation tools',
    ],
  },
  'mobile-apps': {
    icon: '📱',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile development.',
    features: [
      'iOS development',
      'Android development',
      'Flutter apps',
      'React Native',
      'App store deployment',
    ],
  },
  api: {
    icon: '🔌',
    title: 'API & Backend',
    description: 'Robust backend systems and APIs.',
    features: ['RESTful APIs', 'Microservices', 'Database integration', 'Authentication systems'],
  },
  database: {
    icon: '🗄️',
    title: 'Database Systems',
    description: 'Database design, setup, and optimization.',
    features: ['MySQL/PostgreSQL', 'MongoDB', 'Data migration', 'Performance tuning'],
  },
  web: {
    icon: '🌐',
    title: 'Web Development',
    description: 'Modern, responsive websites.',
    features: [
      'Custom websites',
      'E-commerce stores',
      'CMS integration',
      'SEO optimization',
      'Hosting setup',
    ],
  },
  ecommerce: {
    icon: '🛒',
    title: 'E-commerce',
    description: 'Complete online store solutions.',
    features: [
      'Shopify/WooCommerce',
      'Payment integration',
      'Inventory management',
      'Order processing',
    ],
  },
  cloud: {
    icon: '☁️',
    title: 'Cloud & Email',
    description: 'Cloud services and email setup.',
    features: ['Google Workspace', 'Microsoft 365', 'Cloud migration', 'Email hosting'],
  },
  marketing: {
    icon: '📊',
    title: 'Digital Marketing',
    description: 'Grow your online presence.',
    features: ['Social media management', 'SEO optimization', 'Google Ads', 'Content creation'],
  },
  networking: {
    icon: '📡',
    title: 'Networking',
    description: 'Network setup and security.',
    features: ['WiFi installation', 'CCTV setup', 'Server configuration', 'VPN setup'],
  },
  cybersecurity: {
    icon: '🔒',
    title: 'Cybersecurity',
    description: 'Protect your digital assets.',
    features: ['Security audits', 'Firewall setup', 'Data protection', 'Threat monitoring'],
  },
  itsupport: {
    icon: '🖥️',
    title: 'IT Support',
    description: 'Reliable IT support services.',
    features: ['Help desk', 'Remote support', 'System maintenance', 'Troubleshooting'],
  },
  businessit: {
    icon: '🏢',
    title: 'Business IT',
    description: 'Business technology solutions.',
    features: ['POS systems', 'CRM implementation', 'Process automation', 'Inventory systems'],
  },
  graphic: {
    icon: '🎨',
    title: 'Graphic Design',
    description: 'Creative design solutions.',
    features: ['Logo design', 'Brand identity', 'Posters & flyers', 'Social media graphics'],
  },
  printing: {
    icon: '🖨️',
    title: 'Printing',
    description: 'Professional printing services.',
    features: ['Banner printing', 'Business cards', 'Flyers & posters', 'Event cards'],
  },
  motion: {
    icon: '🎬',
    title: 'Motion Graphics',
    description: 'Animated visual content.',
    features: ['Logo animation', 'Intro videos', 'Explainer videos', 'Social media reels'],
  },
  branding: {
    icon: '👕',
    title: 'Branding & Merch',
    description: 'Custom branded merchandise.',
    features: ['T-shirt design', 'Uniforms', 'Mugs & caps', 'Corporate gifts'],
  },
  training: {
    icon: '🎓',
    title: 'Tech Training',
    description: 'Hands-on tech courses.',
    features: [
      'Phone repair course',
      'Web development bootcamp',
      'Networking fundamentals',
      'Cybersecurity basics',
    ],
  },
  cv: {
    icon: '📄',
    title: 'CV & Resume',
    description: 'Professional CV services.',
    features: ['CV writing', 'Resume formatting', 'Cover letters', 'LinkedIn profile sync'],
  },
  profile: {
    icon: '👔',
    title: 'Profile Optimization',
    description: 'Enhance your professional profiles.',
    features: ['LinkedIn optimization', 'Fiverr profile', 'Upwork profile', 'Portfolio setup'],
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
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `position:absolute; width:2px; height:2px; background:var(--accent); border-radius:50%; opacity:${Math.random() * 0.3}; left:${Math.random() * 100}%; top:${Math.random() * 100}%; animation:float ${5 + Math.random() * 10}s ease-in-out infinite`;
    particlesContainer.appendChild(particle);
  }
})();

if (!document.querySelector('#float-style')) {
  const style = document.createElement('style');
  style.id = 'float-style';
  style.textContent =
    '@keyframes float { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-20px) translateX(10px); } }';
  document.head.appendChild(style);
}

console.log('KandoTech — Fully loaded with categorized services!');
