import { Page, Locator } from '@playwright/test';

export class ConfirmationModal {
    readonly page: Page;
    readonly confirmationButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        console.log('ConfirmationModal constructor called');
        this.page = page;
        this.confirmationButton = page.locator('.cart-content-btn a.btn-primary');
        this.continueButton = page.locator('.cart-content-btn [data-dismiss="modal"]');
    }

    async finishPurchase() {
        await this.confirmationButton.click();
    }

    async continuePurchase(){
        await this.continueButton.click();
    }
    
}