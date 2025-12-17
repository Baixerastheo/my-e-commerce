import { ref } from 'vue';
import apiClient from '../../../services/api.client';

export const useNewsletter = () => {
  const email = ref('');
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);

  const subscribe = async () => {
    if (!email.value) {
      error.value = 'Veuillez entrer une adresse email';
      return;
    }

    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      // TODO: Implémenter l'endpoint newsletter dans le backend
      // await apiClient.post('/newsletter/subscribe', { email: email.value });
      success.value = true;
      email.value = '';
    } catch (err: any) {
      error.value = err?.response?.data?.message || err?.message || 'Une erreur est survenue';
    } finally {
      loading.value = false;
    }
  };

  return {
    email,
    loading,
    error,
    success,
    subscribe,
  };
};
