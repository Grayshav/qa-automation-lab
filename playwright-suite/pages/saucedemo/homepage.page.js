import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.app_logo', { hasText: 'Swag Labs' });
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  
}