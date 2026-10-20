import { test } from '../prestashop/fixtures/testFixtures';
//import { pro }

test.describe('Payment flow', () => {
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

  // test.afterEach(async ({ app }) => {
  //   // Sign out of the customer account.
  //   await test.step('Sign out of the customer account', async () => {
  //     await app.header.logout();
  //   });

  //   // Close the browser page.
  //   await test.step('Close the browser page', async () => {
  //     await app.page.close();
  //   });
  // });

  test.skip('payment_test', async ({ app, common }) => {
    // Open the Hummingbird printed sweater quick view.
    await test.step('Open the Hummingbird printed sweater quick view', async () => {
      await app.homePage.openItemQuickView('Hummingbird printed sweater');
    });

    // Select size M and quantity 5.
    await test.step('Select size M and quantity 5', async () => {
      await common.itemDetailModal.openItemQuickView('M', '5');
    });

    // Complete the purchase.
    await test.step('Complete the purchase', async () => {
      await common.confirmationModal.FinishPurchase();
    });
  });

  test('@test2 filter_accessoriesForHome', async ({ app, common, filter }) => {
    // navigate to accessories_papeleria
    await test.step('Navigate to accessories>papeleria', async () => {
      await common.navigationBar.navigateTo('accesorios.accesorios_para_el_hogar');
    });

    // Filter by availability "In stock"
    await test.step('Filter by availability "In stock"', async () => {
      await filter.productsFilterPage.filterByAvailability('En stock');
    });

    await test.step('Filter by price', async () => {
      await filter.productsFilterPage.setPriceRangeByDragging(20, 40);
    });

  });

});
