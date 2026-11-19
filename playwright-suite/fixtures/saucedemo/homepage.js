import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  sauceDemoPage: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com/');
    await use(page);
    // Playwright's page fixture closes the isolated browser context afterward.
  },
});

export { expect };