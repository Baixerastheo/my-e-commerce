<script setup lang="ts">
import { ref } from 'vue'
import '../../../../assets/css/loginSection.css'
import { useAuthStore } from '../stores/useAuthStore';

const emit = defineEmits(['switch-to-register'])

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref<string | null>(null)
const authStore = useAuthStore();

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  try {
    loading.value = true;
    errorMessage.value = null;
    await authStore.login(email.value, password.value);
    navigateTo('/')
  } catch (error: any) {
    console.error('Login failed:', error);
    errorMessage.value = error?.response?.data?.message || error?.message || 'Une erreur est survenue lors de la connexion';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <NuxtLink to="/" class="login-logo-link">
          <img src="/logo.svg" alt="My E-commerce" class="login-logo" />
        </NuxtLink>
        <h1 class="login-title">My E-commerce</h1>
        <p class="login-subtitle">Connectez-vous à votre compte</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Entrez votre email</label>
          <div class="input-wrapper">
            <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-input"
              placeholder="votre@email.com"
              required
            />
            <div class="input-indicator"></div>
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Mot de passe</label>
          <div class="input-wrapper">
            <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="••••••••"
              required
            />
            <div class="input-indicator"></div>
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="password-toggle"
              aria-label="Toggle password visibility"
            >
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            </button>
          </div>
        </div>

        <div class="form-options">
          <label class="checkbox-label">
            <input
              v-model="rememberMe"
              type="checkbox"
              class="checkbox-input"
            />
            <span class="checkbox-text">Se souvenir de moi</span>
          </label>
          <NuxtLink to="/forgot-password" class="forgot-password-link">
            Mot de passe oublié ?
          </NuxtLink>
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="login-button" :disabled="loading">
          {{ loading ? 'Connexion...' : 'Connexion' }}
        </button>
      </form>

      <div class="signup-section">
        <p class="signup-text">
          Pas encore membre ? <button type="button" @click="emit('switch-to-register')" class="signup-link-button">Créer un compte</button>
        </p>
      </div>

      <div class="divider">
        <span class="divider-text">Ou continuer avec</span>
      </div>

      <button type="button" class="google-button">
        <svg class="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span>Continuer avec Google</span>
      </button>
    </div>
  </div>
</template>
