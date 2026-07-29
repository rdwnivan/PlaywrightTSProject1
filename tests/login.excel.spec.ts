import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoginData, readExcel } from '../utils/excelReader';

// Read login data from the Excel file and type it as LoginData.
const testData: LoginData[] = readExcel('./test_data/loginData.xlsx', 'Sheet1');

test.describe('Login Tests', () => {
    // Loop through each row from the Excel sheet and create a test case for it.
    for (const data of testData) {
        test(`Login Test for ${String(data.username)}`, async ({ page }) => {
            // Skip this case when the Excel row has run = no.
            test.skip(data.run !== 'yes', 'run flag is not set to yes');

            const loginPage = new LoginPage(page);

            // Step 1: Open the login page.
            await test.step('go to login page', async () => {
                await loginPage.gotoLoginPage();
            });

            // Step 2: Enter credentials and submit the login form.
            await test.step('perform login', async () => {
                await loginPage.login(String(data.username), String(data.password));
            });

            // Step 3: Verify the result based on the expected outcome from Excel.
            await test.step('validate result', async () => {
                if (String(data.expected).toLowerCase() === 'success') {
                    // Successful login should land on the inventory page.
                    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                } else {
                    // Failed login should show an error message.
                    await expect(loginPage.errorMessage).toBeVisible();
                }
            });
        });
    }
});
