# 🧘 CesiZen

Application web de bien-être mental développée dans le cadre du projet CESI Bloc 2.

---

## 📦 Stack technique

| Couche      | Technologie                          |
|-------------|--------------------------------------|
| Frontend    | React 19 + TypeScript + Vite         |
| Backend     | NestJS + TypeScript                  |
| Base de données | PostgreSQL 15 (via Docker)       |
| ORM         | Prisma                               |
| Auth        | JWT (JSON Web Tokens)                |

---

## 📁 Structure du projet

```
CesiZen/
├── frontend/   → Application React (Vite)
└── backend/    → API NestJS + Prisma
```

---

## 🚀 Installation & Lancement

### Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — **doit être lancé et en cours d'exécution**
- [Git](https://git-scm.com/)

---

### 1. Cloner le projet

```bash
git clone https://github.com/thexch/CesiZen.git
cd CesiZen
```

---

### 2. 🔧 Backend

#### a) Installer les dépendances

```bash
cd backend
npm install
```

#### b) Configurer les variables d'environnement

Créez un fichier `.env` dans le dossier `backend/` :

```env
DATABASE_URL="postgresql://admin:password123@localhost:5432/cesizen_db"
JWT_SECRET="votre_secret_jwt"
```

#### c) Démarrer la base PostgreSQL (Docker)

> ⚠️ **Assurez-vous que Docker Desktop est lancé avant cette étape.**

```bash
docker compose up -d
```

Cela démarre un conteneur PostgreSQL avec :
- **Utilisateur** : `admin`
- **Mot de passe** : `password123`
- **Base de données** : `cesizen_db`
- **Port** : `5432`

#### d) Appliquer les migrations Prisma

```bash
npx prisma migrate deploy
npx prisma generate
```

#### e) Démarrer le serveur en développement

```bash
npm run start:dev
```

L'API est disponible sur : **http://localhost:3000**

---

### 3. 🎨 Frontend

#### a) Installer les dépendances

```bash
cd ../frontend
npm install
```

#### b) Vérifier les variables d'environnement

Le fichier `.env` est déjà configuré :

```env
VITE_API_URL="http://localhost:3000"
```

#### c) Démarrer l'application

```bash
npm run dev
```

L'application est disponible sur : **http://localhost:5173**

---

## 📡 Routes API principales

### Authentification

| Méthode | Route            | Description                     |
|---------|------------------|---------------------------------|
| POST    | `/auth/register` | Créer un compte                 |
| POST    | `/auth/login`    | Se connecter (retourne un JWT)  |
| GET     | `/auth/me`       | Voir son profil                 |
| PUT     | `/auth/me`       | Modifier son profil             |
| DELETE  | `/auth/me`       | Supprimer son compte            |

### Informations (public)

| Méthode | Route             | Description                     |
|---------|-------------------|---------------------------------|
| GET     | `/informations`   | Lister les contenus disponibles |

### Administration (admin uniquement)

| Méthode | Route                        | Description                  |
|---------|------------------------------|------------------------------|
| GET     | `/admin/users`               | Lister tous les utilisateurs |
| PUT     | `/admin/users/:id`           | Modifier un utilisateur      |
| DELETE  | `/admin/users/:id`           | Supprimer un utilisateur     |
| POST    | `/admin/informations`        | Créer un contenu             |
| PUT     | `/admin/informations/:id`    | Modifier un contenu          |
| DELETE  | `/admin/informations/:id`    | Supprimer un contenu         |

---

## 🗃️ Modèle de données

### User

| Champ       | Type      | Description                        |
|-------------|-----------|------------------------------------|
| `id`        | Int       | Identifiant auto-incrémenté        |
| `email`     | String    | Email unique                       |
| `password`  | String    | Mot de passe hashé (bcrypt)        |
| `name`      | String?   | Nom (optionnel)                    |
| `role`      | Enum      | `USER` ou `ADMIN`                  |
| `isActive`  | Boolean   | Compte actif ou non                |
| `createdAt` | DateTime  | Date de création                   |
| `updatedAt` | DateTime  | Date de dernière modification      |

### Information

| Champ       | Type      | Description                        |
|-------------|-----------|------------------------------------|
| `id`        | Int       | Identifiant auto-incrémenté        |
| `title`     | String    | Titre du contenu                   |
| `content`   | String    | Corps du contenu                   |
| `createdAt` | DateTime  | Date de création                   |
| `updatedAt` | DateTime  | Date de dernière modification      |

---

## 🛠️ Scripts utiles

### Backend

```bash
npm run start:dev     # Démarrage en mode développement (watch)
npm run build         # Build de production
npm run start:prod    # Démarrage en production
npm run lint          # Linter le code
npm run format        # Formater le code (Prettier)
```

### Frontend

```bash
npm run dev           # Démarrage en mode développement
npm run build         # Build de production
npm run preview       # Prévisualiser le build
npm run lint          # Linter le code
```

---

## 🐳 Docker

Pour arrêter le conteneur PostgreSQL :

```bash
cd backend
docker compose down
```

Pour supprimer également les données :

```bash
docker compose down -v
```
