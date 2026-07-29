const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const playwright = require('eslint-plugin-playwright');

module.exports = [
    {
        ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**'],
    },
    js.configs.recommended,
    {
        files: ['**/*.{js,ts}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                module: 'readonly',
                require: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            playwright,
        },
        rules: {
            'no-unused-vars': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
];
