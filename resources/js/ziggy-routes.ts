// Routes statiques générées pour Vercel
// Ce fichier remplace le fichier Ziggy généré par Laravel

const routes = {
  "home": "/",
  "dashboard": "/dashboard",
  "login": "/login",
  "register": "/register",
  "logout": "/logout",
  "password.request": "/forgot-password",
  "password.email": "/forgot-password",
  "password.reset": "/reset-password",
  "password.update": "/password",
  "verification.send": "/email/verification-notification",
  "profile.edit": "/profile",
  "profile.update": "/profile",
  "users.index": "/users",
  "users.create": "/users/create",
  "projets.index": "/projets",
  "projets.create": "/projets/create",
  "projets.store": "/projets",
  "skills.index": "/skills",
  "skills.create": "/skills/create",
  "skills.store": "/skills",
  "experiences.index": "/experiences",
  "experiences.create": "/experiences/create",
  "experiences.store": "/experiences",
  "contact.store": "/contact"
};

// Fonction route pour remplacer celle de Ziggy
export function route(name, params = {}, absolute = false, config = {}) {
    let routePath = routes[name];
    
    if (typeof routePath === 'function') {
        routePath = routePath(params);
    }
    
    if (!routePath) {
        console.warn(`Route "${name}" not found`);
        return '#';
    }
    
    // Remplacer les paramètres dans l'URL
    if (typeof params === 'object' && params !== null) {
        Object.keys(params).forEach(key => {
            routePath = routePath.replace(`{${key}}`, params[key]);
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
