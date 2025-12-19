import { ref } from 'vue'
import { useAuthStore } from '../stores/useAuthStore';
import * as yup from 'yup';

export const useRegister = () => {
    const showPassword = ref(false)
    const loading = ref(false)
    const errorMessage = ref<string | null>(null)
    const authStore = useAuthStore();

    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value
    }

    const handleRegister = async (username: string, email: string, password: string) => {
        try {
            loading.value = true;
            errorMessage.value = null;
            await authStore.register(username, email, password);
            navigateTo('/')
        } catch (error: any) {
            console.error('Register failed:', error);
            errorMessage.value = error?.response?.data?.message || error?.message || 'Une erreur est survenue lors de l\'inscription';
        } finally {
            loading.value = false;
        }
    }

    const schema = yup.object({
        username: yup.string().min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères').required('Le nom d\'utilisateur est requis'),
        email: yup.string().email('Veuillez entrer un email valide').required('L\'email est requis'),
        password: yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est requis'),
    });

    function onSubmit(values: any) {
        handleRegister(values.username, values.email, values.password);
    }

    return {
        showPassword,
        errorMessage,
        authStore,
        togglePasswordVisibility,
        handleRegister,
        schema,
        onSubmit,
        loading
    }
}



