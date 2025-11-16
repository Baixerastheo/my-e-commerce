# Installation - Commandes npm

## Sur un nouveau PC / après un clone du projet

**Oui, vous devez réinstaller toutes les dépendances**, mais c'est très simple ! Il suffit d'exécuter `npm install` dans chaque dossier. npm installera automatiquement toutes les dépendances listées dans les fichiers `package.json` (pinia, cors, express, vue, etc.).

## Installation complète

```bash
# 1. Backend
cd backend
npm install

# 2. Frontend
cd frontend
npm install
```

C'est tout ! Les fichiers `package.json` et `package-lock.json` contiennent toutes les informations nécessaires pour réinstaller exactement les mêmes versions de toutes les dépendances.

## Dépendances installées

### Backend
- express
- cors
- @types/express
- @types/cors
- @types/node
- typescript
- ts-node-dev

### Frontend
- nuxt
- vue
- vue-router
- pinia
- @pinia/nuxt
- axios
- cors
- vee-validate
- yup
- @types/cors
- @playwright/test
