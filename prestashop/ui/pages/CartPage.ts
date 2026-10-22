import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        console.log('CartPage constructor called');
        this.page = page;
        this.checkoutButton = page.locator('.checkout');
        this.cartItems = page.locator('cart-item');
        this.deleteButton = page.locator('.remove-from-cart');
    }

    async proceedCheckout() {
        await this.checkoutButton.click();
    }

    async clearCart(): Promise<void> {
        // while (await this.cartItems.count() > 0) {
        //     await this.deleteButton.first().click();

        //     // Wait until the first item is removed
        //     await expect(this.cartItems).toHaveCount(
        //         (await this.cartItems.count()) - 1
        //     );
        // }


        const totalItems = await this.deleteButton.count();

        for (let i = 0; i < totalItems; i++) {
            //await this.page.waitForTimeout(5000);


            const remainingItems = await this.deleteButton.count();

            if (remainingItems === 0) break;
            console.log(`Delete buttons remaining: ${remainingItems}`);
            await this.deleteButton.first().click();
            await this.page.reload();
            // await expect.poll(
            //     async () => await this.deleteButton.count(),
            //     { timeout: 10000 }
            // ).toBeLessThan(remainingItems);
        }
        // await expect(this.deleteButton).toHaveCount(0);
        // await expect(this.cartItems).toHaveCount(0);
    }
}