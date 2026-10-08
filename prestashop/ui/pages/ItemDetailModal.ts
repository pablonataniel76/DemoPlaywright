import { Page, Locator } from '@playwright/test';

export class ItemDetailModal {
    readonly page: Page;
    readonly cartItemSize: Locator;
    readonly cartItemQty: Locator;
    readonly cartItemButton: Locator;

    constructor(page: Page) {
        console.log('ItemDetailModal constructor called');
        this.page = page;
        this.cartItemSize = page.locator('[aria-label="Tamaño"]');
        this.cartItemQty = page.locator('#quantity_wanted');
        this.cartItemButton = page.locator('.add-to-cart');
    }

    async openItemQuickView(size: string, quantity: string) {
        // const cartItemDetail = this.cartItem.filter({ hasText: cartItemName });
        // await cartItemDetail.locator(this.cartItemButton).click();
        await this.cartItemSize.selectOption(size);
        await this.cartItemQty.fill(quantity);
        await this.cartItemButton.click();
        // await page.locator('[aria-label="Tamaño"]').selectOption(size);
        // await page.locator('#quantity_wanted').fill(quantity);
        // await page.locator('.add-to-cart').click();
    }
    
}