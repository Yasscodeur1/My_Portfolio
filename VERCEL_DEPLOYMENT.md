# Déploiement sur Vercel

Ce guide explique comment déployer votre portfolio Laravel + Inertia.js sur Vercel.

## ⚠️ Important

Votre projet est une application Laravel avec Inertia.js, pas une application React statique. Vercel ne peut pas héberger le backend Laravel complet. Ce déploiement ne fonctionnera que pour la partie frontend statique.

## Configuration

Le projet a été configuré avec un script de build spécial pour Vercel qui :

1. Remplace les routes Laravel par des routes statiques
2. Génère une version frontend-only de votre portfolio
3. Restaure la configuration pour le développement local
4. Inclut **Vercel Speed Insights** pour le monitoring des performances

## Déploiement

### Option 1: Déploiement automatique via GitHub

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement le fichier `vercel.json`
3. Le build utilisera automatiquement `npm run build:vercel`

### Option 2: Déploiement manuel

```bash
# Installer les dépendances
npm install

# Build pour Vercel
npm run build:vercel

# Déployer le dossier public sur Vercel
```

## Limitations

- ❌ Pas de backend Laravel (API, base de données, authentification)
- ❌ Pas de fonctionnalités dynamiques (CRUD, formulaires)
- ✅ Affichage statique du portfolio
- ✅ Navigation entre pages
- ✅ Design et animations
- ✅ Monitoring des performances avec Speed Insights

## Recommandations

Pour un portfolio complet avec backend, considérez :

1. **Heroku** - Support Laravel complet
2. **Railway** - Alternative moderne à Heroku
3. **DigitalOcean App Platform** - Support Laravel + base de données
4. **VPS** - Contrôle total (DigitalOcean, Linode, etc.)

## Scripts disponibles

- `npm run build:vercel` - Build optimisé pour Vercel
- `npm run build` - Build normal pour développement
- `node build-static.cjs prepare` - Préparer pour Vercel
- `node build-static.cjs restore` - Restaurer pour développement
