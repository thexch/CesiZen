# Mini documentation des fichiers CESIZen

Ce fichier sert de fiche de révision. Il explique les fichiers importants du projet avec deux idées simples : à quoi sert le fichier et comment il fonctionne.

## Racine

### `README.md`
- Sert à présenter le projet.
- Fonctionne comme une page d'introduction rapide pour comprendre le dépôt.

### `Sujet Détaillé - Projet CESIZen.pdf`
- Sert de sujet officiel.
- Fonctionne comme référence pour vérifier les modules demandés.

### `Grille dévaluation BLOC 2.pdf`
- Sert à comprendre les critères de notation.
- Fonctionne comme guide pour préparer la soutenance et les livrables.

## Frontend - Configuration

### `frontend/package.json`
- Sert à lister les dépendances et scripts frontend.
- Fonctionne avec `npm run dev`, `npm run build`, `npm run preview` et `npm run test`.

### `frontend/package-lock.json`
- Sert à verrouiller les versions installées.
- Fonctionne automatiquement avec npm et ne se modifie pas à la main.

### `frontend/index.html`
- Sert de page HTML de départ.
- Fonctionne avec une div `root` dans laquelle React affiche l'application.

### `frontend/vite.config.ts`
- Sert à configurer Vite.
- Fonctionne en activant le plugin React.

### `frontend/eslint.config.js`
- Sert à configurer ESLint côté frontend.
- Fonctionne avec les règles TypeScript et React.

### `frontend/tsconfig.json`, `frontend/tsconfig.app.json`, `frontend/tsconfig.node.json`
- Servent à configurer TypeScript.
- Fonctionnent en définissant comment les fichiers TypeScript sont vérifiés.

## Frontend - Public et PWA

### `frontend/public/cesizen-logo.svg`
- Sert de logo principal.
- Fonctionne comme image utilisée dans la navbar, l'accueil et le footer.

### `frontend/public/favicon.svg`
- Sert d'icône dans l'onglet du navigateur.
- Fonctionne grâce au lien déclaré dans `index.html`.

### `frontend/public/manifest.webmanifest`
- Sert à décrire la PWA.
- Fonctionne avec le navigateur pour proposer l'installation de l'application.

### `frontend/public/sw.js`
- Sert de service worker.
- Fonctionne en mettant en cache certains fichiers de l'application.

### `frontend/public/pwa-icon-192.png`, `pwa-icon-512.png`, `pwa-icon-maskable.png`
- Servent d'icônes PWA.
- Fonctionnent quand l'application est installée sur mobile ou ordinateur.

## Frontend - Entrée de l'application

### `frontend/src/main.tsx`
- Sert à démarrer React.
- Fonctionne en affichant `App` dans l'élément HTML `root` et en activant `BrowserRouter`.

### `frontend/src/App.tsx`
- Sert à gérer les routes.
- Fonctionne avec React Router : chaque URL affiche une page différente.

### `frontend/src/api.ts`
- Sert à centraliser les appels au backend.
- Fonctionne avec `fetch`, `VITE_API_URL`, le token stocké dans `localStorage` et des fonctions par action.

### `frontend/src/index.css`
- Sert à définir le style global.
- Fonctionne avec des variables CSS, les couleurs, les styles de base et les focus.

## Frontend - Pages

### `frontend/src/pages/Accueil.tsx`
- Sert à afficher la page d'accueil.
- Fonctionne avec une présentation du projet, un lien vers la respiration et des animations Framer Motion.

### `frontend/src/pages/Respiration.tsx`
- Sert à afficher l'exercice de respiration.
- Fonctionne avec des états React pour le rythme, le timer, la phase actuelle et le démarrage.

### `frontend/src/pages/Informations.tsx`
- Sert à afficher les articles/informations.
- Fonctionne en récupérant les données via l'API et en ouvrant les articles dans une modal animée.

### `frontend/src/pages/Connexion.tsx`
- Sert à connecter ou inscrire un utilisateur.
- Fonctionne avec un formulaire, un mode connexion/inscription et l'enregistrement du token après succès.

### `frontend/src/pages/Profil.tsx`
- Sert à gérer le profil connecté.
- Fonctionne avec l'API pour charger, modifier, supprimer le compte ou se déconnecter.

