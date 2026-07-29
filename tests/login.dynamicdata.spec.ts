import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../test_data/loginDataNew.json';

// Old implementation kept for reference.
// It used a single loop with conditional assertions inside the test.
// This was replaced to satisfy eslint-plugin-playwright's no-conditional-in-test rule.
//
// loginData.forEach((data) => {
//     if (!data.run) return;
//
//     test(`Login Test ${data.username}`, async ({ page }) => {
//         const loginPage = new LoginPage(page);
//         await loginPage.gotoLoginPage();
//         await loginPage.login(data.username, data.password);
//
//         if (data.expected === 'success') {
//             await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
//         } else {
//             await expect(loginPage.errorMessage).toBeVisible();
//         }
//     });
// });

// Filter out rows in the JSON fixture where the test should not run.
const activeData = loginData.filter((data) => data.run);

// Separate success scenarios from failure scenarios so tests do not use conditionals.
const successData = activeData.filter((data) => data.expected === 'success');
const failureData = activeData.filter((data) => data.expected !== 'success');

// Create one Playwright test per successful login scenario.
successData.forEach((data) => {
    test(`Login Test ${data.username} - success`, async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Open the login page and submit credentials.
        await loginPage.gotoLoginPage();
        await loginPage.login(data.username, data.password);

        // Assert that successful login redirects to the inventory page.
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});

// Create one Playwright test per failure login scenario.
failureData.forEach((data) => {
    test(`Login Test ${data.username} - failure`, async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Open the login page and submit credentials.
        await loginPage.gotoLoginPage();
        await loginPage.login(data.username, data.password);

        // Assert that failed login shows the error message.
        await expect(loginPage.errorMessage).toBeVisible();
    });
});