// DOM Elements
const menuButton = document.getElementById('menu-button');
const navMenu = document.querySelector('nav');
const sections = document.querySelectorAll('main > section');
const navLinks = document.querySelectorAll('nav a');
const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
const viewMoreButtons = document.querySelectorAll('.view-more');
const closeModalButtons = document.querySelectorAll('.close-modal');
const storyModals = document.querySelectorAll('.story-modal');
const contactForm = document.querySelector('.contact-form form');
const donationForms = document.querySelectorAll('.donate-button');
const subscribeForm = document.querySelector('.subscribe-form');

// Initialize - Show home section by default
document.addEventListener('DOMContentLoaded', () => {
  // Check URL hash on load
  const hash = window.location.hash.substring(1);
  if (hash) {
    showSection(hash);
  } else {
    showSection('home');
  }
  
  setupEventListeners();
});

function setupEventListeners() {
  // Mobile Menu Toggle
  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
  });

  // Navigation Links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('href').substring(1);
      showSection(sectionId);
      closeMobileMenu();
    });
  });

  // Dropdown Links
  dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('href').substring(1);
      showSection(sectionId);
      closeMobileMenu();
    });
  });

  // Story Modals functionality
  viewMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const storyId = button.getAttribute('data-story');
      document.getElementById(storyId).classList.add('active');
      document.body.classList.add('no-scroll');
    });
  });

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      storyModals.forEach(modal => modal.classList.remove('active'));
      document.body.classList.remove('no-scroll');
    });
  });

  // Close modals when clicking outside
  storyModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
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

  // Handle scroll for active link highlighting
  window.addEventListener('scroll', highlightActiveSection);
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
    
    // Scroll to top of section smoothly
    window.scrollTo({
      top: activeSection.offsetTop - 80,
      behavior: 'smooth'
    });
    
    // Update active link
    updateActiveLink(sectionId);
  }
}

function updateActiveLink(sectionId) {
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active');
    }
  });
}

function highlightActiveSection() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  updateActiveLink(current);
}

function closeMobileMenu() {
  if (window.innerWidth <= 768) {
    navMenu.classList.remove('show');
    document.body.classList.remove('no-scroll');
  }
}

function handleResize() {
  if (window.innerWidth > 768) {
    navMenu.classList.remove('show');
    document.body.classList.remove('no-scroll');
  }
}
