/* =========================================================
   PORTFOLIO : SCRIPTS

   Toutes les fonctionnalités s'activent depuis le HTML, grâce
   à des attributs. Il n'y a rien à modifier ici pour ajouter
   du contenu.

   data-header          En-tête : se masque en descendant, réapparaît en remontant
   data-nav-toggle      Bouton qui ouvre le menu sur mobile
   data-theme-toggle    Bouton clair / sombre (le choix est mémorisé)
   data-collapsible     Bloc replié avec un bouton « Lire la suite »
                        Hauteur personnalisable : data-collapsible="22rem"
                        Si le contenu est court, aucun bouton n'est ajouté.
   data-reveal          Apparition douce quand l'élément arrive à l'écran
   data-back-to-top     Bouton de retour en haut (apparaît après défilement)
   data-year            Remplacé par l'année en cours
   .media img           Toute image dans un .media s'agrandit au clic
                        (ajouter data-no-zoom sur l'image pour l'éviter)

   Le lien actif du menu est mis en évidence automatiquement
   selon la section affichée.
   ========================================================= */

const CONFIG = {
    labels: {
        more: 'Lire la suite',
        less: 'Réduire',
        close: 'Fermer',
        zoom: "Agrandir l'image",
    },
    headerHideAfter: 240,   // px défilés avant de pouvoir masquer l'en-tête
    backToTopAfter: 800,    // px défilés avant d'afficher le bouton de retour
    themeStorageKey: 'theme',
};

const reducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initScrollEffects();
    initActiveNav();
    initCollapsibles();
    initLightbox();
    initReveal();
    initYear();
});


/* ---------------------------------------------------------
   Thème clair / sombre
--------------------------------------------------------- */
function initTheme() {
    const button = document.querySelector('[data-theme-toggle]');
    if (!button) return;

    const root = document.documentElement;
    const currentTheme = () =>
        root.dataset.theme ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const syncButton = () =>
        button.setAttribute('aria-pressed', String(currentTheme() === 'dark'));

    button.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        try {
            localStorage.setItem(CONFIG.themeStorageKey, next);
        } catch (error) {
            /* stockage indisponible : le choix vaut pour cette visite */
        }
        syncButton();
    });

    syncButton();
}


/* ---------------------------------------------------------
   Menu mobile
--------------------------------------------------------- */
function initMobileNav() {
    const header = document.querySelector('[data-header]');
    const toggle = document.querySelector('[data-nav-toggle]');
    if (!header || !toggle) return;

    const setOpen = (open) => {
        header.classList.toggle('nav-open', open);
        toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', () => {
        setOpen(!header.classList.contains('nav-open'));
    });

    // Fermer après un clic sur un lien, avec Échap, ou en cliquant ailleurs
    header.querySelectorAll('.site-nav a').forEach((link) => {
        link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setOpen(false);
    });

    document.addEventListener('click', (event) => {
        if (!header.contains(event.target)) setOpen(false);
    });
}


/* ---------------------------------------------------------
   Effets liés au défilement : en-tête et retour en haut
--------------------------------------------------------- */
function initScrollEffects() {
    const header = document.querySelector('[data-header]');
    const backToTop = document.querySelector('[data-back-to-top]');
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
        const y = window.scrollY;
        const delta = y - lastY;

        if (header) {
            header.classList.toggle('is-scrolled', y > 8);

            // On ignore les micro-mouvements pour éviter les clignotements
            if (Math.abs(delta) > 4) {
                const menuOpen = header.classList.contains('nav-open');
                const hide = delta > 0 && y > CONFIG.headerHideAfter && !menuOpen;
                header.classList.toggle('is-hidden', hide);
            }
        }

        if (backToTop) {
            backToTop.classList.toggle('is-visible', y > CONFIG.backToTopAfter);
        }

        lastY = y;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    // Si on navigue au clavier dans l'en-tête, il doit rester visible
    header?.addEventListener('focusin', () => header.classList.remove('is-hidden'));

    update();
}


/* ---------------------------------------------------------
   Lien actif dans le menu selon la section visible
--------------------------------------------------------- */
function initActiveNav() {
    const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
    if (!links.length || !('IntersectionObserver' in window)) return;

    const sections = new Map();
    links.forEach((link) => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) sections.set(section, link);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((link) => link.removeAttribute('aria-current'));
            sections.get(entry.target).setAttribute('aria-current', 'true');
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach((_, section) => observer.observe(section));
}


