// Données des projets
const projects = [
    {
        title: "Projet 1 : Nom du Projet",
        description: "Description du projet et du problème résolu. Expliquez l'objectif principal et l'impact du projet.",
        technologies: ["Python", "React", "PostgreSQL"],
        demo: "#"
    },
    {
        title: "Projet 2 : Nom du Projet",
        description: "Description du projet. Mettez en avant votre rôle et les défis techniques que vous avez surmontés.",
        technologies: ["Java", "Spring Boot", "Docker"],
        demo: "#"
    },
    {
        title: "Projet 3 : Nom du Projet",
        description: "Description du projet. Incluez des métriques si possible (amélioration des performances, utilisateurs touchés, etc.).",
        technologies: ["Node.js", "MongoDB", "AWS"],
        demo: "#"
    }
];

// Fonction pour créer une carte de projet
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    
    const techTags = project.technologies
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
    
    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-tags">
            ${techTags}
        </div>
        <div class="project-links">
            <a href="${project.demo}" target="_blank">Démo</a>
        </div>
    `;
    
    return card;
}

// Charger les projets au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('projectsContainer');
    
    projects.forEach(project => {
        const card = createProjectCard(project);
        container.appendChild(card);
    });
    
    // Navigation fluide
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Fonction pour ajouter un nouveau projet (pour faciliter l'ajout futur)
function addProject(title, description, technologies, demo) {
    projects.push({
        title,
        description,
        technologies,
        demo
    });
    
    // Recharger l'affichage
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    projects.forEach(project => {
        const card = createProjectCard(project);
        container.appendChild(card);
    });
}

// Gestion du menu mobile (optionnel)
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('mobile-open');
}
