import { ref, onMounted } from 'vue'
import { useProductStore } from '../../stores/useProductStore'

export const useProductSection = () => {
  const store = useProductStore()

  const expandedProductId = ref<number | null>(null)
  const productDetails = ref<Record<number, any>>({})
  const loadingDetails = ref<Record<number, boolean>>({})
  const productCardRefs = ref<Record<number, HTMLElement | null>>({})

  onMounted(async () => {
    await store.getProducts()
  })

  const setProductCardRef = (productId: number, el: any) => {
    if (el && el instanceof HTMLElement) {
      productCardRefs.value[productId] = el
    } else if (el && '$el' in el && el.$el instanceof HTMLElement) {
      productCardRefs.value[productId] = el.$el
    }
  }

  const scrollToCard = (productId: number) => {
    const cardElement = productCardRefs.value[productId]
    if (cardElement) {
      const cardRect = cardElement.getBoundingClientRect()
      const absoluteCardTop = cardRect.top + window.pageYOffset
      const offset = 100
      
      window.scrollTo({
        top: absoluteCardTop - offset,
        behavior: 'smooth'
      })
    }
  }

  const expandProduct = async (productId: number, event?: Event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (expandedProductId.value === productId) {
      collapseProduct()
      return
    }

    expandedProductId.value = productId

    if (productDetails.value[productId]) {
      requestAnimationFrame(() => {
        scrollToCard(productId)
      })
      return
    }

    loadingDetails.value[productId] = true

    try {
      const details = await store.getProductById(productId)
      if (details) {
        productDetails.value[productId] = details
      }
    } catch (err) {
      console.error('Erreur lors du chargement des détails:', err)
    } finally {
      loadingDetails.value[productId] = false
      requestAnimationFrame(() => {
        scrollToCard(productId)
      })
    }
  }

  const collapseProduct = (event?: Event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    const scrollPosition = window.scrollY
    expandedProductId.value = null

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition)
    })
  }

  const addToCart = (product: any) => {
    console.log('Ajouter au panier:', product)
    alert(`${product.name} ajouté au panier !`)
  }

  return {
    store,
    expandedProductId,
    productDetails,
    loadingDetails,
    setProductCardRef,
    expandProduct,
    collapseProduct,
    addToCart
  }
}

