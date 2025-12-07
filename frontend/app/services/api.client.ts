import axios from "axios";
import { tokenStorage } from "../utils/token.storage";
import { useAuthStore } from "../../stores/useAuthStore";

const API_URL = 'http://localhost:3002';

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = tokenStorage.getToken();
        
        const isPublicRoute = config.url?.includes('/auth/login') || config.url?.includes('/auth/register');
        
        if (token && !isPublicRoute) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            const authStore = useAuthStore();
            authStore.clearAuth();
            
            // Rediriger vers la page de login si on n'y est pas déjà
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
