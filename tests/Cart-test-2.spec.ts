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
  loginPage.login(process.env.NAMEUSER!, process.env.PASSWORD!);
  /*
  await loginPage.usernameInput.click();
  await loginPage.usernameInput.fill(process.env.NAMEUSER!);
  await loginPage.passwordInput.click();
  await loginPage.passwordInput.fill(process.env.PASSWORD!);
  await loginPage.loginButton.click();
  */
  await page.locator('a').filter({ hasText: 'Vista rápida' }).nth(1).click();
  await page.locator('button').filter({ hasText: 'Añadir al carrito' }).click();
  await page.locator('button').filter({ hasText: 'Continuar comprando' }).click();
  await page.locator('a').filter({ hasText: 'Vista rápida' }).nth(2).click();
  await page.locator('button').filter({ hasText: 'Añadir al carrito' }).click();
  await page.locator('#_desktop_cart a').click();
  //await page.locator('a[href$="/pedido"]').click();
  //
  //await page.locator('a.remove-from-cart').first().click();
   
  //await page.locator('//a[text()="Hummingbird printed sweater"]/ancestor::li[@class="cart-item"]//a[@class="remove-from-cart"]').click();

  const cartItem = page.locator('.cart-item').filter({ hasText: 'Hummingbird printed sweater' });
  await cartItem.locator('a.remove-from-cart').click();
  //await page.locator('a.remove-from-cart').first().click();
  //await page.locator('a:has(img[alt="PabloStore"])').click();
});