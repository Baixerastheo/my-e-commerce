# My E-commerce

Site e-commerce minimaliste avec frontend Nuxt.js et backend Express.js pour apprendre
les tests e2e (end-to-end) avec Playwright et le tracking de données.

## Installation

### 1. Installation des dépendances

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

## Démarrage

**Backend (port 3001):**
```bash
cd backend
npm run dev
```

**Frontend (port 3000):**
```bash
cd frontend
npm run dev
```

> **Important:** Assurez-vous que le backend est démarré avant de lancer le frontend pour que toutes les fonctionnalités fonctionnent correctement, notamment les tests e2e.

## Structure du projet

```
my-ecommerce/
├── backend/          # API Express.js
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── data/
│   └── package.json
│
├── frontend/         # Application Nuxt.js
│   ├── app/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── composables/
│   │   └── layouts/
│   ├── assets/
│   ├── stores/
│   └── package.json
└──

```

## Tests E2E

Les tests end-to-end sont configurés avec Playwright et se trouvent dans le dossier `frontend/e2e/`.

### Installation des navigateurs Playwright

Avant de lancer les tests, installez les navigateurs Playwright :

```bash
cd frontend
npx playwright install
```

### Commandes de test

**Lancer tous les tests e2e :**
```bash
cd frontend
npm run test:e2e
```

**Lancer les tests avec l'interface graphique :**
```bash
cd frontend
npm run test:e2e:ui
```

> **Note:** Les tests démarrent automatiquement le serveur de développement frontend si celui-ci n'est pas déjà en cours d'exécution. Le backend doit être également démarré pour que tous les tests passent.

La configuration se trouve dans `frontend/playwright.config.ts`.

### Le Tracking

Une fois que les deux serveurs sont démarrés, il suffit de se rendre à l'adresse 
http://localhost:3000/analytics pour voir les statistiques.

Le tracking fonctionne grâce au composable `useTracking` qui envoie automatiquement des événements au backend via l'API `/api/analytics/track`. Les événements sont stockés dans le fichier `backend/src/data/analytics-events.json`. 

Le backend calcule ensuite les statistiques agrégées. Le composable `useAnalytics` récupère ces statistiques calculées et les formate pour les transmettre au composant `AnalyticsDashboard`.

## Technologies utilisées

- **Frontend:** Nuxt.js 4, Vue.js 3, Pinia, Axios, Playwright
- **Backend:** Express.js, TypeScript, CORS

## Ce que j'ai appris

- J'ai appris à implémenter des tests end-to-end avec Playwright
- J'ai appris la gestion de l'état global avec un gestionnaire d'état (Pinia)
- J'ai appris à implémenter un système de tracking de données en réalisant un petit prototype

## TODO 

- Optimiser le système de tracking
- Améliorer l'ux de la page produits
- 4ème scénario e2e pour passer une commande
