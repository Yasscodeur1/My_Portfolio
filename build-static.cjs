#!/usr/bin/env node

/**
 * Script pour générer une version statique du portfolio pour Vercel
 * Ce script remplace les routes Laravel par des routes statiques
 */

const fs = require('fs');
const path = require('path');

// Configuration des routes statiques
const staticRoutes = {
    'home': '/',
    'dashboard': '/dashboard',
    'login': '/login',
    'register': '/register',
    'logout': '/logout',
    'password.request': '/forgot-password',
    'password.email': '/forgot-password',
    'password.reset': '/reset-password',
    'password.update': '/password',
    'verification.send': '/email/verification-notification',
    'profile.edit': '/profile',
    'profile.update': '/profile',
    'users.index': '/users',
    'users.create': '/users/create',
    'users.edit': (id) => `/users/${id}/edit`,
    'projets.index': '/projets',
    'projets.create': '/projets/create',
    'projets.store': '/projets',
    'projets.edit': (id) => `/projets/${id}/edit`,
    'projets.update': (id) => `/projets/${id}`,
    'projets.destroy': (id) => `/projets/${id}`,
    'skills.index': '/skills',
    'skills.create': '/skills/create',
    'skills.store': '/skills',
    'skills.edit': (id) => `/skills/${id}/edit`,
    'skills.update': (id) => `/skills/${id}`,
    'skills.destroy': (id) => `/skills/${id}`,
    'experiences.index': '/experiences',
    'experiences.create': '/experiences/create',
    'experiences.store': '/experiences',
    'experiences.edit': (id) => `/experiences/${id}/edit`,
    'experiences.update': (id) => `/experiences/${id}`,
    'experiences.destroy': (id) => `/experiences/${id}`,
    'contact.store': '/contact',
};

// Fonction pour générer le fichier de routes
function generateRoutesFile() {
    const routesContent = `// Routes statiques générées pour Vercel
// Ce fichier remplace le fichier Ziggy généré par Laravel

const routes = ${JSON.stringify(staticRoutes, null, 2)};

// Fonction route pour remplacer celle de Ziggy
export function route(name, params = {}, absolute = false, config = {}) {
    let routePath = routes[name];
    
    if (typeof routePath === 'function') {
        routePath = routePath(params);
    }
    
    if (!routePath) {
        console.warn(\`Route "\${name}" not found\`);
        return '#';
    }
    
    // Remplacer les paramètres dans l'URL
    if (typeof params === 'object' && params !== null) {
        Object.keys(params).forEach(key => {
            routePath = routePath.replace(\`{\${key}}\`, params[key]);
        });
    }
    
    return routePath;
}

// Fonction pour vérifier la route courante
export function current(name) {
    if (typeof window === 'undefined') return false;
    const currentPath = window.location.pathname;
    
    if (typeof name === 'string') {
        return currentPath === route(name);
    }
    
    if (typeof name === 'object' && name.pattern) {
        const regex = new RegExp(name.pattern);
        return regex.test(currentPath);
    }
    
    return false;
}

// Export par défaut pour la compatibilité
export default { route, current, routes };
`;

    fs.writeFileSync(
        path.join(__dirname, 'resources/js/ziggy-routes.ts'),
        routesContent
    );
    
    console.log('✅ Fichier de routes statiques généré');
}

// Fonction pour modifier la configuration Vite
function updateViteConfig() {
    const viteConfigPath = path.join(__dirname, 'vite.config.ts');
    let config = fs.readFileSync(viteConfigPath, 'utf8');
    
    // Remplacer l'alias ziggy-js pour utiliser notre fichier de routes statiques
    config = config.replace(
        /'ziggy-js':\s*resolve\(__dirname,\s*'vendor\/tightenco\/ziggy'\),/,
        "'ziggy-js': resolve(__dirname, 'resources/js/ziggy-routes.ts'),"
    );
    
    fs.writeFileSync(viteConfigPath, config);
    console.log('✅ Configuration Vite mise à jour pour Vercel');
}

// Fonction pour restaurer la configuration Vite
function restoreViteConfig() {
    const viteConfigPath = path.join(__dirname, 'vite.config.ts');
    let config = fs.readFileSync(viteConfigPath, 'utf8');
    
    // Restaurer l'alias ziggy-js original
    config = config.replace(
        /'ziggy-js':\s*resolve\(__dirname,\s*'resources\/js\/ziggy-routes\.ts'\),/,
        "'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),"
    );
    
    fs.writeFileSync(viteConfigPath, config);
    console.log('✅ Configuration Vite restaurée');
}

// Exécution du script
const command = process.argv[2];

switch (command) {
    case 'prepare':
        generateRoutesFile();
        updateViteConfig();
        console.log('🚀 Configuration prête pour le déploiement Vercel');
        break;
    case 'restore':
        restoreViteConfig();
        console.log('🔄 Configuration restaurée pour le développement local');
        break;
    default:
        console.log('Usage:');
        console.log('  node build-static.js prepare  - Préparer pour Vercel');
        console.log('  node build-static.js restore  - Restaurer pour le développement');
}
