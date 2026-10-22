import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;

    constructor(page: Page) {
        console.log('ProductPage constructor called');
        this.page = page;
    }

    async openProductPage(productUrl: string) {
        await this.page.goto(productUrl);
    }
}