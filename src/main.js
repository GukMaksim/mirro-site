import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  // Мобільне меню
  const toggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  toggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
});
