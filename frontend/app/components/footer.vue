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
                +33 1 23 45 67 89
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

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background-color: #fafafa;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 40px;
  align-items: start;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-section:first-child {
  max-width: 300px;
}

.footer-title {
  font-size: 18px;
  font-weight: 700;
  color: #1d1d1f;
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
}

.footer-description {
  font-size: 14px;
  color: #6e6e73;
  line-height: 1.7;
  margin: 0;
  max-width: 280px;
}

.footer-heading {
  font-size: 13px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 20px 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-link {
  color: #6e6e73;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
  display: inline-block;
  line-height: 1.5;
}

.footer-link:hover {
  color: #6366f1;
}

.footer-social {
  display: flex;
  gap: 16px;
}

.social-link {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #6e6e73;
  transition: all 0.2s ease;
  background-color: transparent;
}

.social-link svg {
  width: 20px;
  height: 20px;
}

.social-link:hover {
  color: #6366f1;
  background-color: rgba(99, 102, 241, 0.1);
  transform: translateY(-2px);
}

.footer-bottom {
  padding-top: 32px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
}

.footer-copyright {
  font-size: 13px;
  color: #6e6e73;
  margin: 0;
}

/* Responsive */
@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .footer-section:first-child {
    grid-column: 1 / -1;
    max-width: 100%;
  }

  .footer-description {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 40px 24px 24px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 32px;
  }

  .footer-section:first-child {
    grid-column: 1;
  }

  .footer-section {
    text-align: left;
  }

  .footer-links {
    align-items: flex-start;
  }

  .footer-social {
    justify-content: flex-start;
  }

  .footer-bottom {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 24px 16px 16px;
  }

  .footer-title {
    font-size: 16px;
  }

  .footer-heading {
    font-size: 13px;
  }
}
</style>
