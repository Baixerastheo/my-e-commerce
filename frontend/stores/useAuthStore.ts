import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService, type User } from '../app/services/auth.service';
import { tokenStorage } from '../app/utils/token.storage';

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null)
    const user = ref<User | null>(null)

    const isAuthenticated = computed(() => token.value !== null)

    const setToken = (tokenValue: string) => {
        token.value = tokenValue;
        tokenStorage.saveToken(tokenValue);
    }

    const setUser = (userData: User) => {
        user.value = userData
    }

    const clearAuth = () => {
        token.value = null
        user.value = null
        tokenStorage.removeToken();
    }

    const initAuth = async () => {
        const storedToken = tokenStorage.getToken();

        if (storedToken !== null) {
            setToken(storedToken);
            try {
                const userProfile = await authService.getProfile();
                setUser(userProfile);
            } catch (error) {
                clearAuth();
            }
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const tokenValue = await authService.login({ email, password });

            if (tokenValue) {
                setToken(tokenValue);
                const userProfile = await authService.getProfile();
                setUser(userProfile);
                return tokenValue;
            }
        } catch (error) {
            throw error;
        }
    }

    const register = async (username: string, email: string, password: string) => {
        try {
            const tokenValue = await authService.register({ username, email, password });

            if (tokenValue) {
                setToken(tokenValue);
                const userProfile = await authService.getProfile();
                setUser(userProfile);
                return tokenValue;
            }
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

    const logout = () => {
        clearAuth();
    }

    return {
        token,
        user,
        isAuthenticated,
        setToken,
        setUser,
        clearAuth,
        initAuth,
        login,
        register,
        getProfile,
        logout,
    }

})