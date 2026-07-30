import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { readData } from '../utils/dataReader';

// Load the test data from an Excel file.
// The data reader will return an array of rows from the specified sheet.
// const testData = readData('./test_data/loginData.xlsx', 'Sheet1');

// Alternative data sources can be used by switching the line above.
// const testData = readData('./test_data/loginDataNew.json');
const testData = readData('./test_data/loginData.csv');

// Group all login tests under one describe block.
test.describe('Login Tests', () => {
    // Create one Playwright test for each row in the test data.
    // This makes the test data-driven instead of hardcoded.
    for (const data of testData) {
        test(`Login Test for ${String(data.username)}`, async ({ page }) => {
            // Skip this test if the row says run = no.
            test.skip(data.run !== 'yes', 'run flag is not set to yes');

            const loginPage = new LoginPage(page);

            // Step 1: Open the login page before interacting with it.
            await test.step('go to login page', async () => {
                await loginPage.gotoLoginPage();
            });

            // Step 2: Use the username and password from the current data row.
            await test.step('perform login', async () => {
                await loginPage.login(String(data.username), String(data.password));
            });

            // Step 3: Verify the expected result from the data row.
            await test.step('validate result', async () => {
                if (String(data.expected).toLowerCase() === 'success') {
                    // A successful login should redirect the user to the inventory page.
                    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                } else {
                    // A failed login should show an error message.
                    await expect(loginPage.errorMessage).toBeVisible();
                }
            });
        });
    }
});
