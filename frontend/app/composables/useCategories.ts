import { computed, onMounted } from 'vue'
import { useProductStore } from '../../stores/useProductStore'

export const useCategories = () => {
    const productStore = useProductStore()

    const categories = computed(() => {
        if (productStore.products.length === 0) {
            return []
        }

        // Récupérer les catégories uniques avec le nombre de produits
        const categoryMap = new Map<string, { name: string; count: number; image: string }>()
        
        productStore.products.forEach(product => {
            const category = product.category
            if (!categoryMap.has(category)) {
                categoryMap.set(category, {
                    name: category,
                    count: 0,
                    image: product.image // Prendre l'image du premier produit de la catégorie
                })
            }
            const cat = categoryMap.get(category)!
            cat.count++
        })

        return Array.from(categoryMap.values())
    })

    const loading = computed(() => productStore.loading)
    const error = computed(() => productStore.error)

    const initialize = async () => {
        await productStore.getProducts()
    }

    const goToCategory = (categoryName: string) => {
        const url = `/products?category=${encodeURIComponent(categoryName)}`
        navigateTo(url).catch(() => {
            window.location.href = url
        })
    }

    return {
        categories,
        loading,
        error,
        initialize,
        goToCategory
    }
}

