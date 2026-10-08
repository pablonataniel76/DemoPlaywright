import { Page } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly logoutButton;

    constructor(page: Page) {
        console.log('Header constructor called');
        this.page = page;
        this.logoutButton = page.locator('.logout');
    }

    async logout() {
        await this.logoutButton.click();
    }
}