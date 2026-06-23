const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const whatsappBtn = document.querySelector("#whatsappBtn");
const projectLinks = document.querySelectorAll("[data-project-url]");

const WHATSAPP_NUMBER = "916299329703";
const PROJECT_URLS = [
    "https://priyankakumari742.github.io/hhh/",
    "https://priyankakumari742.github.io/Apex-13000/",
    "https://priyankakumari742.github.io/coaching-demo/"
];

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

projectLinks.forEach((link, index) => {
  link.setAttribute("href", PROJECT_URLS[index] || "#");
});

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

whatsappBtn?.setAttribute(
  "href",
  buildWhatsAppUrl("Hi Sameer, I want to discuss a website project with Bihar Web Studio.")
);

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get("name")?.toString().trim();
  const phone = data.get("phone")?.toString().trim();
  const message = data.get("message")?.toString().trim();

  const whatsappMessage = `Hi Sameer, my name is ${name}. My phone number is ${phone}. Project requirement: ${message}`;
  whatsappBtn?.setAttribute("href", buildWhatsAppUrl(whatsappMessage));
  formStatus.textContent = "Inquiry ready. Use WhatsApp Me to send it directly, or connect this form to your email service.";
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const canvas = document.querySelector("#particleCanvas");
const ctx = canvas.getContext("2d");
const particles = [];
const particleCount = 58;
let width = 0;
let height = 0;

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function createParticles() {
  particles.length = 0;
  for (let index = 0; index < particleCount; index += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.4 + 0.8,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      hue: Math.random() > 0.5 ? "61, 231, 255" : "107, 242, 163",
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${particle.hue}, 0.55)`;
    ctx.fill();

    for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
      const next = particles[nextIndex];
      const distance = Math.hypot(particle.x - next.x, particle.y - next.y);
      if (distance < 145) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = `rgba(61, 231, 255, ${0.13 * (1 - distance / 145)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});
