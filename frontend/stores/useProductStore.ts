import { defineStore } from "pinia";
import { ref, computed } from "vue";
import apiClient from "../app/services/api.client";

export const useProductStore = defineStore("product", () => {
  interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    specs: string[];
  }

  const products = ref<Product[]>([]);
  
  const filteredProducts = ref<Product[]>([]);
  
  // Terme de recherche partagé entre tous les composants
  const searchTerm = ref<string>('');

  const loading = ref(false);

  const error = ref<string | null>(null);
  
  // Fonction pour mettre à jour les produits filtrés
  const setFilteredProducts = (filtered: Product[]) => {
    filteredProducts.value = filtered;
  };

  const getProducts = async () => {
    if (loading.value === true) return;
    if (products.value.length > 0) return;

    try {
      error.value = null;
      loading.value = true;

      const response = await apiClient.get("/api/products");
      products.value = response.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
    } finally {
      loading.value = false;
    }
  };

  const getProductById = async (id: number) => {
    try {
      error.value = null;

      const response = await apiClient.get(
        `/api/products/${id}`
      );
      return response.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      return null;
    }
  };

  const isLoading = computed(() => loading.value);

  const isError = computed(() => error.value !== null);

  return {
    products,
    filteredProducts,
    searchTerm,
    loading,
    error,
    getProducts,
    getProductById,
    setFilteredProducts,
    isLoading,
    isError,
  };
});
