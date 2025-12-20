window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  if (window.scrollY > 50) {
    header.classList.add("bg-scrolled");
    header.classList.remove("bg-transparent");
  } else {
    header.classList.add("bg-transparent");
    header.classList.remove("bg-scrolled");
  }
});

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
    menu.style.flexDirection = "column";
  }
}

// Khởi tạo mặc định lúc load trang
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("main-header");
  if (window.scrollY <= 50) {
    header.classList.add("bg-transparent");
  }
});
