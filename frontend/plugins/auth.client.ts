import { defineNuxtPlugin } from 'nuxt/app';
import { useAuthStore } from "../stores/useAuthStore";

export default defineNuxtPlugin(async () => {

    const authStore = useAuthStore();
    try {
        await authStore.initAuth();
    } catch (error) {
        console.error('Error initializing auth:', error);
    }
})