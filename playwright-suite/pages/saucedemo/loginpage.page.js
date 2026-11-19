import { expect } from '@playwright/test';
import { HomePage } from './homepage.page';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess(currentUrl) {
    await expect(this.page).not.toHaveURL(currentUrl);
    await expect(this.homePage.title).toBeVisible({ timeout: 10000 });
  }
}