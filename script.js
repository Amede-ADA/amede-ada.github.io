document.addEventListener('DOMContentLoaded', () => {

    /* ===========================
       NAVIGATION FLUIDE
    =========================== */
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ===========================
       ANIMATIONS AU SCROLL
    =========================== */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(`
        section,
        .project-card,
        .cert-item,
        .assoc-item,
        .pub-item,
        .language-badge,
        .skill-block
    `).forEach(el => revealObserver.observe(el));
});


/* ===========================
   NAV TRANSPARENTE AU SCROLL
=========================== */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const fadeStart = 100;
    const fadeEnd = 450;

    let opacity = 1;

    if (scrollY <= fadeStart) {
        opacity = 1;
        nav.style.pointerEvents = 'auto';
    } 
    else if (scrollY >= fadeEnd) {
        opacity = 0;
        nav.style.pointerEvents = 'none';
    } 
    else {
        opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        nav.style.pointerEvents = 'none';
    }

    nav.style.opacity = opacity;
});


/* ===========================
  PROJETS: bouton “Lire la suite” 
=========================== */
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".read-more-btn");

    buttons.forEach(btn => {
        const content = btn.previousElementSibling;

        btn.addEventListener("click", () => {
            if(content.classList.contains("expanded")) {
                // replier le contenu
                content.style.maxHeight = "120px"; // hauteur initiale visible
                content.classList.remove("expanded");
                btn.textContent = "Lire la suite";
            } else {
                // dérouler complètement
                content.style.maxHeight = null; // enlève la limite
                content.classList.add("expanded");
                btn.textContent = "Réduire";
            }
        });
    });
});
