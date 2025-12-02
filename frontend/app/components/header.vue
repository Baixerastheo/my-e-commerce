<script setup lang="ts">
import { useHeader } from '../composables/useHeader'
import { useCartStore } from '../../stores/useCartStore'
import '../../assets/css/header.css'

const { isMenuOpen, toggleMenu, closeMenu } = useHeader()
const cartStore = useCartStore()
</script>

<template>
  <header class="navbar">
    <nav class="nav-container">
      <NuxtLink to="/" class="logo" @click="closeMenu">
        <img src="/logo.svg" alt="My E-commerce" class="logo-image" />
      </NuxtLink>

      <ul class="nav-menu" :class="{ 'nav-menu-open': isMenuOpen }">
        <li>
          <NuxtLink to="/" class="nav-link" @click="closeMenu">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Accueil</span>
          </NuxtLink>
        </li>   
        <li>
          <NuxtLink to="/products" class="nav-link" @click="closeMenu">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
              <line x1="3" y1="9" x2="21" y2="9"></line>
            </svg>
            <span>Produits</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/cart" class="nav-link" @click="closeMenu">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Panier</span>
            <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/login" class="nav-link" @click="closeMenu">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            <span>Connexion</span>
          </NuxtLink>
        </li>
      </ul>

      <button 
        class="hamburger" 
        :class="{ 'hamburger-open': isMenuOpen }"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

    </nav>

    <div 
      class="menu-overlay" 
      :class="{ 'menu-overlay-visible': isMenuOpen }"
      @click="closeMenu"
    ></div>
  </header>
</template>