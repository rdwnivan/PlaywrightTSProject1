import { test, expect } from '@playwright/test';

test('Login test', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    const username = page.locator('#user-name');
    const password = page.locator('#password');
    const loginButton = page.locator('#login-button');

    await username.fill('standard_user');
    await password.fill('secret_sauce');
    await loginButton.click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});