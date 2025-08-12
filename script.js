// DOM Elements
const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('menu');
const sections = document.querySelectorAll('main > section');
const navLinks = document.querySelectorAll('nav a[data-section]');
const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
const viewMoreButtons = document.querySelectorAll('.view-more');
const closeModalButtons = document.querySelectorAll('.close-modal');
const storyModals = document.querySelectorAll('.story-modal');
const contactForm = document.querySelector('.contact-form form');
const donationForms = document.querySelectorAll('.donate-button');
const subscribeForm = document.querySelector('.subscribe-form');

// Initialize - Show home section by default
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
  setupEventListeners();
  animateStatistics();
});

function setupEventListeners() {
  // Mobile Menu Toggle
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
    document.body.classList.toggle('no-scroll');
  });

  // Navigation Links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
      closeMobileMenu();
      updateActiveLink(link);
    });
  });

  // Dropdown Links
  dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
      closeMobileMenu();
      updateActiveLink(link);
    });
  });

  // Story Modals functionality
  viewMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const storyId = button.getAttribute('data-story');
      document.getElementById(storyId).classList.remove('hidden');
      document.body.classList.add('no-scroll');
    });
  });

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      storyModals.forEach(modal => modal.classList.add('hidden'));
      document.body.classList.remove('no-scroll');
    });
  });

  // Close modals when clicking outside
  storyModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // Form submission handling
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      console.log('Form submitted:', data);
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

  // Donation form handling
  donationForms.forEach(form => {
    form.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Thank you for your interest in supporting Mkulima AI! You will be redirected to our secure donation platform.');
    });
  });

  // Subscribe form handling
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = subscribeForm.querySelector('input[type="email"]');
      const email = emailInput.value;
      if (email) {
        console.log('Subscribed email:', email);
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && e.target !== menuButton) {
      closeMobileMenu();
    }
  });

  // Handle window resize
  window.addEventListener('resize', handleResize);

  // Handle back/forward navigation
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      showSection(hash);
    } else {
      showSection('home');
    }
  });

  // Initialize based on current URL hash
  const currentHash = window.location.hash.substring(1);
  if (currentHash) {
    showSection(currentHash);
  }
}

function showSection(sectionId) {
  // Hide all sections
  sections.forEach(section => {
    section.classList.add('hidden');
  });

  // Show the selected section
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.remove('hidden');
    
    // Update URL without reloading
    history.pushState(null, '', `#${sectionId}`);
    
    // Special handling for hero section
    if (sectionId === 'home') {
      document.querySelector('header').style.backgroundColor = 'transparent';
      document.querySelector('header').style.boxShadow = 'none';
    } else {
      document.querySelector('header').style.backgroundColor = 'var(--white)';
      document.querySelector('header').style.boxShadow = 'var(--box-shadow)';
    }
    
    // Scroll to top of section smoothly
    window.scrollTo({
      top: activeSection.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

function updateActiveLink(activeLink) {
  navLinks.forEach(navLink => navLink.classList.remove('active'));
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

function closeMobileMenu() {
  if (window.innerWidth <= 768) {
    navMenu.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }
}

function handleResize() {
  if (window.innerWidth > 768) {
    navMenu.classList.remove('hidden');
    document.body.classList.remove('no-scroll');
  } else {
    navMenu.classList.add('hidden');
  }
}

// Animate statistics counter
function animateStatistics() {
  const stats = [
    { id: 'farmers-trained', target: 5000, duration: 2000 },
    { id: 'villages-reached', target: 10, duration: 1500 },
    { id: 'crops-covered', target: 11, duration: 1000 },
    { id: 'regions-active', target: 8, duration: 1500 }
  ];

  stats.forEach(stat => {
    const element = document.getElementById(stat.id);
    if (!element) return;
    
    const increment = stat.target / (stat.duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < stat.target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = stat.target;
      }
    };
    
    // Only animate when section is visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.unobserve(element);
      }
    }, { threshold: 0.5 });
    
    observer.observe(element);
  });
}

// Add active class to current section in view
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current || 
        link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