### `frontend/src/pages/Admin.tsx`
- Sert à gérer l'administration.
- Fonctionne avec deux onglets : utilisateurs et informations. Les actions passent par les routes admin du backend.

### `frontend/src/pages/CGU.tsx`
- Sert à afficher les conditions générales d'utilisation.
- Fonctionne comme une page statique accessible depuis le footer.

### `frontend/src/pages/PolitiqueConfidentialite.tsx`
- Sert à afficher la politique de confidentialité.
- Fonctionne comme une page statique accessible depuis le footer.

### `frontend/src/pages/Contact.tsx`
- Sert à afficher une page de contact factice.
- Fonctionne comme une page statique avec des informations de contact.

### `frontend/src/pages/NotFound.tsx`
- Sert à gérer les URL inconnues.
- Fonctionne avec la route `*` dans `App.tsx`.

## Frontend - Composants

### `frontend/src/components/Navbar.tsx`
- Sert à afficher la navigation.
- Fonctionne en lisant le token et le rôle pour afficher les bons liens.

### `frontend/src/components/Footer.tsx`
- Sert à afficher le bas de page.
- Fonctionne avec les liens secondaires, le logo et les boutons easter egg.

### `frontend/src/components/EasterEgg.tsx`
- Sert à gérer les animations secrètes.
- Fonctionne avec un état React et Framer Motion pour afficher le trou noir ou la noyade.

### `frontend/src/components/CustomCursor.tsx`
- Sert à remplacer le curseur classique.
- Fonctionne en suivant la position de la souris et en détectant les éléments cliquables.

### `frontend/src/components/ZenFlow.tsx`
- Sert à afficher le fond animé zen.
- Fonctionne avec un SVG animé par Framer Motion.

## Frontend - CSS

### `frontend/src/css/Accueil.css`
- Sert à styliser l'accueil.
- Fonctionne avec la hero section, les cartes et le responsive.

### `frontend/src/css/Respiration.css`
- Sert à styliser la page respiration.
- Fonctionne avec les boutons de rythme, le timer et l'animation centrale.

### `frontend/src/css/Informations.css`
- Sert à styliser les articles.
- Fonctionne avec une grille de cartes et une modal d'ouverture.

### `frontend/src/css/Connexion.css`
- Sert à styliser connexion/inscription.
- Fonctionne avec une carte, des champs et des onglets.

### `frontend/src/css/Profil.css`
- Sert à styliser le profil.
- Fonctionne avec une carte, un résumé utilisateur et les formulaires.

### `frontend/src/css/Admin.css`
- Sert à styliser l'administration.
- Fonctionne avec les onglets, tableaux, formulaires et animations d'ajout/suppression.

### `frontend/src/css/Navbar.css`
- Sert à styliser la navbar.
- Fonctionne avec la version desktop et le menu mobile.

### `frontend/src/css/Footer.css`
- Sert à styliser le footer.
- Fonctionne avec le logo, les liens et les boutons secrets.

### `frontend/src/css/EasterEgg.css`
- Sert à styliser les easter eggs.
- Fonctionne avec les classes ajoutées par React pour animer le trou noir et la noyade.

### `frontend/src/css/CustomCursor.css`
- Sert à styliser le curseur personnalisé.
- Fonctionne avec un point et un halo qui suivent la souris.

### `frontend/src/css/ZenFlow.css`
- Sert à placer le fond animé.
- Fonctionne avec un SVG en arrière-plan.

### `frontend/src/css/Legal.css`
- Sert aux pages légales et contact.
- Fonctionne avec une carte textuelle commune.

### `frontend/src/css/NotFound.css`
- Sert à styliser la page 404.
- Fonctionne avec une carte et un bouton de retour.

## Frontend - Logique et tests

### `frontend/src/utils/respiration.ts`
- Sert à stocker les rythmes de respiration.
- Fonctionne avec des objets `Rhythm`, `getCycleDuration` et `getSteps`.

### `frontend/src/utils/respiration.test.ts`
- Sert à tester la respiration.
- Fonctionne avec Vitest pour vérifier le cycle 7-4-8 et les rythmes de base.

