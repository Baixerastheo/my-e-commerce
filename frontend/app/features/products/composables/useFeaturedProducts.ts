import { computed, onMounted } from 'vue'
import { useProductStore } from '../stores/useProductStore'

export const useFeaturedProducts = () => {
    const productStore = useProductStore()

    const featuredProducts = computed(() => {
        if (productStore.products.length === 0) {
            return []
        }

        // Prendre les produits avec les prix les plus élevés (produits premium)
        return [...productStore.products]
            .sort((a, b) => b.price - a.price)
            .slice(0, 4)
    })

    const loading = computed(() => productStore.loading)
    const error = computed(() => productStore.error)

    const initialize = async () => {
        await productStore.getProducts()
    }

    const goToProduct = async (productId: number) => {
        if (!productId) {
            return
        }

        const url = `/product/${productId}`

        try {
            await navigateTo(url)
        } catch (err) {
            window.location.href = url
        }
    }

    return {
        featuredProducts,
        loading,
        error,
        initialize,
        goToProduct
    }
}

