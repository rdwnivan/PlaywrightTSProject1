"# Playwright TypeScript Project

This project is a Playwright automation test suite built with TypeScript for browser-based UI testing. It includes sample login scenarios and page object model structure for maintainable test automation.

## Features

- Playwright with TypeScript
- Page Object Model (POM) structure
- Login flow tests for valid and invalid credentials
- Test data stored in JSON/CSV files
- HTML report generation

## Project Structure

- `tests/` - test specifications
- `pages/` - page object classes
- `test_data/` - JSON/CSV test data
- `utils/` - helper utilities
- `playwright.config.ts` - Playwright configuration

## Prerequisites

- Node.js 20 or higher
- npm

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/login_test.spec.ts
```

## Notes

- Tests are configured to run in Chromium and Firefox.
- HTML reports are generated after test execution.
- Some tests use SauceDemo as the target application.
" 
