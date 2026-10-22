import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly cartItem: Locator;
    readonly quickViewButton: Locator;
    readonly productItemName: Locator;

    constructor(page: Page) {
        console.log('HomePage constructor called');
        this.page = page;
        this.cartItem = page.locator('[data-type="popularproducts"] div.js-product');
        this.quickViewButton = page.locator('.quick-view');
        this.productItemName = page.locator('.product-title a');
    }

    async openItemQuickView(cartItemName: string) {  
        const cartItem = this.cartItem.filter({ hasText: cartItemName });
        await cartItem.locator(this.quickViewButton).click();
    }

    async openProductDetail(productItemName: string) {
        const cartItem = this.cartItem.filter({ hasText: productItemName });
        await cartItem.locator(this.productItemName).click();
    }
    
}