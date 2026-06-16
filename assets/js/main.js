const header = document.querySelector(".site-header");
const nav = document.querySelector("nav");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelectorAll("nav a");
const bg = document.querySelector(".bg-hero");

function updateHeaderState() {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMobileNav() {
    nav.classList.remove("open");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
}

window.addEventListener("scroll", () => {
    updateHeaderState();

    const activeSection = [...navLinks]
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean)
        .reverse()
        .find(section => section.getBoundingClientRect().top <= 120);

    navLinks.forEach(link => {
        const isActive = activeSection && link.getAttribute("href") === `#${activeSection.id}`;
        link.classList.toggle("is-active", Boolean(isActive));
    });
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMobileNav();
    });
});

mobileMenuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("mousemove", event => {
    if (!bg) return;

    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;
    bg.style.transform = `translate(${x}px, ${y}px)`;
});

function initializeLanguage() {
    const savedLang = localStorage.getItem("skyera-lang");
    const browserLang = navigator.language.toLowerCase();
    const defaultLang = browserLang.includes("ja") ? "jp" : browserLang.includes("zh") ? "tw" : "en";

    if (typeof setLang === "function") {
        setLang(savedLang || defaultLang);
    }
}

updateHeaderState();
initializeLanguage();
