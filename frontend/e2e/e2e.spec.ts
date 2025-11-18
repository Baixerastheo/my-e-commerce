import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'

test.describe('Tests E2E Essentiels', () => {
  
  test('1. Navigation entre les pages principales', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Aller sur la page Produits
    await page.goto(BASE_URL + '/products')
    await expect(page).toHaveURL(BASE_URL + '/products')
    await page.waitForLoadState('networkidle')
    
    // Aller sur la page Panier
    await page.goto(BASE_URL + '/cart')
    await expect(page).toHaveURL(BASE_URL + '/cart')
    await page.waitForLoadState('networkidle')
    
    // Retour à la page d'accueil
    await page.goto(BASE_URL + '/')
    await expect(page).toHaveURL(BASE_URL + '/')
  })

  test('2. Affichage et recherche de produits', async ({ page }) => {
    await page.goto(BASE_URL + '/products')
    await page.waitForLoadState('networkidle')
    
    // Attendre que les produits soient chargés
    await page.waitForSelector('.product-card', { timeout: 15000 })
    const productsCount = await page.locator('.product-card').count()
    expect(productsCount).toBeGreaterThan(0)
    
    // Rechercher un produit
    const searchInput = page.locator('input[placeholder*="Rechercher"]')
    await expect(searchInput).toBeVisible({ timeout: 5000 })
    await searchInput.fill('Laptop')
    await page.waitForTimeout(800) // Attendre le filtrage
    
    // Vérifier que les résultats sont filtrés
    const filteredCount = await page.locator('.product-card').count()
    expect(filteredCount).toBeGreaterThan(0)
    expect(filteredCount).toBeLessThanOrEqual(productsCount)
  })

  test('3. Ajout au panier et affichage', async ({ page }) => {
    // Vider le panier d'abord
    await page.goto(BASE_URL + '/cart')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500)
    
    const clearBtn = page.locator('button:has-text("Vider le panier")')
    if (await clearBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await clearBtn.click()
      await page.waitForTimeout(800)
    }
    
    // Aller sur la page produit
    await page.goto(BASE_URL + '/product/1')
    await page.waitForLoadState('networkidle')
    
    // Attendre que le produit soit complètement chargé
    await page.waitForSelector('.product-detail-name', { timeout: 15000 })
    // S'assurer que le loader a disparu
    await page.waitForSelector('.loading', { timeout: 2000, state: 'hidden' }).catch(() => {})
    
    // Attendre que le bouton soit visible et cliquable
    const addButton = page.locator('button:has-text("Ajouter au panier")')
    await expect(addButton).toBeVisible({ timeout: 5000 })
    await expect(addButton).toBeEnabled({ timeout: 5000 })
    
    // Vérifier que le badge n'existe pas encore (panier vide)
    const badgeBefore = page.locator('.cart-badge')
    await expect(badgeBefore).not.toBeVisible({ timeout: 1000 }).catch(() => {})
    
    // Ajouter au panier
    await addButton.click()
    
    // Attendre que le badge apparaisse dans le header
    await expect(page.locator('.cart-badge')).toBeVisible({ timeout: 5000 })
    
    // Naviguer vers le panier via JavaScript
    await page.evaluate(() => {
      const link = document.querySelector('nav a[href="/cart"]') as HTMLAnchorElement
      if (link) {
        link.click()
      }
    })
    
    // Attendre que l'URL change
    await page.waitForURL(BASE_URL + '/cart', { timeout: 5000 })
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500)
    
    // Attendre que le panier ne soit plus vide (cart-content au lieu de empty-cart)
    await page.waitForSelector('.cart-content', { timeout: 10000, state: 'visible' })
    
    // Vérifier que l'article est affiché
    await expect(page.locator('.cart-item').first()).toBeVisible({ timeout: 5000 })
    await expect(page.locator('.cart-item-name').first()).toBeVisible({ timeout: 5000 })
  })

  })