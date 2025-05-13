import "./style.css";

// Використовуємо IIFE для ізоляції змінних та запобігання глобальному забрудненню
(function() {
  // Функція ініціалізації після завантаження DOM
  function initApp() {
    setupMobileMenu();
    setupLazyLoading();
    setupAccessibility();
    setupAnimations();
  }

  // Налаштування мобільного меню з покращеною доступністю
  function setupMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (toggle && mobileMenu) {
      // Додаємо атрибути доступності
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', 'mobile-menu');
      
      toggle.addEventListener("click", () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        
        // Перемикаємо видимість меню
        if (mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.remove('hidden');
          mobileMenu.classList.add('flex');
        } else {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
        }
      });
      
      // Закриваємо меню при кліку поза ним
      document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !toggle.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // Налаштування ледачого завантаження зображень з підтримкою fallback
  function setupLazyLoading() {
    // Перевіряємо підтримку IntersectionObserver
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '200px' // Завантажуємо зображення трохи раніше для кращого UX
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback для браузерів без підтримки IntersectionObserver
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }
  
  // Покращення доступності
  function setupAccessibility() {
    // Додаємо фокус-стилі для кращої навігації з клавіатури
    document.querySelectorAll('a, button').forEach(element => {
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          element.click();
        }
      });
    });
  }
  
  // Налаштування анімацій для покращення UX
  function setupAnimations() {
    // Додаємо анімації при прокручуванні, якщо підтримується IntersectionObserver
    if ('IntersectionObserver' in window) {
      const animatedElements = document.querySelectorAll('.flex-col.bg-stone-100');
      
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            animationObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      animatedElements.forEach(el => animationObserver.observe(el));
    }
  }

  // Запускаємо ініціалізацію після завантаження DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
