// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

// Reveal on scroll
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => revealObserver.observe(item));

// Active navigation
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".site-nav a")];

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  navLinks.forEach(link => {
    const target = link.getAttribute("href")?.slice(1);
    link.classList.toggle("active", target === visible.target.id);
  });
}, {
  rootMargin: "-35% 0px -55% 0px",
  threshold: [0, 0.1, 0.25, 0.5]
});

sections.forEach(section => sectionObserver.observe(section));

// Nếu ảnh chưa tồn tại, tự thay bằng placeholder có tên file.
// Sau này chỉ cần bỏ ảnh đúng tên vào /assets, không cần sửa HTML.
document.querySelectorAll("img[data-placeholder]").forEach(img => {
  img.addEventListener("error", () => {
    const filename = img.dataset.placeholder || "image.jpg";
    const placeholder = document.createElement("div");
    placeholder.className = "img-placeholder";
    placeholder.innerHTML = `
      <div>
        <div style="font-size: 2rem; margin-bottom: 8px;">🖼️</div>
        <div>Thay ảnh tại:</div>
        <code>assets/${filename}</code>
      </div>
    `;
    img.replaceWith(placeholder);
  }, { once: true });
});
