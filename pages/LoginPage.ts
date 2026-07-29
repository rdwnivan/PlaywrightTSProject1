import { Page, Locator } from '@playwright/test';

// Page Object Model for the SauceDemo login page.
export class LoginPage {
    // Store the Playwright page object and important UI elements.
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Define the selectors for the login form and error message.
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Navigate to the SauceDemo login page.
    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    // Fill in the username and password, then click the login button.
    async login(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }

    // This method is currently commented out because it is not used.
    // It could be used later to verify that login was successful.
    // async verifyLoginSuccess() {
    //     await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
    // }
}
