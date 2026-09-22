# amede-ada.github.io

# Guide : ajouter du contenu au portfolio

Tout se fait dans `index.html`. Le style et les comportements suivent automatiquement.

## Ajouter une section

```html
<section class="section container" id="ma-section">
    <header class="section__head">
        <h2>Titre de la section</h2>
        <p>Phrase d'introduction (facultative).</p>
    </header>
    <div class="section__body grid">
        <!-- cartes ici -->
    </div>
</section>
```

Puis ajouter le lien dans le menu : `<li><a href="#ma-section">Titre</a></li>`.
Il se met en évidence tout seul quand on arrive sur la section.

Pour `section__body`, choisir la disposition :

| Classe ajoutée   | Effet                                   |
|------------------|-----------------------------------------|
| `grid`           | cartes en colonnes automatiques         |
| `grid grid--wide`| colonnes plus larges (moins de colonnes)|
| `grid grid--narrow` | colonnes étroites (plus de colonnes) |
| `stack`          | éléments empilés sur une seule colonne  |

## Carte (projet, certification, distinction…)

```html
<article class="card">
    <figure class="media">
        <img src="assets/images/..." alt="Description de l'image">
        <figcaption>Légende (facultative)</figcaption>
    </figure>
    <h3 class="card__title">Titre</h3>
    <p class="card__meta">Organisme, 2025</p>

    <div class="card__body" data-collapsible>
        <p>Texte…</p>
    </div>
</article>
```

- `data-collapsible` : ajoute « Lire la suite » si le texte est long. Pour changer la hauteur visible : `data-collapsible="24rem"`.
- `card card--full` : la carte prend toute la largeur de la grille.

## Images et vidéos

| Code | Effet |
|------|-------|
| `<figure class="media">` | image recadrée au format 3:2, agrandissable au clic |
| `<figure class="media media--contain">` | image entière sans recadrage (certificats) |
| `<figure class="media media--portrait">` | format vertical 4:5 |
| `<figure class="media media--video">` | format 16:9 pour `<video>` ou `<iframe>` YouTube |
| `<div class="media-row">` | plusieurs `<figure class="media">` côte à côte |

Pour qu'une image ne s'agrandisse pas au clic : `<img ... data-no-zoom>`.

## Listes

```html
<!-- Étiquettes -->
<ul class="tags"><li>Arduino</li><li>STM32</li></ul>

<!-- Liste simple -->
<ul class="list"><li>Élément</li></ul>

<!-- Réalisations avec coche -->
<ul class="checklist"><li>Résultat obtenu</li></ul>

<!-- Liens (↗ ajouté si nouvel onglet, ↓ si téléchargement) -->
<ul class="links">
    <li><a href="https://..." target="_blank" rel="noopener">Voir le site</a></li>
    <li><a href="assets/documents/rapport.pdf" download>Télécharger le rapport</a></li>
</ul>

<!-- Chiffres clés -->
<dl class="facts">
    <div><dt>Audience</dt><dd>100 000 visites par trimestre</dd></div>
</dl>

<!-- Libellé / valeur -->
<dl class="meta">
    <dt>Délivré par</dt><dd>Organisme</dd>
    <dt>Date</dt><dd>Mars 2025</dd>
</dl>
```

## Accordéon

```html
<div class="accordions">
    <details class="accordion">
        <summary>Titre du volet</summary>
        <div class="accordion__content">
            <p>Contenu…</p>
        </div>
    </details>
</div>
```

Ajouter `open` sur `<details>` pour qu'il soit ouvert par défaut.

## Parcours (postes successifs)

```html
<ol class="timeline">
    <li>
        <div class="timeline__head">
            <h4>Intitulé du poste</h4>
            <span class="period">Depuis mars 2025</span>
        </div>
        <ul class="checklist"><li>Mission</li></ul>
    </li>
</ol>
```

## Boutons

```html
<div class="btn-group">
    <a class="btn" href="...">Action principale</a>
    <a class="btn btn--outline" href="...">Action secondaire</a>
</div>
```

## Effets optionnels

- `data-reveal` sur n'importe quel élément : apparition douce au défilement.
- `<span data-year></span>` : affiche l'année en cours.

## Changer les couleurs ou les polices

Tout est en haut de `style.css`, dans la partie « 1. Variables ».
Les couleurs du thème sombre sont juste en dessous.
