import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
    interface Product {
        id: number;
        name: string;
        price: number;
        category: string;
        image: string;
        description: string;
        specs?: string[];
    }

    interface CartItem {
        id: number;
        name: string;
        price: number;
        quantity: number;
        image: string;
    }

    const cart = ref<CartItem[]>([]);

    const addToCart = (product: Product) => {
        const existingItem = cart.value.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.value.push({ 
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image
            });
        }
    }

    const removeFromCart = (id: number) => {
        cart.value = cart.value.filter(item => item.id !== id);
    }

    const updateQuantity = (id: number, quantity: number) => {
        const item = cart.value.find(item => item.id === id);
        if (item) {
            item.quantity = Math.max(1, quantity);
        }
    }

    const clearCart = () => {
        cart.value = [];
    }

    const checkout = () => {
        cart.value = [];
    }

    const getItemTotal = (price: number, quantity: number) => {
        return (price * quantity).toFixed(2);
    }

    const totalItems = computed(() => {
        return cart.value.reduce((total, item) => total + item.quantity, 0);
    })

    const totalPrice = computed(() => {
        return cart.value.reduce((total, item) => total + item.price * item.quantity, 0);
    })

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        getItemTotal,
        totalItems,
        totalPrice
    }
})
