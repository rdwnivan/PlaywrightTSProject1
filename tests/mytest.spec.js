import { test, expect } from '@playwright/test';

test('My First test', async ({ page }) => {
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Google/);
    await expect(page.locator('textarea[name="q"]')).toBeVisible();
});