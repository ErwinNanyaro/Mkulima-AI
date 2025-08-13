document.addEventListener('DOMContentLoaded', function() {
  // Initialize elements
  const menuButton = document.getElementById('menu-button');
  const navMenu = document.getElementById('menu');
  const sections = document.querySelectorAll('main > section');
  const navLinks = document.querySelectorAll('nav a');
  
  // Show home section by default
  showSection('home');
  
  // Mobile menu toggle - improved
  menuButton.addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    navMenu.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
    
    // Toggle aria-expanded for accessibility
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
  });
  
  // Navigation links - improved
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't prevent default if it's a dropdown parent
      if (!this.parentElement.classList.contains('dropdown-menu')) {
        e.preventDefault();
      }
      
      const sectionId = this.getAttribute('data-section') || 
                       this.getAttribute('href').substring(1);
      
      if (sectionId) {
        showSection(sectionId);
        
        // Close menu on mobile
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('show');
          document.body.classList.remove('no-scroll');
          menuButton.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
  
  // Close menu when clicking outside - improved
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !menuButton.contains(e.target)) {
      navMenu.classList.remove('show');
      document.body.classList.remove('no-scroll');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
  
 // Story Modals functionality
  const viewMoreButtons = document.querySelectorAll('.view-more');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  const storyModals = document.querySelectorAll('.story-modal');

  viewMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const storyId = this.getAttribute('data-story');
      const modal = document.getElementById(storyId);
      modal.classList.add('active');
      document.body.classList.add('no-scroll');
    });
  });

  closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.story-modal, .donation-modal');
      modal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // Close modals when clicking outside
  storyModals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  });
  
  // Donation Modal functionality
  const donateButtons = document.querySelectorAll('.donate-button');
  const donationModal = document.getElementById('donation-modal');
  const donationPurpose = document.getElementById('donation-purpose');
  const donationAmount = document.getElementById('donation-amount');
  const copyButtons = document.querySelectorAll('.copy-btn');

  if (donateButtons.length && donationModal) {
    // Donation button click handlers
    donateButtons.forEach(button => {
      button.addEventListener('click', function() {
        const card = this.closest('.donation-card');
        const purpose = card.querySelector('h4').textContent;
        const amount = card.querySelector('p').textContent;
        
        donationPurpose.textContent = purpose;
        donationAmount.textContent = amount;
        donationModal.classList.add('active');
        document.body.classList.add('no-scroll');
      });
    });

    // Copy buttons functionality
    copyButtons.forEach(button => {
      button.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-text');
        navigator.clipboard.writeText(textToCopy).then(() => {
          this.classList.add('copied');
          this.innerHTML = '<i class="fas fa-check"></i> Copied!';
          
          setTimeout(() => {
            this.classList.remove('copied');
            this.innerHTML = `<i class="fas fa-copy"></i> Copy ${textToCopy.length > 10 ? 'Number' : 'Text'}`;
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      });
    });

    // Close donation modal when clicking outside
    donationModal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }
  
  // Form handling
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }
});

function showSection(sectionId) {
  // Only hide content sections, not navigation
  document.querySelectorAll('main > section').forEach(section => {
    section.classList.add('hidden');
  });
  
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove('hidden');
    
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}
