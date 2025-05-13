import "./style.css";

// Використовуємо IIFE для ізоляції змінних та запобігання глобальному забрудненню
(function() {
  // Функція ініціалізації після завантаження DOM
  function initApp() {
    setupMobileMenu();
    setupLazyLoading();
  }

  // Налаштування мобільного меню
  function setupMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (toggle && mobileMenu) {
      toggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
  }

  // Налаштування ледачого завантаження зображень
  function setupLazyLoading() {
    // Перевіряємо підтримку IntersectionObserver
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  // Запускаємо ініціалізацію після завантаження DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
