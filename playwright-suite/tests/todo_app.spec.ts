import { test, expect } from '@playwright/test';

test.describe('Playwright E2E - TodoMVC Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('should allow adding new todo items', async ({ page }) => {
    const newTodoInput = page.getByPlaceholder('What needs to be done?');

    // Add first item
    await newTodoInput.fill('Learn Playwright in VS Code');
    await newTodoInput.press('Enter');

    // Add second item
    await newTodoInput.fill('Master Selenium POM');
    await newTodoInput.press('Enter');

    // Verify list items
    const todoItems = page.getByTestId('todo-title');
    await expect(todoItems).toHaveText([
      'Learn Playwright in VS Code',
      'Master Selenium POM',
    ]);
  });

  test('should allow marking an item as completed', async ({ page }) => {
    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    await newTodoInput.fill('Setup k6 performance testing');
    await newTodoInput.press('Enter');

    const firstTodoItem = page.getByTestId('todo-item').first();
    await firstTodoItem.getByRole('checkbox').check();

    await expect(firstTodoItem).toHaveClass(/completed/);
  });
});
