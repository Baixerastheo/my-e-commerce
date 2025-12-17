import { useAuthStore } from '../stores/useAuthStore';

export const useAuth = () => {
  const authStore = useAuthStore();

  const login = async (email: string, password: string) => {
    return await authStore.login(email, password);
  };

  const register = async (username: string, email: string, password: string) => {
    return await authStore.register(username, email, password);
  };

  const logout = async () => {
    return await authStore.logout();
  };

  return {
    login,
    register,
    logout,
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
  };
};
