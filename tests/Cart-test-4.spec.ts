import { test } from '../prestashop/fixtures/testFixtures';

test('test_cart', async ({ app, common }) => {
  //test.setTimeout(120_000); add timeout to the test
  await app.page.goto(process.env.URL!);
  await app.page.locator('#_desktop_user_info').click();

  await app.loginPage.login(process.env.NAMEUSER!, process.env.PASSWORD!);
  await app.homePage.openItemQuickView('Hummingbird printed sweater');
  await common.itemDetailModal.openItemQuickView('M', '5');
  await common.confirmationModal.FinishPurchase();
  await app.header.logout();
  await app.page.close();
});