import { Page, Locator } from '@playwright/test';

export class ConfirmationModal {
    readonly page: Page;
    readonly confirmationButton: Locator;

    constructor(page: Page) {
        console.log('ConfirmationModal constructor called');
        this.page = page;
        this.confirmationButton = page.locator('.cart-content-btn a.btn-primary');
    }

    async FinishPurchase() {
        await this.confirmationButton.click();
    }
    
}