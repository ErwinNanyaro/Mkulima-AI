document.addEventListener('DOMContentLoaded', function() {
  // Menu toggle functionality
  const menuButton = document.getElementById('menu-button');
  const menu = document.getElementById('menu');
  
  menuButton.addEventListener('click', function() {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('active');
  });
  
  // Section navigation
  const navLinks = document.querySelectorAll('nav a');
  const sectionContents = document.querySelectorAll('.section-content');
  
  // Function to show a specific section
  function showSection(sectionId) {
    // Hide all section contents except home (which is always visible)
    sectionContents.forEach(content => {
      if (content.parentElement.id !== 'home') {
        content.style.display = 'none';
      }
    });
    
    // Show the selected section (if it's not home)
    if (sectionId !== 'home') {
      const targetSection = document.querySelector(`#${sectionId} .section-content`);
      if (targetSection) {
        targetSection.style.display = 'block';
        
        // Scroll to the top of the section
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Trigger fade-in animations
        setTimeout(() => {
          const fadeElements = targetSection.querySelectorAll('.fade-in');
          fadeElements.forEach(element => {
            element.classList.add('visible');
          });
        }, 100);
      }
    } else {
      // Scroll to top for home
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
  
  // Set up navigation click handlers
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('data-section');
      
      if (targetSection) {
        // Update active link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        
        // Show the target section
        showSection(targetSection);
        
        // Close mobile menu if open
        if (menu.classList.contains('active')) {
          menu.classList.remove('active');
          menuButton.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
  
  // Set up CTA button handlers
  document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href').substring(1);
      
      // Update active link
      navLinks.forEach(link => link.classList.remove('active'));
      document.querySelector(`nav a[data-section="${target}"]`).classList.add('active');
      
      // Show the target section
      showSection(target);
    });
  });
  
  // Show home section by default (already visible)
  // Trigger fade-in animations for home section
  setTimeout(() => {
    const homeFadeElements = document.querySelectorAll('#home .fade-in');
    homeFadeElements.forEach(element => {
      element.classList.add('visible');
    });
  }, 100);
  
  // Modal functionality
  const viewMoreButtons = document.querySelectorAll('.view-more');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  const modals = document.querySelectorAll('.story-modal');
  
  viewMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const storyId = this.getAttribute('data-story');
      document.getElementById(storyId).style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
  
  closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
      modals.forEach(modal => {
        modal.style.display = 'none';
      });
      document.body.style.overflow = 'auto';
    });
  });
  
  // Close modal when clicking outside
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });
  
  // Donation buttons
  const donateButtons = document.querySelectorAll('.donate-button');
  const donationModal = document.getElementById('donation-modal');
  
  donateButtons.forEach(button => {
    if (button.getAttribute('data-purpose')) {
      button.addEventListener('click', function() {
        const purpose = this.getAttribute('data-purpose');
        const amount = this.getAttribute('data-amount');
        
        document.getElementById('donation-purpose').textContent = purpose;
        document.getElementById('donation-amount').textContent = amount;
        donationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    }
  });
  
  // Copy buttons
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const text = this.getAttribute('data-text');
      navigator.clipboard.writeText(text).then(() => {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      });
    });
  });
  
  // Form submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const formStatus = document.getElementById('form-status');
      
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          formStatus.innerHTML = '<p style="color: var(--primary);">Message sent successfully!</p>';
          contactForm.reset();
        } else {
          formStatus.innerHTML = '<p style="color: red;">There was a problem sending your message. Please try again.</p>';
        }
      })
      .catch(error => {
        formStatus.innerHTML = '<p style="color: red;">There was a problem sending your message. Please try again.</p>';
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        
        setTimeout(() => {
          formStatus.innerHTML = '';
        }, 5000);
      });
    });
  }
  
  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      
      // Simple validation
      if (!emailInput.value || !emailInput.value.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Show success message
      alert('Thank you for subscribing to our newsletter!');
      emailInput.value = '';
    });
  }
  
  // Fade-in animation on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  
  function checkFade() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100 && elementBottom > 0) {
        element.classList.add('visible');
      }
    });
  }
  
  // Initial check for elements in view
  checkFade();
  
  // Check on scroll
  window.addEventListener('scroll', checkFade);
  
  // Initialize impact section animations
  const impactCards = document.querySelectorAll('.impact-card');
  if (impactCards.length > 0) {
    setTimeout(() => {
      impactCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 200);
      });
    }, 500);
  }
});
