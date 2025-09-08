// YANA AI Hackathon Landing Page JavaScript
// Vanilla JS implementation following agencyyolo minimalist style

class YANALandingPage {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupEventListeners();
      });
    } else {
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    this.setupAccordions();
    this.setupSmoothScroll();
    this.setupFloatingBanner();
    this.setupHeroImageTransition();
  }

  // Accordion Component Implementation
  setupAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
      const headers = accordion.querySelectorAll('.accordion__header');
      
      headers.forEach(header => {
        header.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleAccordion(header, accordion);
        });
      });
    });
  }

  toggleAccordion(clickedHeader, accordion) {
    const targetId = clickedHeader.getAttribute('data-target');
    const targetContent = document.getElementById(targetId);
    const isExpanded = clickedHeader.getAttribute('aria-expanded') === 'true';
    
    // Close all other accordions in the same accordion container
    const allHeaders = accordion.querySelectorAll('.accordion__header');
    const allContents = accordion.querySelectorAll('.accordion__content');
    
    allHeaders.forEach(header => {
      if (header !== clickedHeader) {
        header.setAttribute('aria-expanded', 'false');
      }
    });
    
    allContents.forEach(content => {
      if (content !== targetContent) {
        content.classList.remove('active');
      }
    });
    
    // Toggle the clicked accordion
    if (isExpanded) {
      clickedHeader.setAttribute('aria-expanded', 'false');
      targetContent.classList.remove('active');
    } else {
      clickedHeader.setAttribute('aria-expanded', 'true');
      targetContent.classList.add('active');
    }
  }

  // Smooth Scroll Implementation
  setupSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          this.smoothScrollTo(targetElement);
        }
      });
    });
  }

  smoothScrollTo(element) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = element.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  // Floating Banner Implementation
  setupFloatingBanner() {
    const floatingBanner = document.querySelector('.floating-banner');
    if (!floatingBanner) return;

    // Show/hide based on scroll position
    let isVisible = true;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const heroSection = document.querySelector('.hero');
      const heroHeight = heroSection ? heroSection.offsetHeight : 0;
      
      // Hide banner when scrolling down past hero, show when scrolling up
      if (currentScrollY > heroHeight) {
        if (currentScrollY > lastScrollY && isVisible) {
          // Scrolling down
          this.hideBanner(floatingBanner);
          isVisible = false;
        } else if (currentScrollY < lastScrollY && !isVisible) {
          // Scrolling up
          this.showBanner(floatingBanner);
          isVisible = true;
        }
      } else {
        // Always show in hero section
        if (!isVisible) {
          this.showBanner(floatingBanner);
          isVisible = true;
        }
      }
      
      lastScrollY = currentScrollY;
    });

    // Add click tracking
    const bannerButton = floatingBanner.querySelector('.btn');
    if (bannerButton) {
      bannerButton.addEventListener('click', () => {
        // Track floating banner click
        this.trackEvent('floating_banner_click');
      });
    }
  }

  hideBanner(banner) {
    banner.style.transform = 'translateY(100px)';
    banner.style.opacity = '0';
  }

  showBanner(banner) {
    banner.style.transform = 'translateY(0)';
    banner.style.opacity = '1';
  }

  // Hero Image Transition on Scroll
  setupHeroImageTransition() {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero__image');
    
    if (!heroSection || !heroImage) return;

    let isTransitioned = false;
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      const triggerPoint = heroHeight * 0.3; // Trigger at 30% scroll

      if (scrollY > triggerPoint && !isTransitioned) {
        this.transitionHeroImage(heroImage);
        isTransitioned = true;
      } else if (scrollY <= triggerPoint && isTransitioned) {
        this.resetHeroImage(heroImage);
        isTransitioned = false;
      }
    });
  }

  transitionHeroImage(image) {
    // Add transition effect
    image.style.filter = 'brightness(0.7) contrast(1.2) saturate(1.3)';
    image.style.transform = 'scale(1.1)';
    image.style.transition = 'all 1s ease-out';
  }

  resetHeroImage(image) {
    // Reset to original state
    image.style.filter = 'none';
    image.style.transform = 'scale(1)';
    image.style.transition = 'all 1s ease-out';
  }

  // Utility function for event tracking
  trackEvent(eventName, data = {}) {
    // Simple event tracking - can be extended with analytics
    console.log(`Event tracked: ${eventName}`, data);
    
    // If Google Analytics is available
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, data);
    }
  }

  // Performance optimization - Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Accessibility enhancements
  enhanceAccessibility() {
    // Add ARIA labels to interactive elements
    const accordionHeaders = document.querySelectorAll('.accordion__header');
    accordionHeaders.forEach((header, index) => {
      if (!header.id) {
        header.id = `accordion-header-${index}`;
      }
      
      const targetId = header.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      
      if (targetContent) {
        targetContent.setAttribute('aria-labelledby', header.id);
        header.setAttribute('aria-controls', targetId);
        
        if (!header.hasAttribute('aria-expanded')) {
          header.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close all open accordions on ESC
        const openAccordions = document.querySelectorAll('.accordion__header[aria-expanded="true"]');
        openAccordions.forEach(header => {
          header.setAttribute('aria-expanded', 'false');
          const targetId = header.getAttribute('data-target');
          const targetContent = document.getElementById(targetId);
          if (targetContent) {
            targetContent.classList.remove('active');
          }
        });
      }
    });
  }
}

// Initialize the application
const app = new YANALandingPage();

// Add loading state management
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Remove any loading states
  const loadingElements = document.querySelectorAll('.loading');
  loadingElements.forEach(el => el.classList.remove('loading'));
  
  // Enhance accessibility after load
  app.enhanceAccessibility();
});

// Handle resize events
window.addEventListener('resize', app.debounce(() => {
  // Recalculate positions if needed
  const floatingBanner = document.querySelector('.floating-banner');
  if (floatingBanner && window.innerWidth <= 768) {
    floatingBanner.style.transform = 'none';
    floatingBanner.style.opacity = '1';
  }
}, 250));