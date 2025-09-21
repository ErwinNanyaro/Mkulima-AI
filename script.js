// Mkulima AI Website JavaScript
// Professional, investor-ready functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initializeNavigation();
  initializeAnimations();
  initializeModals();
  initializeDonationSystem();
  initializeFormHandling();
  initializeScrollEffects();
  initializeAccessibility();
  
  console.log('Mkulima AI website initialized successfully');
});

// Navigation System
function initializeNavigation() {
  const menuButton = document.getElementById('menu-button');
  const menu = document.getElementById('menu');
  const navLinks = document.querySelectorAll('nav a[data-section]');
  const sections = document.querySelectorAll('section[id]');
  
  // Mobile menu toggle
  if (menuButton && menu) {
    menuButton.addEventListener('click', function() {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !expanded);
      menu.classList.toggle('active');
      
      // Update icon
      const icon = menuButton.querySelector('i');
      if (icon) {
        icon.className = menu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
        menu.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
        const icon = menuButton.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }
  
  // Section navigation
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('data-section');
      
      if (targetSection) {
        showSection(targetSection);
        updateActiveNavLink(this);
        closeMobileMenu();
        
        // Smooth scroll to top for better UX
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // CTA button navigation
  document.querySelectorAll('.cta-button[href^="#"]').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href').substring(1);
      const targetLink = document.querySelector(`nav a[data-section="${target}"]`);
      
      if (targetLink) {
        showSection(target);
        updateActiveNavLink(targetLink);
        closeMobileMenu();
        
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Helper functions
  function showSection(sectionId) {
    // Hide all section contents
    document.querySelectorAll('.section-content').forEach(content => {
      content.classList.remove('active');
      content.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.querySelector(`#${sectionId} .section-content`);
    if (targetSection) {
      targetSection.style.display = 'block';
      targetSection.classList.add('active');
      
      // Trigger animations with delay for better visual effect
      setTimeout(() => {
        const fadeElements = targetSection.querySelectorAll('.fade-in');
        fadeElements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 100); // Stagger animations
        });
      }, 100);
    }
    
    // Update page title
    updatePageTitle(sectionId);
  }
  
  function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }
  
  function closeMobileMenu() {
    if (menu && menuButton) {
      menu.classList.remove('active');
      menuButton.setAttribute('aria-expanded', 'false');
      const icon = menuButton.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    }
  }
  
  function updatePageTitle(sectionId) {
    const sectionTitles = {
      'home': 'Mkulima AI - Transforming African Agriculture Through AI',
      'mission': 'Our Mission - Mkulima AI',
      'impact': 'Global Impact - Mkulima AI',
      'founder': 'Founder Story - Mkulima AI',
      'technology': 'Technology - Mkulima AI',
      'research': 'Research - Mkulima AI',
      'investment': 'Investment Opportunity - Mkulima AI',
      'contact': 'Contact Us - Mkulima AI'
    };
    
    document.title = sectionTitles[sectionId] || 'Mkulima AI';
  }
  
  // Initialize with home section visible
  showSection('home');
}

// Animation System
function initializeAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });
  
  // Counter animation for statistics
  function animateCounters() {
    document.querySelectorAll('.stat-number, .metric-value').forEach(counter => {
      const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
      if (target && !counter.classList.contains('animated')) {
        counter.classList.add('animated');
        animateCounter(counter, target);
      }
    });
  }
  
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for 1 second at 60fps
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Format the number appropriately
      const originalText = element.textContent;
      const suffix = originalText.replace(/[\d,]/g, '');
      element.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
  }
  
  // Trigger counter animations when visible
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.hero-stats, .impact-metrics').forEach(section => {
    counterObserver.observe(section);
  });
  
  // Progress bar animation
  function animateProgressBars() {
    document.querySelectorAll('.progress').forEach(bar => {
      if (!bar.classList.contains('animated')) {
        bar.classList.add('animated');
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, 500);
      }
    });
  }
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgressBars();
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.campaign-progress').forEach(section => {
    progressObserver.observe(section);
  });
}

