import { test, expect } from '../../../fixtures/saucedemo/homepage.js';
import { HomePage } from '../../../pages/saucedemo/homepage.page.js';
import { username, password } from '../../../test-data/saucedemo/users.js';

test('opens the SauceDemo login page', async ({ sauceDemoPage }) => {
  const homePage = new HomePage(sauceDemoPage);

  await expect(sauceDemoPage).toHaveURL('https://www.saucedemo.com/');
  await expect(sauceDemoPage.getByPlaceholder('Username')).toBeVisible();
  await expect(sauceDemoPage.getByPlaceholder('Password')).toBeVisible();
  await expect(sauceDemoPage.getByRole('button', { name: 'Login' })).toBeVisible();

  await homePage.login(username.standard, password);
});
