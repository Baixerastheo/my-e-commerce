import { useAuthStore } from '../features/auth/stores/useAuthStore';
import { waitForInitialization, setInitializing } from '../services/api.client';

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) {
        return;
    }

    const authStore = useAuthStore();
    
    // Si l'utilisateur est déjà authentifié, on laisse passer
    if (authStore.isAuthenticated) {
        return;
    }
    
    try {
        // Attendre l'initialisation de l'API
        await waitForInitialization();
        
        // Si toujours pas authentifié après l'attente, essayer d'initialiser
        if (!authStore.isAuthenticated && typeof window !== 'undefined') {
            setInitializing(true);
            try {
                await authStore.initAuth();
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setInitializing(false);
            }
        }
        
        // Si toujours pas authentifié, rediriger vers login
        if (!authStore.isAuthenticated) {
            return navigateTo('/login');
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        // En cas d'erreur, rediriger vers login si pas authentifié
        if (!authStore.isAuthenticated) {
            return navigateTo('/login');
        }
    }
});

