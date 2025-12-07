import apiClient from "./api.client";

interface LoginDto {
    email: string;
    password: string;
}

interface RegisterDto {
    email: string;
    username: string;
    password: string;
}

interface AuthResponse {
    access_token: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export const authService = {
    login: async (loginDto: LoginDto): Promise<string> => {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/login', loginDto);
            return response.data.access_token;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },
    register: async (registerDto: RegisterDto): Promise<string> => {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/register', registerDto);
            return response.data.access_token;
        } catch (error) {
            console.error('Register failed:', error);
            throw error;
        }
    },
    getProfile: async (): Promise<User> => {
        try {
            const response = await apiClient.get<User>('/auth/profile');
            return response.data;
        } catch (error) {
            console.error('Profile failed:', error);
            throw error;
        }
    },
    logout: async (): Promise<void> => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    },
};