<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <!-- Section Brand -->
        <div class="footer-section">
          <h3 class="footer-title">My E-commerce</h3>
          <p class="footer-description">
            Votre destination pour des produits de qualité. 
            Shopping en ligne simple et sécurisé.
          </p>
        </div>

        <!-- Section Liens -->
        <div class="footer-section">
          <h4 class="footer-heading">Navigation</h4>
          <ul class="footer-links">
            <li>
              <NuxtLink to="/" class="footer-link">Accueil</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products" class="footer-link">Produits</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cart" class="footer-link">Panier</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Section Contact -->
        <div class="footer-section">
          <h4 class="footer-heading">Contact</h4>
          <ul class="footer-links">
            <li>
              <a href="mailto:contact@myecommerce.com" class="footer-link">
                contact@myecommerce.com
              </a>
            </li>
            <li>
              <a href="tel:+33123456789" class="footer-link">
                +33 0 00 00 00 00
              </a>
            </li>
          </ul>
        </div>

        <!-- Section Réseaux sociaux -->
        <div class="footer-section">
          <h4 class="footer-heading">Suivez-nous</h4>
          <div class="footer-social">
            <a href="#" class="social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <p class="footer-copyright">
          © {{ currentYear }} My E-commerce. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import '../../assets/css/footer.css';
</style>
