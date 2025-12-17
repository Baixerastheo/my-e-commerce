import { computed, onMounted } from 'vue'
import { useProductStore } from '../stores/useProductStore'
import { useSearchProducts } from './useSearchProduct'

export const useProductSection = () => {
    const store = useProductStore()
    const { isSearchActive, filteredProducts } = useSearchProducts()

    const getNbProducts = () => {
        return store.products.length
    }

    const displayedProducts = computed(() => {
        if (isSearchActive.value) {
            return filteredProducts.value
        }
        return store.products
    })

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

    onMounted(async () => {
        await store.getProducts()
    })

    return {
        store,
        getNbProducts,
        displayedProducts,
        goToProduct,
        isSearchActive
    }
}

