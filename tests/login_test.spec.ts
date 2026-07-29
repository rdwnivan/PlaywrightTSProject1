import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../test_data/loginData.json';

test('valid Login test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    // await loginPage.verifyLoginSuccess();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('invalid Login test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.invalidUser.username, loginData.invalidUser.password);
    // await loginPage.verifyLoginSuccess();
    await expect(loginPage.errorMessage).toBeVisible();
});