## Backend - Configuration

### `backend/package.json`
- Sert à lister les dépendances et scripts backend.
- Fonctionne avec `npm run start:dev`, `npm run build` et `npm run test`.

### `backend/package-lock.json`
- Sert à verrouiller les dépendances backend.
- Fonctionne automatiquement avec npm.

### `backend/docker-compose.yml`
- Sert à lancer la base PostgreSQL.
- Fonctionne avec Docker Compose.

### `backend/nest-cli.json`
- Sert à configurer NestJS.
- Fonctionne avec les commandes Nest.

### `backend/jest.config.cjs`
- Sert à configurer les tests backend.
- Fonctionne avec Jest et `ts-jest`.

### `backend/eslint.config.mjs`
- Sert à configurer ESLint côté backend.
- Fonctionne avec les règles TypeScript et Prettier.

### `backend/tsconfig.json`, `backend/tsconfig.build.json`
- Servent à configurer TypeScript côté backend.
- Fonctionnent pour vérifier et compiler le projet NestJS.

## Backend - Prisma

### `backend/prisma/schema.prisma`
- Sert à décrire la base de données.
- Fonctionne avec les modèles `User`, `Information` et l'enum `Role`.

### `backend/prisma.config.ts`
- Sert à configurer Prisma.
- Fonctionne avec le chemin du schéma, les migrations et `DATABASE_URL`.

### `backend/prisma/migrations/*/migration.sql`
- Servent à garder l'historique de la base.
- Fonctionnent comme des étapes SQL appliquées à PostgreSQL.

### `backend/prisma/migrations/migration_lock.toml`
- Sert à verrouiller le type de base de données.
- Fonctionne automatiquement avec Prisma.

## Backend - Application

### `backend/src/main.ts`
- Sert à démarrer l'API.
- Fonctionne avec NestFactory, CORS et le port serveur.

### `backend/src/app.module.ts`
- Sert à relier les modules backend.
- Fonctionne en important Prisma, Auth, Admin et Informations.

### `backend/src/prisma/prisma.module.ts`
- Sert à fournir Prisma au backend.
- Fonctionne en exportant `PrismaService`.

### `backend/src/prisma/prisma.service.ts`
- Sert à communiquer avec PostgreSQL.
- Fonctionne avec Prisma Client et `DATABASE_URL`.

## Backend - Authentification

### `backend/src/auth/auth.module.ts`
- Sert à organiser l'authentification.
- Fonctionne en déclarant le contrôleur et le service auth.

### `backend/src/auth/auth.controller.ts`
- Sert à déclarer les routes auth.
- Fonctionne avec `/auth/register`, `/auth/login`, `/auth/me`.

### `backend/src/auth/auth.service.ts`
- Sert à gérer la logique d'authentification.
- Fonctionne avec Prisma, JWT, les rôles et les mots de passe hashés.

### `backend/src/auth/password.ts`
- Sert à sécuriser les mots de passe.
- Fonctionne avec bcrypt pour hasher et comparer.

### `backend/src/auth/password.spec.ts`
- Sert à tester le hash du mot de passe.
- Fonctionne avec Jest.

## Backend - Administration

### `backend/src/admin/admin.module.ts`
- Sert à organiser la partie admin.
- Fonctionne avec le contrôleur admin.

### `backend/src/admin/admin.controller.ts`
- Sert à gérer les routes admin.
- Fonctionne en vérifiant le rôle admin avant d'agir sur les utilisateurs ou informations.

## Backend - Informations

### `backend/src/informations/informations.module.ts`
- Sert à organiser les informations publiques.
- Fonctionne avec le contrôleur informations.

### `backend/src/informations/informations.controller.ts`
- Sert à fournir les articles au frontend.
- Fonctionne avec Prisma en triant les informations par date de création.

## Fichiers non détaillés ligne par ligne

### `node_modules`
- Dossier généré par npm.
- Il contient les dépendances et ne se modifie pas à la main.

### `dist`
- Dossier généré par le build.
- Il contient la version compilée de l'application.

### Images et icônes
- Servent à l'affichage visuel.
- Elles ne contiennent pas de logique métier.
