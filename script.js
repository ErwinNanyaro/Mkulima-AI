document.addEventListener('DOMContentLoaded', function() {
  // Initialize elements
  const menuButton = document.getElementById('menu-button');
  const navMenu = document.getElementById('menu');
  const sections = document.querySelectorAll('main > section');
  const navLinks = document.querySelectorAll('nav a');
  
  // Show home section by default
  showSection('home');
  
  // Mobile menu toggle
  menuButton.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent this click from triggering document click
    navMenu.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
  });
  
  // Navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section') || 
                       this.getAttribute('href').substring(1);
      showSection(sectionId);
      
      // Close menu on mobile
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        document.body.classList.remove('no-scroll');
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !menuButton.contains(e.target)) {
      navMenu.classList.remove('show');
      document.body.classList.remove('no-scroll');
    }
  });
  
  // Modal functionality
  const viewMoreButtons = document.querySelectorAll('.view-more');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  const storyModals = document.querySelectorAll('.story-modal');
  
  viewMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const storyId = this.getAttribute('data-story');
      document.getElementById(storyId).classList.add('active');
      document.body.classList.add('no-scroll');
    });
  });
  
  closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
      storyModals.forEach(modal => modal.classList.remove('active'));
      document.body.classList.remove('no-scroll');
    });
  });
  
  // Form handling
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }
  
  // Close modals when clicking outside
  storyModals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  });
});

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('main > section').forEach(section => {
    section.classList.add('hidden');
  });
  
  // Show requested section
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove('hidden');
    
    // Scroll to top of section
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}
