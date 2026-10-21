import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        console.log('CartPage constructor called');
        this.page = page;
        this.checkoutButton = page.locator('.checkout');
    }

    async proceedCheckout() {
        await this.checkoutButton.click();
    }
}