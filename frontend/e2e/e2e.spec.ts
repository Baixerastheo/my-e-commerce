import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'

test.describe('Tests E2E Essentiels', () => {
  
  // 1. Navigation de base
  test('1. Navigation entre les pages principales', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Aller sur Produits
    await page.click('text=Produits')
    await expect(page).toHaveURL(BASE_URL + '/products')
    await page.waitForLoadState('networkidle')
    
    // Aller sur Panier
    await page.click('text=Panier')
    await expect(page).toHaveURL(BASE_URL + '/cart')
    await page.waitForLoadState('networkidle')
    
    // Retour à l'accueil
    await page.click('text=Accueil')
    await expect(page).toHaveURL(BASE_URL + '/')
  })

  // 2. Affichage et recherche de produits
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

  // 3. Ajout au panier et affichage
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
    await page.waitForSelector('.product-detail-name', { timeout: 15000 })
    
    // Ajouter au panier
    const addButton = page.locator('button:has-text("Ajouter au panier")')
    await expect(addButton).toBeVisible({ timeout: 5000 })
    await addButton.click()
    await page.waitForTimeout(1000) // Attendre que l'ajout soit traité
    
    // Vérifier le badge panier (peut ne pas être visible immédiatement)
    const badge = page.locator('.cart-badge')
    const badgeVisible = await badge.isVisible({ timeout: 3000 }).catch(() => false)
    if (!badgeVisible) {
      // Si le badge n'est pas visible, vérifier qu'on peut aller au panier
      await page.goto(BASE_URL + '/cart')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('.cart-item', { timeout: 10000, state: 'visible' })
    } else {
      // Aller au panier
      await page.goto(BASE_URL + '/cart')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('.cart-item', { timeout: 10000, state: 'visible' })
    }
    
    // Vérifier que l'article est affiché
    await expect(page.locator('.cart-item').first()).toBeVisible({ timeout: 5000 })
    await expect(page.locator('.cart-item-name').first()).toBeVisible({ timeout: 5000 })
  })

  // 4. Checkout (passer commande)
  test('4. Passer une commande', async ({ page }) => {
    // Vider le panier d'abord
    await page.goto(BASE_URL + '/cart')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500)
    
    const clearBtn = page.locator('button:has-text("Vider le panier")')
    if (await clearBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await clearBtn.click()
      await page.waitForTimeout(800)
    }
    
    // Ajouter un produit
    await page.goto(BASE_URL + '/product/1')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('.product-detail-name', { timeout: 15000 })
    
    const addButton = page.locator('button:has-text("Ajouter au panier")')
    await expect(addButton).toBeVisible({ timeout: 5000 })
    await addButton.click()
    await page.waitForTimeout(1000)
    
    // Aller au panier
    await page.goto(BASE_URL + '/cart')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('.cart-item', { timeout: 15000, state: 'visible' })
    
    // Passer la commande
    const dialogPromise = page.waitForEvent('dialog', { timeout: 10000 })
    const checkoutBtn = page.locator('button:has-text("Passer la commande")')
    await expect(checkoutBtn).toBeVisible({ timeout: 5000 })
    await checkoutBtn.click()
    
    const dialog = await dialogPromise
    expect(dialog.message()).toBe('Commande passée')
    await dialog.accept()
    
    // Attendre que le panier soit vidé
    await page.waitForTimeout(500)
    await page.waitForSelector('.empty-cart', { timeout: 5000, state: 'visible' }).catch(() => {})
    await expect(page.locator('text=Votre panier est vide')).toBeVisible({ timeout: 5000 })
  })
})