// Modal System
function initializeModals() {
  const modals = document.querySelectorAll('.story-modal');
  const viewMoreButtons = document.querySelectorAll('.view-more');
  const closeButtons = document.querySelectorAll('.close-modal');
  
  // Open modals
  viewMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const storyId = this.getAttribute('data-story');
      const modal = document.getElementById(storyId);
      
      if (modal) {
        openModal(modal);
      }
    });
  });
  
  // Close modals
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.story-modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });
  
  // Close on backdrop click
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal(this);
      }
    });
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.story-modal[style*="block"]');
      if (openModal) {
        closeModal(openModal);
      }
    }
  });
  
  function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
    }
    
    // Track modal opening for analytics (if implemented)
    trackEvent('Modal Opened', { modalId: modal.id });
  }
  
  function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Return focus to trigger element if possible
    const trigger = document.querySelector(`[data-story="${modal.id}"]`);
    if (trigger) {
      trigger.focus();
    }
  }
}

// Donation/Investment System
function initializeDonationSystem() {
  const donationButtons = document.querySelectorAll('.invest-button, .donate-button');
  const donationModal = document.getElementById('donation-modal');
  const copyButtons = document.querySelectorAll('.copy-button');
  
  // Handle donation button clicks
  donationButtons.forEach(button => {
    if (button.getAttribute('data-purpose')) {
      button.addEventListener('click', function() {
        const purpose = this.getAttribute('data-purpose');
        const amount = this.getAttribute('data-amount');
        
        showDonationModal(purpose, amount);
        trackEvent('Donation Intent', { purpose, amount });
      });
    }
  });
  
  // Copy functionality
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const textToCopy = this.getAttribute('data-text');
      
      if (navigator.clipboard && window.isSecureContext) {
        // Use modern clipboard API
        navigator.clipboard.writeText(textToCopy).then(() => {
          showCopySuccess(this);
        }).catch(() => {
          fallbackCopy(textToCopy, this);
        });
      } else {
        fallbackCopy(textToCopy, this);
      }
      
      trackEvent('Payment Info Copied', { type: textToCopy.length > 10 ? 'account' : 'phone' });
    });
  });
  
  function showDonationModal(purpose, amount) {
    if (donationModal) {
      const purposeElement = document.getElementById('donation-purpose');
      const amountElement = document.getElementById('donation-amount');
      
      if (purposeElement) purposeElement.textContent = purpose;
      if (amountElement) amountElement.textContent = amount;
      
      donationModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      // Focus management
      const firstFocusable = donationModal.querySelector('button, [href], input');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }
  
  function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.style.background = '#4CAF50';
    
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.background = '';
    }, 2000);
  }
  
  function fallbackCopy(text, button) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      showCopySuccess(button);
    } catch (err) {
      console.error('Copy failed:', err);
      // Show manual copy instruction
      alert(`Please copy this manually: ${text}`);
    }
    
    document.body.removeChild(textArea);
  }
}

