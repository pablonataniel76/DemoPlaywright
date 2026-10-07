import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { passwordInputSelector, usernameInputSelector } from '../prestashop/ui/pages/login-page';

test('test', async ({ page }) => {
  //test.setTimeout(120_000); add timeout to the test
  await page.goto(process.env.URL!);
  await page.locator('#_desktop_user_info').click();
  await page.locator(usernameInputSelector).click();
  await page.locator(usernameInputSelector).fill(process.env.NAMEUSER!);
  await page.locator(passwordInputSelector).click();
  await page.locator(passwordInputSelector).fill(process.env.PASSWORD!);
  await page.locator('#submit-login').click();
  await expect(page.locator('#category-3')).toContainText('Ropa');
  await page.locator('#top-menu a[href$="/3-ropa"]').click(); //$ means "ends with" in the href attribute
  await page.locator('#left-column a[href$="/3-ropa"]').click();
  await page.locator('#js-product-list a[href*="hummingbird-printed-t-shirt.html"]').first().click(); // * means "contains" in the href attribute
  await page.locator('button.add-to-cart').click();
  await page.locator('div.cart-content-btn a[class="btn btn-primary"]').click();
  await page.locator('#_desktop_cart a').click();
});