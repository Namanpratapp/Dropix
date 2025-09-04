// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      navToggle.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on links
  if (navLinks) {
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('show');
        if (navToggle) {
          navToggle.classList.remove('active');
        }
      });
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navLinks && navToggle) {
      const isClickInsideNav = navLinks.contains(event.target) || navToggle.contains(event.target);
      
      if (!isClickInsideNav && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        navToggle.classList.remove('active');
      }
    }
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = anchor.getAttribute('href');
      
      // Skip if it's just '#' or empty
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        // Calculate offset to account for sticky header
        const headerHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });

  // Set current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  // Add scroll effect to navigation
  let lastScrollTop = 0;
  const nav = document.querySelector('.nav');
  
  if (nav) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add/remove background opacity based on scroll position
      if (scrollTop > 50) {
        nav.style.background = 'rgba(11,11,15,0.95)';
      } else {
        nav.style.background = 'rgba(11,11,15,0.8)';
      }
      
      lastScrollTop = scrollTop;
    });
  }

  // Add hover effects to video placeholders
  const videoPlaceholders = document.querySelectorAll('.video-placeholder');
  
  videoPlaceholders.forEach(function(placeholder) {
    const playButton = placeholder.querySelector('.play-button');
    
    if (playButton) {
      placeholder.addEventListener('mouseenter', function() {
        playButton.style.transform = 'scale(1.1)';
      });
      
      placeholder.addEventListener('mouseleave', function() {
        playButton.style.transform = 'scale(1)';
      });
      
      // Add click handler for demo purposes
      placeholder.addEventListener('click', function() {
        // Create a simple pulse effect
        playButton.style.transform = 'scale(0.9)';
        setTimeout(function() {
          playButton.style.transform = 'scale(1.1)';
        }, 150);
        
        // You could add actual video functionality here
        console.log('Video placeholder clicked - would play video in real implementation');
      });
    }
  });

  // Add subtle parallax effect to hero background
  const heroBg = document.querySelector('.hero__bg');
  
  if (heroBg) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector('.hero');
      
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPercent = scrolled / heroHeight;
        
        // Only apply effect while hero is visible
        if (scrollPercent <= 1) {
          heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
      }
    });
  }

  // Add intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards for fade-in effect
  const cards = document.querySelectorAll('.card');
  cards.forEach(function(card, index) {
    // Set initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    // Start observing
    observer.observe(card);
  });

  // Add smooth reveal for hero content
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(function() {
      heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  }

  // Handle form submissions (if any forms are added later)
  const forms = document.querySelectorAll('form');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Add form handling logic here
      console.log('Form submitted - add actual form handling logic');
      
      // Show success message
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sent!';
        submitButton.disabled = true;
        
        setTimeout(function() {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }, 3000);
      }
    });
  });

  // Add keyboard navigation support
  document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      if (navToggle) {
        navToggle.classList.remove('active');
      }
    }
    
    // Navigate sections with arrow keys (when not in form elements)
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
      const sections = ['#services', '#process', '#work', '#pricing', '#contact'];
      let currentIndex = -1;
      
      // Find current section based on scroll position
      sections.forEach(function(selector, index) {
        const section = document.querySelector(selector);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentIndex = index;
          }
        }
      });
      
      let targetIndex = -1;
      
      if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
        targetIndex = currentIndex + 1;
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        targetIndex = currentIndex - 1;
      }
      
      if (targetIndex >= 0) {
        e.preventDefault();
        const targetSection = document.querySelector(sections[targetIndex]);
        if (targetSection) {
          const headerHeight = document.querySelector('.nav')?.offsetHeight || 0;
          const targetPosition = targetSection.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  });

  // Add performance optimization for scroll events
  let ticking = false;
  
  function updateOnScroll() {
    // Add any scroll-based updates here
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);

  // Console welcome message
  console.log('%c🎬 Dropix Media - Video-first Marketing Agency', 'font-size: 16px; color: #7C5CFC; font-weight: bold;');
  console.log('%cWebsite fully loaded and interactive!', 'color: #16D2A6;');
  
});