// Form Handling
function initializeFormHandling() {
  const contactForm = document.getElementById('contactForm');
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('.submit-button');
      const formStatus = document.getElementById('form-status');
      
      // Validate form
      if (!validateContactForm(formData)) {
        return;
      }
      
      // Update UI
      const originalText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      // Submit form
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          showFormSuccess(formStatus, 'Message sent successfully! We\'ll get back to you within 24 hours.');
          contactForm.reset();
          trackEvent('Contact Form Submitted', { 
            inquiryType: formData.get('inquiry-type') 
          });
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Form submission error:', error);
        showFormError(formStatus, 'There was a problem sending your message. Please try again or contact us directly.');
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        
        setTimeout(() => {
          if (formStatus) formStatus.innerHTML = '';
        }, 8000);
      });
    });
  }
  
  // Newsletter form submissions
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (!isValidEmail(email)) {
        showFormError(this, 'Please enter a valid email address.');
        return;
      }
      
      // Simulate newsletter signup (replace with actual API call)
      const submitButton = this.querySelector('button');
      const originalText = submitButton.innerHTML;
      
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      submitButton.disabled = true;
      
      setTimeout(() => {
        showFormSuccess(this, 'Thank you for subscribing to our newsletter!');
        emailInput.value = '';
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        trackEvent('Newsletter Signup', { email: email });
      }, 1000);
    });
  });
  
  function validateContactForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const inquiryType = formData.get('inquiry-type');
    const message = formData.get('message');
    
    if (!name || name.trim().length < 2) {
      showFormError(contactForm, 'Please enter your full name.');
      return false;
    }
    
    if (!isValidEmail(email)) {
      showFormError(contactForm, 'Please enter a valid email address.');
      return false;
    }
    
    if (!inquiryType) {
      showFormError(contactForm, 'Please select an inquiry type.');
      return false;
    }
    
    if (!message || message.trim().length < 10) {
      showFormError(contactForm, 'Please enter a detailed message (at least 10 characters).');
      return false;
    }
    
    return true;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function showFormSuccess(container, message) {
    const statusElement = container.querySelector('#form-status') || 
                         container.querySelector('.form-status') ||
                         container;
    
    statusElement.innerHTML = `<div class="form-message success">
      <i class="fas fa-check-circle"></i> ${message}
    </div>`;
  }
  
  function showFormError(container, message) {
    const statusElement = container.querySelector('#form-status') || 
                         container.querySelector('.form-status') ||
                         container;
    
    statusElement.innerHTML = `<div class="form-message error">
      <i class="fas fa-exclamation-circle"></i> ${message}
    </div>`;
  }
}

// Scroll Effects
function initializeScrollEffects() {
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  
  // Header scroll behavior
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (header) {
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
      
      // Add background blur when scrolled
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length <= 1) return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Accessibility Enhancements
function initializeAccessibility() {
  // Skip link functionality
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main landmark if not present
  let mainContent = document.querySelector('main');
  if (mainContent && !mainContent.id) {
    mainContent.id = 'main';
  }
  
  // Keyboard navigation for dropdowns
  document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
    const parentLink = dropdown.previousElementSibling;
    if (parentLink) {
      parentLink.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const firstItem = dropdown.querySelector('a');
          if (firstItem) {
            dropdown.style.display = 'block';
            firstItem.focus();
          }
        }
      });
    }
    
    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          dropdown.style.display = 'none';
          parentLink.focus();
        }
      });
    });
  });
  
  // Announce page changes to screen readers
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  announcer.style.position = 'absolute';
  announcer.style.left = '-10000px';
  announcer.style.width = '1px';
  announcer.style.height = '1px';
  announcer.style.overflow = 'hidden';
  document.body.appendChild(announcer);
  
  // Announce section changes
  window.announcePageChange = function(sectionName) {
    announcer.textContent = `Now viewing ${sectionName} section`;
  };
  
  // Enhanced focus management
  document.addEventListener('keydown', function(e) {
    // Tab trap for modals
    if (e.key === 'Tab') {
      const openModal = document.querySelector('.story-modal[style*="block"]');
      if (openModal) {
        trapFocus(e, openModal);
      }
    }
  });
  
  function trapFocus(e, container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }
}

// Analytics and Tracking
function trackEvent(eventName, properties = {}) {
  // Placeholder for analytics integration
  // Replace with your preferred analytics service (Google Analytics, Mixpanel, etc.)
  
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }
  
  if (typeof mixpanel !== 'undefined') {
    mixpanel.track(eventName, properties);
  }
  
  // Console log for development
  console.log('Event tracked:', eventName, properties);
}

// Performance Optimization
function initializePerformanceOptimizations() {
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // Preload critical resources
  const criticalResources = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = 'style';
    document.head.appendChild(link);
  });
}

// Error Handling
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
  trackEvent('JavaScript Error', {
    message: e.message,
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno
  });
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
  trackEvent('Unhandled Promise Rejection', {
    reason: e.reason.toString()
  });
});

// Initialize performance optimizations
initializePerformanceOptimizations();

// Export functions for external use
window.MkulimaAI = {
  trackEvent,
  showSection: function(sectionId) {
    const targetLink = document.querySelector(`nav a[data-section="${sectionId}"]`);
    if (targetLink) {
      targetLink.click();
    }
  }
};
