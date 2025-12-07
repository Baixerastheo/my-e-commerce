import { useAuthStore } from '../../stores/useAuthStore';
import { waitForInitialization, setInitializing } from '../services/api.client';

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) {
        return;
    }

    const authStore = useAuthStore();
    
    await waitForInitialization();
    
    if (!authStore.isAuthenticated && typeof window !== 'undefined') {
        setInitializing(true);
        try {
            await authStore.initAuth();
        } catch (error) {
        } finally {
            setInitializing(false);
        }
    }
    
    if (!authStore.isAuthenticated) {
        return navigateTo('/login');
    }
});

