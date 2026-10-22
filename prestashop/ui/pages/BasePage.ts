import { Page, Locator, expect } from '@playwright/test';
import { StrategySetter } from '../../utils/StrategysMethod';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async waitForElement(locator: Locator, timeout: number = 5000) {
        await expect(locator).toBeVisible({ timeout });
    }

    async clickElement(locator: Locator) {
        await this.waitForElement(locator);
        await locator.click();
    }

    async fillInput(locator: Locator, value: string) {
        await this.waitForElement(locator);
        await locator.fill(value);
    }

    // async getElementText(locator: Locator): Promise<string> {

    // }
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async executeStrategy(strategy: StrategySetter): Promise<void> {
        await strategy();   
    }
}