import { ref, computed } from "vue";
import apiClient from "../../../services/api.client";

interface ProductInfo {
  id: number;
  name: string;
  price: string | number;
  image: string;
  category: string;
}

interface Purchase {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  total: string;
  orderId: string | null;
  createdAt: string;
  product?: ProductInfo;
}

interface GroupedOrder {
  orderId: string | null;
  purchases: Purchase[];
  total: number;
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
        purchases.value = [];
        error.value = null;
      } else {
        error.value =
          err instanceof Error ? err.message : "Erreur lors du chargement";
        purchases.value = [];
      }
    } finally {
      loading.value = false;
    }
  };

  const groupedOrders = computed<GroupedOrder[]>(() => {
    const grouped = new Map<string | null, Purchase[]>();
    
    purchases.value.forEach((purchase) => {
      const key = purchase.orderId || `single-${purchase.id}`;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(purchase);
    });

    return Array.from(grouped.entries())
      .filter(([, purchases]) => purchases.length > 0)
      .map(([orderId, purchases]) => {
        const total = purchases.reduce((sum, p) => {
          const price = typeof p.total === 'string' ? parseFloat(p.total) : p.total;
          return sum + price;
        }, 0);
        
        const firstPurchase = purchases[0];
        if (!firstPurchase) return null;
        
        const createdAt = purchases.reduce((latest, p) => {
          const date = new Date(p.createdAt);
          return date > latest ? date : latest;
        }, new Date(firstPurchase.createdAt));

        return {
          orderId: orderId?.startsWith('single-') ? null : orderId,
          purchases,
          total,
          createdAt: createdAt.toISOString(),
        };
      })
      .filter((order): order is GroupedOrder => order !== null)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  });

  return {
    purchases,
    groupedOrders,
    loading,
    error,
    loadPurchase,
  };
};
