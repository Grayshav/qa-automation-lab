import { test, expect } from '../../../fixtures/saucedemo/homepage.js';
import { LoginPage } from '../../../pages/saucedemo/loginpage.page.js';
import { username, password } from '../../../test-data/saucedemo/users.js';

test('opens the SauceDemo login page', async ({ sauceDemoPage }) => {
  const loginPage = new LoginPage(sauceDemoPage);
  const currentUrl = sauceDemoPage.url();

  await expect(sauceDemoPage).toHaveURL(currentUrl);
  await expect(sauceDemoPage.getByPlaceholder('Username')).toBeVisible();
  await expect(sauceDemoPage.getByPlaceholder('Password')).toBeVisible();
  await expect(sauceDemoPage.getByRole('button', { name: 'Login' })).toBeVisible();

  await loginPage.login(username.standard, password);
  await loginPage.expectLoginSuccess(currentUrl);
});
