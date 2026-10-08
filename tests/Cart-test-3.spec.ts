import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../prestashop/ui/pages/login-page';
//import { passwordInputSelector, usernameInputSelector } from '../prestashop/ui/pages/login-page';

test('test', async ({ page }) => {
  //test.setTimeout(120_000); add timeout to the test
  await page.goto(process.env.URL!);
  await page.locator('#_desktop_user_info').click();
  //
  const loginPage = new LoginPage(page);
  //
  await loginPage.login(process.env.NAMEUSER!, process.env.PASSWORD!);
 
  const cartItemWish = page.locator('[data-type="popularproducts"] div.js-product').filter({ hasText: 'Hummingbird printed sweater' });
  await cartItemWish.locator('.wishlist-button-add').click();

});