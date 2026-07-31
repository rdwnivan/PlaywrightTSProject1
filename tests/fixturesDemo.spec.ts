import { test } from 'playwright/test';

test('test 1', async ({ page }) => {
    console.log('test 1');
    await page.goto('https://playwright.dev/')
})

test('test 2', async ({ page }) => {
    console.log('test 2');
    await page.goto('https://www.saucedemo.com/')
})