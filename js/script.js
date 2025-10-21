const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;
const themeIcon = themeToggle.querySelector("i");

const currentTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
    const theme = html.getAttribute("data-theme");
    const newTheme = theme === "light" ? "dark" : "light";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === "dark") {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    });
});

const navLinks = document.querySelectorAll('nav a[href^="#"]');
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");
        const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);

        if (
            navLink &&
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
        ) {
            navLinks.forEach((link) => link.classList.remove("active"));
            navLink.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
});

document.querySelectorAll(".fade-in").forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
});
