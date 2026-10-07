//export const usernameInputSelector = '#field-email';
//export const passwordInputSelector = '#field-password';

import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput;
    readonly passwordInput;
    readonly loginButton;
    
    constructor(page: Page) {
        console.log('LoginPage constructor called');
        this.page = page;
        this.usernameInput = page.locator('#field-email');
        this.passwordInput = page.locator('#field-password');
        this.loginButton = page.locator('#submit-login');
    }

    async login(username: string, password: string) {
        await this.usernameInput.click();
        await this.usernameInput.fill(username);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}