import { useAnalytics } from './useAnalytics'
import { computed, ref} from 'vue'
import { useProductStore } from '../../stores/useProductStore'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

export const useSlider = () => {
    const { topProductViewsData, fetchStats, loading: analyticsLoading, error: analyticsError } = useAnalytics()
    const productStore = useProductStore()
    const swiperInstance = ref<SwiperType | null>(null)
    
    const slides = computed(() => {
        if (topProductViewsData.value.length === 0 || productStore.products.length === 0) {
            return []
        }
        
        return topProductViewsData.value.slice(0, 5)
            .map((item) => {
                const product = productStore.products.find(p => p.id === item['ID Produit'])
                return product ? {
                    id: product.id,
                    image: product.image,
                    name: product.name,
                    price: product.price,
                } : null
            })
            .filter((item): item is NonNullable<typeof item> => item !== null)
    })

    const loading = computed(() => analyticsLoading.value || productStore.loading)
    const error = computed(() => analyticsError.value || productStore.error)

    const swiperOptions = {
        modules: [Autoplay, Pagination, Navigation],
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: {
            clickable: true,
        },
        navigation: true,
        slidesPerView: 1,
        spaceBetween: 16,
        centeredSlides: false,
        watchOverflow: true,
        breakpoints: {
            640: {
                slidesPerView: 1.5,
                spaceBetween: 16,
                centeredSlides: true,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
                centeredSlides: false,
            },
        },
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

    const onSwiper = (swiper: SwiperType) => {
        swiperInstance.value = swiper
    }

    const onMouseEnter = () => {
        if (swiperInstance.value?.autoplay) {
            swiperInstance.value.autoplay.stop()
        }
    }

    const onMouseLeave = () => {
        if (swiperInstance.value?.autoplay) {
            swiperInstance.value.autoplay.start()
        }
    }

    const initialize = async () => {
        await Promise.all([
            productStore.getProducts(),
            fetchStats()
        ])
    }

    return {
        slides,
        loading,
        error,
        fetchStats,
        initialize,
        swiperOptions,
        onSwiper,
        onMouseEnter,
        onMouseLeave,
        goToProduct
    }
}