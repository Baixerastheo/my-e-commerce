import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService, type User } from '../app/services/auth.service';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isAuthenticated = computed(() => user.value !== null)

    const setUser = (userData: User) => {
        user.value = userData
    }

    const clearAuth = () => {
        user.value = null
    }

    const initAuth = async () => {
        if (typeof window === 'undefined') {
            return;
        }
        
        try {
            const userProfile = await authService.getProfile();
            
            if (userProfile && userProfile.email) {
                setUser(userProfile);
            } else {
                clearAuth();
            }
        } catch (error: any) {
            clearAuth();
        }
    }

    const login = async (email: string, password: string) => {
        try {
            await authService.login({ email, password });
            const userProfile = await authService.getProfile();
            setUser(userProfile);
            return userProfile;
        } catch (error) {
            throw error;
        }
    }

    const register = async (username: string, email: string, password: string) => {
        try {
            await authService.register({ username, email, password });
            const userProfile = await authService.getProfile();
            setUser(userProfile);
            return userProfile;
        } catch (error) {
            throw error;
        }
    }

    const getProfile = async () => {
        try {
            const userProfile = await authService.getProfile();
            setUser(userProfile)
            return userProfile;
        }
        catch (error) {
            clearAuth();
            throw error;
        }
    }

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            clearAuth();
        }
    }

    return {
        user,
        isAuthenticated,
        setUser,
        clearAuth,
        initAuth,
        login,
        register,
        getProfile,
        logout,
    }

})