import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../prestashop/ui/pages/login-page';
import { HomePage } from '../prestashop/ui/pages/HomePage';
import { ItemDetailModal } from '../prestashop/ui/pages/ItemDetailModal';
import { ConfirmationModal } from '../prestashop/ui/pages/ConfirmationModal';
//import { passwordInputSelector, usernameInputSelector } from '../prestashop/ui/pages/login-page';

test('test_cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const itemDetailModal = new ItemDetailModal(page);
  const confirmationModal = new ConfirmationModal(page);
  //test.setTimeout(120_000); add timeout to the test
  await page.goto(process.env.URL!);
  await page.locator('#_desktop_user_info').click();

  await loginPage.login(process.env.NAMEUSER!, process.env.PASSWORD!);
  await homePage.openItemQuickView('Hummingbird printed sweater');
  await itemDetailModal.openItemQuickView('M', '5');
  await confirmationModal.FinishPurchase();
  //await page.locator('.cart-content-btn a.btn-primary').click();
  //await confirmationModal.FinishPurchase('M', '5');
  
  await page.locator('.logout').click();
});