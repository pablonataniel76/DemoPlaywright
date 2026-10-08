import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly cartItem: Locator;
    readonly quickViewButton: Locator;

    constructor(page: Page) {
        console.log('HomePage constructor called');
        this.page = page;
        this.cartItem = page.locator('[data-type="popularproducts"] div.js-product');
        this.quickViewButton = page.locator('.quick-view');
    }

    async openItemQuickView(cartItemName: string) {  
        const cartItem = this.cartItem.filter({ hasText: cartItemName });
        await cartItem.locator(this.quickViewButton).click();
    }


    
}