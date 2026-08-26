
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.body.dataset.theme = "light";

function updateThemeIcon() {
  const light = document.body.dataset.theme === "light";
  themeIcon.classList.toggle("fa-sun", light);
  themeIcon.classList.toggle("fa-moon", !light);
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const light = document.body.dataset.theme !== "light";
  document.body.dataset.theme = light ? "light" : "dark";
  localStorage.setItem("portfolio-theme", light ? "light" : "dark");
  updateThemeIcon();
});

const progress = document.getElementById("scrollProgress");
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max ? window.scrollY / max : 0})`;
  scrollTopBtn.classList.toggle("show", window.scrollY > 450);
});

scrollTopBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
hamburger.addEventListener("click", () => navMenu.classList.toggle("active"));
document.querySelectorAll(".nav-menu a").forEach(a => a.addEventListener("click", () => navMenu.classList.remove("active")));

const typewriter = document.querySelector(".typewriter");
const texts = JSON.parse(typewriter.dataset.text);
let textIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = texts[textIndex];
  typewriter.textContent = current.substring(0, charIndex);
  if (!deleting) {
    if (charIndex < current.length) { charIndex++; return setTimeout(typeLoop, 80); }
    deleting = true; return setTimeout(typeLoop, 1300);
  }
  if (charIndex > 0) { charIndex--; return setTimeout(typeLoop, 35); }
  deleting = false;
  textIndex = (textIndex + 1) % texts.length;
  setTimeout(typeLoop, 350);
}
typeLoop();

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.style.display = filter === "all" || card.dataset.category === filter ? "" : "none";
    });
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
form.addEventListener("submit", e => {
  e.preventDefault();
  formNote.textContent = "Your message form is ready. Add your email/FormSubmit address to enable delivery.";
  form.reset();
});
