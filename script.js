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
    const readMoreBtns = document.querySelectorAll(".read-more-btn");

    readMoreBtns.forEach(btn => {
        const projectCard = btn.closest('.project-card');
        const content = projectCard.querySelector('.project-content');

        // Récupérer la hauteur initiale visible (hauteur tronquée)
        const initialHeight = 350; // correspond à ton CSS

        // Définir la hauteur initiale
        content.style.maxHeight = initialHeight + "px";

        btn.addEventListener('click', () => {
            if (content.classList.contains('expanded')) {
                // Replier : revenir à la hauteur initiale
                content.style.maxHeight = initialHeight + "px";
                content.classList.remove('expanded');
                btn.textContent = "Lire la suite";
            } else {
                // Dérouler : utiliser la hauteur réelle du contenu
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add('expanded');
                btn.textContent = "Réduire";
            }
        });
    });

    // Accordéon pour les tech-tags
    const techButtons = document.querySelectorAll(".tech-tag-btn");

    techButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const content = btn.nextElementSibling;
            content.classList.toggle("show");

            if(content.classList.contains("show")){
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0";
            }
        });
    });
});
