import { test as base, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo.page.js';

export const test = base.extend({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
    // Playwright's page fixture closes the isolated browser context afterward.
  },
});

export { expect };
