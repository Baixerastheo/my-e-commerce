import axios from "axios";
import { useAuthStore } from "../../stores/useAuthStore";

const API_URL = 'http://localhost:3002';

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

let isInitializing = false;
let initPromise: Promise<void> | null = null;

export const setInitializing = (value: boolean) => {
    isInitializing = value;
};

export const waitForInitialization = async (): Promise<void> => {
    if (initPromise) {
        await initPromise;
    }
    await new Promise(resolve => setTimeout(resolve, 200));
};

export const setInitPromise = (promise: Promise<void> | null) => {
    initPromise = promise;
};

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            const authStore = useAuthStore();
            authStore.clearAuth();
            
            if (typeof window !== 'undefined' && !isInitializing) {
                const currentPath = window.location.pathname;
                if (!currentPath.includes('/login')) {
                    window.location.href = '/login';
                }
            }
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;