/* ---------------------------------------------------------
   Blocs repliables « Lire la suite »
--------------------------------------------------------- */
function initCollapsibles() {
    let count = 0;

    document.querySelectorAll('[data-collapsible]').forEach((block) => {
        if (block.dataset.collapsible) {
            block.style.setProperty('--collapsed-height', block.dataset.collapsible);
        }
        block.classList.add('collapsible', 'is-collapsed');

        // Contenu assez court : on n'ajoute pas de bouton
        if (block.scrollHeight <= block.clientHeight + 24) {
            block.classList.remove('collapsible', 'is-collapsed');
            return;
        }

        if (!block.id) block.id = `collapsible-${++count}`;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'collapsible__toggle';
        button.textContent = CONFIG.labels.more;
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', block.id);
        block.after(button);

        button.addEventListener('click', () => {
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            if (isOpen) {
                collapseBlock(block, button);
            } else {
                expandBlock(block, button);
            }
        });
    });
}

function expandBlock(block, button) {
    block.style.maxHeight = `${block.clientHeight}px`; // point de départ
    block.classList.remove('is-collapsed');
    void block.offsetHeight;                           // force le calcul
    block.style.maxHeight = `${block.scrollHeight}px`; // point d'arrivée

    button.setAttribute('aria-expanded', 'true');
    button.textContent = CONFIG.labels.less;

    // Une fois ouvert, plus de limite (utile si un accordéon s'ouvre dedans)
    afterTransition(block, () => {
        if (button.getAttribute('aria-expanded') === 'true') {
            block.style.maxHeight = 'none';
        }
    });
}

function collapseBlock(block, button) {
    block.style.maxHeight = `${block.scrollHeight}px`;
    void block.offsetHeight;
    block.classList.add('is-collapsed');
    block.style.maxHeight = ''; // la classe reprend la main

    button.setAttribute('aria-expanded', 'false');
    button.textContent = CONFIG.labels.more;

    // Si le haut de la carte est sorti de l'écran, on y revient
    const card = block.closest('.card') || block;
    if (card.getBoundingClientRect().top < 0) {
        card.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    }
}

function afterTransition(element, callback) {
    let done = false;
    const finish = () => {
        if (done) return;
        done = true;
        element.removeEventListener('transitionend', onEnd);
        callback();
    };
    const onEnd = (event) => {
        if (event.target === element && event.propertyName === 'max-height') finish();
    };
    element.addEventListener('transitionend', onEnd);
    setTimeout(finish, 700); // filet de sécurité
}


/* ---------------------------------------------------------
   Agrandissement des images (lightbox)
--------------------------------------------------------- */
function initLightbox() {
    const images = document.querySelectorAll('.media img:not([data-no-zoom])');
    if (!images.length || typeof HTMLDialogElement === 'undefined') return;

    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.setAttribute('aria-label', 'Image agrandie');
    dialog.innerHTML = `
        <button class="lightbox__close icon-btn" type="button" aria-label="${CONFIG.labels.close}">&#x2715;</button>
        <figure>
            <img class="lightbox__img" alt="">
            <figcaption class="lightbox__caption"></figcaption>
        </figure>`;
    document.body.append(dialog);

    const bigImage = dialog.querySelector('.lightbox__img');
    const caption = dialog.querySelector('.lightbox__caption');

    const open = (img) => {
        const figcaption = img.closest('figure')?.querySelector('figcaption');
        const text = figcaption ? figcaption.textContent.trim() : img.alt;

        bigImage.src = img.currentSrc || img.src;
        bigImage.alt = img.alt;
        caption.textContent = text;
        caption.hidden = !text;
        dialog.showModal();
    };

    images.forEach((img) => {
        img.classList.add('is-zoomable');
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `${CONFIG.labels.zoom} : ${img.alt}`);

        img.addEventListener('click', () => open(img));
        img.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                open(img);
            }
        });
    });

    // Un clic n'importe où referme ; Échap est géré par le navigateur
    dialog.addEventListener('click', () => dialog.close());
}


/* ---------------------------------------------------------
   Apparition au défilement
--------------------------------------------------------- */
function initReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
        items.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach((item) => observer.observe(item));
}


/* ---------------------------------------------------------
   Année en cours (pied de page)
--------------------------------------------------------- */
function initYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll('[data-year]').forEach((el) => {
        el.textContent = year;
    });
}
