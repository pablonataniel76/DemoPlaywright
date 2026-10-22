import { test } from '../prestashop/fixtures/testFixtures';

test.beforeEach(async ({ app }) => {
  // Open the shop homepage.
  await test.step('Open the shop homepage', async () => {
    await app.page.goto(process.env.URL!);
  });

  // Open the customer account menu.
  await test.step('Open the customer account menu', async () => {
    await app.page.locator('#_desktop_user_info').click();
  });

  // Sign in with the configured customer account.
  await test.step('Sign in with the configured customer account', async () => {
    await app.loginPage.login(process.env.NAMEUSER!, process.env.PASSWORD!);
  });
});

test.afterEach(async ({ app }) => {
  await test.step('Log out of the customer account', async () => {
    await app.header.logout();
  });

  await test.step('Close the browser page', async () => {
    await app.page.close();
  });
});

test('test_cart', async ({ app, common }) => {
  //test.setTimeout(120_000); add timeout to the test
  // await app.page.goto(process.env.URL!);
  // await app.page.locator('#_desktop_user_info').click();

  // await app.loginPage.login(process.env.NAMEUSER!, process.env.PASSWORD!);
  await test.step('Open the Hummingbird printed sweater quick view', async () => {
      await app.homePage.openItemQuickView('Hummingbird printed sweater');
    });

    // Select size M and quantity 5.
    await test.step('Select size M and quantity 5', async () => {
      await common.itemDetailModal.openItemQuickView('M', '5');
    });

    // Complete the purchase.
    await test.step('Complete the purchase', async () => {
      await common.confirmationModal.finishPurchase();
    });
  // await app.header.logout();
  // await app.page.close();
});