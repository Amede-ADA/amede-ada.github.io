/* ===========================
   DONNÉES DES PROJETS
=========================== */
const projects = [
    {
        title: "Projet 1 : Nom du Projet",
        description: "Description du projet et du problème résolu.",
        technologies: ["Python", "React", "PostgreSQL"],
        demo: "#"
    },
    {
        title: "Projet 2 : Nom du Projet",
        description: "Description du projet. Défis techniques et rôle.",
        technologies: ["Java", "Spring Boot", "Docker"],
        demo: "#"
    },
    {
        title: "Projet 3 : Nom du Projet",
        description: "Description du projet avec métriques si possible.",
        technologies: ["Node.js", "MongoDB", "AWS"],
        demo: "#"
    }
];


/* ===========================
   CRÉATION DES CARTES PROJETS
=========================== */
function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card reveal';

    const techTags = project.technologies
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');

    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-tags">${techTags}</div>
        <div class="project-links">
            <a href="${project.demo}" target="_blank" rel="noopener">Démo</a>
        </div>
    `;

    return card;
}


/* ===========================
   INITIALISATION AU CHARGEMENT
=========================== */
document.addEventListener('DOMContentLoaded', () => {

    /* ---- Chargement des projets ---- */
    const projectsContainer = document.getElementById('projectsContainer');
    if (projectsContainer) {
        projects.forEach(project => {
            projectsContainer.appendChild(createProjectCard(project));
        });
    }

    /* ---- Navigation fluide ---- */
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---- Animation au scroll (sections + contenus internes) ---- */
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

    /* éléments animés */
    document.querySelectorAll(`
        section,
        .project-card,
        .cert-item,
        .assoc-item,
        .pub-item,
        .languages-list li,
        .skill-category
    `).forEach(el => revealObserver.observe(el));
});


/* ===========================
   AJOUT DYNAMIQUE DE PROJET
=========================== */
function addProject(title, description, technologies, demo) {
    const newProject = { title, description, technologies, demo };
    projects.push(newProject);

    const container = document.getElementById('projectsContainer');
    if (!container) return;

    container.appendChild(createProjectCard(newProject));
}


/* ===========================
   MENU MOBILE (OPTIONNEL)
=========================== */
function toggleMobileMenu() {
    document.querySelector('nav ul')?.classList.toggle('mobile-open');
}


/* ===========================
   NAV TRANSPARENT AU SCROLL
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
