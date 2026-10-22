import { test, expect } from '../prestashop/fixtures/testFixtures';

test.describe('Product Tests', () => {

    // Before each test, open the shop homepage and sign in with the configured customer account.
    test.beforeEach(async ({ app }) => {
        // Open the shop homepage.
        await test.step('Open the shop homepage', async () => {
            // await app.page.goto(process.env.URL!);
            await app.loginPage.navigateTo(process.env.URL!);
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

    // After each test, log out of the customer account and close the browser page.
    // test.afterEach(async ({ app }) => {
    //     await test.step('Log out of the customer account', async () => {
    //         await app.header.logout();
    //     });
    //     await test.step('Close the browser page', async () => {
    //         await app.page.close();
    //     });
    // });


    test.skip('@Regression Verify product details is visible', async ({ app }) => {
        // Open the product page for a specific product
        await test.step('Open the product page', async () => {
            await app.homePage.openProductDetail('Hummingbird printed sweater');
        });
        // Validate that the product title is visible on the product page
        await test.step('Validate product title', async () => {
            await expect(app.page.locator('h1')).toHaveText('Hummingbird printed sweater');
        });

    });

    test.skip('@Functional Verify product category is accessible', async ({ app, common }) => {
        // navigate to accessories_papeleria
        await test.step('Navigate to accessories>papeleria', async () => {
            await common.navigationBar.navigateTo('accesorios.accesorios_para_el_hogar');
        });
        // Validate that the URL contains the expected category path
        await test.step('Validate product category URL', async () => {
            await expect(app.page).toHaveURL(/8-home-accessories/)
        });

    });

    test.skip('@Product Verify Product is added to cart', async ({ app, common, cart, checkout }) => {
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
            await common.confirmationModal.finishPurchase();
        });

    });

    test('@Delete Verify multiple items are deleted', async ({ app, common, cart }) => {
        // Open the Hummingbird printed sweater quick view.
        await test.step('Open the Hummingbird printed sweater quick view', async () => {
            await app.homePage.openItemQuickView('Hummingbird printed sweater');
        });

        // Select size M and quantity 5.
        await test.step('Select size M and quantity 5', async () => {
            // await common.itemDetailModal.openItemQuickView('M', '5');
            const itemData = {
                "Size": "M",
                "Quantity": "5"
            };
            await common.itemDetailModal.setItemDetailsInUI(itemData);
        });

        //Click Continue shopping
        await test.step('Continue shopping', async () => {
            await common.confirmationModal.continuePurchase();
        });

        // Open the Hummingbird printed t-shirt quick view.
        await test.step('Open the Hummingbird printed t-shirt quick view', async () => {
            await app.homePage.openItemQuickView('Hummingbird printed t-shirt');
        });

        // Select size M and quantity 5.
        await test.step('Select size M and quantity 5', async () => {
            const itemData = {
                "Size": "XL",
                "Quantity": "2",
                "Color": "Blanco"
            };
            await common.itemDetailModal.setItemDetailsInUI(itemData);
        });

        //Click Continue shopping
        await test.step('Continue shopping', async () => {
            await common.confirmationModal.continuePurchase();
        });

        // Open the The best is yet to come Framed poster view.
        await test.step('Open the The best is yet to come Framed poster view', async () => {
            await app.homePage.openItemQuickView("The best is yet to come'...");
        });

        // Select dimention frame
        await test.step('Select dimention frame', async () => {
            const itemData = {
                "Dimention": "60x90cm",
                "Quantity": "7"
            };
            await common.itemDetailModal.setItemDetailsInUI(itemData);
        });

        // Complete the purchase.
        await test.step('Complete the purchase', async () => {
            await common.confirmationModal.finishPurchase();
        });
        
        // Delete all items on cart
        await test.step('Delete items on cart', async () => {
            await cart.cartPage.clearCart();
        });

    });

});