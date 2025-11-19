import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'

test.describe('Tests E2E Essentiels', () => {
  
  test('1. Navigation entre les pages principales', async ({ page }) => {
    await page.goto(BASE_URL)
    // networkidle pour s'assurer que la page est complètement chargée
    await page.waitForLoadState('networkidle')

    await page.goto(BASE_URL + '/products')
    await expect(page).toHaveURL(BASE_URL + '/products')
    await page.waitForLoadState('networkidle')

    await page.goto(BASE_URL + '/cart')
    await expect(page).toHaveURL(BASE_URL + '/cart')
    await page.waitForLoadState('networkidle')

    await page.goto(BASE_URL + '/')
    await expect(page).toHaveURL(BASE_URL + '/')
  })

  test('2. Affichage et recherche de produits', async ({ page }) => {
    await page.goto(BASE_URL + '/products')
    await page.waitForLoadState('networkidle')

    await page.waitForSelector('.product-card', { timeout: 15000 })
    const productsCount = await page.locator('.product-card').count()
    expect(productsCount).toBeGreaterThan(0)

    const searchInput = page.locator('input[placeholder*="Rechercher"]')
    await expect(searchInput).toBeVisible({ timeout: 5000 })
    await searchInput.fill('Laptop')
    await page.waitForTimeout(800) // Attendre le filtrage

    const filteredCount = await page.locator('.product-card').count()
    expect(filteredCount).toBeGreaterThan(0)
    expect(filteredCount).toBeLessThanOrEqual(productsCount)
  })

  test('3. Ajout au panier et affichage', async ({ page }) => {
    await page.goto(BASE_URL + '/cart')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500)
    
    const clearBtn = page.locator('button:has-text("Vider le panier")')
    if (await clearBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await clearBtn.click()
      await page.waitForTimeout(800)
    }

    await page.goto(BASE_URL + '/product/1')
    await page.waitForLoadState('networkidle')
    
    await page.waitForSelector('.product-detail-name', { timeout: 15000 })
    // S'assurer que le loader a disparu
    await page.waitForSelector('.loading', { timeout: 2000, state: 'hidden' }).catch(() => {})

    const addButton = page.locator('button:has-text("Ajouter au panier")')
    await expect(addButton).toBeVisible({ timeout: 5000 })
    await expect(addButton).toBeEnabled({ timeout: 5000 })

    const badgeBefore = page.locator('.cart-badge')
    await expect(badgeBefore).not.toBeVisible({ timeout: 1000 }).catch(() => {})

    await addButton.click()

    await expect(page.locator('.cart-badge')).toBeVisible({ timeout: 5000 })

    await page.evaluate(() => {
      const link = document.querySelector('nav a[href="/cart"]') as HTMLAnchorElement
      if (link) {
        link.click()
      }
    })

    await page.waitForURL(BASE_URL + '/cart', { timeout: 5000 })
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500)

    await page.waitForSelector('.cart-content', { timeout: 10000, state: 'visible' })

    await expect(page.locator('.cart-item').first()).toBeVisible({ timeout: 5000 })
    await expect(page.locator('.cart-item-name').first()).toBeVisible({ timeout: 5000 })
  })

  })