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
    this.setupMobileMenu();
    this.setupAccordions();
    this.setupSmoothScroll();
    this.setupFloatingBanner();
    this.setupHeroImageTransition();
    this.setupHeroImageFade();
    this.setupPosterReveal();
    this.setupCurriculumModal();
    this.setupApplicationNoticeModal();
  }

  // Mobile Menu Implementation
  setupMobileMenu() {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const mobileNav = document.querySelector('.header__mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__list a');
    
    if (!menuToggle || !mobileNav) return;

    // Toggle mobile menu
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMobileMenu(menuToggle, mobileNav);
    });

    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu(menuToggle, mobileNav);
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header') && mobileNav.classList.contains('active')) {
        this.closeMobileMenu(menuToggle, mobileNav);
      }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        this.closeMobileMenu(menuToggle, mobileNav);
      }
    });
  }

  toggleMobileMenu(toggle, nav) {
    const isActive = nav.classList.contains('active');
    
    if (isActive) {
      this.closeMobileMenu(toggle, nav);
    } else {
      this.openMobileMenu(toggle, nav);
    }
  }

  openMobileMenu(toggle, nav) {
    toggle.classList.add('active');
    nav.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', '메뉴 닫기');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  closeMobileMenu(toggle, nav) {
    toggle.classList.remove('active');
    nav.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
    document.body.style.overflow = ''; // Restore scrolling
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
    // 모든 스크롤 기반 효과 제거 - 원본 이미지 유지
  }

  // Hero Image Auto Fade (2-second intervals)
  setupHeroImageFade() {
    const noonImage = document.querySelector('.hero__image--noon');
    const nightImage = document.querySelector('.hero__image--night');
    const heroContent = document.querySelector('.hero__content');
    const heroBackground = document.querySelector('.hero__background');
    
    if (!noonImage || !nightImage || !heroContent || !heroBackground) return;

    let isNightActive = false;
    
    // Auto-fade every 2 seconds
    setInterval(() => {
      if (isNightActive) {
        nightImage.classList.remove('active');
        heroContent.classList.remove('hero__content--night');
        heroBackground.classList.remove('hero__background--night');
        isNightActive = false;
      } else {
        nightImage.classList.add('active');
        heroContent.classList.add('hero__content--night');
        heroBackground.classList.add('hero__background--night');
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

  // Curriculum Modal Implementation
  setupCurriculumModal() {
    const modal = document.getElementById('curriculum-modal');
    const modalOverlay = modal.querySelector('.modal__overlay');
    const closeButton = modal.querySelector('.modal__close');
    const curriculumItems = document.querySelectorAll('.curriculum__flow .flow-item');
    
    if (!modal || !curriculumItems.length) return;

    const curriculumData = {
      'branding': {
        title: 'AI 브랜딩 전략',
        description: 'AI 도구를 활용한 브랜드 아이덴티티 구축과 마케팅 전략 수립',
        content: [
          { subtitle: '핵심 학습 내용', items: ['브랜드 포지셔닝 전략', 'AI 기반 타겟 분석', '브랜드 스토리텔링', '시각적 브랜드 아이덴티티'] },
          { subtitle: '활용 도구', items: ['ChatGPT', 'Claude', 'Google AI Studio'] },
          { subtitle: '프로젝트 결과물', items: ['브랜드 전략 기획 및 가이드라인'] }
        ]
      },
      'writing': {
        title: 'AI 콘텐츠 라이팅',
        description: 'AI를 활용한 효과적인 콘텐츠 제작과 카피라이팅 기법',
        content: [
          { subtitle: '핵심 학습 내용', items: ['AI 프롬프트 엔지니어링', '콘텐츠 전략 수립', '다양한 채널별 라이팅', 'SEO 최적화 콘텐츠'] },
          { subtitle: '활용 도구', items: ['ChatGPT'] },
          { subtitle: '프로젝트 결과물', items: ['우리 브랜드(나)에 대한 콘텐츠 크리에이팅 방법'] }
        ]
      },
      'design': {
        title: 'AI 디자인 & 비주얼',
        description: 'AI 도구를 활용한 창의적인 디자인과 비주얼 콘텐츠 제작',
        content: [
          { subtitle: '핵심 학습 내용', items: ['AI 이미지 생성 기법', 'AI 이미지 편집', '브랜드 일관성 유지', '실무 디자인 팁'] },
          { subtitle: '활용 도구', items: ['ChatGPT', 'Google Whisk', 'Google Nano Banana'] },
          { subtitle: '프로젝트 결과물', items: ['AI 콘텐츠 이미지 생성 및 디자인'] }
        ]
      },
      'coding': {
        title: 'AI로 랜딩페이지 제작',
        description: '비개발자도 빠르게 만드는 랜딩페이지 및 앱 개발 노하우',
        content: [
          { subtitle: '핵심 학습 내용', items: ['비개발자도 빠르게 만드는 랜딩페이지', '앱 개발 노하우'] },
          { subtitle: '활용 도구', items: ['ChatGPT', 'Google AI Studio'] },
          { subtitle: '프로젝트 결과물', items: ['온라인에서 사용가능한 랜딩페이지'] }
        ]
      },
      'automation': {
        title: 'AI 자동화',
        description: '자동화의 의의와 자동화 기획, Make.com으로 고객 DB 수집, 이메일 SMS 발송 자동화',
        content: [
          { subtitle: '핵심 학습 내용', items: ['자동화의 의의와 자동화 기획', 'Make.com으로 고객 DB 수집', '이메일 SMS 발송 자동화'] },
          { subtitle: '활용 도구', items: ['Gemini', 'Make'] },
          { subtitle: '프로젝트 결과물', items: ['고객 DB 자동화 수집시스템', 'DB 수집 시스템 랜딩페이지 연결'] }
        ]
      }
    };

    // Handle curriculum item clicks
    curriculumItems.forEach((item, index) => {
      const flowItems = ['branding', 'writing', 'design', 'coding', 'automation'];
      const dataKey = flowItems[index];
      
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCurriculumModal(modal, curriculumData[dataKey]);
        this.trackEvent('curriculum_modal_open', { section: dataKey });
      });
    });

    // Handle modal close
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    modalOverlay.addEventListener('click', closeModal);
    closeButton.addEventListener('click', closeModal);

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  openCurriculumModal(modal, data) {
    const modalTitle = modal.querySelector('.modal__title');
    const modalDescription = modal.querySelector('.modal__description');
    
    // Update modal content
    modalTitle.textContent = data.title;
    
    let contentHTML = `<p>${data.description}</p>`;
    
    data.content.forEach(section => {
      contentHTML += `
        <h4>${section.subtitle}</h4>
        <ul>
          ${section.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      `;
    });
    
    modalDescription.innerHTML = contentHTML;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
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

  // Application Notice Modal
  setupApplicationNoticeModal() {
    const modal = document.getElementById('application-notice-modal');
    const modalOverlay = modal.querySelector('.modal__overlay');
    const closeButton = modal.querySelector('.modal__close');
    const applicationButtons = document.querySelectorAll('[data-action="show-application-notice"]');

    // Handle application button clicks
    applicationButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.openApplicationNoticeModal(modal);
      });
    });

    // Handle modal close
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    modalOverlay.addEventListener('click', closeModal);
    closeButton.addEventListener('click', closeModal);

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  openApplicationNoticeModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
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