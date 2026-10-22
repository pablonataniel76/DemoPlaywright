import { Page } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly logoutButton;
    readonly homeButton;

    constructor(page: Page) {
        console.log('Header constructor called');
        this.page = page;
        this.logoutButton = page.locator('.logout');
        this.homeButton = page.locator('a .logo');
    }

    async logout() {
        await this.logoutButton.click();
    }

    async goHomePage(){
        await this.homeButton.click();
    }
}