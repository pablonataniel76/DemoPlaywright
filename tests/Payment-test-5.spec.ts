import { test } from '../prestashop/fixtures/testFixtures';

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
  //   await test.step('Log out of the customer account', async () => {
  //     await app.header.logout();
  //   });

  //   await test.step('Close the browser page', async () => {
  //     await app.page.close();
  //   });
  // });

  test('payment_test', async ({ app, common, cart, checkout }) => {
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

    // Proceed with checkout.
    await test.step('Proceed with checkout', async () => {
      await cart.cartPage.proceedCheckout();
    });

    await test.step('Fill in the checkout form', async () => {
      await checkout.checkoutPage.proceedCheckout(
        'My Address',
        'John',
        'Doe',
        'My Company',
        '123456789',
        '123 Main St',
        'Apt 4B',
        'AE',
        '12345',
        'Anytown',
        'Estados Unidos',
        '+1 555-555-5555',
        false
      );
    });

  });

  test.skip('@test2 filter_accessoriesForHome', async ({ app, common, filter }) => {
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
