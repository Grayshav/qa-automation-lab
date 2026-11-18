export class TodoPage {
  constructor(page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoTitles = page.getByTestId('todo-title');
  }

  async goto() {
    await this.page.goto('./');
  }

  async addTodo(title) {
    await this.newTodoInput.fill(title);
    await this.newTodoInput.press('Enter');
  }

  async completeTodo(index) {
    await this.todoItems.nth(index).getByRole('checkbox').check();
  }
}
