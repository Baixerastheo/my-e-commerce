import { ref } from "vue";
import apiClient from "../services/api.client";

interface Purchase {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  total: string;
  createdAt: string;
}

export const usePurchase = () => {
  const purchases = ref<Purchase[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const loadPurchase = async (userId: number) => {
    loading.value = true;
    error.value = null;
    purchases.value = [];

    try {
      const fetchedPurchase = await apiClient.get<Purchase[]>(
        `/api/purchases/user/${userId}`
      );
      purchases.value = fetchedPurchase.data;
    } catch (err: any) {
      console.error("Erreur lors du chargement des commandes:", err);
      
      if (err.response?.status === 404) {
        error.value = null;
      } else {
        error.value =
          err instanceof Error ? err.message : "Erreur lors du chargement";
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    purchases,
    loading,
    error,
    loadPurchase,
  };
};
