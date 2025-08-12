// DOM Elements
const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('menu');
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav a');
const dropdownLinks = document.querySelectorAll('.dropdown-menu a');

// Mobile Menu Toggle
menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('hidden');
  document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navMenu.classList.add('hidden');
      document.body.classList.remove('no-scroll');
    }
  });
});

// Section switching functionality
function showSection(sectionId) {
  sections.forEach(section => {
    section.classList.add('hidden');
  });
  
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.remove('hidden');
    
    // Special handling for hero section
    if (sectionId === 'home') {
      document.querySelector('header').style.backgroundColor = 'transparent';
      document.querySelector('header').style.boxShadow = 'none';
    } else {
      document.querySelector('header').style.backgroundColor = 'var(--white)';
      document.querySelector('header').style.boxShadow = 'var(--box-shadow)';
    }
    
    // Scroll to top of section
    window.scrollTo({
      top: activeSection.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

// Set up navigation
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section') || 
                     link.getAttribute('href').substring(1);
    showSection(sectionId);
    
    // Update active link
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    link.classList.add('active');
  });
});

// Set up dropdown navigation
dropdownLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    showSection(sectionId);
  });
});

// Show home section by default
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
  
  // Initialize impact statistics counter
  animateStatistics();
  
  // Set up smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});

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

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
  });
}

// Subscribe form handling
const subscribeForm = document.querySelector('.subscribe-form');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = subscribeForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email) {
      // Here you would typically send the email to your mailing list
      console.log('Subscribed email:', email);
      alert('Thank you for subscribing!');
      emailInput.value = '';
    }
  });
}

// Responsive adjustments
function handleResize() {
  if (window.innerWidth > 768) {
    navMenu.classList.remove('hidden');
  } else {
    navMenu.classList.add('hidden');
  }
}

window.addEventListener('resize', handleResize);
handleResize();

// Add class to body when menu is open to prevent scrolling
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu-button');
  const body = document.body;
  
  menuButton.addEventListener('click', () => {
    body.classList.toggle('menu-open');
  });
});
