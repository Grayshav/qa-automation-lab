import { test, expect } from '../../fixtures/test.js';
import { todos } from '../../test-data/todos.js';

test.describe('Playwright E2E - TodoMVC Demo', () => {
  test('should allow adding new todo items', async ({ todoPage }) => {
    for (const title of todos.newItems) {
      await todoPage.addTodo(title);
    }

    await expect(todoPage.todoTitles).toHaveText(todos.newItems);
  });

  test('should allow marking an item as completed', async ({ todoPage }) => {
    await todoPage.addTodo(todos.itemToComplete);
    await todoPage.completeTodo(0);

    await expect(todoPage.todoItems.first()).toHaveClass(/completed/);
  });
});
