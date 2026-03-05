import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads at localhost:3020', async ({ page }) => {
    await page.goto('http://localhost:3020');
    await expect(page).toHaveTitle(/.+/);
  });

  test('has visible content', async ({ page }) => {
    await page.goto('http://localhost:3020');
    await page.waitForLoadState('domcontentloaded');
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
