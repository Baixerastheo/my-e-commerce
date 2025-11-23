<script setup lang="ts">
import { ref } from 'vue'
import '../../assets/css/newsletterSection.css'

const email = ref('')
const isSubscribed = ref(false)
const isLoading = ref(false)

const handleSubscribe = () => {
  if (!email.value || !email.value.includes('@')) {
    return
  }
  
  isLoading.value = true
  
  // Simuler une souscription
  setTimeout(() => {
    isSubscribed.value = true
    isLoading.value = false
    email.value = ''
    
    setTimeout(() => {
      isSubscribed.value = false
    }, 3000)
  }, 1000)
}
</script>

<template>
  <section class="newsletter-section">
    <div class="newsletter-content">
      <div class="newsletter-text">
        <h2 class="newsletter-title">Restez informé</h2>
        <p class="newsletter-description">
          Recevez nos dernières offres et nouveautés directement dans votre boîte mail
        </p>
      </div>
      
      <div class="newsletter-form">
        <div v-if="isSubscribed" class="newsletter-success">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Merci pour votre inscription !</span>
        </div>
        
        <form v-else @submit.prevent="handleSubscribe" class="newsletter-input-group">
          <input
            v-model="email"
            type="email"
            placeholder="Votre adresse email"
            class="newsletter-input"
            required
          />
          <button
            type="submit"
            :disabled="isLoading"
            class="newsletter-button"
          >
            <span v-if="!isLoading">S'abonner</span>
            <span v-else>Envoi...</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

