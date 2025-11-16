import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

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

  const loading = ref(false);

  const error = ref<string | null>(null);

  const getProducts = async () => {
    if (loading.value === true) return;
    if (products.value.length > 0) return;

    try {
      error.value = null;
      loading.value = true;

      const response = await axios.get("http://localhost:3001/api/products");
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
      loading.value = true;

      const response = await axios.get(
        `http://localhost:3001/api/products/${id}`
      );
      return response.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const isLoading = computed(() => loading.value);

  const isError = computed(() => error.value !== null);

  return {
    products,
    loading,
    error,
    getProducts,
    getProductById,
    isLoading,
    isError,
  };
});
