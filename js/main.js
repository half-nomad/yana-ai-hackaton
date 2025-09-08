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
    this.setupHeroImageFade();
    this.setupPosterReveal();
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

  // Smooth Scroll Implementation - Enhanced
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
          this.trackEvent('smooth_scroll', { target: targetId });
        }
      });
    });

    // Add scroll spy for navigation highlighting
    this.setupScrollSpy();
  }

  smoothScrollTo(element) {
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = element.offsetTop - headerHeight - 20;
    
    // Use custom smooth scroll for better control
    this.animatedScrollTo(targetPosition);
  }

  animatedScrollTo(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = Math.min(Math.abs(distance) * 0.5, 1000); // Dynamic duration
    let startTime = null;

    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.updateActiveNavLink(navLinks, id);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  updateActiveNavLink(navLinks, activeId) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${activeId}`);
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

  // Hero Image Transition on Scroll - Enhanced
  setupHeroImageTransition() {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero__image');
    const heroBackground = document.querySelector('.hero__background');
    
    if (!heroSection || !heroImage) return;

    // Throttle scroll events for better performance
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateHeroTransition(heroSection, heroImage, heroBackground);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  updateHeroTransition(heroSection, heroImage, heroBackground) {
    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    const scrollProgress = Math.min(scrollY / heroHeight, 1);
    
    // Parallax effect on background
    if (heroBackground) {
      const parallaxOffset = scrollY * 0.5;
      heroBackground.style.transform = `translateY(${parallaxOffset}px)`;
    }
    
    // Progressive image transformation
    if (scrollProgress > 0) {
      const brightness = Math.max(0.4, 1 - (scrollProgress * 0.6));
      const contrast = 1 + (scrollProgress * 0.3);
      const saturate = 1 + (scrollProgress * 0.5);
      const scale = 1 + (scrollProgress * 0.2);
      const blur = scrollProgress * 2;
      
      heroImage.style.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturate}) blur(${blur}px)`;
      heroImage.style.transform = `scale(${scale})`;
      heroImage.style.transition = scrollProgress === 0 ? 'all 0.6s ease-out' : 'none';
    } else {
      // Reset to original state
      heroImage.style.filter = 'none';
      heroImage.style.transform = 'scale(1)';
      heroImage.style.transition = 'all 0.6s ease-out';
    }
    
    // Add overlay intensity based on scroll
    const overlay = heroBackground.querySelector('::after') || heroBackground;
    if (overlay) {
      const overlayOpacity = 0.6 + (scrollProgress * 0.3);
      overlay.style.setProperty('--overlay-opacity', overlayOpacity);
    }
  }

  // Hero Image Auto Fade (2-second intervals)
  setupHeroImageFade() {
    const noonImage = document.querySelector('.hero__image--noon');
    const nightImage = document.querySelector('.hero__image--night');
    
    if (!noonImage || !nightImage) return;

    let isNightActive = false;
    
    // Auto-fade every 2 seconds
    setInterval(() => {
      if (isNightActive) {
        nightImage.classList.remove('active');
        isNightActive = false;
      } else {
        nightImage.classList.add('active');
        isNightActive = true;
      }
    }, 2000);
  }

  // Poster Brightness Effect on Scroll
  setupPosterReveal() {
    const posterSection = document.querySelector('.poster-reveal');
    if (!posterSection) return;

    // Throttle scroll events for better performance
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updatePosterBrightness(posterSection);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  updatePosterBrightness(posterSection) {
    const rect = posterSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;
    
    // Calculate scroll progress within the poster section
    let scrollProgress = 0;
    
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      // Section is visible
      if (rect.top > 0) {
        // Section is entering from bottom
        scrollProgress = (windowHeight - rect.top) / windowHeight;
      } else if (rect.bottom < windowHeight) {
        // Section is leaving from top
        scrollProgress = rect.bottom / windowHeight;
      } else {
        // Section fills the viewport
        scrollProgress = 1;
      }
      
      // Clamp progress between 0 and 1
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));
      
      // Calculate brightness: 0.3 (dark) to 1.2 (bright) based on scroll progress
      const brightness = 0.3 + (scrollProgress * 0.9);
      
      posterSection.style.filter = `brightness(${brightness})`;
    } else {
      // Section is not visible, keep it dark
      posterSection.style.filter = 'brightness(0.3)';
    }
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