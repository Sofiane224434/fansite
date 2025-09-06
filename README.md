# Fansite – Malaisie

Un site vitrine statique pour découvrir la Malaisie. Le projet propose une page d’accueil et plusieurs sections thématiques: Régions, Culture, Gastronomie, Budget, Visa et F.A.Q.

Lien d’entrée du site (local): `Malaisie-Site/index.html`

## Fonctionnalités
- Navigation simple avec menu responsive
- Pages thématiques:
  - Accueil
  - Régions
  - Culture
  - Food (Gastronomie)
  - Budget
  - Visa
  - F.A.Q
- Ressources statiques organisées (images, icônes)
- Footer avec liens utiles et coordonnées de l’ambassade

## Structure du projet
```text
Malaisie-Site/
├─ index.html
├─ pages/
│  ├─ regions.html
│  ├─ culture.html
│  ├─ food.html
│  ├─ budget.html
│  ├─ visa.html
│  └─ faq.html
├─ assets/
│  ├─ images/
│  ├─ icons/
│  └─ menu.js
└─ malaisie.ico
```

Le style principal se fait avec TailwindCSS et le menu déroulant avec Javascript

## Démarrer en local

Prérequis: un navigateur web (Chrome, Firefox, Edge, Safari). Aucune dépendance requis.

Option 1 — Ouvrir directement le fichier:
1. Cloner le dépôt
2. Ouvrir `Malaisie-Site/index.html` dans votre navigateur

Option 2 — Servir via un petit serveur local (recommandé pour les chemins relatifs):
- Avec Python (défaut sur macOS/Linux, installable sur Windows):
  ```bash
  git clone https://github.com/Sofiane224434/fansite.git
  cd fansite/Malaisie-Site
  python3 -m http.server 8000
  # puis ouvrir http://localhost:8000 dans le navigateur
  ```

- Avec l’extension VS Code “Live Server”:
  - Ouvrir le dossier `Malaisie-Site`
  - Lancer “Open with Live Server” sur `index.html`

## Déploiement sur GitHub Pages

Comme le site est statique, vous avez plusieurs options:

- Option A — Utiliser un dossier `/docs`:
  1. Renommer `Malaisie-Site/` en `docs/`
  2. Commit/push
  3. Dans “Settings” > “Pages” > “Build and deployment”:
     - Source: “Deploy from a branch”
     - Branch: `main` et dossier `/docs`
  4. Ouvrir l’URL fournie par GitHub Pages

- Option B — Placer les fichiers à la racine:
  1. Déplacer le contenu de `Malaisie-Site/` à la racine du dépôt
  2. Dans “Settings” > “Pages”, choisir “Branch: main / root”

Note: Les chemins relatifs (`assets/...`) fonctionneront tant que les fichiers gardent la même hiérarchie par rapport à `index.html`.

## Personnalisation

- Titre et favicon: modifier `<title>` et `malaisie.ico` dans `Malaisie-Site/`
- Styles: éditer dans l'html avec TailwindCSS, Javascript et `<style>`
- Contenu: éditer les fichiers dans `pages/` pour enrichir chaque section (texte, images, liens, etc.)

## Captures d’écran (optionnel)
Ajoutez des captures dans `assets/images/` puis référencez-les ici:
```markdown
![Accueil](assets/images/accueil.png)
```

## Améliorations possibles
- Ajouter plus de contenu (texte, photos, cartes) par page
- Accessibilité (contraste, navigation clavier, attributs alt)
- SEO (balises meta, titres, descriptions)
- Internationalisation (fr/en)
- Tests d’affichage mobile/tablette (media queries)

## Crédits
- Informations ambassade (footer): Ambassade de Malaisie à Paris

## Auteur
- @Sofiane224434

## Licence
Non spécifiée pour le moment.
