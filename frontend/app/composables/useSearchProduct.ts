import { computed, watch } from 'vue'
import { useProductStore } from '../../stores/useProductStore'

export const useSearchProducts = () => {
    const store = useProductStore()

    const getProductsByName = (searchTerm: string) => {
        if (!searchTerm || !searchTerm.trim()) {
            return store.products
        }
        const lowerSearchTerm = searchTerm.toLowerCase()
        return store.products.filter(product =>
            product.name.toLowerCase().includes(lowerSearchTerm)
        )
    }

    // Computed qui retourne les produits filtrés quand le searchTerm change
    const filteredProducts = computed(() => {
        return getProductsByName(store.searchTerm)
    })

    const filteredProductsCount = computed(() => {
        return filteredProducts.value.length
    })

    const isSearchActive = computed(() => {
        return store.searchTerm && store.searchTerm.trim() !== ''
    })

    // Initialiser filteredProducts avec tous les produits au démarrage
    watch(() => store.products, (newProducts) => {
        if (newProducts.length > 0 && (!store.searchTerm || !store.searchTerm.trim())) {
            store.setFilteredProducts(newProducts)
        }
    }, { immediate: true })

    // Retourner searchTerm du store pour le v-model
    const searchTerm = computed({
        get: () => store.searchTerm,
        set: (value: string) => {
            store.searchTerm = value
        }
    })

    watch(filteredProducts, (newFilteredProducts) => {
        store.setFilteredProducts(newFilteredProducts)
    }, { immediate: true })

    return {
        searchTerm,
        getProductsByName,
        filteredProducts,
        filteredProductsCount,
        isSearchActive
    }
}